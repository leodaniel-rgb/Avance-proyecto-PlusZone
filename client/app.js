// Datos mock de perfiles
const mockProfiles = [
    // Candidatos (Empleados)
    {
        id: 'candidate-1',
        name: 'María García',
        description: 'Senior Full Stack Developer',
        detailedDescription: 'Desarrolladora con más de 8 años de experiencia en aplicaciones web modernas. Especializada en React, Node.js y arquitectura de microservicios. He liderado equipos de hasta 10 desarrolladores y contribuido a proyectos que han impactado a millones de usuarios.',
        techStack: ['React', 'Node.js', 'TypeScript', 'PostgreSQL', 'AWS', 'Docker'],
        salary: '$80,000 - $120,000',
        salaryExpected: '$80,000 - $120,000',
        experience: '8+ años',
        location: 'Remoto / Madrid, España',
        availability: 'Inmediata',
        category: 'Informática',
        imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
        role: 'candidate',
        userType: 'employee'
    },
    {
        id: 'candidate-2',
        name: 'Carlos Rodríguez',
        description: 'DevOps Engineer & Cloud Architect',
        detailedDescription: 'Experto en infraestructura cloud y automatización. Certificado en AWS y Azure con amplia experiencia en CI/CD pipelines, Kubernetes y monitoreo de sistemas distribuidos. Apasionado por la automatización y optimización de procesos.',
        techStack: ['Kubernetes', 'AWS', 'Terraform', 'Jenkins', 'Prometheus', 'Grafana'],
        salary: '$90,000 - $130,000',
        salaryExpected: '$90,000 - $130,000',
        experience: '6+ años',
        location: 'Remoto / Barcelona, España',
        availability: '2 semanas',
        category: 'Informática',
        imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
        role: 'candidate',
        userType: 'employee'
    },
    {
        id: 'candidate-3',
        name: 'Ana Martínez',
        description: 'UX/UI Designer & Product Designer',
        detailedDescription: 'Diseñadora de productos digitales con enfoque en experiencia de usuario y metodologías ágiles. He trabajado en productos B2B y B2C, creando interfaces intuitivas que han mejorado significativamente las métricas de conversión y satisfacción del usuario.',
        techStack: ['Figma', 'Sketch', 'Adobe XD', 'User Research', 'Prototyping', 'Design Systems'],
        salary: '$70,000 - $100,000',
        salaryExpected: '$70,000 - $100,000',
        experience: '5+ años',
        location: 'Híbrido / Valencia, España',
        availability: 'Inmediata',
        category: 'Informática',
        imageUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop',
        role: 'candidate',
        userType: 'employee'
    },
    {
        id: 'candidate-4',
        name: 'David López',
        description: 'Data Scientist & ML Engineer',
        detailedDescription: 'Científico de datos especializado en machine learning y deep learning. Experiencia en modelos predictivos, procesamiento de lenguaje natural y visión por computadora. He publicado papers y trabajado en proyectos de IA para healthcare y fintech.',
        techStack: ['Python', 'TensorFlow', 'PyTorch', 'Pandas', 'Scikit-learn', 'SQL'],
        salary: '$95,000 - $140,000',
        salaryExpected: '$95,000 - $140,000',
        experience: '7+ años',
        location: 'Remoto',
        availability: '1 mes',
        category: 'Informática',
        imageUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop',
        role: 'candidate',
        userType: 'employee'
    },
    {
        id: 'candidate-5',
        name: 'Laura Sánchez',
        description: 'Mobile Developer (iOS & Android)',
        detailedDescription: 'Desarrolladora móvil con experiencia cross-platform y nativa. He publicado más de 15 aplicaciones en App Store y Google Play con millones de descargas. Especializada en optimización de rendimiento y arquitectura de apps escalables.',
        techStack: ['React Native', 'Swift', 'Kotlin', 'Flutter', 'Firebase', 'GraphQL'],
        salary: '$75,000 - $110,000',
        salaryExpected: '$75,000 - $110,000',
        experience: '4+ años',
        location: 'Remoto / Madrid, España',
        availability: 'Inmediata',
        category: 'Informática',
        imageUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop',
        role: 'candidate',
        userType: 'employee'
    },
    {
        id: 'candidate-6',
        name: 'Roberto Fernández',
        description: 'Backend Engineer (Java/Python)',
        detailedDescription: 'Ingeniero de backend con sólida experiencia en sistemas distribuidos y alta concurrencia. He diseñado APIs que manejan millones de requests diarios. Experto en optimización de bases de datos y arquitectura de microservicios.',
        techStack: ['Java', 'Spring Boot', 'Python', 'Django', 'Redis', 'MongoDB'],
        salary: '$85,000 - $125,000',
        salaryExpected: '$85,000 - $125,000',
        experience: '6+ años',
        location: 'Híbrido / Barcelona, España',
        availability: '3 semanas',
        category: 'Informática',
        imageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop',
        role: 'candidate',
        userType: 'employee'
    },
    {
        id: 'candidate-7',
        name: 'Sofía Ramírez',
        description: 'Ingeniera Industrial',
        detailedDescription: 'Ingeniera industrial especializada en optimización de procesos y gestión de producción. Experiencia en implementación de sistemas lean manufacturing y mejora continua. He trabajado en plantas de producción de gran escala.',
        techStack: ['AutoCAD', 'SAP', 'Lean Manufacturing', 'Six Sigma', 'Project Management'],
        salary: '$70,000 - $100,000',
        salaryExpected: '$70,000 - $100,000',
        experience: '5+ años',
        location: 'Presencial / Sevilla, España',
        availability: 'Inmediata',
        category: 'Industrial',
        imageUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop',
        role: 'candidate',
        userType: 'employee'
    },
    {
        id: 'candidate-8',
        name: 'Dr. Javier Morales',
        description: 'Médico Especialista en Cardiología',
        detailedDescription: 'Médico especialista en cardiología con más de 10 años de experiencia. Experto en diagnóstico y tratamiento de enfermedades cardiovasculares. He trabajado en hospitales de referencia y publicado investigaciones en revistas médicas.',
        techStack: ['ECG', 'Ecocardiografía', 'Angiografía', 'Medicina Interna'],
        salary: '$120,000 - $180,000',
        salaryExpected: '$120,000 - $180,000',
        experience: '10+ años',
        location: 'Presencial / Madrid, España',
        availability: '1 mes',
        category: 'Médicos',
        imageUrl: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop',
        role: 'candidate',
        userType: 'employee'
    },
    {
        id: 'candidate-9',
        name: 'Elena Torres',
        description: 'Ingeniera de Software',
        detailedDescription: 'Ingeniera de software con experiencia en desarrollo full-stack y arquitectura de sistemas. Especializada en aplicaciones empresariales y soluciones cloud. Certificada en AWS y Azure.',
        techStack: ['Java', 'Spring', 'Angular', 'AWS', 'Docker', 'Kubernetes'],
        salary: '$85,000 - $125,000',
        salaryExpected: '$85,000 - $125,000',
        experience: '5+ años',
        location: 'Remoto',
        availability: '2 semanas',
        category: 'Informática',
        imageUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop',
        role: 'candidate',
        userType: 'employee'
    },
    {
        id: 'candidate-10',
        name: 'Miguel Ángel Ruiz',
        description: 'Ingeniero Mecánico',
        detailedDescription: 'Ingeniero mecánico especializado en diseño y mantenimiento de maquinaria industrial. Experiencia en proyectos de automatización y mejora de eficiencia energética. Certificado en mantenimiento predictivo.',
        techStack: ['SolidWorks', 'AutoCAD', 'PLC', 'Mantenimiento Predictivo', 'Automatización'],
        salary: '$65,000 - $95,000',
        salaryExpected: '$65,000 - $95,000',
        experience: '4+ años',
        location: 'Presencial / Bilbao, España',
        availability: 'Inmediata',
        category: 'Industrial',
        imageUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop',
        role: 'candidate',
        userType: 'employee'
    },
    {
        id: 'candidate-11',
        name: 'Dra. Carmen López',
        description: 'Médico General',
        detailedDescription: 'Médico general con amplia experiencia en atención primaria y medicina familiar. Especializada en prevención y promoción de la salud. He trabajado en centros de salud y clínicas privadas.',
        techStack: ['Atención Primaria', 'Medicina Familiar', 'Prevención', 'Salud Pública'],
        salary: '$80,000 - $120,000',
        salaryExpected: '$80,000 - $120,000',
        experience: '7+ años',
        location: 'Presencial / Valencia, España',
        availability: '1 mes',
        category: 'Médicos',
        imageUrl: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop',
        role: 'candidate',
        userType: 'employee'
    },
    {
        id: 'candidate-12',
        name: 'Pablo Martínez',
        description: 'Frontend Developer',
        detailedDescription: 'Desarrollador frontend especializado en React y Vue.js. Experiencia en creación de interfaces de usuario modernas y responsivas. Apasionado por el diseño UI/UX y las mejores prácticas de desarrollo.',
        techStack: ['React', 'Vue.js', 'JavaScript', 'TypeScript', 'CSS', 'SASS'],
        salary: '$70,000 - $100,000',
        salaryExpected: '$70,000 - $100,000',
        experience: '3+ años',
        location: 'Remoto / Híbrido',
        availability: 'Inmediata',
        category: 'Informática',
        imageUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop',
        role: 'candidate',
        userType: 'employee'
    },
    {
        id: 'candidate-14',
        name: 'Isabel Moreno',
        description: 'Ingeniera Química Industrial',
        detailedDescription: 'Ingeniera química especializada en procesos industriales y control de calidad. Experiencia en plantas de producción química y farmacéutica. Certificada en gestión ambiental y seguridad industrial.',
        techStack: ['Control de Procesos', 'Gestión Ambiental', 'Seguridad Industrial', 'Análisis Químico'],
        salary: '$68,000 - $98,000',
        salaryExpected: '$68,000 - $98,000',
        experience: '5+ años',
        location: 'Presencial / Zaragoza, España',
        availability: '2 semanas',
        category: 'Industrial',
        imageUrl: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&h=400&fit=crop',
        role: 'candidate',
        userType: 'employee'
    },
    {
        id: 'candidate-15',
        name: 'Dr. Luis Hernández',
        description: 'Médico Especialista en Pediatría',
        detailedDescription: 'Médico especialista en pediatría con amplia experiencia en atención infantil y neonatal. He trabajado en hospitales pediátricos de referencia y tengo experiencia en urgencias pediátricas.',
        techStack: ['Pediatría', 'Neonatología', 'Urgencias Pediátricas', 'Medicina Preventiva'],
        salary: '$110,000 - $160,000',
        salaryExpected: '$110,000 - $160,000',
        experience: '8+ años',
        location: 'Presencial / Málaga, España',
        availability: '1 mes',
        category: 'Médicos',
        imageUrl: 'https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=400&h=400&fit=crop',
        role: 'candidate',
        userType: 'employee'
    },
    {
        id: 'candidate-13',
        name: 'Andrés Gutiérrez',
        description: 'Ingeniero de Calidad Industrial',
        detailedDescription: 'Ingeniero especializado en control de calidad y gestión de procesos industriales. Experiencia en implementación de sistemas de calidad ISO y auditorías. He trabajado en empresas manufactureras líderes.',
        techStack: ['ISO 9001', 'Control de Calidad', 'Auditorías', 'Mejora Continua'],
        salary: '$65,000 - $90,000',
        salaryExpected: '$65,000 - $90,000',
        experience: '4+ años',
        location: 'Presencial / Zaragoza, España',
        availability: '2 semanas',
        category: 'Industrial',
        imageUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop',
        role: 'candidate',
        userType: 'employee'
    },
    {
        id: 'candidate-14',
        name: 'Patricia Moreno',
        description: 'Ingeniera de Procesos',
        detailedDescription: 'Ingeniera de procesos con experiencia en optimización de líneas de producción y reducción de desperdicios. Especializada en metodologías lean y six sigma. He mejorado la eficiencia en múltiples plantas industriales.',
        techStack: ['Lean Manufacturing', 'Six Sigma', 'Análisis de Procesos', 'Optimización'],
        salary: '$68,000 - $95,000',
        salaryExpected: '$68,000 - $95,000',
        experience: '5+ años',
        location: 'Híbrido / Bilbao, España',
        availability: 'Inmediata',
        category: 'Industrial',
        imageUrl: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&h=400&fit=crop',
        role: 'candidate',
        userType: 'employee'
    },
    {
        id: 'candidate-15',
        name: 'Dra. Isabel Ruiz',
        description: 'Médico Pediatra',
        detailedDescription: 'Médico pediatra con más de 8 años de experiencia en atención infantil. Especializada en desarrollo infantil y enfermedades pediátricas comunes. He trabajado en hospitales pediátricos y consultas privadas.',
        techStack: ['Pediatría', 'Desarrollo Infantil', 'Vacunación', 'Atención Primaria'],
        salary: '$90,000 - $130,000',
        salaryExpected: '$90,000 - $130,000',
        experience: '8+ años',
        location: 'Presencial / Barcelona, España',
        availability: '1 mes',
        category: 'Médicos',
        imageUrl: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop',
        role: 'candidate',
        userType: 'employee'
    },
    {
        id: 'candidate-16',
        name: 'Dr. Fernando Castro',
        description: 'Médico Cirujano',
        detailedDescription: 'Médico cirujano especializado en cirugía general y laparoscópica. Más de 12 años de experiencia en procedimientos quirúrgicos complejos. He realizado más de 1000 cirugías exitosas en hospitales de referencia.',
        techStack: ['Cirugía General', 'Cirugía Laparoscópica', 'Trauma', 'Cirugía de Urgencias'],
        salary: '$130,000 - $190,000',
        salaryExpected: '$130,000 - $190,000',
        experience: '12+ años',
        location: 'Presencial / Madrid, España',
        availability: '2 meses',
        category: 'Médicos',
        imageUrl: 'https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=400&h=400&fit=crop',
        role: 'candidate',
        userType: 'employee'
    },
    // Ofertas de Trabajo (Publicadas por Empresas)
    {
        id: 'job-1',
        name: 'Senior React Developer',
        description: 'Remote - Startup Fintech',
        detailedDescription: 'Estamos buscando un desarrollador React senior para unirse a nuestro equipo en una fintech en rápido crecimiento. Trabajarás en aplicaciones financieras de alto impacto, colaborando con un equipo internacional de talentos. Ofertamos trabajo remoto completo, beneficios competitivos y oportunidad de crecimiento acelerado.',
        techStack: ['React', 'TypeScript', 'GraphQL', 'Jest', 'Cypress'],
        salary: '$100,000 - $150,000',
        location: 'Remoto',
        companyName: 'TechFin Solutions',
        companySize: '51-200 empleados',
        industry: 'Fintech',
        category: 'Informática',
        imageUrl: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=400&h=400&fit=crop',
        role: 'job',
        userType: 'company',
        companyId: 'company-1'
    },
    {
        id: 'job-2',
        name: 'Lead DevOps Engineer',
        description: 'Hybrid - Enterprise Tech',
        detailedDescription: 'Empresa tecnológica líder busca un Lead DevOps para liderar la transformación de infraestructura. Responsabilidades incluyen diseño de arquitectura cloud, liderazgo de equipo y estrategia de DevOps. Ambiente de trabajo dinámico con proyectos desafiantes a escala global.',
        techStack: ['Kubernetes', 'AWS', 'Terraform', 'Ansible', 'ELK Stack'],
        salary: '$120,000 - $180,000',
        location: 'Híbrido',
        companyName: 'CloudTech Enterprise',
        companySize: '201-500 empleados',
        industry: 'Tecnología',
        category: 'Informática',
        imageUrl: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=400&h=400&fit=crop',
        role: 'job',
        userType: 'company',
        companyId: 'company-2'
    },
    {
        id: 'job-3',
        name: 'Product Designer',
        description: 'On-site - Design Agency',
        detailedDescription: 'Agencia de diseño líder busca Product Designer para proyectos innovadores en el sector retail y e-commerce. Trabajarás con clientes de alto perfil, desde la conceptualización hasta la implementación. Ambiente creativo con equipo multidisciplinario.',
        techStack: ['Figma', 'User Research', 'Prototyping', 'Design Thinking'],
        salary: '$75,000 - $105,000',
        location: 'Presencial',
        companyName: 'Creative Design Studio',
        companySize: '11-50 empleados',
        industry: 'Diseño',
        category: 'Informática',
        imageUrl: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=400&fit=crop',
        role: 'job',
        userType: 'company',
        companyId: 'company-3'
    },
    {
        id: 'job-4',
        name: 'ML Engineer',
        description: 'Remote - AI Startup',
        detailedDescription: 'Startup de IA en crecimiento busca ML Engineer para desarrollar modelos de machine learning de última generación. Trabajarás en proyectos innovadores desde investigación hasta producción. Cultura startup con equity y crecimiento acelerado.',
        techStack: ['Python', 'PyTorch', 'MLflow', 'Docker', 'Kubernetes'],
        salary: '$110,000 - $160,000',
        location: 'Remoto',
        companyName: 'AI Innovations Lab',
        companySize: '1-10 empleados',
        industry: 'Inteligencia Artificial',
        category: 'Informática',
        imageUrl: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=400&fit=crop',
        role: 'job',
        userType: 'company',
        companyId: 'company-4'
    },
    {
        id: 'job-5',
        name: 'Mobile Developer (React Native)',
        description: 'Remote - E-commerce Platform',
        detailedDescription: 'Plataforma de e-commerce líder busca desarrollador móvil React Native para expandir su aplicación móvil. Trabajarás en features que impactan millones de usuarios. Ambiente ágil con metodologías modernas y herramientas de última generación.',
        techStack: ['React Native', 'TypeScript', 'Redux', 'Jest', 'Detox'],
        salary: '$90,000 - $130,000',
        location: 'Remoto',
        companyName: 'ShopGlobal E-commerce',
        companySize: '500+ empleados',
        industry: 'E-commerce',
        category: 'Informática',
        imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=400&fit=crop',
        role: 'job',
        userType: 'company',
        companyId: 'company-5'
    },
    {
        id: 'job-6',
        name: 'Backend Engineer (Node.js)',
        description: 'Hybrid - SaaS Company',
        detailedDescription: 'Empresa SaaS en crecimiento busca Backend Engineer Node.js para escalar su plataforma. Trabajarás en APIs de alta performance, integraciones y arquitectura escalable. Oportunidades de liderazgo técnico y crecimiento profesional.',
        techStack: ['Node.js', 'Express', 'PostgreSQL', 'Redis', 'RabbitMQ'],
        salary: '$95,000 - $140,000',
        location: 'Híbrido',
        companyName: 'SaaS Solutions Inc',
        companySize: '51-200 empleados',
        industry: 'Software as a Service',
        category: 'Informática',
        imageUrl: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=400&h=400&fit=crop',
        role: 'job',
        userType: 'company',
        companyId: 'company-6'
    },
    {
        id: 'job-7',
        name: 'Ingeniero de Producción',
        description: 'Presencial - Industria Manufacturera',
        detailedDescription: 'Empresa manufacturera líder busca Ingeniero de Producción para optimizar procesos de producción y mejorar la eficiencia operativa. Trabajarás en proyectos de mejora continua y automatización industrial.',
        techStack: ['Lean Manufacturing', 'Six Sigma', 'SAP', 'AutoCAD', 'Project Management'],
        salary: '$70,000 - $100,000',
        location: 'Presencial',
        companyName: 'Manufacturas del Sur',
        companySize: '201-500 empleados',
        industry: 'Manufactura',
        category: 'Industrial',
        imageUrl: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=400&fit=crop',
        role: 'job',
        userType: 'company',
        companyId: 'company-7'
    },
    {
        id: 'job-8',
        name: 'Médico Especialista en Urgencias',
        description: 'Presencial - Hospital Público',
        detailedDescription: 'Hospital de referencia busca Médico Especialista en Urgencias para servicio de urgencias 24/7. Experiencia en atención de emergencias, trauma y medicina crítica. Ambiente dinámico con equipo multidisciplinario.',
        techStack: ['Medicina de Urgencias', 'RCP', 'Trauma', 'Medicina Crítica'],
        salary: '$100,000 - $150,000',
        location: 'Presencial',
        companyName: 'Hospital Central',
        companySize: '500+ empleados',
        industry: 'Salud',
        category: 'Médicos',
        imageUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400&h=400&fit=crop',
        role: 'job',
        userType: 'company',
        companyId: 'company-8'
    },
    {
        id: 'job-9',
        name: 'Ingeniero Mecánico',
        description: 'Híbrido - Empresa Industrial',
        detailedDescription: 'Empresa industrial busca Ingeniero Mecánico para diseño y mantenimiento de maquinaria. Experiencia en proyectos de automatización y mejora de procesos. Oportunidades de crecimiento en un ambiente técnico desafiante.',
        techStack: ['SolidWorks', 'AutoCAD', 'PLC', 'Mantenimiento', 'Automatización'],
        salary: '$65,000 - $95,000',
        location: 'Híbrido',
        companyName: 'Industrias del Norte',
        companySize: '51-200 empleados',
        industry: 'Industrial',
        category: 'Industrial',
        imageUrl: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=400&h=400&fit=crop',
        role: 'job',
        userType: 'company',
        companyId: 'company-9'
    },
    {
        id: 'job-10',
        name: 'Enfermera Especialista',
        description: 'Presencial - Clínica Privada',
        detailedDescription: 'Clínica privada busca Enfermera Especialista para área de cuidados intensivos. Experiencia en atención de pacientes críticos y manejo de equipos médicos avanzados. Ambiente profesional con oportunidades de especialización.',
        techStack: ['Cuidados Intensivos', 'Ventilación Mecánica', 'Monitoreo', 'Medicación'],
        salary: '$60,000 - $85,000',
        location: 'Presencial',
        companyName: 'Clínica San José',
        companySize: '11-50 empleados',
        industry: 'Salud',
        category: 'Médicos',
        imageUrl: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop',
        role: 'job',
        userType: 'company',
        companyId: 'company-10'
    },
    {
        id: 'job-11',
        name: 'Full Stack Developer',
        description: 'Remote - Tech Startup',
        detailedDescription: 'Startup tecnológica en crecimiento busca Full Stack Developer para desarrollar aplicaciones web modernas. Trabajarás con tecnologías de vanguardia en un ambiente ágil y colaborativo. Oportunidades de crecimiento rápido.',
        techStack: ['React', 'Node.js', 'MongoDB', 'AWS', 'Docker'],
        salary: '$80,000 - $120,000',
        location: 'Remoto',
        companyName: 'TechStart Innovations',
        companySize: '1-10 empleados',
        industry: 'Tecnología',
        category: 'Informática',
        imageUrl: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=400&h=400&fit=crop',
        role: 'job',
        userType: 'company',
        companyId: 'company-11'
    },
    {
        id: 'job-12',
        name: 'DevOps Engineer',
        description: 'Remote - Cloud Services',
        detailedDescription: 'Empresa de servicios cloud busca DevOps Engineer para gestionar infraestructura y pipelines de CI/CD. Experiencia en cloud computing y automatización. Trabajo remoto con equipo internacional.',
        techStack: ['AWS', 'Kubernetes', 'Terraform', 'Jenkins', 'Docker'],
        salary: '$90,000 - $130,000',
        location: 'Remoto',
        companyName: 'Cloud Services Pro',
        companySize: '11-50 empleados',
        industry: 'Tecnología',
        category: 'Informática',
        imageUrl: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=400&fit=crop',
        role: 'job',
        userType: 'company',
        companyId: 'company-12'
    },
    {
        id: 'job-13',
        name: 'Ingeniero de Calidad Industrial',
        description: 'Presencial - Empresa Manufacturera',
        detailedDescription: 'Empresa manufacturera busca Ingeniero de Calidad para implementar y mantener sistemas de calidad ISO. Experiencia en auditorías, control de procesos y mejora continua. Ambiente dinámico con proyectos desafiantes.',
        techStack: ['ISO 9001', 'Control de Calidad', 'Auditorías', 'Mejora Continua', 'SAP'],
        salary: '$65,000 - $90,000',
        location: 'Presencial',
        companyName: 'Calidad Industrial SA',
        companySize: '201-500 empleados',
        industry: 'Manufactura',
        category: 'Industrial',
        imageUrl: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=400&h=400&fit=crop',
        role: 'job',
        userType: 'company',
        companyId: 'company-13'
    },
    {
        id: 'job-14',
        name: 'Médico Especialista en Anestesiología',
        description: 'Presencial - Hospital Privado',
        detailedDescription: 'Hospital privado de referencia busca Médico Especialista en Anestesiología para servicio de quirófano. Experiencia en anestesia general y regional. Ambiente profesional con tecnología de última generación.',
        techStack: ['Anestesiología', 'Medicina Perioperatoria', 'Dolor Agudo', 'Reanimación'],
        salary: '$115,000 - $170,000',
        location: 'Presencial',
        companyName: 'Hospital Privado San Miguel',
        companySize: '201-500 empleados',
        industry: 'Salud',
        category: 'Médicos',
        imageUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400&h=400&fit=crop',
        role: 'job',
        userType: 'company',
        companyId: 'company-14'
    },
    {
        id: 'job-15',
        name: 'Cybersecurity Engineer',
        description: 'Remote - Security Company',
        detailedDescription: 'Empresa de ciberseguridad líder busca Cybersecurity Engineer para proteger infraestructuras críticas. Experiencia en análisis de vulnerabilidades, respuesta a incidentes y arquitectura de seguridad. Trabajo remoto con equipo internacional.',
        techStack: ['SIEM', 'Penetration Testing', 'Firewall', 'IDS/IPS', 'Cloud Security'],
        salary: '$100,000 - $150,000',
        location: 'Remoto',
        companyName: 'SecureTech Solutions',
        companySize: '51-200 empleados',
        industry: 'Ciberseguridad',
        category: 'Informática',
        imageUrl: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400&h=400&fit=crop',
        role: 'job',
        userType: 'company',
        companyId: 'company-15'
    }
];

