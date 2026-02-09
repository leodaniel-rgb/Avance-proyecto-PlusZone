Errores detectados y cómo resolverlos

Resumen de errores encontrados al arrancar localmente:

1) Ejecutar desde la carpeta equivocada
   - Síntoma: `npm run dev` en C:\Users\...\Full-Stack-Project--main fallaba con "Could not read package.json".
   - Causa: el proyecto tiene una estructura anidada y el `package.json` del servidor está dentro de `server/`.
   - Solución: usar el script raíz (`npm run server:dev`) o ejecutar los comandos dentro de la carpeta `Full-Stack-Project--main/server` (ej. `cd Full-Stack-Project--main/server && npm install && npm run dev`).

2) Migración / tablas faltantes
   - Síntoma: la aplicación no encuentra la tabla `users` y antes no existía una orden clara para ejecutar la migración.
   - Causa: la base de datos no tenía el esquema; la migración existía como `server/init_db.js` pero no se ejecutaba automáticamente o no había una forma controlada de ejecutarla.
   - Solución: configuré la migración automática al arranque del servidor y añadí la variable de entorno `AUTO_MIGRATE` para controlar su ejecución. Si `AUTO_MIGRATE=false`, el servidor no ejecutará la migración y fallará con un mensaje claro.

3) Dep. de desarrollo (nodemon)
   - Síntoma: `nodemon` no se encontraba al ejecutar `npm run dev` desde un directorio incorrecto.
   - Solución: instalar dependencias en `server` con `npm --prefix Full-Stack-Project--main/server install` o ejecutar los scripts raíz (`npm run install-server`). Para producción use `npm run server:start` (no requiere `nodemon`).

Cómo ejecutar la app localmente (paso a paso)

Requisitos:
- Node.js v16+ y npm
- MySQL disponible y accesible desde la máquina o un servicio externo
- Archivo `.env` en `server/` (copiar `.env.example`) con las variables:
  - DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME
  - EMAIL_HOST, EMAIL_PORT, EMAIL_USER, EMAIL_PASS, EMAIL_SECURE
  - AUTO_MIGRATE (opcional, default=true)

Comandos útiles desde la raíz del repositorio (carpeta que contiene `Full-Stack-Project--main`):

1. Instalar dependencias del servidor:
   npm run install-server

2. Ejecutar migración manualmente (si prefieres control manual):
   npm run migrate

Nota importante sobre `.env` y caracteres inesperados:
- Asegúrate de copiar `server/.env.example` a `server/.env` y **no** dejar espacios en blanco antes o después de los valores. Por ejemplo, evita `DB_PASSWORD= secret` (espacio antes) — usa `DB_PASSWORD=secret`.
- El servidor ahora aplica `.trim()` internamente a las variables DB críticas (DB_HOST, DB_USER, DB_PASSWORD, DB_NAME, DB_PORT), pero es buena práctica revisar manualmente el `.env` para evitar problemas de autenticación.
3. Ejecutar en modo desarrollo (con hot reload si `nodemon` instalado):
   npm run server:dev

4. Ejecutar en producción / sin hot reload:
   npm start

Nota: también puedes trabajar directamente dentro de `Full-Stack-Project--main/server`:
- cd Full-Stack-Project--main/server
- npm install
- npm run dev (desarrollo) o npm run migrate

Despliegue a un host (resumen, opciones comunes)

