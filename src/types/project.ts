export interface Project {

  site_url?: string | null;
is_live?: boolean;
  id: number;

  slug: string;
  title: string;
  client: string;

  category:
  | "Web"
  | "Software"
  | "AI"
  | "Mobile"
  | "Government"
  | "SaaS";

  year: string;

  summary: string;

  badges?: string[];
  tags: string[];

  media_tone: string;
  icon: string;

  has_case_study: boolean;

  external_url?: string;

  lede?: string;
  duration?: string;
  scope?: string;
  team?: string;

  challenge?: string;
  approach?: string;

  results?: string[];

  testimonial?: {
    quote: string;
    author: string;
    role: string;
  };

  tech_stack?: string[];

  deliverables?: string[];

  image: string;

  featured: boolean;

  sort_order: number;

  status: boolean;
}

export interface PortfolioResponse {
  featured: Project[];
  projects: Project[];
  categories: string[];
}