// Datos mock de empresas (para mostrar información de empresas)
const mockCompanies = [
    {
        id: 'company-1',
        name: 'TechFin Solutions',
        description: 'Startup Fintech innovadora',
        industry: 'Fintech',
        size: '51-200 empleados',
        location: 'Madrid, España',
        website: 'https://techfin.com',
        imageUrl: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=400&h=400&fit=crop'
    },
    {
        id: 'company-2',
        name: 'CloudTech Enterprise',
        description: 'Empresa tecnológica líder',
        industry: 'Tecnología',
        size: '201-500 empleados',
        location: 'Barcelona, España',
        website: 'https://cloudtech.com',
        imageUrl: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=400&h=400&fit=crop'
    },
    {
        id: 'company-3',
        name: 'Creative Design Studio',
        description: 'Agencia de diseño líder',
        industry: 'Diseño',
        size: '11-50 empleados',
        location: 'Valencia, España',
        website: 'https://creativedesign.com',
        imageUrl: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=400&fit=crop'
    },
    {
        id: 'company-4',
        name: 'AI Innovations Lab',
        description: 'Startup de IA',
        industry: 'Inteligencia Artificial',
        size: '1-10 empleados',
        location: 'Remoto',
        website: 'https://aiinnovations.com',
        imageUrl: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=400&fit=crop'
    },
    {
        id: 'company-5',
        name: 'ShopGlobal E-commerce',
        description: 'Plataforma de e-commerce',
        industry: 'E-commerce',
        size: '500+ empleados',
        location: 'Remoto',
        website: 'https://shopglobal.com',
        imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=400&fit=crop'
    },
    {
        id: 'company-6',
        name: 'SaaS Solutions Inc',
        description: 'Empresa SaaS',
        industry: 'Software as a Service',
        size: '51-200 empleados',
        location: 'Barcelona, España',
        website: 'https://saassolutions.com',
        imageUrl: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=400&h=400&fit=crop'
    }
];

