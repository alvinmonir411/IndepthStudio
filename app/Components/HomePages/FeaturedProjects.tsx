"use client";
import React, { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const projects = [
    {
        id: 1,
        title: "Ethereal Residence",
        category: "Residential",
        location: "Kyoto, Japan",
        image: "/ResidentialInteriorDesign.jpg",
        year: "2024",
    },
    {
        id: 2,
        title: "Nexus Workspace",
        category: "Commercial",
        location: "Berlin, Germany",
        image: "/CommercialinteriorDesign.jpg",
        year: "2023",
    },
    {
        id: 3,
        title: "Serenity Lounge",
        category: "Hospitality",
        location: "Bali, Indonesia",
        image: "/heroImage.jpg",
        year: "2024",
    },
    {
        id: 4,
        title: "Urban Loft",
        category: "Residential",
        location: "New York, USA",
        image: "/AboutUs.jpg",
        year: "2023",
    },
];

const ProjectCard = ({ project, index }: { project: any; index: number }) => {
    const cardRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: cardRef,
        offset: ["start end", "end start"],
    });

    const imageY = useTransform(scrollYProgress, [0, 1], [120, -120]);
    const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.94, 1, 0.96]);
    const opacity = useTransform(scrollYProgress, [0, 0.15, 0.9, 1], [0, 1, 1, 0]);

    const isEven = index % 2 === 0;

    return (
        <div
            ref={cardRef}
            className={`flex w-full mb-40 md:mb-56 ${isEven ? "justify-start" : "justify-end"
                } relative`}
        >
            <motion.div
                style={{ scale, opacity }}
                className="w-full md:w-[75%] lg:w-[65%] relative z-10 group"
            >
                {/* IMAGE */}
                <div className="relative aspect-[4/3] md:aspect-[16/10] overflow-hidden rounded-sm">
                    <motion.div
                        style={{ y: imageY }}
                        className="relative w-full h-[120%] -top-[10%]"
                    >
                        <Image
                            src={project.image}
                            alt={project.title}
                            fill
                            className="object-cover transition-transform duration-[1200ms] group-hover:scale-105"
                        />
                    </motion.div>
                </div>

                {/* INFO CARD */}
                <motion.div
                    initial={{ y: 40, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }}
                    className={`absolute -bottom-14 ${isEven ? "-right-6 md:-right-16" : "-left-6 md:-left-16"
                        } z-20 bg-white p-8 md:p-10 shadow-2xl w-[90%] md:w-auto`}
                >
                    <div className="flex items-center gap-4 mb-4 text-xs font-mono uppercase tracking-widest text-amber-600">
                        <span>{project.category}</span>
                        <span className="w-1 h-1 bg-black/20 rounded-full" />
                        <span className="text-black/50">{project.year}</span>
                    </div>

                    <h3 className="text-3xl md:text-5xl font-serif text-black mb-2 leading-none">
                        {project.title}
                    </h3>

                    <p className="text-stone-600 text-sm mb-6">{project.location}</p>

                    <MagneticButton>
                        <Link
                            href="/projects"
                            className="flex items-center gap-3 text-black group/btn"
                        >
                            <span className="uppercase tracking-widest text-xs font-bold group-hover/btn:text-amber-600 transition-colors">
                                View Case Study
                            </span>
                            <div className="p-2 border border-black/20 rounded-full group-hover/btn:bg-amber-500 group-hover/btn:border-amber-500 transition-all duration-300">
                                <ArrowUpRight className="w-4 h-4 text-black" />
                            </div>
                        </Link>
                    </MagneticButton>
                </motion.div>

                {/* BIG INDEX NUMBER */}
                <div
                    className={`absolute -top-24 ${isEven ? "-left-20" : "-right-20"
                        } -z-10`}
                >
                    <span className="text-[14rem] md:text-[22rem] font-serif leading-none text-black/[0.04] select-none">
                        0{project.id}
                    </span>
                </div>
            </motion.div>
        </div>
    );
};

const MagneticButton = ({ children }: { children: React.ReactNode }) => {
    const ref = useRef<HTMLDivElement>(null);
    const [pos, setPos] = useState({ x: 0, y: 0 });

    return (
        <motion.div
            ref={ref}
            onMouseMove={(e) => {
                const rect = ref.current?.getBoundingClientRect();
                if (!rect) return;
                setPos({
                    x: (e.clientX - (rect.left + rect.width / 2)) * 0.3,
                    y: (e.clientY - (rect.top + rect.height / 2)) * 0.3,
                });
            }}
            onMouseLeave={() => setPos({ x: 0, y: 0 })}
            animate={pos}
            transition={{ type: "spring", stiffness: 120, damping: 14 }}
            className="inline-block"
        >
            {children}
        </motion.div>
    );
};

const FeaturedProjects = () => {
    return (
        <section className="bg-[#FDF8F3] py-32 relative overflow-hidden">
            <div className="max-w-[1400px] mx-auto px-6 md:px-12">
                {/* HEADER */}
                <div className="flex flex-col items-center text-center mb-32">
                    <motion.span
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-amber-600 uppercase tracking-[0.35em] text-xs font-bold mb-6 border border-amber-600/30 px-5 py-2 rounded-full"
                    >
                        Selected Masterpieces
                    </motion.span>

                    <motion.h2
                        initial={{ opacity: 0, y: 80, rotateX: 20 }}
                        whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] as const }}
                        className="text-6xl md:text-9xl font-serif text-black leading-[0.85] tracking-tight"
                    >
                        Design that <br />
                        <span className="text-black/20">Transcends</span>
                    </motion.h2>
                </div>

                {/* PROJECTS */}
                <div className="flex flex-col items-center">
                    {projects.map((project, index) => (
                        <ProjectCard
                            key={project.id}
                            project={project}
                            index={index}
                        />
                    ))}
                </div>

                {/* CTA */}
                <div className="flex justify-center relative z-20">
                    <MagneticButton>
                        <Link
                            href="/projects"
                            className="
        relative
        group
        flex
        items-center
        justify-center
        gap-2
        px-14
        h-[64px]
        rounded-full
        bg-gradient-to-r from-zinc-900 via-zinc-800 to-zinc-900
        hover:from-amber-600 hover:via-orange-600 hover:to-pink-600
        text-white
        font-bold
        uppercase
        tracking-widest
        text-sm
        overflow-hidden
        leading-none
        shadow-2xl
        border border-white/10
        transition-all duration-500
      "
                        >
                            {/* TEXT */}
                            <span className="relative z-20 flex items-center gap-2 pointer-events-none">
                                View Full Portfolio
                                <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" />
                            </span>

                            {/* HOVER OVERLAY */}
                            <span
                                className="
          absolute
          inset-0
          z-10
          bg-amber-500
          translate-y-full
          group-hover:translate-y-0
          transition-transform
          duration-500
          ease-[0.2,1,0.3,1]
        "
                            />
                        </Link>
                    </MagneticButton>
                </div>

            </div>
        </section>
    );
};

export default FeaturedProjects;
