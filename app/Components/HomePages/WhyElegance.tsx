"use client";
import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

/**
 * Data for the WhyElegance section.
 * Each item has an id, title, description, and an associated image.
 */
const features = [
    {
        id: 1,
        title: "Uncompromising Quality",
        description: "Every material is hand-selected from the world's finest artisans, ensuring that your space isn't just beautiful, but built to last for generations.",
        image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=2532&auto=format&fit=crop"
    },
    {
        id: 2,
        title: "Tailored to Your Soul",
        description: "We don't just design rooms; we curate experiences that mirror your personality. Your home becomes a living canvas of your own unique story.",
        image: "https://images.unsplash.com/photo-1615529182904-14819c35db37?q=80&w=2680&auto=format&fit=crop"
    },
    {
        id: 3,
        title: "Sustainable Luxury",
        description: "True elegance cares for the planet. We implement eco-conscious design principles without ever sacrificing the premium aesthetic you desire.",
        image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=2669&auto=format&fit=crop"
    },
    {
        id: 4,
        title: "Masterful Curation",
        description: "Our award-winning team orchestrates every detail, from lighting to texture, creating a symphony of style that feels effortless yet profound.",
        image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2600&auto=format&fit=crop"
    }
];

const WhyElegance = () => {
    // State to track which feature is strictly active/hovered
    const [activeFeature, setActiveFeature] = useState(0);

    return (
        <section className="bg-[#1a1818] text-[#FDF8F3] py-24 md:py-32 overflow-hidden relative">

            <div className="container mx-auto px-6 md:px-12 relative z-10">
                <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">

                    {/* Left Side: Content List */}
                    <div className="w-full lg:w-1/2 flex flex-col justify-center">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="mb-12"
                        >
                            <span className="text-amber-500/80 uppercase tracking-[0.2em] text-xs font-semibold mb-4 inline-block">
                                The Indepth Difference
                            </span>
                            <h2 className="text-4xl md:text-6xl font-serif text-[#FDF8F3] mb-6">
                                Why <span className="italic text-amber-500">Élégance?</span>
                            </h2>
                        </motion.div>

                        <div className="space-y-8">
                            {features.map((feature, index) => (
                                <motion.div
                                    key={feature.id}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    className="group cursor-pointer border-b border-white/10 pb-6 last:border-0"
                                    onMouseEnter={() => setActiveFeature(index)}
                                >
                                    <div className="flex items-center justify-between mb-2">
                                        <h3 className={`text-2xl md:text-3xl font-light transition-colors duration-500 ${activeFeature === index ? 'text-amber-400' : 'text-stone-400 group-hover:text-stone-200'}`}>
                                            {feature.title}
                                        </h3>
                                        <ArrowUpRight className={`w-6 h-6 transition-all duration-500 ${activeFeature === index ? 'text-amber-400 opacity-100 rotate-45' : 'text-stone-600 opacity-0 -translate-x-4'}`} />
                                    </div>
                                    <div className={`overflow-hidden transition-all duration-500 ease-in-out ${activeFeature === index ? 'max-h-24 opacity-100 mt-2' : 'max-h-0 opacity-0'}`}>
                                        <p className="text-stone-400 text-base md:text-lg leading-relaxed font-light max-w-md">
                                            {feature.description}
                                        </p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Right Side: Dynamic Image Preview */}
                    <div className="w-full lg:w-1/2 relative h-[50vh] lg:h-auto min-h-[500px]">
                        <div className="sticky top-10 h-full w-full rounded-2xl overflow-hidden shadow-2xl bg-stone-900 border border-white/5">
                            <AnimatePresence mode="popLayout">
                                {features.map((feature, index) => (
                                    activeFeature === index && (
                                        <motion.div
                                            key={feature.id}
                                            initial={{ opacity: 0, scale: 1.1 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.95 }}
                                            transition={{ duration: 0.7, ease: "easeInOut" }}
                                            className="absolute inset-0 z-0"
                                        >
                                            <Image
                                                src={feature.image}
                                                alt={feature.title}
                                                fill
                                                className="object-cover"
                                                priority={true}
                                            />
                                            {/* Minimal Overlay */}
                                            <div className="absolute inset-0 bg-black/20" />
                                        </motion.div>
                                    )
                                ))}
                            </AnimatePresence>

                            {/* Decorative Corner lines */}
                            <div className="absolute top-6 right-6 w-12 h-12 border-t border-r border-white/30 z-20" />
                            <div className="absolute bottom-6 left-6 w-12 h-12 border-b border-l border-white/30 z-20" />

                            <div className="absolute bottom-6 right-8 z-20 flex items-center gap-2">
                                <span className="text-white/60 text-xs uppercase tracking-widest">Explore</span>
                                <div className="w-8 h-px bg-white/40" />
                                <span className="text-white font-serif text-lg">{String(activeFeature + 1).padStart(2, '0')}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default WhyElegance;