// Estado global
const state = {
    allProfiles: [...mockProfiles], // Todos los perfiles disponibles
    profiles: [], // Perfiles filtrados según el tipo de usuario
    swipedProfiles: [],
    matchedProfiles: [],
    currentIndex: 0,
    isDragging: false,
    currentUser: null,
    currentSection: 'discover',
    activities: [],
    companyJobs: [],
    selectedCategory: 'Todas' // Categoría seleccionada para filtrar
};

// Función para filtrar perfiles según el tipo de usuario y categoría
function filterProfilesByUserType() {
    if (!state.currentUser) {
        state.profiles = [];
        return;
    }
    
    let filtered = [];
    
    if (state.currentUser.type === 'employee') {
        // Empleados ven ofertas de trabajo
        filtered = state.allProfiles.filter(p => p.role === 'job');
    } else if (state.currentUser.type === 'company') {
        // Empresas ven candidatos (empleados)
        filtered = state.allProfiles.filter(p => p.role === 'candidate');
    } else {
        state.profiles = [];
        return;
    }
    
    // Filtrar por categoría si no es "Todas"
    if (state.selectedCategory && state.selectedCategory !== 'Todas') {
        filtered = filtered.filter(p => p.category === state.selectedCategory);
    }
    
    // Eliminar duplicados por ID para asegurar perfiles únicos
    const uniqueProfiles = [];
    const seenIds = new Set();
    for (const profile of filtered) {
        if (!seenIds.has(profile.id)) {
            seenIds.add(profile.id);
            uniqueProfiles.push(profile);
        }
    }
    
    state.profiles = uniqueProfiles;
    
    // Resetear índice cuando se filtran los perfiles
    state.currentIndex = 0;
    state.swipedProfiles = [];
}

// Función para obtener categorías disponibles según el tipo de usuario
function getAvailableCategories() {
    if (!state.currentUser) return [];
    
    let profiles = [];
    if (state.currentUser.type === 'employee') {
        profiles = state.allProfiles.filter(p => p.role === 'job');
    } else if (state.currentUser.type === 'company') {
        profiles = state.allProfiles.filter(p => p.role === 'candidate');
    }
    
    const categories = ['Todas', ...new Set(profiles.map(p => p.category).filter(c => c))];
    return categories;
}

// ===== PANTALLA DE CARGA =====
function initLoadingScreen() {
    setTimeout(() => {
        const loadingScreen = document.getElementById('loadingScreen');
        loadingScreen.classList.add('hidden');
        setTimeout(() => {
            loadingScreen.style.display = 'none';
            showAuthScreen();
        }, 500);
    }, 2000);
}

// ===== AUTENTICACIÓN =====
function showAuthScreen() {
    document.getElementById('authScreen').style.display = 'flex';
}

function switchAuthTab(tab) {
    const loginTab = document.getElementById('loginTab');
    const registerTab = document.getElementById('registerTab');
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    
    if (tab === 'login') {
        loginTab.classList.add('active');
        registerTab.classList.remove('active');
        loginForm.style.display = 'flex';
        registerForm.style.display = 'none';
    } else {
        registerTab.classList.add('active');
        loginTab.classList.remove('active');
        loginForm.style.display = 'none';
        registerForm.style.display = 'flex';
    }
}

