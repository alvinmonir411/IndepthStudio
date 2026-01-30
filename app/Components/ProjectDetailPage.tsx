'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import ProjectDetailContent from './ServicesPages/ProjectDetailContent';

import { Project } from '../projects/projectsData';

interface ProjectDetailPageProps {
    project: Project;
    backLink?: string;
    backText?: string;
}

export default function ProjectDetailPage({
    project,
    backLink = "/projects",
    backText = "Back to Projects"
}: ProjectDetailPageProps) {
    return (
        <main className="min-h-screen bg-[#FDF8F3] relative overflow-hidden">
            {/* Floating Back Button */}
            <div className="fixed top-32 left-6 md:left-12 z-50">
                <Link
                    href={backLink}
                    className="flex items-center gap-3 bg-white/20 backdrop-blur-xl border border-white/30 px-6 py-3 rounded-full text-white hover:bg-white hover:text-stone-900 transition-all duration-500 group shadow-2xl"
                >
                    <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                    <span className="uppercase tracking-[0.3em] text-[10px] font-bold">{backText}</span>
                </Link>
            </div>

            <ProjectDetailContent project={project} />
        </main>
    );
}
