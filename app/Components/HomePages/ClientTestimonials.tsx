"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";

interface Testimonial {
    id: number;
    name: string;
    role: string;
    projectType: string;
    review: string;
    rating: number;
    image?: string;
}

const testimonials: Testimonial[] = [
    {
        id: 1,
        name: "Sarah Mitchell",
        role: "CEO",
        projectType: "Luxury Penthouse Renovation",
        review: "The team transformed our penthouse beyond our wildest dreams. Their attention to detail and understanding of our vision was exceptional. Every corner speaks elegance and sophistication.",
        rating: 5,
    },
    {
        id: 2,
        name: "James Anderson",
        role: "Restaurant Owner",
        projectType: "Modern Restaurant Interior",
        review: "Working with this studio was an absolute pleasure. They created an ambiance that perfectly captures our brand identity. Our customers constantly compliment the stunning design.",
        rating: 5,
    },
    {
        id: 3,
        name: "Emily Chen",
        role: "Homeowner",
        projectType: "Contemporary Family Home",
        review: "From concept to completion, the process was seamless. They listened to our needs and delivered a space that's both beautiful and functional. Our home feels like a sanctuary now.",
        rating: 5,
    },
    {
        id: 4,
        name: "Michael Roberts",
        role: "Hotel Manager",
        projectType: "Boutique Hotel Redesign",
        review: "The redesign exceeded all expectations. Guest satisfaction has increased significantly, and we've received numerous awards for our interior design. Truly transformative work.",
        rating: 5,
    },
    {
        id: 5,
        name: "Sophia Martinez",
        role: "Business Owner",
        projectType: "Corporate Office Space",
        review: "They created a workspace that inspires creativity and productivity. The modern aesthetic combined with functional design has completely changed how our team works and collaborates.",
        rating: 5,
    },
];

