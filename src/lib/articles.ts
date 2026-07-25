import { apiFetch } from "./api";
import type { BlogCategory, Article } from "@/types/article";


export const getBlogCategories = async () => {
  return apiFetch<BlogCategory[]>("/blog-categories");
}

export const getArticles = async (): Promise<Article[]> => {

  const res = await apiFetch<{
    data: Article[];
  }>("/blogs");


  return res.data;
};

export const getArticle = async (
  slug: string
): Promise<Article> => {

  return await apiFetch(`/blogs/${slug}`);
};

export const getRelatedArticles = async (
  slug: string
): Promise<Article[]> => {

  return await apiFetch(`/blogs/${slug}/related`);
};