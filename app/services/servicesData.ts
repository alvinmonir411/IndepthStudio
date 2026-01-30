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
    longDescription: string;
    features: { title: string; description: string }[];
    image: string;
    details: ServiceDetail;
}

export const servicesData: Service[] = [
    {
        id: "residential-design",
        title: "Residential Interior Design",
        shortDescription: "Custom luxury living spaces tailored to your personal aesthetic and lifestyle.",
        longDescription: "Our residential design service is a deeply personal journey. we believe that your home should be a reflection of your soul, a sanctuary that provides both comfort and inspiration. From grand estates to minimalist urban apartments, we bring an uncompromising eye for detail and a passion for craftsmanship to every room we touch.",
        features: [
            { title: "Personalized Consultations", description: "Deep dive into your lifestyle and aspirations." },
            { title: "Bespoke Furniture", description: "Custom-made pieces that fit your space perfectly." },
            { title: "Spatial Planning", description: "Optimizing flow and functionality for luxury living." }
        ],
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
        longDescription: "Commercial spaces are where culture meets commerce. We design environments that don't just look impressive but actively enhance the performance of your team and the perception of your brand. Our approach integrates cutting-edge ergonomics with a high-end aesthetic to create workspaces that represent the future of business.",
        features: [
            { title: "Brand Integration", description: "Subtle and powerful reflections of your corporate identity." },
            { title: "Acoustic Solutions", description: "Managing sound for privacy and collaborative energy." },
            { title: "Efficient Layouts", description: "Maximizing square footage without sacrificing the 'wow' factor." }
        ],
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
        longDescription: "The kitchen is the heart of the home, and we treat it as a masterpiece of industrial design. Our modular solutions combine the precision of German engineering with the warmth of Italian woodcraft. Every drawer, hinge, and surface is selected for its tactile quality and long-term durability.",
        features: [
            { title: "Smart Integration", description: "Appliances hidden in plain sight with seamless cabinetry." },
            { title: "Ergonomic Zones", description: "Reducing movement and increasing speed in culinary tasks." },
            { title: "Premium Hardware", description: "Soft-close mechanisms and hidden lighting as standard." }
        ],
        image: "/heroImage.jpg",
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
        longDescription: "Eliminate uncertainty with our photorealistic visualization services. We don't just show you colors and shapes; we simulate light, texture, and atmosphere. This process allows for complete creative confidence, letting you experience your space months before the first brick is laid.",
        features: [
            { title: "Virtual Walkthroughs", description: "Explore your space in real-time with VR technology." },
            { title: "Material Simulation", description: "See exactly how different stones and woods interact under light." },
            { title: "Lighting Studies", description: "Accurate representations of natural and artificial light play." }
        ],
        image: "/aboutUSpages.jpg",
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
        longDescription: "For those who value their time as much as their aesthetic, our turnkey service offers a complete peace of mind. We act as your single point of contact, managing architects, contractors, artisans, and logistics. We handle the complexity so you can simply enjoy the final reveal.",
        features: [
            { title: "Project Oversight", description: "Daily management of site activities and timelines." },
            { title: "Global Procurement", description: "Sourcing rare materials and pieces from around the world." },
            { title: "Quality Control", description: "Rigorous inspections at every stage of the build." }
        ],
        image: "/AboutUs.jpg",
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
        longDescription: "Renovation is an exercise in vision. We see the hidden potential in aging structures and breathe new life into them. Balancing historic preservation with contemporary luxury, we upgrade the structural, electrical, and aesthetic elements of your property while maintaining its essential character.",
        features: [
            { title: "Structural Reimagining", description: "Opening up spaces for modern, open-plan living." },
            { title: "Modern Integration", description: "Adding smart home tech and climate control to older buildings." },
            { title: "Façade Restoration", description: "Enhancing curb appeal while protecting historical value." }
        ],
        image: "/services-hero-bg.png",
        details: {
            included: ["Structural Changes", "Electrical & Plumbing", "Walls & Flooring", "Finishing Touches"],
            approach: "Respecting the history of a space while infusing it with contemporary luxury and modern amenities.",
            materials: "Restoration-grade materials combined with modern construction tech.",
            timeline: "12-20 weeks depending on structural complexity.",
            suitableFor: "Owners of older properties looking to modernize their space while potentially increasing property value."
        }
    }
];
