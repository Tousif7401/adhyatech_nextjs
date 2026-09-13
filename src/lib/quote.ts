// lib/quote.ts

import { apiFetch } from "./api";
import { mirrorLeadToSheet } from "./lead-mirror";

export async function sendQuote(data: any) {
  // mirror a copy into the Google Sheet — fire-and-forget, never affects this submission
  const details = [
    data.serviceType,
    data.description,
    data.budget,
    data.timeline,
    data.company,
  ]
    .filter((v: unknown) => typeof v === "string" && v.trim())
    .join(" | ");
  mirrorLeadToSheet(data, "quote-page", details || "Quote request");

  return apiFetch("/quote", {
    method: "POST",
    body: JSON.stringify(data),
  });
}
