"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useSpring, useTransform } from "framer-motion";

interface StatCardProps {
    icon: React.ReactNode;
    value: number;
    suffix?: string;
    label: string;
    delay: number;
}

const StatCard: React.FC<StatCardProps> = ({ icon, value, suffix = "", label, delay }) => {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });
    const [hasAnimated, setHasAnimated] = useState(false);

    // Animated counter
    const springValue = useSpring(0, {
        stiffness: 50,
        damping: 30,
        restDelta: 0.5,
    });

    const displayValue = useTransform(springValue, (latest) =>
        Math.floor(latest).toLocaleString()
    );

    useEffect(() => {
        if (isInView && !hasAnimated) {
            setTimeout(() => {
                springValue.set(value);
                setHasAnimated(true);
            }, delay);
        }
    }, [isInView, value, delay, springValue, hasAnimated]);

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: delay / 1000, type: "spring" }}
            whileHover={{
                scale: 1.05,
                y: -10,
                transition: { type: "spring", stiffness: 400, damping: 17 }
            }}
            className="relative group"
        >
            {/* Gradient border effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-amber-400 via-orange-500 to-pink-500 rounded-3xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500" />

            {/* Card content */}
            <div className="relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl overflow-hidden">
                {/* Animated background gradient */}
                <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-amber-500/10 via-transparent to-pink-500/10"
                    animate={{
                        backgroundPosition: ["0% 0%", "100% 100%"],
                    }}
                    transition={{
                        duration: 8,
                        repeat: Infinity,
                        repeatType: "reverse",
                    }}
                />

                {/* Floating particles */}
                <div className="absolute top-4 right-4 w-2 h-2 bg-amber-400 rounded-full opacity-60 animate-pulse" />
                <div className="absolute bottom-6 left-6 w-1.5 h-1.5 bg-pink-400 rounded-full opacity-40 animate-pulse delay-300" />

                {/* Icon */}
                <motion.div
                    className="relative mb-6 text-amber-400"
                    whileHover={{ rotate: 360, scale: 1.2 }}
                    transition={{ duration: 0.6, type: "spring" }}
                >
                    {icon}
                </motion.div>

                {/* Number */}
                <div className="relative mb-2">
                    <motion.h3 className="text-5xl md:text-6xl font-bold bg-gradient-to-br from-white via-amber-100 to-amber-300 bg-clip-text text-transparent">
                        <motion.span>{displayValue}</motion.span>
                        <span className="text-amber-400">{suffix}</span>
                    </motion.h3>
                </div>

                {/* Label */}
                <p className="relative text-zinc-300 text-lg font-medium tracking-wide">
                    {label}
                </p>

                {/* Bottom accent line */}
                <motion.div
                    className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-amber-400 via-orange-500 to-pink-500"
                    initial={{ width: "0%" }}
                    animate={isInView ? { width: "100%" } : {}}
                    transition={{ duration: 1, delay: delay / 1000 + 0.3 }}
                />
            </div>
        </motion.div>
    );
};

const AchievementsSection = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

    const achievements = [
        {
            icon: (
                <svg className="w-14 h-14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            ),
            value: 15,
            suffix: "+",
            label: "Years of Experience",
            delay: 200,
        },
        {
            icon: (
                <svg className="w-14 h-14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
            ),
            value: 350,
            suffix: "+",
            label: "Projects Completed",
            delay: 400,
        },
        {
            icon: (
                <svg className="w-14 h-14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            ),
            value: 500,
            suffix: "+",
            label: "Happy Clients",
            delay: 600,
        },
        {
            icon: (
                <svg className="w-14 h-14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
            ),
            value: 50,
            suffix: "+",
            label: "Team Members",
            delay: 800,
        },
    ];

    return (
        <section
            ref={sectionRef}
            className="relative w-full py-24 px-6 overflow-hidden bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950"
        >
            {/* Animated background elements */}
            <div className="absolute inset-0 opacity-20">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-500 rounded-full blur-[120px] animate-pulse" />
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-pink-500 rounded-full blur-[120px] animate-pulse delay-1000" />
            </div>

            {/* Diagonal lines pattern */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute inset-0" style={{
                    backgroundImage: `repeating-linear-gradient(
                        45deg,
                        transparent,
                        transparent 50px,
                        rgba(255,255,255,0.1) 50px,
                        rgba(255,255,255,0.1) 51px
                    )`
                }} />
            </div>

            <div className="relative max-w-7xl mx-auto">
                {/* Section header */}
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: -30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8 }}
                >
                    <motion.div
                        className="inline-block mb-4 px-6 py-2 rounded-full bg-gradient-to-r from-amber-500/20 to-pink-500/20 border border-amber-500/30 backdrop-blur-sm"
                        initial={{ scale: 0 }}
                        animate={isInView ? { scale: 1 } : {}}
                        transition={{ duration: 0.5, type: "spring" }}
                    >
                        <span className="text-amber-400 font-semibold text-sm tracking-wider uppercase">
                            Our Achievements
                        </span>
                    </motion.div>

                    <h2 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-white via-amber-100 to-white bg-clip-text text-transparent">
                        Numbers That Speak
                    </h2>
                    <p className="text-zinc-400 text-lg md:text-xl max-w-2xl mx-auto">
                        Building trust through excellence, one project at a time
                    </p>
                </motion.div>

                {/* Stats grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {achievements.map((achievement, index) => (
                        <StatCard key={index} {...achievement} />
                    ))}
                </div>

                {/* Bottom decorative element */}
                <motion.div
                    className="mt-16 flex justify-center"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.8, delay: 1 }}
                >
                    <div className="w-24 h-1 bg-gradient-to-r from-transparent via-amber-500 to-transparent rounded-full" />
                </motion.div>
            </div>
        </section>
    );
};

export default AchievementsSection;
