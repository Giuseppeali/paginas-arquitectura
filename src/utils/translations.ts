export type Language = 'en' | 'es';

export const translations = {
    en: {
        nav: {
            studio: 'Studio',
            projects: 'Projects',
            contact: 'Contact',
            admin: 'Admin'
        },
        home: {
            hero: {
                line1: 'Designing',
                line2: 'The Future',
                line3: 'Of Space',
                btn: 'View Projects'
            },
            about: {
                subtitle: 'The Studio',
                description: 'is a contemporary architecture studio focused on creating spaces that dialogue with their surroundings. We seek geometric purity, material honesty, and light as fundamental elements of our design.',
                stats: {
                    years: 'Years of experience',
                    projects: 'Completed projects'
                }
            },
            projects: {
                title: 'Selected\nWorks',
                viewAll: 'View all'
            }
        },
        projects: {
            title: 'Our Projects',
            subtitle: 'A selection of our latest architectural works, ranging from residential to commercial spaces.',
            all: 'All',
            residential: 'Residential',
            commercial: 'Commercial',
            cultural: 'Cultural',
            viewProject: 'View Project'
        },
        projectDetails: {
            back: 'Back to projects',
            client: 'Client',
            location: 'Location',
            year: 'Year',
            area: 'Area',
            status: 'Status',
            about: 'About the project'
        },
        contact: {
            title: 'Get in Touch',
            subtitle: "Do you have a project in mind? We'd love to hear from you.",
            offices: 'Our Offices',
            form: {
                name: 'Name',
                email: 'Email',
                message: 'Message',
                send: 'Send Message'
            }
        },
        footer: {
            social: 'Social',
            contact: 'Contact Us',
            rights: 'All rights reserved.'
        },
        generator: {
            title: 'Link Generator',
            editTitle: 'Edit Link',
            editMode: 'Edit Mode',
            description: "Create a custom shareable link to present the portfolio with a client's branding.",
            editDescription: "Update the details for this generated portfolio link.",
            name: 'Client Name',
            slug: 'Custom URL Slug',
            slugHint: 'This will create a link like: yourwebsite.com/',
            slugEditHint: 'The slug cannot be changed to prevent breaking existing links.',
            logo: 'Company Logo URL',
            logoScale: 'Logo Display Scale',
            preview: 'Preview',
            invertLogo: 'Invert Logo Color (for dark backgrounds)',
            email: 'Client Email (Optional)',
            language: 'Display Language',
            btnGenerate: 'Generate Short Link',
            btnUpdate: 'Update Link Content',
            generating: 'Generating...',
            updating: 'Updating...',
            successGenerate: 'Generated Link',
            successUpdate: 'Update Successful',
            copy: 'Copy',
            copied: 'Copied!',
            logoUpload: 'Upload File',
            logoRemoveMargins: 'Remove Invisible Margins'
        },
        admin: {
            title: 'Dashboard',
            subtitle: 'Manage your generated portfolio links.',
            newLink: 'New Link',
            signOut: 'Sign Out',
            empty: 'No client links generated yet.',
            createFirst: 'Create your first link',
            colName: 'Client Name',
            colSlug: 'Slug',
            colLanguage: 'Language',
            colCreated: 'Created',
            colActions: 'Actions',
            deleteConfirm: 'Are you sure you want to delete the link for'
        }
    },
    es: {
        nav: {
            studio: 'Estudio',
            projects: 'Proyectos',
            contact: 'Contacto',
            admin: 'Panel'
        },
        home: {
            hero: {
                line1: 'Diseñando',
                line2: 'El Futuro',
                line3: 'Del Espacio',
                btn: 'Ver Proyectos'
            },
            about: {
                subtitle: 'El Estudio',
                description: 'es un estudio de arquitectura contemporánea enfocado en crear espacios que dialogan con su entorno. Buscamos la pureza geométrica, la honestidad de los materiales y la luz como elementos fundamentales de nuestro diseño.',
                stats: {
                    years: 'Años de experiencia',
                    projects: 'Proyectos completados'
                }
            },
            projects: {
                title: 'Obras\nSelectas',
                viewAll: 'Ver todos'
            }
        },
        projects: {
            title: 'Nuestros Proyectos',
            subtitle: 'Una selección de nuestras obras arquitectónicas más recientes, desde espacios residenciales hasta comerciales.',
            all: 'Todos',
            residential: 'Residencial',
            commercial: 'Comercial',
            cultural: 'Cultural',
            viewProject: 'Ver Proyecto'
        },
        projectDetails: {
            back: 'Volver a proyectos',
            client: 'Cliente',
            location: 'Ubicación',
            year: 'Año',
            area: 'Área',
            status: 'Estado',
            about: 'Sobre el proyecto'
        },
        contact: {
            title: 'Ponte en Contacto',
            subtitle: "¿Tienes un proyecto en mente? Nos encantaría escucharte.",
            offices: 'Nuestras Oficinas',
            form: {
                name: 'Nombre',
                email: 'Correo',
                message: 'Mensaje',
                send: 'Enviar Mensaje'
            }
        },
        footer: {
            social: 'Redes Sociales',
            contact: 'Contáctanos',
            rights: 'Todos los derechos reservados.'
        },
        generator: {
            title: 'Generador de Enlaces',
            editTitle: 'Editar Enlace',
            editMode: 'Modo Edición',
            description: "Crea un enlace personalizado para presentar el portafolio con la marca de tu cliente.",
            editDescription: "Actualiza los detalles de este enlace de portafolio generado.",
            name: 'Nombre del Cliente',
            slug: 'URL Personalizada (Slug)',
            slugHint: 'Esto creará un enlace como: tuweb.com/',
            slugEditHint: 'La URL no se puede cambiar para evitar romper enlaces existentes.',
            logo: 'URL del Logo de la Empresa',
            logoScale: 'Escala Visual del Logo',
            preview: 'Vista Previa',
            invertLogo: 'Invertir Color del Logo (para fondos oscuros)',
            email: 'Correo del Cliente (Opcional)',
            language: 'Idioma de Visualización',
            btnGenerate: 'Generar Enlace Corto',
            btnUpdate: 'Actualizar Contenido del Enlace',
            generating: 'Generando...',
            updating: 'Actualizando...',
            successGenerate: 'Enlace Generado',
            successUpdate: 'Actualización Exitosa',
            copy: 'Copiar',
            copied: '¡Copiado!',
            logoUpload: 'Subir Archivo',
            logoRemoveMargins: 'Quitar Márgenes Invisibles'
        },
        admin: {
            title: 'Panel de Control',
            subtitle: 'Administra tus enlaces de portafolio generados.',
            newLink: 'Nuevo Enlace',
            signOut: 'Cerrar Sesión',
            empty: 'Aún no se han generado enlaces de clientes.',
            createFirst: 'Crea tu primer enlace',
            colName: 'Nombre del Cliente',
            colSlug: 'Enlace',
            colLanguage: 'Idioma',
            colCreated: 'Creado',
            colActions: 'Acciones',
            deleteConfirm: '¿Estás seguro de que deseas eliminar el enlace para'
        }
    }
};

export function useTranslation(lang: Language) {
    const t = translations[lang] || translations.es;
    return { t, lang };
}
