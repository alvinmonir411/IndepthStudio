"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Send,
    Phone,
    Mail,
    MapPin,
    Instagram,
    Facebook,
    Twitter,
    CheckCircle2,
    Sparkles,
    ArrowUpRight,
    Globe,
    MessageSquare,
    Compass
} from 'lucide-react';
import { sendContactEmail } from '../actions/contact';
import { toast } from 'react-toastify';

export default function ContactPage() {
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData(e.currentTarget);
        const data = {
            fullName: formData.get('fullName') as string,
            email: formData.get('email') as string,
            phone: formData.get('phone') as string,
            projectType: formData.get('projectType') as string,
            message: formData.get('message') as string,
        };

        const result = await sendContactEmail(data);

        if (result.success) {
            setIsSubmitted(true);
            toast.success('Message sent! We will get back to you soon.');
        } else {
            toast.error('Something went wrong. Please try again.');
        }

        setLoading(false);
    };

    return (
        <main className="min-h-screen bg-[#FDF8F3] text-stone-900 overflow-x-hidden">
            {/* 1. HERO SECTION - Cinematic & Bold */}
            <section className="relative h-[80vh] flex items-center justify-center overflow-hidden bg-stone-950">
                {/* Background Video/Image Placeholder Pattern */}
                <div className="absolute inset-0 z-0 opacity-40">
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-stone-950/50 to-stone-950" />
                    <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '50px 50px' }} />
                </div>

                <div className="container mx-auto px-6 relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center justify-center gap-3 text-amber-500 mb-8"
                    >
                        <Globe size={20} className="animate-pulse" />
                        <span className="uppercase tracking-[0.6em] text-[10px] font-bold">Global Design Studio</span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                        className="text-7xl md:text-[12rem] font-light leading-[0.8] tracking-tighter text-white"
                    >
                        Connect <br />
                        <span className="font-serif italic text-stone-400">& Create.</span>
                    </motion.h1>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6 }}
                        className="mt-16 flex justify-center"
                    >
                        <div className="w-px h-24 bg-gradient-to-b from-amber-500 to-transparent" />
                    </motion.div>
                </div>

                {/* Floating Elements for "Uncommon" feel */}
                <div className="absolute top-1/4 left-10 w-24 h-24 border border-white/10 rounded-full animate-spin-slow opacity-20" />
                <div className="absolute bottom-1/4 right-10 w-40 h-40 border border-white/5 rounded-full animate-bounce-slow opacity-20" />
            </section>

            {/* 2. CONTACT CONTENT & FORM SECTION */}
            <section className="py-32 px-6">
                <div className="container mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">

                        {/* Info Column */}
                        <div className="max-w-xl">
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                className="flex items-center gap-3 text-amber-600 mb-8"
                            >
                                <MessageSquare size={18} />
                                <span className="uppercase tracking-[0.5em] text-[10px] font-bold">Inquiries</span>
                            </motion.div>

                            <h2 className="text-5xl md:text-7xl font-light tracking-tighter leading-[0.9] mb-12">
                                We listen <br />
                                <span className="font-serif italic text-stone-400">to your space.</span>
                            </h2>

                            <p className="text-stone-500 text-xl font-light leading-relaxed mb-16">
                                Every masterpiece begins with a conversation. Tell us about your vision, and we&apos;ll build the reality.
                            </p>

                            <div className="space-y-10">
                                <ContactMethod icon={<Mail size={24} />} label="Email Us" value="hello@indepthstudio.com" delay={0.1} />
                                <ContactMethod icon={<Phone size={24} />} label="Call Us" value="+1 (555) 000-1234" delay={0.2} />
                                <ContactMethod icon={<MapPin size={24} />} label="Visit Us" value="123 Design Avenue, Creative Quarter, NY 10001" delay={0.3} />
                            </div>
                        </div>

                        {/* Form Column */}
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="bg-white rounded-[4rem] p-10 md:p-16 shadow-2xl relative overflow-hidden"
                        >
                            <AnimatePresence mode="wait">
                                {!isSubmitted ? (
                                    <motion.form key="form" exit={{ opacity: 0, y: -20 }} onSubmit={handleSubmit} className="relative z-10 space-y-12">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-12">
                                            <InputField name="fullName" label="Full Name" placeholder="Indepth Studio" required />
                                            <InputField name="email" label="Email Address" placeholder="IndepthStudio@example.com" type="email" required />
                                            <InputField name="phone" label="Phone Number" placeholder="+1 (555) 000-0000" type="tel" />
                                            <InputField name="projectType" label="Project Type" placeholder="Residential, Commercial..." />
                                        </div>
                                        <div className="relative group">
                                            <textarea
                                                name="message"
                                                rows={4}
                                                className="w-full bg-transparent py-4 outline-none border-b border-stone-200 focus:border-amber-600 transition-all text-stone-800 font-light resize-none placeholder:text-stone-300"
                                                placeholder="Share your architectural vision or specific requirements..."
                                                required
                                            />
                                            <div className="absolute bottom-0 left-0 h-0.5 bg-amber-600 w-0 group-focus-within:w-full transition-all duration-700" />
                                            <label className="absolute -top-6 left-0 text-[9px] font-extrabold uppercase tracking-[0.4em] text-amber-600/60">The Vision</label>
                                        </div>

                                        <button
                                            disabled={loading}
                                            className="w-full group bg-stone-900 hover:bg-stone-950 text-white rounded-full py-6 text-[11px] font-bold uppercase tracking-[0.5em] transition-all duration-500 shadow-2xl overflow-hidden relative"
                                        >
                                            <span className={`flex items-center justify-center gap-4 transition-transform duration-700 ${loading ? '-translate-y-20' : ''}`}>
                                                Initiate Transformation <ArrowUpRight size={16} className="text-amber-500 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                            </span>
                                            {loading && <div className="absolute inset-0 flex items-center justify-center"><div className="w-6 h-6 border-2 border-white/10 border-t-amber-500 rounded-full animate-spin" /></div>}
                                        </button>
                                    </motion.form>
                                ) : (
                                    <motion.div key="success" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="relative z-10 py-20 text-center">
                                        <div className="w-24 h-24 bg-stone-50 rounded-full flex items-center justify-center mx-auto mb-10 text-stone-900 shadow-inner border border-stone-100"><CheckCircle2 size={40} className="text-amber-600" /></div>
                                        <h2 className="text-4xl font-light tracking-tight mb-6">Concierge Notified.</h2>
                                        <p className="text-stone-500 font-light mb-12 max-w-xs mx-auto leading-relaxed italic">Our curators will review your request and reach out momentarily.</p>
                                        <button onClick={() => setIsSubmitted(false)} className="text-amber-600 font-bold text-[10px] uppercase tracking-[0.3em] hover:text-stone-900 transition-colors flex items-center gap-3 mx-auto">New Proposal <ArrowUpRight size={14} /></button>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* 3. PREMIUM UNCOMMON MAP INTEGRATION */}
            <section className="py-32 px-6">
                <div className="container mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="relative h-[600px] rounded-[5rem] overflow-hidden group shadow-2xl border-4 border-white"
                    >
                        {/* Premium Stylized Map (Iframe with Grayscale Filter) */}
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d193595.9147703055!2d-74.11976373976451!3d40.69740344190333!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2s!4v1706640000000!5m2!1sen!2s"
                            width="100%"
                            height="100%"
                            style={{ border: 0, filter: 'grayscale(1) invert(1) contrast(1.5) opacity(0.8)' }}
                            allowFullScreen
                            loading="lazy"
                        />

                        {/* Custom Map Overlays for "Uncommon" feel */}
                        <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-stone-950/20 to-transparent" />

                        {/* Floating Location Card */}
                        <motion.div
                            initial={{ x: -100, opacity: 0 }}
                            whileInView={{ x: 0, opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.5 }}
                            className="absolute bottom-12 left-12 bg-white/80 backdrop-blur-2xl p-10 rounded-[3rem] border border-white/20 shadow-2xl max-w-sm"
                        >
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-12 h-12 rounded-full bg-stone-900 flex items-center justify-center text-white"><Compass size={20} className="animate-spin-slow" /></div>
                                <h3 className="text-2xl font-light tracking-tight">Indepth HQ</h3>
                            </div>
                            <p className="text-stone-500 font-light text-sm leading-relaxed mb-6">
                                Located in the creative heart of Manhattan, our studio is a laboratory for modern aesthetics.
                            </p>
                            <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-amber-600">
                                <div className="w-2 h-2 rounded-full bg-amber-600 animate-ping" />
                                Available for Bookings
                            </div>
                        </motion.div>

                        {/* Scanline Effect Overlay */}
                        <div className="absolute inset-0 pointer-events-none opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06))', backgroundSize: '100% 2px, 3px 100%' }} />
                    </motion.div>
                </div>
            </section>
        </main>
    );
}

