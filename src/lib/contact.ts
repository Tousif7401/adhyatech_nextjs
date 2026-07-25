import { apiFetch } from "./api";

export async function sendContact(data: any) {
  return apiFetch("/contact", {
    method: "POST",
    body: JSON.stringify(data),
  });
}