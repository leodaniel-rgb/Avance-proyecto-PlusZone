const fs = require('fs');
const path = require('path');
const mysql = require('mysql2/promise');
const bcrypt = require('bcrypt');
require('dotenv').config();

async function run() {
  const sqlPath = path.resolve(__dirname, '..', 'database', 'Pluszone.sql');
  if (!fs.existsSync(sqlPath)) {
    console.error('No se encontró Pluszone.sql en database/. Asegúrate de que exista.');
    process.exit(1);
  }

  const sql = fs.readFileSync(sqlPath, 'utf8');

  // Trim any trailing dump content past the schema marker to avoid incompatible dump fragments
  const MARKER = '-- Fin del esquema PlusZone';
  let trimmedSql = sql;
  const idx = sql.indexOf(MARKER);
  if (idx !== -1) {
    trimmedSql = sql.slice(0, idx + MARKER.length);
  }

  // Conectar sin base de datos para crearla e importar el dump
  const getEnv = (k, fallback) => {
    const v = process.env[k];
    if (typeof v === 'string') return v.trim();
    return fallback;
  };

  const tmpConn = await mysql.createConnection({
    host: getEnv('DB_HOST', 'localhost'),
    port: parseInt(getEnv('DB_PORT', '3306'), 10),
    user: getEnv('DB_USER', 'root'),
    password: getEnv('DB_PASSWORD', ''),
    multipleStatements: true
  });

  try {
    console.log('Ejecutando migración SQL (trimmed to schema marker)...');
    await tmpConn.query(trimmedSql);
    console.log('Esquema y seeds ejecutados.');
  } catch (err) {
    console.error('Error ejecutando SQL:', err);
    process.exit(1);
  } finally {
    await tmpConn.end();
  }

  // Conectar a la base de datos y asegurarse de que las cuentas de prueba tengan passwords hasheadas
  const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 3306,
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'pluszone',
    waitForConnections: true,
    connectionLimit: 10
  });

  const testUsers = [
    { email: 'admin@pluszone.com', name: 'Administrador', password: 'admin123', user_type: 'admin', is_active: true },
    { email: 'admin2@pluszone.com', name: 'Admin Secundario', password: 'admin123', user_type: 'admin', is_active: true },
    { email: 'j.gonzalez@tecmilenio.mx', name: 'Juan Gonzalez', password: 'demo123', user_type: 'employee', is_active: true },
    { email: 's.ramirez@tecmilenio.mx', name: 'Sofía Ramírez', password: 'demo123', user_type: 'employee', is_active: true },
    { email: 'empresa1@tecmilenio.mx', name: 'TechCorp', password: 'demo123', user_type: 'company', is_active: true }
  ];

  try {
    for (const u of testUsers) {
      const [exists] = await pool.query('SELECT id FROM users WHERE email = ?', [u.email]);
      if (exists.length === 0) {
        const password_hash = await bcrypt.hash(u.password, 10);
        const [res] = await pool.query('INSERT INTO users (email, password_hash, name, user_type, is_active) VALUES (?, ?, ?, ?, ?)', [u.email, password_hash, u.name, u.user_type, u.is_active]);
        const userId = res.insertId;

        // Crear perfil si no existe
        const [profiles] = await pool.query('SELECT id FROM profiles WHERE user_id = ?', [userId]);
        if (profiles.length === 0) {
          await pool.query('INSERT INTO profiles (user_id, name, description, role, image_url) VALUES (?, ?, ?, ?, ?)', [userId, u.name, u.user_type === 'company' ? 'Empresa de ejemplo' : 'Perfil creado por migración', u.user_type === 'company' ? 'job' : 'candidate', null]);
        }

        console.log('Usuario creado:', u.email);
      } else {
        console.log('Usuario ya existe, saltando:', u.email);
      }
    }

    // Asegurar que exista al menos un match de ejemplo
    const [[adminUser]] = await pool.query('SELECT id FROM users WHERE email = ?', ['admin@pluszone.com']);
    const [[mariaProfile]] = await pool.query("SELECT p.id FROM profiles p WHERE p.name = 'María García' LIMIT 1");
    if (adminUser && mariaProfile) {
      const [existsMatch] = await pool.query('SELECT id FROM matches WHERE user_id = ? AND profile_id = ?', [adminUser.id, mariaProfile.id]);
      if (existsMatch.length === 0) {
        await pool.query('INSERT INTO matches (user_id, profile_id) VALUES (?, ?)', [adminUser.id, mariaProfile.id]);
        console.log('Match de ejemplo creado.');
      }
    }

    // Asegurar tabla outbox para reintentos de envío de correo
    try {
      await pool.query(`CREATE TABLE IF NOT EXISTS email_outbox (
        id INT PRIMARY KEY AUTO_INCREMENT,
        to_email VARCHAR(255) NOT NULL,
        subject VARCHAR(255),
        text TEXT,
        payload JSON,
        status ENUM('pending','sending','sent','failed') DEFAULT 'pending',
        attempts INT DEFAULT 0,
        last_error TEXT,
        next_attempt_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
        INDEX idx_status_next (status, next_attempt_at)
      )`);
      console.log('Tabla email_outbox disponible.');
    } catch (err) {
      console.warn('No se pudo crear/verificar email_outbox:', err.message);
    }

    console.log('Migración completada con éxito.');
  } catch (err) {
    console.error('Error en la fase de seeds:', err);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

run().catch(err => { console.error('Error inesperado:', err); process.exit(1); });
