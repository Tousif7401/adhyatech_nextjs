'use client'

import { useState } from 'react'
import UtilityBar from '../../components/UtilityBar'
import Header from '../../components/Header'
import { Footer } from '../../components/Sections4'
import TechMatrix from '../../components/TechMatrix'
import Link from "next/link";

const faqs = [
  { q: 'Why do you still recommend Joomla in 2026?', a: 'For institutional sites — colleges, government, mid-size businesses — that need to last a decade and be updated by non-technical staff, Joomla 5/6 with Helix and SP Page Builder Pro is genuinely the right tool. It runs on any cPanel host, has built-in multilingual and fine-grained permissions, and doesn\'t break when staff change. We use Next.js and Laravel just as confidently when the brief calls for it.' },
  { q: 'How long does a typical website take?', a: 'A focused marketing site is usually 3–5 weeks. A larger institutional site with 40–80 pages, multilingual content, and custom modules runs 6–10 weeks. We work in capped phases, so you see a usable build early and we both decide whether to continue.' },
  { q: 'Will my team be able to update the site ourselves?', a: 'Yes — that\'s a design goal, not an afterthought. We build the editing experience deliberately, with clear custom modules and a training session for whoever will maintain it. We assume the next editor has never logged in before.' },
  { q: 'Do you handle hosting and maintenance?', a: 'We can. Most clients host on their existing cPanel or VPS, and we offer maintenance retainers covering updates, security patching, backups, and content help. We never recommend infrastructure you can\'t maintain.' },
]

