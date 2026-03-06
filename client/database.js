// Base de datos local en JavaScript para PlusZone
// Simula una base de datos simple con almacenamiento en localStorage

const Database = {
    // Versión del seed: si la guardada es menor, se vuelve a cargar (empleados/empresas con tagline, about_me, etc.)
    SEED_VERSION: 2,

    // Inicializar base de datos
    init() {
        let needSeed = !localStorage.getItem('pluszone_db');
        if (!needSeed) {
            try {
                const db = JSON.parse(localStorage.getItem('pluszone_db'));
                needSeed = !db || db.version === undefined || db.version < this.SEED_VERSION;
            } catch (e) {
                needSeed = true;
            }
        }
        if (needSeed) {
            const initialData = {
                version: this.SEED_VERSION,
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
                        description: 'Empresa tecnológica líder en desarrollo de software.',
                        tech_stack: [],
                        company_name: 'TechCorp',
                        company_size: '51-200',
                        industry: 'Tecnología',
                        company_location: 'Ciudad de México',
                        company_website: 'https://techcorp.mx',
                        created_at: new Date().toISOString(),
                        is_active: true
                    },
                    {
                        id: 6,
                        email: 'carlos.lopez@email.com',
                        password: 'demo123',
                        name: 'Carlos López',
                        user_type: 'employee',
                        image_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
                        description: 'Desarrollador Full Stack con experiencia en startups.',
                        tech_stack: ['JavaScript', 'Node.js', 'React', 'MongoDB'],
                        created_at: new Date().toISOString(),
                        is_active: true
                    },
                    {
                        id: 7,
                        email: 'ana.martinez@email.com',
                        password: 'demo123',
                        name: 'Ana Martínez',
                        user_type: 'employee',
                        image_url: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop',
                        description: 'Product Manager y analista de datos.',
                        tech_stack: ['SQL', 'Python', 'Tableau', 'Scrum'],
                        created_at: new Date().toISOString(),
                        is_active: true
                    },
                    {
                        id: 8,
                        email: 'contacto@thefuentes.com',
                        password: 'demo123',
                        name: 'The Fuentes',
                        user_type: 'company',
                        image_url: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=400&h=400&fit=crop',
                        description: 'Empresa innovadora en busca de talento profesional para crecer juntos.',
                        tech_stack: [],
                        company_name: 'The Fuentes',
                        company_size: '11-50',
                        industry: 'Tecnología',
                        company_location: 'Monterrey',
                        company_website: 'https://thefuentes.com',
                        created_at: new Date().toISOString(),
                        is_active: true
                    },
                    {
                        id: 9,
                        email: 'info@innovatelab.com',
                        password: 'demo123',
                        name: 'InnovateLab',
                        user_type: 'company',
                        image_url: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=400&fit=crop',
                        description: 'Laboratorio de innovación y desarrollo de productos.',
                        tech_stack: [],
                        company_name: 'InnovateLab',
                        company_size: '1-10',
                        industry: 'Tecnología',
                        company_location: 'Guadalajara',
                        company_website: 'https://innovatelab.com',
                        created_at: new Date().toISOString(),
                        is_active: true
                    },
                    {
                        id: 10,
                        email: 'talento@ventasplus.mx',
                        password: 'demo123',
                        name: 'VentasPlus',
                        user_type: 'company',
                        image_url: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400&h=400&fit=crop',
                        description: 'Agencia de ventas B2B y crecimiento de equipos comerciales.',
                        tech_stack: [],
                        company_name: 'VentasPlus',
                        company_size: '11-50',
                        industry: 'Ventas',
                        company_location: 'Querétaro',
                        company_website: 'https://ventasplus.mx',
                        created_at: new Date().toISOString(),
                        is_active: true
                    },
                    {
                        id: 11,
                        email: 'rrhh@clinicavida.com',
                        password: 'demo123',
                        name: 'Clínica Vida',
                        user_type: 'company',
                        image_url: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=400&h=400&fit=crop',
                        description: 'Red de clínicas de salud con enfoque en atención integral.',
                        tech_stack: [],
                        company_name: 'Clínica Vida',
                        company_size: '51-200',
                        industry: 'Salud',
                        company_location: 'Puebla',
                        company_website: 'https://clinicavida.com',
                        created_at: new Date().toISOString(),
                        is_active: true
                    },
                    {
                        id: 12,
                        email: 'empleos@logix.mx',
                        password: 'demo123',
                        name: 'Logix',
                        user_type: 'company',
                        image_url: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=400&h=400&fit=crop',
                        description: 'Operador logístico y cadena de suministro en Latinoamérica.',
                        tech_stack: [],
                        company_name: 'Logix',
                        company_size: '201-500',
                        industry: 'Operaciones',
                        company_location: 'Toluca',
                        company_website: 'https://logix.mx',
                        created_at: new Date().toISOString(),
                        is_active: true
                    },
                    {
                        id: 13,
                        email: 'carreras@indumex.com',
                        password: 'demo123',
                        name: 'InduMex',
                        user_type: 'company',
                        image_url: 'https://images.unsplash.com/photo-1565793298595-6a879b1d9492?w=400&h=400&fit=crop',
                        description: 'Manufactura industrial y automatización de procesos.',
                        tech_stack: [],
                        company_name: 'InduMex',
                        company_size: '51-200',
                        industry: 'Industrial',
                        company_location: 'León',
                        company_website: 'https://indumex.com',
                        created_at: new Date().toISOString(),
                        is_active: true
                    },
                    {
                        id: 14,
                        email: 'rrhh@educrece.mx',
                        password: 'demo123',
                        name: 'EduCrece',
                        user_type: 'company',
                        image_url: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400&h=400&fit=crop',
                        description: 'Plataforma de educación en línea y capacitación corporativa.',
                        tech_stack: [],
                        company_name: 'EduCrece',
                        company_size: '11-50',
                        industry: 'Educación',
                        company_location: 'Ciudad de México',
                        company_website: 'https://educrece.mx',
                        created_at: new Date().toISOString(),
                        is_active: true
                    },
                    {
                        id: 15,
                        email: 'talento@finanzia.com',
                        password: 'demo123',
                        name: 'Finanzia',
                        user_type: 'company',
                        image_url: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=400&fit=crop',
                        description: 'Tecnología financiera y servicios de inversión para Latinoamérica.',
                        tech_stack: [],
                        company_name: 'Finanzia',
                        company_size: '51-200',
                        industry: 'Finanzas',
                        company_location: 'Monterrey',
                        company_website: 'https://finanzia.com',
                        created_at: new Date().toISOString(),
                        is_active: true
                    },
                    {
                        id: 16,
                        email: 'empleos@brandwise.mx',
                        password: 'demo123',
                        name: 'BrandWise',
                        user_type: 'company',
                        image_url: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400&h=400&fit=crop',
                        description: 'Agencia de marketing digital y estrategia de marcas.',
                        tech_stack: [],
                        company_name: 'BrandWise',
                        company_size: '11-50',
                        industry: 'Marketing',
                        company_location: 'Guadalajara',
                        company_website: 'https://brandwise.mx',
                        created_at: new Date().toISOString(),
                        is_active: true
                    },
                    {
                        id: 17,
                        email: 'carreras@legalplus.mx',
                        password: 'demo123',
                        name: 'LegalPlus',
                        user_type: 'company',
                        image_url: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=400&h=400&fit=crop',
                        description: 'Bufete jurídico con enfoque en derecho corporativo y compliance.',
                        tech_stack: [],
                        company_name: 'LegalPlus',
                        company_size: '51-200',
                        industry: 'Legal',
                        company_location: 'Ciudad de México',
                        company_website: 'https://legalplus.mx',
                        created_at: new Date().toISOString(),
                        is_active: true
                    }
                ],
                profiles: [
                    {
                        id: 1,
                        user_id: 1,
                        name: 'María García',
                        description: 'Senior Full Stack Developer. Especializada en React, Node.js y arquitectura de microservicios.',
                        detailed_description: 'Desarrolladora con más de 8 años de experiencia en aplicaciones web modernas. Especializada en React, Node.js y arquitectura de microservicios.',
                        tagline: 'Busco proyectos donde pueda aportar con arquitectura escalable y código de calidad.',
                        about_me: 'Llevo más de ocho años construyendo productos digitales de principio a fin: desde APIs en Node.js hasta interfaces en React y despliegues en AWS. Me gusta trabajar en equipos que priorizan testing, documentación y revisión de código. He liderado migraciones a microservicios y formado a desarrolladores junior. Valoro la autonomía y el aprendizaje continuo; busco una empresa donde pueda crecer y dejar impacto real en el producto.',
                        tech_stack: ['React', 'Node.js', 'TypeScript', 'PostgreSQL', 'AWS', 'Docker'],
                        salary: '$80,000 - $120,000',
                        image_url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
                        role: 'candidate',
                        category: 'Tecnología'
                    },
                    {
                        id: 2,
                        user_id: 3,
                        name: 'Juan Gonzalez',
                        description: 'Frontend Developer. Especialista en React, accesibilidad y experiencias de usuario inclusivas.',
                        detailed_description: 'Especialista en React y accesibilidad.',
                        tagline: 'Frontend con foco en accesibilidad y UX inclusiva para todo tipo de usuarios.',
                        about_me: 'Me apasiona que las aplicaciones sean usables por todas las personas: he trabajado con estándares WCAG, lectores de pantalla y diseño inclusivo. Experiencia en React, componentes reutilizables y pruebas E2E. He colaborado con equipos de producto y diseño para priorizar accesibilidad desde el inicio. Busco un equipo que valore la calidad y la inclusión tanto como la velocidad de entrega.',
                        tech_stack: ['React', 'Accessibility', 'HTML', 'CSS'],
                        salary: '$60,000 - $90,000',
                        image_url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop',
                        role: 'candidate',
                        category: 'Tecnología'
                    },
                    {
                        id: 3,
                        user_id: 4,
                        name: 'Sofía Ramírez',
                        description: 'Ingeniera Industrial. Optimización de procesos, mejora continua y gestión de proyectos.',
                        detailed_description: 'Optimización de procesos y mejora continua.',
                        tagline: 'Ingeniera Industrial enfocada en procesos, mejora continua y gestión de proyectos.',
                        about_me: 'He trabajado en manufactura y servicios implementando Lean y Six Sigma: reducción de desperdicios, análisis de capacidad y liderazgo de proyectos de mejora. Me gusta combinar datos con trabajo en planta para tomar decisiones. Experiencia en KPIs, indicadores de calidad y coordinación con áreas de producción y logística. Busco una empresa donde pueda aplicar metodologías de mejora y crecer en gestión de operaciones.',
                        tech_stack: ['Lean', 'Six Sigma', 'Project Management'],
                        salary: '$70,000 - $100,000',
                        image_url: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&h=400&fit=crop',
                        role: 'candidate',
                        category: 'Operaciones'
                    },
                    {
                        id: 4,
                        user_id: 5,
                        name: 'TechCorp - Vacante Backend',
                        description: 'Vacante Backend Senior. Integración con sistemas en la nube, diseño de APIs y trabajo con equipos ágiles.',
                        company_description: 'En TechCorp no solo construimos software; diseñamos soluciones que impulsan la transformación digital en Latinoamérica. Somos una empresa en crecimiento con sede en Ciudad de México, especializada en arquitecturas en la nube y sistemas escalables. Creemos en la autonomía, el aprendizaje continuo y en que el código limpio es una forma de arte. Si te apasiona resolver problemas complejos y quieres ver el impacto real de tu trabajo, este es tu lugar.',
                        detailed_description: 'Buscamos backenders con experiencia en microservicios y AWS',
                        tagline: 'Buscamos a un Ing. en sistemas o afín con experiencia en backend, microservicios y AWS.',
                        tech_stack: ['Java', 'Spring', 'AWS'],
                        salary: '$90,000 - $140,000',
                        image_url: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=400&h=400&fit=crop',
                        role: 'job',
                        category: 'Tecnología',
                        location: 'Remoto'
                    },
                    {
                        id: 5,
                        user_id: 5,
                        name: 'TechCorp - Frontend React',
                        description: 'Desarrollador Frontend React. Construcción de interfaces modernas, componentes reutilizables y buenas prácticas de testing.',
                        company_description: 'En TechCorp no solo construimos software; diseñamos soluciones que impulsan la transformación digital en Latinoamérica. Somos una empresa en crecimiento con sede en Ciudad de México, especializada en arquitecturas en la nube y sistemas escalables. Creemos en la autonomía, el aprendizaje continuo y en que el código limpio es una forma de arte. Si te apasiona resolver problemas complejos y quieres ver el impacto real de tu trabajo, este es tu lugar.',
                        detailed_description: 'Vacante para desarrollador frontend con experiencia en React y TypeScript.',
                        tagline: 'Buscamos a un desarrollador frontend con experiencia en React y TypeScript para unirse a nuestro equipo.',
                        tech_stack: ['React', 'TypeScript', 'CSS', 'Testing'],
                        salary: '$70,000 - $100,000',
                        image_url: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=400&h=400&fit=crop',
                        role: 'job',
                        category: 'Tecnología',
                        location: 'Híbrido'
                    },
                    {
                        id: 6,
                        user_id: 6,
                        name: 'Carlos López',
                        description: 'Desarrollador Full Stack. Experiencia en startups, JavaScript, Node.js, React y MongoDB.',
                        detailed_description: 'Desarrollador Full Stack con experiencia en startups y productos digitales.',
                        tagline: 'Full Stack con experiencia en startups: desde MVP hasta escalar producto.',
                        about_me: 'He pasado por varias startups como desarrollador full stack: desde montar el primer MVP en Node y React hasta integrar servicios, APIs y bases de datos en producción. Me siento cómodo con JavaScript/TypeScript, MongoDB y despliegues en la nube. Valoro equipos pequeños donde se puede iterar rápido y aprender de usuarios reales. Busco un proyecto con impacto y espacio para proponer mejoras técnicas y de producto.',
                        tech_stack: ['JavaScript', 'Node.js', 'React', 'MongoDB'],
                        salary: '$65,000 - $95,000',
                        image_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
                        role: 'candidate',
                        category: 'Tecnología'
                    },
                    {
                        id: 7,
                        user_id: 7,
                        name: 'Ana Martínez',
                        description: 'Product Manager y analista de datos. Enfoque en métricas, UX y metodologías ágiles.',
                        detailed_description: 'Product Manager y analista de datos con enfoque en métricas y UX.',
                        tagline: 'Product Manager con enfoque en datos, métricas y experiencia de usuario.',
                        about_me: 'Combinó producto y datos: defino roadmap con base en análisis SQL, dashboards en Tableau y feedback de usuarios. He trabajado con equipos ágiles, priorización con OKRs y lanzamiento de funcionalidades de punta a punta. Me gusta que las decisiones estén respaldadas por métricas y pruebas. Busco una empresa donde pueda seguir creciendo en estrategia de producto y liderazgo de equipos cross-funcionales.',
                        tech_stack: ['SQL', 'Python', 'Tableau', 'Scrum'],
                        salary: '$75,000 - $110,000',
                        image_url: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop',
                        role: 'candidate',
                        category: 'Operaciones'
                    },
                    {
                        id: 8,
                        user_id: 8,
                        name: 'The Fuentes - Oferta Desarrollo',
                        description: 'Empresa innovadora en busca de talento profesional. Ambiente dinámico, proyectos retadores y crecimiento profesional.',
                        company_description: 'En The Fuentes no solo hacemos productos; construimos equipos que crecen juntos. Somos una empresa con sede en Monterrey, enfocada en desarrollo de software y soluciones digitales para la región. Creemos en la innovación, el trabajo en equipo y en que cada línea de código cuenta. Si te gusta un ambiente dinámico y quieres ver tu impacto en proyectos reales, aquí tienes tu lugar.',
                        detailed_description: 'Buscamos desarrolladores y profesionales con ganas de crecer en un entorno innovador.',
                        tagline: 'Buscamos a un Ing. en sistemas o desarrollador full stack para crecer juntos en un entorno innovador.',
                        tech_stack: ['JavaScript', 'React', 'Node.js', 'Cloud'],
                        salary: '$60,000 - $90,000',
                        image_url: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=400&h=400&fit=crop',
                        role: 'job',
                        category: 'Tecnología',
                        location: 'Presencial'
                    },
                    {
                        id: 9,
                        user_id: 9,
                        name: 'InnovateLab - Product Designer',
                        description: 'Diseñador de Producto para nuestro equipo de innovación. UX Research, prototipado en Figma y trabajo con desarrollo.',
                        company_description: 'En InnovateLab no solo diseñamos interfaces; diseñamos experiencias que conectan a las personas con la tecnología. Somos un laboratorio de innovación con sede en Guadalajara, especializados en producto, UX Research y prototipado. Creemos en el diseño centrado en el usuario, el aprendizaje continuo y en que la creatividad y el código pueden ir de la mano. Si te apasiona el producto y quieres ver tus ideas materializarse, este es tu lugar.',
                        detailed_description: 'Buscamos diseñador de producto para unirse a nuestro equipo de innovación.',
                        tagline: 'Buscamos a un diseñador de producto con experiencia en UX Research y prototipado para nuestro equipo de innovación.',
                        tech_stack: ['Figma', 'UX Research', 'Prototyping'],
                        salary: '$55,000 - $85,000',
                        image_url: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=400&fit=crop',
                        role: 'job',
                        category: 'Tecnología',
                        location: 'Remoto'
                    },
                    {
                        id: 10,
                        user_id: 10,
                        name: 'VentasPlus - Ejecutivo Comercial',
                        description: 'Ejecutivo de ventas B2B. Cierre de acuerdos, prospección y relaciones con clientes corporativos.',
                        company_description: 'En VentasPlus no solo vendemos; construimos relaciones que impulsan el crecimiento de las empresas. Somos una agencia con sede en Querétaro, especializada en ventas B2B y formación de equipos comerciales de alto rendimiento. Creemos en la meritocracia, el coaching continuo y en que cada cierre cuenta. Si te gusta el reto comercial y quieres ver tu impacto en cifras reales, este es tu lugar.',
                        detailed_description: 'Buscamos ejecutivos comerciales con experiencia en ventas B2B y cierre de acuerdos.',
                        tagline: 'Buscamos a un ejecutivo comercial con experiencia en ventas B2B y prospección para nuestro equipo.',
                        tech_stack: ['CRM', 'Ventas Consultivas', 'Negociación'],
                        salary: '$50,000 - $75,000',
                        image_url: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400&h=400&fit=crop',
                        role: 'job',
                        category: 'Ventas',
                        location: 'Híbrido'
                    },
                    {
                        id: 11,
                        user_id: 11,
                        name: 'Clínica Vida - Coordinador Administrativo',
                        description: 'Coordinador administrativo para área de atención al paciente y operaciones.',
                        company_description: 'En Clínica Vida no solo atendemos pacientes; diseñamos experiencias de cuidado que marcan la diferencia. Somos una red de clínicas con sede en Puebla, con enfoque en salud integral y procesos administrativos de calidad. Creemos en el trato humano, la mejora continua y en que cada detalle cuenta. Si te apasiona la salud y quieres contribuir desde la operación, este es tu lugar.',
                        detailed_description: 'Buscamos coordinador administrativo con experiencia en sector salud y atención al paciente.',
                        tagline: 'Buscamos a un coordinador administrativo con experiencia en sector salud para nuestras clínicas.',
                        tech_stack: ['Gestión administrativa', 'Atención al paciente', 'Sistemas de salud'],
                        salary: '$45,000 - $65,000',
                        image_url: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=400&h=400&fit=crop',
                        role: 'job',
                        category: 'Salud',
                        location: 'Presencial'
                    },
                    {
                        id: 12,
                        user_id: 12,
                        name: 'Logix - Analista de Operaciones',
                        description: 'Analista de operaciones y cadena de suministro. Indicadores, mejora de procesos y coordinación con almacenes.',
                        company_description: 'En Logix no solo movemos mercancía; diseñamos cadenas de suministro que conectan a Latinoamérica. Somos un operador logístico con sede en Toluca, especializados en almacenaje, distribución y optimización de procesos. Creemos en los datos, la mejora continua y en que cada envío a tiempo cuenta. Si te apasiona la operación y quieres ver el impacto en la supply chain, este es tu lugar.',
                        detailed_description: 'Buscamos analista de operaciones con experiencia en logística y cadena de suministro.',
                        tagline: 'Buscamos a un analista de operaciones con experiencia en logística y cadena de suministro.',
                        tech_stack: ['WMS', 'Excel avanzado', 'KPIs', 'Supply Chain'],
                        salary: '$55,000 - $80,000',
                        image_url: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=400&h=400&fit=crop',
                        role: 'job',
                        category: 'Operaciones',
                        location: 'Híbrido'
                    },
                    {
                        id: 13,
                        user_id: 13,
                        name: 'InduMex - Ingeniero de Procesos',
                        description: 'Ingeniero de procesos o industrial. Mejora continua, automatización y seguridad en planta.',
                        company_description: 'En InduMex no solo fabricamos; construimos los estándares de la industria en México. Somos una empresa manufacturera con sede en León, especializada en procesos industriales y automatización. Creemos en la seguridad, la mejora continua y en que cada proceso bien diseñado suma. Si te apasiona la ingeniería industrial y quieres ver tu impacto en planta, este es tu lugar.',
                        detailed_description: 'Buscamos ingeniero de procesos o industrial con experiencia en manufactura y mejora continua.',
                        tagline: 'Buscamos a un Ing. de procesos o industrial con experiencia en manufactura y mejora continua.',
                        tech_stack: ['Lean', 'Six Sigma', 'Automatización', 'Seguridad industrial'],
                        salary: '$65,000 - $95,000',
                        image_url: 'https://images.unsplash.com/photo-1565793298595-6a879b1d9492?w=400&h=400&fit=crop',
                        role: 'job',
                        category: 'Operaciones',
                        location: 'Presencial'
                    },
                    {
                        id: 14,
                        user_id: 14,
                        name: 'EduCrece - Diseñador Instruccional',
                        description: 'Diseñador instruccional para cursos en línea. Storyboarding, LMS y contenidos educativos.',
                        company_description: 'En EduCrece no solo damos cursos; transformamos la forma en que las personas aprenden. Somos una plataforma de educación en línea con sede en CDMX, especializada en capacitación corporativa y contenidos digitales. Creemos en el aprendizaje accesible, el diseño pedagógico de calidad y en que cada curso puede cambiar una carrera. Si te apasiona la educación y el e-learning, este es tu lugar.',
                        detailed_description: 'Buscamos diseñador instruccional con experiencia en e-learning y LMS.',
                        tagline: 'Buscamos a un diseñador instruccional con experiencia en e-learning y creación de contenidos.',
                        tech_stack: ['Articulate', 'Moodle', 'Storyline', 'SCORM'],
                        salary: '$48,000 - $72,000',
                        image_url: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400&h=400&fit=crop',
                        role: 'job',
                        category: 'Educación',
                        location: 'Remoto'
                    },
                    {
                        id: 15,
                        user_id: 15,
                        name: 'Finanzia - Analista de Riesgos',
                        description: 'Analista de riesgos crediticios y modelos de scoring. Datos, Python y regulación financiera.',
                        company_description: 'En Finanzia no solo prestamos; construimos inclusión financiera con tecnología y datos. Somos una fintech con sede en Monterrey, especializada en crédito y servicios de inversión para la región. Creemos en el análisis riguroso, el cumplimiento normativo y en que cada decisión de riesgo cuenta. Si te apasiona las finanzas y los datos, este es tu lugar.',
                        detailed_description: 'Buscamos analista de riesgos con experiencia en modelos de crédito o scoring.',
                        tagline: 'Buscamos a un analista de riesgos con experiencia en crédito y análisis de datos.',
                        tech_stack: ['Python', 'SQL', 'Modelado de riesgo', 'Basel'],
                        salary: '$70,000 - $105,000',
                        image_url: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=400&fit=crop',
                        role: 'job',
                        category: 'Finanzas',
                        location: 'Híbrido'
                    },
                    {
                        id: 16,
                        user_id: 16,
                        name: 'BrandWise - Community Manager',
                        description: 'Community manager y contenido para redes. Estrategia digital, métricas y creatividad.',
                        company_description: 'En BrandWise no solo hacemos posts; construimos comunidades que conectan marcas con personas. Somos una agencia de marketing digital con sede en Guadalajara, especializados en redes sociales, contenido y estrategia de marca. Creemos en la creatividad, los datos y en que cada historia bien contada suma. Si te apasiona el marketing digital, este es tu lugar.',
                        detailed_description: 'Buscamos community manager con experiencia en redes y contenido digital.',
                        tagline: 'Buscamos a un community manager con experiencia en redes sociales y estrategia de contenido.',
                        tech_stack: ['Redes sociales', 'Meta Ads', 'Google Analytics', 'Copywriting'],
                        salary: '$42,000 - $62,000',
                        image_url: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400&h=400&fit=crop',
                        role: 'job',
                        category: 'Marketing',
                        location: 'Híbrido'
                    },
                    {
                        id: 17,
                        user_id: 17,
                        name: 'LegalPlus - Asistente Jurídico',
                        description: 'Asistente jurídico en derecho corporativo. Redacción de contratos, due diligence y compliance.',
                        company_description: 'En LegalPlus no solo asesoramos; acompañamos a las empresas en cada decisión legal. Somos un bufete con sede en CDMX, especializado en derecho corporativo, fusiones y cumplimiento normativo. Creemos en la precisión, la confidencialidad y en que cada documento bien redactado protege a nuestros clientes. Si te apasiona el derecho corporativo, este es tu lugar.',
                        detailed_description: 'Buscamos asistente jurídico con experiencia en derecho corporativo o compliance.',
                        tagline: 'Buscamos a un asistente jurídico con experiencia en derecho corporativo y redacción de contratos.',
                        tech_stack: ['Derecho corporativo', 'Contratos', 'Compliance', 'Due diligence'],
                        salary: '$55,000 - $82,000',
                        image_url: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=400&h=400&fit=crop',
                        role: 'job',
                        category: 'Legal',
                        location: 'Presencial'
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

    // Actualizar perfil público (el que ven otros en Discover) por user_id
    updateProfileByUserId(userId, updates) {
        const db = this.getAll();
        if (!db) return null;
        const profileIndex = db.profiles.findIndex(p => p.user_id === userId);
        if (profileIndex === -1) return null;
        db.profiles[profileIndex] = { ...db.profiles[profileIndex], ...updates };
        this.save(db);
        return db.profiles[profileIndex];
    },

    // Obtener ofertas de trabajo (perfiles role job) de una empresa por user_id
    getJobProfilesByUserId(companyUserId) {
        const db = this.getAll();
        if (!db || !db.profiles) return [];
        return db.profiles.filter(p => p.role === 'job' && p.user_id === companyUserId);
    },

    // Crear oferta de trabajo (perfil role job) para una empresa
    createJobProfile(companyUserId, jobData) {
        const db = this.getAll();
        if (!db) return null;
        const nextId = db.profiles.length > 0 ? Math.max(...db.profiles.map(p => p.id)) + 1 : 1;
        const companyUser = db.users.find(u => u.id === companyUserId);
        const newProfile = {
            id: nextId,
            user_id: companyUserId,
            name: jobData.title || jobData.name || 'Nueva oferta',
            description: jobData.description || '',
            detailed_description: jobData.detailed_description || jobData.description || '',
            tagline: jobData.tagline || jobData.title || '',
            company_description: jobData.company_description || (companyUser && companyUser.description) || jobData.description || '',
            tech_stack: Array.isArray(jobData.tech_stack) ? jobData.tech_stack : [],
            salary: jobData.salary || '',
            image_url: jobData.image_url || (companyUser && companyUser.image_url) || 'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=400&h=400&fit=crop',
            role: 'job',
            category: jobData.category || 'Tecnología',
            location: jobData.location || 'Remoto',
            company_name: companyUser && companyUser.company_name
        };
        db.profiles.push(newProfile);
        this.save(db);
        return newProfile;
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

