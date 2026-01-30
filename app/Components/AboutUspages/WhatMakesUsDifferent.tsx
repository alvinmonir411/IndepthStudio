"use client";

import { motion } from "framer-motion";
import { CheckCircle, Sparkles, ChevronRight } from "lucide-react";

const features = [
    {
        title: "Bespoke Design Process",
        desc: "Every project starts with your vision, crafted into reality through our signature collaborative approach."
    },
    {
        title: "Artisan Materials",
        desc: "Only premium, sustainable materials sourced globally for timeless quality and elegance."
    },
    {
        title: "Precision Timeline",
        desc: "Architectural-grade project management ensures every milestone met with perfection."
    },
];

const WhatMakesUsDifferent: React.FC = () => {
    return (
        <section className="relative bg-gradient-to-br from-amber-50/80 via-white to-slate-50/50 py-32 px-6 lg:px-24 overflow-hidden">
            {/* Animated background elements */}
            <div className="absolute inset-0">
                <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-amber-200/20 rounded-full blur-3xl animate-[float_6s_ease-in-out_infinite]" />
                <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-white/30 rounded-full blur-3xl animate-[float_8s_ease-in-out_infinite_reverse]" />
            </div>

            <div className="relative z-20 max-w-7xl mx-auto">
                {/* HERO TYPOGRAPHY - Split Design */}
                <div className="text-center mb-28 lg:mb-36">
                    <motion.h2
                        className="text-[4rem] lg:text-[6.5rem] xl:text-[8rem] font-black uppercase tracking-[-0.05em] leading-[0.85] bg-gradient-to-r from-amber-600 via-amber-500 to-orange-500 text-transparent bg-clip-text drop-shadow-2xl"
                        initial={{ opacity: 0, y: 60 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        WHAT SETS US
                    </motion.h2>
                    <motion.div
                        className="text-[4rem] lg:text-[6.5rem] xl:text-[8rem] font-black uppercase tracking-[-0.05em] leading-[0.85] bg-gradient-to-r from-slate-900 via-black to-slate-900 text-transparent bg-clip-text drop-shadow-2xl mt-[-2rem]"
                        initial={{ opacity: 0, y: 60 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        viewport={{ once: true }}
                    >
                        APART
                    </motion.div>
                    <div className="w-28 h-1 bg-gradient-to-r from-amber-600 to-orange-500 mx-auto mt-16 rounded-full shadow-lg" />
                </div>

                {/* UNCOMMON ASYMMETRIC LAYOUT */}
                <div className="grid lg:grid-cols-12 gap-16 lg:gap-24 items-center">

                    {/* LEFT: Feature Cards */}
                    <motion.div className="lg:col-span-7 space-y-8 lg:pr-16">
                        {features.map((feature, idx) => (
                            <motion.div
                                key={idx}
                                className="group relative overflow-hidden bg-white/70 backdrop-blur-xl border border-white/50 rounded-4xl p-10 lg:p-12 shadow-2xl hover:shadow-[0_50px_100px_rgba(245,158,11,0.3)] transition-all duration-1000 cursor-pointer hover:bg-white/90"
                                initial={{ opacity: 0, x: -60 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.8, delay: idx * 0.2 }}
                                viewport={{ once: true }}
                                whileHover={{
                                    x: 20,
                                    scale: 1.02
                                }}
                            >
                                {/* Animated background reveal */}
                                <div className="absolute inset-0 bg-gradient-to-r from-amber-500/10 to-transparent rounded-4xl -skew-x-3 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                                <div className="relative z-10 flex items-start gap-6">
                                    {/* Icon Container */}
                                    <motion.div
                                        className="flex-shrink-0 w-20 h-20 bg-gradient-to-br from-amber-500 to-orange-500 rounded-3xl flex items-center justify-center shadow-2xl border-4 border-white/30 group-hover:scale-110 transition-all duration-700"
                                        whileHover={{ rotate: 360 }}
                                        transition={{ duration: 0.6 }}
                                    >
                                        <Sparkles className="w-8 h-8 text-white drop-shadow-lg" />
                                    </motion.div>

                                    <div className="flex-1 min-w-0">
                                        <h4 className="text-2xl lg:text-3xl font-black text-slate-900 mb-4 leading-tight group-hover:text-amber-600 transition-colors">
                                            {feature.title}
                                        </h4>
                                        <p className="text-xl text-slate-600 leading-relaxed font-light group-hover:text-slate-700">
                                            {feature.desc}
                                        </p>
                                        <div className="flex items-center gap-2 mt-6 pt-6 border-t border-amber-100 opacity-0 group-hover:opacity-100 transition-all duration-500">
                                            <ChevronRight className="w-5 h-5 text-amber-500 group-hover:translate-x-2 transition-transform" />
                                            <span className="text-sm font-semibold text-amber-600 uppercase tracking-wider">Learn More</span>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>

                    {/* RIGHT: Visual Hierarchy */}
                    <motion.div
                        className="lg:col-span-5 relative lg:-mr-24"
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1 }}
                        viewport={{ once: true }}
                    >
                        {/* Main visual card */}
                        <div className="relative bg-gradient-to-br from-amber-500/90 via-amber-400/90 to-orange-500/90 backdrop-blur-xl border-4 border-white/40 rounded-5xl p-12 shadow-[0_80px_200px_rgba(245,158,11,0.4)] hover:shadow-[0_100px_250px_rgba(245,158,11,0.5)] transition-all duration-1000">
                            <div className="absolute top-6 right-8 w-24 h-24 bg-white/20 rounded-3xl backdrop-blur-xl flex items-center justify-center animate-pulse">
                                <CheckCircle className="w-12 h-12 text-amber-600 drop-shadow-lg" />
                            </div>
                            <h3 className="text-4xl font-black text-white mb-6 drop-shadow-2xl leading-tight">
                                Our Promise
                            </h3>
                            <ul className="space-y-4 text-xl text-white/95 font-light drop-shadow-xl">
                                <li className="flex items-center gap-3">
                                    <div className="w-2 h-2 bg-white rounded-full animate-ping" />
                                    Transparent communication
                                </li>
                                <li className="flex items-center gap-3">
                                    <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                                    Lifetime design support
                                </li>
                                <li className="flex items-center gap-3">
                                    <div className="w-2 h-2 bg-white rounded-full" />
                                    100% client satisfaction
                                </li>
                            </ul>
                        </div>

                        {/* Floating accent */}
                        <div className="absolute -top-12 -right-12 w-32 h-32 bg-gradient-to-r from-amber-400/30 to-transparent rounded-full blur-xl animate-[spin_20s_linear_infinite]" />
                    </motion.div>
                </div>
            </div>

            <style jsx>{`
                @keyframes float {
                    0%, 100% { transform: translateY(0px) rotate(0deg); }
                    50% { transform: translateY(-20px) rotate(180deg); }
                }
                @keyframes spin {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
            `}</style>
        </section>
    );
};

export default WhatMakesUsDifferent;
