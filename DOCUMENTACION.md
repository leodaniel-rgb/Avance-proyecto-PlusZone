# Documentación del proyecto PlusZone

Este archivo explica cómo funciona el código del proyecto PlusZone (app de matching tipo Tinder + LinkedIn para empleados y empresas).

---

## 1. ¿Funciona el código de la API (verificación)?

**Sí.** El flujo del código de verificación funciona así:

- **Con servidor (API)**  
  - Al registrarte con un correo `@tecmilenio.mx`, el servidor genera un **código de 7 dígitos** y intenta enviarlo por correo (SMTP o API de email).  
  - Si **no** puede enviar el correo (sin SMTP configurado, etc.), hace *fallback*: guarda el código en `server/verification_debug.log` y, en entorno de desarrollo, lo devuelve en la respuesta como **`devCode`**.  
  - El cliente muestra ese código en el modal de verificación (“Tu código (desarrollo): 1234567”) y rellena el campo para que puedas verificar sin abrir el log.  
  - Tras verificar, puedes iniciar sesión con tu email y contraseña.

- **Sin servidor (solo frontend)**  
  - No hay código de verificación: el registro y el login usan la base de datos local del navegador (localStorage). No se usa ningún código de acceso.

Para usar la API en local, en `client/config.js` define por ejemplo:  
`window.API_BASE = 'http://localhost:4000';`  
y arranca el servidor (por ejemplo `node server/index.js` o `npm start` en `server/`).

---

## 2. Visión general del proyecto

- **PlusZone** es una aplicación web para conectar candidatos (empleados) con ofertas de trabajo (empresas).
- Los **empleados** ven ofertas en “Descubrir” y pueden dar like (match) o pasar.
- Las **empresas** ven candidatos en “Buscar candidatos” y pueden hacer match con ellos.
- Hay **perfil** (editar datos), **matches**, **mensajes** (estructura lista, lógica por implementar) y **dashboard** con estadísticas.

**Tecnologías:**

- **Frontend:** HTML, CSS, JavaScript (vanilla). Sin framework.
- **Base de datos en el navegador:** `client/database.js` — simula una DB con localStorage (usuarios, perfiles, swipes, matches, mensajes).
- **Servidor (opcional):** Node.js + Express en `server/`. API REST para registro con verificación por correo, login, perfiles; usa PostgreSQL y opcionalmente SMTP/API de email para el código.

---

## 3. Estructura del proyecto

```
Avance-proyecto-PlusZone/
├── client/                 # Frontend
│   ├── index.html          # Una sola página: carga, login, app, modales
│   ├── styles.css          # Estilos globales
│   ├── app.js              # Lógica principal: auth, Discover, Matches, perfil, dashboard
│   ├── database.js         # “Base de datos” en localStorage (seed, usuarios, perfiles, etc.)
│   ├── config.js           # API_BASE, Supabase (URL y clave); en deploy se inyectan
│   ├── DEMO-CREDENTIALS.md # Credenciales de ejemplo (empleado y empresa)
│   └── ...
├── server/                 # Backend (opcional)
│   ├── index.js            # Express: rutas /api/auth/*, /api/profiles, Socket.IO, envío de código
│   ├── db.js               # Conexión a PostgreSQL
│   ├── init_db.js          # Migración y seed de la DB
│   └── ...
├── database/               # Esquema SQL (PostgreSQL/Supabase)
│   └── pluszone_supabase.sql
├── DOCUMENTACION.md        # Este archivo
└── ...
```

---

## 4. Cliente (client/)

### 4.1 index.html

- **Pantalla de carga** (`#loadingScreen`): se oculta cuando la app está lista.
- **Pantalla de auth** (`#authScreen`): pestañas Iniciar sesión / Registrarse; formularios que llaman a `handleLogin` y `handleRegister`.
- **App principal** (`#app`): sidebar (navegación según tipo de usuario: empleado o empresa), área de contenido (Discover, Matches, Mensajes, Dashboard, Mi Perfil), footer.
- **Modales:** verificación de correo (`#verifyModal`), crear oferta (`#createJobModal`), overlay de match (`#matchOverlay`).
- **Toast:** `#appToast` para mensajes in-app (por ejemplo “Perfil actualizado”).

### 4.2 app.js — flujos principales

- **Estado global (`state`):**  
  `allProfiles`, `profiles` (filtrados), `currentIndex`, `swipedProfiles`, `matchedProfiles`, `currentUser`, `companyJobs`, etc.

- **Inicio:**
  - Si hay `API_BASE` válida y no es `file://`, puede intentar Supabase o API legacy para sesión/login.
  - Si no, o si falla, usa login contra **database.js** (localStorage). Tras login correcto: `loadAllProfilesFromDatabase()` (o perfiles desde API), `filterProfilesByUserType()`, `renderCards()`, `showMainApp()`.

- **Discover:**
  - Muestra las cards (ofertas para empleado, candidatos para empresa). Cada card tiene `data-profile-id`.
  - **Swipe:** al dar like o pasar se llama `handleSwipe(direction)`. El perfil se toma de la **card visible** (`.card-top` + `data-profile-id`) para que el match sea siempre con la oferta/empresa correcta. Si hay match (probabilidad simulada), se añade el id a `matchedProfiles` y se muestra `showMatchOverlay(profile)` con ese mismo perfil.

