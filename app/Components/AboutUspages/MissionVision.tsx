// app/components/MissionVision.tsx
"use client";

import { motion } from "framer-motion";

const MissionVision: React.FC = () => {
    return (
        <section className="relative bg-[#FDF8F3] py-24 px-6 md:px-20 overflow-hidden">
            {/* Decorative floating shapes */}
            <motion.div
                className="absolute top-10 left-[-50px] w-72 h-72 bg-amber-200 opacity-20 rounded-full blur-3xl animate-floatSlow"
                animate={{ y: [0, 20, 0] }}
                transition={{ duration: 10, repeat: Infinity }}
            />
            <motion.div
                className="absolute bottom-[-40px] right-[-60px] w-96 h-96 bg-amber-600 opacity-10 rounded-full blur-2xl animate-floatSlow"
                animate={{ y: [0, -30, 0] }}
                transition={{ duration: 12, repeat: Infinity }}
            />

            {/* Section Heading */}
            <h2 className="text-5xl md:text-6xl font-extrabold text-center mb-20 text-amber-600 relative z-10">
                Our Mission & Vision
            </h2>

            {/* Content */}
            <div className="relative z-10 flex flex-col md:flex-row gap-12 md:gap-20 items-center justify-center">
                {/* Mission Card */}
                <motion.div
                    className="bg-white rounded-[2rem] shadow-2xl p-12 md:w-1/2 transform rotate-[-2deg] border-l-8 border-amber-600"
                    initial={{ opacity: 0, x: -100, rotate: -5 }}
                    whileInView={{ opacity: 1, x: 0, rotate: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: "easeOut" }}
                >
                    <h3 className="text-3xl font-bold mb-6 text-amber-600">Mission</h3>
                    <p className="text-gray-700 text-lg leading-relaxed">
                        To transform every space into a reflection of elegance, functionality, and personal style.
                        We deliver thoughtful interior solutions that balance creativity, comfort, and sustainability—ensuring our clients experience spaces that inspire and elevate daily life.
                    </p>
                </motion.div>

                {/* Vision Card */}
                <motion.div
                    className="bg-white rounded-[2rem] shadow-2xl p-12 md:w-1/2 transform rotate-[3deg] border-r-8 border-amber-600"
                    initial={{ opacity: 0, x: 100, rotate: 5 }}
                    whileInView={{ opacity: 1, x: 0, rotate: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
                >
                    <h3 className="text-3xl font-bold mb-6 text-amber-600">Vision</h3>
                    <p className="text-gray-700 text-lg leading-relaxed">
                        To be recognized as a leading interior design studio setting global standards for innovation, quality, and client satisfaction.
                        Our long-term goal is to redefine how people interact with spaces, creating environments that are as functional as they are breathtaking.
                    </p>
                </motion.div>
            </div>
        </section>
    );
};

export default MissionVision;
