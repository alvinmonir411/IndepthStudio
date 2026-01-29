"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useMotionTemplate } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import Link from "next/link";

const slides = [
    {
        img: "/ResidentialInteriorDesign.jpg",
        subheading: "01 / RESIDENTIAL",
        title: "Serene Urban Retreat",
        description: "Where modern comfort meets peaceful sophistication in the heart of the city.",
    },
    {
        img: "/CommercialinteriorDesign.jpg",
        subheading: "03 / COMMERCIAL",
        title: "Modern Corporate Elegance",
        description: "Redefining workspace dynamics with timeless style and functional innovation.",
    },
    {
        img: "/ResidentialInteriorDesign.jpg",
        subheading: "02 / COASTAL",
        title: "Luxurious Coastal Living",
        description: "Bringing the endless beauty and calm of the shore into your everyday home.",
    },

];

const ScrollStackImages = () => {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    return (
        <section ref={containerRef} className="relative bg-[#FDF8F3]">
            <div className="md:hidden py-10 px-6 text-center">
                <h2 className="text-3xl font-serif text-[#5C4033] mb-2">Our Capabilities</h2>
                <p className="text-stone-600 mb-8 max-w-sm mx-auto">Scroll down on desktop to experience our portfolio.</p>
            </div>

            {slides.map((slide, index) => (
                <Card key={index} slide={slide} index={index} total={slides.length} />
            ))}

            {/* Final CTA Section */}
            <div className="h-[50vh] flex items-center justify-center bg-[#FDF8F3] relative z-20">
                <div className="text-center px-6">
                    <h3 className="text-3xl md:text-5xl font-serif text-[#5C4033] mb-6">
                        Ready to Transform Your Space?
                    </h3>
                    <Link href="/services" className="inline-flex items-center gap-2 group bg-[#8B4513] text-white px-8 py-4 rounded-full text-sm uppercase tracking-widest hover:bg-[#6b360d] transition-all duration-300">
                        View All Services
                        <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </Link>
                </div>
            </div>
        </section>
    );
};
const Card = ({ slide, index, total }: { slide: any; index: number; total: number }) => {
    const ref = useRef(null)

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"],
    })

    const imageScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.15, 1, 0.98])
    const contentY = useTransform(scrollYProgress, [0, 1], [60, -60])
    const contentOpacity = useTransform(scrollYProgress, [0.1, 0.3, 0.7], [0, 1, 1])

    return (
        <div ref={ref} className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
            <div className="relative w-full h-full">

                {/* Background Image */}
                <motion.div
                    style={{ scale: imageScale }}
                    transition={{ duration: 2.6, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute inset-0 z-0"
                >
                    <Image
                        src={slide.img}
                        alt={slide.title}
                        fill
                        className="object-cover"
                        priority={index === 0}
                    />

                    {/* Luxury overlays */}
                    <div className="absolute inset-0 bg-black/35" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/30" />
                </motion.div>

                {/* Content */}
                <motion.div
                    style={{ y: contentY, opacity: contentOpacity }}
                    className="absolute inset-0 z-10 flex items-center justify-center text-center px-6 md:px-20"
                >
                    <div className="max-w-4xl">

                        <span className="inline-block mb-6 px-5 py-2 text-xs tracking-[0.35em] uppercase text-amber-200/80 bg-black/30 backdrop-blur-md rounded-full border border-white/10">
                            {slide.subheading}
                        </span>

                        <h2 className="text-4xl md:text-6xl lg:text-7xl font-serif text-white mb-6 leading-tight">
                            {slide.title}
                        </h2>

                        <p className="text-stone-300 text-lg md:text-xl font-light max-w-2xl mx-auto mb-12 leading-relaxed">
                            {slide.description}
                        </p>

                        <button className="group inline-flex items-center gap-3 bg-white/95 text-[#5C4033] px-9 py-4 rounded-full text-[11px] font-semibold uppercase tracking-[0.25em] hover:bg-white transition-all duration-300">
                            View Project
                            <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                        </button>
                    </div>
                </motion.div>

                {/* Index */}
                <div className="absolute bottom-10 right-10 text-white/10 text-[10rem] font-serif font-bold hidden md:block pointer-events-none">
                    {String(index + 1).padStart(2, "0")}
                </div>
            </div>
        </div>
    )
}

export default ScrollStackImages;