export default function WebDevelopmentPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0)

  return (
    <>
      <UtilityBar />
      <Header />
      <main style={{ ['--svc-accent' as string]: 'rgba(48,86,128,0.22)', ['--svc-accent-solid' as string]: '#E8B547' }}>

        {/* HERO */}
        <section className="svc-hero">
          <div className="svc-hero__bg"></div>
          <div className="svc-hero__grid-lines"></div>
          <div className="container">
            <div className="svc-hero__inner">
              <div className="svc-hero__breadcrumb">
                <a href="/">Home</a><span className="sep">/</span>
                <a href="/services">Services</a><span className="sep">/</span>
                <span>Web Development</span>
              </div>
              <div className="svc-hero__band"><span className="dot"></span>Build · 01</div>
              <h1>Websites that load fast, rank well, and look <em>expensive</em>.</h1>
              <p className="svc-hero__lede">Marketing sites, portals, and multilingual platforms — built on the right stack for the job, not the agency's favourite. We're known for Joomla, but we ship just as confidently on Next.js and Laravel.</p>
              <div className="svc-hero__actions">
                <a href="/quote" className="btn btn--red btn--lg">Request a quote <span className="arrow">↗</span></a>
                <a href="/portfolio" className="btn btn--ghost-d btn--lg">See our work</a>
              </div>
              <div className="svc-hero__stats">
                <div className="svc-hero__stat"><strong>200<span className="accent">+</span></strong><span>Sites shipped</span></div>
                <div className="svc-hero__stat"><strong>90<span className="accent">+</span></strong><span>Core Web Vitals</span></div>
                <div className="svc-hero__stat"><strong>4<span className="accent"> langs</span></strong><span>Multilingual ready</span></div>
              </div>
            </div>
          </div>
        </section>

        {/* INTRO */}
        <section className="svc-intro">
          <div className="container">
            <div className="svc-intro__grid">
              <div className="svc-intro__label">What this actually means</div>
              <div className="svc-intro__body">
                <p>A website is rarely just a website. It's how a buyer decides whether to trust you, how a patient books an appointment, how a manufacturer's distributors place orders, how a startup raises its next round.</p>
                <p>We build for all of it — across <strong>healthcare, manufacturing, retail, finance, education, hospitality, real estate, professional services</strong>, and more. Marketing sites, customer portals, booking systems, multilingual platforms, internal tools with a public face. The brief changes by industry; the standard doesn't.</p>
                <p>What stays constant is the approach: understand who actually uses the site and what they're trying to get done, pick the right technology for <em>that</em> reality, and build something fast, accessible, and genuinely easy to maintain. The result is a site that's still doing its job — and being updated by its owner — years later.</p>
              </div>
            </div>
          </div>
        </section>

        {/* SIGNATURE: stack decision tree */}
        <section className="svc-sec svc-sec--ink">
          <div className="container">
            <div className="svc-sec__head">
              <span className="svc-sec__eyebrow">How we choose your stack</span>
              <h2 className="svc-sec__title">No default. Just an <em>honest</em> decision.</h2>
              <p className="svc-sec__intro">We work across dozens of technologies (see below) — but here's the thinking behind the three we reach for most. The logic is the same whatever your project needs.</p>
            </div>
            <div className="stack-tree">
              <div className="stack-card">
                <div className="stack-card__when">When it needs to last & be self-managed</div>
                <div className="stack-card__tech">Joomla 5/6</div>
                <p>Content-heavy sites that non-technical teams maintain for years. Runs on any host, built-in multilingual and permissions, low total cost of ownership.</p>
                <div className="stack-card__tags"><span>Helix</span><span>SP Page Builder Pro</span><span>cPanel</span></div>
              </div>
              <div className="stack-card">
                <div className="stack-card__when">When it needs speed & interactivity</div>
                <div className="stack-card__tech">Next.js</div>
                <p>Product sites, web apps, anything with rich interactions or tight performance budgets. Static export drops onto your existing hosting.</p>
                <div className="stack-card__tags"><span>React</span><span>Static export</span><span>Headless CMS</span></div>
              </div>
              <div className="stack-card">
                <div className="stack-card__when">When it needs a custom backend</div>
                <div className="stack-card__tech">Laravel</div>
                <p>Content platforms with bespoke logic, dashboards, integrations, or a custom CMS. The workhorse when off-the-shelf won't fit.</p>
                <div className="stack-card__tags"><span>PHP 8</span><span>MySQL</span><span>REST APIs</span></div>
              </div>
            </div>
          </div>
        </section>

        {/* DELIVERABLES */}
        <section className="svc-sec svc-sec--coal">
          <div className="container">
            <div className="svc-sec__head">
              <span className="svc-sec__eyebrow">What's included</span>
              <h2 className="svc-sec__title">Everything a real site <em>needs</em>.</h2>
            </div>
            <div className="svc-deliver-grid">
              <div className="svc-deliver"><div className="svc-deliver__num">01</div><h3>Multilingual</h3><p>Kannada, Hindi, Telugu, English — built in, not bolted on with a plugin.</p></div>
              <div className="svc-deliver"><div className="svc-deliver__num">02</div><h3>Accessibility</h3><p>WCAG 2.2 AA compliance designed in from the start, not retrofitted.</p></div>
              <div className="svc-deliver"><div className="svc-deliver__num">03</div><h3>Performance</h3><p>Core Web Vitals tuned to 90+ — fast on cheap Android phones over patchy 4G.</p></div>
              <div className="svc-deliver"><div className="svc-deliver__num">04</div><h3>SEO-ready</h3><p>Clean architecture, schema markup, and the technical groundwork to rank.</p></div>
              <div className="svc-deliver"><div className="svc-deliver__num">05</div><h3>CMS handover</h3><p>An editing experience your team can actually run, plus a training session.</p></div>
              <div className="svc-deliver"><div className="svc-deliver__num">06</div><h3>Maintenance</h3><p>Optional retainers for updates, security patching, backups, and content help.</p></div>
            </div>
          </div>
        </section>

        {/* PROCESS */}
        <section className="svc-sec svc-sec--ink">
          <div className="container">
            <div className="svc-sec__head">
              <span className="svc-sec__eyebrow">How it runs</span>
              <h2 className="svc-sec__title">From brief to <em>live</em>.</h2>
            </div>
            <div className="svc-process">
              <div className="svc-step"><div className="svc-step__dot"></div><div className="svc-step__n">Week 1</div><h4>Discovery</h4><p>We map your pages, audiences, languages, and who maintains it. Pick the stack.</p></div>
              <div className="svc-step"><div className="svc-step__dot"></div><div className="svc-step__n">Week 2</div><h4>Design</h4><p>Layouts and a design system you approve before a line of code is written.</p></div>
              <div className="svc-step"><div className="svc-step__dot"></div><div className="svc-step__n">Weeks 3–5</div><h4>Build</h4><p>We build section by section with regular previews on a staging URL.</p></div>
              <div className="svc-step"><div className="svc-step__dot"></div><div className="svc-step__n">Launch</div><h4>Handover</h4><p>Go live, train your team, and hand over docs. Optional ongoing support.</p></div>
            </div>
          </div>
        </section>

        <TechMatrix
          variant="coal"
          eyebrow="Tools we use"
          title={<>Deep where it counts. <em>Fluent</em> everywhere else.</>}
          deep={<><p>We've shipped <strong>200+ sites</strong> across nearly every industry, and over the years we've gone genuinely deep on a handful of stacks. That depth — plus knowing when <em>not</em> to use them — is why our builds hold up for years.</p></>}
          agnostic={<p><strong>But we're not a three-stack shop.</strong> Tell us your constraints — or the stack you already run — and we'll work in it. The right tool for your project beats our favourite tool every time.</p>}
          categories={[
            { label: 'Frontend', tags: [{name:'React',core:true},{name:'Next.js',core:true},{name:'Vue'},{name:'Nuxt'},{name:'Angular'},{name:'Svelte'},{name:'Astro'},{name:'Remix'},{name:'TypeScript'},{name:'Tailwind'}] },
            { label: 'Backend', tags: [{name:'Laravel',core:true},{name:'Node.js'},{name:'Python'},{name:'Django'},{name:'Symfony'},{name:'.NET'},{name:'Go'},{name:'Rails'}] },
            { label: 'CMS & Commerce', tags: [{name:'Joomla',core:true},{name:'WordPress'},{name:'Drupal'},{name:'Strapi'},{name:'Sanity'},{name:'Payload'},{name:'Shopify'},{name:'WooCommerce'},{name:'Magento'},{name:'Webflow'}] },
            { label: 'Cloud & DevOps', tags: [{name:'AWS'},{name:'GCP'},{name:'Azure'},{name:'DigitalOcean'},{name:'Docker'},{name:'cPanel'},{name:'Vercel'},{name:'CI/CD'}] },
            { label: 'Data', tags: [{name:'PostgreSQL'},{name:'MySQL'},{name:'MongoDB'},{name:'Redis'},{name:'Firebase'},{name:'Supabase'},{name:'Elasticsearch'}] },
            { label: 'Platform expertise', tags: [{name:'Helix Framework',core:true},{name:'SP Page Builder Pro',core:true},{name:'Headless CMS'},{name:'PWA'},{name:'i18n / Multilingual'},{name:'WCAG / a11y'}] },
          ]}
        />

        {/* PROOF */}
        <section className="svc-sec svc-sec--ink">
          <div className="container">
            <div className="svc-proof">
              <div>
                <div className="svc-proof__eyebrow">Proof · Government</div>
                <blockquote>"They demoed working software in our second meeting. By month three we were <em>live with users</em>."</blockquote>
                <div className="svc-proof__cite"><strong>Vikram Shetty</strong> · Director, Karnataka State e-Gov</div>
              </div>
              <a href="/portfolio" className="btn btn--gold svc-proof__link">View the case study →</a>
            </div>
          </div>
        </section>

        {/* FAQ */}
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

        {/* RELATED */}
        <section className="svc-sec svc-sec--ink">
          <div className="container">
            <div className="svc-sec__head">
              <span className="svc-sec__eyebrow">Related services</span>
              <h2 className="svc-sec__title">Often paired <em>with</em>.</h2>
            </div>
            <div className="svc-related-grid">
              <a href="/services/cms-content-platforms" className="svc-related"><div className="svc-related__band">Products</div><h3>CMS &amp; <em>Content</em></h3><p>Editor-friendly content platforms your team can run for years.</p><span className="svc-related__arrow">Explore →</span></a>
              <a href="/services/ecommerce" className="svc-related"><div className="svc-related__band">Build</div><h3>E-commerce</h3><p>Storefronts wired to Razorpay, UPI, WhatsApp, and Shiprocket.</p><span className="svc-related__arrow">Explore →</span></a>
              <a href="/services/ui-ux-design" className="svc-related"><div className="svc-related__band">Grow</div><h3>UI/UX <em>Design</em></h3><p>Research, design systems, and prototypes that ship cleanly.</p><span className="svc-related__arrow">Explore →</span></a>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bigcta" id="contact">
          <div className="container bigcta__inner">
            <h2>Need a site that <br /><em>actually lasts?</em></h2>
            <p className="bigcta__sub">Tell us what you're building and who maintains it. We'll recommend the right stack — honestly — within one business day.</p>
            <div className="bigcta__actions">
              <a href="/quote" className="btn btn--red btn--lg">Request a quote <span className="arrow">↗</span></a>
              <a href="/contact" className="btn btn--ghost-d btn--lg">Or just send a message</a>
            </div>
          </div>
        </section>

      </main>
      <Footer />
      <Link href="/quote" className="fab">Let's talk →</Link>
    </>
  )
}
