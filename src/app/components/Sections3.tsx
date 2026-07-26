'use client'

import { useEffect, useRef } from 'react'

import Link from "next/link";
import { Product } from "@/types/product";

const storageUrl = process.env.NEXT_PUBLIC_STORAGE_URL;

interface ProductsProps {
  products: Product[];
}

export function Products({ products }: ProductsProps) {
  return (
    <section className="products theme-light" id="products">
      <div className="container">
        <div className="products__head">
          <div>
            <span className="eyebrow">Built in-house · {products.length}</span>

            <h2 className="section-title">
              We <em>build for ourselves</em>, too.
            </h2>
          </div>

          <p
            className="lede"
            style={{ maxWidth: "38ch" }}
            data-aos="fade-up"
            data-aos-delay="100"
          >
            Products born from problems we couldn't solve with what already
            existed.
          </p>
        </div>

        <div className="products__grid">
          {products
            .filter((product) => product.status && !product.trash)
            .sort((a, b) => a.position - b.position)
            .map((product, index) => (
              <article
                key={product.id}
                className="product"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <span
                  className={`product__status ${product.publish_status === "Live" ? "is-live" : ""
                    }`}
                >
                  {product.publish_status}
                </span>

                <div
                  className="product__icon"
                  style={
                    product.logo
                      ? {
                        backgroundImage: `url(${storageUrl + '/' + product.logo})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                      }
                      : {}
                  }
                >
                  {!product.logo &&
                    product.name
                      .split(" ")
                      .map((w) => w[0])
                      .join("")
                      .slice(0, 2)}
                </div>

                <h3>{product.name}</h3>

                <p>{product.short_description}</p>

                <ul className="product__tags">
                  {product.tags.map((tag) => (
                    <li key={tag}>{tag}</li>
                  ))}
                </ul>

                <div className="product__actions">
                  {/* Details Page */}
                  <Link
                    href={`/products/${product.slug}`}
                    className="product__cta"
                  >
                    Read More →
                  </Link>

                  {/* External CTA */}
                  {product.cta_url && (
                    <Link
                      href={product.cta_url}
                      className="product__cta product__cta--secondary"
                      target={product.cta_url.startsWith("http") ? "_blank" : undefined}
                      rel={product.cta_url.startsWith("http") ? "noopener noreferrer" : undefined}
                    >
                      <span className="product__cta-text">{product.cta_text}</span>
                      <span className="product__cta-arrow">↗</span>
                    </Link>
                  )}
                </div>
              </article>
            ))}
        </div>
      </div>
    </section>
  );
}

export function Alumnyo() {
  const features = [
    { num: 'Feature 01', title: 'Alumni directory & profiles', desc: 'Searchable, filterable, with privacy controls graduates actually trust.' },
    { num: 'Feature 02', title: 'Events & reunions management', desc: 'Ticketing, RSVPs, check-ins — annual reunions that finally scale.' },
    { num: 'Feature 03', title: 'Donations & fundraising', desc: 'Built-in payment gateway, recurring giving, donor wall, transparent reporting.' },
    { num: 'Feature 04', title: 'Job board & mentorship', desc: 'Alumni hire alumni. Mentor matching that takes 90 seconds, not a committee.' },
    { num: 'Feature 05', title: 'Newsletter & communications', desc: 'Segmented broadcasts, event invites, and announcement campaigns from one inbox.' },
    { num: 'Feature 06', title: 'Mobile app for alumni', desc: 'Native iOS & Android apps so your graduates engage from the palm of their hand.' },
    { num: 'Feature 07', title: 'Analytics dashboard', desc: 'Engagement, donations, mentorships — every metric your principal asks for.' },
    { num: 'Feature 08', title: 'Payment gateway integration', desc: 'Razorpay, Stripe, PayU — Indian and international donations, all reconciled.' },
  ]

  return (
    <section className="alumnyo" id="alumnyo">
      <div className="container alumnyo__inner">
        <div className="alumnyo__copy" data-aos="fade-up">
          <span className="alumnyo__pill">Live · Selling now</span>
          <span className="eyebrow">Flagship SaaS · 06</span>
          <h2 className="section-title">
            Meet <em>Alumnyo</em> —<br />
            where college <em>alumni networks</em><br />
            actually thrive.
          </h2>
          <p className="lede" style={{ marginTop: 24, color: 'rgba(245,242,234,0.72)' }}>
            Alumnyo is our SaaS platform built for colleges and universities — replacing scattered spreadsheets, dead Facebook groups, and clunky portals with one beautiful, mobile-first home for your graduate community.
          </p>
          <ul className="alumnyo__features">
            {features.map(f => (
              <li key={f.num}>
                <span>{f.num}</span>
                <div><strong>{f.title}</strong>{f.desc}</div>
              </li>
            ))}
          </ul>
          <div className="alumnyo__cta">
            <a href="https://alumnyo.com" className="btn btn--red">Visit Alumnyo.com <span className="arrow">↗</span></a>
            <a href="/contact" className="btn btn--ghost-d">Book a demo</a>
          </div>
        </div>

        <div className="alumnyo__visual" data-aos="fade-up" data-aos-delay="200" aria-hidden="true">
          <div className="dash-card dash-card--1">
            <div className="dash-card__label">Active alumni</div>
            <div className="dash-card__value">12,847 <span className="delta">↑ 23%</span></div>
            <div className="dash-card__bar"></div>
          </div>
          <div className="dash-card dash-card--2">
            <div className="dash-card__label">Reunion · 2026</div>
            <div className="dash-card__value">847 RSVPs</div>
            <div className="dash-card__avatars">
              {['R', 'K', 'P', 'S'].map(l => <span key={l}>{l}</span>)}
            </div>
          </div>
          <div className="dash-card dash-card--3">
            <div className="dash-card__label">Donations · This month</div>
            <div className="dash-card__value">₹14.2L <span className="delta">↑ 41%</span></div>
            <div className="dash-card__bar"></div>
          </div>
        </div>
      </div>
    </section>
  )
}

export function Osciva() {
  return (
    <section className="osciva" id="osciva">
      <div className="container osciva__inner">
        <div className="osciva__copy" data-aos="fade-up">
          <span className="eyebrow">Sub-brand · 08</span>
          <h2 className="section-title">
            Meet <em>Osciva</em> —<br />
            AI that earns its <em>keep.</em>
          </h2>
          <p className="lede" style={{ marginTop: 24, color: 'rgba(245,242,234,0.72)' }}>
            Osciva is Adyatech's dedicated AI practice. We build agents, RAG systems, document workflows, voice bots and AI co-pilots that solve specific business problems — and we measure the ROI.
          </p>
          <ul className="osciva__features">
            {[
              'Document-grounded RAG systems for legal, finance, and healthcare',
              'Multi-step agents that actually finish a workflow, not just chat',
              'Voice AI for inbound/outbound calls — Hindi, Kannada, English, Telugu',
              'Fine-tuned models on private data, deployed on your infra',
            ].map((feat, i) => (
              <li key={i}>
                <span className="feat-num">/{String(i + 1).padStart(2, '0')}</span>
                <span>{feat}</span>
              </li>
            ))}
          </ul>
          <div className="osciva__cta">
            <a href="https://osciva.io" className="btn btn--red">Visit Osciva.io <span className="arrow">↗</span></a>
            <a href="/contact" className="btn btn--ghost-d">Book an AI strategy call</a>
          </div>
        </div>
        <div className="osciva__visual" data-aos="fade-up" data-aos-delay="200" aria-hidden="true">
          <div className="osciva-orb"></div>
        </div>
      </div>
    </section>
  )
}

const metrics = [
  { target: 400, unit: '+', label: '/01 — Clients served', body: 'Building web, software, AI, mobile, and SaaS products that power modern businesses.' },
  { target: 16, unit: 'yrs', label: '/02 — In business', body: 'Founded 2010 in Ballari. Profitable, bootstrapped, and not chasing the next funding round.' },
  { target: 98, unit: '%', label: '/03 — Client retention', body: 'Most clients stay with us 18+ months. We\'re the team they keep on speed-dial.' },
  { target: 600, unit: '+', label: '/04 — Projects delivered', body: 'Proudly based in Ballari, serving businesses across India and beyond.' },
]

export function Impact() {
  const refs = useRef<(HTMLSpanElement | null)[]>([])

  useEffect(() => {
    const animate = (el: HTMLSpanElement, target: number) => {
      const duration = 1800
      const start = performance.now()
      const tick = (now: number) => {
        const p = Math.min((now - start) / duration, 1)
        const eased = 1 - Math.pow(1 - p, 3)
        el.textContent = String(Math.floor(eased * target))
        if (p < 1) requestAnimationFrame(tick)
        else el.textContent = String(target)
      }
      requestAnimationFrame(tick)
    }

    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          const el = e.target as HTMLSpanElement
          const target = parseInt(el.dataset.target || '0', 10)
          animate(el, target)
          obs.unobserve(el)
        }
      })
    }, { threshold: 0.5 })

    refs.current.forEach(r => { if (r) obs.observe(r) })
    return () => obs.disconnect()
  }, [])

  return (
    <section className="impact">
      <div className="container">
        <div className="impact__head">
          <span className="eyebrow">By the numbers · 09</span>
          <h2 className="section-title">Sixteen years. <em>Real outcomes.</em></h2>
        </div>
      </div>
      <div className="impact__grid">
        {metrics.map((m, i) => (
          <div key={i} className="metric" data-aos="fade-up" data-aos-delay={i * 100}>
            <div className="metric__num">
              <span ref={el => { refs.current[i] = el }} data-target={m.target}>0</span>
              {m.unit && <span className="unit">{m.unit}</span>}
            </div>
            <div className="metric__label">{m.label}</div>
            <p>{m.body}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

export function GovtBand() {
  return (
    <section className="govt-band" id="government">
      <div className="container govt-band__inner">
        <div className="govt-seal" data-aos="zoom-in">
          <div className="govt-seal__inner">
            <div className="govt-seal__top">★ Trusted Vendor ★</div>
            <div className="govt-seal__title">Government of <em>Karnataka</em></div>
            <p className="govt-seal__sub">For digital, web, and software development services since 2021</p>
          </div>
        </div>
        <div className="govt-band__copy" data-aos="fade-up" data-aos-delay="100">
          <span className="eyebrow">Government & enterprise · 10</span>
          <h2>Trusted by the <em>public sector</em><br />and 400+ enterprises.</h2>
          <p>
            Trusted by the <strong>Government of Karnataka</strong>, we've successfully delivered digital platforms, enterprise applications, and citizen-facing solutions for state and district-level departments. Our commitment to security, performance, and long-term maintainability has earned the confidence of both public sector organizations and private enterprises.
          </p>
          <ul className="govt-list">
            {[
              'Trusted by Government of Karnataka departments',
              'Secure web portals & enterprise software',
              'Multilingual interfaces (Kannada, English, Hindi)',
              'Mobile-first and responsive applications',
              'Cloud & on-premise deployment',
              'Complete source code ownership for clients',
            ].map(item => <li key={item}>{item}</li>)}
          </ul>
          <div style={{ marginTop: 32, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <a href="#govt-projects" className="btn btn--ghost-l">Government project case studies <span className="arrow">↗</span></a>
            <a href="#enterprise" className="btn btn--ghost-l">Enterprise capabilities deck</a>
          </div>
        </div>
      </div>
    </section>
  )
}

const techItems = [
  { name: 'Joomla 5/6', cat: 'CMS' }, { name: 'Next.js', cat: 'Frontend' },
  { name: 'Laravel', cat: 'Backend' }, { name: 'Node.js', cat: 'Backend' },
  { name: 'Python', cat: 'AI / ML' }, { name: 'Flutter', cat: 'Mobile' },
  { name: 'React Native', cat: 'Mobile' }, { name: 'Claude API', cat: 'AI' },
  { name: 'OpenAI', cat: 'AI' }, { name: 'PostgreSQL', cat: 'Database' },
  { name: 'MongoDB', cat: 'Database' }, { name: 'Redis', cat: 'Cache' },
  { name: 'AWS', cat: 'Cloud' }, { name: 'Docker', cat: 'DevOps' },
  { name: 'Figma', cat: 'Design' }, { name: 'Linear', cat: 'PM' },
]

export function TechStack() {
  return (
    <section className="stack theme-light">
      <div className="container">
        <div className="stack__head" data-aos="fade-up">
          <span className="eyebrow">Stack · 11</span>
          <h2 className="section-title">Tools we <em>actually</em> use.</h2>
          <p className="lede" style={{ margin: '24px auto 0' }}>
            We pick the boring, battle-tested tool over the hype tool — most of the time. We pick the hype tool when it's measurably better. We tell you which is which.
          </p>
        </div>
        <div className="stack__grid">
          {techItems.map((t, i) => (
            <div key={t.name} className="tech-item" data-aos="fade-up" data-aos-delay={(i + 1) * 50}>
              <div className="tech-item__name">{t.name}</div>
              <div className="tech-item__cat">{t.cat}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
