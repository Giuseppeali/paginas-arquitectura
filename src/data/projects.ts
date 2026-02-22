export interface Project {
    id: number;
    title: string;
    location: string;
    year: string;
    image: string;
    description: string;
    details: {
        area: string;
        typology: string;
        status: string;
    };
}

export const projects: Project[] = [
    {
        id: 1,
        title: "CASA LUZ",
        location: "MEXICO CITY, MEXICO",
        year: "2024",
        image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
        description: "A single-family home designed to maximize natural light entry. The design revolves around a central courtyard acting as a green lung and distributor of interior spaces, blurring the boundaries between inside and outside through large floor-to-ceiling windows.",
        details: { area: "350 m²", typology: "Residential", status: "Completed" }
    },
    {
        id: 2,
        title: "CRYSTAL PAVILION",
        location: "MONTERREY, MEXICO",
        year: "2023",
        image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
        description: "Ephemeral exhibition space conceived as a lightbox. The minimalist steel and glass structure allows the surroundings to be reflected on its facades during the day, while at night it transforms into an urban beacon illuminating the surrounding square.",
        details: { area: "120 m²", typology: "Cultural", status: "Completed" }
    },
    {
        id: 3,
        title: "HORIZON TOWER",
        location: "GUADALAJARA, MEXICO",
        year: "2023",
        image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
        description: "Mixed-use building redefining the city's skyline. Its dynamic facade responds to solar orientation, optimizing energy consumption and offering panoramic terraces on each level to connect users with views of the landscape.",
        details: { area: "12,500 m²", typology: "Commercial / Office", status: "Under construction" }
    },
    {
        id: 4,
        title: "MUSEUM OF TIME",
        location: "PUEBLA, MEXICO",
        year: "2022",
        image: "https://images.unsplash.com/photo-1690132223258-afafe25cbc6b?ixid=M3wxMjA3fDB8MXxzZWFyY2h8Mnx8YnJpY2slMjBtdXNldW18ZW58MHx8fHwxNzcxNzgwNzYwfDA&ixlib=rb-4.1.0&auto=format&fit=crop&w=1600&q=80",
        description: "Intervention in a historic industrial building. The project preserves the original brick envelope and inserts contemporary exposed concrete volumes to house the new exhibition rooms, creating a tense and beautiful dialogue between past and present.",
        details: { area: "4,200 m²", typology: "Cultural / Rehabilitation", status: "Completed" }
    }
];
