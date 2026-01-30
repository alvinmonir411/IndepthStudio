'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { X, MapPin, Calendar, Tag, ArrowRight } from 'lucide-react';

interface ProjectDetailProps {
    project: {
        id: number;
        title: string;
        caption: string;
        image: string;
        category: string;
    };
}

export default function ProjectDetailContent({ project }: ProjectDetailProps) {
    return (
        <div className="bg-white rounded-[3rem] overflow-hidden max-w-6xl w-full mx-auto shadow-2xl">
            <div className="flex flex-col lg:flex-row">
                {/* Image Section */}
                <div className="lg:w-3/5 relative h-[400px] lg:h-auto overflow-hidden">
                    <motion.div
                        initial={{ scale: 1.1 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                        className="h-full w-full"
                    >
                        <Image
                            src={project.image}
                            alt={project.title}
                            fill
                            className="object-cover"
                        />
                    </motion.div>
                </div>

                {/* Content Section */}
                <div className="lg:w-2/5 p-10 md:p-16 flex flex-col justify-between bg-[#FDF8F3]">
                    <div>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="flex items-center gap-4 mb-8"
                        >
                            <span className="px-4 py-1.5 rounded-full border border-amber-600/30 text-[10px] font-bold uppercase tracking-widest text-amber-600">
                                {project.category}
                            </span>
                        </motion.div>

                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="text-4xl md:text-5xl font-light text-stone-900 leading-tight mb-6"
                        >
                            {project.title}
                        </motion.h2>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="text-stone-500 text-lg font-light leading-relaxed mb-10"
                        >
                            {project.caption}
                        </motion.p>

                        <div className="space-y-6 border-t border-stone-200 pt-10">
                            <div className="flex items-center gap-4">
                                <MapPin size={18} className="text-amber-600" />
                                <div>
                                    <p className="text-[10px] uppercase tracking-widest text-stone-400 font-bold">Location</p>
                                    <p className="text-stone-900 font-medium">Bespoke Interior, Global</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <Calendar size={18} className="text-amber-600" />
                                <div>
                                    <p className="text-[10px] uppercase tracking-widest text-stone-400 font-bold">Year</p>
                                    <p className="text-stone-900 font-medium">2024</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <Tag size={18} className="text-amber-600" />
                                <div>
                                    <p className="text-[10px] uppercase tracking-widest text-stone-400 font-bold">Concept</p>
                                    <p className="text-stone-900 font-medium">Contemporary Elegance</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="mt-12"
                    >
                        <button className="group flex items-center gap-4 bg-stone-900 text-white px-8 py-4 rounded-full hover:bg-amber-600 transition-all duration-300">
                            <span className="uppercase tracking-widest text-xs font-bold">Request Similar Design</span>
                            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                        </button>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
