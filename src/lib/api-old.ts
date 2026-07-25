/**
 * Adyatech API client
 * --------------------
 * Single place to wire up Laravel API integration.
 * When your developer's API is live, edit `API_BASE` in .env and
 * uncomment the real fetch calls.
 *
 * Until then, sample data is returned so the UI works in dev.
 */

export const API_BASE = process.env.NEXT_PUBLIC_API_BASE || 'https://api.adyatech.com'

// ─── TypeScript types (match Laravel API shape) ──────────────
export type ProjectCategory = 'web' | 'software' | 'ai' | 'mobile'
export type ProjectTier = 'premium' | 'featured' | 'standard'

export interface Project {
  id: number
  slug: string                  // url-safe identifier
  title: string
  client: string
  category: ProjectCategory
  tier: ProjectTier             // premium = full case study, featured = case study, standard = card only
  year: string
  summary: string               // short blurb on the card
  cover_image: string           // URL to thumbnail
  external_url?: string         // if set, card opens this URL instead of /portfolio/[slug]
  has_case_study: boolean       // whether /portfolio/[slug] should exist
  // Case study fields (only required when has_case_study === true)
  hero_image?: string
  problem?: string
  approach?: string
  outcome?: string
  metrics?: { label: string; value: string }[]
  tech_stack?: string[]
  gallery?: string[]
  duration?: string
  team_size?: string
  is_featured: boolean
  sort_order: number
}

export type TestimonialKind = 'text' | 'video' | 'google'

export interface Testimonial {
  id: number
  kind: TestimonialKind
  author: string
  role: string
  company: string
  quote?: string                // for text & google
  video_url?: string            // for video (YouTube embed URL or self-hosted)
  video_thumbnail?: string
  google_rating?: number        // 1-5 for google
  google_review_url?: string
  avatar?: string
  is_featured: boolean
  date_received: string
}

// ─── Fetch helpers ───────────────────────────────────────────
async function apiGet<T>(path: string, fallback: T): Promise<T> {
  // For static export, return fallback during build
  // When dynamic API is wired, replace with:
  // try {
  //   const res = await fetch(`${API_BASE}${path}`, { next: { revalidate: 60 } })
  //   if (!res.ok) throw new Error(`${res.status}`)
  //   return (await res.json()) as T
  // } catch (e) { console.error('API error', path, e); return fallback }
  return fallback
}

