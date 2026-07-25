export type TestimonialType =
  | "text"
  | "video"
  | "google";

export interface Testimonial {
  id: number;

  type: TestimonialType;

  quote?: string;

  rating?: number;

  author_name: string;

  author_role: string;

  author_initials: string;

  video_duration?: string;

  video_tone?:
    | "gold"
    | "slate"
    | "cream"
    | "charcoal"
    | "teal";

  video_url?: string;

  span2: boolean;

  category?: string;

  status: boolean;

  created_at?: string;
  updated_at?: string;
}