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
        <section className="py-24 md:py-32 bg-white overflow-hidden">
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

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-16">
                    {services.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.4 + (index * 0.2) }}
                            className="group relative"
                        >
                            <div className="relative z-10 p-10 rounded-3xl bg-stone-50 transition-all duration-500 group-hover:bg-white group-hover:shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-stone-100 group-hover:border-amber-100 flex flex-col h-full">
                                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mb-8 shadow-sm group-hover:bg-amber-600 group-hover:text-white transition-all duration-500 rotate-3 group-hover:rotate-0">
                                    <item.icon className="w-8 h-8 text-amber-600 group-hover:text-white transition-colors duration-500" />
                                </div>

                                <h3 className="text-2xl font-medium text-stone-900 mb-4 group-hover:text-amber-600 transition-colors">
                                    {item.title}
                                </h3>

                                <p className="text-stone-500 font-light leading-relaxed mb-6 flex-grow">
                                    {item.desc}
                                </p>

                                <div className="flex items-center text-amber-600 font-semibold text-sm tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-all duration-500 translate-x-[-10px] group-hover:translate-x-0">
                                    Learn More <span className="ml-2">→</span>
                                </div>
                            </div>

                            {/* Decorative background element */}
                            <div className="absolute top-4 left-4 right-4 bottom-4 bg-amber-600/5 rounded-3xl -z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-2xl" />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
