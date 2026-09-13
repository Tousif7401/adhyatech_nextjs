// Fire-and-forget mirror of website form leads into the Google Sheet.
// /api/chat-lead appends the row; failures here are swallowed by design —
// the Laravel submission is the source of truth and must never be affected.

export function mirrorLeadToSheet(
  data: Record<string, unknown>,
  source: string,
  message?: string,
) {
  if (typeof window === "undefined") return; // client-side forms only

  fetch("/api/chat-lead", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: String(data.name ?? ""),
      email: String(data.email ?? ""),
      phone: String(data.phone ?? ""),
      message: message || String(data.message ?? ""),
      source,
    }),
  }).catch(() => {}); // ignore — sheet mirror is best-effort
}
