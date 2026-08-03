import UtilityBar from '../components/UtilityBar'
import Header from '../components/Header'
import { Footer, BigCTA, Testimonials } from '../components/Sections4'
import Link from "next/link";
import PhoneMockupBasic from "@/components/phone-mockups-1";

import { getFeaturedTestimonials } from "../../lib/testimonials";

import type { Metadata } from "next";
import { getSeo } from "../../lib/seo";

const storageUrl = process.env.NEXT_PUBLIC_STORAGE_URL;

export async function generateMetadata(): Promise<Metadata> {
  try {
    const seo = await getSeo("alumnyo");

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

const alumnyoFeatures = [
  { num: '/01', title: 'Alumni Directory & Profiles', body: 'Searchable, filterable, with privacy controls graduates actually trust. Auto-deduplication, batch imports, custom fields.' },
  { num: '/02', title: 'Events & Reunions', body: 'Ticketing, RSVPs, check-ins, dietary preferences. Annual reunions that finally scale beyond a Google Form.' },
  { num: '/03', title: 'Donations & Fundraising', body: 'Built-in Razorpay + Stripe gateway. Recurring giving, donor wall, transparent reporting, 80G receipts auto-generated.' },
  { num: '/04', title: 'Job Board & Mentorship', body: 'Alumni hire alumni. Mentor matching that takes 90 seconds, not a committee. Direct messaging built-in.' },
  { num: '/05', title: 'Newsletter & Comms', body: 'Segmented broadcasts, event invites, announcement campaigns. Native templates, no third-party ESP needed.' },
  { num: '/06', title: 'Mobile App', body: 'Native iOS & Android apps so your graduates engage from the palm of their hand. Push notifications wired in.' },
  { num: '/07', title: 'Analytics Dashboard', body: 'Engagement, donations, mentorships, event attendance — every metric your principal asks for, exportable to PDF.' },
  { num: '/08', title: 'Payment Gateways', body: 'Razorpay, Stripe, PayU integrated. Handle Indian and international donations with reconciliation that just works.' },
  { num: '/09', title: 'White-label Branding', body: 'Your colours, your logo, your domain. Alumnyo runs at alumni.yourcollege.edu — invisible to your graduates.' },
]

const alumnyoPricing = [
  {
    tier: 'Starter',
    price: '₹49,000',
    period: '/ year',
    desc: 'For colleges with under 5,000 alumni. Get a full alumni portal live in 2 weeks.',
    features: [
      'Up to 5,000 alumni profiles',
      'Events & reunions module',
      'Donations module',
      'Newsletter (10,000 sends/month)',
      'Mobile app (iOS + Android)',
      'Email support',
      'Hosted on Alumnyo cloud',
    ],
    cta: 'Start free trial',
    popular: false,
  },
  {
    tier: 'Institution',
    price: '₹1,49,000',
    period: '/ year',
    desc: 'For colleges & universities with 5,000–50,000 alumni. All modules unlocked.',
    features: [
      'Up to 50,000 alumni profiles',
      'All modules included',
      'Job board & mentorship',
      'Custom fields & segments',
      'Newsletter (unlimited sends)',
      'White-label branding',
      'Priority email + phone support',
      'Custom domain (alumni.yourcollege.edu)',
    ],
    cta: 'Book a demo',
    popular: true,
  },
  {
    tier: 'University',
    price: 'Custom',
    period: '',
    desc: 'For multi-college universities and large alumni networks (50,000+). On-premise deployment available.',
    features: [
      'Unlimited alumni profiles',
      'Multi-campus support',
      'SSO with your IdP',
      'On-premise / private cloud deployment',
      'Custom modules on request',
      'Dedicated success manager',
      'Quarterly review meetings',
      'SLA-backed uptime',
    ],
    cta: 'Talk to us',
    popular: false,
  },
]

const liveCustomers = [
  { num: '10+', label: 'Powerful Modules' },
  { num: '24×7', label: 'Cloud Accessibility' },
  { num: '100%', label: 'Secure Data Management' },
  { num: '5 Min', label: 'Quick Member Search' },
  { num: '∞', label: 'Unlimited Alumni Growth' },
]

export default async function AlumnyoPage() {
  
  const testimonials = await getFeaturedTestimonials();
  
  return (
    <>
      <UtilityBar />
      <Header />
      <main>
        <section className="product-hero is-alumnyo" style={{ paddingBottom: '100px' }}>
          <div className="product-hero__mesh">
            <div className="product-hero__mesh-blob"></div>
            <div className="product-hero__mesh-blob"></div>
          </div>
          <div className="container">
            <div className="product-hero__inner">
              <div>
                <span className="product-hero__pill">Flagship SaaS · Live</span>
                <h1>Where college <em>alumni networks</em> actually thrive.</h1>
                <p>
                  Alumnyo is our SaaS platform built for colleges and universities — replacing scattered spreadsheets, dead Facebook groups, and clunky portals with one beautiful, mobile-first home for your graduate community.
                </p>
                <div className="product-hero__cta">
                  <Link href="#pricing" className="btn btn--red">See pricing <span className="arrow">↗</span></Link>
                  <a href="https://alumnyo.com" className="btn btn--ghost-d" target="_blank">Visit alumnyo.com</a>
                </div>
              </div>
              <div data-aos="fade-up" data-aos-delay="200">
                <PhoneMockupBasic />
              </div>
            </div>
          </div>
        </section>

        {/* Live Customers Strip */}
        <section className="legacy-band">
          <div className="container legacy-band__inner">
            {liveCustomers.map((c, i) => (
              <div key={i} className="legacy-item">
                <div className="legacy-item__num" style={{ fontSize: 'clamp(1.4rem,2.2vw,2rem)' }}>{c.num}</div>
                <div className="legacy-item__text">
                  <strong>{c.label}</strong>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Features */}
        <section className="feature-grid-section is-dark">
          <div className="container">
            <div className="feature-grid-head">
              <span className="eyebrow">Modules · 01</span>
              <h2 className="section-title">Nine modules. <em>One platform.</em></h2>
              <p className="lede" style={{ margin: '24px auto 0' }}>
                Replace 5–8 different tools your alumni office is stitching together today. Alumnyo is the one home for everything.
              </p>
            </div>
            <div className="feature-grid">
              {alumnyoFeatures.map(f => (
                <article key={f.num}>
                  <div className="feature-grid__num">{f.num}</div>
                  <h3>{f.title}</h3>
                  <p>{f.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section className="pricing-section" id="pricing">
          <div className="container">
            <div className="pricing-head">
              <span className="eyebrow">Pricing · 02</span>
              <h2 className="section-title">Simple, <em>predictable</em> pricing.</h2>
              <p className="lede" style={{ margin: '24px auto 0', color: 'rgba(19,19,25,0.62)' }}>
                One annual fee. No per-alumnus pricing tricks. Unlimited admin users. Free upgrades.
              </p>
            </div>
            <div className="pricing-grid">
              {alumnyoPricing.map(p => (
                <div key={p.tier} className={`pricing-card${p.popular ? ' is-popular' : ''}`}>
                  <div className="pricing-tier">{p.tier}</div>
                  <div className="pricing-price">{p.price}{p.period && <span className="period">{p.period}</span>}</div>
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

        <Testimonials testimonials={testimonials}/>
        <BigCTA />
      </main>
      <Footer />
      <Link href="/contact" className="fab">Let's talk →</Link>
    </>
  )
}
