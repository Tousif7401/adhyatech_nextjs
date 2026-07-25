import { apiFetch } from "./api";
import { Product } from "@/types/product";

export function getProducts() {
  return apiFetch<Product[]>("/products");
}

export function getProduct(slug: string) {
  return apiFetch<Product>(`/products/${slug}`);
}