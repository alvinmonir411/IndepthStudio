'use client';

import { motion } from 'framer-motion';
import { Home, Building2, Briefcase } from 'lucide-react';

export default function ServicesOverview() {
    const services = [
        {
            icon: Home,
            title: "Residential",
            desc: "Private residences that reflect personal stories and luxury living. We create homes that are as functional as they are beautiful."
        },
        {
            icon: Briefcase,
            title: "Office",
            desc: "Modern workspaces optimized for productivity, culture, and innovation. Designing environments where teams thrive."
        },
        {
            icon: Building2,
            title: "Commercial",
            desc: "Retail and hospitality venues designed for unforgettable brand experiences. Impactful spaces that drive engagement."
        }
    ];

    return (
        <section className="py-24 md:py-32 bg-[#FDF8F3] overflow-hidden">
            <div className="container mx-auto px-6 md:px-12">
                <div className="max-w-4xl mx-auto text-center mb-20">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <span className="text-amber-600 uppercase tracking-[0.3em] text-xs md:text-sm font-bold mb-6 block">
                            Our Scope of Expertise
                        </span>
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-4xl md:text-6xl font-light text-stone-900 mb-8 leading-[1.2] tracking-tight"
                    >
                        Creating Purposeful Spaces <br />
                        <span className="font-serif italic text-stone-500">for Every Need</span>
                    </motion.h2>

                    <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: "80px" }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.4 }}
                        className="h-1 bg-amber-600 mx-auto mb-10"
                    />

                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                        className="text-lg md:text-xl text-stone-600 leading-relaxed font-light max-w-3xl mx-auto"
                    >
                        At Indepth Studio, we provide comprehensive interior design solutions tailored
                        to your unique lifestyle and aspirations. Our approach combines aesthetic
                        brilliance with practical functionality, ensuring every project is a
                        masterpiece of form and purpose.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
                    {services.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.2 + (index * 0.1) }}
                            className="group relative"
                        >
                            <div className="relative z-10 p-12 rounded-[3.5rem] bg-white transition-all duration-700 group-hover:-translate-y-4 border border-stone-100 group-hover:border-amber-200/50 flex flex-col h-full shadow-[0_10px_40px_-20px_rgba(0,0,0,0.05)] hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.1)]">
                                {/* Unique Icon Container */}
                                <div className="relative w-20 h-20 mb-10">
                                    <div className="absolute inset-0 bg-amber-600/10 rounded-3xl rotate-12 group-hover:rotate-0 group-hover:bg-amber-600 transition-all duration-700" />
                                    <div className="relative w-full h-full bg-white rounded-3xl border border-stone-100 flex items-center justify-center shadow-sm group-hover:bg-amber-600 group-hover:border-amber-600 transition-all duration-700">
                                        <item.icon className="w-9 h-9 text-amber-600 group-hover:text-white transition-colors duration-700" />
                                    </div>

                                    {/* Liquid Glow Effect */}
                                    <div className="absolute -inset-4 bg-amber-600/20 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 -z-10" />
                                </div>

                                <h3 className="text-3xl font-medium text-stone-900 mb-6 group-hover:text-amber-600 transition-colors">
                                    {item.title}
                                </h3>

                                <p className="text-stone-500 font-light leading-relaxed text-lg mb-8 flex-grow">
                                    {item.desc}
                                </p>

                                <div className="pt-6 border-t border-stone-50">
                                    <div className="flex items-center gap-3 text-amber-600 font-bold text-xs tracking-[0.2em] uppercase">
                                        <span>Excellence Guaranteed</span>
                                        <div className="w-1.5 h-1.5 rounded-full bg-amber-600 animate-pulse" />
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

            </div>
        </section>
    );
}
