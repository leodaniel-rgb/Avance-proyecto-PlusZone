# Base de Datos PlusZone

## Archivos de Base de Datos

### 1. `database.sql`
Archivo SQL con la estructura completa de la base de datos para cuando tengas un backend (MySQL, PostgreSQL, etc.).

### 2. `database.json`
Archivo JSON con datos de ejemplo para referencia.

### 3. `client/database.js`
Base de datos local usando **localStorage** de JavaScript. Funciona completamente en el navegador sin necesidad de backend. Este archivo se encuentra en la carpeta `client/` junto con los demás archivos del frontend.

## Usuarios Admin de Prueba

Se han creado dos usuarios administradores para probar el acceso:

### Usuario Admin 1
- **Email:** `admin@pluszone.com`
- **Password:** `admin123`
- **Tipo:** Admin

### Usuario Admin 2
- **Email:** `admin2@pluszone.com`
- **Password:** `admin123`
- **Tipo:** Admin

## Cómo Usar

### Para Login/Registro Normal:
1. Puedes crear usuarios normales desde el formulario de registro
2. Los datos se guardan automáticamente en localStorage

### Para Login como Admin:
1. En el formulario de login, selecciona **"Empleado"** o **"Empresa"** (no hay opción admin específica, pero funciona igual)
2. Usa uno de los emails de admin: `admin@pluszone.com` o `admin2@pluszone.com`
3. Password: `admin123`
4. El sistema detectará automáticamente que es un usuario admin

## Funcionalidades de la Base de Datos

### Métodos Disponibles:

```javascript
// Inicializar
Database.init();

// Validar admin
const admin = Database.validateAdmin('admin@pluszone.com', 'admin123');

// Obtener usuarios
const users = Database.getUsers();

// Obtener un usuario por email
const user = Database.getUserByEmail('admin@pluszone.com');

// Crear usuario
const newUser = Database.createUser({
    email: 'user@example.com',
    password: 'password123',
    name: 'Usuario Nuevo',
    user_type: 'employee',
    // ... otros campos
});

// Actualizar usuario
Database.updateUser(userId, { name: 'Nuevo Nombre' });

// Obtener todos los admins
const admins = Database.getAdmins();

// Obtener estadísticas
const stats = Database.getStats();

// Agregar swipe
Database.addSwipe(userId, profileId, 'right');

// Agregar match
Database.addMatch(userId, profileId);
```

## Estructura de Datos

### Users
```json
{
  "id": 1,
  "email": "admin@pluszone.com",
  "password": "admin123",
  "name": "Administrador",
  "user_type": "admin",
  "image_url": "...",
  "description": "...",
  "tech_stack": [],
  "is_active": true
}
```

### Profiles
```json
{
  "id": 1,
  "user_id": 1,
  "name": "María García",
  "description": "...",
  "tech_stack": ["React", "Node.js"],
  "role": "candidate"
}
```

## Notas Importantes

⚠️ **Seguridad:** En producción, las contraseñas deben estar hasheadas. Actualmente están en texto plano solo para pruebas.

⚠️ **localStorage:** Los datos se almacenan en el navegador. Si limpias el caché del navegador, se perderán los datos.

⚠️ **Limitaciones:** localStorage tiene un límite de ~5-10MB dependiendo del navegador.

## Próximos Pasos

1. Cuando tengas backend, migra la estructura SQL a tu base de datos
2. Implementa hash de contraseñas (bcrypt, argon2, etc.)
3. Agrega autenticación con tokens (JWT)
4. Implementa validación más robusta

## Migración y ejecución local (incluye Socket.IO)
- Se añadió un script de migración y un servidor en `server/`.
- Para crear la base de datos y seeds localmente ejecuta desde `server/`: `npm run migrate`.
- Inicia el servidor con `npm run dev`. El servidor sirve la app y la API en `http://localhost:4000`.
- El servidor emite eventos en tiempo real con Socket.IO (`user_verified`, `profile_created`) para notificar a los clientes cuando un nuevo perfil está disponible.

