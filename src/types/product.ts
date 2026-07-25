export interface Product {
    id: number;

    // Basic
    slug: string;
    name: string;
    subtitle?: string;
    short_description: string;
    description?: string;

    // Hero
    publish_status: "Live" | "Beta" | "Coming Soon";
    logo?: string;
    banner?: string;
    cover_image?: string;
    video?: string;

    launch_year?: number;
    category?: string;
    clients?: string[];

    // Links
    website?: string;
    demo_url?: string;
    github_url?: string;

    // CTA
    cta_text: string;
    cta_url?: string;

    // Dynamic Content
    tags: string[];

    tech_stack?: string[];

    features?: ProductFeature[];

    gallery?: string[];

    stats?: ProductStat[];

    faqs?: ProductFaq[];

    testimonials?: ProductTestimonial[];

    // SEO
    meta_title?: string;
    meta_description?: string;
    meta_keywords?: string;

    // Settings
    featured: boolean;
    position: number;
    status: boolean;
    trash: boolean;

    created_at: string;
    updated_at: string;
}

export interface ProductFeature {
    title: string;
    description: string;
    icon?: string;
}

export interface ProductStat {
    number: string;
    label: string;
}

export interface ProductFaq {
    question: string;
    answer: string;
}

export interface ProductTestimonial {
    quote: string;
    author: string;
    designation: string;
    company?: string;
    photo?: string;
}