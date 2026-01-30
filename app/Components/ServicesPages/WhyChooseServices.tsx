'use client';

import { motion, Variants } from 'framer-motion';
import {
    Users,
    PencilRuler,
    Crown,
    Clock,
    ShieldCheck,
    Heart,
    Sparkles,
    LucideIcon,
} from 'lucide-react';

/* -----------------------------
   Types
------------------------------*/

interface Reason {
    icon: LucideIcon;
    title: string;
    desc: string;
    number: string;
}

/* -----------------------------
   Variants (TS SAFE)
------------------------------*/

const sectionVariant: Variants = {
    hidden: {
        opacity: 0,
        scale: 0.96,
        filter: 'blur(8px)',
    },
    visible: {
        opacity: 1,
        scale: 1,
        filter: 'blur(0px)',
        transition: {
            duration: 1.4,
            ease: [0.22, 1, 0.36, 1],
        },
    },
};

const cardVariant: Variants = {
    hidden: {
        opacity: 0,
        y: 60,
        filter: 'blur(10px)',
    },
    visible: (index: number) => ({
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        transition: {
            duration: 1.3,
            delay: index * 0.12,
            ease: [0.22, 1, 0.36, 1],
        },
    }),
};

const hoverLift: Variants = {
    hover: {
        y: -10,
        transition: {
            duration: 0.9,
            ease: [0.22, 1, 0.36, 1],
        },
    },
};

/* -----------------------------
   Data
------------------------------*/

const reasons: Reason[] = [
    {
        icon: Users,
        title: 'Experienced Designers',
        desc: 'A collective of visionary architects and designers with decades of luxury expertise.',
        number: '01',
    },
    {
        icon: PencilRuler,
        title: 'Custom Solutions',
        desc: 'Bespoke spatial narratives tailored to your lifestyle.',
        number: '02',
    },
    {
        icon: Crown,
        title: 'Quality Materials',
        desc: 'Only the finest and most durable materials are selected.',
        number: '03',
    },
    {
        icon: Clock,
        title: 'Precision Timelines',
        desc: 'Structured project planning with on-time delivery.',
        number: '04',
    },
    {
        icon: ShieldCheck,
        title: 'Transparent Integrity',
        desc: 'Clear communication and honest budgeting.',
        number: '05',
    },
    {
        icon: Heart,
        title: 'After-service Care',
        desc: 'Long-term support for every completed project.',
        number: '06',
    },
];

/* -----------------------------
   Component
------------------------------*/

export default function WhyChooseServices() {
    return (
        <section className="relative py-32 md:py-48 bg-[#FDF8F3] overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
                {/* Header */}
                <motion.div
                    variants={sectionVariant}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="max-w-4xl mx-auto text-center mb-28"
                >
                    <div className="inline-flex items-center gap-4 mb-8">
                        <span className="h-px w-10 bg-amber-600/30" />
                        <span className="uppercase tracking-[0.45em] text-[11px] text-amber-600 font-semibold">
                            The Standard of Excellence
                        </span>
                        <span className="h-px w-10 bg-amber-600/30" />
                    </div>

                    <h2 className="text-5xl md:text-7xl lg:text-8xl font-light text-stone-900 mb-10">
                        Elevating the Art <br />
                        <span className="font-serif italic text-stone-500">
                            of Living
                        </span>
                    </h2>

                    <p className="text-stone-500 text-lg md:text-xl font-light leading-relaxed">
                        We design refined, intentional spaces that feel timeless and personal.
                    </p>
                </motion.div>

                {/* Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {reasons.map((item, index) => (
                        <motion.div
                            key={item.number}
                            variants={cardVariant}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            custom={index}
                        >
                            <motion.div
                                variants={hoverLift}
                                whileHover="hover"
                                className="group relative h-full p-12 rounded-[3.5rem] bg-white border border-stone-100
                           overflow-hidden shadow-[0_25px_50px_-25px_rgba(0,0,0,0.15)]
                           hover:shadow-[0_70px_140px_-35px_rgba(0,0,0,0.12)]
                           hover:border-amber-200/40 transition-all"
                            >
                                {/* Number */}
                                <span className="absolute -top-6 -right-6 text-[11rem] font-bold text-stone-900/[0.015]
                                 group-hover:text-amber-600/[0.03]
                                 transition-colors duration-1000 select-none">
                                    {item.number}
                                </span>

                                {/* Icon */}
                                <div className="relative mb-14">
                                    <div className="absolute inset-0 bg-amber-600/10 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition duration-1000" />
                                    <div className="w-16 h-16 rounded-2xl bg-stone-50 border border-stone-100
                                  flex items-center justify-center relative z-10
                                  group-hover:bg-amber-600 group-hover:-translate-y-1
                                  transition-all duration-700">
                                        <item.icon
                                            className="w-7 h-7 text-amber-600 group-hover:text-white transition duration-700"
                                            strokeWidth={1.1}
                                        />
                                    </div>
                                </div>

                                {/* Text */}
                                <div className="space-y-4 relative z-10">
                                    <h3 className="text-2xl font-medium text-stone-900 group-hover:text-amber-700 transition-colors">
                                        {item.title}
                                    </h3>
                                    <p className="text-stone-500 font-light leading-relaxed text-lg">
                                        {item.desc}
                                    </p>
                                </div>

                                {/* Accent line */}
                                <div className="absolute bottom-0 left-0 h-[2px] w-0 group-hover:w-full
                                bg-gradient-to-r from-amber-600/40 to-amber-600/80
                                transition-all duration-[1200ms]
                                ease-[cubic-bezier(.22,1,.36,1)]" />
                            </motion.div>
                        </motion.div>
                    ))}
                </div>

                {/* Footer badge */}
                <div className="mt-24 flex justify-center">
                    <div className="flex items-center gap-4 py-4 px-10 bg-stone-900 rounded-full
                          text-white/90 text-xs tracking-[0.35em] uppercase">
                        <Sparkles size={14} className="text-amber-400" />
                        <span>The In-Depth Standard</span>
                        <Sparkles size={14} className="text-amber-400" />
                    </div>
                </div>
            </div>
        </section>
    );
}
