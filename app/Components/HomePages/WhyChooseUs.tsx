"use client";
import React from 'react';
import { motion, Variants } from 'framer-motion';
import { Award, ShieldCheck, FileSearch, PenTool } from 'lucide-react';

const reasons = [
    {
        id: 1,
        icon: Award,
        title: "Years of Excellence",
        description: "Decades of industry-leading expertise, crafting spaces that garner admiration."
    },
    {
        id: 2,
        icon: ShieldCheck,
        title: "Uncompromising Quality",
        description: "We source only the finest materials, ensuring longevity and timeless beauty."
    },
    {
        id: 3,
        icon: FileSearch,
        title: "Transparent Process",
        description: "Clear communication at every step. No hidden costs, no unwelcome surprises."
    },
    {
        id: 4,
        icon: PenTool,
        title: "Bespoke Vision",
        description: "Tailored designs that reflect your personality, not just current trends."
    }
];

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2
        }
    }
};

const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.5,
            ease: "easeOut"
        }
    }
};

const WhyChooseUs = () => {
    return (
        <section className="bg-[#141414] text-[#FDF8F3] py-24 px-6 md:px-12 relative overflow-hidden">
            {/* Background Gradients */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
                <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-amber-900/10 rounded-full blur-[100px]" />
                <div className="absolute -bottom-[10%] -right-[10%] w-[40%] h-[40%] bg-amber-900/10 rounded-full blur-[100px]" />
            </div>


            <div className="max-w-7xl mx-auto relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <span className="text-amber-500/80 uppercase tracking-[0.2em] text-xs font-semibold mb-4 inline-block">
                        Why Choose Us
                    </span>
                    <h2 className="text-4xl md:text-5xl font-serif text-[#FDF8F3]">
                        Elevating <span className="italic text-amber-500">Expectations</span>
                    </h2>
                </motion.div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
                >
                    {reasons.map((item) => (
                        <motion.div
                            key={item.id}
                            variants={itemVariants}
                            whileHover={{ y: -5, transition: { duration: 0.2 } }}
                            className="bg-white/5 border border-white/10 p-8 rounded-xl hover:bg-white/10 hover:border-amber-500/30 transition-colors duration-300 group"
                        >
                            <div className="mb-6 inline-flex p-3 rounded-lg bg-white/5 group-hover:bg-amber-500/20 transition-colors duration-300">
                                <item.icon className="w-8 h-8 text-stone-300 group-hover:text-amber-400 transition-colors duration-300" />
                            </div>
                            <h3 className="text-xl font-medium text-[#FDF8F3] mb-3 font-serif">
                                {item.title}
                            </h3>
                            <p className="text-stone-400 text-sm leading-relaxed group-hover:text-stone-300 transition-colors duration-300">
                                {item.description}
                            </p>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default WhyChooseUs;
