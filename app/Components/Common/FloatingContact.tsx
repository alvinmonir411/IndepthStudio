"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, MessageCircle, X, MessageSquare } from "lucide-react";

export default function FloatingContact() {
    const [isOpen, setIsOpen] = useState(false);

    const contactOptions = [
        {
            icon: <Phone size={24} />,
            label: "Call Us",
            href: "tel:+15550001234",
            color: "bg-[#00E676]",
            delay: 0.1
        },
        {
            icon: <MessageCircle size={24} />,
            label: "WhatsApp",
            href: "whatsapp://send?phone=15550001234",
            color: "bg-[#25D366]",
            delay: 0.2
        },
    ];

    return (
        <div className="fixed bottom-10 right-10 z-[9999] flex flex-col items-end gap-5">
            <AnimatePresence>
                {isOpen && (
                    <div className="flex flex-col gap-5 items-end mb-2">
                        {contactOptions.map((option, index) => (
                            <motion.a
                                key={index}
                                href={option.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                initial={{ opacity: 0, y: 20, scale: 0.5 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: 20, scale: 0.5 }}
                                transition={{ delay: option.delay, ease: "backOut" }}
                                className={`w-16 h-16 rounded-full ${option.color} text-white flex items-center justify-center shadow-[0_15px_30px_rgba(0,0,0,0.15)] hover:scale-110 active:scale-95 transition-all group relative`}
                            >
                                {option.icon}
                                <span className="absolute right-20 bg-stone-900 text-white text-[10px] font-bold uppercase tracking-[0.2em] px-4 py-2 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-xl border border-white/10 backdrop-blur-md">
                                    {option.label}
                                </span>
                            </motion.a>
                        ))}
                    </div>
                )}
            </AnimatePresence>

            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(!isOpen)}
                className={`w-18 h-18 rounded-full flex items-center justify-center shadow-[0_20px_50px_rgba(0,0,0,0.2)] transition-all duration-700 ease-[0.23,1,0.32,1] ${isOpen ? 'bg-stone-900 text-white border border-white/20' : 'bg-amber-600 text-white'}`}
            >
                <AnimatePresence mode="wait">
                    {isOpen ? (
                        <motion.div
                            key="close"
                            initial={{ rotate: -90, opacity: 0 }}
                            animate={{ rotate: 0, opacity: 1 }}
                            exit={{ rotate: 90, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            <X size={32} />
                        </motion.div>
                    ) : (
                        <motion.div
                            key="open"
                            initial={{ rotate: 90, opacity: 0 }}
                            animate={{ rotate: 0, opacity: 1 }}
                            exit={{ rotate: -90, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            <MessageSquare size={32} />
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.button>
        </div>
    );
}