- **Matches:**  
  `renderMatches()` pinta la lista con `state.profiles.filter(p => state.matchedProfiles.includes(p.id))`. Cada ítem puede desplegar detalles (tagline, descripción, etc.).

- **Perfil:**  
  Formularios rellenados con `state.currentUser`. Al guardar se llama `saveProfile`: actualiza `state.currentUser`, y si existe `Database`, actualiza usuario y perfil público (`updateUser`, `updateProfileByUserId`) para que empresas/empleados vean los cambios al recargar.

- **Dashboard:**  
  Usa `state.matchedProfiles`, `state.swipedProfiles`, `state.companyJobs` para mostrar números (matches, vistos, ofertas activas, etc.).

- **Código de verificación (cuando hay API):**
  - Tras registro exitoso por API, se abre `openVerifyModal(email, message, devCode)`. Si la API devolvió `devCode`, se muestra en el modal y se rellena el input.
  - Al confirmar se llama `POST /api/auth/verify` con `email` y `code`; si va bien, se hace auto-login con `_pendingVerification`.
  - “Reenviar código” llama `POST /api/auth/resend`; si la respuesta trae `devCode`, se actualiza el modal con ese código.

### 4.3 database.js

- **Database.init():**  
  Si no hay `pluszone_db` en localStorage, o si la versión guardada es menor que `SEED_VERSION`, guarda un seed con usuarios (empleados, empresas), perfiles (candidatos y ofertas con tagline, about_me, company_description, etc.), y arrays vacíos para swipes, matches, messages. Así siempre se actualiza a la última estructura de datos sin botón “Restablecer”.

- **Métodos:**  
  `getAll()`, `save()`, `getUserByEmail()`, `getUserById()`, `updateUser()`, `updateProfileByUserId()`, `getJobProfilesByUserId()`, `createJobProfile()`, `reset()` (borra localStorage), etc. Los perfiles de ofertas creados por la empresa se guardan aquí y se cargan en `loadAllProfilesFromDatabase()` para que los empleados los vean en Discover.

### 4.4 config.js

- Define `window.API_BASE` (y opcionalmente Supabase). En producción puede inyectarse desde el pipeline. Para desarrollo con API local:  
  `window.API_BASE = 'http://localhost:4000';`

---

## 5. Servidor (server/)

### 5.1 Auth y código de verificación

- **POST /api/auth/register**  
  - Solo acepta correos `@tecmilenio.mx`.  
  - Crea usuario en PostgreSQL (`is_active = false`) y un perfil asociado.  
  - Genera código de 7 dígitos con `generateCode()`, lo guarda en `email_verifications` con `expires_at`.  
  - Intenta enviar el código por email (`sendVerificationEmail`). Si no puede (SMTP no configurado, etc.), hace fallback: escribe el código en `verification_debug.log` y, si aplica (desarrollo), incluye **`devCode`** en la respuesta JSON para que el cliente lo muestre en el modal.

- **POST /api/auth/verify**  
  - Recibe `email` y `code`. Comprueba que el código exista, no esté usado y no esté expirado; marca la verificación y el usuario como `is_active = true`. Devuelve éxito para que el cliente haga auto-login.

- **POST /api/auth/resend**  
  - Genera un nuevo código, lo guarda, intenta enviar email; si hay fallback y está permitido, devuelve **`devCode`** en la respuesta.

- **POST /api/auth/login**  
  - Comprueba email + contraseña (bcrypt) y que el usuario esté `is_active`. Devuelve datos del usuario para que el cliente llene `state.currentUser`.

### 5.2 Generación del código

- `generateCode()` devuelve un string de 7 dígitos (entre 1000000 y 9999999) con `Math.floor(1000000 + Math.random() * 9000000).toString()`.

### 5.3 Email y fallback

- `sendVerificationEmail()`: puede usar API de email (si está configurada) o SMTP. Si no puede enviar y el fallback está permitido (`NODE_ENV !== 'production'` o `ALLOW_DEV_CODE_IN_RESPONSE`), escribe en `verification_debug.log` y la ruta que llama a esta función devuelve `devCode` en el JSON para desarrollo.

---

## 6. Base de datos local vs API

- **Sin API (solo client):**  
  Todo se guarda en localStorage vía `database.js`. Login y registro usan solo esa “DB”. No hay código de verificación.

- **Con API:**  
  Registro y verificación pasan por el servidor; el código se envía por correo o se muestra como `devCode` en el modal. Login puede ser por API o, si la API no está disponible, el cliente puede caer a login local (según implementación actual).

---

## 7. Credenciales de demo

Están en **client/DEMO-CREDENTIALS.md**. Resumen:

- **Empleado:** por ejemplo `j.gonzalez@tecmilenio.mx` / `demo123`, `s.ramirez@tecmilenio.mx` / `demo123`, `carlos.lopez@email.com` / `demo123`, `ana.martinez@email.com` / `demo123`.
- **Empresa:** por ejemplo `empresa1@tecmilenio.mx` / `demo123`, `contacto@thefuentes.com` / `demo123`, y otras listadas en ese archivo.

Con esto puedes probar tanto el flujo con código de la API (registro + verificación + login) como el uso solo con cliente y base local.

---

*Documentación generada para el proyecto PlusZone. Para más detalle, revisar los comentarios en `client/app.js`, `client/database.js` y `server/index.js`.*
