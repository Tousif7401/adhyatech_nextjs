import { apiFetch } from "./api";
import { Service } from "@/types/service";
import { Project } from "@/types/project";
import { Testimonial } from "@/types/testimonial";
import { Article } from "@/types/article";
import { Product } from "@/types/product";

export interface HomeResponse {
  services: Service[];
  projects: Project[];
  hero_projects: Project[];
  testimonials: Testimonial[];
  articles: Article[];
  products: Product[];
}

export function getHomeData() {
  return apiFetch<HomeResponse>("/home");
}