// ─── Sample data (used until API is live) ────────────────────
const sampleProjects: Project[] = [
  {
    id: 1, slug: 'civic-bank-rag', title: 'AI Contract Intelligence Platform',
    client: 'Civic Bank', category: 'ai', tier: 'premium', year: '2025',
    summary: 'Built a RAG system that processes 4,000 contracts/day. Cut review time from 45 min to 6 min per doc.',
    cover_image: 'gradient-red',
    has_case_study: true, is_featured: true, sort_order: 1,
    hero_image: 'gradient-red',
    problem: 'Civic Bank\'s 28-person legal team was buried under 4,000+ contracts per day from corporate clients, vendors, and regulatory filings. Manual review averaged 45 minutes per document, creating a 6-week backlog and forcing junior associates into 12-hour days. The CFO wanted to grow the corporate banking arm but legal couldn\'t scale.',
    approach: 'We built a retrieval-augmented generation system on Claude API with a vector store of 18 years of historical contracts. The system extracts 47 standard clauses, flags non-standard language, surfaces risk patterns, and produces a 1-page summary in 2 minutes. We integrated it with their existing iManage DMS and rolled it out to a 5-person pilot team before scaling firm-wide.',
    outcome: 'Average review time dropped from 45 to 6 minutes — an 87% reduction. The backlog cleared in 11 weeks. The legal team grew its capacity 7x without adding headcount, and Civic Bank\'s corporate banking division grew 32% year-over-year.',
    metrics: [
      { label: 'Time reduction', value: '87%' }, { label: 'Documents/day', value: '4,000' },
      { label: 'Backlog cleared', value: '11 wks' }, { label: 'Capacity gain', value: '7×' },
    ],
    tech_stack: ['Claude API', 'LangChain', 'Pinecone', 'PostgreSQL', 'Laravel', 'Next.js', 'AWS'],
    duration: '14 weeks', team_size: '4 engineers + 1 designer',
  },
  {
    id: 2, slug: 'helio-health-voice', title: 'Multilingual Voice AI for Appointments',
    client: 'Helio Health', category: 'ai', tier: 'featured', year: '2025',
    summary: 'Voice AI handling 60% of inbound calls without human handoff. Built in Kannada, Hindi, Telugu, English.',
    cover_image: 'gradient-gold', has_case_study: true, is_featured: true, sort_order: 2,
    hero_image: 'gradient-gold',
    problem: 'Helio Health\'s clinic chain had 14 receptionists handling 2,800 daily calls — 70% were appointment bookings in Kannada, Hindi, and Telugu. Wait times exceeded 8 minutes and missed-call rates hit 31%.',
    approach: 'A real-time voice agent built on a low-latency speech-to-speech pipeline. The bot books, reschedules, and cancels appointments, checks doctor availability, and hands off to humans for clinical questions only.',
    outcome: '60% of calls handled fully by the bot. Average wait time dropped to 90 seconds. Missed-call rate fell to 4%. Two receptionists moved to higher-value patient coordination work.',
    metrics: [
      { label: 'Calls automated', value: '60%' }, { label: 'Wait time', value: '90 sec' },
      { label: 'Missed calls', value: '4%' }, { label: 'Languages', value: '4' },
    ],
    tech_stack: ['Deepgram', 'Claude API', 'Twilio', 'Node.js', 'Redis'],
    duration: '10 weeks', team_size: '3 engineers',
  },
  {
    id: 3, slug: 'northwind-legal', title: 'Smart Contract Review Assistant',
    client: 'Northwind Legal', category: 'ai', tier: 'featured', year: '2024',
    summary: 'RAG assistant for 18-partner firm. Reviews contracts against firm precedent.',
    cover_image: 'gradient-slate', has_case_study: true, is_featured: false, sort_order: 3,
    hero_image: 'gradient-slate',
    problem: 'Mid-sized law firm losing junior associates to burnout from manual contract review against firm precedent.',
    approach: 'Built a precedent-aware RAG system trained on 12 years of firm contracts with clause-level diff highlighting.',
    outcome: 'Associate productivity up 3x. Two-year associate retention up from 41% to 78%.',
    metrics: [
      { label: 'Productivity', value: '3×' }, { label: 'Retention', value: '78%' },
    ],
    tech_stack: ['Claude API', 'LlamaIndex', 'Postgres + pgvector', 'Laravel'],
    duration: '8 weeks', team_size: '2 engineers',
  },
  {
    id: 4, slug: 'bharatiya-university-alumnyo',
    title: 'University Alumni Network — 12,800 graduates',
    client: 'Bharatiya University', category: 'software', tier: 'featured', year: '2025',
    summary: 'Migrated 50 years of alumni records from spreadsheets into Alumnyo. Live in 6 weeks.',
    cover_image: 'gradient-slate', has_case_study: true, is_featured: true, sort_order: 4,
    hero_image: 'gradient-slate',
    problem: '50-year-old university with 12,800+ alumni scattered across 23 Excel files, a defunct Facebook group, and three unmaintained PHP portals.',
    approach: 'Deployed Alumnyo with a 6-week migration plan: data cleaning, deduplication, ID mapping, then phased onboarding by graduation decade.',
    outcome: '12,847 alumni live within 6 weeks. 847 RSVPs to the first online-organized reunion. ₹14.2L raised in donations in month one.',
    metrics: [
      { label: 'Alumni migrated', value: '12,847' }, { label: 'Time to launch', value: '6 wks' },
      { label: 'Reunion RSVPs', value: '847' }, { label: 'Month-1 donations', value: '₹14.2L' },
    ],
    tech_stack: ['Alumnyo SaaS', 'Laravel', 'Flutter', 'AWS'],
    duration: '6 weeks', team_size: '3 engineers + 1 PM',
  },
  {
    id: 5, slug: 'shree-medha-college', title: 'Shree Medha Degree College Website',
    client: 'Shree Medha Degree College', category: 'web', tier: 'standard', year: '2025',
    summary: 'Modernized Joomla-based college website with custom design system, gold/navy palette.',
    cover_image: 'gradient-gold', has_case_study: false, is_featured: false, sort_order: 5,
    external_url: 'https://shreemedha.com',
  },
  {
    id: 6, slug: 'logistics-erp', title: 'Logistics ERP — 200-employee firm',
    client: 'Confidential', category: 'software', tier: 'standard', year: '2024',
    summary: 'Custom ERP with fleet tracking, invoicing, shift scheduling for South India logistics company.',
    cover_image: 'gradient-red', has_case_study: false, is_featured: false, sort_order: 6,
  },
  {
    id: 7, slug: 'field-ops-flutter', title: 'Field Operations App · 1,200 daily users',
    client: 'Confidential', category: 'mobile', tier: 'featured', year: '2024',
    summary: 'Flutter app for 1,200 field technicians. Offline-first, GPS sync, photo evidence.',
    cover_image: 'gradient-slate', has_case_study: true, is_featured: true, sort_order: 7,
    hero_image: 'gradient-slate',
    problem: 'Technicians submitting paper forms led to 2-day data lag and 18% data quality issues.',
    approach: 'Offline-first Flutter app with background sync. Geo-tagged photos, signature capture, route optimization.',
    outcome: 'Data lag eliminated. 1,200 daily active users. 4.8 star Play Store rating.',
    metrics: [
      { label: 'Daily users', value: '1,200' }, { label: 'Play Store', value: '4.8★' },
      { label: 'Data lag', value: '0 hrs' }, { label: 'Routes/day', value: '8,400' },
    ],
    tech_stack: ['Flutter', 'Firebase', 'Node.js', 'PostgreSQL'],
    duration: '16 weeks', team_size: '4 engineers + 1 designer',
  },
  {
    id: 8, slug: 'iit-karnataka-portal', title: 'IIT Karnataka Alumni Portal',
    client: 'IIT Karnataka', category: 'software', tier: 'standard', year: '2025',
    summary: 'Custom alumni portal with Razorpay donations + reunion booking.',
    cover_image: 'gradient-gold', has_case_study: false, is_featured: false, sort_order: 8,
  },
  {
    id: 9, slug: 'fintech-startup-mvp', title: 'Fintech SaaS MVP',
    client: 'Stealth-mode startup', category: 'software', tier: 'standard', year: '2024',
    summary: 'Built MVP in 8 weeks. Now serving 14k SMB customers across India.',
    cover_image: 'gradient-red', has_case_study: false, is_featured: false, sort_order: 9,
  },
  {
    id: 10, slug: 'edtech-mobile-app', title: 'EdTech Mobile App',
    client: 'Confidential', category: 'mobile', tier: 'standard', year: '2024',
    summary: 'React Native app for tier-2/3 city test prep. 80k downloads in year one.',
    cover_image: 'gradient-slate', has_case_study: false, is_featured: false, sort_order: 10,
  },
  {
    id: 11, slug: 'enterprise-marketing-site',
    title: 'Enterprise Marketing Site Redesign',
    client: 'Confidential SaaS firm', category: 'web', tier: 'standard', year: '2025',
    summary: 'Next.js + Sanity CMS rebuild. 4.2s → 0.8s LCP. 90+ Core Web Vitals.',
    cover_image: 'gradient-slate', has_case_study: false, is_featured: false, sort_order: 11,
  },
  {
    id: 12, slug: 'restaurant-chain-app', title: 'QSR Loyalty + Ordering App',
    client: 'Pan-India QSR chain', category: 'mobile', tier: 'standard', year: '2024',
    summary: 'Flutter app with offline cart, Razorpay, loyalty points across 140 stores.',
    cover_image: 'gradient-gold', has_case_study: false, is_featured: false, sort_order: 12,
  },
]

