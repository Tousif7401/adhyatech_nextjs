import { apiFetch } from "./api";
import { Seo } from "@/types/seo";

export function getSeo(page: string) {
  return apiFetch<Seo>(`/seo/${page}`);
}