const ClientTestimonials = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState(0);
    const sectionRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

    const slideVariants = {
        enter: (direction: number) => ({
            x: direction > 0 ? 1000 : -1000,
            opacity: 0,
            scale: 0.8,
        }),
        center: {
            zIndex: 1,
            x: 0,
            opacity: 1,
            scale: 1,
        },
        exit: (direction: number) => ({
            zIndex: 0,
            x: direction < 0 ? 1000 : -1000,
            opacity: 0,
            scale: 0.8,
        }),
    };

    const swipeConfidenceThreshold = 10000;
    const swipePower = (offset: number, velocity: number) => {
        return Math.abs(offset) * velocity;
    };

    const paginate = (newDirection: number) => {
        setDirection(newDirection);
        setCurrentIndex((prevIndex) => {
            let nextIndex = prevIndex + newDirection;
            if (nextIndex < 0) nextIndex = testimonials.length - 1;
            if (nextIndex >= testimonials.length) nextIndex = 0;
            return nextIndex;
        });
    };

    // Auto-play functionality
    useEffect(() => {
        const timer = setInterval(() => {
            paginate(1);
        }, 6000);

        return () => clearInterval(timer);
    }, [currentIndex]);

    return (
        <section
            ref={sectionRef}
            className="relative w-full py-24 px-6 overflow-hidden bg-gradient-to-br from-white via-amber-50/30 to-orange-50/30"
        >
            {/* Animated background elements */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-amber-300 rounded-full blur-[120px] animate-pulse" />
                <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-pink-300 rounded-full blur-[120px] animate-pulse delay-1000" />
            </div>

            {/* Diagonal lines pattern */}
            <div className="absolute inset-0 opacity-5">
                <div
                    className="absolute inset-0"
                    style={{
                        backgroundImage: `repeating-linear-gradient(
                            45deg,
                            transparent,
                            transparent 50px,
                            rgba(251,191,36,0.1) 50px,
                            rgba(251,191,36,0.1) 51px
                        )`,
                    }}
                />
            </div>

            <div className="relative max-w-7xl mx-auto">
                {/* Section header */}
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: -30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8 }}
                >
                    <motion.div
                        className="inline-block mb-4 px-6 py-2 rounded-full bg-gradient-to-r from-amber-100 to-orange-100 border border-amber-300 backdrop-blur-sm"
                        initial={{ scale: 0 }}
                        animate={isInView ? { scale: 1 } : {}}
                        transition={{ duration: 0.5, type: "spring" }}
                    >
                        <span className="text-amber-700 font-semibold text-sm tracking-wider uppercase">
                            Client Testimonials
                        </span>
                    </motion.div>

                    <h2 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-zinc-900 via-amber-900 to-zinc-900 bg-clip-text text-transparent">
                        What Our Clients Say
                    </h2>
                    <p className="text-zinc-600 text-lg md:text-xl max-w-2xl mx-auto">
                        Real stories from real people who trusted us with their spaces
                    </p>
                </motion.div>

                {/* Testimonial Slider */}
                <div className="relative max-w-5xl mx-auto">
                    <div className="relative h-[500px] md:h-[400px] flex items-center justify-center">
                        <AnimatePresence initial={false} custom={direction} mode="wait">
                            <motion.div
                                key={currentIndex}
                                custom={direction}
                                variants={slideVariants}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                transition={{
                                    x: { type: "spring", stiffness: 300, damping: 30 },
                                    opacity: { duration: 0.4 },
                                    scale: { duration: 0.4 },
                                }}
                                drag="x"
                                dragConstraints={{ left: 0, right: 0 }}
                                dragElastic={1}
                                onDragEnd={(e, { offset, velocity }) => {
                                    const swipe = swipePower(offset.x, velocity.x);

                                    if (swipe < -swipeConfidenceThreshold) {
                                        paginate(1);
                                    } else if (swipe > swipeConfidenceThreshold) {
                                        paginate(-1);
                                    }
                                }}
                                className="absolute w-full cursor-grab active:cursor-grabbing"
                            >
                                {/* Testimonial Card */}
                                <div className="relative mx-auto max-w-4xl">
                                    {/* Gradient border effect */}
                                    <div className="absolute inset-0 bg-gradient-to-br from-amber-400 via-orange-500 to-pink-500 rounded-3xl opacity-20 blur-2xl" />

                                    {/* Card content */}
                                    <div className="relative bg-white backdrop-blur-2xl border border-amber-200 rounded-3xl p-8 md:p-12 shadow-2xl">
                                        {/* Quote icon */}
                                        <motion.div
                                            className="absolute -top-6 left-8 w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl flex items-center justify-center shadow-xl"
                                            initial={{ rotate: -180, scale: 0 }}
                                            animate={{ rotate: 0, scale: 1 }}
                                            transition={{ duration: 0.6, type: "spring" }}
                                        >
                                            <Quote className="w-8 h-8 text-white" />
                                        </motion.div>

                                        {/* Stars */}
                                        <div className="flex gap-1 mb-6 justify-center md:justify-start">
                                            {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                                                <motion.div
                                                    key={i}
                                                    initial={{ opacity: 0, scale: 0 }}
                                                    animate={{ opacity: 1, scale: 1 }}
                                                    transition={{ delay: i * 0.1 + 0.3 }}
                                                >
                                                    <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
                                                </motion.div>
                                            ))}
                                        </div>

                                        {/* Review text */}
                                        <motion.p
                                            className="text-zinc-700 text-lg md:text-xl leading-relaxed mb-8 text-center md:text-left italic"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ delay: 0.2 }}
                                        >
                                            "{testimonials[currentIndex].review}"
                                        </motion.p>

                                        {/* Client info */}
                                        <div className="flex flex-col md:flex-row items-center md:items-start gap-4">
                                            {/* Avatar placeholder */}
                                            <motion.div
                                                className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-white text-2xl font-bold shadow-lg"
                                                initial={{ scale: 0 }}
                                                animate={{ scale: 1 }}
                                                transition={{ delay: 0.4, type: "spring" }}
                                            >
                                                {testimonials[currentIndex].name.charAt(0)}
                                            </motion.div>

                                            <div className="text-center md:text-left">
                                                <h4 className="text-zinc-900 font-bold text-xl mb-1">
                                                    {testimonials[currentIndex].name}
                                                </h4>
                                                <p className="text-amber-600 text-sm font-medium mb-1">
                                                    {testimonials[currentIndex].role}
                                                </p>
                                                <p className="text-zinc-600 text-sm">
                                                    {testimonials[currentIndex].projectType}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* Navigation buttons */}
                    <div className="flex items-center justify-center gap-4 mt-8">
                        <motion.button
                            onClick={() => paginate(-1)}
                            className="w-14 h-14 rounded-full bg-white backdrop-blur-md border border-amber-300 flex items-center justify-center text-amber-700 hover:bg-amber-50 transition-all duration-300 shadow-xl"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                        >
                            <ChevronLeft className="w-6 h-6" />
                        </motion.button>

                        {/* Dots indicator */}
                        <div className="flex gap-2">
                            {testimonials.map((_, index) => (
                                <motion.button
                                    key={index}
                                    onClick={() => {
                                        setDirection(index > currentIndex ? 1 : -1);
                                        setCurrentIndex(index);
                                    }}
                                    className={`h-2 rounded-full transition-all duration-300 ${index === currentIndex
                                        ? "w-8 bg-gradient-to-r from-amber-500 to-orange-600"
                                        : "w-2 bg-amber-200 hover:bg-amber-300"
                                        }`}
                                    whileHover={{ scale: 1.2 }}
                                />
                            ))}
                        </div>

                        <motion.button
                            onClick={() => paginate(1)}
                            className="w-14 h-14 rounded-full bg-white backdrop-blur-md border border-amber-300 flex items-center justify-center text-amber-700 hover:bg-amber-50 transition-all duration-300 shadow-xl"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                        >
                            <ChevronRight className="w-6 h-6" />
                        </motion.button>
                    </div>
                </div>

                {/* Bottom decorative element */}
                <motion.div
                    className="mt-16 flex justify-center"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.8, delay: 1 }}
                >
                    <div className="w-24 h-1 bg-gradient-to-r from-transparent via-amber-500 to-transparent rounded-full" />
                </motion.div>
            </div>
        </section>
    );
};

export default ClientTestimonials;
