'use client';

import { motion, Variants } from 'framer-motion';
import Image from 'next/image';
import { MousePointer2 } from 'lucide-react';

export default function ServicesHero() {
    const brandColor = '#C38822';

    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.3,
            },
        },
    };

    const itemVariants: Variants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
        },
    };

    const lineVariants: Variants = {
        hidden: { width: 0 },
        visible: {
            width: '100%',
            transition: { duration: 1.2, ease: "easeInOut", delay: 0.8 },
        },
    };

    return (
        <section className="relative w-full h-[90vh] flex items-center justify-center overflow-hidden bg-stone-950">
            {/* Background Image with Parallax Effect */}
            <motion.div
                initial={{ scale: 1.1 }}
                animate={{ scale: 1 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="absolute inset-0 z-0"
            >
                <Image
                    src="/services-hero-bg.png"
                    alt="Luxury Interior Design Services"
                    fill
                    className="object-cover object-center brightness-[0.4]"
                    priority
                    sizes="100vw"
                />
            </motion.div>

            {/* Subtle Texture Overlay */}
            <div className="absolute inset-0 z-1 opacity-20 pointer-events-none bg-[url('/noise.png')] mix-blend-overlay" />

            {/* Gradient Overlays */}
            <div className="absolute inset-0 z-2 bg-gradient-to-b from-stone-950/40 via-transparent to-stone-950" />
            <div className="absolute inset-0 z-2 bg-gradient-to-r from-stone-250 via-transparent to-stone-950/30" />

            {/* Content */}
            <motion.div
                className="relative z-10 container mx-auto px-6 md:px-12 flex flex-col items-start"
                initial="hidden"
                animate="visible"
                variants={containerVariants}
            >
                <motion.div variants={itemVariants} className="flex items-center gap-4 mb-6">
                    <div className="h-px w-12 bg-amber-500/50" />
                    <span className="text-amber-500 uppercase tracking-widest text-xs md:text-sm font-semibold">
                        Our Expertise
                    </span>
                </motion.div>

                <motion.h1
                    className="text-6xl md:text-8xl lg:text-9xl font-light text-white leading-none tracking-tighter mb-8"
                    variants={itemVariants}
                >
                    Exquisite <br />
                    <span className="font-serif italic text-amber-200/90 ml-4 md:ml-12">Services</span>
                </motion.h1>

                <motion.div
                    variants={lineVariants}
                    className="h-px bg-gradient-to-r from-amber-500/50 via-amber-500/20 to-transparent mb-8 max-w-2xl"
                />

                <motion.p
                    className="max-w-xl text-lg md:text-xl text-stone-400 font-light leading-relaxed mb-12"
                    variants={itemVariants}
                >
                    From conceptual sketches to the final touch of elegance.
                    We provide comprehensive interior design solutions tailored
                    to your unique lifestyle and aspirations.
                </motion.p>

                <motion.div variants={itemVariants} className="flex items-center gap-8">
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="group relative px-10 py-5 bg-amber-600 text-white overflow-hidden transition-all duration-300 hover:shadow-[0_20px_40px_-10px_rgba(195,136,34,0.5)] rounded-sm"
                    >
                        <span className="relative z-10 uppercase tracking-[0.2em] text-[10px] md:text-xs font-bold transition-transform duration-500 group-hover:translate-x-1 inline-block">Explore Our Work</span>
                        <div className="absolute inset-0 bg-stone-900 translate-y-full group-hover:translate-y-0 transition-transform duration-[600ms] ease-[0.22,1,0.36,1]" />
                    </motion.button>

                    <motion.div
                        variants={itemVariants}
                        className="hidden sm:flex items-center gap-4 text-stone-500 group cursor-pointer hover:text-amber-500 transition-all duration-500"
                    >
                        <div className="p-3 border border-stone-800 rounded-full group-hover:border-amber-500/50 group-hover:bg-amber-500/5 transition-all duration-500">
                            <MousePointer2 size={14} className="group-hover:rotate-12 transition-transform duration-500" />
                        </div>
                        <span className="text-[10px] uppercase tracking-[0.3em] font-bold">Scroll to discover</span>
                    </motion.div>
                </motion.div>
            </motion.div>

            {/* Side Branding */}
            <div className="absolute right-12 bottom-24 hidden lg:block overflow-hidden h-32">
                <motion.div
                    initial={{ y: "100%" }}
                    animate={{ y: 0 }}
                    transition={{ duration: 1, delay: 1.2 }}
                    className="[writing-mode:vertical-lr] text-[10px] uppercase tracking-[0.5em] text-stone-600 font-medium"
                >
                    Indepth Studio &copy; 2024
                </motion.div>
            </div>
        </section>
    );
}
