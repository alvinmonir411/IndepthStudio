'use client';

import { motion, useScroll, useTransform, Variants } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, Sparkles } from 'lucide-react';
import { projects, Project } from '@/app/projects/projectsData';

/* -----------------------------
   Variants
------------------------------*/

const containerVariant: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2,
        }
    }
};

const projectVariant: Variants = {
    hidden: {
        opacity: 0,
        y: 40,
        filter: 'blur(8px)'
    },
    visible: {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        transition: {
            duration: 1.2,
            ease: [0.22, 1, 0.36, 1]
        }
    }
};

export default function ServiceRelatedProjects() {
    return (
        <section className="py-32 md:py-48 bg-[#FDF8F3] overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 md:px-12">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row items-end justify-between mb-24 gap-8">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1 }}
                        className="max-w-2xl"
                    >
                        <div className="flex items-center gap-4 mb-6">
                            <Sparkles className="text-amber-600 w-5 h-5" />
                            <span className="uppercase tracking-[0.4em] text-xs font-bold text-stone-500">
                                Portfolio Highlights
                            </span>
                        </div>
                        <h2 className="text-5xl md:text-7xl font-light text-stone-900 leading-[1.1] tracking-tight">
                            Realizing <span className="font-serif italic text-amber-600">Visionary</span> <br /> Concepts
                        </h2>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.3 }}
                        className="pb-4"
                    >
                        <Link
                            href="/projects"
                            className="group flex items-center gap-4 text-stone-900 hover:text-amber-600 transition-colors"
                        >
                            <span className="uppercase tracking-widest text-xs font-extrabold">View All Projects</span>
                            <div className="w-12 h-12 rounded-full border border-stone-200 flex items-center justify-center group-hover:bg-amber-600 group-hover:border-amber-600 group-hover:text-white transition-all duration-500">
                                <ArrowUpRight className="w-5 h-5" />
                            </div>
                        </Link>
                    </motion.div>
                </div>

                {/* Staggered Grid Layout */}
                <motion.div
                    variants={containerVariant}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-24 md:gap-y-32"
                >
                    {projects.map((project, index) => (
                        <ProjectCard key={project.id} project={project} index={index} />
                    ))}
                </motion.div>
            </div>
        </section>
    );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
    const cardRef = useRef(null);

    // Parallax effect: even items shift down, odd items shift up slightly
    const { scrollYProgress } = useScroll({
        target: cardRef,
        offset: ["start end", "end start"]
    });

    const isEven = index % 2 === 0;
    const yTransform = useTransform(scrollYProgress, [0, 1], [isEven ? -30 : 30, isEven ? 30 : -30]);

    return (
        <motion.div
            ref={cardRef}
            variants={projectVariant}
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

                {/* Info Text below card for high-end look */}
                <div className="mt-8 px-4 flex justify-between items-start">
                    <div className="space-y-1">
                        <h4 className="text-xl font-medium text-stone-900 group-hover:text-amber-600 transition-colors duration-500">
                            {project.title}
                        </h4>
                        <div className="flex items-center gap-2 text-stone-400 text-xs uppercase tracking-widest font-bold">
                            <span>{project.category}</span>
                            <span className="w-1 h-1 bg-stone-300 rounded-full" />
                            <span>Project 0{index + 1}</span>
                        </div>
                    </div>
                </div>
            </Link>
        </motion.div>
    );
}
