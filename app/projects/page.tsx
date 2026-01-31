import { getProjects } from '@/app/actions/projects';
import ProjectsClient from './ProjectsClient';

export const revalidate = 3600; // Revalidate every hour

export default async function ProjectsPage() {
    const projects = await getProjects();

    return <ProjectsClient projects={projects} />;
}
