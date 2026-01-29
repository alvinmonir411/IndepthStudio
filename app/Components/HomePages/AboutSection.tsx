"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import Link from "next/link";

const AboutSection = () => {
    return (
        <section className="py-20 md:py-32 bg-[#FDF8F3] overflow-hidden">
            <div className="container mx-auto px-6 md:px-12">
                <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-20">

                    {/* Left Side - Text */}
                    <div className="w-full md:w-1/2">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                        >
                            <span className="text-[#8B4513] uppercase tracking-[0.2em] text-xs font-semibold mb-4 inline-block">
                                Who We Are
                            </span>
                            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-[#5C4033] mb-6 leading-tight">
                                Design That Tells <br />
                                <span className="italic text-[#8B4513]">Your Story</span>
                            </h2>
                            <p className="text-stone-600 text-lg leading-relaxed mb-8 font-light">
                                At IndepthStudio, we believe that every space has a voice. Our mission is to listen to your vision and translate it into a living reality that breathes elegance, comfort, and sophistication.
                            </p>

                            <div className="flex flex-col gap-4 mb-10">
                                {["Bespoke Interior Planning", "Sustainable Design Solutions", "Luxury Furniture Curation"].map((item, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.5, delay: 0.2 + (index * 0.1) }}
                                        className="flex items-center gap-3"
                                    >
                                        <CheckCircle2 className="w-5 h-5 text-[#8B4513]" />
                                        <span className="text-stone-700 font-medium">{item}</span>
                                    </motion.div>
                                ))}
                            </div>

                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="primary_btn w-fit"
                            >
                                <Link href="/About" className=" flex items-center gap-2"> Discover Our Story
                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" /></Link>
                            </motion.div>
                        </motion.div>
                    </div>

                    {/* Right Side - Image */}
                    <div className="w-full md:w-1/2 relative">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, x: 50 }}
                            whileInView={{ opacity: 1, scale: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, ease: "easeOut" }}
                            className="relative aspect-[4/5] md:aspect-square lg:aspect-[4/5] overflow-hidden rounded-2xl"
                        >
                            {/* Image Placeholder - Replace src with actual image */}
                            <Image
                                src="/AboutUs.jpg"
                                alt="Minimalist luxury interior"
                                fill
                                className="object-cover hover:scale-105 transition-transform duration-700"
                                priority
                            />

                            {/* Floating Badge */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5, duration: 0.8 }}
                                className="absolute bottom-8 left-8 bg-white/90 backdrop-blur-md p-6 rounded-xl shadow-lg max-w-xs hidden sm:block"
                            >
                                <p className="text-[#5C4033] font-serif text-2xl font-bold mb-1">15+</p>
                                <p className="text-stone-600 text-xs uppercase tracking-wider">Years of Experience</p>
                            </motion.div>
                        </motion.div>

                        {/* Decorative Element */}
                        <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-[#E8DCC4] rounded-full z-[-1] opacity-50 blur-3xl" />
                        <div className="absolute -top-10 -left-10 w-40 h-40 bg-[#D4C3B0] rounded-full z-[-1] opacity-50 blur-3xl" />
                    </div>

                </div>
            </div>
        </section>
    );
};

export default AboutSection;