function ContactMethod({ icon, label, value, delay }: { icon: React.ReactNode; label: string; value: string; delay: number }) {
    return (
        <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay }} className="flex items-center gap-8 group">
            <div className="w-20 h-20 rounded-3xl bg-white border border-stone-100 flex items-center justify-center text-amber-600 shadow-sm group-hover:bg-stone-900 group-hover:text-white group-hover:scale-105 transition-all duration-700 ease-[0.23,1,0.32,1]">{icon}</div>
            <div>
                <p className="text-[10px] font-extrabold uppercase tracking-[0.4em] text-amber-600/40 mb-2">{label}</p>
                <p className="text-2xl font-light text-stone-900 tracking-tight">{value}</p>
            </div>
        </motion.div>
    );
}

function InputField({ label, placeholder, name, type = "text", required = false }: { label: string; placeholder: string; name: string; type?: string; required?: boolean }) {
    return (
        <div className="relative group w-full">
            <input
                name={name}
                type={type}
                required={required}
                placeholder={placeholder}
                className="w-full bg-transparent py-4 outline-none border-b border-stone-200 focus:border-amber-600 transition-all text-stone-800 font-light text-base placeholder:text-stone-300"
            />
            {/* Animated underline */}
            <div className="absolute bottom-0 left-0 h-0.5 bg-amber-600 w-0 group-focus-within:w-full transition-all duration-700" />
            <label className="absolute -top-6 left-0 text-[10px] font-extrabold uppercase tracking-[0.4em] text-amber-600/60">{label}</label>
        </div>
    );
}

// Add these to your tailwind config or global CSS if they aren't there,
// for now using framer motion for rotations too.
