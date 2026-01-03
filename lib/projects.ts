import fs from 'fs';
import path from 'path';
import projectsData from '@/public/data/projects.json';

export type Project = {
    id: number;
    title: string;
    category: string;
    status: "completed" | "ongoing" | "upcoming";
    description: string;
    images: string[];
    clientLogo?: string;
};

export function getProjects(): Project[] {
    const projects = projectsData as Omit<Project, 'images'>[];

    // Sort projects by ID first (Ascending)
    // This allows reordering by changing ID in JSON
    projects.sort((a, b) => a.id - b.id);

    return projects.map(project => {
        const id = project.id;
        const projectDir = path.join(process.cwd(), 'public', 'Proje_Resimleri', id.toString());
        let images: string[] = [];

        if (fs.existsSync(projectDir)) {
            try {
                const files = fs.readdirSync(projectDir);
                images = files
                    .filter(file => /\.(jpg|jpeg|png|webp|svg)$/i.test(file))
                    .map(file => `/Proje_Resimleri/${id}/${file}`);
            } catch (error) {
                console.error(`Error reading directory for project ${id}:`, error);
            }
        }

        return {
            ...project,
            images
        };
    });
}
