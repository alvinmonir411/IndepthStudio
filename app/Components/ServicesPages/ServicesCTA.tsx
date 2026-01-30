'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Send } from 'lucide-react';
import MagneticButton from '../MagneticButton';
import Link from 'next/link';

export default function ServicesCTA() {
    return (
        <section className="relative py-32 md:py-48 bg-stone-950 overflow-hidden">
            {/* Artistic Background Elements */}
            <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-amber-600/10 blur-[120px] rounded-full opacity-50 pointer-events-none" />
            <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-stone-400/5 blur-[120px] rounded-full opacity-50 pointer-events-none" />

            <div className="container mx-auto px-6 md:px-12 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                    className="max-w-4xl mx-auto text-center"
                >
                    <div className="inline-flex items-center gap-4 mb-8 bg-white/5 border border-white/10 px-6 py-2 rounded-full backdrop-blur-md">
                        <Sparkles size={14} className="text-amber-500" />
                        <span className="uppercase tracking-[0.4em] text-[10px] font-bold text-amber-200">
                            Ready to Transform?
                        </span>
                    </div>

                    <h2 className="text-5xl md:text-7xl lg:text-8xl font-light text-white leading-[1.1] mb-10 tracking-tight">
                        <div className="overflow-hidden h-fit">
                            <motion.span
                                initial={{ y: "100%" }}
                                whileInView={{ y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                                className="block"
                            >
                                Let’s Create Your
                            </motion.span>
                        </div>
                        <div className="overflow-hidden h-fit">
                            <motion.span
                                initial={{ y: "100%" }}
                                whileInView={{ y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                                className="block font-serif italic text-amber-500"
                            >
                                Perfect Space
                            </motion.span>
                        </div>
                    </h2>

                    <p className="text-stone-400 text-lg md:text-xl font-light leading-relaxed mb-16 max-w-2xl mx-auto">
                        Your vision deserves uncompromised excellence. Partner with Indepth Studio
                        to turn your architectural dreams into living reality.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
                        <MagneticButton>
                            <Link
                                href="/contact"
                                className="group relative px-12 py-6 bg-amber-600 text-white overflow-hidden transition-all duration-500 hover:shadow-[0_20px_50px_-10px_rgba(195,136,34,0.5)] rounded-sm flex items-center gap-3"
                            >
                                <span className="relative z-10 uppercase tracking-[0.25em] text-xs font-bold">Book a Consultation</span>
                                <ArrowRight size={16} className="relative z-10 group-hover:translate-x-1 transition-transform duration-300" />
                                <div className="absolute inset-0 bg-stone-900 translate-y-full group-hover:translate-y-0 transition-transform duration-[600ms] ease-[0.22,1,0.36,1]" />
                            </Link>
                        </MagneticButton>
                    </div>

                    <div className="mt-24 pt-12 border-t border-white/5 flex flex-col md:flex-row items-center justify-center gap-12 grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-700">
                        <div className="flex flex-col items-center">
                            <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-stone-500 mb-2">Award Winning</span>
                            <span className="text-white font-serif italic text-lg">Excellence 2023</span>
                        </div>
                        <div className="w-px h-8 bg-white/10 hidden md:block" />
                        <div className="flex flex-col items-center">
                            <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-stone-500 mb-2">Certified Quality</span>
                            <span className="text-white font-serif italic text-lg">Eco-Material Gold</span>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Subtle Noise Texture */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('/noise.png')] mix-blend-overlay" />
        </section>
    );
}
