import { apiFetch } from "./api";
import { mirrorLeadToSheet } from "./lead-mirror";

export async function sendContact(data: any) {
  // mirror a copy into the Google Sheet — fire-and-forget, never affects this submission
  mirrorLeadToSheet(
    data,
    "contact-page",
    data.company ? `${data.message || "—"} (Company: ${data.company})` : data.message,
  );

  return apiFetch("/contact", {
    method: "POST",
    body: JSON.stringify(data),
  });
}
