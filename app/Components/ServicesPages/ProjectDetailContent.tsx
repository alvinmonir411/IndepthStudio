'use client';

import React, { useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { MapPin, Calendar, Tag, ArrowRight, Expand } from 'lucide-react';
import { Project } from '@/app/projects/projectsData';

interface ProjectDetailProps {
    project: Project;
}


export default function ProjectDetailContent({ project }: ProjectDetailProps) {
    return (
        <div className="w-full">
            {/* Hero Section */}
            <section className="relative h-[85vh] w-full overflow-hidden flex items-end pb-24 px-6 md:px-12">
                <motion.div
                    initial={{ scale: 1.1 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="absolute inset-0 z-0"
                >
                    <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/20 to-transparent" />
                </motion.div>

                <div className="relative z-10 max-w-7xl mx-auto w-full">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.5 }}
                    >
                        <span className="inline-block px-5 py-2 rounded-full border border-white/30 text-[10px] font-bold uppercase tracking-[0.3em] text-white bg-white/10 backdrop-blur-md mb-8">
                            {project.category}
                        </span>
                        <h1 className="text-6xl md:text-[10rem] font-light text-white leading-[0.85] tracking-tighter mb-4">
                            {project.title.split(' ')[0]} <br />
                            <span className="font-serif italic text-amber-500">{project.title.split(' ').slice(1).join(' ')}</span>
                        </h1>
                        <p className="text-stone-300 text-lg md:text-2xl font-light max-w-2xl leading-relaxed">
                            {project.caption}
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Details & Content Section */}
            <section className="bg-[#FDF8F3] py-24 md:py-40 px-6 md:px-12 relative z-10 -mt-10 rounded-t-[4rem] shadow-[0_-50px_100px_-20px_rgba(0,0,0,0.3)]">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
                        {/* Summary */}
                        <div className="lg:col-span-8">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8 }}
                            >
                                <div className="flex items-center gap-4 mb-12">
                                    <div className="w-12 h-px bg-amber-600" />
                                    <span className="text-xs uppercase tracking-[0.4em] font-bold text-amber-600">The Vision</span>
                                </div>

                                <h2 className="text-4xl md:text-6xl font-light text-stone-900 leading-tight mb-16 tracking-tight">
                                    {project.visionTitle}
                                </h2>

                                <div className="prose prose-stone prose-xl max-w-none text-stone-600 font-light leading-relaxed mb-16 space-y-8">
                                    {project.fullDescription.map((p, i) => (
                                        <p key={i}>{p}</p>
                                    ))}
                                </div>

                                <div className="flex flex-wrap gap-6 pt-8">
                                    {project.walkthroughUrl && (
                                        <Link
                                            href={`/projects/${project.id}/walkthrough`}
                                            className="group flex items-center justify-center gap-4 px-12 py-6 rounded-full transition-all duration-500 shadow-2xl bg-stone-950 text-white hover:bg-amber-600"
                                        >
                                            <Expand size={20} />
                                            <span className="uppercase tracking-[0.2em] text-xs font-bold">
                                                Launch 3D Tour
                                            </span>
                                        </Link>
                                    )}
                                    <button className="group flex items-center justify-center gap-4 border border-stone-200 text-stone-900 px-12 py-6 rounded-full hover:bg-stone-900 hover:text-white transition-all duration-500">
                                        <span className="uppercase tracking-[0.2em] text-xs font-bold">Inquire About This Design</span>
                                        <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                                    </button>
                                </div>
                            </motion.div>
                        </div>

                        {/* Specs */}
                        <div className="lg:col-span-4 lg:pl-16">
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8 }}
                                className="space-y-16 h-fit sticky top-40"
                            >
                                <div className="space-y-12">
                                    <div className="flex items-start gap-6">
                                        <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center shadow-lg border border-stone-100 shrink-0">
                                            <MapPin size={22} className="text-amber-600" />
                                        </div>
                                        <div>
                                            <p className="text-[10px] uppercase tracking-widest text-stone-400 font-bold mb-1">Location</p>
                                            <p className="text-2xl text-stone-900 font-light tracking-tight">{project.location}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-6">
                                        <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center shadow-lg border border-stone-100 shrink-0">
                                            <Calendar size={22} className="text-amber-600" />
                                        </div>
                                        <div>
                                            <p className="text-[10px] uppercase tracking-widest text-stone-400 font-bold mb-1">Completion</p>
                                            <p className="text-2xl text-stone-900 font-light tracking-tight">{project.year}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-6">
                                        <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center shadow-lg border border-stone-100 shrink-0">
                                            <Tag size={22} className="text-amber-600" />
                                        </div>
                                        <div>
                                            <p className="text-[10px] uppercase tracking-widest text-stone-400 font-bold mb-1">Category</p>
                                            <p className="text-2xl text-stone-900 font-light tracking-tight">{project.category}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="pt-16 border-t border-stone-200">
                                    <p className="text-[10px] uppercase tracking-widest text-stone-400 font-bold mb-8">Selected Palette</p>
                                    <div className="grid grid-cols-1 gap-4">
                                        {project.palette.map((m) => (
                                            <div key={m} className="flex items-center gap-4 group">
                                                <div className="w-1.5 h-1.5 rounded-full bg-amber-600 group-hover:scale-150 transition-transform" />
                                                <span className="text-xs uppercase tracking-[0.2em] text-stone-600 font-medium">
                                                    {m}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Visual Gallery Section */}
            <section className="py-24 md:py-40 px-6 md:px-12 bg-white">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
                        <div>
                            <div className="flex items-center gap-4 mb-8">
                                <div className="w-12 h-px bg-amber-600" />
                                <span className="text-xs uppercase tracking-[0.4em] font-bold text-amber-600">Spatial Narrative</span>
                            </div>
                            <h2 className="text-4xl md:text-6xl font-light text-stone-900 leading-tight tracking-tight">
                                Visualizing the <br />
                                <span className="font-serif italic text-stone-500">Fine Details</span>
                            </h2>
                        </div>
                        <p className="text-stone-500 max-w-sm text-sm leading-relaxed mb-2">
                            A curated selection of perspectives that capture the essence,
                            texture, and spatial flow of the design at different times of day.
                        </p>
                    </div>

                    {/* Masonry Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 auto-rows-[300px] md:auto-rows-[400px]">
                        {project.gallery.map((img, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, delay: i * 0.1 }}
                                className={`relative rounded-[2.5rem] overflow-hidden group shadow-xl ${i === 0 ? 'md:col-span-2 md:row-span-2' :
                                        i === 3 ? 'md:col-span-2' : ''
                                    }`}
                            >
                                <Image
                                    src={img}
                                    alt={`${project.title} gallery ${i + 1}`}
                                    fill
                                    className="object-cover transition-transform duration-1000 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-stone-900/0 group-hover:bg-stone-900/20 transition-colors duration-700" />

                                {/* Image Overlay Info */}
                                <div className="absolute bottom-10 left-10 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                                    <span className="text-[10px] uppercase tracking-[0.4em] text-white font-bold bg-white/10 backdrop-blur-md px-5 py-2 rounded-full border border-white/20">
                                        Perspective {i + 1}
                                    </span>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
