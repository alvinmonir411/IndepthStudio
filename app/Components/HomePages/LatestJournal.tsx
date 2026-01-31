"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight, Sparkles } from 'lucide-react';
import { blogPosts } from '../../blog/blogData';

const LatestJournal = ({ posts }: { posts: any[] }) => {
    return (
        <section className="w-full py-32 px-6 bg-white overflow-hidden">
            <div className="max-w-7xl mx-auto">
                {/* Section Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-20 gap-8">
                    <div className="max-w-2xl">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="flex items-center gap-3 text-amber-600 mb-6"
                        >
                            <Sparkles size={18} />
                            <span className="uppercase tracking-[0.4em] text-[10px] font-bold">The Journal</span>
                        </motion.div>
                        <h2 className="text-5xl md:text-7xl font-light tracking-tighter text-stone-900 leading-none">
                            Editorial <span className="font-serif italic text-stone-400">Insights</span>
                        </h2>
                    </div>
                    <Link
                        href="/blog"
                        className="group flex items-center gap-4 text-[10px] font-bold uppercase tracking-[0.3em] hover:text-amber-600 transition-colors"
                    >
                        Explore Journal <div className="w-12 h-12 rounded-full border border-stone-200 flex items-center justify-center group-hover:border-amber-600 group-hover:bg-amber-600 group-hover:text-white transition-all"><ArrowUpRight size={16} /></div>
                    </Link>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24">
                    {posts.map((post, index) => (
                        <motion.div
                            key={post._id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.2 }}
                            className="group cursor-pointer"
                        >
                            <Link href={`/blog/${post.slug}`}>
                                <div className="relative aspect-[16/10] rounded-[3rem] overflow-hidden mb-10 bg-stone-100 shadow-sm border border-stone-100">
                                    <Image
                                        src={post.imageUrl || post.image || '/placeholder-blog.jpg'}
                                        alt={post.title}
                                        fill
                                        className="object-cover transition-transform duration-1000 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-stone-900/0 group-hover:bg-stone-900/20 transition-colors duration-500" />
                                </div>
                                <div className="flex items-center gap-6 text-[10px] font-bold uppercase tracking-widest text-amber-700 mb-6">
                                    <span>{post.category}</span>
                                    <span className="w-1 h-1 rounded-full bg-stone-300" />
                                    <span>{post.date}</span>
                                </div>
                                <h3 className="text-3xl md:text-4xl font-light tracking-tight text-stone-900 group-hover:text-amber-600 transition-colors line-clamp-2 leading-tight mb-6">
                                    {post.title}
                                </h3>
                                <p className="text-stone-500 font-light line-clamp-2 max-w-lg leading-relaxed italic">
                                    {post.excerpt}
                                </p>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default LatestJournal;
