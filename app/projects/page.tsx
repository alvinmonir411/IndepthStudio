'use client';

import React from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight, Sparkles } from 'lucide-react';
import { projects, Project } from './projectsData';

export default function ProjectsPage() {
    const [activeCategory, setActiveCategory] = React.useState('All');

    // Get unique categories except for featured projects (to keep it relevant to the main grid)
    const categories = ['All', ...Array.from(new Set(projects.filter(p => !p.isFeatured).map(p => p.category)))];

    const filteredProjects = projects
        .filter(p => !p.isFeatured)
        .filter(p => activeCategory === 'All' || p.category === activeCategory);

    return (
        <main className="min-h-screen bg-[#FDF8F3] pt-32 pb-24">
            <div className="container mx-auto px-6">
                {/* Header */}
                <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-24 gap-12">
                    <div className="max-w-2xl">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="flex items-center gap-3 text-amber-600 mb-6"
                        >
                            <Sparkles size={18} />
                            <span className="uppercase tracking-[0.4em] text-xs font-bold">The Portfolio</span>
                        </motion.div>
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-6xl md:text-8xl font-light text-stone-900 leading-none tracking-tight mb-8"
                        >
                            Selected <span className="font-serif italic text-stone-500">Masterpieces</span>
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="text-stone-600 text-lg md:text-xl font-light max-w-xl leading-relaxed"
                        >
                            A curated collection of our most ambitious projects, ranging from minimalist residential
                            sanctuaries to cutting-edge commercial hubs.
                        </motion.p>
                    </div>

                    {/* Filter Bar */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="flex flex-wrap gap-4"
                    >
                        {categories.map((category) => (
                            <button
                                key={category}
                                onClick={() => setActiveCategory(category)}
                                className={`px-8 py-3 rounded-full text-[10px] uppercase tracking-[0.3em] font-bold transition-all duration-500 border ${activeCategory === category
                                    ? 'bg-amber-600 text-white border-amber-600 shadow-xl'
                                    : 'bg-white/50 text-stone-400 border-stone-100 hover:border-amber-200 hover:text-stone-600'
                                    }`}
                            >
                                {category}
                            </button>
                        ))}
                    </motion.div>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-24 md:gap-y-32 min-h-[60vh]">
                    <AnimatePresence mode="popLayout">
                        {filteredProjects.map((project, index) => (
                            <ProjectCard key={project.id} project={project} index={index} />
                        ))}
                    </AnimatePresence>

                    {filteredProjects.length === 0 && (
                        <div className="col-span-full flex flex-col items-center justify-center py-40 text-stone-400">
                            <p className="text-sm uppercase tracking-widest font-bold">No projects found in this category</p>
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
    const cardRef = React.useRef(null);

    const { scrollYProgress } = useScroll({
        target: cardRef,
        offset: ["start end", "end start"]
    });

    const isEven = index % 2 === 0;
    const yTransform = useTransform(scrollYProgress, [0, 1], [isEven ? -30 : 30, isEven ? 30 : -30]);

    return (
        <motion.div
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            ref={cardRef}
            style={{ y: yTransform }}
            className={`w-full ${isEven ? 'md:mt-0' : 'md:mt-24'}`}
        >
            <Link href={`/projects/${project.id}`} className="group block relative">
                <div className="relative aspect-[4/5] overflow-hidden rounded-[3rem] bg-stone-100 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] group-hover:shadow-[0_50px_100px_-20px_rgba(0,0,0,0.15)] transition-all duration-700">
                    <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover transition-transform duration-[1.5s] ease-[0.22,1,0.36,1] group-hover:scale-110"
                    />

                    {/* Glassmorphic Caption Card */}
                    <div className="absolute inset-x-6 bottom-6 z-20">
                        <div className="p-8 rounded-[2.5rem] bg-white/10 backdrop-blur-2xl border border-white/20 text-white transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-700 ease-[0.22,1,0.36,1]">
                            <div className="flex items-center justify-between mb-4">
                                <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-amber-200">
                                    {project.category}
                                </span>
                                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                                    <ArrowUpRight className="w-4 h-4" />
                                </div>
                            </div>
                            <h3 className="text-2xl font-medium mb-2 tracking-tight">
                                {project.title}
                            </h3>
                            <p className="text-sm text-white/70 font-light leading-relaxed">
                                {project.caption}
                            </p>
                        </div>
                    </div>

                    {/* Minimalist Overlay */}
                    <div className="absolute inset-0 bg-stone-950/0 group-hover:bg-stone-950/20 transition-colors duration-700" />
                </div>

                {/* Info Text below card */}
                <div className="mt-8 px-4 flex justify-between items-start">
                    <div className="space-y-1">
                        <h4 className="text-xl font-medium text-stone-900 group-hover:text-amber-600 transition-colors duration-500">
                            {project.title}
                        </h4>
                        <div className="flex items-center gap-2 text-stone-400 text-xs uppercase tracking-widest font-bold">
                            <span>{project.category}</span>
                            <span className="w-1 h-1 bg-stone-300 rounded-full" />
                            <span>Project 0{project.id}</span>
                        </div>
                    </div>
                </div>
            </Link>
        </motion.div>
    );
}