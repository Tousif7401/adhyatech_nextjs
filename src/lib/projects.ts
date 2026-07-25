import { apiFetch } from "./api";
import { Project } from "@/types/project";
import { PortfolioResponse } from "@/types/project";

export function getPortfolio() {
    return apiFetch<PortfolioResponse>("/porfolio");
}

export async function getProjects(): Promise<Project[]> {
    return apiFetch<Project[]>("/projects");
}

// export async function getFeaturedProjects(): Promise<Project[]> {
//     return apiFetch<Project[]>("/projects/featured");
// }

export async function getProject(
    slug: string
): Promise<Project> {
    return apiFetch<Project>(`/projects/${slug}`);
}

export async function getRelatedProjects(
    slug: string
): Promise<Project[]> {
    return apiFetch<Project[]>(
        `/projects/${slug}/related`
    );
}