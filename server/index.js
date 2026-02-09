const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const http = require('http');
const { Server } = require('socket.io');

// Ensure .env exists (copy from .env.example if present and .env missing)
const fs = require('fs');
const path = require('path');
(function ensureEnv() {
  try {
    const envPath = path.resolve(__dirname, '.env');
    const examplePath = path.resolve(__dirname, '.env.example');
    if (!fs.existsSync(envPath) && fs.existsSync(examplePath)) {
      fs.copyFileSync(examplePath, envPath);
      console.log('Archivo `.env` no encontrado. Se ha creado a partir de `.env.example`. Revisa `server/.env` y completa las credenciales si es necesario.');
    }
  } catch (err) {
    console.warn('No se pudo comprobar/crear .env automáticamente:', err.message);
  }
})();

require('dotenv').config();

const { pool } = require('./db');

const app = express();
app.use(cors());
app.use(express.json());

const limiter = rateLimit({ windowMs: 60 * 1000, max: 60 });
app.use(limiter);

// Setup nodemailer transport
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: process.env.EMAIL_SECURE === 'true',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Check transporter availability and prepare fallback behavior for development
let SMTP_AVAILABLE = false;
(async () => {
  try {
    await transporter.verify();
    SMTP_AVAILABLE = true;
    console.log('SMTP transport ready. Emails will be sent via configured SMTP server.');
  } catch (err) {
    SMTP_AVAILABLE = false;
    console.warn('SMTP transport not available or misconfigured. Emails will not be sent. Error:', err.message);
  }
})();

const VERIF_LOG = path.resolve(__dirname, 'verification_debug.log');

// Small in-memory token cache for API authorization
const apiTokenCache = { token: null, expiresAt: 0 };

async function getApiToken() {
  const enabled = (process.env.EMAIL_API_ENABLED || 'false').toLowerCase() === 'true';
  if (!enabled) return null;

  if (apiTokenCache.token && Date.now() < apiTokenCache.expiresAt - 30000) {
    return apiTokenCache.token;
  }

  try {
    const base = (process.env.EMAIL_API_BASE || 'https://pro.api.serversmtp.com/api/v2').replace(/\/$/, '');
    const resp = await fetch(base + '/authorize', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ consumerKey: (process.env.EMAIL_CONSUMER_KEY || '').trim(), consumerSecret: (process.env.EMAIL_CONSUMER_SECRET || '').trim() })
    });

    if (!resp.ok) {
      const txt = await resp.text();
      console.warn('Token request failed:', resp.status, txt);
      return null;
    }

    const body = await resp.json();
    // Common shape: { apiKey: 'xxx', expiresIn: 3600 } or { token: 'xxx' }
    const token = body.apiKey || body.token || body.data && (body.data.apiKey || body.data.token);
    const expiresIn = parseInt(body.expiresIn || body.expires_in || 3600, 10) || 3600;
    if (token) {
      apiTokenCache.token = token;
      apiTokenCache.expiresAt = Date.now() + expiresIn * 1000;
      console.log('Obtained API token for TurboSMTP (cached ' + (expiresIn || 3600) + 's)');
      return token;
    }

    console.warn('No token found in authorize response:', body);
    return null;
  } catch (err) {
    console.warn('Failed to fetch API token:', err.message || err);
    return null;
  }
}

async function sendViaApi({ to, subject, text, code }) {
  try {
    const base = (process.env.EMAIL_API_BASE || 'https://pro.api.serversmtp.com/api/v2').replace(/\/$/, '');
    const token = await getApiToken();
    if (!token) return { sent: false, error: 'No API token' };

    // Best-effort payload per API doc - if provider expects different shape, the call will fail and we fallback
    const payload = {
      mail: {
        from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
        to: [{ email: to }],
        subject: subject,
        text: text
      }
    };

    const resp = await fetch(base + '/mail/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token },
      body: JSON.stringify(payload)
    });

    if (!resp.ok) {
      const txt = await resp.text();
      console.warn('sendViaApi failed:', resp.status, txt);
      return { sent: false, error: txt };
    }

    const body = await resp.json();
    return { sent: true, body };
  } catch (err) {
    console.error('sendViaApi error:', err.message || err);
    return { sent: false, error: err.message || String(err) };
  }
}

