export interface Project {
    id: number;
    title: { en: string; es: string };
    location: { en: string; es: string };
    year: string;
    image: string;
    description: { en: string; es: string };
    details: {
        area: string;
        typology: { en: string; es: string };
        status: { en: string; es: string };
    };
}

export const projects: Project[] = [
    {
        id: 1,
        title: { en: "CASA LUZ", es: "CASA LUZ" },
        location: { en: "MEXICO CITY, MEXICO", es: "CIUDAD DE MÉXICO, MÉXICO" },
        year: "2024",
        image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
        description: {
            en: "A single-family home designed to maximize natural light entry. The design revolves around a central courtyard acting as a green lung and distributor of interior spaces, blurring the boundaries between inside and outside through large floor-to-ceiling windows.",
            es: "Una vivienda unifamiliar diseñada para maximizar la entrada de luz natural. El diseño gira en torno a un patio central que actúa como pulmón verde y distribuidor de los espacios interiores, desdibujando los límites entre el interior y el exterior mediante grandes ventanales de piso a techo."
        },
        details: {
            area: "350 m²",
            typology: { en: "Residential", es: "Residencial" },
            status: { en: "Completed", es: "Completado" }
        }
    },
    {
        id: 2,
        title: { en: "CRYSTAL PAVILION", es: "PABELLÓN DE CRISTAL" },
        location: { en: "MONTERREY, MEXICO", es: "MONTERREY, MÉXICO" },
        year: "2023",
        image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
        description: {
            en: "Ephemeral exhibition space conceived as a lightbox. The minimalist steel and glass structure allows the surroundings to be reflected on its facades during the day, while at night it transforms into an urban beacon illuminating the surrounding square.",
            es: "Espacio de exhibición efímero concebido como una caja de luz. La estructura minimalista de acero y vidrio permite que el entorno se refleje en sus fachadas durante el día, mientras que por la noche se transforma en un faro urbano que ilumina la plaza circundante."
        },
        details: {
            area: "120 m²",
            typology: { en: "Cultural", es: "Cultural" },
            status: { en: "Completed", es: "Completado" }
        }
    },
    {
        id: 3,
        title: { en: "HORIZON TOWER", es: "TORRE HORIZONTE" },
        location: { en: "GUADALAJARA, MEXICO", es: "GUADALAJARA, MÉXICO" },
        year: "2023",
        image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
        description: {
            en: "Mixed-use building redefining the city's skyline. Its dynamic facade responds to solar orientation, optimizing energy consumption and offering panoramic terraces on each level to connect users with views of the landscape.",
            es: "Edificio de uso mixto que redefine el horizonte de la ciudad. Su fachada dinámica responde a la orientación solar, optimizando el consumo energético y ofreciendo terrazas panorámicas en cada nivel para conectar a los usuarios con las vistas del paisaje."
        },
        details: {
            area: "12,500 m²",
            typology: { en: "Commercial / Office", es: "Comercial / Oficinas" },
            status: { en: "Under construction", es: "En construcción" }
        }
    },
    {
        id: 4,
        title: { en: "MUSEUM OF TIME", es: "MUSEO DEL TIEMPO" },
        location: { en: "PUEBLA, MEXICO", es: "PUEBLA, MÉXICO" },
        year: "2022",
        image: "https://images.unsplash.com/photo-1690132223258-afafe25cbc6b?ixid=M3wxMjA3fDB8MXxzZWFyY2h8Mnx8YnJpY2slMjBtdXNldW18ZW58MHx8fHwxNzcxNzgwNzYwfDA&ixlib=rb-4.1.0&auto=format&fit=crop&w=1600&q=80",
        description: {
            en: "Intervention in a historic industrial building. The project preserves the original brick envelope and inserts contemporary exposed concrete volumes to house the new exhibition rooms, creating a tense and beautiful dialogue between past and present.",
            es: "Intervención en un edificio industrial histórico. El proyecto preserva la envolvente original de ladrillo e inserta volúmenes contemporáneos de concreto aparente para albergar las nuevas salas de exhibición, creando un diálogo tenso y hermoso entre el pasado y el presente."
        },
        details: {
            area: "4,200 m²",
            typology: { en: "Cultural / Rehabilitation", es: "Cultural / Rehabilitación" },
            status: { en: "Completed", es: "Completado" }
        }
    }
];
