// Base de datos local en JavaScript para PlusZone
// Simula una base de datos simple con almacenamiento en localStorage

const Database = {
    // Inicializar base de datos
    init() {
        if (!localStorage.getItem('pluszone_db')) {
            const initialData = {
                users: [
                    {
                        id: 1,
                        email: 'admin@pluszone.com',
                        password: 'admin123', // En producción debe estar hasheada
                        name: 'Administrador',
                        user_type: 'admin',
                        image_url: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&h=400&fit=crop',
                        description: 'Usuario administrador del sistema',
                        tech_stack: ['Admin', 'Management', 'System'],
                        created_at: new Date().toISOString(),
                        is_active: true
                    },
                    {
                        id: 2,
                        email: 'admin2@pluszone.com',
                        password: 'admin123',
                        name: 'Admin Secundario',
                        user_type: 'admin',
                        image_url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
                        description: 'Segundo usuario administrador',
                        tech_stack: ['Admin', 'Management'],
                        created_at: new Date().toISOString(),
                        is_active: true
                    },
                    {
                        id: 3,
                        email: 'j.gonzalez@tecmilenio.mx',
                        password: 'demo123',
                        name: 'Juan Gonzalez',
                        user_type: 'employee',
                        image_url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop',
                        description: 'Desarrollador Frontend',
                        tech_stack: ['React', 'Accessibility'],
                        created_at: new Date().toISOString(),
                        is_active: true
                    },
                    {
                        id: 4,
                        email: 's.ramirez@tecmilenio.mx',
                        password: 'demo123',
                        name: 'Sofía Ramírez',
                        user_type: 'employee',
                        image_url: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&h=400&fit=crop',
                        description: 'Ingeniera Industrial',
                        tech_stack: ['Lean', 'Six Sigma'],
                        created_at: new Date().toISOString(),
                        is_active: true
                    },
                    {
                        id: 5,
                        email: 'empresa1@tecmilenio.mx',
                        password: 'demo123',
                        name: 'TechCorp',
                        user_type: 'company',
                        image_url: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=400&h=400&fit=crop',
                        description: 'Empresa tecnológica',
                        tech_stack: [],
                        created_at: new Date().toISOString(),
                        is_active: true
                    }
                ],
                profiles: [
                    {
                        id: 1,
                        user_id: 1,
                        name: 'María García',
                        description: 'Senior Full Stack Developer',
                        detailed_description: 'Desarrolladora con más de 8 años de experiencia en aplicaciones web modernas. Especializada en React, Node.js y arquitectura de microservicios.',
                        tech_stack: ['React', 'Node.js', 'TypeScript', 'PostgreSQL', 'AWS', 'Docker'],
                        salary: '$80,000 - $120,000',
                        image_url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
                        role: 'candidate'
                    },
                    {
                        id: 2,
                        user_id: 3,
                        name: 'Juan Gonzalez',
                        description: 'Frontend Developer',
                        detailed_description: 'Especialista en React y accesibilidad.',
                        tech_stack: ['React', 'Accessibility', 'HTML', 'CSS'],
                        salary: '$60,000 - $90,000',
                        image_url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop',
                        role: 'candidate'
                    },
                    {
                        id: 3,
                        user_id: 4,
                        name: 'Sofía Ramírez',
                        description: 'Ingeniera Industrial',
                        detailed_description: 'Optimización de procesos y mejora continua.',
                        tech_stack: ['Lean', 'Six Sigma', 'Project Management'],
                        salary: '$70,000 - $100,000',
                        image_url: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&h=400&fit=crop',
                        role: 'candidate'
                    },
                    {
                        id: 4,
                        user_id: 5,
                        name: 'TechCorp - Vacante Backend',
                        description: 'Vacante Backend Senior',
                        detailed_description: 'Buscamos backenders con experiencia en microservicios y AWS',
                        tech_stack: ['Java', 'Spring', 'AWS'],
                        salary: '$90,000 - $140,000',
                        image_url: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=400&h=400&fit=crop',
                        role: 'job'
                    }
                ],
                swipes: [],
                matches: [],
                messages: []
            };
            this.save(initialData);
        }
    },

    // Obtener todos los datos
    getAll() {
        const data = localStorage.getItem('pluszone_db');
        return data ? JSON.parse(data) : null;
    },

    // Guardar datos
    save(data) {
        localStorage.setItem('pluszone_db', JSON.stringify(data));
    },

    // Obtener usuarios
    getUsers() {
        const db = this.getAll();
        return db ? db.users : [];
    },

    // Buscar usuario por email
    getUserByEmail(email) {
        const users = this.getUsers();
        return users.find(user => user.email === email);
    },

    // Buscar usuario por ID
    getUserById(id) {
        const users = this.getUsers();
        return users.find(user => user.id === id);
    },

    // Verificar credenciales de admin
    validateAdmin(email, password) {
        const user = this.getUserByEmail(email);
        if (!user) return null;
        
        if (user.user_type === 'admin' && user.password === password && user.is_active) {
            // No retornar la contraseña
            const { password: _, ...userWithoutPassword } = user;
            return userWithoutPassword;
        }
        
        return null;
    },

    // Crear nuevo usuario
    createUser(userData) {
        const db = this.getAll();
        if (!db) return null;

        const newUser = {
            id: db.users.length > 0 ? Math.max(...db.users.map(u => u.id)) + 1 : 1,
            ...userData,
            created_at: new Date().toISOString(),
            is_active: true
        };

        db.users.push(newUser);

        // Crear perfil asociado para que el nuevo usuario aparezca a otros
        const newProfile = {
            id: db.profiles.length > 0 ? Math.max(...db.profiles.map(p => p.id)) + 1 : 1,
            user_id: newUser.id,
            name: newUser.name,
            description: newUser.description || '',
            detailed_description: newUser.detailed_description || '',
            tech_stack: newUser.tech_stack || [],
            salary: newUser.salary || '',
            image_url: newUser.image_url || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&h=400&fit=crop',
            role: newUser.user_type === 'company' ? 'job' : 'candidate',
            created_at: new Date().toISOString()
        };

        db.profiles.push(newProfile);
        this.save(db);
        
        const { password: _, ...userWithoutPassword } = newUser;
        return userWithoutPassword;
    },

    // Actualizar usuario
    updateUser(userId, updates) {
        const db = this.getAll();
        if (!db) return null;

        const userIndex = db.users.findIndex(u => u.id === userId);
        if (userIndex === -1) return null;

        db.users[userIndex] = {
            ...db.users[userIndex],
            ...updates,
            updated_at: new Date().toISOString()
        };

        this.save(db);
        
        const { password: _, ...userWithoutPassword } = db.users[userIndex];
        return userWithoutPassword;
    },

    // Obtener todos los admins
    getAdmins() {
        const users = this.getUsers();
        return users.filter(user => user.user_type === 'admin' && user.is_active);
    },

    // Desactivar/activar usuario
    toggleUserActive(userId) {
        const db = this.getAll();
        if (!db) return null;

        const userIndex = db.users.findIndex(u => u.id === userId);
        if (userIndex === -1) return null;

        db.users[userIndex].is_active = !db.users[userIndex].is_active;
        this.save(db);
        
        return db.users[userIndex];
    },

    // Agregar swipe
    addSwipe(userId, profileId, direction) {
        const db = this.getAll();
        if (!db) return null;

        const swipe = {
            id: db.swipes.length > 0 ? Math.max(...db.swipes.map(s => s.id)) + 1 : 1,
            user_id: userId,
            profile_id: profileId,
            direction: direction,
            swiped_at: new Date().toISOString()
        };

        db.swipes.push(swipe);
        this.save(db);
        return swipe;
    },

    // Agregar match
    addMatch(userId, profileId) {
        const db = this.getAll();
        if (!db) return null;

        // Verificar si ya existe
        const exists = db.matches.find(
            m => m.user_id === userId && m.profile_id === profileId
        );
        if (exists) return exists;

        const match = {
            id: db.matches.length > 0 ? Math.max(...db.matches.map(m => m.id)) + 1 : 1,
            user_id: userId,
            profile_id: profileId,
            matched_at: new Date().toISOString()
        };

        db.matches.push(match);
        this.save(db);
        return match;
    },

    // Obtener estadísticas (para admin)
    getStats() {
        const db = this.getAll();
        if (!db) return null;

        return {
            total_users: db.users.length,
            active_users: db.users.filter(u => u.is_active).length,
            admin_users: db.users.filter(u => u.user_type === 'admin').length,
            total_swipes: db.swipes.length,
            total_matches: db.matches.length,
            total_profiles: db.profiles.length
        };
    },

    // Exportar datos (para backup)
    exportData() {
        return this.getAll();
    },

    // Resetear base de datos (cuidado!)
    reset() {
        localStorage.removeItem('pluszone_db');
        this.init();
    }
};

// Inicializar al cargar
Database.init();

// Exportar para uso global
if (typeof window !== 'undefined') {
    window.Database = Database;
}

