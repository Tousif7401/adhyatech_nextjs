// Portfolio data — replace with API fetch in Phase 3.
// Each project has: slug, title, client, category, year, summary, badges, tags, mediaTone, isExternal, externalUrl?
// If hasCaseStudy is false, clicking the card goes to externalUrl (or nothing).

export type Project = {
  slug: string
  title: string
  client: string
  category: 'Web' | 'Software' | 'AI' | 'Mobile' | 'Government' | 'SaaS'
  year: string
  summary: string
  badges?: ('Premium' | 'Featured')[]
  tags: string[]
  mediaTone: 'gold' | 'slate' | 'cream' | 'charcoal' | 'teal'
  icon: string
  hasCaseStudy: boolean
  externalUrl?: string
  // Case study fields (only used if hasCaseStudy is true)
  lede?: string
  duration?: string
  scope?: string
  team?: string
  challenge?: string
  approach?: string
  results?: { num: string; label: string }[]
  testimonial?: { quote: string; author: string; role: string }
  techStack?: string[]
  deliverables?: string[]
}

export const projects: Project[] = [
  {
    slug: 'civic-bank-churn-model',
    title: 'Churn forecast that pays for itself in 6 weeks',
    client: 'Civic Bank',
    category: 'AI',
    year: '2025',
    summary: 'A 60-day churn prediction model saving ₹4.2 cr in retained revenue per year.',
    badges: ['Premium', 'Featured'],
    tags: ['Python', 'PostgreSQL', 'RAG', 'Claude API'],
    mediaTone: 'gold',
    icon: 'CB',
    hasCaseStudy: true,
    lede: 'Civic Bank wanted to retain high-value customers before they churned — not after. We built a model that flags at-risk accounts 60 days in advance with 87% accuracy.',
    duration: '14 weeks',
    scope: 'AI engineering · Data pipeline · Dashboard',
    team: '1 ML engineer · 1 backend · 1 designer',
    challenge: 'Civic Bank\'s customer success team was reaching out to churning customers only after they had already moved their primary account elsewhere. Their CRM had data, but no signal. They wanted a system that could surface at-risk accounts proactively — and explain why each customer was flagged so the team could intervene meaningfully.',
    approach: 'We started with 18 months of transaction, support-ticket, and engagement data. After feature engineering, we trained a gradient-boosted model that combines behavioural signals (declining transaction volume, support ticket sentiment, missed product touchpoints) with demographic and product-mix features. The model is retrained weekly and surfaces explainability per account — so a relationship manager knows whether a customer is churning because of fees, service issues, or competitor activity.',
    results: [
      { num: '87%', label: 'Churn prediction accuracy at 60-day window' },
      { num: '₹4.2cr', label: 'Retained revenue in year one' },
      { num: '34%', label: 'Reduction in churn among top-tier customers' },
    ],
    testimonial: {
      quote: 'We had data for years, but no actionable signal. Adyatech built us a system that doesn\'t just predict — it tells us why. That changed how our entire RM team works.',
      author: 'Suresh K.',
      role: 'CDO, Civic Bank',
    },
    techStack: ['Python 3.11', 'XGBoost', 'PostgreSQL', 'Apache Airflow', 'Claude API', 'Next.js dashboard', 'Docker', 'AWS ECS'],
    deliverables: ['Trained model + retraining pipeline', 'Explainability layer (SHAP-based)', 'RM-facing dashboard', 'Weekly digest email automation', 'API integration with their CRM'],
  },
  {
    slug: 'bharatiya-alumni-portal',
    title: 'A 12,800-strong alumni network, finally connected',
    client: 'Bharatiya University',
    category: 'SaaS',
    year: '2025',
    summary: 'Migrated a decade of scattered records into one beautifully usable alumni platform.',
    badges: ['Premium', 'Featured'],
    tags: ['Alumnyo', 'Laravel', 'Flutter', 'Razorpay'],
    mediaTone: 'slate',
    icon: 'BU',
    hasCaseStudy: true,
    lede: 'Bharatiya University had 12,000+ alumni records spread across Google Sheets, Facebook groups, and an old portal nobody logged into. We consolidated everything into Alumnyo — and rebuilt their alumni engagement from the ground up.',
    duration: '10 weeks',
    scope: 'SaaS deployment · Data migration · Mobile app · Training',
    team: '2 engineers · 1 designer · 1 PM',
    challenge: 'The university had been collecting alumni data since 1998 — but it lived in five disconnected places. Annual reunions used a Google Form. Donations went through a separate WordPress site. The career portal was a third-party tool that hadn\'t been updated in years. No single source of truth, no engagement analytics, no way to even count how many alumni they actually had.',
    approach: 'We deployed our flagship SaaS, Alumnyo, with white-label branding for Bharatiya University. The first three weeks were spent on data — deduplicating, validating, and migrating 12,847 records from CSVs, Excel exports, and a creaky MySQL dump. We then enabled the events module for their 50th reunion, integrated Razorpay for donations, and trained their 6-person alumni office team over two on-site sessions.',
    results: [
      { num: '12,847', label: 'Alumni profiles migrated and validated' },
      { num: '847', label: 'RSVPs to the first reunion (vs 120 last year)' },
      { num: '₹14.2L', label: 'Monthly recurring donations within 4 months' },
    ],
    testimonial: {
      quote: 'I have not seen a project of this scale go this smoothly. Adyatech did the boring stuff — data cleanup, training, change management — as carefully as they did the design. Our alumni office runs on Alumnyo now.',
      author: 'Dr. Padma Reddy',
      role: 'Registrar, Bharatiya University',
    },
    techStack: ['Alumnyo (Laravel)', 'Flutter (iOS + Android)', 'Razorpay', 'PostgreSQL', 'AWS', 'Mailgun'],
    deliverables: ['Alumnyo white-label deployment', 'Migration of 12,847 records', 'iOS + Android apps in app stores', 'Razorpay donations integration', '2 on-site training sessions', '90-day post-launch support'],
  },
  {
    slug: 'northwind-legal-contract-ai',
    title: 'Cutting contract review from 45 minutes to 6',
    client: 'Northwind Legal',
    category: 'AI',
    year: '2024',
    summary: 'RAG-powered contract review assistant processing 4,000 documents/day.',
    badges: ['Premium'],
    tags: ['RAG', 'Claude API', 'Pinecone', 'Next.js'],
    mediaTone: 'charcoal',
    icon: 'NL',
    hasCaseStudy: true,
    lede: 'A 12-lawyer commercial firm was drowning in contract reviews. We built them an AI assistant that drafts redlines, flags risks, and lets a lawyer review in minutes — not hours.',
    duration: '12 weeks',
    scope: 'AI engineering · Document pipeline · Web app',
    team: '1 AI engineer · 1 backend · 1 designer',
    challenge: 'Northwind Legal handles commercial contracts for SaaS companies. Their senior partners were spending 4–5 hours daily on routine review work — mostly comparing new contracts against their firm\'s preferred positions on liability caps, IP, termination, and indemnity. The work was high-stakes but repetitive. They wanted to spend that time on actual negotiation, not first-pass review.',
    approach: 'We built a RAG system grounded in Northwind\'s 10-year library of redlined contracts. When a new contract arrives, it\'s parsed, chunked, and compared against their preferred positions clause-by-clause. The system drafts redlines in the partner\'s house style, flags non-standard clauses, and surfaces precedent from past similar deals. The partner reviews the AI\'s output and either accepts, modifies, or rejects — feedback loop trains the system continuously.',
    results: [
      { num: '4,000', label: 'Contracts processed per day' },
      { num: '6 min', label: 'Average review time (down from 45)' },
      { num: '92%', label: 'Clause-level redline accuracy' },
    ],
    techStack: ['Claude API', 'Pinecone', 'LangChain', 'Next.js', 'Node.js', 'PostgreSQL', 'AWS'],
    deliverables: ['RAG pipeline grounded in firm\'s precedent library', 'Web app for upload, review, and export', 'Feedback loop with continuous learning', 'DOCX redline export', 'SOC 2 Type II ready deployment'],
  },
  {
    slug: 'helio-health-voice-booking',
    title: 'Multilingual voice AI for hospital appointments',
    client: 'Helio Health',
    category: 'AI',
    year: '2025',
    summary: 'Inbound voice bot handling 60% of appointment bookings — in three languages.',
    badges: ['Featured'],
    tags: ['Voice AI', 'Twilio', 'Claude API', 'Kannada'],
    mediaTone: 'teal',
    icon: 'HH',
    hasCaseStudy: true,
    lede: 'A 4-hospital network was losing patients because their booking lines were always busy. Our voice AI now handles 60% of inbound calls — fluent in Kannada, Hindi, and English.',
    duration: '8 weeks',
    scope: 'Voice AI · Telephony integration · Dashboard',
    team: '1 AI engineer · 1 backend · 1 PM',
    challenge: 'Helio Health\'s 12-person call centre was missing 30%+ of inbound booking calls during peak hours. Patients would give up and call competitors. The hospital tried IVR menus but Kannada and Hindi speakers found them frustrating. They wanted something that actually felt like a conversation — and that could book appointments end-to-end without a human.',
    approach: 'We built a voice agent on Twilio + Claude with custom Kannada and Hindi speech recognition tuning. The agent verifies patient identity, checks doctor availability, suggests appointment slots, and confirms via SMS. For anything complex — insurance questions, emergency triage, language outside its training — it transfers seamlessly to a human agent with full context. The system was rolled out hospital-by-hospital with weekly tuning sessions.',
    results: [
      { num: '60%', label: 'Of bookings handled fully by voice AI' },
      { num: '<2s', label: 'Average response latency' },
      { num: '4.7/5', label: 'Patient satisfaction (post-call survey)' },
    ],
    techStack: ['Twilio', 'Claude API', 'Deepgram', 'Custom STT for Kannada/Hindi', 'Node.js', 'PostgreSQL', 'Redis'],
    deliverables: ['Voice agent in Kannada, Hindi, English', 'Twilio telephony integration', 'Live operator handoff with context', 'Admin dashboard for call analytics', 'A/B testing framework for prompt tuning'],
  },
  {
    slug: 'pragati-college-website',
    title: 'A college website that actually converts admissions',
    client: 'Pragati College',
    category: 'Web',
    year: '2025',
    summary: 'Joomla-based redesign that lifted application form completions by 3.2x.',
    badges: ['Featured'],
    tags: ['Joomla 5', 'SP Page Builder', 'Helix Framework'],
    mediaTone: 'cream',
    icon: 'PC',
    hasCaseStudy: false,
    externalUrl: 'https://pragati.example.com',
  },
  {
    slug: 'shree-medha-college',
    title: 'Modernised website for Shree Medha Degree College',
    client: 'Shree Medha Degree College',
    category: 'Web',
    year: '2024',
    summary: 'Full CSS rewrite + Joomla theme modernisation for a 40-year-old institution.',
    tags: ['Joomla', 'CSS', 'Helix Framework'],
    mediaTone: 'gold',
    icon: 'SM',
    hasCaseStudy: false,
    externalUrl: 'https://shreemedha.example.com',
  },
  {
    slug: 'logiwave-erp',
    title: 'ERP for a 200-employee logistics firm',
    client: 'Logiwave India',
    category: 'Software',
    year: '2024',
    summary: 'End-to-end ERP covering dispatch, fleet, billing, and reconciliation.',
    tags: ['Laravel', 'PostgreSQL', 'Vue.js'],
    mediaTone: 'slate',
    icon: 'LW',
    hasCaseStudy: false,
  },
  {
    slug: 'fieldforce-mobile',
    title: 'Field-ops app for 1,200 technicians',
    client: 'Vortek Industries',
    category: 'Mobile',
    year: '2024',
    summary: 'Offline-first Flutter app for service technicians across 8 states.',
    tags: ['Flutter', 'Firebase', 'Offline-first'],
    mediaTone: 'charcoal',
    icon: 'VT',
    hasCaseStudy: false,
  },
  {
    slug: 'karnataka-govt-portal',
    title: 'Citizen services portal for Karnataka',
    client: 'Govt of Karnataka',
    category: 'Government',
    year: '2023',
    summary: 'Multilingual citizen services portal handling 80k+ daily requests.',
    tags: ['Joomla', 'Multilingual', 'WCAG'],
    mediaTone: 'teal',
    icon: 'GK',
    hasCaseStudy: false,
  },
  {
    slug: 'foodaroo-ordering',
    title: 'Online ordering for a 14-outlet restaurant chain',
    client: 'Foodaroo',
    category: 'Web',
    year: '2024',
    summary: 'Headless commerce stack with real-time kitchen routing.',
    tags: ['Next.js', 'Stripe', 'Real-time'],
    mediaTone: 'cream',
    icon: 'FD',
    hasCaseStudy: false,
    externalUrl: 'https://foodaroo.example.com',
  },
  {
    slug: 'medsync-clinic-mgmt',
    title: 'Clinic management for a multi-specialty practice',
    client: 'MedSync Clinics',
    category: 'Software',
    year: '2025',
    summary: 'Appointment booking, EMR, billing, and patient comms in one platform.',
    tags: ['Laravel', 'React', 'HIPAA-aware'],
    mediaTone: 'slate',
    icon: 'MS',
    hasCaseStudy: false,
  },
  {
    slug: 'lendlift-fintech',
    title: 'Loan origination platform for an NBFC',
    client: 'LendLift Capital',
    category: 'Software',
    year: '2024',
    summary: 'Loan origination + underwriting with 6 third-party integrations.',
    tags: ['Laravel', 'KYC APIs', 'Credit Bureau'],
    mediaTone: 'charcoal',
    icon: 'LL',
    hasCaseStudy: false,
  },
]

export const categories = ['All', 'Web', 'Software', 'AI', 'Mobile', 'Government', 'SaaS'] as const

export function getFeaturedProjects() {
  return projects.filter(p => p.badges?.includes('Featured'))
}

export function getProjectBySlug(slug: string) {
  return projects.find(p => p.slug === slug)
}

export function getRelatedProjects(currentSlug: string, count = 2) {
  return projects.filter(p => p.slug !== currentSlug && p.hasCaseStudy).slice(0, count)
}