const sampleTestimonials: Testimonial[] = [
  { id: 1, kind: 'text', author: 'Dr. Anand Rao', role: 'CTO', company: 'Civic Bank',
    quote: 'Adyatech doesn\'t sell you software. They sell you outcomes. The RAG system they built reduced our contract review time by 87% — and the team understood our domain better than consultants we\'ve paid 10x as much.',
    is_featured: true, date_received: '2025-08-14', avatar: 'AR' },
  { id: 2, kind: 'text', author: 'Priya Iyer', role: 'Principal', company: 'St. Joseph\'s College',
    quote: 'We tried three alumni portals over four years. Alumnyo is the first one our graduates actually use. 8,200 profiles migrated in two weeks. The onboarding was effortless.',
    is_featured: true, date_received: '2025-09-22', avatar: 'PI' },
  { id: 3, kind: 'video', author: 'Rohan Kapoor', role: 'Founder', company: 'Stealth fintech',
    video_url: 'https://www.youtube.com/embed/dQw4w9WgXcQ', video_thumbnail: 'gradient-red',
    quote: 'They shipped our MVP in 8 weeks. That\'s after two other agencies took 6 months and produced nothing.',
    is_featured: true, date_received: '2025-07-03', avatar: 'RK' },
  { id: 4, kind: 'google', author: 'Sarita Menon', role: 'Marketing Head', company: 'Helio Health',
    quote: 'Excellent work on our voice AI project. Highly responsive team and they delivered every milestone on time. Will definitely engage them again.',
    google_rating: 5, google_review_url: '#', is_featured: false, date_received: '2025-10-11', avatar: 'SM' },
  { id: 5, kind: 'text', author: 'Karan Mehta', role: 'COO', company: 'South India Logistics',
    quote: 'Best ERP build we\'ve done in 18 years of business. Adyatech\'s team understood our operations on day three better than vendors we\'d worked with for years.',
    is_featured: false, date_received: '2024-12-08', avatar: 'KM' },
  { id: 6, kind: 'video', author: 'Anjali Krishnan', role: 'Founder', company: 'EdTech startup',
    video_url: 'https://www.youtube.com/embed/dQw4w9WgXcQ', video_thumbnail: 'gradient-slate',
    quote: 'Real partnership. Not vendor-client. They pushed back when we were wrong, and were right every time.',
    is_featured: false, date_received: '2025-02-19', avatar: 'AK' },
  { id: 7, kind: 'google', author: 'Vivek Sharma', role: 'IT Director', company: 'Govt department',
    quote: 'Empanelled vendor we\'ve relied on for 4 years. Always on time, transparent pricing, no surprises.',
    google_rating: 5, google_review_url: '#', is_featured: false, date_received: '2025-05-30', avatar: 'VS' },
  { id: 8, kind: 'text', author: 'Lakshmi Nair', role: 'Alumni Director', company: 'Bharatiya University',
    quote: 'Going live in 6 weeks with 12,800 alumni records seemed impossible. Adyatech made it look routine.',
    is_featured: true, date_received: '2025-06-15', avatar: 'LN' },
  { id: 9, kind: 'google', author: 'Mohammed Ali', role: 'Founder', company: 'QSR chain',
    quote: 'Our mobile app rollout across 140 stores went without a single major bug. Their QA is world-class.',
    google_rating: 5, google_review_url: '#', is_featured: false, date_received: '2024-11-04', avatar: 'MA' },
  { id: 10, kind: 'text', author: 'Suchitra Bose', role: 'Head of Engineering', company: 'Confidential SaaS',
    quote: 'They rebuilt our marketing site in 5 weeks and moved our LCP from 4.2s to 0.8s. The detailed weekly demos kept our exec team fully informed.',
    is_featured: false, date_received: '2025-03-22', avatar: 'SB' },
  { id: 11, kind: 'video', author: 'Dr. Sushma Rao', role: 'Vice Chancellor', company: 'University',
    video_url: 'https://www.youtube.com/embed/dQw4w9WgXcQ', video_thumbnail: 'gradient-gold',
    quote: 'Adyatech doesn\'t just build software — they understand higher education.',
    is_featured: true, date_received: '2025-04-08', avatar: 'SR' },
  { id: 12, kind: 'google', author: 'Rahul Banerjee', role: 'Operations Manager', company: 'Logistics firm',
    quote: 'Honest pricing, excellent communication. Refreshing in the IT services industry.',
    google_rating: 4, google_review_url: '#', is_featured: false, date_received: '2025-01-17', avatar: 'RB' },
]

// ─── Public functions used by pages ───────────────────────────
export async function getProjects(): Promise<Project[]> {
  return apiGet<Project[]>('/api/portfolio', sampleProjects)
}

export async function getProject(slug: string): Promise<Project | null> {
  const all = await getProjects()
  return all.find(p => p.slug === slug) || null
}

export async function getTestimonials(): Promise<Testimonial[]> {
  return apiGet<Testimonial[]>('/api/testimonials', sampleTestimonials)
}
