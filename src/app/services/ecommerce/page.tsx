'use client'

import { useState } from 'react'
import UtilityBar from '../../components/UtilityBar'
import Header from '../../components/Header'
import { Footer } from '../../components/Sections4'
import TechMatrix from '../../components/TechMatrix'

const faqs = [
  { q: 'Why not just use Shopify?', a: 'Sometimes Shopify is exactly right, and we\'ll tell you so. But for the Indian market, custom or headless commerce often wins: UPI-first checkout, Razorpay/PayU/Cashfree, WhatsApp ordering, GST invoicing, and Shiprocket logistics are first-class instead of bolted on through expensive apps. We build for how India actually buys.' },
  { q: 'How important is UPI really?', a: 'Critical. For most of our commerce clients, UPI is the majority of transactions — far ahead of cards. A checkout that treats UPI as an afterthought loses sales. We make it the primary, frictionless path and treat international cards as the edge case they usually are.' },
  { q: 'Can customers order over WhatsApp?', a: 'Yes — and for many Indian businesses this converts better than a traditional cart. We build WhatsApp Business order and support flows, so customers can browse, ask, and buy in the app they already live in. It pairs well with a standard storefront.' },
  { q: 'Does it work on cheap phones and slow networks?', a: 'That\'s the whole point. We build mobile-first and tune for low-bandwidth — because your customers are on budget Android phones over patchy 4G, not designer laptops. A storefront that only converts on fast connections is leaving money on the table.' },
]

