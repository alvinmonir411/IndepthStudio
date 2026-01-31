import ProjectDetailPage from '@/app/Components/ProjectDetailPage';
import { getProjectById } from '@/app/actions/projects';
import { notFound } from 'next/navigation';

export default async function ProjectPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    try {
        const project = await getProjectById(id);

        if (!project) {
            return notFound();
        }

        // Ensure MongoDB object is serializable and match the expected type
        const serializableProject = JSON.parse(JSON.stringify(project));

        return (
            <ProjectDetailPage
                project={serializableProject}
                backLink="/projects"
                backText="Back to Masterpieces"
            />
        );
    } catch (error) {
        console.error('Error fetching project:', error);
        return notFound();
    }
}