async function handleLogin(e) {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value.trim();
    const password = document.getElementById('loginPassword').value;
    const userType = document.querySelector('input[name="userType"]:checked').value;

    // Validar campos
    if (!email || !password) {
        alert('Por favor, completa todos los campos');
        return;
    }

    // Limpiar mensajes de error previos
    clearAuthErrors();

    // Intentar validar con la API si está disponible
    try {
        const resp = await fetch('/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });
        const data = await resp.json();
        if (!resp.ok) {
            // Si el backend indica que el correo no está verificado, abrir modal para verificar
            if (resp.status === 403 && data.error && data.error.toLowerCase().includes('verificado')) {
                window._pendingVerification = { email, password };
                openVerifyModal(email, 'Tu correo no está verificado. Ingresa el código que te fue enviado.');
                return;
            }

            showAuthError('loginForm', data.error || 'Error al iniciar sesión');
            return;
        }

        state.currentUser = {
            id: data.user.id,
            email: data.user.email,
            name: data.user.name,
            type: data.user.type,
            imageUrl: data.user.imageUrl || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&h=400&fit=crop',
            description: data.user.description || '',
            techStack: []
        };

        showAuthSuccess('loginForm', 'Sesión iniciada. Redirigiendo...');
        setTimeout(() => {
            const authScreen = document.getElementById('authScreen');
            const app = document.getElementById('app');
            if (authScreen) authScreen.style.display = 'none';
            if (app) app.style.display = 'flex';
            showMainApp();
            addActivity('Bienvenido a PlusZone', 'Comienza a deslizar para encontrar tu próximo match');
        }, 800);

        return;
    } catch (err) {
        console.warn('API login falla o no disponible:', err);
        // Si falla la petición, caer al modo demo o DB local
    }

    // Intentar con base de datos local (demo) si existe
    if (typeof Database !== 'undefined' && Database) {
        // Verificar si es admin
        if (email.includes('admin')) {
            const adminUser = Database.validateAdmin(email, password);
            if (adminUser) {
                state.currentUser = {
                    id: adminUser.id,
                    email: adminUser.email,
                    name: adminUser.name,
                    type: adminUser.user_type,
                    imageUrl: adminUser.image_url || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&h=400&fit=crop',
                    description: adminUser.description || '',
                    techStack: adminUser.tech_stack || []
                };

                const authScreen = document.getElementById('authScreen');
                const app = document.getElementById('app');

                if (authScreen) authScreen.style.display = 'none';
                if (app) {
                    app.style.display = 'flex';
                    showMainApp();
                    addActivity('Bienvenido Administrador', 'Has iniciado sesión como administrador');
                }
                return;
            } else {
                showAuthError('loginForm', 'Credenciales de administrador incorrectas.\n\nUsuarios admin de prueba:\nEmail: admin@pluszone.com\nPassword: admin123');
                return;
            }
        }

        const user = Database.getUserByEmail(email);
        if (!user) {
            showAuthError('loginForm', 'Usuario no encontrado. Por favor, regístrate primero.');
            return;
        }

        if (!user.is_active) {
            showAuthError('loginForm', 'Tu cuenta ha sido desactivada. Contacta al administrador.');
            return;
        }

        if (user.password !== password) {
            showAuthError('loginForm', 'Contraseña incorrecta. Intenta nuevamente.');
            return;
        }

        state.currentUser = {
            id: user.id,
            email: user.email,
            name: user.name,
            type: user.user_type,
            imageUrl: user.image_url || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&h=400&fit=crop',
            description: user.description || '',
            techStack: user.tech_stack || []
        };

        const authScreen = document.getElementById('authScreen');
        const app = document.getElementById('app');

        if (authScreen) authScreen.style.display = 'none';
        if (app) {
            app.style.display = 'flex';
            showMainApp();
            addActivity('Bienvenido a PlusZone', 'Comienza a deslizar para encontrar tu próximo match');
        }

        return;
    }

    // Modo demo fallback: Login sin base de datos (para diseño)
    const name = email.split('@')[0];
    const displayName = name.charAt(0).toUpperCase() + name.slice(1);

    state.currentUser = {
        id: 'demo-' + Date.now(),
        email: email,
        name: displayName,
        type: userType,
        imageUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&h=400&fit=crop',
        description: userType === 'company' 
            ? 'Empresa innovadora en busca de talento profesional para crecer juntos' 
            : 'Profesional apasionado buscando nuevas oportunidades de crecimiento',
        techStack: userType === 'company' ? [] : ['React', 'Node.js', 'TypeScript', 'PostgreSQL'],
        // Campos de empresa
        companyName: userType === 'company' ? displayName + ' Solutions' : undefined,
        companySize: userType === 'company' ? '11-50' : undefined,
        industry: userType === 'company' ? 'Tecnología' : undefined,
        companyLocation: userType === 'company' ? 'Madrid, España' : undefined,
        // Campos de empleado
        experience: userType === 'employee' ? '3-5 años' : undefined,
        availability: userType === 'employee' ? 'Inmediata' : undefined,
        preferredLocation: userType === 'employee' ? 'Remoto' : undefined,
        salaryExpected: userType === 'employee' ? '$80,000 - $120,000' : undefined
    };
    
    const authScreen = document.getElementById('authScreen');
    const app = document.getElementById('app');
    
    if (authScreen) authScreen.style.display = 'none';
    if (app) {
        app.style.display = 'flex';
        showMainApp();
        addActivity('Bienvenido a PlusZone', userType === 'company' ? 'Comienza a buscar candidatos' : 'Comienza a deslizar para encontrar tu próximo match');
    } else {
        console.error('Error: No se encontró el elemento #app');
        alert('Error al cargar la aplicación. Por favor, recarga la página.');
    }
}

async function handleRegister(e) {
    e.preventDefault();
    const name = document.getElementById('registerName').value.trim();
    const email = document.getElementById('registerEmail').value.trim();
    const password = document.getElementById('registerPassword').value;
    const userType = document.querySelector('input[name="registerUserType"]:checked').value;

    // Validar campos
    if (!name || !email || !password) {
        showAuthError('registerForm', 'Por favor, completa todos los campos');
        return;
    }

    if (password.length < 6) {
        showAuthError('registerForm', 'La contraseña debe tener al menos 6 caracteres');
        return;
    }

    // Validar formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showAuthError('registerForm', 'Por favor, ingresa un email válido');
        return;
    }

    // Limpiar mensajes de error previos
    clearAuthErrors();

    // Si existe un backend, usarlo (registros con verificación por email)
    try {
        const resp = await fetch('/api/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, password, user_type: userType })
        });

        const data = await resp.json();
        if (!resp.ok) {
            showAuthError('registerForm', data.error || 'Error en el registro');
            return;
        }

        showAuthSuccess('registerForm', 'Cuenta creada. Se ha enviado un código de verificación a tu correo.');

        // Abrir modal de verificación
        window._pendingVerification = { email, password, name };
        openVerifyModal(email, 'Se ha enviado un código de verificación a ' + email);

        return;
    } catch (err) {
        console.error(err);
        // Si falla la petición o no hay backend, caer al modo demo original
    }

    // Modo demo: Registro sin base de datos (para diseño)
    state.currentUser = {
        id: 'demo-' + Date.now(),
        email: email,
        name: name,
        type: userType,
        imageUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&h=400&fit=crop',
        description: userType === 'company' 
            ? 'Empresa innovadora en busca de talento profesional para crecer juntos' 
            : 'Profesional apasionado buscando nuevas oportunidades de crecimiento',
        techStack: userType === 'company' ? [] : ['React', 'Node.js', 'TypeScript', 'PostgreSQL'],
        // Campos de empresa
        companyName: userType === 'company' ? name + ' Solutions' : undefined,
        companySize: userType === 'company' ? '11-50' : undefined,
        industry: userType === 'company' ? 'Tecnología' : undefined,
        companyLocation: userType === 'company' ? 'Madrid, España' : undefined,
        // Campos de empleado
        experience: userType === 'employee' ? '3-5 años' : undefined,
        availability: userType === 'employee' ? 'Inmediata' : undefined,
        preferredLocation: userType === 'employee' ? 'Remoto' : undefined,
        salaryExpected: userType === 'employee' ? '$80,000 - $120,000' : undefined
    };

    // Mostrar mensaje de éxito
    showAuthSuccess('registerForm', '¡Cuenta creada exitosamente! Redirigiendo...');

    // Esperar un momento y luego mostrar la aplicación
    setTimeout(() => {
        const authScreen = document.getElementById('authScreen');
        const app = document.getElementById('app');

        if (authScreen) {
            authScreen.style.display = 'none';
        }

        if (app) {
            app.style.display = 'flex';
            showMainApp();
            addActivity('Cuenta creada exitosamente', 'Bienvenido a PlusZone, ' + name);
        } else {
            console.error('Error: No se encontró el elemento #app');
            alert('Error al cargar la aplicación. Por favor, recarga la página.');
        }
    }, 1500);
}

// Funciones auxiliares para mostrar mensajes
// Obtener perfiles desde el servidor (si existe API)
async function fetchProfiles() {
    try {
        const resp = await fetch('/api/profiles');
        const data = await resp.json();
        if (!resp.ok) {
            console.warn('No se pudo obtener perfiles desde la API:', data.error || resp.statusText);
            return;
        }

        // Mapear al formato esperado por la UI
        const profiles = (data.profiles || []).map(p => ({
            id: 'db-' + p.id,
            name: p.name,
            description: p.description || '',
            detailedDescription: p.detailed_description || '',
            techStack: (() => { try { return JSON.parse(p.tech_stack || '[]'); } catch (e) { return []; } })(),
            salary: p.salary || '',
            salaryExpected: p.salary || '',
            experience: p.experience || '',
            location: p.location || '',
            availability: p.availability || '',
            category: p.category || '',
            imageUrl: p.image_url || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&h=400&fit=crop',
            role: p.role || 'candidate',
            userType: p.user_type || 'employee'
        }));

        if (profiles.length > 0) {
            // Reemplazar lista principal
            window.mockProfiles = profiles;
            // Re-render filter options y tarjetas
            if (typeof renderCategoryFilter === 'function') renderCategoryFilter();
            if (typeof renderCards === 'function') renderCards();
            if (typeof updateStats === 'function') updateStats();
        }
    } catch (err) {
        console.warn('fetchProfiles error:', err);
    }
}

// Conexión Socket.IO (notificaciones en tiempo real)
(function setupSocket() {
    try {
        if (typeof io === 'function') {
            const socket = io();
            window.socket = socket;

            socket.on('connect', () => {
                console.log('Conectado a Socket.IO:', socket.id);
            });

            socket.on('user_verified', (payload) => {
                console.log('Evento user_verified recibido:', payload);
                // Agregar actividad y refrescar perfiles inmediatamente
                if (payload && payload.user && payload.user.email) {
                    addActivity('Nuevo usuario verificado', payload.user.email + ' ahora está disponible');
                } else {
                    addActivity('Nuevo usuario verificado', 'Un usuario ha sido verificado');
                }
                // Refrescar perfiles
                if (typeof fetchProfiles === 'function') fetchProfiles();
            });

            socket.on('profile_created', (payload) => {
                console.log('Evento profile_created recibido:', payload);
                if (payload && payload.profile && payload.profile.name) {
                    addActivity('Nuevo perfil', payload.profile.name + ' ha sido añadido');
                } else {
                    addActivity('Nuevo perfil', 'Se ha añadido un nuevo perfil');
                }
                if (typeof fetchProfiles === 'function') fetchProfiles();
            });

            socket.on('disconnect', () => {
                console.log('Socket.IO desconectado');
            });
        } else {
            console.warn('Socket.IO client no disponible en esta página.');
        }
    } catch (err) {
        console.warn('Error al inicializar Socket.IO:', err);
    }
})();

function showAuthError(formId, message) {
    const form = document.getElementById(formId);
    if (!form) return;
    
    // Eliminar mensaje anterior si existe
    const existingError = form.querySelector('.auth-error');
    if (existingError) {
        existingError.remove();
    }
    
    // Crear nuevo mensaje de error
    const errorDiv = document.createElement('div');
    errorDiv.className = 'auth-error';
    errorDiv.style.cssText = 'background: #fee; border: 2px solid #e74c3c; color: #c0392b; padding: 1rem; border-radius: 8px; margin-bottom: 1rem; white-space: pre-line;';
    errorDiv.textContent = message;
    
    // Insertar antes del botón
    const submitButton = form.querySelector('button[type="submit"]');
    if (submitButton) {
        form.insertBefore(errorDiv, submitButton);
    } else {
        form.appendChild(errorDiv);
    }
}

function showAuthSuccess(formId, message) {
    const form = document.getElementById(formId);
    if (!form) return;
    
    // Eliminar mensaje anterior si existe
    const existingMessage = form.querySelector('.auth-success');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    // Crear nuevo mensaje de éxito
    const successDiv = document.createElement('div');
    successDiv.className = 'auth-success';
    successDiv.style.cssText = 'background: #d4edda; border: 2px solid #27ae60; color: #155724; padding: 1rem; border-radius: 8px; margin-bottom: 1rem;';
    successDiv.textContent = message;
    
    // Insertar antes del botón
    const submitButton = form.querySelector('button[type="submit"]');
    if (submitButton) {
        form.insertBefore(successDiv, submitButton);
    } else {
        form.appendChild(successDiv);
    }
}

function clearAuthErrors() {
    document.querySelectorAll('.auth-error, .auth-success').forEach(el => el.remove());
}

// --- Modal de verificación y handlers ---
function openVerifyModal(email, message) {
    const modal = document.getElementById('verifyModal');
    const msg = document.getElementById('verifyMessage');
    const input = document.getElementById('verifyCodeInput');
    const feedback = document.getElementById('verifyFeedback');
    const resendBtn = document.getElementById('resendCodeBtn');
    const confirmBtn = document.getElementById('confirmVerifyBtn');

    if (!modal) return;
    if (msg) msg.textContent = message || 'Se ha enviado un código de verificación a tu correo. Ingresa el código a continuación.';
    if (input) input.value = '';
    if (feedback) {
        feedback.textContent = '';
        feedback.style.color = '#333';
    }
    if (resendBtn) resendBtn.disabled = false;
    if (confirmBtn) confirmBtn.disabled = false;

    modal.style.display = 'flex';
    // Save the email we're verifying on the modal element for convenience
    modal.dataset.verificationEmail = email;
}

