'use client';

import { motion } from 'framer-motion';
import { Award } from 'lucide-react';

export default function UltraPremiumCompanyIntro() {
    return (
        <section className="relative min-h-[85vh] flex items-center justify-center px-6 py-28 bg-black overflow-hidden">

            {/* Subtle grid overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:60px_60px] opacity-20 pointer-events-none" />

            {/* Ambient glow blobs */}
            <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-amber-600/10 rounded-full blur-3xl animate-[float_8s_ease-in-out_infinite]" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl animate-[float_10s_ease-in-out_infinite_reverse]" />

            <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-20 items-center">

                {/* LEFT CONTENT */}
                <motion.div
                    className="lg:col-span-7 space-y-12 text-center lg:text-left"
                    initial={{ opacity: 0, y: 60 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                    viewport={{ once: true }}
                >

                    {/* Legacy badge */}
                    <motion.div
                        className="inline-flex items-center gap-4 px-8 py-4 bg-white/95 backdrop-blur-xl border border-amber-600/30 rounded-3xl shadow-2xl"
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        transition={{ delay: 0.2, type: 'spring', stiffness: 120 }}
                        viewport={{ once: true }}
                    >
                        <span className="w-3 h-3 bg-amber-600 rounded-full animate-ping" />
                        <Award className="h-7 w-7 text-amber-600" />
                        <span className="text-xl font-bold text-slate-900 tracking-wide">
                            Crafted Excellence Since 2009
                        </span>
                    </motion.div>

                    {/* HERO TEXT */}
                    <motion.h2
                        className="font-black uppercase tracking-[-0.04em] leading-[0.9]
                       text-[clamp(4rem,6vw,7rem)] text-white"
                        initial={{ opacity: 0, skewX: 10 }}
                        whileInView={{ opacity: 1, skewX: 0 }}
                        transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
                        viewport={{ once: true }}
                        whileHover={{ letterSpacing: '0.04em' }}
                    >
                        Elevating
                        <span className="block text-transparent bg-gradient-to-r from-amber-600 via-amber-500 to-amber-400 bg-clip-text drop-shadow-2xl">
                            Spaces
                        </span>
                    </motion.h2>

                    {/* Description */}
                    <motion.p
                        className="max-w-2xl mx-auto lg:mx-0 text-xl md:text-2xl text-slate-100/90 leading-relaxed font-light"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 1 }}
                        viewport={{ once: true }}
                    >
                        Luxury residences • Waterfront estates • Boutique commercial spaces
                        <span className="block mt-6 text-amber-400 font-semibold text-2xl">
                            200+ iconic projects delivered worldwide
                        </span>
                    </motion.p>
                </motion.div>

                {/* RIGHT CARDS */}
                <motion.div
                    className="lg:col-span-5 grid grid-cols-1 md:grid-cols-2 gap-8"
                    initial={{ opacity: 0, x: 80 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
                    viewport={{ once: true }}
                >

                    {/* Expertise Card */}
                    <motion.div
                        className="relative col-span-2 bg-white/15 backdrop-blur-xl border border-white/30 rounded-4xl p-10 shadow-2xl overflow-hidden"
                        whileHover={{ y: -20, scale: 1.04 }}
                        transition={{ type: 'spring', stiffness: 160, damping: 18 }}
                    >
                        <div className="absolute inset-0 -z-10 bg-black/40 blur-2xl rounded-4xl" />
                        <div className="absolute inset-0 bg-gradient-to-br from-amber-600/20 opacity-0 hover:opacity-100 transition duration-500" />

                        <h4 className="text-3xl font-black text-white mb-6">
                            Our Expertise
                        </h4>
                        <ul className="space-y-3 text-lg text-slate-100/90">
                            <li>• Ultra-luxury residences</li>
                            <li>• Waterfront estates</li>
                            <li>• Boutique offices</li>
                        </ul>
                    </motion.div>

                    {/* Stat Card 1 */}
                    <motion.div
                        className="bg-gradient-to-br from-amber-600 to-amber-500 rounded-3xl p-8 text-center text-white shadow-2xl"
                        whileHover={{ scale: 1.1, rotate: 3 }}
                        transition={{ type: 'spring' }}
                    >
                        <div className="text-5xl font-black mb-2">200+</div>
                        <div className="uppercase tracking-widest text-sm font-semibold">
                            Projects
                        </div>
                    </motion.div>

                    {/* Stat Card 2 (flat for contrast) */}
                    <motion.div
                        className="bg-white/10 border border-white/30 rounded-3xl p-8 text-center text-white shadow-2xl"
                        whileHover={{ scale: 1.1, rotate: -3 }}
                        transition={{ type: 'spring' }}
                    >
                        <div className="text-5xl font-black mb-2">98%</div>
                        <div className="uppercase tracking-widest text-sm font-semibold">
                            Client Trust
                        </div>
                    </motion.div>
                </motion.div>
            </div>

            {/* Animations */}
            <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-25px); }
        }
      `}</style>

        </section>
    );
}
