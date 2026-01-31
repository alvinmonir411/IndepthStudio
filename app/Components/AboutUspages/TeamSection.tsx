"use client";

import { motion } from "framer-motion";
import { Mail, Linkedin, ChevronRight } from "lucide-react";
import Image from "next/image";

const defaultFounder = {
    name: "Arif Rahman",
    role: "Founder & Principal Designer",
    intro:
        "15+ years crafting timeless spaces. Trained at MIT Architecture, worked with global luxury brands. Passionate about creating environments that elevate human experience.",
    photo: "/images/founder-photo.jpg",
    stats: {
        projects: "187",
        awards: "23",
        years: "15+",
    },
    social: {
        linkedin: "linkedin.com/in/arifrahman",
        email: "arif@luxuryinteriors.com",
    },
};

const defaultTeamMembers = [
    {
        name: "Sara Khan",
        role: "Lead Architect",
        intro: "Masters from Bartlett School. Specializes in sustainable luxury residences.",
        photo: "/images/team-sara.jpg",
    },
    {
        name: "Rahim Ahmed",
        role: "Interior Specialist",
        intro: "Expert in bespoke furniture and artisanal finishes. 12 years experience.",
        photo: "/images/team-rahim.jpg",
    },
    {
        name: "Nisha Rahman",
        role: "Project Director",
        intro: "Manages 50M+ projects annually. Ensures flawless execution.",
        photo: "/images/team-nisha.jpg",
    },
];

interface TeamSectionProps {
    founder?: any;
    teamMembers?: any[];
}