function closeVerifyModal() {
    const modal = document.getElementById('verifyModal');
    if (!modal) return;
    modal.style.display = 'none';
    delete modal.dataset.verificationEmail;
}

function setVerifyFeedback(text, isError) {
    const feedback = document.getElementById('verifyFeedback');
    if (!feedback) return;
    feedback.style.color = isError ? '#c0392b' : '#27ae60';
    feedback.textContent = text;
}

async function handleConfirmVerify() {
    const modal = document.getElementById('verifyModal');
    if (!modal) return;
    const email = (modal.dataset.verificationEmail || window._pendingVerification && window._pendingVerification.email);
    const code = document.getElementById('verifyCodeInput').value.trim();
    const confirmBtn = document.getElementById('confirmVerifyBtn');

    if (!email) {
        setVerifyFeedback('Email no disponible para verificación', true);
        return;
    }

    if (!/^[0-9]{6}$/.test(code)) {
        setVerifyFeedback('Ingresa un código de 6 dígitos válido', true);
        return;
    }

    if (confirmBtn) confirmBtn.disabled = true;
    setVerifyFeedback('Verificando...', false);

    try {
        const resp = await fetch('/api/auth/verify', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, code })
        });
        const data = await resp.json();
        if (!resp.ok) {
            setVerifyFeedback(data.error || 'Error al verificar el código', true);
            if (confirmBtn) confirmBtn.disabled = false;
            return;
        }

        setVerifyFeedback('Correo verificado correctamente', false);
        // Emitimos actividad y actualizar perfiles
        addActivity('Correo verificado', email + ' ha sido verificado');
        if (typeof fetchProfiles === 'function') fetchProfiles();

        // Intentar auto-login si teníamos credenciales pendientes
        if (window._pendingVerification && window._pendingVerification.email && window._pendingVerification.password) {
            try {
                const loginResp = await fetch('/api/auth/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email: window._pendingVerification.email, password: window._pendingVerification.password })
                });
                const loginData = await loginResp.json();
                if (loginResp.ok) {
                    state.currentUser = {
                        id: loginData.user.id,
                        email: loginData.user.email,
                        name: loginData.user.name,
                        type: loginData.user.type,
                        imageUrl: loginData.user.imageUrl || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&h=400&fit=crop',
                        description: loginData.user.description || '',
                        techStack: []
                    };

                    setTimeout(() => {
                        closeVerifyModal();
                        showMainApp();
                        addActivity('Bienvenido a PlusZone', 'Has iniciado sesión correctamente');
                    }, 700);
                    return;
                } else {
                    // Si no se pudo loguear automáticamente, cerrar modal y dejar al usuario iniciar sesión manualmente
                    setVerifyFeedback('Verificado. Por favor, inicia sesión.', false);
                    setTimeout(() => closeVerifyModal(), 1200);
                    return;
                }
            } catch (loginErr) {
                console.warn('Auto-login falló:', loginErr);
                setTimeout(() => closeVerifyModal(), 800);
                return;
            }
        }

        // Cerrar modal si no hay auto-login
        setTimeout(() => closeVerifyModal(), 900);
    } catch (err) {
        console.error(err);
        setVerifyFeedback('Error de conexión. Intenta más tarde.', true);
        if (confirmBtn) confirmBtn.disabled = false;
    }
}

let _resendCooldown = 0;
async function handleResendCode() {
    const modal = document.getElementById('verifyModal');
    if (!modal) return;
    const email = (modal.dataset.verificationEmail || window._pendingVerification && window._pendingVerification.email);
    const resendBtn = document.getElementById('resendCodeBtn');

    if (!email) {
        setVerifyFeedback('Email no disponible para reenviar', true);
        return;
    }

    if (_resendCooldown > Date.now()) {
        setVerifyFeedback('Por favor espera antes de reenviar el código', true);
        return;
    }

    if (resendBtn) resendBtn.disabled = true;
    setVerifyFeedback('Reenviando código...', false);

    try {
        const resp = await fetch('/api/auth/resend', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email })
        });
        const data = await resp.json();
        if (!resp.ok) {
            setVerifyFeedback(data.error || 'Error al reenviar código', true);
            if (resendBtn) resendBtn.disabled = false;
            return;
        }

        setVerifyFeedback('Código reenviado. Revisa tu correo.', false);
        // Establecer cooldown de 30 segundos para evitar rapid re-sends
        _resendCooldown = Date.now() + 30 * 1000;
        setTimeout(() => {
            if (resendBtn) resendBtn.disabled = false;
        }, 30 * 1000);
    } catch (err) {
        console.error(err);
        setVerifyFeedback('Error de conexión. Intenta más tarde.', true);
        if (resendBtn) resendBtn.disabled = false;
    }
}

// Asegurarse de exponer las funciones globalmente para los botones en el HTML
window.openVerifyModal = openVerifyModal;
window.closeVerifyModal = closeVerifyModal;
window.handleConfirmVerify = handleConfirmVerify;
window.handleResendCode = handleResendCode;

function showMainApp() {
    const app = document.getElementById('app');
    if (!app) {
        console.error('Error: No se encontró el elemento #app');
        return;
    }
    
    // Asegurar que la app esté visible
    app.style.display = 'flex';
    
    // Ocultar authScreen si está visible
    const authScreen = document.getElementById('authScreen');
    if (authScreen) authScreen.style.display = 'none';
    
    // Ocultar loadingScreen si está visible
    const loadingScreen = document.getElementById('loadingScreen');
    if (loadingScreen) loadingScreen.style.display = 'none';
    
    // Configurar navegación según el tipo de usuario
    setupUserNavigation();
    
    // Filtrar perfiles según el tipo de usuario
    filterProfilesByUserType();
    
    // Asegurar que la sección de descubrir esté activa
    setTimeout(() => {
        showSection('discover');

        // Actualizar información
        if (typeof updateUserInfo === 'function') updateUserInfo();
        if (typeof loadProfile === 'function') loadProfile();

        // Obtener perfiles desde la API si está disponible
        if (typeof fetchProfiles === 'function') {
            fetchProfiles().then(() => {
                if (typeof renderCards === 'function') renderCards();
            }).catch(() => {
                if (typeof renderCards === 'function') renderCards();
            });

    
        } else {
            if (typeof renderCards === 'function') renderCards();
        }

        if (typeof updateStats === 'function') updateStats();
        if (typeof renderMatches === 'function') renderMatches();
        if (typeof updateDashboard === 'function') updateDashboard();
        if (typeof renderJobs === 'function') renderJobs();
    }, 100);
}

function setupUserNavigation() {
    if (!state.currentUser) return;
    
    const employeeNav = document.getElementById('employeeNav');
    const companyNav = document.getElementById('companyNav');
    const employeeDashboard = document.getElementById('employeeDashboard');
    const companyDashboard = document.getElementById('companyDashboard');
    const companyFields = document.getElementById('companyFields');
    const employeeFields = document.getElementById('employeeFields');
    
    if (state.currentUser.type === 'company') {
        if (employeeNav) employeeNav.style.display = 'none';
        if (companyNav) companyNav.style.display = 'flex';
        if (employeeDashboard) employeeDashboard.style.display = 'none';
        if (companyDashboard) companyDashboard.style.display = 'block';
        if (companyFields) companyFields.style.display = 'block';
        if (employeeFields) employeeFields.style.display = 'none';
    } else {
        if (employeeNav) employeeNav.style.display = 'flex';
        if (companyNav) companyNav.style.display = 'none';
        if (employeeDashboard) employeeDashboard.style.display = 'block';
        if (companyDashboard) companyDashboard.style.display = 'none';
        if (companyFields) companyFields.style.display = 'none';
        if (employeeFields) employeeFields.style.display = 'block';
    }
}

function handleLogout() {
    state.currentUser = null;
    state.swipedProfiles = [];
    state.matchedProfiles = [];
    state.currentIndex = 0;
    document.getElementById('app').style.display = 'none';
    showAuthScreen();
}

// ===== NAVEGACIÓN =====
function showSection(section) {
    state.currentSection = section;
    
    // Cerrar menú móvil si está abierto
    const sidebar = document.getElementById('leftSidebar');
    const overlay = document.getElementById('sidebarOverlay');
    if (sidebar && sidebar.classList.contains('mobile-open')) {
        sidebar.classList.remove('mobile-open');
        if (overlay) overlay.classList.remove('active');
    }
    
    // Ocultar todas las secciones
    document.querySelectorAll('.section').forEach(s => {
        s.style.display = 'none';
        s.classList.remove('active');
    });
    
    // Mostrar la sección seleccionada
    const targetSection = document.getElementById(section + 'Section');
    if (targetSection) {
        targetSection.style.display = 'block';
        targetSection.classList.add('active');
    }
    
    // Actualizar navegación activa
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
    });
    
    // Marcar el botón activo correspondiente
    const activeButton = document.querySelector(`[onclick="showSection('${section}')"]`);
    if (activeButton) {
        activeButton.classList.add('active');
    }
    
    // Actualizar contenido específico de la sección
    if (section === 'dashboard') {
        updateDashboard();
    } else if (section === 'jobs') {
        renderJobs();
    } else if (section === 'matches') {
        renderMatches();
    } else if (section === 'discover') {
        renderCards();
    }
}

// ===== PERFIL =====
function loadProfile() {
    if (!state.currentUser) return;
    
    const profileImage = document.getElementById('profileImage');
    const profileName = document.getElementById('profileName');
    const profileRole = document.getElementById('profileRole');
    const profileBadge = document.getElementById('profileBadge');
    const editName = document.getElementById('editName');
    const editEmail = document.getElementById('editEmail');
    const editDescription = document.getElementById('editDescription');
    const editTechStack = document.getElementById('editTechStack');
    const editCompanyName = document.getElementById('editCompanyName');
    const editCompanySize = document.getElementById('editCompanySize');
    const editIndustry = document.getElementById('editIndustry');
    const editCompanyLocation = document.getElementById('editCompanyLocation');
    const editCompanyWebsite = document.getElementById('editCompanyWebsite');
    const editExperience = document.getElementById('editExperience');
    const editAvailability = document.getElementById('editAvailability');
    const editPreferredLocation = document.getElementById('editPreferredLocation');
    const editSalaryExpected = document.getElementById('editSalaryExpected');
    
    if (profileImage) profileImage.src = state.currentUser.imageUrl;
    if (profileName) profileName.textContent = state.currentUser.name;
    if (profileRole) profileRole.textContent = state.currentUser.type === 'company' ? 'Empresa' : 'Empleado';
    if (profileBadge) profileBadge.textContent = state.currentUser.type === 'company' ? '🏢 Empresa' : '👤 Empleado';
    if (editName) editName.value = state.currentUser.name;
    if (editEmail) editEmail.value = state.currentUser.email;
    if (editDescription) editDescription.value = state.currentUser.description || '';
    if (editTechStack) editTechStack.value = state.currentUser.techStack?.join(', ') || '';
    
    // Campos de empresa
    if (editCompanyName) editCompanyName.value = state.currentUser.companyName || '';
    if (editCompanySize) editCompanySize.value = state.currentUser.companySize || '';
    if (editIndustry) editIndustry.value = state.currentUser.industry || '';
    if (editCompanyLocation) editCompanyLocation.value = state.currentUser.companyLocation || '';
    if (editCompanyWebsite) editCompanyWebsite.value = state.currentUser.companyWebsite || '';
    
    // Campos de empleado
    if (editExperience) editExperience.value = state.currentUser.experience || '';
    if (editAvailability) editAvailability.value = state.currentUser.availability || '';
    if (editPreferredLocation) editPreferredLocation.value = state.currentUser.preferredLocation || '';
    if (editSalaryExpected) editSalaryExpected.value = state.currentUser.salaryExpected || '';
}

