import Modal from '@/app/Components/Modal';
import ProjectDetailContent from '@/app/Components/ServicesPages/ProjectDetailContent';
import { projects } from '@/app/projects/projectsData';
import { notFound } from 'next/navigation';

export default async function ProjectModalPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const project = projects.find((p) => p.id === parseInt(id));

    if (!project) {
        return notFound();
    }

    return (
        <Modal>
            <ProjectDetailContent project={project} />
        </Modal>
    );
}