const TeamSection: React.FC<TeamSectionProps> = ({
    founder: propFounder,
    teamMembers: propTeamMembers
}) => {
    // Fallback to static data if not provided
    const displayFounder = propFounder || defaultFounder;
    const displayTeamMembers = propTeamMembers || defaultTeamMembers;

    return (
        <section className="relative bg-gradient-to-br from-slate-900 via-black/90 to-slate-800/90 py-32 px-6 lg:px-24 overflow-hidden">
            {/* Floating particles */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-16 left-16 w-72 h-72 bg-gradient-to-r from-amber-400/20 to-transparent rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-28 right-20 w-96 h-96 bg-gradient-to-t from-emerald-400/10 to-transparent rounded-full blur-3xl animate-[float_8s_ease-in-out_infinite]" />
            </div>

            <div className="relative z-20 max-w-7xl mx-auto">
                {/* Header */}
                <motion.div
                    className="text-center mb-24 lg:mb-32"
                    initial={{ opacity: 0, y: 60 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-[4.5rem] lg:text-[7rem] font-black uppercase tracking-[-0.08em] bg-gradient-to-r from-white via-slate-100 to-gray-300 text-transparent bg-clip-text drop-shadow-[0_0_60px_rgba(255,255,255,0.3)] leading-[0.85]">
                        THE MASTERS
                    </h2>
                    <motion.p
                        className="text-xl lg:text-2xl text-slate-400 mt-8 max-w-2xl mx-auto leading-relaxed"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        viewport={{ once: true }}
                    >
                        Behind every masterpiece is a visionary. Meet the creators who transform dreams into reality.
                    </motion.p>
                </motion.div>

                <div className="grid lg:grid-cols-4 gap-12 lg:gap-16">
                    {/* Founder Card */}
                    <motion.div
                        className="lg:col-span-2 group relative cursor-pointer"
                        initial={{ opacity: 0, y: 60 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <div className="relative overflow-hidden rounded-4xl shadow-2xl group-hover:shadow-[0_60px_160px_rgba(255,255,255,0.2)] transition-all duration-1000">
                            <Image
                                src={displayFounder.photo || displayFounder.imageUrl || '/placeholder-team.jpg'}
                                alt={displayFounder.name}
                                width={800}
                                height={600}
                                className="w-full h-96 lg:h-[500px] object-cover group-hover:scale-110 transition-transform duration-1000"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-700" />
                            <motion.div
                                className="absolute top-8 left-8 bg-gradient-to-br from-amber-500/90 to-orange-500/90 backdrop-blur-xl px-6 py-3 rounded-2xl border border-white/30 shadow-2xl"
                                whileHover={{ scale: 1.05, x: 8 }}
                            >
                                <span className="text-white font-bold text-lg tracking-wide uppercase">Founder</span>
                            </motion.div>
                        </div>

                        {/* Founder Info */}
                        <motion.div
                            className="mt-12 p-8 lg:p-12 bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20"
                            whileHover={{ scale: 1.02, y: -8 }}
                            transition={{ type: "spring" }}
                        >
                            <h3 className="text-4xl lg:text-5xl font-black bg-gradient-to-r from-white to-slate-200 bg-clip-text text-transparent mb-4">
                                {displayFounder.name}
                            </h3>
                            <div className="text-amber-400 text-xl font-bold uppercase tracking-wider mb-6">
                                {displayFounder.role}
                            </div>
                            <p className="text-lg text-slate-300 leading-relaxed mb-8">{displayFounder.intro || displayFounder.description}</p>

                            {/* Stats */}
                            <div className="grid grid-cols-3 gap-6 mb-8">
                                <div className="text-center group-hover:text-amber-400 transition-colors">
                                    <div className="text-3xl lg:text-4xl font-black text-white mb-1">{displayFounder.stats?.projects || '150+'}</div>
                                    <div className="text-sm uppercase tracking-wider text-slate-400 font-medium">Projects</div>
                                </div>
                                <div className="text-center group-hover:text-amber-400 transition-colors">
                                    <div className="text-3xl lg:text-4xl font-black text-white mb-1">{displayFounder.stats?.awards || '20+'}</div>
                                    <div className="text-sm uppercase tracking-wider text-slate-400 font-medium">Awards</div>
                                </div>
                                <div className="text-center group-hover:text-amber-400 transition-colors">
                                    <div className="text-3xl lg:text-4xl font-black text-white mb-1">{displayFounder.stats?.years || '10+'}</div>
                                    <div className="text-sm uppercase tracking-wider text-slate-400 font-medium">Years</div>
                                </div>
                            </div>

                            {/* Contact */}
                            <div className="flex flex-wrap gap-4">
                                <motion.a
                                    href={`mailto:${displayFounder.email || displayFounder.social?.email || ''}`}
                                    className="group flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 backdrop-blur-xl rounded-2xl text-white font-semibold shadow-xl hover:shadow-[0_0_40px_rgba(245,158,11,0.6)] transition-all duration-500"
                                    whileHover={{ scale: 1.05, x: 8 }}
                                >
                                    <Mail className="w-5 h-5" />
                                    <span>Contact</span>
                                </motion.a>
                                {(displayFounder.linkedin || displayFounder.social?.linkedin) && (
                                    <motion.a
                                        href={displayFounder.linkedin?.startsWith('http') ? displayFounder.linkedin : `https://${displayFounder.linkedin || displayFounder.social?.linkedin}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-3 px-6 py-3 bg-white/20 backdrop-blur-xl rounded-2xl text-white border border-white/30 hover:bg-white/40 transition-all duration-500"
                                        whileHover={{ scale: 1.05, rotate: 5 }}
                                    >
                                        <Linkedin className="w-5 h-5" />
                                        <span>LinkedIn</span>
                                    </motion.a>
                                )}
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* Team Grid */}
                    <div className="lg:col-span-2 grid md:grid-cols-2 gap-8 lg:gap-12">
                        {displayTeamMembers.map((member: any, idx) => (
                            <motion.div
                                key={member.name}
                                className="group relative cursor-pointer overflow-hidden rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-700"
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 + idx * 0.1 }}
                                viewport={{ once: true }}
                                whileHover={{ scale: 1.05, y: -20, rotateX: 5 }}
                            >
                                <div className="relative h-80 lg:h-72 overflow-hidden">
                                    <Image
                                        src={member.photo || member.imageUrl || '/placeholder-team.jpg'}
                                        alt={member.name}
                                        width={400}
                                        height={500}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
                                </div>
                                <div className="p-8 bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-xl border-t border-white/20">
                                    <h4 className="text-2xl font-black text-white mb-2 drop-shadow-lg">{member.name}</h4>
                                    <div className="text-amber-400 text-lg font-bold uppercase tracking-wider mb-4">{member.role}</div>
                                    <p className="text-slate-300 text-base leading-relaxed">{member.intro || member.description}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TeamSection;
