'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { Users, Palette, Box, Hammer, Award, Sparkles, MoveRight } from 'lucide-react';
import { useRef } from 'react';
import MagneticButton from '../MagneticButton';
import Link from 'next/link';

const steps = [
    {
        number: "01",
        title: "The Consultation",
        subtitle: "Deep Vision & Discovery",
        icon: Users,
        image: "/process/consultation.jpg",
        desc: "We begin by inhabiting your world. Through an intensive dialog, we uncover the unspoken needs and aesthetic aspirations that will form the spine of your project.",
        accent: "text-amber-500",
        bg: "bg-[#FDF8F3]",
        link: "/contact"
    },
    {
        number: "02",
        title: "Design Planning",
        subtitle: "Spatial Poetry & Blueprints",
        icon: Palette,
        image: "/process/planning.jpg",
        desc: "Where math meets art. Our team develops the conceptual framework, spatial flow, and material palettes that bring structural rhythm to your vision.",
        accent: "text-amber-400",
        bg: "bg-[#FDF8F3]",
        link: "/services/residential-design"
    },
    {
        number: "03",
        title: "3D Visualization",
        subtitle: "Virtual Materialization",
        icon: Box,
        image: "/process/visualization.jpg",
        desc: "Experience the future before it exists. Photorealistic renders and virtual walkthroughs allow us to refine every light beam and texture with absolute precision.",
        accent: "text-amber-300",
        bg: "bg-[#FDF8F3]",
        link: "/services/3d-visualization"
    },
    {
        number: "04",
        title: "The Execution",
        subtitle: "Uncompromising Craft",
        icon: Hammer,
        image: "/process/execution.jpg",
        desc: "Precision engineering. Our master craftsmen and site architects work in perfect synchronization to realize the design with zero-tolerance to error.",
        accent: "text-amber-500",
        bg: "bg-[#FDF8F3]",
        link: "/services/renovation-remodeling"
    },
    {
        number: "05",
        title: "Final Handover",
        subtitle: "The Signature Reveal",
        icon: Award,
        image: "/process/handover.jpg",
        desc: "The white-glove transformation. We unveil a living masterpiece—meticulously curated, perfectly styled, and ready for its new story to begin.",
        accent: "text-amber-600",
        bg: "bg-[#FDF8F3]",
        link: "/services/turnkey-solutions"
    },
];

export default function DesignProcess() {
    const containerRef = useRef(null);

    return (
        <section ref={containerRef} className="relative bg-[#FDF8F3]">
            {/* Immersive Background Grid (Blueprint) */}
            <div className="fixed inset-0 pointer-events-none opacity-[0.1] z-0">
                <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
                            <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#E7E5E4" strokeWidth="1" />
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#grid)" />
                </svg>
            </div>

            {/* Content Sections */}
            <div className="relative">
                {steps.map((step, index) => (
                    <EditorialSection key={index} step={step} index={index} total={steps.length} />
                ))}
            </div>

        </section>
    );
}

const EditorialSection = ({ step, index, total }: { step: any; index: number; total: number }) => {
    const sectionRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start start", "end start"]
    });

    return (
        <div
            ref={sectionRef}
            className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden"
        >
            {/* Background Layer with transition */}
            <div className={`absolute inset-0 ${step.bg} transition-colors duration-1000`} />

            <div className="container mx-auto px-6 relative z-10">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Left Side: Editorial Content */}
                    <motion.div
                        initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className={`space-y-6 ${index % 2 === 0 ? 'lg:order-1' : 'lg:order-2'}`}
                    >
                        <div className="flex items-center gap-4">
                            <span className={`text-6xl font-bold opacity-20 ${step.accent}`}>
                                {step.number}
                            </span>
                            <div className="h-px w-12 bg-stone-200" />
                            <span className={`text-xs uppercase tracking-[0.4em] ${step.accent} font-semibold`}>
                                {step.subtitle}
                            </span>
                        </div>

                        <h2 className="text-4xl lg:text-7xl font-bold text-stone-900 tracking-tight leading-none">
                            {step.title.split(' ').map((word: string, i: number) => (
                                <span key={i} className="block">{word}</span>
                            ))}
                        </h2>

                        <p className="text-stone-600 text-lg max-w-md leading-relaxed">
                            {step.desc}
                        </p>

                        <div className="pt-4">
                            <MagneticButton strength={0.2}>
                                <Link
                                    href={step.link}
                                    className="flex items-center gap-3 text-stone-900 group/link"
                                >
                                    <span className="uppercase tracking-[0.2em] text-[10px] font-bold">Explore Phase</span>
                                    <div className="p-2 border border-stone-200 rounded-full group-hover/link:bg-amber-600 group-hover/link:border-amber-600 group-hover/link:text-white transition-all duration-500">
                                        <MoveRight size={14} />
                                    </div>
                                </Link>
                            </MagneticButton>
                        </div>
                    </motion.div>

                    {/* Right Side: Visual Image Element */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, rotate: index % 2 === 0 ? 2 : -2 }}
                        whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className={`flex justify-center relative ${index % 2 === 0 ? 'lg:order-2' : 'lg:order-1'}`}
                    >
                        <div className="relative group w-full max-w-2xl aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                            {/* The Image */}
                            <img
                                src={step.image}
                                alt={step.title}
                                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                            />

                            {/* Overlay Gradient */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                            {/* Floating Icon Overlay */}
                            <div className="absolute top-6 right-6 p-4 bg-white/40 backdrop-blur-md rounded-full border border-white/50">
                                <step.icon className={`w-8 h-8 ${step.accent}`} strokeWidth={1.5} />
                            </div>

                            {/* Glow effect */}
                            <div className={`absolute -inset-16 bg-gradient-to-tr from-amber-500/5 to-transparent rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none`} />
                        </div>

                        {/* Decorative Rings around the image container */}
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                            className="absolute -inset-4 border border-stone-200/50 rounded-[2rem] border-dashed pointer-events-none"
                        />
                    </motion.div>
                </div>
            </div>

            {/* Bottom Progress Bar (Scroll Triggered) */}
            <div className="absolute bottom-0 left-0 w-full h-1.5 bg-stone-200">
                <motion.div
                    className={`h-full bg-gradient-to-r from-amber-600 to-amber-300`}
                    style={{ scaleX: scrollYProgress, transformOrigin: "0%" }}
                />
            </div>

            {/* Subtle Vertical Numbering (Sidebar style) */}
            <div className={`absolute right-12 top-1/2 -translate-y-1/2 hidden xl:block text-[15rem] font-bold opacity-[0.05] pointer-events-none select-none ${step.accent}`}>
                {step.number}
            </div>
        </div>
    );
}
