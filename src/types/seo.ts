export interface Seo {
  id: number;
  page_id?: number;

  page_slug: string;

  meta_title: string;
  og_title?: string;

  meta_description?: string;
  og_description?: string;

  meta_keywords?: string;

  meta_robots?: string;

  head_html?: string;

  meta_image?: string;

  status: boolean;
}