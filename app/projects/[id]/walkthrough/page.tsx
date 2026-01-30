'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { projects } from '@/app/projects/projectsData';
import { notFound, useRouter } from 'next/navigation';
import { X } from 'lucide-react';

export default function WalkthroughPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = React.use(params);
    const router = useRouter();
    const project = projects.find((p) => p.id === parseInt(id));

    if (!project || !project.walkthroughUrl) {
        return notFound();
    }

    return (
        <main className="fixed inset-0 z-[100] bg-black">
            {/* Close/Back Button */}
            <motion.button
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                onClick={() => router.back()}
                className="absolute top-6 right-6 md:top-10 md:right-10 z-[110] w-12 h-12 md:w-16 md:h-16 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-xl border border-white/20 flex items-center justify-center text-white transition-all duration-300"
            >
                <X size={24} />
            </motion.button>

            {/* Container */}
            <div className="w-full h-full relative">
                {/* Live Badge */}
                <div className="absolute top-8 left-8 z-10 pointer-events-none hidden md:block">
                    <div className="flex items-center gap-4 bg-black/40 backdrop-blur-xl px-6 py-3 rounded-full border border-white/20">
                        <span className="relative flex h-3 w-3">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-500"></span>
                        </span>
                        <span className="text-white text-[10px] uppercase tracking-[0.4em] font-bold">Immersive Experience</span>
                    </div>
                </div>

                <div className="w-full h-full bg-stone-950 relative">
                    <iframe
                        src={project.walkthroughUrl}
                        className="w-full h-full border-none"
                        allowFullScreen
                        allow="xr-spatial-tracking"
                    />

                    {/* Floating Controls Hint */}
                    <div className="absolute bottom-8 left-8 right-8 md:bottom-10 md:right-10 md:left-auto flex justify-center md:justify-end pointer-events-none">
                        <div className="px-6 py-3 bg-black/40 backdrop-blur-md rounded-full border border-white/10 text-white/50 text-[10px] uppercase tracking-[0.3em] flex items-center gap-4">
                            <span>Rotate to View</span>
                            <div className="w-px h-3 bg-white/20" />
                            <span>Click to Walk</span>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
