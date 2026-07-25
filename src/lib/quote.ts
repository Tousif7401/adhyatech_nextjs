// lib/quote.ts

import { apiFetch } from "./api";

export async function sendQuote(data: any) {
  return apiFetch("/quote", {
    method: "POST",
    body: JSON.stringify(data),
  });
}