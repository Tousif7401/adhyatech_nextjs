export interface CareerPerk {
    id: number;

    title: string;

    description: string;

    position: number;

    status: boolean;

    trash: boolean;

    created_at: string;

    updated_at: string;
}

export interface CareerJob {
    id: number;

    title: string;

    location: string;

    employment_type: string;

    experience: string;

    description?: string;

    requirements?: string;

    responsibilities?: string;

    salary?: string;

    vacancies: number;

    apply_email?: string;

    apply_url?: string;

    featured: boolean;

    position: number;

    status: boolean;

    trash: boolean;

    created_at: string;

    updated_at: string;
}

export interface CareerResponse {
    perks: CareerPerk[];

    jobs: CareerJob[];
}