export type ServiceBand =
  | "Build"
  | "AI"
  | "Products"
  | "Grow";

export interface Service {
  id: number;

  slug: string;

  code: string;

  band: ServiceBand;

  title: string;

  title_em: string;

  short: string;

  description: string[];

  tags: string[];

  image: String;

  features: string[];

  icon_label: string;

  icon_class:
    | "is-slate"
    | "is-red"
    | "is-gold"
    | "is-cream"
    | "is-charcoal"
    | "is-teal";

  case_study_label?: string;

  case_study_href?: string;

  on_homepage: boolean;

  has_detail_page: boolean;

  status: boolean;

  sort_order: number;

  created_at?: string;
  updated_at?: string;
}