// Encolar emails fallidos en la tabla outbox para reintentos
async function enqueueOutbox({ to, subject, text, payload }) {
  try {
    const baseSecs = parseInt(process.env.OUTBOX_RETRY_BASE_SECONDS || '60', 10);
    const nextAttempt = new Date(Date.now() + baseSecs * 1000);
    const [res] = await pool.query('INSERT INTO email_outbox (to_email, subject, text, payload, status, attempts, next_attempt_at) VALUES (?, ?, ?, ?, ?, ?, ?)', [to, subject, text, JSON.stringify(payload || {}), 'pending', 0, nextAttempt]);
    console.log('Email encolado en outbox id', res.insertId, 'para', to);
    return { ok: true, id: res.insertId };
  } catch (err) {
    console.error('Error al encolar email en outbox:', err);
    return { ok: false, error: err.message };
  }
}

async function sendVerificationEmail({ to, code, subject, text }) {
  const apiEnabled = (process.env.EMAIL_API_ENABLED || 'false').toLowerCase() === 'true';
  const fallbackAllowed = (process.env.EMAIL_FALLBACK || 'true').toLowerCase() !== 'false' || process.env.NODE_ENV !== 'production';

  if (apiEnabled) {
    const apiResult = await sendViaApi({ to, subject, text, code });
    if (apiResult.sent) return { sent: true, via: 'api' };
    console.warn('API send did not succeed, falling back. Reason:', apiResult.error || 'unknown');
  }

  if (SMTP_AVAILABLE) {
    try {
      const from = process.env.EMAIL_FROM || process.env.EMAIL_USER;
      await transporter.sendMail({ from, to, subject, text });
      return { sent: true, via: 'smtp' };
    } catch (err) {
      console.error('sendMail failed:', err);
      // If send failed (DNS or other transient error), fall back to logging in development if allowed
      if (fallbackAllowed) {
        const entry = `${new Date().toISOString()} | TO: ${to} | CODE: ${code} | SUBJ: ${subject} | SEND_ERROR: ${err.message}\n`;
        try {
          // Encolar para reintentos
          try { await enqueueOutbox({ to, subject, text, payload: { type: 'verification', code } }); } catch (e) { console.warn('No se pudo encolar en outbox:', e.message); }
          fs.appendFileSync(VERIF_LOG, entry);
          console.log('Email send failed; code logged to', VERIF_LOG, 'for', to);
          return { sent: false, fallback: true, logPath: VERIF_LOG };
        } catch (logErr) {
          console.error('Error writing verification debug log after send failure:', logErr);
          return { sent: false, error: err.message };
        }
      }

      return { sent: false, error: err.message };
    }
  }

  // SMTP not available -> fallback to development logging if allowed
  if (fallbackAllowed) {
    const entry = `${new Date().toISOString()} | TO: ${to} | CODE: ${code} | SUBJ: ${subject}\n`;
    try {
      try { await enqueueOutbox({ to, subject, text, payload: { type: 'verification', code } }); } catch (e) { console.warn('No se pudo encolar en outbox:', e.message); }
      fs.appendFileSync(VERIF_LOG, entry);
      console.log('Email fallback: verification code logged to', VERIF_LOG, 'for', to);
      return { sent: false, fallback: true, logPath: VERIF_LOG };
    } catch (err) {
      console.error('Error writing verification debug log:', err);
      return { sent: false, error: err.message };
    }
  }

  return { sent: false, error: 'SMTP/API unavailable and fallback not allowed' };
}

// Create HTTP server and Socket.IO
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*'
  }
});

io.on('connection', (socket) => {
  console.log('Socket connected:', socket.id);
  socket.on('disconnect', () => console.log('Socket disconnected:', socket.id));
});

function generateCode() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

// Health
app.get('/api/ping', (req, res) => res.json({ ok: true }));

