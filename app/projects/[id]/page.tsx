import ProjectDetailContent from '@/app/Components/ServicesPages/ProjectDetailContent';
import { projects } from '@/app/projects/projectsData';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default async function ProjectPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const project = projects.find((p) => p.id === parseInt(id));

    if (!project) {
        return notFound();
    }

    return (
        <main className="min-h-screen bg-[#FDF8F3] pt-32 pb-24 px-6 md:px-12">
            <div className="container mx-auto">
                <Link
                    href="/services"
                    className="inline-flex items-center gap-2 text-stone-500 hover:text-amber-600 mb-12 group transition-colors"
                >
                    <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                    <span className="uppercase tracking-[0.2em] text-xs font-bold">Back to Services</span>
                </Link>
                <ProjectDetailContent project={project} />
            </div>
        </main>
    );
}
