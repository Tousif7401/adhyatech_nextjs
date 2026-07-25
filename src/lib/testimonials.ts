import { apiFetch } from "./api";
import { Testimonial } from "@/types/testimonial";

export async function getTestimonials(): Promise<Testimonial[]> {
  return apiFetch<Testimonial[]>("/testimonials");
}

// export async function getTestimonialsByCategory(
//   category: string
// ): Promise<Testimonial[]> {
//   return apiFetch<Testimonial[]>(
//     `/testimonials/category/${category}`
//   );
// }

export async function getFeaturedTestimonials(): Promise<Testimonial[]> {
  return apiFetch<Testimonial[]>(
    "/testimonials/featured"
  );
}