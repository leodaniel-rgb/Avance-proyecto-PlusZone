Resumen rápido de la API

Endpoints principales:
- GET /api/ping -> comprobar si el servidor está activo
- POST /api/auth/register -> { name, email, password, user_type } (email debe terminar en @tecmilenio.mx)
- POST /api/auth/verify -> { email, code }
- POST /api/auth/login -> { email, password }
- GET /api/profiles -> obtener perfiles visibles (solo usuarios verificados)
- POST /api/profiles -> { user_id, name, role } crear perfil para usuario

Instalación local:
1. cd server
2. cp .env.example .env y configurar credenciales de MySQL y SMTP
   - Asegúrate de que `DB_NAME` coincida con `pluszone` o ajusta `database/Pluszone.sql` según corresponda.
3. npm install

Migración / Crear base de datos y seeds:
- Opción rápida (recomendado):
  - Ejecuta `npm run migrate` desde el directorio `server` (ejecuta `init_db.js` que crea la base de datos, tablas y seeds). 
  - Si usas Windows PowerShell: `npm run migrate` funciona igual.
- Opción alternativa: abrir `database/Pluszone.sql` en MySQL Workbench y ejecutarlo manualmente.

4. npm run dev (o npm start)

Notas:
- Usa nodemailer para enviar el código de verificación
- El servidor habilita rate-limiting (60 req/min por IP)
- El servidor emite eventos en tiempo real vía Socket.IO (evento `user_verified`) cuando un usuario verifica su correo. El servidor también emite `profile_created` cuando se crea un perfil mediante la API. El frontend puede suscribirse a estos eventos para actualizar la lista de perfiles sin necesidad de polling.

Consejos:
- Para pruebas de email sin mandar correos reales usa Mailtrap o servicios similares; configura `EMAIL_*` en `.env`.
- Si vas a desplegar, no uses credenciales en texto plano; usa un secret manager y un SMTP confiable.

