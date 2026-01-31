export interface Project {
    id?: number | string;
    _id?: string;
    title: string;
    caption: string;
    image: string;
    imageUrl?: string;
    category: string;
    location: string;
    year: string;
    isFeatured: boolean;
    visionTitle: string;
    fullDescription: string[];
    palette: string[];
    gallery: string[];
    walkthroughUrl?: string;
}

export const projects: Project[] = [
    {
        id: 1,
        title: "Zenith Penthouse",
        caption: "A masterclass in minimal luxury and spatial fluidness.",
        image: "/ResidentialInteriorDesign.jpg",
        category: "Residential",
        location: "Kyoto, Japan",
        year: "2024",
        isFeatured: true,
        visionTitle: "Elevating Urban Living to an Art Form",
        fullDescription: [
            "The Zenith Penthouse project was conceived as a sanctuary high above the bustling streets of Kyoto. We aimed to blend traditional Japanese minimalism with modern high-end luxury, creating a space that feels both grounded and ethereal.",
            "Using a palette of natural stone and refined wood, we crafted a layout that emphasizes flow and light. Every angle was considered to maximize the sweeping city views while maintaining a deep sense of privacy and tranquility.",
            "The result is a timeless residence that serves as a quiet masterpiece of spatial design, where every texture and shadow contributes to a cohesive narrative of peace and elegance."
        ],
        palette: ["Statuary Marble", "Brushed Champagne Gold", "Smoked Oak Flooring", "Hand-applied Washi Accents"],
        gallery: ["/ResidentialInteriorDesign.jpg", "/aboutUSpages.jpg", "/heroImage.jpg", "/CommercialinteriorDesign.jpg", "/AboutUs.jpg"],
        walkthroughUrl: "https://kuula.co/share/collection/79m9t?logo=1&info=1&fs=1&vr=0&sd=1&thumbs=1"
    },
    {
        id: 2,
        title: "Vortex Hub",
        caption: "Redefining collaborative flow in the modern age.",
        image: "/CommercialinteriorDesign.jpg",
        category: "Office",
        location: "Berlin, Germany",
        year: "2023",
        isFeatured: false,
        visionTitle: "Dynamic Spaces for Modern Innovation",
        fullDescription: [
            "Vortex Hub is more than just an office; it's a social ecosystem designed to foster creativity and spontaneous collaboration. Our vision was to break down the walls of traditional corporate environments.",
            "We integrated organic curves and vibrant industrial materials to create a sense of movement. The center of the hub features a massive atrium that pulls light into every corner of the workstation areas.",
            "By balancing energetic communal zones with quiet focus pods, we achieved a workspace that adapts to the diverse needs of a fast-paced tech firm in the heart of Berlin."
        ],
        palette: ["Polished Concrete", "Perforated Shadow Metal", "Acoustic Felt Panels", "Reclaimed Industrial Steel"],
        gallery: ["/CommercialinteriorDesign.jpg", "/ResidentialInteriorDesign.jpg", "/heroImage.jpg", "/aboutUSpages.jpg", "/AboutUs.jpg"],
        walkthroughUrl: "https://kuula.co/share/collection/77Y9m?logo=1&info=1&fs=1&vr=0&sd=1&thumbs=1"
    },
    {
        id: 3,
        title: "Lumina Spa",
        caption: "Where light meets relaxation in perfect harmony.",
        image: "/heroImage.jpg",
        category: "Hospitality",
        location: "Bali, Indonesia",
        year: "2024",
        isFeatured: true,
        visionTitle: "A Celestial Journey of Wellness",
        fullDescription: [
            "At Lumina Spa, the architecture itself is part of the therapy. We utilized the natural tropical sunlight of Bali to create therapeutic light-play throughout the different treatment wings.",
            "Water elements are woven into the very structure of the building, providing a constant ambient soundscape that masks the outside world and centers the guest's experience.",
            "This project stands as a benchmark for luxury hospitality, where the boundaries between interior comfort and the raw beauty of nature are completely dissolved."
        ],
        palette: ["Local Volcanic Rock", "Teak Wood Lattice", "Translucent Quartz", "Cast Bronze Hardware"],
        gallery: ["/heroImage.jpg", "/ResidentialInteriorDesign.jpg", "/aboutUSpages.jpg", "/CommercialinteriorDesign.jpg", "/AboutUs.jpg"],
        walkthroughUrl: "https://kuula.co/share/collection/79m9t?logo=1&info=1&fs=1&vr=0&sd=1&thumbs=1"
    },
    {
        id: 4,
        title: "Aura Gallery",
        caption: "Bespoke retail experience centered around brand storytelling.",
        image: "/AboutUs.jpg",
        category: "Commercial",
        location: "New York, USA",
        year: "2023",
        isFeatured: false,
        visionTitle: "The Stage for Unforgettable Brands",
        fullDescription: [
            "Aura Gallery was designed to be a blank canvas that accentuates the products it holds. Our approach was minimalist but highly theatrical, using hidden lighting to create an 'auric' glow around displays.",
            "In the heart of Manhattan, this space offers a moment of high-contrast calm. We focused on tactile surfaces that invite customers to touch and interact with the environment.",
            "The gallery represents a shift in modern retail, where the space itself is a critical part of the brand's narrative and value proposition."
        ],
        palette: ["Matte White Resin", "Mirror-polished Aluminum", "Grey Silk Wallcoverings", "Oversized Architectural Glass"],
        gallery: ["/AboutUs.jpg", "/heroImage.jpg", "/ResidentialInteriorDesign.jpg", "/aboutUSpages.jpg", "/CommercialinteriorDesign.jpg"],
        walkthroughUrl: "https://kuula.co/share/collection/77Y9m?logo=1&info=1&fs=1&vr=0&sd=1&thumbs=1"
    },
    {
        id: 5,
        title: "Obsidian Executive",
        caption: "A high-stakes corporate environment with a focus on gravity and precision.",
        image: "/CommercialinteriorDesign.jpg",
        category: "Office",
        location: "London, UK",
        year: "2024",
        isFeatured: true,
        visionTitle: "Power and Poise in Professional Design",
        fullDescription: [
            "The Obsidian Executive suite was designed for a leading financial firm in London's Canary Wharf. The goal was to project authority through a dark, monolithic aesthetic while ensuring the space remained warm and welcoming for high-level negotiations.",
            "We utilized dark-stained walnut and black granite to create a sense of permanence. The acoustic design was critical, ensuring absolute privacy in meeting rooms without the use of heavy, opaque walls.",
            "This project proves that a dark palette, when handled with expert lighting and textured materials, can create an inspiring and highly productive environment."
        ],
        palette: ["Black Volcano Granite", "Dark Walnut Paneling", "Anodized Bronze", "Charcoal Wool Carpeting"],
        gallery: ["/CommercialinteriorDesign.jpg", "/AboutUs.jpg", "/heroImage.jpg", "/aboutUSpages.jpg", "/ResidentialInteriorDesign.jpg"],
        walkthroughUrl: "https://kuula.co/share/collection/79m9t?logo=1&info=1&fs=1&vr=0&sd=1&thumbs=1"
    },
    {
        id: 6,
        title: "Saffron Boutique",
        caption: "A celebration of warm tones and cultural heritage.",
        image: "/aboutUSpages.jpg",
        category: "Hospitality",
        location: "Marrakech, Morocco",
        year: "2023",
        isFeatured: false,
        visionTitle: "A Modern Oasis of Moroccan Soul",
        fullDescription: [
            "Saffron Boutique is a luxury riad transformation that respects the intricate geometric history of Moroccan architecture while stripping away the clutter. We used 'tadelakt' plaster and local hand-cut tiles to create a soft, tactile experience.",
            "The central courtyard is the heart of the design, featuring a minimalist pool that reflects the changing colors of the Marrakech sky. We worked closely with local artisans to ensure every architectural detail felt authentic but modern.",
            "The result is a sensory journey that offers guests a deep connection to the local culture through a lens of contemporary luxury."
        ],
        palette: ["Saffron-pigmented Plaster", "Terracotta Zellige Tiles", "Oxidized Copper", "Natural Sandstone"],
        gallery: ["/aboutUSpages.jpg", "/ResidentialInteriorDesign.jpg", "/heroImage.jpg", "/AboutUs.jpg", "/CommercialinteriorDesign.jpg"],
        walkthroughUrl: "https://kuula.co/share/collection/77Y9m?logo=1&info=1&fs=1&vr=0&sd=1&thumbs=1"
    },
    {
        id: 7,
        title: "Ethereal Living",
        caption: "Light-filled residential spaces designed for ultimate relaxation.",
        image: "/ResidentialInteriorDesign.jpg",
        category: "Residential",
        location: "Sydney, Australia",
        year: "2024",
        isFeatured: true,
        visionTitle: "Capturing the Essence of Coastal Calm",
        fullDescription: [
            "Ethereal Living is a cliffside residence in Sydney that blurs the line between indoor comfort and the vast Pacific ocean. The architecture uses massive floor-to-ceiling glass panels that retract completely.",
            "The interior design is intentionally restrained, using a palette of whites and soft greys to let the natural blue of the ocean and sky take center stage. Every piece of furniture was selected for its sculptural quality.",
            "This project is a testament to the power of 'quiet' design – where luxury is felt through the quality of light, the breeze in the room, and the silence of the surroundings."
        ],
        palette: ["Bleached Ash Wood", "White Limestone", "Soft Grey Linen", "Clear Low-iron Glass"],
        gallery: ["/ResidentialInteriorDesign.jpg", "/heroImage.jpg", "/AboutUs.jpg", "/CommercialinteriorDesign.jpg", "/aboutUSpages.jpg"],
        walkthroughUrl: "https://kuula.co/share/collection/79m9t?logo=1&info=1&fs=1&vr=0&sd=1&thumbs=1"
    },
    {
        id: 8,
        title: "Monolith Flagship",
        caption: "Future-proof retail design for a global tech leader.",
        image: "/CommercialinteriorDesign.jpg",
        category: "Commercial",
        location: "Seoul, South Korea",
        year: "2023",
        isFeatured: false,
        visionTitle: "The Intersection of Technology and Tactility",
        fullDescription: [
            "The Monolith Flagship store was designed to redefine the physical presence of a digital-first brand. We used interactive light walls and seamless concrete surfaces to create a space that feels like it exists in the future.",
            "We integrated wireless charging zones and AR-ready surfaces into the very fabric of the furniture. Despite the high-tech focus, we maintained a human connection through the use of organic textures and soft, diffused acoustics.",
            "This flagship serves as a hub for the community, offering a space that transitions seamlessly from a retail store to an educational lab and an event gallery."
        ],
        palette: ["Brushed Titanium", "Seamless Cast Concrete", "Frosted Acrylic", "Neon-edge Backlit Glass"],
        gallery: ["/CommercialinteriorDesign.jpg", "/AboutUs.jpg", "/ResidentialInteriorDesign.jpg", "/aboutUSpages.jpg", "/heroImage.jpg"],
        walkthroughUrl: "https://kuula.co/share/collection/77Y9m?logo=1&info=1&fs=1&vr=0&sd=1&thumbs=1"
    }
];
