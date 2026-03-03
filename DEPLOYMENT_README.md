## Configuración de PlusZone (Railway + GitHub Pages + Supabase)

Este documento resume cómo dejar el proyecto funcionando con la menor complejidad posible:

- **Frontend**: GitHub Pages (`client`).
- **Backend**: Node/Express en Railway (`server`).
- **Base de datos**: PostgreSQL de Supabase (conexión directa).
- **Verificación de correo**: código de 7 dígitos enviado por SMTP (ej. Brevo). No es necesario usar el flujo complejo de API HTTP del proveedor ni Supabase Auth.

---

### 1. Supabase (base de datos)

1. Crea un proyecto en Supabase.
2. Ve a **Project Settings → Database → Connection string → Direct connection (Node.js / pg)**.
3. Copia la URI y úsala como `DATABASE_URL`.
4. (Opcional, pero recomendado) Ejecuta el script de seed:
   - Abre el editor SQL de Supabase.
   - Copia el contenido de `supabase/seed.sql`.
   - Ejecuta el script para crear usuarios/perfiles de prueba.

No es obligatorio configurar Supabase Auth; el backend puede funcionar solo con el flujo de código de verificación.

---

### 2. Backend en Railway (server)

#### 2.1. Conectar el repositorio

1. En Railway, crea un nuevo proyecto y conéctalo al repositorio `leodaniel-rgb/Avance-proyecto-PlusZone`.
2. Selecciona el servicio Node (no hace falta más de un servicio para el backend).

#### 2.2. Comandos de build y start

El `package.json` raíz ya está preparado:

- **Build (opcional)**: Railway puede ejecutar automáticamente `npm install`.
- **Start command**: usa `npm start`.

Eso dispara el script:

- `"start": "npm run server:start"` → `"server:start": "node server/index.js"`.

#### 2.3. Variables de entorno en Railway

En el panel del servicio Node, sección **Environment / Variables**, configura:

- **Base de datos Supabase**
  - `DATABASE_URL` = `postgresql://postgres:TU_PASSWORD@db.xxxx.supabase.co:5432/postgres`

- **SMTP (Brevo, u otro proveedor)**
  - `EMAIL_HOST` = `smtp-relay.brevo.com`
  - `EMAIL_PORT` = `587`
  - `EMAIL_SECURE` = `false`
  - `EMAIL_USER` = *usuario SMTP del proveedor* (no lo subas al repo)
  - `EMAIL_PASS` = *contraseña/API key SMTP* (no la subas al repo)
  - `EMAIL_FROM` = correo remitente verificado (ej. `pluszone@tu-dominio.com`)
  - `EMAIL_FALLBACK` = `true`
  - `EMAIL_API_ENABLED` = `false` (usa solo SMTP, más simple)

- **Código de verificación**
  - `VERIFICATION_EXPIRATION_MINUTES` = `15`

- **Opcionales**
  - `PORT` = `4000`
  - `NODE_ENV` = `production`
  - `AUTO_MIGRATE` = `true` (permite que `server/init_db.js` cree tablas si faltan).

> Importante: **no** guardar estas credenciales en archivos versionados; solo en variables de entorno de Railway.

#### 2.4. Probar el backend

1. Reinicia el servicio en Railway.
2. Abre en el navegador: `https://TU_SERVICIO.up.railway.app/api/ping`.
3. Deberías ver `{ ok: true }`. Si no, revisa los logs de Railway (errores de conexión a Supabase o SMTP).

---

### 3. Frontend en GitHub Pages (client)

El workflow `.github/workflows/deploy-pages.yml` genera el contenido estático y crea un `config.js` con las URLs necesarias.

#### 3.1. Crear secrets de Actions

En GitHub, dentro del repositorio:

1. Ve a **Settings → Secrets and variables → Actions → Secrets**.
2. Crea estos secrets:

- `API_BASE_URL` → URL pública del backend en Railway, por ejemplo:
  - `https://TU_SERVICIO.up.railway.app`
- `SUPABASE_URL` → URL del proyecto Supabase (o deja vacío si no vas a usar Supabase Auth).
- `SUPABASE_ANON_KEY` → anon public key de Supabase (o deja vacío si no usas Supabase Auth).

> Si `SUPABASE_URL` y `SUPABASE_ANON_KEY` están vacíos, el frontend usará solo el backend propio (código de verificación por correo) y no intentará usar Supabase Auth.

#### 3.2. Ejecutar el deploy

1. Ve a **Actions** en GitHub.
2. Ejecuta manualmente el workflow **"Deploy to GitHub Pages"** (o haz push a `main`).
3. El workflow:
   - Copia `client/` a una carpeta `deploy/`.
   - Genera `deploy/config.js` con los valores de los secrets.
   - Publica `deploy/` en GitHub Pages.

La app quedará accesible en:

- `https://leodaniel-rgb.github.io/Avance-proyecto-PlusZone/`

---

### 4. Flujo de uso simplificado

1. Un usuario se registra con un correo `@tecmilenio.mx` desde la app (GitHub Pages).
2. El frontend envía la solicitud a `POST {API_BASE_URL}/api/auth/register`.
3. El backend:
   - Valida que el correo termina en `@tecmilenio.mx`.
   - Crea usuario y perfil en Supabase (tabla `users` / `profiles`).
   - Genera un código de 7 dígitos y lo guarda en `email_verifications`.
   - Envía el código al correo del usuario usando SMTP (Brevo).
4. El usuario introduce el código en la app, que llama a `POST /api/auth/verify`.
5. Si el código es correcto, el backend marca el usuario como activo (`is_active = true`).
6. Al iniciar sesión, el frontend llama a `POST /api/auth/login` y obtiene los datos del usuario.
7. Las tarjetas que se muestran provienen de `GET /api/profiles`, con perfiles reales almacenados en Supabase.

---

### 5. Notas sobre la simplificación del backend

- No es obligatorio usar:
  - Supabase Auth (JWT y `/api/auth/session`).
  - El flujo de API HTTP del proveedor de email (`EMAIL_API_ENABLED`).
- Con `EMAIL_API_ENABLED=false` y sin configurar `SUPABASE_URL`/`SUPABASE_ANON_KEY` en producción:
  - El backend se reduce a:
    - Conexión a Supabase (PostgreSQL).
    - Endpoints REST (`/api/auth/register`, `/api/auth/verify`, `/api/auth/login`, `/api/profiles`).
    - Envío de correo por SMTP con código de verificación.

