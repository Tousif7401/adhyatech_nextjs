'use client'

import { useState } from 'react'
import UtilityBar from '../../components/UtilityBar'
import Header from '../../components/Header'
import { Footer } from '../../components/Sections4'
import TechMatrix from '../../components/TechMatrix'

const faqs = [
  { q: 'How is building a SaaS different from a custom app?', a: 'A custom app serves one company. A SaaS serves many — which means multi-tenancy, subscription billing, self-service onboarding, role-based admin, usage metering, and the operational plumbing to keep all of that running 24/7. The product is the same job; the architecture has to do five extra things from day one. We design those in from the start instead of bolting them on later.' },
  { q: 'What does "we run our own SaaS" change?', a: 'Most agencies have only ever launched products — they hand it over and walk away. We operate one (Alumnyo) every day: on-call rotations, incident response, customer support tickets, billing reconciliation, the slow grind of churn analysis. That means when we architect your SaaS, we know which decisions you\'ll thank us for in year two and which ones will haunt you.' },
  { q: 'Can we start small and scale?', a: 'That\'s the whole point. We ship a validated MVP in 6–10 weeks — real auth, real billing, real multi-tenancy, just a small feature set. You acquire your first customers on it. As traffic and complexity grow, we expand the architecture (read replicas, queues, caching, regional deployments) one layer at a time, only when the load justifies it. No premature engineering, no painful re-architecture.' },
  { q: 'Who owns the code and the customers?', a: 'You own both — fully. Source-code handover is standard. Customer data lives in your accounts (Stripe/Razorpay, your AWS/GCP). We can operate it as a service for you, or hand it off to your team with documentation and a training period. No vendor lock-in, no platform dependency.' },
]

