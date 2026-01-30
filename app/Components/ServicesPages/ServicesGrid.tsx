'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';
import { servicesData } from '@/app/services/servicesData';

export default function ServicesGrid() {
    return (
        <section className="py-24 bg-stone-50">
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
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="text-4xl md:text-6xl font-light text-stone-900 leading-tight"
                        >
                            Tailored Solutions <br />
                            <span className="font-serif italic text-stone-500">for Exceptional Living</span>
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

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
                    {servicesData.map((service, index) => (
                        <motion.div
                            key={service.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            className="group relative bg-white rounded-3xl overflow-hidden border border-stone-200 hover:border-amber-200 transition-colors duration-500 shadow-sm hover:shadow-xl"
                        >
                            {/* Card Image */}
                            <div className="relative h-64 overflow-hidden">
                                <Image
                                    src={service.image}
                                    alt={service.title}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-stone-900/10 group-hover:bg-amber-900/20 transition-colors duration-500" />
                            </div>

                            {/* Card Content */}
                            <div className="p-8">
                                <h3 className="text-2xl font-medium text-stone-900 mb-3 group-hover:text-amber-600 transition-colors">
                                    {service.title}
                                </h3>
                                <p className="text-stone-500 font-light text-sm leading-relaxed mb-8 line-clamp-2">
                                    {service.shortDescription}
                                </p>

                                <Link
                                    href={`/services/${service.id}`}
                                    scroll={false}
                                    className="inline-flex items-center gap-2 text-stone-900 font-bold text-xs uppercase tracking-widest group/btn hover:text-amber-600 transition-colors"
                                >
                                    View Details
                                    <div className="w-8 h-8 rounded-full bg-stone-100 flex items-center justify-center group-hover/btn:bg-amber-600 group-hover/btn:text-white transition-all">
                                        <ArrowRight size={14} className="group-hover/btn:translate-x-0.5 transition-transform" />
                                    </div>
                                </Link>
                            </div>

                            {/* Decorative Corner */}
                            <div className="absolute top-0 right-0 w-24 h-24 bg-amber-600/5 -rotate-45 translate-x-12 -translate-y-12 rounded-full blur-2xl group-hover:bg-amber-600/10 transition-colors" />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