export default function EcommercePage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0)

  return (
    <>
      <UtilityBar />
      <Header />
      <main style={{ ['--svc-accent' as string]: 'rgba(232,181,71,0.18)', ['--svc-accent-solid' as string]: '#E8B547' }}>

        <section className="svc-hero">
          <div className="svc-hero__bg"></div>
          <div className="svc-hero__grid-lines"></div>
          <div className="container">
            <div className="svc-hero__inner">
              <div className="svc-hero__breadcrumb">
                <a href="/">Home</a><span className="sep">/</span>
                <a href="/services">Services</a><span className="sep">/</span>
                <span>E-commerce</span>
              </div>
              <div className="svc-hero__band"><span className="dot"></span>Build · 04</div>
              <h1>Commerce built for how <em>India actually buys</em>.</h1>
              <p className="svc-hero__lede">UPI-first checkout, Razorpay and WhatsApp ordering, Shiprocket logistics, GST invoicing — first-class, not bolted on. Storefronts that convert on cheap phones over patchy 4G.</p>
              <div className="svc-hero__actions">
                <a href="/quote" className="btn btn--red btn--lg">Request a quote <span className="arrow">↗</span></a>
                <a href="/portfolio" className="btn btn--ghost-d btn--lg">See our work</a>
              </div>
              <div className="svc-hero__stats">
                <div className="svc-hero__stat"><strong>UPI<span className="accent">-first</span></strong><span>Checkout by default</span></div>
                <div className="svc-hero__stat"><strong>14</strong><span>Outlets (one client)</span></div>
                <div className="svc-hero__stat"><strong>3<span className="accent"> gateways</span></strong><span>Razorpay, PayU, Cashfree</span></div>
              </div>
            </div>
          </div>
        </section>

        <section className="svc-intro">
          <div className="container">
            <div className="svc-intro__grid">
              <div className="svc-intro__label">What this actually means</div>
              <div className="svc-intro__body">
                <p>Most e-commerce platforms are built for a Western buyer with a credit card on a fast connection. That's not your customer.</p>
                <p>Your customer pays by <strong>UPI</strong>, shops on a budget Android phone, often messages on <strong>WhatsApp</strong> before buying, and expects <strong>GST invoicing</strong> and reliable courier tracking. We build commerce where all of that is first-class — not an expensive afterthought stitched together with plugins.</p>
                <p>The result is a storefront that actually converts in the Indian market, from a single boutique to a multi-outlet chain with real-time order routing.</p>
              </div>
            </div>
          </div>
        </section>

        {/* SIGNATURE: checkout flow */}
        <section className="svc-sec svc-sec--ink">
          <div className="container">
            <div className="svc-sec__head">
              <span className="svc-sec__eyebrow">The checkout we build</span>
              <h2 className="svc-sec__title">A path that <em>converts</em>.</h2>
              <p className="svc-sec__intro">Every step tuned for the Indian buyer — fast, familiar, and frictionless on mobile.</p>
            </div>
            <div className="checkout-flow">
              <div className="flow-step"><div className="flow-step__icon">1</div><h4>Browse</h4><p>Fast, mobile-first catalog that loads on slow networks.</p></div>
              <div className="flow-step"><div className="flow-step__icon">2</div><h4>Cart</h4><p>One-tap add, GST shown upfront, no surprise costs.</p></div>
              <div className="flow-step"><div className="flow-step__icon">3</div><h4>UPI Pay</h4><p>UPI as the primary option — Razorpay, PayU, or Cashfree.</p></div>
              <div className="flow-step"><div className="flow-step__icon">4</div><h4>Confirm</h4><p>Instant WhatsApp + SMS confirmation with invoice.</p></div>
              <div className="flow-step"><div className="flow-step__icon">5</div><h4>Ship</h4><p>Auto-routed to Shiprocket with live tracking.</p></div>
            </div>
          </div>
        </section>

        <section className="svc-sec svc-sec--coal">
          <div className="container">
            <div className="svc-sec__head">
              <span className="svc-sec__eyebrow">What's included</span>
              <h2 className="svc-sec__title">The whole <em>machine</em>.</h2>
            </div>
            <div className="svc-deliver-grid">
              <div className="svc-deliver"><div className="svc-deliver__num">01</div><h3>UPI-first checkout</h3><p>Razorpay, PayU, or Cashfree with UPI as the primary, frictionless path.</p></div>
              <div className="svc-deliver"><div className="svc-deliver__num">02</div><h3>WhatsApp ordering</h3><p>Browse, ask, and buy in the app your customers already use daily.</p></div>
              <div className="svc-deliver"><div className="svc-deliver__num">03</div><h3>Shiprocket logistics</h3><p>Automated courier routing and live tracking baked into the flow.</p></div>
              <div className="svc-deliver"><div className="svc-deliver__num">04</div><h3>GST invoicing</h3><p>Compliant invoices and reconciliation, generated automatically.</p></div>
              <div className="svc-deliver"><div className="svc-deliver__num">05</div><h3>Inventory</h3><p>Stock, variants, and multi-outlet management that stays in sync.</p></div>
              <div className="svc-deliver"><div className="svc-deliver__num">06</div><h3>Mobile-first</h3><p>Tuned for budget Android phones and low-bandwidth networks.</p></div>
            </div>
          </div>
        </section>

        <TechMatrix
          variant="ink"
          eyebrow="Tools we use"
          title={<>Deep where it counts. <em>Fluent</em> everywhere else.</>}
          deep={<><p>Our depth is in <strong>India-ready commerce</strong> — UPI, Razorpay, WhatsApp ordering, GST, Shiprocket. We build these as first-class, not bolted-on plugins.</p></>}
          agnostic={<p><strong>Platform-flexible by design.</strong> Custom Laravel, headless Next.js, or plain Shopify/WooCommerce — we'll recommend what fits your scale and margins, and build it on whatever gateway and logistics partner you prefer.</p>}
          categories={[
            { label: 'Platforms', tags: [{name:'Laravel',core:true},{name:'Next.js',core:true},{name:'Shopify'},{name:'WooCommerce'},{name:'Medusa'},{name:'Headless'}] },
            { label: 'Payments', tags: [{name:'UPI',core:true},{name:'Razorpay',core:true},{name:'PayU'},{name:'Cashfree'},{name:'Stripe'},{name:'PhonePe'}] },
            { label: 'Logistics', tags: [{name:'Shiprocket',core:true},{name:'Delhivery'},{name:'Shipway'},{name:'Live tracking'}] },
            { label: 'Channels', tags: [{name:'WhatsApp API',core:true},{name:'SMS'},{name:'Email'},{name:'Push'},{name:'Instagram Shop'}] },
            { label: 'Compliance', tags: [{name:'GST invoicing',core:true},{name:'E-invoicing'},{name:'Reconciliation'},{name:'TDS'}] },
            { label: 'Performance', tags: [{name:'Mobile-first',core:true},{name:'Low-bandwidth'},{name:'CDN'},{name:'Edge caching'},{name:'PWA'}] },
          ]}
        />

        <section className="svc-sec svc-sec--coal">
          <div className="container">
            <div className="svc-proof">
              <div>
                <div className="svc-proof__eyebrow">Proof · Restaurant chain</div>
                <blockquote>Online ordering for a <em>14-outlet chain</em> with real-time kitchen routing and headless commerce.</blockquote>
                <div className="svc-proof__cite"><strong>Foodaroo</strong> · Multi-outlet ordering platform</div>
              </div>
              <a href="/portfolio" className="btn btn--gold svc-proof__link">View the case study →</a>
            </div>
          </div>
        </section>

        <section className="svc-sec svc-sec--ink">
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

        <section className="svc-sec svc-sec--coal">
          <div className="container">
            <div className="svc-sec__head">
              <span className="svc-sec__eyebrow">Related services</span>
              <h2 className="svc-sec__title">Often paired <em>with</em>.</h2>
            </div>
            <div className="svc-related-grid">
              <a href="/services/web-development" className="svc-related"><div className="svc-related__band">Build</div><h3>Web <em>Development</em></h3><p>The marketing site and brand presence around your store.</p><span className="svc-related__arrow">Explore →</span></a>
              <a href="/services/api-integrations" className="svc-related"><div className="svc-related__band">Grow</div><h3>API &amp; <em>Integrations</em></h3><p>Payments, WhatsApp, logistics, and ERP connectors.</p><span className="svc-related__arrow">Explore →</span></a>
              <a href="/services/mobile-apps" className="svc-related"><div className="svc-related__band">Build</div><h3>Mobile <em>Apps</em></h3><p>A native shopping app to complement the storefront.</p><span className="svc-related__arrow">Explore →</span></a>
            </div>
          </div>
        </section>

        <section className="bigcta" id="contact">
          <div className="container bigcta__inner">
            <h2>Ready to sell <br /><em>the way India buys?</em></h2>
            <p className="bigcta__sub">Tell us what you're selling and where. We'll come back with a storefront plan — UPI, WhatsApp, logistics and all — within one business day.</p>
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
