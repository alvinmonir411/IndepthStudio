'use client';

import { motion, Variants } from 'framer-motion';
import Image from 'next/image';
import { ArrowDown } from 'lucide-react';

interface HeroBannerProps {
    imageSrc: string;
    imageAlt: string;
}

export default function HeroBanner({ imageSrc, imageAlt }: HeroBannerProps) {
    const brandColor = '#C38822';

    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.3,
                delayChildren: 0.4,
            },
        },
    };

    const itemVariants: Variants = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, ease: "easeOut" as const },
        },
    };

    const scrollVariants: Variants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 1,
                repeat: Infinity,
                repeatType: "reverse" as const,
                ease: "easeInOut" as const,
            },
        },
    };

    return (
        <section className="relative w-full h-screen flex items-center justify-center overflow-hidden">
            {/* Background Image */}
            <Image
                src={imageSrc}
                alt={imageAlt}
                fill
                className="object-cover object-center brightness-75"
                priority
                sizes="100vw"
            />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

            {/* ✅ FIXED: Content - Perfect Center + No Container Padding */}
            <motion.div
                className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center text-white w-full h-full"
                initial="hidden"
                animate="visible"
                variants={containerVariants}
            >
                <motion.h1
                    className="mb-8 text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight uppercase leading-tight bg-gradient-to-r from-white to-gray-200 bg-clip-text"
                    variants={itemVariants}
                >
                    About Us
                </motion.h1>

                <motion.p
                    className="mb-16 max-w-3xl text-xl md:text-2xl lg:text-3xl font-light leading-relaxed px-8"
                    style={{ color: brandColor }}
                    variants={itemVariants}
                >
                    Crafting Timeless Elegance in Every Space
                </motion.p>

                <motion.div
                    className="flex flex-col items-center gap-4"
                    initial="hidden"
                    animate="visible"
                    variants={scrollVariants}
                >
                    <p className="text-lg opacity-90 font-medium">Discover Our Story</p>
                    <ArrowDown className="h-8 w-8 animate-pulse" style={{ color: brandColor }} />
                </motion.div>
            </motion.div>
        </section>
    );
}
