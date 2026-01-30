'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle2, Clock, Users, Gem, Paintbrush2 } from 'lucide-react';
import { Service } from '@/app/services/servicesData';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

interface ServiceDetailModalProps {
    service: Service;
}

export default function ServiceDetailModal({ service }: ServiceDetailModalProps) {
    const router = useRouter();

    const handleClose = () => {
        router.back();
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6 bg-stone-950/80 backdrop-blur-md">
            <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className="relative bg-white w-full max-w-5xl max-h-[90vh] overflow-hidden rounded-[2rem] shadow-2xl flex flex-col md:flex-row"
            >
                {/* Close Button */}
                <button
                    onClick={handleClose}
                    className="absolute top-6 right-6 z-50 p-2 bg-white/20 hover:bg-white/40 md:bg-stone-100 md:hover:bg-stone-200 rounded-full transition-colors text-stone-900"
                >
                    <X size={24} />
                </button>

                {/* Left Side: Visuals */}
                <div className="relative w-full md:w-5/12 h-64 md:h-auto overflow-hidden">
                    <Image
                        src={service.image}
                        alt={service.title}
                        fill
                        className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-stone-900/60 to-transparent flex items-bottom p-8">
                        <div className="mt-auto">
                            <span className="text-amber-400 uppercase tracking-widest text-[10px] font-bold block mb-2">Exclusively by Indepth Studio</span>
                            <h2 className="text-3xl font-serif italic text-white leading-tight">{service.title}</h2>
                        </div>
                    </div>
                </div>

                {/* Right Side: Content */}
                <div className="w-full md:w-7/12 overflow-y-auto p-8 md:p-12 custom-scrollbar">
                    <div className="mb-10">
                        <p className="text-stone-600 leading-relaxed font-light text-lg">
                            {service.shortDescription}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                        {/* Included */}
                        <div className="space-y-4">
                            <div className="flex items-center gap-2 text-amber-600">
                                <CheckCircle2 size={18} />
                                <h4 className="uppercase tracking-widest text-xs font-bold">What's Included</h4>
                            </div>
                            <ul className="space-y-2">
                                {service.details.included.map((item, i) => (
                                    <li key={i} className="text-sm text-stone-500 font-light flex items-center gap-2">
                                        <div className="w-1 h-1 bg-amber-400 rounded-full" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Approach */}
                        <div className="space-y-4">
                            <div className="flex items-center gap-2 text-amber-600">
                                <Paintbrush2 size={18} />
                                <h4 className="uppercase tracking-widest text-xs font-bold">Design Approach</h4>
                            </div>
                            <p className="text-sm text-stone-500 font-light leading-relaxed">
                                {service.details.approach}
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 border-t border-stone-100 pt-10">
                        <div className="flex flex-col gap-1">
                            <div className="flex items-center gap-2 text-stone-400 mb-1">
                                <Gem size={14} />
                                <span className="uppercase text-[10px] tracking-widest font-bold">Materials</span>
                            </div>
                            <span className="text-xs text-stone-600 font-medium">{service.details.materials}</span>
                        </div>
                        <div className="flex flex-col gap-1">
                            <div className="flex items-center gap-2 text-stone-400 mb-1">
                                <Clock size={14} />
                                <span className="uppercase text-[10px] tracking-widest font-bold">Timeline</span>
                            </div>
                            <span className="text-xs text-stone-600 font-medium">{service.details.timeline}</span>
                        </div>
                        <div className="flex flex-col gap-1">
                            <div className="flex items-center gap-2 text-stone-400 mb-1">
                                <Users size={14} />
                                <span className="uppercase text-[10px] tracking-widest font-bold">Suitable For</span>
                            </div>
                            <span className="text-xs text-stone-600 font-medium">{service.details.suitableFor}</span>
                        </div>
                    </div>

                    <div className="mt-12">
                        <button className="w-full bg-amber-600 text-white py-4 rounded-xl uppercase tracking-widest text-xs font-bold hover:bg-amber-700 transition-colors shadow-lg shadow-amber-600/20">
                            Book a Consultation
                        </button>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
