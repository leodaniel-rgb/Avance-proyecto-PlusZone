const mysql = require('mysql2/promise');
require('dotenv').config();

const getEnv = (k, fallback) => {
  const v = process.env[k];
  if (typeof v === 'string') return v.trim();
  return fallback;
};

const pool = mysql.createPool({
  host: getEnv('DB_HOST', 'localhost'),
  port: parseInt(getEnv('DB_PORT', '3306'), 10),
  user: getEnv('DB_USER', 'root'),
  password: getEnv('DB_PASSWORD', ''),
  database: getEnv('DB_NAME', 'pluszone'),
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

module.exports = {
  pool
};
