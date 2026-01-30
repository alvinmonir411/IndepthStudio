export interface Project {
    id: number;
    title: string;
    caption: string;
    image: string;
    category: string;
}

export const projects: Project[] = [
    {
        id: 1,
        title: "Zenith Penthouse",
        caption: "A masterclass in minimal luxury and spatial fluidness.",
        image: "/ResidentialInteriorDesign.jpg",
        category: "Residential",
    },
    {
        id: 2,
        title: "Vortex Hub",
        caption: "Redefining collaborative flow in the modern age.",
        image: "/CommercialinteriorDesign.jpg",
        category: "Office",
    },
    {
        id: 3,
        title: "Lumina Spa",
        caption: "Where light meets relaxation in perfect harmony.",
        image: "/heroImage.jpg",
        category: "Hospitality",
    },
    {
        id: 4,
        title: "Aura Gallery",
        caption: "Bespoke retail experience centered around brand storytelling.",
        image: "/AboutUs.jpg",
        category: "Commercial",
    }
];
