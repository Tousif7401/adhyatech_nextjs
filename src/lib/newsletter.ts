import { apiFetch } from "./api";

export async function sendNewsletterSubscribe(data: any) {
  return apiFetch("/newsletter/subscribe", {
    method: "POST",
    body: JSON.stringify(data),
  });
}