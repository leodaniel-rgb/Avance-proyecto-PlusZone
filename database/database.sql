-- Base de datos PlusZone
-- Estructura para usuarios admin (pruebas)

-- Tabla de usuarios
CREATE TABLE IF NOT EXISTS users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    user_type ENUM('employee', 'company', 'admin') DEFAULT 'employee',
    image_url VARCHAR(500),
    description TEXT,
    tech_stack JSON,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    is_active BOOLEAN DEFAULT TRUE,
    INDEX idx_email (email),
    INDEX idx_user_type (user_type)
);

-- Tabla de perfiles
CREATE TABLE IF NOT EXISTS profiles (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    name VARCHAR(255) NOT NULL,
    description VARCHAR(500),
    detailed_description TEXT,
    tech_stack JSON,
    salary VARCHAR(100),
    image_url VARCHAR(500),
    role ENUM('candidate', 'job') DEFAULT 'candidate',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_role (role)
);

-- Tabla de swipes
CREATE TABLE IF NOT EXISTS swipes (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    profile_id INT NOT NULL,
    direction ENUM('left', 'right') NOT NULL,
    swiped_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (profile_id) REFERENCES profiles(id) ON DELETE CASCADE,
    UNIQUE KEY unique_swipe (user_id, profile_id),
    INDEX idx_user_swipes (user_id),
    INDEX idx_profile_swipes (profile_id)
);

-- Tabla de matches
CREATE TABLE IF NOT EXISTS matches (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    profile_id INT NOT NULL,
    matched_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (profile_id) REFERENCES profiles(id) ON DELETE CASCADE,
    UNIQUE KEY unique_match (user_id, profile_id),
    INDEX idx_user_matches (user_id),
    INDEX idx_profile_matches (profile_id)
);

-- Tabla de mensajes (para futuro)
CREATE TABLE IF NOT EXISTS messages (
    id INT PRIMARY KEY AUTO_INCREMENT,
    match_id INT NOT NULL,
    sender_id INT NOT NULL,
    receiver_id INT NOT NULL,
    message TEXT NOT NULL,
    sent_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    read_at TIMESTAMP NULL,
    FOREIGN KEY (match_id) REFERENCES matches(id) ON DELETE CASCADE,
    FOREIGN KEY (sender_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (receiver_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_match_messages (match_id),
    INDEX idx_user_messages (sender_id, receiver_id)
);

-- Insertar usuarios admin de prueba
-- Contraseña: admin123 (en producción debe estar hasheada)
INSERT INTO users (email, password_hash, name, user_type, image_url, description) VALUES
('admin@pluszone.com', '$2b$10$example_hash_here', 'Administrador', 'admin', 
 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&h=400&fit=crop',
 'Usuario administrador del sistema'),
('admin2@pluszone.com', '$2b$10$example_hash_here', 'Admin Secundario', 'admin',
 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
 'Segundo usuario administrador');

-- Insertar algunos perfiles de ejemplo
INSERT INTO profiles (user_id, name, description, detailed_description, tech_stack, salary, image_url, role) VALUES
(1, 'María García', 'Senior Full Stack Developer', 
 'Desarrolladora con más de 8 años de experiencia en aplicaciones web modernas.',
 '["React", "Node.js", "TypeScript", "PostgreSQL", "AWS", "Docker"]',
 '$80,000 - $120,000',
 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
 'candidate');

-- Consultas útiles para administradores
-- Ver todos los usuarios
-- SELECT * FROM users WHERE user_type = 'admin';

-- Ver todas las acciones de swipes
-- SELECT u.email, p.name as profile_name, s.direction, s.swiped_at 
-- FROM swipes s
-- JOIN users u ON s.user_id = u.id
-- JOIN profiles p ON s.profile_id = p.id
-- ORDER BY s.swiped_at DESC;

-- Ver todos los matches
-- SELECT u.email, p.name as matched_profile, m.matched_at
-- FROM matches m
-- JOIN users u ON m.user_id = u.id
-- JOIN profiles p ON m.profile_id = p.id
-- ORDER BY m.matched_at DESC;

-- Tabla para códigos de verificación por correo (registro/recuperación)
CREATE TABLE IF NOT EXISTS email_verifications (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    code VARCHAR(10) NOT NULL,
    expires_at TIMESTAMP NOT NULL,
    verified BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_user_verif (user_id),
    INDEX idx_code (code)
);

-- Semillas adicionales: más perfiles para tener más matches de ejemplo
INSERT INTO users (email, password_hash, name, user_type, image_url, description, is_active) VALUES
('j.gonzalez@tecmilenio.mx', '$2b$10$example_hash_here', 'Juan Gonzalez', 'employee', 'https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?w=400&h=400&fit=crop', 'Desarrollador Frontend', true),
('s.ramirez@tecmilenio.mx', '$2b$10$example_hash_here', 'Sofía Ramírez', 'employee', 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop', 'Ingeniera Industrial', true),
('empresa1@tecmilenio.mx', '$2b$10$example_hash_here', 'TechCorp', 'company', 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=400&h=400&fit=crop', 'Empresa tecnológica', true);

-- Añadir perfiles asociados a estas cuentas
INSERT INTO profiles (user_id, name, description, detailed_description, tech_stack, salary, image_url, role) VALUES
((SELECT id FROM users WHERE email = 'j.gonzalez@tecmilenio.mx'), 'Juan Gonzalez', 'Frontend Developer', 'Especialista en React y accesibilidad.', '[]', '$60,000 - $90,000', 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop', 'candidate'),
((SELECT id FROM users WHERE email = 's.ramirez@tecmilenio.mx'), 'Sofía Ramírez', 'Ingeniera Industrial', 'Optimización de procesos y mejora continua.', '[]', '$70,000 - $100,000', 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&h=400&fit=crop', 'candidate'),
((SELECT id FROM users WHERE email = 'empresa1@tecmilenio.mx'), 'TechCorp - Vacante Backend', 'Vacante Backend Senior', 'Buscamos backenders con experiencia en microservicios y AWS', '[]', '$90,000 - $140,000', 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=400&h=400&fit=crop', 'job');

-- Matches de ejemplo (simulando matches previos)
INSERT INTO matches (user_id, profile_id) VALUES
((SELECT id FROM users WHERE email = 'admin@pluszone.com'), (SELECT id FROM profiles WHERE name = 'María García')), 
((SELECT id FROM users WHERE email = 'admin2@pluszone.com'), (SELECT id FROM profiles WHERE name = 'Carlos Rodríguez'));