function saveProfile(e) {
    e.preventDefault();
    if (!state.currentUser) return;
    
    state.currentUser.name = document.getElementById('editName').value;
    state.currentUser.email = document.getElementById('editEmail').value;
    state.currentUser.description = document.getElementById('editDescription').value;
    const techStackStr = document.getElementById('editTechStack').value;
    state.currentUser.techStack = techStackStr.split(',').map(t => t.trim()).filter(t => t);
    
    if (state.currentUser.type === 'company') {
        const editCompanyName = document.getElementById('editCompanyName');
        const editCompanySize = document.getElementById('editCompanySize');
        const editIndustry = document.getElementById('editIndustry');
        const editCompanyLocation = document.getElementById('editCompanyLocation');
        const editCompanyWebsite = document.getElementById('editCompanyWebsite');
        
        if (editCompanyName) state.currentUser.companyName = editCompanyName.value;
        if (editCompanySize) state.currentUser.companySize = editCompanySize.value;
        if (editIndustry) state.currentUser.industry = editIndustry.value;
        if (editCompanyLocation) state.currentUser.companyLocation = editCompanyLocation.value;
        if (editCompanyWebsite) state.currentUser.companyWebsite = editCompanyWebsite.value;
    } else {
        const editExperience = document.getElementById('editExperience');
        const editAvailability = document.getElementById('editAvailability');
        const editPreferredLocation = document.getElementById('editPreferredLocation');
        const editSalaryExpected = document.getElementById('editSalaryExpected');
        
        if (editExperience) state.currentUser.experience = editExperience.value;
        if (editAvailability) state.currentUser.availability = editAvailability.value;
        if (editPreferredLocation) state.currentUser.preferredLocation = editPreferredLocation.value;
        if (editSalaryExpected) state.currentUser.salaryExpected = editSalaryExpected.value;
    }
    
    loadProfile();
    updateUserInfo();
    addActivity('Perfil actualizado', 'Tus cambios se han guardado correctamente');
    
    alert('Perfil actualizado exitosamente');
}

function editProfileImage() {
    const newImageUrl = prompt('Ingresa la URL de tu nueva imagen:');
    if (newImageUrl) {
        state.currentUser.imageUrl = newImageUrl;
        loadProfile();
        addActivity('Imagen de perfil actualizada', 'Tu nueva foto se ha guardado');
    }
}

function updateUserInfo() {
    if (!state.currentUser) return;
    
    const userName = document.getElementById('userName');
    const userBadge = document.getElementById('userBadge');
    const feedSubtitle = document.querySelector('.feed-subtitle');
    
    if (userName) userName.textContent = state.currentUser.name;
    if (userBadge) {
        userBadge.textContent = state.currentUser.type === 'company' ? '🏢 Empresa' : '👤 Empleado';
    }
    if (feedSubtitle) {
        feedSubtitle.textContent = state.currentUser.type === 'company' 
            ? 'Encuentra el talento perfecto para tu empresa' 
            : 'Encuentra tu próximo trabajo ideal';
    }
}

// ===== ACTIVIDAD =====
function addActivity(title, message) {
    state.activities.unshift({
        title: title,
        message: message,
        time: new Date().toLocaleTimeString()
    });
    
    const activityList = document.getElementById('activityList');
    if (activityList) {
        const activityHTML = state.activities.slice(0, 5).map(activity => `
            <div class="activity-item">
                <span class="activity-icon">📌</span>
                <div class="activity-text">
                    <strong>${activity.title}</strong>
                    <p>${activity.message}</p>
                </div>
            </div>
        `).join('');
        activityList.innerHTML = activityHTML;
    }
}

// ===== TARJETAS Y SWIPE =====
function createCardHTML(profile, isTop = false) {
    // Determinar si es candidato o oferta
    const isCandidate = profile.role === 'candidate';
    const isJob = profile.role === 'job';
    
    // Información adicional según el tipo
    let additionalInfo = '';
    if (isCandidate) {
        // Información para candidatos (vista de empresas)
        additionalInfo = `
            ${profile.experience ? `<p class="card-info"><strong>Experiencia:</strong> ${profile.experience}</p>` : ''}
            ${profile.location ? `<p class="card-info"><strong>📍 Ubicación:</strong> ${profile.location}</p>` : ''}
            ${profile.availability ? `<p class="card-info"><strong>Disponibilidad:</strong> ${profile.availability}</p>` : ''}
        `;
    } else if (isJob) {
        // Información para ofertas (vista de empleados)
        additionalInfo = `
            ${profile.companyName ? `<p class="card-info"><strong>🏢 Empresa:</strong> ${profile.companyName}</p>` : ''}
            ${profile.location ? `<p class="card-info"><strong>📍 Ubicación:</strong> ${profile.location}</p>` : ''}
            ${profile.industry ? `<p class="card-info"><strong>Industria:</strong> ${profile.industry}</p>` : ''}
        `;
    }
    
    return `
        <div class="professional-card ${isTop ? 'card-top' : ''}" data-id="${profile.id}" data-profile-id="${profile.id}" ${isTop ? 'draggable="true"' : ''}>
            <div class="card-front">
                <div class="card-image-container">
                    <img src="${profile.imageUrl}" alt="${profile.name}" class="card-image" loading="lazy">
                    <div class="card-overlay">
                        <div class="card-badge">
                            ${isCandidate ? '👤 Candidato' : '💼 Oferta de Trabajo'}
                        </div>
                    </div>
                </div>
                <div class="card-content">
                    <h2 class="card-name">${profile.name}</h2>
                    <p class="card-description">${profile.description}</p>
                    ${profile.salary ? `<p class="card-salary">💰 ${profile.salary}</p>` : ''}
                    ${additionalInfo}
                    <div class="card-tags">
                        ${profile.techStack.slice(0, 4).map(tech => `<span class="tag">${tech}</span>`).join('')}
                    </div>
                    ${isTop ? `
                        <button class="card-expand-btn" onclick="event.stopPropagation(); toggleCardDetails('${profile.id}')" aria-label="Ver más detalles">
                            <span class="expand-icon" id="icon-${profile.id}">▼</span>
                            <span class="expand-text" id="text-${profile.id}">Ver más detalles</span>
                        </button>
                    ` : ''}
                </div>
            </div>
            <div class="swipe-stamp interested" style="display: none;">INTERESADO</div>
            <div class="swipe-stamp pass" style="display: none;">PASAR</div>
        </div>
    `;
}

function createDetailsPanel(profile) {
    const isCandidate = profile.role === 'candidate';
    const isJob = profile.role === 'job';
    
    return `
        <div class="card-details-panel" id="details-${profile.id}" style="display: none;">
            <div class="card-details-content">
                <h3 class="card-details-title">${isCandidate ? 'Acerca del Candidato' : 'Detalles de la Oferta'}</h3>
                <p class="card-details-description">${profile.detailedDescription}</p>
                ${isCandidate ? `
                    <div class="card-details-info">
                        ${profile.experience ? `<p><strong>Experiencia:</strong> ${profile.experience}</p>` : ''}
                        ${profile.location ? `<p><strong>📍 Ubicación:</strong> ${profile.location}</p>` : ''}
                        ${profile.availability ? `<p><strong>Disponibilidad:</strong> ${profile.availability}</p>` : ''}
                        ${profile.salaryExpected ? `<p><strong>Salario esperado:</strong> ${profile.salaryExpected}</p>` : ''}
                        ${profile.category ? `<p><strong>Categoría:</strong> ${profile.category}</p>` : ''}
                    </div>
                ` : ''}
                ${isJob ? `
                    <div class="card-details-info">
                        ${profile.companyName ? `<p><strong>🏢 Empresa:</strong> ${profile.companyName}</p>` : ''}
                        ${profile.location ? `<p><strong>📍 Ubicación:</strong> ${profile.location}</p>` : ''}
                        ${profile.industry ? `<p><strong>Industria:</strong> ${profile.industry}</p>` : ''}
                        ${profile.companySize ? `<p><strong>Tamaño de empresa:</strong> ${profile.companySize}</p>` : ''}
                        ${profile.category ? `<p><strong>Categoría:</strong> ${profile.category}</p>` : ''}
                    </div>
                ` : ''}
                <div class="card-details-tech">
                    <h4 class="tech-stack-title">${isCandidate ? 'Stack Tecnológico:' : 'Tecnologías Requeridas:'}</h4>
                    <div class="tech-stack-list">
                        ${profile.techStack.map(tech => `<span class="tag">${tech}</span>`).join('')}
                    </div>
                </div>
                <button class="card-close-btn" onclick="toggleCardDetails('${profile.id}')">Cerrar</button>
            </div>
        </div>
    `;
}

function toggleCardDetails(profileId) {
    if (event) event.stopPropagation();
    
    const detailsPanel = document.getElementById(`details-${profileId}`);
    const expandIcon = document.getElementById(`icon-${profileId}`);
    const expandText = document.getElementById(`text-${profileId}`);
    
    if (!detailsPanel) {
        console.error('Panel no encontrado para:', profileId);
        return;
    }
    
    const isVisible = detailsPanel.classList.contains('show');
    
    if (isVisible) {
        // Ocultar panel
        detailsPanel.classList.remove('show');
        detailsPanel.style.display = 'none';
        if (expandIcon) expandIcon.textContent = '▼';
        if (expandText) expandText.textContent = 'Ver más detalles';
    } else {
        // Ocultar otros paneles abiertos primero
        document.querySelectorAll('.card-details-panel').forEach(panel => {
            if (panel.id !== `details-${profileId}`) {
                panel.classList.remove('show');
                panel.style.display = 'none';
                const otherId = panel.id.replace('details-', '');
                const otherIcon = document.getElementById(`icon-${otherId}`);
                const otherText = document.getElementById(`text-${otherId}`);
                if (otherIcon) otherIcon.textContent = '▼';
                if (otherText) otherText.textContent = 'Ver más detalles';
            }
        });
        
        // Mostrar panel
        detailsPanel.classList.add('show');
        detailsPanel.style.display = 'block';
        if (expandIcon) expandIcon.textContent = '▲';
        if (expandText) expandText.textContent = 'Ocultar detalles';
        
        // Scroll suave al panel
        setTimeout(() => {
            detailsPanel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }, 100);
    }
}

function renderCategoryFilter() {
    const categorySelect = document.getElementById('categorySelect');
    if (!categorySelect) return;
    
    const categories = getAvailableCategories();
    
    categorySelect.innerHTML = categories.map(category => `
        <option value="${category}" ${state.selectedCategory === category ? 'selected' : ''}>
            ${category}
        </option>
    `).join('');
}

