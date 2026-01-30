"use client"
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export const Banner = () => {
    return (
        <section className="relative h-screen w-full flex items-center overflow-hidden bg-black">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <img
                    src={"/heroImage.jpg"}
                    alt="Luxury modern living room interior"
                    className="w-full h-full object-cover object-center scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/30" />
            </div>

            {/* Content */}
            <div className="container mx-auto px-6 md:px-12 relative z-10 pt-20">
                <div className="">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                    >
                        <span className="text-amber-400 uppercase tracking-[0.25em] text-xs md:text-sm font-medium mb-6 inline-block border-b border-amber-400/30 pb-2">
                            Award-Winning Interior Design Studio
                        </span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                        className="text-5xl md:text-7xl lg:text-8xl font-light text-stone-100 mb-8 leading-[1.1] tracking-tight"
                    >
                        Crafting Spaces That <br />
                        <span className="text-amber-100/90 font-serif italic">Inspire Living</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
                        className="text-lg md:text-xl text-stone-300/90 mb-12 max-w-xl leading-relaxed font-light"
                    >
                        We transform ordinary spaces into extraordinary experiences.
                        Where timeless elegance meets modern sophistication.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
                        className="flex flex-col sm:flex-row gap-6"
                    >
                        <Link href="/contact" className="group bg-amber-600 rounded-full text-white px-8 py-4 uppercase tracking-widest text-xs font-semibold hover:bg-amber-700 transition-all duration-300 flex items-center justify-center sm:justify-start">
                            Book Free Consultation
                            <ArrowRight className="ml-3 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                        </Link>
                        <Link href="/projects" className="bg-transparent border rounded-full border-stone-500 text-stone-200 px-8 py-4 uppercase tracking-widest text-xs font-semibold hover:bg-white hover:text-black hover:border-white transition-all duration-300 backdrop-blur-sm">
                            View Our Projects
                        </Link>
                    </motion.div>
                </div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 1.5 }}
                className="absolute bottom-12 left-1/2 -translate-x-1/2 z-10"
            >
                <div className="flex flex-col items-center gap-3">
                    <span className="text-stone-400/60 text-[10px] uppercase tracking-[0.3em]">Scroll</span>
                    <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: 60 }}
                        transition={{ duration: 1.5, delay: 1.8, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
                        className="w-px bg-gradient-to-b from-amber-500/50 to-transparent"
                    />
                </div>
            </motion.div>
        </section>
    );
};

export default Banner;
