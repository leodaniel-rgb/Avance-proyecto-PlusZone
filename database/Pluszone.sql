-- PlusZone SQL: esquema reducido y semillas adaptadas
-- Reemplazado para que coincida con la API y el frontend actuales.
-- Ejecutar con MySQL Workbench o usando el script de migración `server/init_db.js`.

DROP DATABASE IF EXISTS `pluszone`;
CREATE DATABASE `pluszone` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `pluszone`;

-- Tabla de usuarios
CREATE TABLE IF NOT EXISTS users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255),
  name VARCHAR(255) NOT NULL,
  user_type ENUM('employee','company','admin') DEFAULT 'employee',
  image_url VARCHAR(500),
  description TEXT,
  tech_stack JSON,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  is_active BOOLEAN DEFAULT FALSE,
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
  role ENUM('candidate','job') DEFAULT 'candidate',
  image_url VARCHAR(500),
  category VARCHAR(100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  INDEX idx_role (role),
  INDEX idx_user_profiles (user_id)
);

-- Tabla de swipes
CREATE TABLE IF NOT EXISTS swipes (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  profile_id INT NOT NULL,
  direction ENUM('left','right') NOT NULL,
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

-- Tabla de verificación de correo
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

-- Tabla persistente para reintentos de envío (outbox)
CREATE TABLE IF NOT EXISTS email_outbox (
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
);

-- Seeds iniciales (sin password_hash; el script de migración aplicará los hashes bcrypt)
INSERT INTO users (email, name, user_type, image_url, description, is_active) VALUES
('admin@pluszone.com','Administrador','admin','https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&h=400&fit=crop','Usuario administrador del sistema', TRUE),
('admin2@pluszone.com','Admin Secundario','admin','https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop','Segundo usuario administrador', TRUE),
('j.gonzalez@tecmilenio.mx','Juan Gonzalez','employee','https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop','Desarrollador Frontend', TRUE),
('s.ramirez@tecmilenio.mx','Sofía Ramírez','employee','https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&h=400&fit=crop','Ingeniera Industrial', TRUE),
('empresa1@tecmilenio.mx','TechCorp','company','https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=400&h=400&fit=crop','Empresa tecnológica', TRUE);

-- Perfiles relacionados a usuarios seed
INSERT INTO profiles (user_id, name, description, detailed_description, tech_stack, salary, image_url, role, category) VALUES
((SELECT id FROM users WHERE email='admin@pluszone.com'), 'María García','Senior Full Stack Developer','Desarrolladora con más de 8 años de experiencia en aplicaciones web modernas.','["React","Node.js","TypeScript","PostgreSQL","AWS","Docker"]','$80,000 - $120,000','https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop','candidate','Informática'),
((SELECT id FROM users WHERE email='j.gonzalez@tecmilenio.mx'), 'Juan Gonzalez','Frontend Developer','Especialista en React y accesibilidad.','["React","Accessibility","HTML","CSS"]','$60,000 - $90,000','https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop','candidate','Informática'),
((SELECT id FROM users WHERE email='s.ramirez@tecmilenio.mx'), 'Sofía Ramírez','Ingeniera Industrial','Optimización de procesos y mejora continua.','["Lean","Six Sigma","Project Management"]','$70,000 - $100,000','https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&h=400&fit=crop','candidate','Industrial'),
((SELECT id FROM users WHERE email='empresa1@tecmilenio.mx'), 'TechCorp - Vacante Backend','Vacante Backend Senior','Buscamos backenders con experiencia en microservicios y AWS','["Java","Spring","AWS"]','$90,000 - $140,000','https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=400&h=400&fit=crop','job','Informática');

-- Ejemplo de match
INSERT INTO matches (user_id, profile_id) VALUES
((SELECT id FROM users WHERE email='admin@pluszone.com'), (SELECT id FROM profiles WHERE name='María García'));

-- Fin del esquema PlusZone



DROP TABLE IF EXISTS `notifications`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `notifications` (
  `notification_id` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT (uuid()),
  `user_id` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `notification_type` enum('new_match','new_message','event_reminder','group_invite','connection_request','system_alert') COLLATE utf8mb4_unicode_ci NOT NULL,
  `title` varchar(200) COLLATE utf8mb4_unicode_ci NOT NULL,
  `message` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `related_entity_type` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `related_entity_id` varchar(36) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `delivery_method` enum('push','email','in_app') COLLATE utf8mb4_unicode_ci DEFAULT 'in_app',
  `is_sent` tinyint(1) DEFAULT '0',
  `sent_at` datetime DEFAULT NULL,
  `is_read` tinyint(1) DEFAULT '0',
  `read_at` datetime DEFAULT NULL,
  `is_clicked` tinyint(1) DEFAULT '0',
  `clicked_at` datetime DEFAULT NULL,
  `priority` enum('low','medium','high','urgent') COLLATE utf8mb4_unicode_ci DEFAULT 'medium',
  `expires_at` datetime DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`notification_id`),
  KEY `idx_user_id` (`user_id`),
  KEY `idx_notification_type` (`notification_type`),
  KEY `idx_is_read` (`is_read`),
  KEY `idx_created_at` (`created_at` DESC),
  KEY `idx_priority_expires` (`priority`,`expires_at`),
  CONSTRAINT `notifications_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notifications`
--

LOCK TABLES `notifications` WRITE;
/*!40000 ALTER TABLE `notifications` DISABLE KEYS */;
/*!40000 ALTER TABLE `notifications` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `profile_views`
--

DROP TABLE IF EXISTS `profile_views`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `profile_views` (
  `view_id` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT (uuid()),
  `viewer_id` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `viewed_user_id` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `view_source` enum('discovery_feed','search','group','event','direct_link') COLLATE utf8mb4_unicode_ci DEFAULT 'discovery_feed',
  `view_duration_seconds` int DEFAULT NULL,
  `did_like` tinyint(1) DEFAULT '0',
  `did_superlike` tinyint(1) DEFAULT '0',
  `view_date` date GENERATED ALWAYS AS (cast(`viewed_at` as date)) STORED,
  `viewed_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`view_id`),
  UNIQUE KEY `uk_viewer_viewed_day` (`viewer_id`,`viewed_user_id`,`view_date`),
  KEY `idx_viewed_user` (`viewed_user_id`),
  KEY `idx_viewed_at` (`viewed_at` DESC),
  KEY `idx_view_source` (`view_source`),
  KEY `idx_view_date` (`view_date`),
  CONSTRAINT `profile_views_ibfk_1` FOREIGN KEY (`viewer_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE,
  CONSTRAINT `profile_views_ibfk_2` FOREIGN KEY (`viewed_user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `profile_views`
--

LOCK TABLES `profile_views` WRITE;
/*!40000 ALTER TABLE `profile_views` DISABLE KEYS */;
/*!40000 ALTER TABLE `profile_views` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reports`
--

DROP TABLE IF EXISTS `reports`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reports` (
  `report_id` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT (uuid()),
  `reporter_id` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `reported_entity_type` enum('user','message','group','event','profile') COLLATE utf8mb4_unicode_ci NOT NULL,
  `reported_entity_id` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `report_category` enum('inappropriate_content','harassment','spam','fake_profile','academic_misrepresentation','other') COLLATE utf8mb4_unicode_ci NOT NULL,
  `report_reason` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `evidence_urls` json DEFAULT NULL,
  `report_status` enum('pending','under_review','resolved','dismissed') COLLATE utf8mb4_unicode_ci DEFAULT 'pending',
  `assigned_admin_id` varchar(36) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `resolution_notes` text COLLATE utf8mb4_unicode_ci,
  `resolution_action` enum('warning','content_removal','temporary_suspension','permanent_ban','no_action') COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `resolved_at` datetime DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`report_id`),
  KEY `assigned_admin_id` (`assigned_admin_id`),
  KEY `idx_reporter` (`reporter_id`),
  KEY `idx_reported_entity` (`reported_entity_type`,`reported_entity_id`),
  KEY `idx_report_status` (`report_status`),
  KEY `idx_created_at` (`created_at` DESC),
  CONSTRAINT `reports_ibfk_1` FOREIGN KEY (`reporter_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE,
  CONSTRAINT `reports_ibfk_2` FOREIGN KEY (`assigned_admin_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reports`
--

LOCK TABLES `reports` WRITE;
/*!40000 ALTER TABLE `reports` DISABLE KEYS */;
/*!40000 ALTER TABLE `reports` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_activity_logs`
--

DROP TABLE IF EXISTS `user_activity_logs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_activity_logs` (
  `log_id` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT (uuid()),
  `user_id` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `activity_type` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `activity_details` json DEFAULT NULL,
  `ip_address` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_agent` text COLLATE utf8mb4_unicode_ci,
  `device_type` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`log_id`),
  KEY `idx_user_id` (`user_id`),
  KEY `idx_activity_type` (`activity_type`),
  KEY `idx_created_at` (`created_at` DESC),
  CONSTRAINT `user_activity_logs_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_activity_logs`
--

LOCK TABLES `user_activity_logs` WRITE;
/*!40000 ALTER TABLE `user_activity_logs` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_activity_logs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_interests`
--

DROP TABLE IF EXISTS `user_interests`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_interests` (
  `user_interest_id` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT (uuid()),
  `user_id` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `interest_id` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `interest_level` enum('low','medium','high','expert') COLLATE utf8mb4_unicode_ci DEFAULT 'medium',
  `weight` decimal(3,2) DEFAULT '0.50',
  `is_visible` tinyint(1) DEFAULT '1',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`user_interest_id`),
  UNIQUE KEY `uk_user_interest` (`user_id`,`interest_id`),
  KEY `idx_user_id` (`user_id`),
  KEY `idx_interest_id` (`interest_id`),
  CONSTRAINT `user_interests_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE,
  CONSTRAINT `user_interests_ibfk_2` FOREIGN KEY (`interest_id`) REFERENCES `interests` (`interest_id`) ON DELETE CASCADE,
  CONSTRAINT `user_interests_chk_1` CHECK ((`weight` between 0 and 1))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_interests`
--

LOCK TABLES `user_interests` WRITE;
/*!40000 ALTER TABLE `user_interests` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_interests` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `user_id` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT (uuid()),
  `institutional_email` varchar(150) COLLATE utf8mb4_unicode_ci NOT NULL,
  `personal_email` varchar(150) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `phone_number` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password_hash` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `first_name` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_name` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `date_of_birth` date DEFAULT NULL,
  `gender` enum('male','female','non_binary','prefer_not_to_say') COLLATE utf8mb4_unicode_ci DEFAULT 'prefer_not_to_say',
  `pronouns` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `campus_code` varchar(10) COLLATE utf8mb4_unicode_ci NOT NULL,
  `major_code` varchar(10) COLLATE utf8mb4_unicode_ci NOT NULL,
  `semester` int NOT NULL,
  `student_id` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `enrollment_year` year NOT NULL,
  `expected_graduation` year DEFAULT NULL,
  `bio` text COLLATE utf8mb4_unicode_ci,
  `avatar_url` varchar(500) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `cover_photo_url` varchar(500) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `profile_completion_percentage` decimal(5,2) DEFAULT '0.00',
  `profile_visibility` enum('public','connections_only','private') COLLATE utf8mb4_unicode_ci DEFAULT 'connections_only',
  `is_email_verified` tinyint(1) DEFAULT '0',
  `is_phone_verified` tinyint(1) DEFAULT '0',
  `email_verification_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `phone_verification_code` varchar(6) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `verification_expires_at` datetime DEFAULT NULL,
  `account_status` enum('active','pending_verification','suspended','deactivated') COLLATE utf8mb4_unicode_ci DEFAULT 'pending_verification',
  `suspension_reason` text COLLATE utf8mb4_unicode_ci,
  `suspension_until` datetime DEFAULT NULL,
  `last_login` datetime DEFAULT NULL,
  `last_active` datetime DEFAULT NULL,
  `notification_preferences` json DEFAULT NULL,
  `privacy_settings` json DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `institutional_email` (`institutional_email`),
  UNIQUE KEY `phone_number` (`phone_number`),
  UNIQUE KEY `student_id` (`student_id`),
  KEY `idx_institutional_email` (`institutional_email`),
  KEY `idx_phone_number` (`phone_number`),
  KEY `idx_campus_major` (`campus_code`,`major_code`),
  KEY `idx_status_active` (`account_status`),
  KEY `idx_last_active` (`last_active`),
  FULLTEXT KEY `idx_search_names` (`first_name`,`last_name`),
  CONSTRAINT `users_chk_1` CHECK ((`semester` between 1 and 12))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-02-01 22:41:59
