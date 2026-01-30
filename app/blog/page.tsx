"use client";

import React, { useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, Clock, Calendar, Sparkles, ChevronRight } from 'lucide-react';
import { blogPosts, BlogPost } from './blogData';

export default function BlogPage() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    return (
        <main ref={containerRef} className="min-h-screen bg-[#FDF8F3] pt-32 pb-40 text-stone-900 overflow-x-hidden">
            {/* Minimalist Grid Pattern Background */}
            <div className="fixed inset-0 opacity-[0.03] pointer-events-none">
                <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
            </div>

            <div className="container mx-auto px-6 relative z-10">
                {/* Hero Section - Asymmetrical & Bold */}
                <div className="mb-32 md:mb-48 border-b border-stone-200 pb-20">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-12">
                        <div className="max-w-4xl">
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="flex items-center gap-3 text-amber-600 mb-8"
                            >
                                <Sparkles size={18} />
                                <span className="uppercase tracking-[0.5em] text-[10px] font-bold">The Editorial Journal</span>
                            </motion.div>
                            <motion.h1
                                initial={{ opacity: 0, y: 40 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                                className="text-7xl md:text-[10rem] font-light leading-[0.8] tracking-tighter"
                            >
                                Insights <br />
                                <span className="font-serif italic text-stone-400">& Ideas.</span>
                            </motion.h1>
                        </div>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            className="max-w-xs text-stone-500 font-light text-sm leading-relaxed"
                        >
                            <p>A curated collection of design theories, sustainable practices, and editorial pieces on modern urban living.</p>
                            <div className="mt-8 flex gap-4">
                                <div className="w-12 h-0.5 bg-amber-600 mt-2" />
                                <span className="text-[10px] font-bold uppercase tracking-widest text-stone-900">{blogPosts.length} Editions Available</span>
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* The Bento Grid - Uncommon Layout */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
                    {blogPosts.map((post, index) => (
                        <BlogItem key={post.id} post={post} index={index} />
                    ))}
                </div>

                {/* Newsletter Section */}
                <motion.section
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-48 bg-stone-950 rounded-[4rem] p-12 md:p-24 text-white relative overflow-hidden group"
                >
                    <div className="absolute top-0 right-0 w-96 h-96 bg-amber-600/10 rounded-full blur-[120px] group-hover:bg-amber-600/20 transition-colors duration-1000" />

                    <div className="relative z-10 max-w-2xl">
                        <h2 className="text-4xl md:text-6xl font-light mb-8 tracking-tighter">Stay <span className="italic font-serif text-amber-500">Curated.</span></h2>
                        <p className="text-stone-400 text-lg md:text-xl font-light mb-12 leading-relaxed">Join our private list to receive exclusive design dispatches and project behind-the-scenes.</p>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <input
                                type="email"
                                placeholder="Your email address"
                                className="bg-white/5 border border-white/10 rounded-full px-8 py-4 outline-none focus:border-amber-600/50 transition-colors text-sm flex-1"
                            />
                            <button className="bg-amber-600 hover:bg-amber-700 text-white px-10 py-4 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all shadow-xl">
                                Subscribe
                            </button>
                        </div>
                    </div>
                </motion.section>
            </div>
        </main>
    );
}

function BlogItem({ post, index }: { post: BlogPost; index: number }) {
    // Determine column span based on index for uncommon bento look
    const isLarge = index === 0;
    const isMedium = index === 1;

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: index * 0.1 }}
            className={`group relative flex flex-col ${isLarge ? 'md:col-span-8' :
                isMedium ? 'md:col-span-4' :
                    index % 3 === 0 ? 'md:col-span-4' : 'md:col-span-4'
                }`}
        >
            <div className="relative overflow-hidden rounded-[3rem] bg-stone-200 aspect-[16/10] md:aspect-auto md:flex-1 mb-8 shadow-sm">
                <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-105"
                />

                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-stone-900/0 group-hover:bg-stone-900/40 transition-colors duration-500 flex items-center justify-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileHover={{ opacity: 1, scale: 1 }}
                        className="bg-white text-stone-900 w-16 h-16 rounded-full flex items-center justify-center shadow-2xl"
                    >
                        <ArrowUpRight size={24} />
                    </motion.div>
                </div>

                {/* Category Badge */}
                <div className="absolute top-8 left-8">
                    <span className="px-5 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[10px] uppercase tracking-widest font-bold text-white">
                        {post.category}
                    </span>
                </div>
            </div>

            <div className="px-2">
                <div className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-widest text-amber-700 mb-4">
                    <div className="flex items-center gap-1.5"><Calendar size={12} /> {post.date}</div>
                    <div className="w-1 h-1 rounded-full bg-stone-300" />
                    <div className="flex items-center gap-1.5"><Clock size={12} /> {post.readTime}</div>
                </div>

                <h3 className={`font-light tracking-tighter mb-4 group-hover:text-amber-600 transition-colors duration-300 ${isLarge ? 'text-4xl md:text-5xl' : 'text-2xl md:text-3xl'
                    }`}>
                    {post.title}
                </h3>

                <p className="text-stone-500 font-light line-clamp-2 mb-8 text-sm md:text-base leading-relaxed">
                    {post.excerpt}
                </p>

                <Link href={`/blog/${post.slug}`} className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] group-hover:gap-4 transition-all">
                    Read Story <ChevronRight size={14} className="text-amber-600" />
                </Link>
            </div>

            {/* Background Index (Hidden on mobile) */}
            <div className="absolute -top-10 -right-4 text-[10rem] font-bold text-stone-900/[0.02] pointer-events-none select-none italic font-serif">
                0{post.id}
            </div>
        </motion.div>
    );
}
