"use client";
import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { projects, Project } from "@/app/projects/projectsData";
import { ArrowUpRight, Cuboid } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const ProjectCard = ({ project, index }: { project: Project; index: number }) => {
    const cardRef = useRef(null);

    const { scrollYProgress } = useScroll({
        target: cardRef,
        offset: ["start end", "end start"]
    });

    const isEven = index % 2 === 0;
    const yTransform = useTransform(scrollYProgress, [0, 1], [isEven ? -30 : 30, isEven ? 30 : -30]);

    return (
        <motion.div
            ref={cardRef}
            style={{ y: yTransform }}
            className={`w-full ${isEven ? 'md:mt-0' : 'md:mt-24'}`}
        // Removed variants={projectVariant} to keep it simple or I can define it above
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
};

const FeaturedProjects = () => {
    return (
        <section className="bg-[#FDF8F3] py-32 md:py-48 relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 md:px-12">
                {/* HEADER */}
                <div className="flex flex-col md:flex-row items-end justify-between mb-24 gap-8">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1 }}
                        className="max-w-2xl"
                    >
                        <div className="flex items-center gap-4 mb-6">
                            <Cuboid className="text-amber-600 w-5 h-5" />
                            <span className="uppercase tracking-[0.4em] text-xs font-bold text-stone-500">
                                Selected Masterpieces
                            </span>
                        </div>
                        <h2 className="text-5xl md:text-7xl font-light text-stone-900 leading-[1.1] tracking-tight">
                            <div className="overflow-hidden h-fit">
                                <motion.span
                                    initial={{ y: "100%" }}
                                    whileInView={{ y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                                    className="block"
                                >
                                    Design that <span className="font-serif italic text-amber-600">Transcends</span>
                                </motion.span>
                            </div>
                            <div className="overflow-hidden h-fit">
                                <motion.span
                                    initial={{ y: "100%" }}
                                    whileInView={{ y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                                    className="block"
                                >
                                    The Ordinary
                                </motion.span>
                            </div>
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
                            <span className="uppercase tracking-widest text-xs font-extrabold">View All Portfolio</span>
                            <div className="w-12 h-12 rounded-full border border-stone-200 flex items-center justify-center group-hover:bg-amber-600 group-hover:border-amber-600 group-hover:text-white transition-all duration-500">
                                <ArrowUpRight className="w-5 h-5" />
                            </div>
                        </Link>
                    </motion.div>
                </div>

                {/* PROJECTS GRID */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-24 md:gap-y-32">
                    {projects.filter(p => p.isFeatured).map((project, index) => (
                        <ProjectCard
                            key={project.id}
                            project={project}
                            index={index}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FeaturedProjects;