Opción A — VPS (Linux) (ej. DigitalOcean, AWS EC2)
1. Crear servidor con Node.js y MySQL instalados (o usar RDS para MySQL).
2. Subir código (git clone o FTP) al servidor.
3. Crear un archivo `.env` con variables de entorno (no subir `.env` a git).
4. Desde la raíz ejecutar: `npm run install-server` y `npm --prefix Full-Stack-Project--main/server run migrate` (si usas AUTO_MIGRATE=false).
5. Iniciar con un proceso manager (pm2): `pm2 start Full-Stack-Project--main/server/index.js --name pluszone`.
6. Configurar firewall y dominio/SSL (Let's Encrypt via Certbot) para servir la app.
7. Configurar un SMTP real (SendGrid, Mailgun) para envío de correos.

Opción B — Platform-as-a-Service (Render / Heroku / Railway)
1. Crear un servicio web para la app Node y uno para la base de datos MySQL.
2. Subir repo y setear variables de entorno en el dashboard (DB_*, EMAIL_*, AUTO_MIGRATE).
3. En Deploy script, ejecutar `npm run install-server` y `npm --prefix Full-Stack-Project--main/server run migrate` como paso post-deploy si necesitas correr migraciones.
4. Asegura que la plataforma tenga conectividad a la base de datos y que la app escuche en el puerto indicado por la plataforma.

Pruebas E2E sugeridas
- Usar Mailtrap para pruebas de email (sandbox) y un script con Playwright para:
  1) registrarse con email `@tecmilenio.mx`, 2) leer el código en Mailtrap, 3) verificar, 4) confirmar que el perfil aparece en `/api/profiles`.

Depuración de envíos de correo (fallback local) ⚠️
- Si no tienes configurado un SMTP (o el servicio no está disponible), el servidor ahora registra los códigos de verificación en `server/verification_debug.log` en modo desarrollo.
- Controla este comportamiento con la variable de entorno `EMAIL_FALLBACK` (true/false). Por seguridad, desactiva fallback en producción (`EMAIL_FALLBACK=false`).

Problemas y soluciones comunes al enviar correo
- Error `451 DNS temporary failure (#4.3.0)` al ejecutar `sendMail`: normalmente indica un problema de resolución DNS del dominio del remitente (`MAIL FROM`) o del servidor SMTP. Revisa los siguientes puntos:
  1. **Remitente (`EMAIL_FROM`)**: evita errores tipográficos (por ejemplo `outlock.com` vs `outlook.com`). Usa un dominio válido con registros MX configurados o una dirección que tu proveedor SMTP haya verificado.
  2. **Credenciales y puerto**: asegúrate de usar las credenciales correctas (consumer key/secret para TurboSMTP) y un puerto compatible (`465` para SSL, `587/2525` para STARTTLS). Ajusta `EMAIL_SECURE` según el puerto.
  3. **Usar la API de TurboSMTP**: si tu proveedor ofrece la API REST, actívala con `EMAIL_API_ENABLED=true` y configura `EMAIL_CONSUMER_KEY` y `EMAIL_CONSUMER_SECRET`. El servidor intentará autorizar y usar la API (`/authorize` + `/mail/send`) antes de caer al SMTP. Esto puede evitar problemas DNS en el cliente SMTP en algunos entornos.
  4. **Prueba básica**: usa `openssl s_client -crlf -connect pro.eu.turbo-smtp.com:587` y ejecuta un diálogo SMTP manual para comprobar conectividad, o usa `telnet`/`nc` según el entorno.
  5. **Logs**: si el envío falla, el servidor intentará guardar el código en `server/verification_debug.log` si `EMAIL_FALLBACK=true`.
  6. **Solución rápida**: si no requieres envío real en desarrollo, deja `EMAIL_FALLBACK=true` y obtén el código desde `server/verification_debug.log`.

Recomendación específica para tu caso
- Verifica el valor de `EMAIL_FROM` en `server/.env` (corrige `outlock.com` a la variante correcta o usa una dirección verificada por TurboSMTP). Después reinicia el servidor. Si después de eso sigues con `451 DNS temporary failure`, activa `EMAIL_API_ENABLED=true` (si tu cuenta soporta API) y prueba envío vía API antes de intentar más cambios o contactar soporte de TurboSMTP con el mensaje de error.

Soporte y troubleshooting
- Si ves `ER_ACCESS_DENIED_ERROR`, revisa credenciales DB.
- Si el servidor no encuentra `nodemon`, instala dev deps con `npm run install-server` o ejecuta con `npm run server:start`.
- Revisar logs (pm2 logs o la salida de nodemon) y revisar `server/init_db.js` si la migración falla.

---
Versión generada: 2026-02-03