// Register
app.post('/api/auth/register', async (req, res) => {
  const { name, email, password, user_type } = req.body;
  if (!name || !email || !password) return res.status(400).json({ error: 'Datos incompletos' });

  // Domain requirement: only tecmilenio.mx
  if (!email.toLowerCase().endsWith('@tecmilenio.mx')) {
    return res.status(400).json({ error: 'El correo debe pertenecer al dominio @tecmilenio.mx' });
  }

  const conn = await pool.getConnection();
  try {
      // Check existing
    const [existingRows] = await conn.query('SELECT id, is_active FROM users WHERE email = ?', [email]);
    if (existingRows.length > 0) {
      const existing = existingRows[0];
      if (existing.is_active) {
        return res.status(400).json({ error: 'Correo ya registrado' });
      }

      // Usuario existe pero no está verificado -> reenviar código y responder ok
      const userId = existing.id;
      const code = generateCode();
      const expirationMinutes = parseInt(process.env.VERIFICATION_EXPIRATION_MINUTES || '15', 10);
      const expiresAt = new Date(Date.now() + expirationMinutes * 60 * 1000);

      await conn.query(
        'INSERT INTO email_verifications (user_id, code, expires_at, verified) VALUES (?, ?, ?, ?)',
        [userId, code, expiresAt, false]
      );

      const mailOptionsResend = {
        subject: 'PlusZone - Código de verificación (reenvío)',
        text: `Tu código de verificación es: ${code}. El código expira en ${expirationMinutes} minutos.`
      };

      const sendResult = await sendVerificationEmail({ to: email, code, subject: mailOptionsResend.subject, text: mailOptionsResend.text });
      if (sendResult.sent) {
        return res.json({ ok: true, message: 'Cuenta existente pendiente de verificación. Se ha reenviado un código.' });
      }

      if (sendResult.fallback) {
        return res.json({ ok: true, warning: 'Cuenta pendiente de verificación. No se pudo enviar el correo; el código ha sido registrado en el servidor para desarrollo.' });
      }

      console.error('Error enviando email de reenvío para usuario existente:', sendResult.error || 'unknown');
      return res.status(500).json({ error: 'No se pudo enviar el correo de verificación. Contacta al administrador.' });
    }

    const password_hash = await bcrypt.hash(password, 10);

    const [result] = await conn.query(
      'INSERT INTO users (email, password_hash, name, user_type, image_url, description, is_active) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [email, password_hash, name, user_type || 'employee', null, null, false]
    );

    const userId = result.insertId;

    // Create an associated profile (not visible until verification - depends on users.is_active)
    await conn.query(
      'INSERT INTO profiles (user_id, name, description, detailed_description, tech_stack, salary, image_url, role) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [userId, name, '', '', JSON.stringify([]), '', null, user_type === 'company' ? 'job' : 'candidate']
    );

    // Create verification code
    const code = generateCode();
    const expirationMinutes = parseInt(process.env.VERIFICATION_EXPIRATION_MINUTES || '15', 10);
    const expiresAt = new Date(Date.now() + expirationMinutes * 60 * 1000);

    await conn.query(
      'INSERT INTO email_verifications (user_id, code, expires_at, verified) VALUES (?, ?, ?, ?)',
      [userId, code, expiresAt, false]
    );

    // Send email (no fracaso crítico: el usuario queda creado y puede solicitar reenvío)
    const mailOptions = {
      subject: 'PlusZone - Código de verificación',
      text: `Tu código de verificación es: ${code}. El código expira en ${expirationMinutes} minutos.`
    };

    const sendResult = await sendVerificationEmail({ to: email, code, subject: mailOptions.subject, text: mailOptions.text });
    if (sendResult.sent) {
      return res.json({ ok: true, message: 'Usuario registrado. Revisa tu correo para verificar la cuenta.' });
    }

    if (sendResult.fallback) {
      return res.json({ ok: true, warning: 'Cuenta creada, pero no se pudo enviar el correo de verificación. En desarrollo, el código se guardó en el servidor para depuración.' });
    }

    console.error('Usuario creado pero no se pudo enviar email de verificación:', sendResult.error || 'unknown');
    res.json({ ok: true, warning: 'Cuenta creada, pero no se pudo enviar el correo de verificación. Usa /api/auth/resend cuando la configuración de email esté disponible.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error interno' });
  } finally {
    conn.release();
  }
});

