export interface GovProject {
  slug: string;
  title: string;
  department: string;
  year: string;
  tag: string;
  summary: string;
  challenge: string;
  solution: string;
  outcome: string[];
  stack: string[];
  image: string | null;
  site_url: string | null;
}
