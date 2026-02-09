require('dotenv').config();
const nodemailer = require('nodemailer');
const { pool } = require('./db');

const INTERVAL = parseInt(process.env.OUTBOX_WORKER_INTERVAL_SECONDS || '30', 10) * 1000;
const BASE = parseInt(process.env.OUTBOX_RETRY_BASE_SECONDS || '60', 10);
const MAX_ATTEMPTS = parseInt(process.env.OUTBOX_MAX_ATTEMPTS || '6', 10);

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: process.env.EMAIL_SECURE === 'true',
  auth: process.env.EMAIL_USER ? { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS } : undefined
});

let SMTP_AVAILABLE = false;
(async () => {
  try {
    await transporter.verify();
    SMTP_AVAILABLE = true;
    console.log('Worker: SMTP available');
  } catch (err) {
    SMTP_AVAILABLE = false;
    console.warn('Worker: SMTP not available:', err.message);
  }
})();

// Minimal token cache
let apiTokenCache = { token: null, expiresAt: 0 };
async function getApiToken() {
  const enabled = (process.env.EMAIL_API_ENABLED || 'false').toLowerCase() === 'true';
  if (!enabled) return null;
  if (apiTokenCache.token && Date.now() < apiTokenCache.expiresAt - 30000) return apiTokenCache.token;
  try {
    const base = (process.env.EMAIL_API_BASE || 'https://pro.api.serversmtp.com/api/v2').replace(/\/$/, '');
    const resp = await fetch(base + '/authorize', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ consumerKey: (process.env.EMAIL_CONSUMER_KEY || '').trim(), consumerSecret: (process.env.EMAIL_CONSUMER_SECRET || '').trim() })
    });
    if (!resp.ok) { console.warn('Worker: authorize failed', resp.status); return null; }
    const body = await resp.json();
    const token = body.apiKey || body.token || (body.data && (body.data.apiKey || body.data.token));
    const expiresIn = parseInt(body.expiresIn || body.expires_in || 3600, 10) || 3600;
    if (token) { apiTokenCache.token = token; apiTokenCache.expiresAt = Date.now() + expiresIn * 1000; return token; }
    return null;
  } catch (err) { console.warn('Worker: getApiToken error', err.message || err); return null; }
}

async function sendViaApi({ to, subject, text }) {
  try {
    const base = (process.env.EMAIL_API_BASE || 'https://pro.api.serversmtp.com/api/v2').replace(/\/$/, '');
    const token = await getApiToken();
    if (!token) return { sent: false, error: 'No API token' };
    const payload = { mail: { from: process.env.EMAIL_FROM || process.env.EMAIL_USER, to: [{ email: to }], subject, text } };
    const resp = await fetch(base + '/mail/send', { method: 'POST', headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token }, body: JSON.stringify(payload) });
    if (!resp.ok) { const txt = await resp.text(); return { sent: false, error: txt }; }
    return { sent: true };
  } catch (err) { return { sent: false, error: err.message || String(err) }; }
}

async function processOne() {
  const conn = await pool.getConnection();
  try {
    // Claim one pending job
    const [uRes] = await conn.query("UPDATE email_outbox SET status='sending', updated_at=NOW() WHERE id = (SELECT id FROM (SELECT id FROM email_outbox WHERE status='pending' AND next_attempt_at <= NOW() ORDER BY next_attempt_at LIMIT 1) x)");
    if (!uRes || uRes.affectedRows === 0) return; // nothing to process

    const [[row]] = await conn.query('SELECT * FROM email_outbox WHERE status = ? ORDER BY updated_at DESC LIMIT 1', ['sending']);
    if (!row) return;

    const id = row.id;
    const to = row.to_email;
    const subject = row.subject;
    const text = row.text;
    const payload = row.payload ? JSON.parse(row.payload) : {};
    const attempts = parseInt(row.attempts || '0', 10);

    console.log('Worker: processing outbox id', id, 'to', to, 'attempts', attempts);

    // Try API first
    if ((process.env.EMAIL_API_ENABLED || 'false').toLowerCase() === 'true') {
      const apiRes = await sendViaApi({ to, subject, text });
      if (apiRes.sent) {
        await conn.query('UPDATE email_outbox SET status = ?, attempts = attempts + 1, last_error = NULL, updated_at = NOW() WHERE id = ?', ['sent', id]);
        console.log('Worker: sent via API id', id);
        return;
      }
      console.warn('Worker: API send failed for id', id, apiRes.error);
    }

    // Try SMTP
    if (SMTP_AVAILABLE) {
      try {
        const from = process.env.EMAIL_FROM || process.env.EMAIL_USER;
        await transporter.sendMail({ from, to, subject, text });
        await conn.query('UPDATE email_outbox SET status = ?, attempts = attempts + 1, last_error = NULL, updated_at = NOW() WHERE id = ?', ['sent', id]);
        console.log('Worker: sent via SMTP id', id);
        return;
      } catch (err) {
        console.warn('Worker: SMTP send failed for id', id, err.message || err);
      }
    }

    // Still failed: schedule retry or mark failed
    const nextAttempts = attempts + 1;
    const willFail = nextAttempts >= MAX_ATTEMPTS;
    const backoffSecs = Math.floor(BASE * Math.pow(2, attempts));
    const [res] = await conn.query('UPDATE email_outbox SET attempts = ?, last_error = ?, next_attempt_at = DATE_ADD(NOW(), INTERVAL ? SECOND), status = ? WHERE id = ?', [nextAttempts, 'transient failure', backoffSecs, willFail ? 'failed' : 'pending', id]);
    console.log('Worker: updated outbox id', id, 'status', willFail ? 'failed' : 'pending', 'next in', backoffSecs, 's');
  } catch (err) {
    console.error('Worker error:', err);
  } finally {
    conn.release();
  }
}

async function loop() {
  while (true) {
    try { await processOne(); } catch (err) { console.error('ProcessOne error:', err); }
    await new Promise(r => setTimeout(r, INTERVAL));
  }
}

console.log('Outbox worker started. Interval:', INTERVAL / 1000, 's, base retry:', BASE, 's, max attempts:', MAX_ATTEMPTS);
loop().catch(err => { console.error('Worker terminated:', err); process.exit(1); });