'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';
import { servicesData } from '@/app/services/servicesData';
import MagneticButton from '../MagneticButton';

export default function ServicesGrid() {
    return (
        <section className="py-24 bg-[#FDF8F3]">
            <div className="container mx-auto px-6 md:px-12">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
                    <div className="max-w-2xl">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="flex items-center gap-3 text-amber-600 mb-4"
                        >
                            <Sparkles size={18} />
                            <span className="uppercase tracking-[0.2em] text-xs font-bold">Our Core Expertise</span>
                        </motion.div>
                        <motion.h2
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.1 }}
                            className="text-4xl md:text-6xl font-light text-stone-900 leading-tight"
                        >
                            <div className="overflow-hidden h-fit">
                                <motion.span
                                    initial={{ y: "100%" }}
                                    whileInView={{ y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                                    className="block"
                                >
                                    Tailored Solutions
                                </motion.span>
                            </div>
                            <div className="overflow-hidden h-fit">
                                <motion.span
                                    initial={{ y: "100%" }}
                                    whileInView={{ y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
                                    className="block font-serif italic text-stone-500"
                                >
                                    for Exceptional Living
                                </motion.span>
                            </div>
                        </motion.h2>
                    </div>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="hidden md:block"
                    >
                        <p className="text-stone-500 max-w-xs text-sm leading-relaxed">
                            Every project is a unique journey. We provide end-to-end
                            design and execution services to bring your vision to life.
                        </p>
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
                    {servicesData.map((service, index) => (
                        <motion.div
                            key={service.id}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: index * 0.1, ease: [0.21, 1.11, 0.81, 0.99] }}
                            className="group relative"
                            style={{ perspective: 1000 }}
                        >
                            <motion.div
                                whileHover={{ rotateX: 5, rotateY: -5, y: -10 }}
                                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                className="relative bg-white rounded-[3rem] overflow-hidden border border-stone-100 hover:border-amber-200/50 transition-colors duration-500 shadow-[0_10px_30px_-15px_rgba(0,0,0,0.05)] hover:shadow-[0_25px_60px_-15px_rgba(0,0,0,0.1)] h-full flex flex-col"
                            >
                                {/* Card Image with Parallax Scale */}
                                <div className="relative h-72 overflow-hidden">
                                    <Image
                                        src={service.image}
                                        alt={service.title}
                                        fill
                                        className="object-cover transition-transform duration-1000 ease-out group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-stone-900/10 group-hover:bg-amber-900/20 transition-colors duration-700" />

                                    {/* Glass Overlay Tag */}
                                    <div className="absolute top-6 left-6 px-4 py-2 bg-white/20 backdrop-blur-md rounded-full border border-white/30 text-[10px] uppercase font-bold tracking-widest text-white">
                                        Premium Service
                                    </div>
                                </div>

                                {/* Card Content */}
                                <div className="p-10 flex flex-col flex-grow">
                                    <div className="mb-6">
                                        <h3 className="text-2xl font-medium text-stone-900 mb-4 group-hover:text-amber-600 transition-colors duration-300">
                                            {service.title}
                                        </h3>
                                        <div className="h-0.5 w-12 bg-amber-600/30 group-hover:w-24 transition-all duration-500" />
                                    </div>

                                    <p className="text-stone-500 font-light text-base leading-relaxed mb-10 line-clamp-3">
                                        {service.shortDescription}
                                    </p>

                                    <div className="mt-auto">
                                        <MagneticButton strength={0.4}>
                                            <Link
                                                href={`/services/${service.id}`}
                                                scroll={false}
                                                className="group/btn inline-flex items-center gap-4 text-stone-900 group-hover:text-amber-600 transition-colors duration-300"
                                            >
                                                <span className="text-xs uppercase font-bold tracking-[0.2em]">Explore Details</span>
                                                <div className="relative w-10 h-10 rounded-full border border-stone-200 flex items-center justify-center group-hover/btn:border-amber-600 group-hover/btn:bg-amber-600 group-hover/btn:text-white transition-all duration-500">
                                                    <ArrowRight size={16} className="group-hover/btn:translate-x-0.5 transition-transform" />
                                                </div>
                                            </Link>
                                        </MagneticButton>
                                    </div>
                                </div>

                                {/* Unique Design Element: Vertical Text */}
                                <div className="absolute top-[280px] right-4 pointer-events-none origin-bottom-right -rotate-90">
                                    <span className="text-[10px] uppercase tracking-[0.4em] text-stone-200 font-bold opacity-0 group-hover:opacity-100 transition-all duration-700 translate-y-4 group-hover:translate-y-0 text-nowrap">
                                        Exclusive Craftsmanship
                                    </span>
                                </div>
                            </motion.div>
                        </motion.div>
                    ))}
                </div>

            </div>
        </section>
    );
}
