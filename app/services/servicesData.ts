export interface ServiceDetail {
    included: string[];
    approach: string;
    materials: string;
    timeline: string;
    suitableFor: string;
}

export interface Service {
    id: string;
    title: string;
    shortDescription: string;
    image: string;
    details: ServiceDetail;
}

export const servicesData: Service[] = [
    {
        id: "residential-design",
        title: "Residential Interior Design",
        shortDescription: "Custom luxury living spaces tailored to your personal aesthetic and lifestyle.",
        image: "/ResidentialInteriorDesign.jpg",
        details: {
            included: ["Living Room Design", "Bedroom Suites", "Dining Areas", "Lighting Design"],
            approach: "We focus on creating a harmonious balance between comfort and elegance, ensuring every room feels like home.",
            materials: "High-grade marbles, sustainable hardwoods, and premium upholstery fabrics.",
            timeline: "8-12 weeks from concept to completion.",
            suitableFor: "Homeowners looking for a complete luxury transformation of their private living spaces."
        }
    },
    {
        id: "commercial-design",
        title: "Commercial Interior Design",
        shortDescription: "Impactful business environments that enhance brand identity and productivity.",
        image: "/CommercialinteriorDesign.jpg",
        details: {
            included: ["Brand-Centric Design", "Office Layouts", "Reception Areas", "Collaborative Spaces"],
            approach: "Integrating brand values into functional workspaces that inspire teams and impress clients.",
            materials: "Durable acoustic panels, industrial-grade flooring, and custom metalwork.",
            timeline: "10-16 weeks depending on square footage.",
            suitableFor: "Businesses, startups, and established enterprises seeking to redefine their corporate presence."
        }
    },
    {
        id: "modular-kitchen",
        title: "Modular Kitchen Design",
        shortDescription: "Sleek, highly functional kitchens that blend modern technology with timeless style.",
        image: "/heroImage.jpg", // Using existing as placeholder
        details: {
            included: ["Smart Storage Solutions", "Ergonomic Layouts", "Appliance Integration", "Lighting & Ventilation"],
            approach: "Prioritizing efficiency and ease of use without compromising on the luxury aesthetic.",
            materials: "Water-resistant laminates, anti-scratch countertops, and soft-close hardware.",
            timeline: "4-6 weeks for design and installation.",
            suitableFor: "Modern families who value a high-performance kitchen as the heart of their home."
        }
    },
    {
        id: "3d-visualization",
        title: "3D Design & Visualization",
        shortDescription: "Photorealistic 3D renders that bring your future spaces to life before construction begins.",
        image: "/aboutUSpages.jpg", // Using existing as placeholder
        details: {
            included: ["3D Modeling", "Photorealistic Rendering", "Virtual Walkthroughs", "Material Simulation"],
            approach: "Utilizing state-of-the-art technology to provide complete clarity and confidence in the design direction.",
            materials: "Digital shaders and lighting models that accurately represent real-world finishes.",
            timeline: "1-2 weeks per major room.",
            suitableFor: "Clients who want to 'see' their finished project before committing to actual construction."
        }
    },
    {
        id: "turnkey-solutions",
        title: "Turnkey Interior Solutions",
        shortDescription: "End-to-end management from initial concept to the final handover.",
        image: "/AboutUs.jpg", // Using existing as placeholder
        details: {
            included: ["Procurement", "Project Management", "Quality Control", "Final Handover"],
            approach: "A hassle-free experience where we take full responsibility for every detail of the execution.",
            materials: "Vetted suppliers and skilled artisans ensuring the highest quality standards.",
            timeline: "Varies by project scope.",
            suitableFor: "Busy professionals and expatriates who want a high-quality result without the stress of managing workers."
        }
    },
    {
        id: "renovation-remodeling",
        title: "Renovation & Remodeling",
        shortDescription: "Transforming existing spaces into modern masterpieces with structural integrity.",
        image: "/services-hero-bg.png", // Using existing
        details: {
            included: ["Structural Changes", "Electrical & Plumbing", "Walls & Flooring", "Finishing Touches"],
            approach: "Respecting the history of a space while infusing it with contemporary luxury and modern amenities.",
            materials: "Restoration-grade materials combined with modern construction tech.",
            timeline: "12-20 weeks depending on structural complexity.",
            suitableFor: "Owners of older properties looking to modernize their space while potentially increasing property value."
        }
    }
];
