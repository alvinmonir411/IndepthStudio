export interface BlogPost {
    id: number;
    slug: string;
    title: string;
    excerpt: string;
    content: string; // Brief description used in previews
    fullContent: string[]; // Actual detailed content paragraphs
    quote?: string; // Large editorial quote
    quoteAuthor?: string;
    category: string;
    date: string;
    author: string;
    image: string;
    readTime: string;
    tags: string[];
}

export const blogPosts: BlogPost[] = [
    {
        id: 1,
        slug: "the-art-of-minimalist-living",
        title: "The Art of Minimalist Living in Urban Spaces",
        excerpt: "Discover how to transform small city apartments into serene, uncluttered sanctuaries without sacrificing style or comfort.",
        content: "Minimalism isn't just about owning less; it's about making room for more of what matters.",
        fullContent: [
            "In the heart of New York City, where square footage is a luxury, we explore the philosophy of 'Essentialism' in design. Minimalism isn't just an aesthetic; it's a way of living that prioritizes clarity over clutter.",
            "Our approach to urban minimalist living begins with light. By maximizing natural light through strategic window treatments and reflective surfaces, we can make even the most compact studio feel expansive.",
            "Functional furniture is the backbone of this philosophy. Every piece must serve a dual purpose or provide significant storage without the visual weight that traditional cabinets often carry."
        ],
        quote: "True design is not about what we add, but what we have the courage to leave out. Space is the luxury of the modern age.",
        quoteAuthor: "Alvin Monir",
        category: "Lifestyle",
        date: "Jan 15, 2024",
        author: "Alvin Monir",
        image: "https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?q=80&w=2067&auto=format&fit=crop",
        readTime: "5 min read",
        tags: ["Minimalism", "Urban Living", "Organization"]
    },
    {
        id: 2,
        slug: "color-psychology-in-interior-design",
        title: "Color Psychology: How Your Home Affects Your Mood",
        excerpt: "Lighter shades for productivity or deeper hues for relaxation? We dive deep into the science of color and spatial atmosphere.",
        content: "Colors are more than just aesthetic choices; they are powerful tools that influence human emotion.",
        fullContent: [
            "Colors are more than just aesthetic choices; they are powerful tools that influence human emotion and behavior. From the calming effect of sage green to the invigorating energy of ochre, every hue tells a story.",
            "In a workspace, cool blues and crisp whites can enhance concentration and perceived productivity. Conversely, warm tones like terracotta and amber are perfect for social areas like living rooms and dining spaces.",
            "We recommend starting with a neutral base and layering colors through textures and art, allowing for flexibility as your mood or the seasons change."
        ],
        quote: "Color is a power which directly influences the soul. It is the silent language of the home.",
        quoteAuthor: "Sarah Mitchell",
        category: "Design Theory",
        date: "Feb 02, 2024",
        author: "Sarah Mitchell",
        image: "https://images.unsplash.com/photo-1513519247388-193ad51c50b7?q=80&w=2070&auto=format&fit=crop",
        readTime: "8 min read",
        tags: ["Color", "Psychology", "Wellness"]
    },
    {
        id: 3,
        slug: "sustainable-materials-for-modern-homes",
        title: "Sustainable Materials: The Future of Modern Homes",
        excerpt: "From mushroom leather to recycled terrazzo, explore the innovative materials shaping the eco-conscious design industry.",
        content: "Sustainability is no longer a trend; it's a necessity in modern high-end architecture.",
        fullContent: [
            "Sustainability is no longer a trend; it's a necessity. We're seeing a shift towards materials that not only look beautiful but also respect the planet. Innovation in this sector is moving at a breakneck pace.",
            "Mycelium composites and reclaimed plastics are leading the way in luxury interiors. We recently completed a project using 100% recycled glass for kitchen surfaces, creating a unique 'ocean-mist' texture.",
            "Designers are now looking at the lifecycle of every material, ensuring that 'luxury' also means 'longevity' and 'responsibility'."
        ],
        quote: "The greatest threat to our planet is the belief that someone else will save it. Luxury must be sustainable.",
        quoteAuthor: "James Anderson",
        category: "Sustainability",
        date: "Feb 18, 2024",
        author: "James Anderson",
        image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2000&auto=format&fit=crop",
        readTime: "6 min read",
        tags: ["Eco-friendly", "Innovation", "Architecture"]
    },
    {
        id: 4,
        slug: "lighting-the-silent-architect",
        title: "Lighting: The Silent Architect of Your Interior",
        excerpt: "Why lighting is the most crucial element of design and how to master layered illumination in any room.",
        content: "You can have the most expensive furniture, but with poor lighting, the design will fail.",
        fullContent: [
            "You can have the most expensive furniture in the world, but with poor lighting, the design will fail. Lighting dictates how we perceive space, texture, and color.",
            "We break down the three layers of lighting: Ambient, Task, and Accent. Ambient provides the base, task aids function, and accent adds the drama.",
            "Smart lighting systems now allow us to program 'scenes' that shift throughout the day, following our circadian rhythms for better sleep and mood."
        ],
        quote: "Shadow is as important as light. It provides depth and mystery to a room.",
        quoteAuthor: "Emily Chen",
        category: "Tutorial",
        date: "Mar 05, 2024",
        author: "Emily Chen",
        image: "https://images.unsplash.com/photo-1534073828943-f801091bb18c?q=80&w=1974&auto=format&fit=crop",
        readTime: "4 min read",
        tags: ["Lighting", "Interior Basics", "Mood"]
    },
    {
        id: 5,
        slug: "the-renaissance-of-maximalism",
        title: "The Renaissance of Maximalism: More is More",
        excerpt: "Why the design world is pivoting away from 'greige' and embracing bold patterns, textures, and curated clutter.",
        content: "For a decade, minimalism reigned supreme. But recently, we've seen a vibrant pushback.",
        fullContent: [
            "For a decade, minimalism reigned supreme. But recently, we've seen a vibrant pushback. Maximalism isn't just about 'stuff'; it's about personality and visual storytelling.",
            "This renaissance is driven by a desire for homes to feel lived-in and deeply personal. It's about mixing eras—a Victorian armchair next to a Brutalist lamp.",
            "The key to maximalism is curation. It's 'curated chaos'—where every object has a story and a reason for being there, rather than just filling space."
        ],
        quote: "I am a maximalist. I believe that more is more, and less is just... less.",
        quoteAuthor: "Iris Apfel",
        category: "Interior Trends",
        date: "Mar 12, 2024",
        author: "Alvin Monir",
        image: "https://images.unsplash.com/photo-1616489953149-755eacc48000?q=80&w=2072&auto=format&fit=crop",
        readTime: "7 min read",
        tags: ["Maximalism", "Color", "Curation"]
    },
    {
        id: 6,
        slug: "biophilic-design-bringing-the-outdoors-in",
        title: "Biophilic Design: Bringing the Outdoors In",
        excerpt: "How integrating natural elements into your interior can reduce stress and increase creative output.",
        content: "Biophilia is our innate connection to nature. Bringing it home is a wellness strategy.",
        fullContent: [
            "Biophilia is our innate connection to nature. In a world of concrete and glass, bringing greenery, natural light, and organic textures into our homes is essential for mental health.",
            "We focus on 'Direct Nature'—living plants and water features—and 'Indirect Nature'—shapes and patterns found in nature, like the Fibonacci sequence in tile layouts.",
            "Our latest projects incorporate 'living walls' that not only purify the air but act as dynamic, changing art pieces throughout the year."
        ],
        quote: "Nature does not hurry, yet everything is accomplished. Our homes should reflect that rhythm.",
        quoteAuthor: "Lao Tzu",
        category: "Well-being",
        date: "Mar 20, 2024",
        author: "Sarah Mitchell",
        image: "https://images.unsplash.com/photo-1545241047-6083a3684587?q=80&w=1974&auto=format&fit=crop",
        readTime: "5 min read",
        tags: ["Nature", "Wellness", "Sustainability"]
    }
];
