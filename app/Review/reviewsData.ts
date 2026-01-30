export interface Review {
    id: number;
    name: string;
    role: string;
    location: string;
    projectType: string;
    review?: string;
    rating: number;
    image?: string;
    videoUrl?: string; // YouTube embed URL
    date: string;
    avatarColor: string;
}

export const videoReviewsData: Review[] = [
    {
        id: 1,
        name: "Sarah Mitchell",
        role: "CEO",
        location: "New York, USA",
        projectType: "Luxury Penthouse Renovation",
        rating: 5,
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        date: "Jan 2024",
        avatarColor: "#D4AF37"
    },
    {
        id: 2,
        name: "Emily Chen",
        role: "Creative Director",
        location: "Singapore",
        projectType: "Contemporary Art Studio",
        rating: 5,
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        date: "Feb 2024",
        avatarColor: "#800000"
    },
    {
        id: 3,
        name: "Sophia Martinez",
        role: "Tech Lead",
        location: "Austin, USA",
        projectType: "Minimalist Smart Home",
        rating: 5,
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        date: "Oct 2023",
        avatarColor: "#4B0082"
    }
];

export const textReviewsData: Review[] = [
    {
        id: 1,
        name: "James Anderson",
        role: "Restaurant Owner",
        location: "London, UK",
        projectType: "Modern Bistro Interior",
        review: "Working with IndepthStudio was an absolute pleasure. They created an ambiance that perfectly captures our brand identity. Our customers constantly compliment the stunning design and the unique lighting fixtures they selected.",
        rating: 5,
        date: "Nov 2023",
        avatarColor: "#2F4F4F"
    },
    {
        id: 2,
        name: "Michael Roberts",
        role: "Property Developer",
        location: "Dubai, UAE",
        projectType: "Boutique Hotel Lobby",
        review: "The redesign exceeded all expectations. Guest satisfaction has increased significantly, and we've received numerous awards for our interior design since the reopening. Truly transformative work that added immense value to our property.",
        rating: 5,
        date: "Dec 2023",
        avatarColor: "#000080"
    },
    {
        id: 3,
        name: "David Wilson",
        role: "Fashion Designer",
        location: "Paris, France",
        projectType: "Flagship Showroom",
        review: "An incredible understanding of spatial dynamics. They managed to make our showroom feel vast yet intimate. The custom furniture pieces they designed are works of art themselves.",
        rating: 5,
        date: "Mar 2024",
        avatarColor: "#556B2F"
    }
];
