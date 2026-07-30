// types/government.ts
//
// Shape of a single Government Project. When wiring to Laravel, make the API
// return objects in this shape (or map your columns to these keys in a Resource).

export interface GovProject {
  slug: string            // URL segment, e.g. "zilla-panchayat-edraft"
  title: string
  department: string      // e.g. "Zilla Panchayat, Ballari"
  year: string            // string so "2024–25" style ranges work
  tag: string             // short category, e.g. "Fund Tracking"
  summary: string         // one line, shown on the grid card + detail lede
  challenge: string       // "The challenge" section body
  solution: string        // "How we overcame it" section body
  outcome: string[]       // "What changed" bullet list
  stack: string[]         // tech chips in the sidebar
  image?: string | null   // screenshot filename/URL; null shows placeholder frame
  site_url?: string | null
}
