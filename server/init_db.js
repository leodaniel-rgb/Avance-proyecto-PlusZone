require('dotenv').config();
const path = require('path');
const fs = require('fs');
const { pool } = require('./db');
const bcrypt = require('bcryptjs');

const SQL_PATH = path.resolve(__dirname, '..', 'database', 'pluszone_supabase.sql');

// Divide el SQL en enunciados respetando bloques DO $$ ... $$;
function splitSql(sql) {
  const statements = [];
  let current = '';
  let inDollar = false;
  let i = 0;
  while (i < sql.length) {
    if (!inDollar && sql[i] === '$' && sql[i + 1] === '$') {
      inDollar = true;
      current += sql[i] + sql[i + 1];
      i += 2;
      continue;
    }
    if (inDollar && sql[i] === '$' && sql[i + 1] === '$') {
      inDollar = false;
      current += sql[i] + sql[i + 1];
      i += 2;
      continue;
    }
    if (!inDollar && sql[i] === ';') {
      const stmt = current.trim();
      if (stmt && !stmt.startsWith('--')) statements.push(stmt);
      current = '';
      i++;
      continue;
    }
    current += sql[i];
    i++;
  }
  if (current.trim() && !current.trim().startsWith('--')) statements.push(current.trim());
  return statements;
}

async function run() {
  const client = await pool.connect();
  try {
    // 1) Ejecutar esquema si existe el archivo
    if (fs.existsSync(SQL_PATH)) {
      const sql = fs.readFileSync(SQL_PATH, 'utf8');
      const trimmed = sql.split('-- Fin del esquema PlusZone')[0].trim();
      const statements = splitSql(trimmed);
      for (const stmt of statements) {
        if (!stmt) continue;
        try {
          await client.query(stmt);
        } catch (err) {
          if (err.code === '42P07' || err.message.includes('already exists')) continue;
          throw err;
        }
      }
      console.log('Esquema aplicado.');
    } else {
      await client.query('SELECT 1 FROM users LIMIT 1');
      console.log('Tabla users existe, omitiendo esquema.');
    }

    // 2) Seeds: usuarios de prueba con password hasheado
    const testUsers = [
      { email: 'admin@pluszone.com', name: 'Administrador', password: 'admin123', user_type: 'admin', is_active: true },
      { email: 'admin2@pluszone.com', name: 'Admin Secundario', password: 'admin123', user_type: 'admin', is_active: true },
      { email: 'j.gonzalez@tecmilenio.mx', name: 'Juan Gonzalez', password: 'demo123', user_type: 'employee', is_active: true },
      { email: 's.ramirez@tecmilenio.mx', name: 'Sofía Ramírez', password: 'demo123', user_type: 'employee', is_active: true },
      { email: 'empresa1@tecmilenio.mx', name: 'TechCorp', password: 'demo123', user_type: 'company', is_active: true }
    ];

    for (const u of testUsers) {
      const { rows: exists } = await client.query('SELECT id FROM users WHERE email = $1', [u.email]);
      if (exists.length === 0) {
        const password_hash = await bcrypt.hash(u.password, 10);
        const { rows: ins } = await client.query(
          `INSERT INTO users (email, password_hash, name, user_type, is_active) VALUES ($1, $2, $3, $4, $5) RETURNING id`,
          [u.email, password_hash, u.name, u.user_type, u.is_active]
        );
        const userId = ins[0].id;
        const { rows: prof } = await client.query('SELECT id FROM profiles WHERE user_id = $1', [userId]);
        if (prof.length === 0) {
          await client.query(
            `INSERT INTO profiles (user_id, name, description, role, image_url) VALUES ($1, $2, $3, $4, $5)`,
            [userId, u.name, u.user_type === 'company' ? 'Empresa de ejemplo' : 'Perfil creado por migración', u.user_type === 'company' ? 'job' : 'candidate', null]
          );
        }
        console.log('Usuario creado:', u.email);
      } else {
        console.log('Usuario ya existe:', u.email);
      }
    }

    // Perfil "María García" para admin (seed de ejemplo) y match
    const { rows: adminUser } = await client.query("SELECT id FROM users WHERE email = 'admin@pluszone.com'");
    if (adminUser.length) {
      const { rows: mariaExists } = await client.query("SELECT id FROM profiles WHERE user_id = $1 AND name = 'María García'", [adminUser[0].id]);
      if (mariaExists.length === 0) {
        await client.query(
          `INSERT INTO profiles (user_id, name, description, detailed_description, tech_stack, salary, image_url, role, category) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
          [adminUser[0].id, 'María García', 'Senior Full Stack Developer', 'Desarrolladora con más de 8 años de experiencia.', JSON.stringify(['React', 'Node.js', 'TypeScript', 'PostgreSQL', 'AWS', 'Docker']), '$80,000 - $120,000', 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop', 'candidate', 'Informática']
        );
        console.log('Perfil María García creado.');
      }
      const { rows: mariaProfile } = await client.query("SELECT id FROM profiles WHERE name = 'María García' LIMIT 1");
      if (mariaProfile.length) {
        const { rows: existsMatch } = await client.query('SELECT id FROM matches WHERE user_id = $1 AND profile_id = $2', [adminUser[0].id, mariaProfile[0].id]);
        if (existsMatch.length === 0) {
          await client.query('INSERT INTO matches (user_id, profile_id) VALUES ($1, $2)', [adminUser[0].id, mariaProfile[0].id]);
          console.log('Match de ejemplo creado.');
        }
      }
    }

    console.log('Migración completada.');
  } catch (err) {
    console.error('Error:', err);
    process.exit(1);
  } finally {
    client.release();
    await pool.end();
  }
}

run();