function filterByCategory(category) {
    state.selectedCategory = category;
    state.currentIndex = 0;
    state.swipedProfiles = [];
    renderCategoryFilter();
    renderCards();
}

function renderCards() {
    // Filtrar perfiles según el tipo de usuario y categoría
    filterProfilesByUserType();
    
    // Renderizar filtro de categorías
    renderCategoryFilter();
    
    const cardsStack = document.getElementById('cardsStack');
    const emptyState = document.getElementById('emptyState');
    
    if (!state.profiles || state.profiles.length === 0) {
        if (cardsStack) cardsStack.innerHTML = '';
        if (emptyState) {
            emptyState.innerHTML = `
                <h2>¡No hay perfiles disponibles!</h2>
                <p>${state.currentUser?.type === 'company' 
                    ? 'No hay candidatos disponibles en este momento. Vuelve más tarde.' 
                    : 'No hay ofertas de trabajo disponibles en este momento. Vuelve más tarde.'}</p>
            `;
            emptyState.style.display = 'block';
        }
        return;
    }
    
    if (state.currentIndex >= state.profiles.length) {
        if (cardsStack) cardsStack.innerHTML = '';
        if (emptyState) {
            emptyState.innerHTML = `
                <h2>¡No hay más perfiles disponibles!</h2>
                <p>${state.currentUser?.type === 'company' 
                    ? 'Has visto todos los candidatos disponibles. Vuelve más tarde para ver nuevos perfiles.' 
                    : 'Has visto todas las ofertas disponibles. Vuelve más tarde para ver nuevas oportunidades.'}</p>
            `;
            emptyState.style.display = 'block';
        }
        return;
    }
    
    if (emptyState) emptyState.style.display = 'none';
    
    const currentProfile = state.profiles[state.currentIndex];
    const nextProfile = state.profiles[state.currentIndex + 1];
    
    let cardsHtml = '';
    let detailsHtml = '';
    
    if (currentProfile) {
        cardsHtml += createCardHTML(currentProfile, true);
        detailsHtml += createDetailsPanel(currentProfile);
    }
    if (nextProfile) {
        cardsHtml += createCardHTML(nextProfile, false);
        detailsHtml += createDetailsPanel(nextProfile);
    }
    
    if (cardsStack) {
        cardsStack.innerHTML = cardsHtml;
    }
    
    // Agregar paneles de detalles en contenedor separado
    const detailsContainer = document.getElementById('cardDetailsContainer');
    if (detailsContainer) {
        detailsContainer.innerHTML = detailsHtml;
    }
    
    if (currentProfile) {
        const card = cardsStack?.querySelector('.card-top');
        if (card) {
            setupCardListeners(card);
        }
    }
    
    updateStats();
}

function setupCardListeners(card) {
    let isDragging = false;
    let startX = 0, startY = 0;
    let currentX = 0, currentY = 0;
    
    // Mouse events (eliminado el flip de tarjeta - ahora usamos botón desplegable)
    card.addEventListener('mousedown', (e) => {
        // No iniciar drag si se hace click en el botón desplegable
        if (e.target.closest('.card-expand-btn') || e.target.closest('.card-close-btn')) return;
        isDragging = true;
        startX = e.clientX;
        startY = e.clientY;
        card.classList.add('dragging');
        const stamps = card.querySelectorAll('.swipe-stamp');
        stamps.forEach(stamp => stamp.style.display = 'block');
    });
    
    card.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        currentX = e.clientX - startX;
        currentY = e.clientY - startY;
        const rotation = currentX * 0.1;
        card.style.transform = `translate(${currentX}px, ${currentY}px) rotate(${rotation}deg)`;
        
        const interestedStamp = card.querySelector('.swipe-stamp.interested');
        const passStamp = card.querySelector('.swipe-stamp.pass');
        
        if (Math.abs(currentX) > 50) {
            if (currentX > 0) {
                interestedStamp?.classList.add('visible');
                passStamp?.classList.remove('visible');
            } else {
                passStamp?.classList.add('visible');
                interestedStamp?.classList.remove('visible');
            }
        } else {
            interestedStamp?.classList.remove('visible');
            passStamp?.classList.remove('visible');
        }
    });
    
    document.addEventListener('mouseup', () => {
        if (!isDragging) return;
        isDragging = false;
        
        const threshold = 100;
        if (Math.abs(currentX) > threshold) {
            const direction = currentX > 0 ? 'right' : 'left';
            handleSwipe(direction);
        } else {
            card.style.transform = '';
            card.classList.remove('dragging');
            const stamps = card.querySelectorAll('.swipe-stamp');
            stamps.forEach(stamp => {
                stamp.classList.remove('visible');
                stamp.style.display = 'none';
            });
        }
        currentX = 0;
        currentY = 0;
    });
    
    // Touch events
    card.addEventListener('touchstart', (e) => {
        // No iniciar drag si se hace touch en el botón desplegable
        if (e.target.closest('.card-expand-btn') || e.target.closest('.card-close-btn')) return;
        isDragging = true;
        const touch = e.touches[0];
        startX = touch.clientX;
        startY = touch.clientY;
        card.classList.add('dragging');
        const stamps = card.querySelectorAll('.swipe-stamp');
        stamps.forEach(stamp => stamp.style.display = 'block');
    });
    
    card.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        e.preventDefault();
        const touch = e.touches[0];
        currentX = touch.clientX - startX;
        currentY = touch.clientY - startY;
        const rotation = currentX * 0.1;
        card.style.transform = `translate(${currentX}px, ${currentY}px) rotate(${rotation}deg)`;
        
        const interestedStamp = card.querySelector('.swipe-stamp.interested');
        const passStamp = card.querySelector('.swipe-stamp.pass');
        
        if (Math.abs(currentX) > 50) {
            if (currentX > 0) {
                interestedStamp?.classList.add('visible');
                passStamp?.classList.remove('visible');
            } else {
                passStamp?.classList.add('visible');
                interestedStamp?.classList.remove('visible');
            }
        } else {
            interestedStamp?.classList.remove('visible');
            passStamp?.classList.remove('visible');
        }
    });
    
    card.addEventListener('touchend', () => {
        if (!isDragging) return;
        isDragging = false;
        
        const threshold = 100;
        if (Math.abs(currentX) > threshold) {
            const direction = currentX > 0 ? 'right' : 'left';
            handleSwipe(direction);
        } else {
            card.style.transform = '';
            card.classList.remove('dragging');
            const stamps = card.querySelectorAll('.swipe-stamp');
            stamps.forEach(stamp => {
                stamp.classList.remove('visible');
                stamp.style.display = 'none';
            });
        }
        currentX = 0;
        currentY = 0;
    });
}

function handleSwipe(direction) {
    if (state.currentIndex >= state.profiles.length) return;
    
    const currentProfile = state.profiles[state.currentIndex];
    state.swipedProfiles.push(currentProfile.id);
    
    if (direction === 'right') {
        if (Math.random() > 0.7) {
            state.matchedProfiles.push(currentProfile.id);
            setTimeout(() => {
                showMatchOverlay(currentProfile);
            }, 500);
        }
        addActivity('Interesado en ' + currentProfile.name, 'Has mostrado interés');
    } else {
        addActivity('Pasaste a ' + currentProfile.name, 'Continuemos buscando');
    }
    
    state.currentIndex++;
    
    const card = document.querySelector('.card-top');
    if (card) {
        const exitX = direction === 'right' ? 1000 : -1000;
        card.style.transform = `translate(${exitX}px, 0) rotate(${direction === 'right' ? 45 : -45}deg)`;
        card.style.opacity = '0';
        card.style.transition = 'all 0.5s ease-in-out';
        
        setTimeout(() => {
            renderCards();
            renderMatches();
        }, 500);
    } else {
        renderCards();
        renderMatches();
    }
    
    updateStats();
}

function flipCardBack(e) {
    e.stopPropagation();
    const card = e.target.closest('.professional-card');
    if (card) {
        card.classList.remove('flipped');
    }
}

// ===== MATCHES =====
function renderMatches() {
    const matchesGrid = document.getElementById('matchesGrid');
    if (!matchesGrid) return;
    
    const matches = state.profiles.filter(p => state.matchedProfiles.includes(p.id));
    
    if (matches.length === 0) {
        matchesGrid.innerHTML = '<p class="empty-message">Aún no tienes matches. ¡Sigue deslizando!</p>';
        return;
    }
    
    matchesGrid.innerHTML = matches.map(profile => `
        <div class="match-card" data-profile-id="${profile.id}">
            <div class="match-card-main">
                <div class="match-card-image-container">
                    <img src="${profile.imageUrl}" alt="${profile.name}">
                    <div class="match-badge">💚 Match</div>
                </div>
                <div class="match-card-content">
                    <h3>${profile.name}</h3>
                    <p>${profile.description}</p>
                    <div class="card-tags">
                        ${profile.techStack.slice(0, 3).map(tech => `<span class="tag">${tech}</span>`).join('')}
                    </div>
                    <div class="match-card-actions">
                        <button class="message-button" onclick="openChat('${profile.id}')" title="Enviar mensaje">
                            <span class="message-icon">💬</span>
                            <span class="message-text">Mensaje</span>
                        </button>
                        <button class="view-profile-button" onclick="viewMatchProfile('${profile.id}')" title="Ver detalles">
                            <span class="view-icon" id="view-icon-${profile.id}">▼</span>
                            <span class="view-text">Ver Detalles</span>
                        </button>
                    </div>
                </div>
            </div>
            <!-- Panel de información lateral (escritorio) / debajo (móvil) -->
            <div class="match-profile-details" id="match-details-${profile.id}" style="display: none;">
                ${createMatchDetailsHTML(profile)}
            </div>
        </div>
    `).join('');
}

function createMatchDetailsHTML(profile) {
    const isCandidate = profile.role === 'candidate';
    const isJob = profile.role === 'job';
    
    return `
        <div class="match-details-content">
            <h3 class="match-details-title">${isCandidate ? 'Información del Candidato' : 'Detalles de la Oferta'}</h3>
            <p class="match-details-description">${profile.detailedDescription}</p>
            ${isCandidate ? `
                <div class="match-details-info">
                    ${profile.experience ? `<div class="detail-item"><strong>Experiencia:</strong> ${profile.experience}</div>` : ''}
                    ${profile.location ? `<div class="detail-item"><strong>📍 Ubicación:</strong> ${profile.location}</div>` : ''}
                    ${profile.availability ? `<div class="detail-item"><strong>Disponibilidad:</strong> ${profile.availability}</div>` : ''}
                    ${profile.salaryExpected ? `<div class="detail-item"><strong>Salario esperado:</strong> ${profile.salaryExpected}</div>` : ''}
                    ${profile.category ? `<div class="detail-item"><strong>Categoría:</strong> ${profile.category}</div>` : ''}
                </div>
            ` : ''}
            ${isJob ? `
                <div class="match-details-info">
                    ${profile.companyName ? `<div class="detail-item"><strong>🏢 Empresa:</strong> ${profile.companyName}</div>` : ''}
                    ${profile.location ? `<div class="detail-item"><strong>📍 Ubicación:</strong> ${profile.location}</div>` : ''}
                    ${profile.industry ? `<div class="detail-item"><strong>Industria:</strong> ${profile.industry}</div>` : ''}
                    ${profile.companySize ? `<div class="detail-item"><strong>Tamaño de empresa:</strong> ${profile.companySize}</div>` : ''}
                    ${profile.category ? `<div class="detail-item"><strong>Categoría:</strong> ${profile.category}</div>` : ''}
                </div>
            ` : ''}
            <div class="match-details-tech">
                <h4 class="tech-stack-title">${isCandidate ? 'Stack Tecnológico:' : 'Tecnologías Requeridas:'}</h4>
                <div class="tech-stack-list">
                    ${profile.techStack.map(tech => `<span class="tag">${tech}</span>`).join('')}
                </div>
            </div>
        </div>
    `;
}

