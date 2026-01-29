// components/BeforeAfterSlider.tsx
"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import Image from "next/image";

interface BeforeAfterSliderProps {
    beforeImage: string;
    afterImage: string;
    width?: string;
    height?: string;
    beforeAlt?: string;
    afterAlt?: string;
}

const BeforeAfterSlider: React.FC<BeforeAfterSliderProps> = ({
    beforeImage,
    afterImage,
    width = "100%",
    height = "500px",
    beforeAlt = "Before transformation",
    afterAlt = "After transformation",
}) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [containerWidth, setContainerWidth] = useState<number>(0);

    // Motion value for handle position
    const handleX = useMotionValue(0);

    // Clip width for "after" image (as percentage string)
    const clipWidth = useTransform(
        handleX,
        [0, containerWidth],
        ["0%", "100%"]
    );

    // Update container width and initial handle position
    useEffect(() => {
        const updateWidth = () => {
            if (containerRef.current) {
                const w = containerRef.current.offsetWidth;
                setContainerWidth(w);
                handleX.set(w / 2); // start handle in center
            }
        };

        updateWidth();
        window.addEventListener("resize", updateWidth);
        return () => window.removeEventListener("resize", updateWidth);
    }, [handleX]);

    return (
        <div
            ref={containerRef}
            className="relative w-full mx-auto overflow-hidden rounded-2xl shadow-2xl"
            style={{ width, height }}
        >
            {/* Before Image */}
            <motion.div className="absolute inset-0 z-10 overflow-hidden rounded-2xl">
                <Image
                    src={beforeImage}
                    alt={beforeAlt}
                    fill
                    className="object-cover w-full h-full"
                    priority
                />
            </motion.div>

            {/* After Image clipped by handle */}
            <motion.div
                className="absolute inset-0 left-0 z-20 overflow-hidden rounded-2xl"
                style={{ width: clipWidth }}
            >
                <Image
                    src={afterImage}
                    alt={afterAlt}
                    fill
                    className="object-cover w-full h-full"
                    priority
                />
                {/* Subtle gradient overlay for depth */}
                <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-black/5 pointer-events-none" />
            </motion.div>

            {/* Premium Draggable Handle */}
            <motion.div
                className="absolute top-0 bottom-0 z-30 cursor-grab active:cursor-grabbing"
                drag="x"
                dragConstraints={containerRef}
                dragElastic={0.05}
                dragMomentum={false}
                style={{ x: handleX, left: -2 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
            >
                {/* Vertical line */}
                <div className="absolute top-0 bottom-0 w-0.5 bg-gradient-to-b from-white/40 via-white/80 to-white/40 shadow-[0_0_20px_rgba(255,255,255,0.5)]" />

                {/* Center handle circle */}
                <motion.div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-white shadow-2xl flex items-center justify-center backdrop-blur-sm border-2 border-white/50"
                    whileHover={{
                        scale: 1.15,
                        boxShadow: "0 0 30px rgba(255,255,255,0.8), 0 20px 40px rgba(0,0,0,0.3)"
                    }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                    {/* Arrows icon */}
                    <div className="flex items-center gap-1 text-gray-800">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                        </svg>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                        </svg>
                    </div>
                </motion.div>
            </motion.div>

            {/* Premium Glassmorphism Labels */}
            <motion.div
                className="absolute left-6 top-6 z-40 px-5 py-2.5 rounded-full bg-black/30 backdrop-blur-md border border-white/20 shadow-xl"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
            >
                <span className="text-white font-semibold text-sm tracking-wide uppercase">Before</span>
            </motion.div>
            <motion.div
                className="absolute right-6 top-6 z-40 px-5 py-2.5 rounded-full bg-white/30 backdrop-blur-md border border-white/40 shadow-xl"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
            >
                <span className="text-gray-900 font-semibold text-sm tracking-wide uppercase">After</span>
            </motion.div>
        </div>
    );
};

export default BeforeAfterSlider;
