import { apiFetch } from "./api";

export async function sendPrivacyRequest(data: any) {
  return apiFetch("/privacy-request", {
    method: "POST",
    body: JSON.stringify(data),
  });
}
