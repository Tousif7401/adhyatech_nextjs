import UtilityBar from '../components/UtilityBar'
import Header from '../components/Header'
import { Footer, BigCTA } from '../components/Sections4'

import Link from "next/link";

import type { Metadata } from "next";
import { getSeo } from "../../lib/seo";

const storageUrl = process.env.NEXT_PUBLIC_STORAGE_URL;

export async function generateMetadata(): Promise<Metadata> {
  try {
    const seo = await getSeo("osciva");

    return {
      title: seo.meta_title,
      description: seo.meta_description,
      keywords: seo.meta_keywords?.split(","),
      robots: seo.meta_robots,
      openGraph: {
        title: seo.og_title || seo.meta_title,
        description: seo.og_description || seo.meta_description,
        images: seo.meta_image
          ? [`${storageUrl}/${seo.meta_image}`]
          : [],
      },
    };
  } catch {
    return {
      title: "Projects",
      description: "Our Projects",
    };
  }
}


const oscivaFeatures = [
  { num: '/01', title: 'RAG Systems', body: 'Document-grounded retrieval-augmented generation with 90%+ accuracy. Built for legal, finance, healthcare and education.' },
  { num: '/02', title: 'Multi-step Agents', body: 'Agents that actually finish a workflow — not just chat. Tool use, planning, and memory wired into your existing systems.' },
  { num: '/03', title: 'Voice AI', body: 'Inbound and outbound voice agents in Hindi, Kannada, English, and Telugu. Real-time, low-latency, production-ready.' },
  { num: '/04', title: 'Fine-tuned Models', body: 'Custom-tuned open-source models deployed on your infrastructure. Your data stays yours.' },
  { num: '/05', title: 'Document Processing', body: 'Invoice, contract, and form extraction with structured output. Replaces 80% of manual data entry.' },
  { num: '/06', title: 'Co-pilots & Chatbots', body: 'Internal AI co-pilots that draft, summarise, and answer — grounded in your company knowledge base.' },
]

const oscivaCaseStudies = [
  { name: 'Nandi Honda', metric: 'Lead gen assistant', body: 'Built a Ai assistant that captures leads for Test drives, service, insurance with 87% accuracy..' },
  { name: 'Shree Medha College', metric: '200 chat requests/day', body: 'RAG-powered Ai assistant that processes 200 chat requests/day. Regarding admissions, library, examinations, learning modules.' },
  {/* name: 'Helio Health', metric: 'Multilingual voice', body: 'Voice AI for appointment booking in Kannada, Hindi, and English. Handles 60% of inbound calls without human handoff.' */},
]

const pricing = [
  {
    tier: 'Discovery',
    price: '₹1.5L',
    period: '/ project',
    desc: 'A two-week AI feasibility sprint. We assess your data, your problem, and recommend a build plan — or tell you not to build it at all.',
    features: [
      '2-week diagnostic sprint',
      'Data audit & feasibility report',
      'POC of one critical workflow',
      'Build-or-skip recommendation',
      '90-min strategy call with founders',
    ],
    cta: 'Book a discovery',
    popular: false,
  },
  {
    tier: 'Production Build',
    price: '₹8L+',
    period: '/ project',
    desc: 'Full RAG / agent / voice AI build, deployed to your infrastructure. 6–12 weeks. Measured by the business outcome you signed up for.',
    features: [
      '6-12 week production build',
      'RAG, agents, or voice AI',
      'Full deployment on your infra',
      'Monitoring + cost dashboards',
      '90-day post-launch support',
      'Source code & docs handover',
    ],
    cta: 'Get a quote',
    popular: true,
  },
  {
    tier: 'AI Retainer',
    price: '₹2.5L',
    period: '/ month',
    desc: 'Ongoing AI engineering as a service. A dedicated Osciva pod (1 senior AI engineer + 1 part-time architect) embedded with your team.',
    features: [
      'Dedicated AI engineer pod',
      '40 hours/month of senior time',
      'Weekly sync + monthly review',
      'Model updates & monitoring',
      'New feature builds',
      'Cost optimisation & audits',
    ],
    cta: 'Reserve a pod',
    popular: false,
  },
]

export default async function OscivaPage() {

  return (
    <>
      <UtilityBar />
      <Header />
      <main>
        <section className="product-hero is-osciva">
          <div className="container">
            <div className="product-hero__inner">
              <div>
                <span className="product-hero__pill">Sub-brand · Live</span>
                <h1>AI that <em>earns its keep.</em></h1>
                <p>
                  Osciva is Adyatech's dedicated AI practice. We build agents, RAG systems, document workflows, voice bots and AI co-pilots that solve specific business problems — and we measure the ROI.
                </p>
                <div className="product-hero__cta">
                  <Link href="#pricing" className="btn btn--red">See pricing <span className="arrow">↗</span></Link>
                  <Link href="https://osciva.io" className="btn btn--ghost-d">Visit osciva.io</Link>
                </div>
              </div>
              <div className="product-hero__visual" aria-hidden="true">
                <div className="osciva-big-orb"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="feature-grid-section">
          <div className="container">
            <div className="feature-grid-head">
              <span className="eyebrow">Capabilities · 01</span>
              <h2 className="section-title">What we <em>actually</em> build.</h2>
              <p className="lede" style={{ margin: '24px auto 0' }}>
                Six production capabilities. Each one battle-tested on a real client engagement, not a demo.
              </p>
            </div>
            <div className="feature-grid">
              {oscivaFeatures.map(f => (
                <article key={f.num}>
                  <div className="feature-grid__num">{f.num}</div>
                  <h3>{f.title}</h3>
                  <p>{f.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Case Studies */}
        <section className="feature-grid-section is-dark">
          <div className="container">
            <div className="feature-grid-head">
              <span className="eyebrow">Shipped to production · 02</span>
              <h2 className="section-title">Real builds. <em>Real outcomes.</em></h2>
            </div>
            <div className="feature-grid">
              {oscivaCaseStudies.map(c => (
                <article key={c.name}>
                  <div className="feature-grid__num">{c.name}</div>
                  <h3>{c.metric}</h3>
                  <p>{c.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section className="pricing-section" id="pricing">
          <div className="container">
            <div className="pricing-head">
              <span className="eyebrow">Pricing · 03</span>
              <h2 className="section-title">Three ways to <em>work with us</em>.</h2>
              <p className="lede" style={{ margin: '24px auto 0', color: 'rgba(19,19,25,0.62)' }}>
                Indicative. Final pricing depends on scope, data, and timeline. We send a written estimate after the first discovery call.
              </p>
            </div>
            <div className="pricing-grid">
              {pricing.map(p => (
                <div key={p.tier} className={`pricing-card${p.popular ? ' is-popular' : ''}`}>
                  <div className="pricing-tier">{p.tier}</div>
                  <div className="pricing-price">{p.price}<span className="period">{p.period}</span></div>
                  <div className="pricing-desc">{p.desc}</div>
                  <ul className="pricing-features">
                    {p.features.map(f => <li key={f}>{f}</li>)}
                  </ul>
                  <Link href="/contact" className={`btn ${p.popular ? 'btn--red' : 'btn--ghost-l'}`}>{p.cta}</Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        <BigCTA />
      </main>
      <Footer />
      <Link href="/contact" className="fab">Let's talk →</Link>
    </>
  )
}
