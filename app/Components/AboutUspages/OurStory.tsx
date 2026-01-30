'use client';

import { motion } from 'framer-motion';
import { Quote, Calendar } from 'lucide-react';

const ease = 'easeOut';

const timeline = [
    {
        year: '2008',
        title: 'The Beginning',
        desc: 'A small studio. Big dreams. One sketchbook and a relentless vision.'
    },
    {
        year: '2015',
        title: 'First Recognition',
        desc: 'Award-winning waterfront project that put us on the map.'
    },
    {
        year: '2020',
        title: 'Scaling Excellence',
        desc: 'Expanded into luxury residential and boutique commercial spaces.'
    },
    {
        year: '2025',
        title: 'Global Footprint',
        desc: 'International collaborations and cross-border design leadership.'
    },
    {
        year: '2026',
        title: 'Legacy Era',
        desc: 'Designing timeless environments meant to last generations.'
    }
];

export default function OurJourney() {
    return (
        <section className="relative bg-black py-40 px-6 lg:px-24">
            {/* Ambient background */}
            <div className="absolute inset-0 bg-gradient-to-b from-black via-slate-900/60 to-black" />
            <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-amber-500/10 blur-3xl rounded-full animate-pulse" />

            <div className="relative max-w-7xl mx-auto grid grid-cols-1 xl:grid-cols-2 gap-24">

                {/* LEFT — TIMELINE */}
                <div className="relative space-y-32">
                    {/* Vertical line */}
                    <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-amber-500/60 via-white/20 to-transparent" />

                    {timeline.map((item, i) => (
                        <motion.div
                            key={item.year}
                            initial={{ opacity: 0, x: -80 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.9, ease, delay: i * 0.1 }}
                            viewport={{ once: true }}
                            className="relative pl-24"
                        >
                            {/* Node */}
                            <div className="absolute left-0 top-2 w-14 h-14 rounded-2xl
                              bg-gradient-to-br from-amber-500 to-orange-500
                              shadow-[0_0_40px_rgba(245,158,11,0.6)]
                              flex items-center justify-center">
                                <Calendar className="w-6 h-6 text-black" />
                            </div>

                            <div className="text-slate-400 text-6xl font-black tracking-tight mb-4">
                                {item.year}
                            </div>

                            <h3 className="text-white text-4xl font-black mb-6 leading-tight">
                                {item.title}
                            </h3>

                            <p className="text-slate-300 text-2xl leading-relaxed max-w-xl">
                                {item.desc}
                            </p>
                        </motion.div>
                    ))}
                </div>

                {/* RIGHT — STICKY QUOTE */}
                <div className="relative">
                    <div className="sticky top-28">
                        <motion.div
                            initial={{ opacity: 0, x: 80 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 1.2, ease }}
                            viewport={{ once: true }}
                            className="relative bg-gradient-to-b from-slate-800 to-slate-900
                         border border-white/10 rounded-[2.8rem]
                         p-16 shadow-[0_50px_140px_rgba(0,0,0,0.75)]
                         overflow-hidden"
                        >
                            {/* Glow */}
                            <div className="absolute inset-0 bg-gradient-to-br
                              from-amber-500/10 via-transparent to-transparent" />

                            <Quote className="absolute top-10 right-10 w-12 h-12
                                text-amber-500 opacity-40" />

                            <blockquote className="relative text-[clamp(1.8rem,2.6vw,2.8rem)]
                                     italic text-white leading-[1.4]
                                     font-light">
                                “We don’t design spaces.
                                We craft{' '}
                                <span className="text-amber-400 font-semibold not-italic">
                                    legacies
                                </span>{' '}
                                that families live in for generations.”
                            </blockquote>

                            <div className="mt-12 pt-8 border-t border-white/15
                              text-lg font-semibold tracking-wide
                              text-amber-400">
                                — Founder
                            </div>
                        </motion.div>
                    </div>
                </div>

            </div>
        </section>
    );
}
