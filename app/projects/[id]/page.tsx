import ProjectDetailPage from '@/app/Components/ProjectDetailPage';
import { projects } from '@/app/projects/projectsData';
import { notFound } from 'next/navigation';

export default async function ProjectPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const project = projects.find((p) => p.id === parseInt(id));

    if (!project) {
        return notFound();
    }

    return (
        <ProjectDetailPage
            project={project}
            backLink="/projects"
            backText="Back to Masterpieces"
        />
    );
}
