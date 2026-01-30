// app/components/FixedDesignProcess.tsx
"use client";

import { motion } from "framer-motion";
import { Check, Users, Palette, Play, Hammer, Award } from "lucide-react";

const steps = [
    {
        number: "01",
        title: "Consultation",
        icon: Users,
        desc: "Deep dive into your vision, lifestyle, and aspirations. We listen 80%, talk 20%.",
        color: "from-amber-500 to-amber-400",
    },
    {
        number: "02",
        title: "Design & Planning",
        icon: Palette,
        desc: "3D renderings, material boards, spatial planning. Every detail visualized before construction.",
        color: "from-emerald-500 to-emerald-400",
    },
    {
        number: "03",
        title: "Approval & Refinement",
        icon: Play,
        desc: "Full presentation with VR walkthrough. Unlimited revisions until perfect.",
        color: "from-blue-500 to-blue-400",
    },
    {
        number: "04",
        title: "Execution",
        icon: Hammer,
        desc: "Master craftsmen + daily progress updates. On-site architect supervision.",
        color: "from-purple-500 to-purple-400",
    },
    {
        number: "05",
        title: "Final Handover",
        icon: Award,
        desc: "White-glove delivery + lifetime design support. Your forever home.",
        color: "from-pink-500 to-rose-500",
    },
];

const FixedDesignProcess: React.FC = () => {
    return (
        <section className="relative bg-[#FDF8F3] py-32 px-6 lg:px-24 overflow-hidden">
            {/* Header */}
            <motion.div
                className="text-center mb-24"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
            >
                <h2 className="text-5xl lg:text-6xl font-extrabold text-amber-600 tracking-tight">
                    Our Design Process
                </h2>
                <p className="mt-4 text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                    Five steps to create spaces that inspire. Transparent, smooth, and precise.
                </p>
            </motion.div>

            {/* Steps */}
            <div className="relative max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-5 gap-8">
                {steps.map((step, idx) => {
                    const Icon = step.icon;
                    const isEven = idx % 2 === 1;

                    return (
                        <motion.div
                            key={step.number}
                            className={`relative z-10 ${isEven ? "md:-translate-y-6 lg:-translate-y-12" : ""}`}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: idx * 0.15 }}
                        >
                            {/* Card */}
                            <motion.div
                                className="relative bg-white/90 border border-gray-200 rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-transform duration-500 cursor-pointer h-full flex flex-col items-center"
                                whileHover={{ y: -10, scale: 1.05 }}
                            >
                                {/* Step Number */}
                                <div className="absolute -top-6 w-16 h-16 rounded-full bg-gradient-to-br from-amber-500 to-orange-400 flex items-center justify-center text-white font-bold text-xl shadow-lg border-2 border-white">
                                    {step.number}
                                </div>

                                {/* Icon */}
                                <div className="w-14 h-14 bg-white/30 rounded-xl flex items-center justify-center shadow-inner mb-4">
                                    <Icon className="w-6 h-6 text-amber-600" />
                                </div>

                                {/* Title */}
                                <h4 className="text-xl md:text-2xl font-bold text-gray-800 mb-2 text-center">
                                    {step.title}
                                </h4>

                                {/* Description */}
                                <p className="text-gray-600 text-sm md:text-base text-center leading-relaxed">
                                    {step.desc}
                                </p>

                                {/* Step Complete */}
                                <div className="flex items-center gap-2 mt-6">
                                    <div className="w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center">
                                        <Check className="w-3 h-3 text-white" />
                                    </div>
                                    <span className="text-sm text-gray-700 uppercase font-semibold tracking-wide">
                                        Step Complete
                                    </span>
                                </div>
                            </motion.div>
                        </motion.div>
                    );
                })}
            </div>
        </section>
    );
};

export default FixedDesignProcess;
