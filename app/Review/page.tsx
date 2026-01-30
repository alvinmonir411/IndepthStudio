"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Star, Quote, X, Sparkles, MessageSquare, Video } from 'lucide-react';
import { videoReviewsData, textReviewsData, Review } from './reviewsData';

export default function ReviewPage() {
    const [activeVideo, setActiveVideo] = useState<string | null>(null);

    return (
        <main className="min-h-screen bg-[#FDF8F3] pt-32 pb-24 text-stone-900">
            {/* Hero Section */}
            <section className="container mx-auto px-6 mb-32">
                <div className="max-w-4xl">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center gap-3 text-amber-600 mb-6"
                    >
                        <Sparkles size={18} />
                        <span className="uppercase tracking-[0.4em] text-xs font-bold">Voices of Elegance</span>
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-6xl md:text-[8rem] font-light leading-[0.85] tracking-tighter mb-12"
                    >
                        Success <span className="font-serif italic text-stone-500">Stories</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-stone-500 text-xl md:text-2xl font-light max-w-2xl leading-relaxed"
                    >
                        We believe our work speaks for itself, but our clients say it better.
                        Explore the experiences of those who redefined their living spaces with us.
                    </motion.p>
                </div>
            </section>

            {/* Video Reviews Section */}
            <section className="bg-stone-950 py-32 md:py-48 mb-32 relative overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-500 rounded-full blur-[120px] animate-pulse" />
                </div>

                <div className="container mx-auto px-6 relative z-10">
                    <div className="flex items-center gap-6 mb-16">
                        <div className="w-16 h-16 rounded-2xl bg-amber-600 flex items-center justify-center text-white shadow-2xl">
                            <Video size={32} />
                        </div>
                        <div>
                            <span className="text-amber-500 uppercase tracking-[0.4em] text-[10px] font-bold">Cinematic Feedback</span>
                            <h2 className="text-4xl md:text-5xl text-white font-light tracking-tight mt-2">Video Reviews</h2>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {videoReviewsData.map((review, i) => (
                            <motion.div
                                key={review.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="group relative bg-white/5 backdrop-blur-md rounded-[3rem] p-8 border border-white/10 hover:border-amber-600/50 transition-all duration-700"
                            >
                                <div className="relative aspect-video rounded-3xl overflow-hidden mb-8 bg-stone-800">
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <button
                                            onClick={() => setActiveVideo(review.videoUrl!)}
                                            className="w-20 h-20 rounded-full bg-amber-600 text-white flex items-center justify-center hover:scale-110 transition-transform shadow-2xl group/play"
                                        >
                                            <Play size={24} fill="white" className="group-hover/play:scale-110 transition-transform" />
                                        </button>
                                    </div>
                                    <div className="absolute bottom-6 left-6 right-6">
                                        <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20">
                                            <p className="text-white text-xs font-bold uppercase tracking-widest">{review.projectType}</p>
                                        </div>
                                    </div>
                                </div>
                                <h3 className="text-xl text-white font-medium mb-1">{review.name}</h3>
                                <p className="text-stone-400 text-xs uppercase tracking-widest">{review.role}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Text Reviews Section */}
            <section className="container mx-auto px-6">
                <div className="flex items-center gap-6 mb-20">
                    <div className="w-16 h-16 rounded-2xl bg-stone-900 flex items-center justify-center text-white shadow-2xl">
                        <MessageSquare size={32} />
                    </div>
                    <div>
                        <span className="text-stone-400 uppercase tracking-[0.4em] text-[10px] font-bold">Client Perspectives</span>
                        <h2 className="text-4xl md:text-5xl text-stone-900 font-light tracking-tight mt-2">Written Appreciations</h2>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {textReviewsData.map((review, i) => (
                        <motion.div
                            key={review.id}
                            initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="bg-white p-12 rounded-[3.5rem] border border-stone-100 shadow-sm hover:shadow-xl transition-all duration-700 group"
                        >
                            <div className="flex items-center gap-1 mb-8">
                                {[...Array(review.rating)].map((_, i) => (
                                    <Star key={i} size={14} className="fill-amber-500 text-amber-500" />
                                ))}
                            </div>

                            <div className="relative mb-12">
                                <Quote size={40} className="absolute -top-4 -left-4 text-stone-100 group-hover:text-amber-50 transition-colors" />
                                <p className="relative text-xl md:text-2xl text-stone-700 font-light leading-relaxed italic z-10">
                                    "{review.review}"
                                </p>
                            </div>

                            <div className="flex items-center justify-between pt-8 border-t border-stone-50">
                                <div className="flex items-center gap-4">
                                    <div
                                        className="w-14 h-14 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-stone-500/20"
                                        style={{ backgroundColor: review.avatarColor }}
                                    >
                                        {review.name.charAt(0)}
                                    </div>
                                    <div>
                                        <h4 className="text-lg font-bold text-stone-900 tracking-tight">{review.name}</h4>
                                        <p className="text-xs text-stone-400 uppercase tracking-widest">{review.role}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <span className="text-[10px] font-bold text-amber-600 uppercase tracking-[0.2em]">{review.date}</span>
                                    <p className="text-[10px] text-stone-400 uppercase tracking-widest mt-1">{review.projectType}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Video Modal */}
            <AnimatePresence>
                {activeVideo && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-stone-950/95 backdrop-blur-xl"
                    >
                        <button
                            onClick={() => setActiveVideo(null)}
                            className="absolute top-10 right-10 w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-white hover:text-black transition-all duration-500"
                        >
                            <X size={24} />
                        </button>

                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="aspect-video w-full max-w-5xl bg-black rounded-[2rem] overflow-hidden shadow-2xl"
                        >
                            <iframe
                                src={activeVideo}
                                className="w-full h-full border-none"
                                allow="autoplay; encrypted-media"
                                allowFullScreen
                            />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </main>
    );
}
