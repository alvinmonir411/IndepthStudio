"use client"
import { motion, Variants } from "framer-motion";
import { ArrowUpRight, Instagram, Twitter, Linkedin, Mail, Phone, Sparkles } from "lucide-react";
import Link from "next/link";

const Footer = () => {
    const currentYear = new Date().getFullYear();

    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2
            }
        }
    };

    const itemVariants: Variants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.8,
                ease: [0.25, 1, 0.5, 1] as const
            }
        }
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };

    return (
        <footer className="relative w-full bg-black pt-40 pb-20 px-6 overflow-hidden">
            {/* Massive Brand Backdrop - High Impact */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden select-none flex items-center justify-center">
                <motion.h2
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 0.07, scale: 0.95 }} // reduce scale
                    transition={{ duration: 2 }}
                    className="text-[25vw] font-black text-white leading-none whitespace-nowrap tracking-tighter uppercase"
                >
                    INDEPTH STUDIO
                </motion.h2>
            </div>

            <div className="max-w-7xl mx-auto relative z-10">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="grid grid-cols-1 lg:grid-cols-12 gap-24 mb-40"
                >
                    {/* Brand Meta */}
                    <div className="lg:col-span-6">
                        <motion.div variants={itemVariants} className="flex items-center gap-6 mb-16">
                            <div className="w-16 h-16 bg-amber-500 flex items-center justify-center">
                                <Sparkles className="text-black w-8 h-8" />
                            </div>
                            <span className="text-4xl font-black text-white tracking-tighter uppercase">In-Depth.</span>
                        </motion.div>

                        <motion.h4 variants={itemVariants} className="text-5xl lg:text-7xl font-black text-white leading-[1] mb-16 uppercase max-w-2xl">
                            The highest standard of <span className="text-amber-500 italic">Interior Architecture.</span>
                        </motion.h4>

                        <motion.div variants={itemVariants} className="flex gap-12">
                            <div className="flex flex-col gap-2">
                                <span className="text-zinc-600 text-[10px] font-black uppercase tracking-[0.4em]">Inquiries</span>
                                <a href="mailto:hello@indepth.studio" className="text-white text-xl font-bold hover:text-amber-500 transition-colors underline decoration-amber-500/20 underline-offset-8">hello@indepth.studio</a>
                            </div>
                            <div className="flex flex-col gap-2">
                                <span className="text-zinc-600 text-[10px] font-black uppercase tracking-[0.4em]">Direct</span>
                                <a href="tel:+442079460123" className="text-white text-xl font-bold hover:text-amber-500 transition-colors underline decoration-amber-500/20 underline-offset-8">+44 20 7946 0123</a>
                            </div>
                        </motion.div>
                    </div>

                    {/* Navigation Grid */}
                    <div className="lg:col-span-6 grid grid-cols-2 gap-16">
                        <motion.div variants={itemVariants} className="flex flex-col gap-10">
                            <h5 className="text-[10px] font-black uppercase tracking-[0.6em] text-amber-500">Navigation</h5>
                            <div className="flex flex-col gap-6">
                                {['The Studio', 'Portfolio', 'Insights', 'Contact'].map((link) => (
                                    <Link key={link} href="#" className="text-2xl font-black text-white hover:translate-x-4 transition-transform duration-500 flex items-center group uppercase">
                                        {link}
                                        <ArrowUpRight className="w-6 h-6 opacity-0 group-hover:opacity-100 transition-opacity ml-4 text-amber-500" />
                                    </Link>
                                ))}
                            </div>
                        </motion.div>

                        <motion.div variants={itemVariants} className="flex flex-col gap-10">
                            <h5 className="text-[10px] font-black uppercase tracking-[0.6em] text-amber-500">Legal</h5>
                            <div className="flex flex-col gap-6">
                                {['Privacy', 'Terms', 'Licensing', 'Cookies'].map((link) => (
                                    <Link key={link} href="#" className="text-2xl font-black text-zinc-600 hover:text-white transition-colors duration-500 flex items-center group uppercase">
                                        {link}
                                    </Link>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </motion.div>

                {/* Bottom Credits */}
                <motion.div
                    variants={itemVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="flex flex-col md:flex-row justify-between items-center gap-12 pt-20 border-t border-white/10"
                >
                    <div className="flex gap-10">
                        {[Instagram, Twitter, Linkedin].map((Icon, i) => (
                            <Link key={i} href="#" className="text-zinc-600 hover:text-amber-500 transition-colors">
                                <Icon className="w-6 h-6" />
                            </Link>
                        ))}
                    </div>

                    <div className="text-[10px] font-black uppercase tracking-[0.6em] text-zinc-700">
                        © {currentYear} INDEPTH STUDIO. BUILT FOR EXCELLENCE.
                    </div>

                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        onClick={scrollToTop}
                        className="flex items-center gap-4 bg-zinc-900 px-8 py-4 cursor-pointer"
                    >
                        <div className="w-2 h-2 bg-amber-500" />
                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white">Back to top</span>
                    </motion.div>
                </motion.div>
            </div>
        </footer>
    );
};

export default Footer;