export default function SaaSDevelopmentPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0)

  return (
    <>
      <UtilityBar />
      <Header />
      <main style={{ ['--svc-accent' as string]: 'rgba(208,0,0,0.16)', ['--svc-accent-solid' as string]: '#E8B547' }}>

        <section className="svc-hero">
          <div className="svc-hero__bg"></div>
          <div className="svc-hero__grid-lines"></div>
          <div className="container">
            <div className="svc-hero__inner">
              <div className="svc-hero__breadcrumb">
                <a href="/">Home</a><span className="sep">/</span>
                <a href="/services">Services</a><span className="sep">/</span>
                <span>SaaS Development</span>
              </div>
              <div className="svc-hero__band"><span className="dot"></span>Products · 08</div>
              <h1>SaaS built by people who <em>actually run one</em>.</h1>
              <p className="svc-hero__lede">From validated MVP to multi-tenant scale — auth, billing, admin, analytics, and the unglamorous operational plumbing that keeps a product running. We build SaaS for clients; we also run our own, every day.</p>
              <div className="svc-hero__actions">
                <a href="/quote" className="btn btn--red btn--lg">Request a quote <span className="arrow">↗</span></a>
                <a href="/portfolio" className="btn btn--ghost-d btn--lg">See our work</a>
              </div>
              <div className="svc-hero__stats">
                <div className="svc-hero__stat"><strong>6–10<span className="accent"> wks</span></strong><span>To validated MVP</span></div>
                <div className="svc-hero__stat"><strong>1<span className="accent"> own</span></strong><span>SaaS we operate daily</span></div>
                <div className="svc-hero__stat"><strong>Multi<span className="accent">-tenant</span></strong><span>Architected from day one</span></div>
              </div>
            </div>
          </div>
        </section>

        <section className="svc-intro">
          <div className="container">
            <div className="svc-intro__grid">
              <div className="svc-intro__label">What this actually means</div>
              <div className="svc-intro__body">
                <p>Building a SaaS is half product, half operations. The product is what your customers see; the operations are what keep them paying.</p>
                <p>We design both from the start — multi-tenancy that doesn't leak, billing that reconciles, admin panels that scale with your support team, monitoring that wakes us up <em>before</em> customers notice. The unglamorous infrastructure is where most early-stage SaaS quietly dies; we treat it as <strong>first-class work</strong>.</p>
                <p>The shortest path from idea to recurring revenue is a small product, well-built, in customers' hands. We ship that first. Then we expand — only as the load and the learnings justify it.</p>
              </div>
            </div>
          </div>
        </section>

        {/* SIGNATURE: MVP → scale stages */}
        <section className="svc-sec svc-sec--ink">
          <div className="container">
            <div className="svc-sec__head">
              <span className="svc-sec__eyebrow">From idea to scale</span>
              <h2 className="svc-sec__title">Built to <em>grow</em> — without rebuilding.</h2>
              <p className="svc-sec__intro">Each stage adds only what the next 10× of growth genuinely needs. No premature engineering, no painful re-architecture.</p>
            </div>
            <div className="saas-stages">
              <div className="saas-stage">
                <div className="saas-stage__when">Stage 01 · MVP</div>
                <h4>Validated &amp; live</h4>
                <p>6–10 weeks. Real auth, real billing, real multi-tenancy, small feature set. Acquire first 10 customers.</p>
                <ul><li>Auth + roles</li><li>Stripe / Razorpay</li><li>Single region</li><li>Admin panel</li></ul>
              </div>
              <div className="saas-stage">
                <div className="saas-stage__when">Stage 02 · Traction</div>
                <h4>Self-serve &amp; sticky</h4>
                <p>Onboarding flows, in-product analytics, support tooling, retention features. First 100 customers.</p>
                <ul><li>Onboarding</li><li>Usage metering</li><li>In-app support</li><li>Webhooks</li></ul>
              </div>
              <div className="saas-stage">
                <div className="saas-stage__when">Stage 03 · Scale</div>
                <h4>Performant &amp; reliable</h4>
                <p>Read replicas, queues, caching, monitoring. Survives traffic spikes; on-call rotation in place.</p>
                <ul><li>Read replicas</li><li>Job queues</li><li>Caching layer</li><li>SLO dashboards</li></ul>
              </div>
              <div className="saas-stage saas-stage--peak">
                <div className="saas-stage__when">Stage 04 · Enterprise</div>
                <h4>Audit-ready</h4>
                <p>SSO/SAML, audit logs, data residency, SOC 2-ready posture. Lands the deals with procurement teams.</p>
                <ul><li>SSO / SAML</li><li>Audit logs</li><li>Data residency</li><li>SOC 2-ready</li></ul>
              </div>
            </div>

            {/* "We run our own" callout */}
            <div className="alumnyo-callout">
              <div className="alumnyo-callout__badge">A</div>
              <div className="alumnyo-callout__body">
                <h4>We run <em>Alumnyo</em> — our own SaaS — every day.</h4>
                <p>Alumni management for universities and colleges. Multi-tenant, multi-region, on-call. Every decision we make on your SaaS is informed by what we've already lived through on ours.</p>
              </div>
              <a href="/alumnyo" className="btn btn--gold">See Alumnyo →</a>
            </div>
          </div>
        </section>

        <section className="svc-sec svc-sec--coal">
          <div className="container">
            <div className="svc-sec__head">
              <span className="svc-sec__eyebrow">What's included</span>
              <h2 className="svc-sec__title">Everything a real SaaS <em>needs</em>.</h2>
            </div>
            <div className="svc-deliver-grid">
              <div className="svc-deliver"><div className="svc-deliver__num">01</div><h3>Multi-tenancy</h3><p>Isolated tenant data with shared infrastructure — the right balance of cost and safety.</p></div>
              <div className="svc-deliver"><div className="svc-deliver__num">02</div><h3>Subscription billing</h3><p>Stripe or Razorpay with metering, proration, dunning, and clean invoicing for India and abroad.</p></div>
              <div className="svc-deliver"><div className="svc-deliver__num">03</div><h3>Self-serve onboarding</h3><p>Sign up, invite teammates, get to value in minutes — without your sales team in the loop.</p></div>
              <div className="svc-deliver"><div className="svc-deliver__num">04</div><h3>Admin &amp; support tooling</h3><p>Impersonation, refunds, plan changes, debugging — built so your CS team can self-serve too.</p></div>
              <div className="svc-deliver"><div className="svc-deliver__num">05</div><h3>Usage analytics</h3><p>Cohort retention, feature usage, churn signals — the dashboards a SaaS founder actually reads.</p></div>
              <div className="svc-deliver"><div className="svc-deliver__num">06</div><h3>Ops &amp; monitoring</h3><p>Logs, metrics, alerts, runbooks. Optional on-call from us until your team takes it over.</p></div>
            </div>
          </div>
        </section>

        <section className="svc-sec svc-sec--ink">
          <div className="container">
            <div className="svc-sec__head">
              <span className="svc-sec__eyebrow">How it runs</span>
              <h2 className="svc-sec__title">From idea to <em>paying customers</em>.</h2>
            </div>
            <div className="svc-process">
              <div className="svc-step"><div className="svc-step__dot"></div><div className="svc-step__n">Wk 1–2</div><h4>Strip to MVP</h4><p>Decide the smallest product that earns revenue. Map data model and pricing.</p></div>
              <div className="svc-step"><div className="svc-step__dot"></div><div className="svc-step__n">Wk 3–4</div><h4>Foundations</h4><p>Auth, billing, multi-tenancy, admin — the unsexy plumbing built right the first time.</p></div>
              <div className="svc-step"><div className="svc-step__dot"></div><div className="svc-step__n">Wk 5–8</div><h4>Build the product</h4><p>The features customers actually pay for. Weekly previews; tighten as we go.</p></div>
              <div className="svc-step"><div className="svc-step__dot"></div><div className="svc-step__n">Live</div><h4>Launch &amp; iterate</h4><p>First customers on. We watch the dashboards with you and expand the architecture as load demands.</p></div>
            </div>
          </div>
        </section>

        <TechMatrix
          variant="coal"
          eyebrow="Tools we use"
          title={<>Deep where it counts. <em>Fluent</em> everywhere else.</>}
          deep={<><p>Our depth is in <strong>multi-tenant Laravel and Next.js</strong> — the foundation we use every day on Alumnyo. We know which patterns survive a 10× scale-up, and which ones quietly bury you in tech debt.</p></>}
          agnostic={<p><strong>Stack-flexible.</strong> Already on Django, Rails, .NET, or Node? Existing AWS/GCP/Azure setup? We work in your world. The right stack is the one your team can keep running for the next five years.</p>}
          categories={[
            { label: 'Application', tags: [{name:'Laravel',core:true},{name:'Next.js',core:true},{name:'Node.js'},{name:'Django'},{name:'Rails'},{name:'.NET'},{name:'TypeScript'}] },
            { label: 'Frontend', tags: [{name:'React',core:true},{name:'Vue'},{name:'Inertia'},{name:'Livewire'},{name:'Tailwind'}] },
            { label: 'Databases', tags: [{name:'PostgreSQL',core:true},{name:'MySQL'},{name:'Redis'},{name:'MongoDB'},{name:'ClickHouse'},{name:'Read replicas'}] },
            { label: 'Billing & auth', tags: [{name:'Stripe',core:true},{name:'Razorpay',core:true},{name:'Paddle'},{name:'Auth0'},{name:'Clerk'},{name:'SSO / SAML'}] },
            { label: 'Cloud & ops', tags: [{name:'AWS',core:true},{name:'GCP'},{name:'Azure'},{name:'DigitalOcean'},{name:'Docker'},{name:'Kubernetes'},{name:'Terraform'}] },
            { label: 'Observability', tags: [{name:'Sentry'},{name:'Datadog'},{name:'Grafana'},{name:'PostHog'},{name:'Audit logs'},{name:'SOC 2-ready'}] },
          ]}
        />

        <section className="svc-sec svc-sec--ink">
          <div className="container">
            <div className="svc-proof">
              <div>
                <div className="svc-proof__eyebrow">Proof · EdTech SaaS</div>
                <blockquote>"They built and now <em>run</em> our alumni platform across multiple universities. Six months in, we'd never go back to managing it ourselves."</blockquote>
                <div className="svc-proof__cite"><strong>Bharatiya Universities Network</strong> · Multi-tenant alumni portal</div>
              </div>
              <a href="/portfolio/bharatiya-alumni-portal" className="btn btn--gold svc-proof__link">View the case study →</a>
            </div>
          </div>
        </section>

        <section className="svc-sec svc-sec--coal">
          <div className="container">
            <div className="svc-sec__head">
              <span className="svc-sec__eyebrow">Common questions</span>
              <h2 className="svc-sec__title">Before you <em>ask</em>.</h2>
            </div>
            <div className="svc-faq">
              {faqs.map((f, i) => (
                <div key={i} className={`svc-faq__item${openFaq === i ? ' is-open' : ''}`}>
                  <button className="svc-faq__q" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                    {f.q}<span className="svc-faq__icon"></span>
                  </button>
                  <div className="svc-faq__a"><p>{f.a}</p></div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="svc-sec svc-sec--ink">
          <div className="container">
            <div className="svc-sec__head">
              <span className="svc-sec__eyebrow">Related services</span>
              <h2 className="svc-sec__title">Often paired <em>with</em>.</h2>
            </div>
            <div className="svc-related-grid">
              <a href="/services/custom-software" className="svc-related"><div className="svc-related__band">Build</div><h3>Custom <em>Software</em></h3><p>If your SaaS isn't quite SaaS yet — an internal tool first, a product later.</p><span className="svc-related__arrow">Explore →</span></a>
              <a href="/services/api-integrations" className="svc-related"><div className="svc-related__band">Grow</div><h3>API &amp; <em>Integrations</em></h3><p>Webhooks, public APIs, third-party connectors — the SaaS ecosystem work.</p><span className="svc-related__arrow">Explore →</span></a>
              <a href="/services/cloud-devops" className="svc-related"><div className="svc-related__band">Grow</div><h3>Cloud &amp; <em>DevOps</em></h3><p>The deployment, monitoring, and on-call your SaaS needs to stay up.</p><span className="svc-related__arrow">Explore →</span></a>
            </div>
          </div>
        </section>

        <section className="bigcta" id="contact">
          <div className="container bigcta__inner">
            <h2>Got a SaaS idea <br /><em>that needs shipping?</em></h2>
            <p className="bigcta__sub">Tell us what it does and who pays. We'll come back with the smallest version that earns revenue — and how to get there in 6–10 weeks — within one business day.</p>
            <div className="bigcta__actions">
              <a href="/quote" className="btn btn--red btn--lg">Request a quote <span className="arrow">↗</span></a>
              <a href="/contact" className="btn btn--ghost-d btn--lg">Or just send a message</a>
            </div>
          </div>
        </section>

      </main>
      <Footer />
      <a href="/quote" className="fab">Let's talk →</a>
    </>
  )
}