// Verify code
app.post('/api/auth/verify', async (req, res) => {
  const { email, code } = req.body;
  if (!email || !code) return res.status(400).json({ error: 'Datos incompletos' });

  const conn = await pool.getConnection();
  try {
    const [users] = await conn.query('SELECT id, is_active FROM users WHERE email = ?', [email]);
    if (users.length === 0) return res.status(404).json({ error: 'Usuario no encontrado' });

    const userId = users[0].id;

    const [rows] = await conn.query('SELECT id, code, expires_at, verified FROM email_verifications WHERE user_id = ? ORDER BY id DESC LIMIT 1', [userId]);
    if (rows.length === 0) return res.status(404).json({ error: 'Código no encontrado. Solicita uno nuevo.' });

    const record = rows[0];

    if (record.verified) return res.status(400).json({ error: 'Código ya verificado' });

    const now = new Date();
    if (now > new Date(record.expires_at)) return res.status(400).json({ error: 'Código expirado' });

    if (record.code !== code) return res.status(400).json({ error: 'Código incorrecto' });

    // Mark verification and activate user
    await conn.query('UPDATE email_verifications SET verified = ? WHERE id = ?', [true, record.id]);
    await conn.query('UPDATE users SET is_active = ? WHERE id = ?', [true, userId]);

    // Obtener perfil del usuario verificado y notificar a los clientes conectados
    try {
      const [profiles] = await conn.query('SELECT p.* FROM profiles p WHERE p.user_id = ? LIMIT 1', [userId]);
      const profile = profiles && profiles.length > 0 ? profiles[0] : null;
      io.emit('user_verified', { user: { id: userId, email }, profile });
    } catch (emitErr) {
      console.warn('Error al emitir evento user_verified:', emitErr);
    }

    res.json({ ok: true, message: 'Correo verificado correctamente' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error interno' });
  } finally {
    conn.release();
  }
});

// Resend verification code
app.post('/api/auth/resend', async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ error: 'Email requerido' });

  const conn = await pool.getConnection();
  try {
    const [users] = await conn.query('SELECT id FROM users WHERE email = ?', [email]);
    if (users.length === 0) return res.status(404).json({ error: 'Usuario no encontrado' });

    const userId = users[0].id;

    // Rate limit: máximo 3 reenvíos en la última hora
    const [[{ cnt }]] = await conn.query("SELECT COUNT(*) as cnt FROM email_verifications WHERE user_id = ? AND created_at > DATE_SUB(NOW(), INTERVAL 1 HOUR)", [userId]);
    if (cnt >= 3) return res.status(429).json({ error: 'Has solicitado demasiados códigos. Intenta más tarde.' });

    const code = generateCode();
    const expirationMinutes = parseInt(process.env.VERIFICATION_EXPIRATION_MINUTES || '15', 10);
    const expiresAt = new Date(Date.now() + expirationMinutes * 60 * 1000);

    await conn.query('INSERT INTO email_verifications (user_id, code, expires_at, verified) VALUES (?, ?, ?, ?)', [userId, code, expiresAt, false]);

    // Send email
    const mailOptions = {
      subject: 'PlusZone - Código de verificación (reenvío)',
      text: `Tu código de verificación es: ${code}. El código expira en ${expirationMinutes} minutos.`
    };

    const sendResult = await sendVerificationEmail({ to: email, code, subject: mailOptions.subject, text: mailOptions.text });
    if (sendResult.sent) {
      return res.json({ ok: true, message: 'Código reenviado. Revisa tu correo.' });
    }

    if (sendResult.fallback) {
      return res.json({ ok: true, warning: 'Código registrado en el servidor para desarrollo. Revisa el archivo de depuración.' });
    }

    console.error('Error reenviando código:', sendResult.error || 'unknown');
    res.status(500).json({ error: 'Error interno' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error interno' });
  } finally {
    conn.release();
  }
});

// Login
app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: 'Datos incompletos' });

  const conn = await pool.getConnection();
  try {
    const [rows] = await conn.query('SELECT id, email, password_hash, name, user_type, image_url, description, is_active FROM users WHERE email = ?', [email]);
    if (rows.length === 0) return res.status(404).json({ error: 'Usuario no encontrado' });

    const user = rows[0];
    const match = await bcrypt.compare(password, user.password_hash);
    if (!match) return res.status(401).json({ error: 'Credenciales inválidas' });
    if (!user.is_active) return res.status(403).json({ error: 'Correo no verificado' });

    // No token for now - simple sessionless response
    res.json({ ok: true, user: { id: user.id, email: user.email, name: user.name, type: user.user_type, imageUrl: user.image_url, description: user.description } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error interno' });
  } finally {
    conn.release();
  }
});

