// Shared services data — single source of truth for both the homepage
// Services section and the full /services page. In Phase 3 this can be
// fed from the Laravel API; the shape stays the same.

export type ServiceBand = 'Build' | 'AI' | 'Products' | 'Grow'

export type Service = {
  slug: string
  code: string          // e.g. "WEB", "AI", used in the S/0x — CODE label
  band: ServiceBand
  title: string         // plain title
  titleEm: string       // the italic-emphasis portion
  short: string         // one-liner for homepage card
  description: string[] // longer paragraphs for /services page
  tags: string[]
  features: string[]
  iconLabel: string     // short text used in the visual box, e.g. "W", "AI"
  iconClass: 'is-slate' | 'is-red' | 'is-gold' | 'is-cream' | 'is-charcoal' | 'is-teal'
  caseStudy?: { label: string; href: string }  // proof link where we have one
  onHomepage?: boolean
  hasDetailPage?: boolean  // shows in the curated homepage grid
}

export const services: Service[] = [
  // ───────── BUILD ─────────
  {
    slug: 'web-development',
    hasDetailPage: true,
    code: 'WEB',
    band: 'Build',
    title: 'Custom',
    titleEm: 'Web Development',
    short: 'Marketing sites, portals, and CMS work that loads fast, ranks well, and looks expensive.',
    description: [
      'Marketing sites, portals, multilingual platforms, and CMS work that loads fast, ranks well, and looks expensive — without costing what it looks like.',
      "We're known for our Joomla 5/6 + Helix + SP Page Builder Pro stack, but we ship just as confidently on Next.js, Laravel, WordPress, and headless setups. We pick the right tool for the job — not the agency's favourite.",
    ],
    tags: ['Joomla 5/6', 'Next.js', 'Laravel', 'WordPress', 'Headless CMS', 'SP Page Builder Pro', 'Helix Framework'],
    features: [
      'Multilingual sites (Kannada, Hindi, English, Telugu)',
      'WCAG 2.2 AA accessibility compliance built-in',
      'Core Web Vitals tuned to 90+ scores',
      'SEO-ready architecture and schema markup',
      'CMS handover with a training session for your team',
    ],
    iconLabel: 'W',
    iconClass: 'is-slate',
    caseStudy: { label: 'Karnataka citizen portal', href: '/portfolio' },
    onHomepage: true,
  },
  {
    slug: 'custom-software',
    hasDetailPage: true,
    code: 'SOFTWARE',
    band: 'Build',
    title: 'Custom Software &',
    titleEm: 'Enterprise Apps',
    short: 'ERPs, CRMs, dashboards, and internal tools. First usable build in 4–6 weeks, not 6 months.',
    description: [
      'ERPs, CRMs, dashboards, internal tools, and integration platforms. We pair a designer with two engineers and ship the first usable build in 4–6 weeks — not 6 months.',
      'Most clients ask: "Why is it cheaper than the last quote we got?" Because we don\'t pad timelines, we don\'t need a 10-person team to ship a 2-person project, and we measure success in working software — not slide decks.',
    ],
    tags: ['Laravel', 'Node.js', 'Python', 'PostgreSQL', 'MongoDB', 'Redis', 'AWS', 'Docker', 'REST', 'GraphQL'],
    features: [
      'Discovery-to-staging in under 30 days',
      'Two-week sprints with Friday demos',
      'Role-based access, audit logs, encryption-at-rest',
      'Production-ready CI/CD pipelines',
      'Full source-code handover & documentation',
    ],
    iconLabel: 'S',
    iconClass: 'is-red',
    caseStudy: { label: 'Logiwave ERP', href: '/portfolio' },
    onHomepage: true,
  },
  {
    slug: 'mobile-apps',
    hasDetailPage: true,
    code: 'MOBILE',
    band: 'Build',
    title: 'Mobile',
    titleEm: 'App Development',
    short: 'Cross-platform first with Flutter, native when it earns its keep. Consumer and field-ops apps.',
    description: [
      "Cross-platform first (Flutter, React Native), native when it's worth it (Swift, Kotlin). We've shipped consumer apps, internal field-ops apps, and the occasional white-label SDK.",
      'Our shortest build was a 28-day Flutter MVP. Our largest is a Flutter app used daily by 1,200 technicians. We can ship at either scale — your timeline drives ours.',
    ],
    tags: ['Flutter', 'React Native', 'iOS Swift', 'Kotlin', 'Firebase', 'Supabase', 'App Store Ops'],
    features: [
      'iOS & Android from one Flutter codebase',
      'App Store + Play Store submission handled',
      'Offline-first architecture & background sync',
      'Crashlytics, analytics, and A/B testing wired in',
      'White-label SDKs for resellers and partners',
    ],
    iconLabel: 'M',
    iconClass: 'is-slate',
    caseStudy: { label: 'Vortek field-ops app', href: '/portfolio' },
    onHomepage: true,
  },
  {
    slug: 'ecommerce',
    hasDetailPage: true,
    code: 'ECOMM',
    band: 'Build',
    title: 'E-commerce',
    titleEm: 'Development',
    short: 'Storefronts wired to Razorpay, UPI, WhatsApp, and Shiprocket — built for the Indian market.',
    description: [
      'Custom storefronts and headless commerce built for how India actually buys — UPI-first checkout, Razorpay/PayU/Cashfree, WhatsApp order flows, and Shiprocket logistics baked in.',
      'From a single-boutique launch to a 14-outlet chain with real-time kitchen routing, we build commerce that converts on cheap Android phones over patchy 4G — not just on your designer\'s laptop.',
    ],
    tags: ['Laravel', 'Next.js', 'Shopify', 'Razorpay', 'UPI', 'WhatsApp API', 'Shiprocket'],
    features: [
      'UPI-first checkout with Razorpay / PayU / Cashfree',
      'WhatsApp Business order & support flows',
      'Shiprocket and courier integrations',
      'Inventory, GST invoicing, and reconciliation',
      'Mobile-first, tuned for low-bandwidth networks',
    ],
    iconLabel: 'E',
    iconClass: 'is-gold',
    caseStudy: { label: 'Foodaroo ordering', href: '/portfolio' },
    onHomepage: true,
  },
  // ───────── AI ─────────
  {
    slug: 'ai-agents',
    hasDetailPage: true,
    code: 'AGENTS',
    band: 'AI',
    title: 'AI Agents &',
    titleEm: 'Automation',
    short: 'Workflow bots, internal copilots, and document processing that complete real work — not demos.',
    description: [
      'Multi-step agents and automation that complete real workflows — drafting, routing, processing documents and emails, and acting across your tools. Built under our AI sub-brand, Osciva.',
      "We're past the demo stage. Our agents are in production for fintech, legal, and healthcare clients, measured by hours saved and ROI — not by token count.",
    ],
    tags: ['Claude API', 'OpenAI', 'LangChain', 'Agents', 'Tool use', 'Workflow automation'],
    features: [
      'Multi-step agents that complete real workflows',
      'Internal copilots grounded in your data',
      'Document & email processing pipelines',
      'Human-in-the-loop review and approval steps',
      'Cost monitoring & token-usage dashboards built-in',
    ],
    iconLabel: 'AI',
    iconClass: 'is-gold',
    caseStudy: { label: 'Northwind contract review', href: '/portfolio/northwind-legal-contract-ai' },
    onHomepage: true,
  },
  {
    slug: 'rag-knowledge-systems',
    hasDetailPage: true,
    code: 'RAG',
    band: 'AI',
    title: 'RAG &',
    titleEm: 'Knowledge Systems',
    short: 'Chat with your docs, contracts, and policies — grounded, cited, and honest about what it doesn\'t know.',
    description: [
      '"Chat with your documents" done properly — hybrid retrieval, reranking, and evals that get you past the 60% demo ceiling to 85%+ production accuracy.',
      'Our RAG systems cite their sources, say "I don\'t know" instead of inventing answers, respect permissions, and log every response so a human can verify and correct it.',
    ],
    tags: ['Claude API', 'LlamaIndex', 'Vector DBs', 'Pinecone', 'Hybrid search', 'Rerankers', 'Evals'],
    features: [
      'Document-grounded answers with 85%+ retrieval accuracy',
      'Hybrid (semantic + keyword) search with reranking',
      'Source citations on every answer',
      'Permission-aware retrieval',
      'Continuous eval dashboards to catch regressions',
    ],
    iconLabel: 'RG',
    iconClass: 'is-charcoal',
    caseStudy: { label: 'Civic Bank churn model', href: '/portfolio/civic-bank-churn-model' },
  },
  {
    slug: 'voice-ai',
    hasDetailPage: true,
    code: 'VOICE',
    band: 'AI',
    title: 'Voice',
    titleEm: 'AI',
    short: 'Multilingual voice bots in Kannada, Hindi, and English that book, cancel, and hand off cleanly.',
    description: [
      'Inbound and outbound voice agents that actually work in Indic languages — Kannada, Hindi, Telugu, and English, including code-mixed speech that off-the-shelf models choke on.',
      'We tune speech recognition on your real calls, classify intent before spending on the model, and hand off to a human with full context when a call needs one. Shipped and handling 60% of bookings for a 4-hospital network.',
    ],
    tags: ['Twilio', 'Claude API', 'Deepgram', 'Custom STT', 'Kannada / Hindi', 'Telephony'],
    features: [
      'Voice agents in Kannada, Hindi, Telugu, English',
      'Custom speech-to-text tuned on your calls',
      'Live operator handoff with full context',
      'Sub-2-second response latency on telephony',
      'DPDP-compliant consent and retention',
    ],
    iconLabel: 'VA',
    iconClass: 'is-teal',
    caseStudy: { label: 'Helio Health voice booking', href: '/portfolio/helio-health-voice-booking' },
  },
  // ───────── PRODUCTS ─────────
  {
    slug: 'saas-development',
    hasDetailPage: true,
    code: 'SAAS',
    band: 'Products',
    title: 'SaaS Product',
    titleEm: 'Development',
    short: 'MVP to scale. We build real products — Alumnyo is our own proof that we ship and run them.',
    description: [
      'From validated MVP to multi-tenant scale. We build SaaS products end-to-end: auth, billing, multi-tenancy, admin, analytics, and the unglamorous operational plumbing that keeps them running.',
      "We don't just build SaaS for clients — we run our own. Alumnyo, our alumni-management platform, is live across multiple universities. We know the difference between shipping a product and maintaining one.",
    ],
    tags: ['Laravel', 'Next.js', 'PostgreSQL', 'Multi-tenancy', 'Stripe / Razorpay', 'AWS'],
    features: [
      'MVP in weeks, architected to scale',
      'Multi-tenant data isolation done right',
      'Subscription billing & metering',
      'Admin dashboards and usage analytics',
      'Built by a team that runs its own SaaS',
    ],
    iconLabel: 'SA',
    iconClass: 'is-red',
    caseStudy: { label: 'Bharatiya alumni portal', href: '/portfolio/bharatiya-alumni-portal' },
    onHomepage: true,
  },
  {
    slug: 'cms-content-platforms',
    hasDetailPage: true,
    code: 'CMS',
    band: 'Products',
    title: 'CMS &',
    titleEm: 'Content Platforms',
    short: 'Editor-friendly sites your team can run for a decade — Joomla, headless, or custom.',
    description: [
      'Content platforms built around the people who actually update them — clear editing experiences, sensible permissions, and workflows that survive staff turnover.',
      'Joomla 5/6 with SP Page Builder for institutions, headless CMS (Sanity, Strapi, Payload) when you want content as an API, or a custom editor when nothing off-the-shelf fits. Built to last, not to lock you in.',
    ],
    tags: ['Joomla 5/6', 'Sanity', 'Strapi', 'Payload', 'WordPress', 'Headless CMS'],
    features: [
      'Editing experiences non-technical staff can run',
      'Fine-grained roles, permissions, and workflows',
      'Multilingual content management',
      'Headless content-as-API when you need it',
      'Documentation and training for your team',
    ],
    iconLabel: 'CM',
    iconClass: 'is-cream',
    caseStudy: { label: 'Shree Medha College', href: '/portfolio' },
  },
  // ───────── GROW ─────────
  {
    slug: 'api-integrations',
    code: 'API',
    band: 'Grow',
    title: 'API &',
    titleEm: 'Integrations',
    short: 'Payment gateways, WhatsApp, logistics, and third-party connectors — wired together cleanly.',
    description: [
      'The connective tissue that makes everything else work — payment gateways, WhatsApp Business, logistics, CRMs, and any third-party service you need to talk to.',
      'We build robust, well-documented APIs and integrations with retries, webhooks, and proper error handling — so the connection holds up when it matters, not just in the happy path.',
    ],
    tags: ['REST', 'GraphQL', 'Webhooks', 'Razorpay', 'WhatsApp API', 'Shiprocket', 'OAuth'],
    features: [
      'Payment gateways (Razorpay, PayU, Cashfree, UPI)',
      'WhatsApp Business API integrations',
      'Logistics & courier integrations',
      'Robust webhooks, retries, and error handling',
      'Clear API docs for your team and partners',
    ],
    iconLabel: 'AP',
    iconClass: 'is-slate',
  },
  {
    slug: 'cloud-devops',
    code: 'DEVOPS',
    band: 'Grow',
    title: 'Cloud &',
    titleEm: 'DevOps',
    short: 'Deployment, CI/CD, and maintenance retainers — including the cPanel and VPS reality of Indian hosting.',
    description: [
      'Deployment and infrastructure that fits where you actually host — AWS and modern cloud when it makes sense, but also the cPanel and VPS setups most of our clients already run.',
      'CI/CD pipelines, monitoring, backups, security patching, and ongoing maintenance retainers that turn a one-off build into something that stays healthy for years.',
    ],
    tags: ['AWS', 'Docker', 'CI/CD', 'cPanel', 'VPS / Lightsail', 'Monitoring', 'Backups'],
    features: [
      'Deployment on cloud, VPS, or cPanel',
      'CI/CD pipelines and automated deploys',
      'Monitoring, alerting, and backups',
      'Security patching and updates',
      'Ongoing maintenance & support retainers',
    ],
    iconLabel: 'DO',
    iconClass: 'is-charcoal',
  },
  {
    slug: 'ui-ux-design',
    code: 'DESIGN',
    band: 'Grow',
    title: 'UI/UX',
    titleEm: 'Design',
    short: 'Interfaces that feel considered — research, design systems, and prototypes that ship.',
    description: [
      'Product and interface design that earns trust — user research, information architecture, design systems, and high-fidelity prototypes that translate cleanly into shipped code.',
      'Because the same team designs and builds, nothing gets lost in handoff. The thing you approve in Figma is the thing that ships — pixel for pixel.',
    ],
    tags: ['Figma', 'Design systems', 'Prototyping', 'User research', 'Accessibility', 'Design tokens'],
    features: [
      'User research and usability testing',
      'Reusable design systems and tokens',
      'High-fidelity, interactive prototypes',
      'Accessibility designed in from the start',
      'Design and build under one roof — no handoff loss',
    ],
    iconLabel: 'UX',
    iconClass: 'is-teal',
  },
]

export const bands: { name: ServiceBand; eyebrow: string; blurb: string }[] = [
  { name: 'Build', eyebrow: 'Build', blurb: 'The core craft — websites, software, apps, and commerce, shipped by senior people.' },
  { name: 'AI', eyebrow: 'AI · Osciva', blurb: 'Production AI under our Osciva sub-brand. Measured by ROI, not token count.' },
  { name: 'Products', eyebrow: 'Products', blurb: 'We build and run our own products — so we know how to build yours.' },
  { name: 'Grow', eyebrow: 'Grow', blurb: 'The connective and operational work that keeps everything running and scaling.' },
]

export function getHomepageServices() {
  return services.filter(s => s.onHomepage)
}

export function getServicesByBand(band: ServiceBand) {
  return services.filter(s => s.band === band)
}
