"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Clock, Calendar, User, Share2, Facebook, Twitter, Linkedin, ArrowRight, Check } from 'lucide-react';
import { blogPosts } from '../blogData';
import { useParams, notFound } from 'next/navigation';

export default function BlogDetailPage() {
    const params = useParams();
    const slug = params?.slug as string;
    const post = blogPosts.find(p => p.slug === slug);
    const [copied, setCopied] = useState(false);
    const [currentUrl, setCurrentUrl] = useState('');

    useEffect(() => {
        setCurrentUrl(window.location.href);
    }, []);

    if (!slug) return null;

    if (!post) {
        notFound();
    }

    const shareData = {
        title: post ? post.title : '',
        text: post ? post.excerpt : '',
        url: currentUrl
    };

    const handleSocialShare = (platform: string) => {
        let url = '';
        const encodedUrl = encodeURIComponent(currentUrl);
        const encodedText = encodeURIComponent(post ? post.title : '');

        switch (platform) {
            case 'facebook':
                url = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
                break;
            case 'twitter':
                url = `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedText}`;
                break;
            case 'linkedin':
                url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`;
                break;
        }

        if (url) window.open(url, '_blank', 'width=600,height=400');
    };

    const handleGenericShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share(shareData);
            } catch (err) {
                console.error('Error sharing:', err);
            }
        } else {
            // Fallback: Copy to clipboard
            try {
                await navigator.clipboard.writeText(currentUrl);
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
            } catch (err) {
                console.error('Failed to copy:', err);
            }
        }
    };

    // Filter related posts (same category or just random others)
    const relatedPosts = blogPosts.filter(p => p.id !== post.id).slice(0, 2);

    return (
        <main className="min-h-screen bg-[#FDF8F3] text-stone-900 pt-32 pb-40">
            {/* Minimalist Background Pattern */}
            <div className="fixed inset-0 opacity-[0.03] pointer-events-none">
                <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
            </div>

            <article className="container mx-auto px-6 relative z-10">
                {/* Back Button */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="mb-12"
                >
                    <Link href="/blog" className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-stone-400 hover:text-amber-600 transition-colors">
                        <ArrowLeft size={14} /> Back to Journal
                    </Link>
                </motion.div>

                {/* Header Section */}
                <header className="max-w-4xl mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center gap-4 text-amber-600 font-bold text-[10px] uppercase tracking-[0.4em] mb-8"
                    >
                        <span>{post.category}</span>
                        <div className="w-1 h-1 rounded-full bg-stone-300" />
                        <span>{post.date}</span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-5xl md:text-8xl font-light tracking-tighter leading-[0.9] mb-12"
                    >
                        {post.title}
                    </motion.h1>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="flex flex-wrap items-center gap-8 border-t border-stone-200 pt-12"
                    >
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full bg-stone-900 flex items-center justify-center text-white font-bold text-xl">
                                {post.author.charAt(0)}
                            </div>
                            <div>
                                <p className="text-[10px] text-stone-400 font-bold uppercase tracking-widest">Authored by</p>
                                <p className="font-medium text-stone-900">{post.author}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full border border-stone-200 flex items-center justify-center text-stone-400">
                                <Clock size={16} />
                            </div>
                            <div>
                                <p className="text-[10px] text-stone-400 font-bold uppercase tracking-widest">Read Time</p>
                                <p className="font-medium text-stone-900">{post.readTime}</p>
                            </div>
                        </div>
                    </motion.div>
                </header>

                {/* Cover Image */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                    className="relative aspect-[21/9] rounded-[4rem] overflow-hidden mb-24 shadow-2xl"
                >
                    <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        className="object-cover"
                        priority
                    />
                </motion.div>

                {/* Content Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
                    <div className="lg:col-span-8">
                        <div className="prose prose-stone prose-xl max-w-none">
                            <p className="text-2xl md:text-3xl text-stone-600 font-light leading-relaxed italic mb-12">
                                {post.excerpt}
                            </p>
                            <div className="text-stone-800 font-light leading-loose space-y-8">
                                {post.fullContent.map((paragraph, i) => (
                                    <p key={i}>{paragraph}</p>
                                ))}

                                {post.quote && (
                                    <div className="p-12 bg-stone-900 rounded-[3rem] text-white my-16">
                                        <h3 className="text-2xl font-serif italic mb-6 text-amber-500">Expert Insight</h3>
                                        <p className="text-xl font-light opacity-80 leading-relaxed italic">
                                            &quot;{post.quote}&quot;
                                        </p>
                                        {post.quoteAuthor && (
                                            <p className="text-[10px] uppercase tracking-[0.3em] text-amber-600 mt-6 font-bold">— {post.quoteAuthor}</p>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Tags */}
                        <div className="mt-20 pt-12 border-t border-stone-100 flex flex-wrap gap-4">
                            {post.tags.map(tag => (
                                <span key={tag} className="px-6 py-2 rounded-full border border-stone-200 text-xs font-medium text-stone-500 hover:border-amber-600 hover:text-amber-600 transition-all cursor-pointer">
                                    #{tag}
                                </span>
                            ))}
                        </div>
                    </div>

                    <aside className="lg:col-span-4 flex flex-col gap-12">
                        {/* Social Share */}
                        <div className="bg-white p-10 rounded-[3rem] border border-stone-100 shadow-sm relative">
                            <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-stone-400 mb-8">Share Journal</h4>
                            <div className="flex gap-4">
                                <button
                                    onClick={() => handleSocialShare('facebook')}
                                    className="w-12 h-12 rounded-full border border-stone-100 flex items-center justify-center hover:bg-stone-900 hover:text-white transition-all"
                                >
                                    <Facebook size={18} />
                                </button>
                                <button
                                    onClick={() => handleSocialShare('twitter')}
                                    className="w-12 h-12 rounded-full border border-stone-100 flex items-center justify-center hover:bg-stone-900 hover:text-white transition-all"
                                >
                                    <Twitter size={18} />
                                </button>
                                <button
                                    onClick={() => handleSocialShare('linkedin')}
                                    className="w-12 h-12 rounded-full border border-stone-100 flex items-center justify-center hover:bg-stone-900 hover:text-white transition-all"
                                >
                                    <Linkedin size={18} />
                                </button>
                                <button
                                    onClick={handleGenericShare}
                                    className="w-12 h-12 rounded-full border border-stone-100 flex items-center justify-center hover:bg-stone-900 hover:text-white transition-all"
                                >
                                    <AnimatePresence mode="wait">
                                        {copied ? (
                                            <motion.div
                                                key="check"
                                                initial={{ scale: 0 }}
                                                animate={{ scale: 1 }}
                                                exit={{ scale: 0 }}
                                            >
                                                <Check size={18} className="text-green-500" />
                                            </motion.div>
                                        ) : (
                                            <motion.div
                                                key="share"
                                                initial={{ scale: 0 }}
                                                animate={{ scale: 1 }}
                                                exit={{ scale: 0 }}
                                            >
                                                <Share2 size={18} />
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </button>
                            </div>

                            <AnimatePresence>
                                {copied && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: 10 }}
                                        className="absolute -bottom-10 left-1/2 -translate-x-1/2 bg-stone-900 text-white text-[10px] font-bold uppercase tracking-widest px-4 py-2 rounded-full shadow-xl"
                                    >
                                        Link Copied
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Related Posts */}
                        <div className="flex flex-col gap-8">
                            <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-stone-400 px-2 text-center lg:text-left">Read Next</h4>
                            {relatedPosts.map(relPost => (
                                <Link key={relPost.id} href={`/blog/${relPost.slug}`} className="group block">
                                    <div className="relative aspect-square rounded-[2.5rem] overflow-hidden mb-6 bg-stone-100 border border-stone-100">
                                        <Image
                                            src={relPost.image}
                                            alt={relPost.title}
                                            fill
                                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                                        />
                                        <div className="absolute inset-0 bg-stone-950/0 group-hover:bg-stone-950/20 transition-colors" />
                                    </div>
                                    <p className="text-amber-600 font-bold text-[10px] uppercase tracking-widest mb-2">{relPost.category}</p>
                                    <h3 className="text-xl font-light tracking-tight leading-tight group-hover:text-amber-600 transition-colors">{relPost.title}</h3>
                                </Link>
                            ))}
                        </div>
                    </aside>
                </div>
            </article>
        </main>
    );
}