function openChat(profileId) {
    showSection('messages');
    addActivity('Chat iniciado', 'Has abierto una conversación');
    // Aquí se podría implementar la lógica para abrir el chat específico
}

function viewMatchProfile(profileId) {
    if (event) event.stopPropagation();
    
    const detailsPanel = document.getElementById(`match-details-${profileId}`);
    const viewIcon = document.getElementById(`view-icon-${profileId}`);
    const matchCard = document.querySelector(`[data-profile-id="${profileId}"]`);
    
    if (!detailsPanel) {
        console.error('Panel de detalles no encontrado para:', profileId);
        return;
    }
    
    const isVisible = detailsPanel.style.display === 'block' || detailsPanel.style.display === '';
    
    if (isVisible) {
        // Ocultar panel
        detailsPanel.style.display = 'none';
        if (matchCard) matchCard.classList.remove('details-expanded');
        if (viewIcon) {
            viewIcon.textContent = '▼';
            viewIcon.style.transform = 'rotate(0deg)';
        }
    } else {
        // Ocultar otros paneles abiertos primero
        document.querySelectorAll('.match-profile-details').forEach(panel => {
            if (panel.id !== `match-details-${profileId}`) {
                panel.style.display = 'none';
                const otherId = panel.id.replace('match-details-', '');
                const otherCard = document.querySelector(`[data-profile-id="${otherId}"]`);
                const otherIcon = document.getElementById(`view-icon-${otherId}`);
                if (otherCard) otherCard.classList.remove('details-expanded');
                if (otherIcon) {
                    otherIcon.textContent = '▼';
                    otherIcon.style.transform = 'rotate(0deg)';
                }
            }
        });
        
        // Mostrar panel
        detailsPanel.style.display = 'block';
        if (matchCard) matchCard.classList.add('details-expanded');
        if (viewIcon) {
            viewIcon.textContent = '▲';
            viewIcon.style.transform = 'rotate(0deg)';
        }
    }
}

function showMatchOverlay(profile) {
    const overlay = document.getElementById('matchOverlay');
    const subtitle = document.getElementById('matchSubtitle');
    const profileDiv = document.getElementById('matchProfile');
    
    if (subtitle) subtitle.textContent = `Has hecho match con ${profile.name}`;
    if (profileDiv) {
        profileDiv.innerHTML = `
            <img src="${profile.imageUrl}" alt="${profile.name}" class="match-image">
            <div class="match-info">
                <h2 class="match-name">${profile.name}</h2>
                <p class="match-description">${profile.description}</p>
            </div>
        `;
    }
    
    if (overlay) overlay.style.display = 'flex';
}

function updateStats() {
    const swipedCount = document.getElementById('swipedCount');
    const matchesCount = document.getElementById('matchesCount');
    const availableCount = document.getElementById('availableCount');
    
    if (swipedCount) swipedCount.textContent = state.swipedProfiles.length;
    if (matchesCount) matchesCount.textContent = state.matchedProfiles.length;
    if (availableCount) availableCount.textContent = state.profiles.length - state.currentIndex;
}

// ===== DASHBOARD =====
function updateDashboard() {
    if (!state.currentUser) return;
    
    if (state.currentUser.type === 'company') {
        updateCompanyDashboard();
    } else {
        updateEmployeeDashboard();
    }
}

function updateEmployeeDashboard() {
    const profileCompletion = document.getElementById('profileCompletion');
    const totalMatches = document.getElementById('totalMatches');
    const profilesViewed = document.getElementById('profilesViewed');
    
    // Calcular completitud del perfil
    let completion = 0;
    if (state.currentUser.name) completion += 20;
    if (state.currentUser.description) completion += 20;
    if (state.currentUser.techStack && state.currentUser.techStack.length > 0) completion += 20;
    if (state.currentUser.imageUrl) completion += 20;
    if (state.currentUser.email) completion += 20;
    
    if (profileCompletion) profileCompletion.textContent = completion + '%';
    if (totalMatches) totalMatches.textContent = state.matchedProfiles.length;
    if (profilesViewed) profilesViewed.textContent = state.swipedProfiles.length;
}

function updateCompanyDashboard() {
    const activeJobs = document.getElementById('activeJobs');
    const candidatesViewed = document.getElementById('candidatesViewed');
    const companyMatches = document.getElementById('companyMatches');
    
    if (activeJobs) activeJobs.textContent = (state.companyJobs || []).length;
    if (candidatesViewed) candidatesViewed.textContent = state.swipedProfiles.length;
    if (companyMatches) companyMatches.textContent = state.matchedProfiles.length;
}

// ===== JOBS (Para Empresas) =====
function renderJobs() {
    if (!state.currentUser || state.currentUser.type !== 'company') return;
    
    const jobsGrid = document.getElementById('jobsGrid');
    if (!jobsGrid) return;
    
    const jobs = state.companyJobs || [];
    
    if (jobs.length === 0) {
        jobsGrid.innerHTML = `
            <div class="empty-message" style="grid-column: 1 / -1;">
                <h3>No tienes ofertas de trabajo aún</h3>
                <p>Crea tu primera oferta para comenzar a encontrar candidatos</p>
                <button class="primary-button" onclick="showCreateJobModal()" style="margin-top: 1rem;">Crear Primera Oferta</button>
            </div>
        `;
        return;
    }
    
    jobsGrid.innerHTML = jobs.map(job => `
        <div class="job-card">
            <div class="job-card-header">
                <div>
                    <h3 class="job-card-title">${job.title}</h3>
                    <p class="job-card-description">${job.description.substring(0, 100)}...</p>
                </div>
                <span class="job-status ${job.active ? 'active' : 'inactive'}">${job.active ? 'Activa' : 'Inactiva'}</span>
            </div>
            <div class="card-tags">
                ${job.techStack.map(tech => `<span class="tag">${tech}</span>`).join('')}
            </div>
            <div class="job-card-footer">
                <span class="job-salary">💰 ${job.salary}</span>
                <span style="color: var(--medium-gray); font-size: 0.875rem;">📍 ${job.location === 'remote' ? 'Remoto' : job.location === 'hybrid' ? 'Híbrido' : 'Presencial'}</span>
            </div>
        </div>
    `).join('');
}

function showCreateJobModal() {
    const modal = document.getElementById('createJobModal');
    if (modal) modal.style.display = 'flex';
}

function closeCreateJobModal() {
    const modal = document.getElementById('createJobModal');
    if (modal) modal.style.display = 'none';
    // Limpiar formulario
    const form = document.getElementById('createJobForm');
    if (form) form.reset();
}

function handleCreateJob(e) {
    e.preventDefault();
    if (!state.currentUser || state.currentUser.type !== 'company') return;
    
    const title = document.getElementById('jobTitle').value;
    const description = document.getElementById('jobDescription').value;
    const salary = document.getElementById('jobSalary').value;
    const location = document.getElementById('jobLocation').value;
    const techStackStr = document.getElementById('jobTechStack').value;
    const techStack = techStackStr.split(',').map(t => t.trim()).filter(t => t);
    
    if (!state.companyJobs) {
        state.companyJobs = [];
    }
    
    const locationText = location === 'remote' ? 'Remoto' : location === 'hybrid' ? 'Híbrido' : 'Presencial';
    
    const newJob = {
        id: 'job-' + Date.now(),
        title: title,
        description: description,
        salary: salary,
        location: locationText,
        techStack: techStack,
        active: true,
        createdAt: new Date().toISOString()
    };
    
    state.companyJobs.push(newJob);
    
    // Agregar a todos los perfiles disponibles (para que aparezca en la lista de ofertas)
    const newJobProfile = {
        id: newJob.id,
        name: title,
        description: `${locationText} - ${state.currentUser.companyName || 'Empresa'}`,
        detailedDescription: description,
        techStack: techStack,
        salary: salary,
        location: locationText,
        companyName: state.currentUser.companyName || 'Mi Empresa',
        companySize: state.currentUser.companySize || '11-50 empleados',
        industry: state.currentUser.industry || 'Tecnología',
        category: state.currentUser.industry === 'Salud' ? 'Médicos' : 
                 (state.currentUser.industry === 'Manufactura' || state.currentUser.industry === 'Industrial') ? 'Industrial' : 
                 'Informática',
        imageUrl: state.currentUser.imageUrl || 'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=400&h=400&fit=crop',
        role: 'job',
        userType: 'company',
        companyId: state.currentUser.id
    };
    
    state.allProfiles.push(newJobProfile);
    
    // Si el usuario actual es empleado, actualizar la lista de perfiles filtrados
    if (state.currentUser.type === 'employee') {
        filterProfilesByUserType();
    }
    
    closeCreateJobModal();
    renderJobs();
    addActivity('Nueva oferta creada', `Has creado la oferta: ${title}`);
    
    alert('Oferta de trabajo creada exitosamente');
}

// ===== INICIALIZACIÓN =====
document.addEventListener('DOMContentLoaded', () => {
    // Asegurar que Database esté inicializado
    if (typeof Database !== 'undefined' && Database) {
        Database.init();
    }
    
    initLoadingScreen();
    
    // Botones de acción
    const passButton = document.getElementById('passButton');
    const interestedButton = document.getElementById('interestedButton');
    const closeMatchButton = document.getElementById('closeMatchButton');
    
    if (passButton) passButton.addEventListener('click', () => handleSwipe('left'));
    if (interestedButton) interestedButton.addEventListener('click', () => handleSwipe('right'));
    if (closeMatchButton) {
        closeMatchButton.addEventListener('click', () => {
            const overlay = document.getElementById('matchOverlay');
            if (overlay) overlay.style.display = 'none';
        });
    }
});

// Funciones globales para HTML
window.switchAuthTab = switchAuthTab;
window.handleLogin = handleLogin;
window.handleRegister = handleRegister;
window.showSection = showSection;
window.handleLogout = handleLogout;
window.editProfileImage = editProfileImage;
window.saveProfile = saveProfile;
window.flipCardBack = flipCardBack;
window.clearAuthErrors = clearAuthErrors;
window.showCreateJobModal = showCreateJobModal;
window.closeCreateJobModal = closeCreateJobModal;
window.handleCreateJob = handleCreateJob;
window.openChat = openChat;
window.viewMatchProfile = viewMatchProfile;
window.toggleCardDetails = toggleCardDetails;
window.filterByCategory = filterByCategory;

// ===== MENÚ MÓVIL =====
function toggleMobileMenu() {
    const sidebar = document.getElementById('leftSidebar');
    const overlay = document.getElementById('sidebarOverlay');
    
    if (sidebar && overlay) {
        sidebar.classList.toggle('mobile-open');
        overlay.classList.toggle('active');
    }
}

window.toggleMobileMenu = toggleMobileMenu;