// Profiles: return profiles whose users are active
app.get('/api/profiles', async (req, res) => {
  const conn = await pool.getConnection();
  try {
    const [rows] = await conn.query(`
      SELECT p.*, u.email, u.user_type, u.is_active
      FROM profiles p
      JOIN users u ON p.user_id = u.id
      WHERE u.is_active = true
      ORDER BY p.created_at DESC
    `);

    res.json({ ok: true, profiles: rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error interno' });
  } finally {
    conn.release();
  }
});

// Simple endpoint to create profile for an existing user (used internally)
app.post('/api/profiles', async (req, res) => {
  const { user_id, name, role } = req.body;
  if (!user_id || !name) return res.status(400).json({ error: 'Datos incompletos' });

  const conn = await pool.getConnection();
  try {
    const [result] = await conn.query('INSERT INTO profiles (user_id, name, role) VALUES (?, ?, ?)', [user_id, name, role || 'candidate']);
    const newId = result.insertId;

    // Recuperar perfil creado para emitir evento en tiempo real
    try {
      const [rows] = await conn.query('SELECT p.*, u.email, u.user_type FROM profiles p JOIN users u ON p.user_id = u.id WHERE p.id = ? LIMIT 1', [newId]);
      const newProfile = rows && rows.length > 0 ? rows[0] : null;
      if (newProfile) {
        io.emit('profile_created', { profile: newProfile });
      }
    } catch (emitErr) {
      console.warn('Error al emitir profile_created:', emitErr);
    }

    res.json({ ok: true, id: result.insertId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error interno' });
  } finally {
    conn.release();
  }
});

// Servir archivos estáticos del frontend (para desarrollo local y prueba)
app.use(express.static(path.resolve(__dirname, '..', 'client')));
// SPA fallback: sirve index.html para rutas no-api
app.get('*', (req, res, next) => {
  if (req.path.startsWith('/api/')) return next();
  res.sendFile(path.resolve(__dirname, '..', 'client', 'index.html'));
});

// --- Asegurar base de datos / ejecutar migración automáticamente si es necesario ---
function runMigrationProcess() {
  return new Promise((resolve, reject) => {
    const { spawn } = require('child_process');
    const script = require('path').resolve(__dirname, 'init_db.js');
    console.log('Iniciando proceso de migración (init_db.js)...');
    const cp = spawn(process.execPath, [script], { stdio: 'inherit', env: process.env });
    cp.on('error', (err) => reject(err));
    cp.on('exit', (code) => {
      if (code === 0) return resolve();
      return reject(new Error('Proceso de migración finalizó con código ' + code));
    });
  });
}

async function ensureDatabaseReady() {
  const autoMigrate = (process.env.AUTO_MIGRATE || 'true').toLowerCase() !== 'false';
  const maxRetries = 8;
  let attempt = 0;

  while (attempt < maxRetries) {
    attempt++;
    try {
      const conn = await pool.getConnection();
      try {
        // Probar si la tabla users existe
        await conn.query('SELECT 1 FROM users LIMIT 1');
        conn.release();
        console.log('Base de datos lista: tablas disponibles.');
        return;
      } catch (err) {
        conn.release();
        if (err && (err.code === 'ER_NO_SUCH_TABLE' || /no such table/i.test(err.message))) {
          console.log('Tablas faltantes detectadas.');
          if (!autoMigrate) {
            throw new Error('AUTO_MIGRATE=false y tabla(s) faltantes detectadas. Ejecuta manualmente `npm run migrate` en `server` o activa AUTO_MIGRATE.');
          }
          console.log('Ejecutando migración automática...');
          await runMigrationProcess();
          return;
        }
        console.log(`Intento ${attempt}/${maxRetries}: error consultando la base de datos: ${err.message}`);
      }
    } catch (connErr) {
      // Si las credenciales son inválidas, no tiene sentido reintentar varias veces
      if (connErr && connErr.code === 'ER_ACCESS_DENIED_ERROR') {
        throw new Error('Acceso denegado al servidor MySQL. Revisa DB_USER/DB_PASSWORD en server/.env y que el servicio MySQL esté activo. Mensaje: ' + connErr.message);
      }
      console.log(`Intento ${attempt}/${maxRetries}: no se pudo conectar a la base de datos: ${connErr.message}`);
    }

    // Esperar antes del siguiente intento
    await new Promise(r => setTimeout(r, 1500));
  }

  // Si luego de los reintentos sigue fallando, intentar una migración directa (si está permitido)
  if (!autoMigrate) {
    throw new Error('Reintentos agotados y AUTO_MIGRATE=false. Ejecuta manualmente la migración en `server` con `npm run migrate`.');
  }

  console.log('Reintentos agotados. Intentando ejecutar migración de todas formas...');
  await runMigrationProcess();
}

// Iniciar servidor solo después de asegurar la DB
(async () => {
  try {
    await ensureDatabaseReady();
  } catch (err) {
    console.error('Error asegurando la base de datos:', err);
    process.exit(1);
  }

  const PORT = process.env.PORT || 4000;
  server.listen(PORT, () => console.log(`API + Socket.IO server listening on port ${PORT}`));
})();
