'use client'

import { useState } from 'react'
import UtilityBar from '../../components/UtilityBar'
import Header from '../../components/Header'
import { Footer } from '../../components/Sections4'
import TechMatrix from '../../components/TechMatrix'

const faqs = [
  { q: 'Flutter or native — which do I need?', a: 'For most business apps — content, lists, forms, bookings, dashboards — Flutter gives you iOS and Android from one codebase at 30–50% less cost, and modern Flutter is genuinely fast. We go native (Swift/Kotlin) when you need deep platform integration, AR, heavy real-time media, or every last millisecond of performance. We help you decide honestly; we have no default.' },
  { q: 'Will a Flutter app look cheap?', a: 'Not if it\'s built deliberately. Out of the box, Material defaults on iOS look off — so we don\'t use them. We implement native-feeling components so the app feels right on each platform. Most users of our Flutter apps assume they\'re native.' },
  { q: 'Do you handle App Store and Play Store submission?', a: 'Yes. Signing, provisioning, store listings, review submission, and the inevitable back-and-forth with Apple\'s reviewers — all handled. We\'ve shipped apps to both stores many times and know where the landmines are.' },
  { q: 'What about offline use and poor connectivity?', a: 'Critical for Indian field-ops apps. We build offline-first architectures with background sync, so the app keeps working on patchy 4G and reconciles when the connection returns. Our field-ops app for 1,200 technicians runs this way across 8 states.' },
]

export default function MobileAppsPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0)

  return (
    <>
      <UtilityBar />
      <Header />
      <main style={{ ['--svc-accent' as string]: 'rgba(48,86,128,0.2)', ['--svc-accent-solid' as string]: '#E8B547' }}>

        <section className="svc-hero">
          <div className="svc-hero__bg"></div>
          <div className="svc-hero__grid-lines"></div>
          <div className="container">
            <div className="svc-hero__inner">
              <div className="svc-hero__breadcrumb">
                <a href="/">Home</a><span className="sep">/</span>
                <a href="/services">Services</a><span className="sep">/</span>
                <span>Mobile Apps</span>
              </div>
              <div className="svc-hero__band"><span className="dot"></span>Build · 03</div>
              <h1>Apps that feel <em>native</em> — whichever way we build them.</h1>
              <p className="svc-hero__lede">Cross-platform first with Flutter, native when it earns its keep. Consumer apps, internal field-ops tools, white-label SDKs — shipped to both stores, tuned for real Indian networks.</p>
              <div className="svc-hero__actions">
                <a href="/quote" className="btn btn--red btn--lg">Request a quote <span className="arrow">↗</span></a>
                <a href="/portfolio" className="btn btn--ghost-d btn--lg">See our work</a>
              </div>
              <div className="svc-hero__stats">
                <div className="svc-hero__stat"><strong>18<span className="accent">+</span></strong><span>Apps shipped</span></div>
                <div className="svc-hero__stat"><strong>1,200</strong><span>Daily app users (1 client)</span></div>
                <div className="svc-hero__stat"><strong>28<span className="accent"> days</span></strong><span>Fastest MVP</span></div>
              </div>
            </div>
          </div>
        </section>

        <section className="svc-intro">
          <div className="container">
            <div className="svc-intro__grid">
              <div className="svc-intro__label">What this actually means</div>
              <div className="svc-intro__body">
                <p>Most teams pick a mobile framework based on a Twitter argument. We pick based on your app, your budget, and your team.</p>
                <p>For the kind of apps most businesses need — content, lists, forms, bookings — <strong>Flutter</strong> ships iOS and Android from one codebase, faster and cheaper, and looks indistinguishable from native when built with care. When you need deep platform features, AR, or extreme performance, we go <strong>native</strong>.</p>
                <p>The framework is a means, not the point. The point is an app your users actually keep on their phone — fast, reliable, and working even when the network isn't.</p>
              </div>
            </div>
          </div>
        </section>

        {/* SIGNATURE: comparison */}
        <section className="svc-sec svc-sec--ink">
          <div className="container">
            <div className="svc-sec__head">
              <span className="svc-sec__eyebrow">How we choose</span>
              <h2 className="svc-sec__title">Flutter or <em>native?</em></h2>
              <p className="svc-sec__intro">No dogma. Here's the honest decision we walk every client through.</p>
            </div>
            <div className="compare-grid">
              <div className="compare-col compare-col--accent">
                <h3>Flutter</h3>
                <div className="compare-col__sub">Our default for business apps</div>
                <ul>
                  <li>You need iOS and Android, team is small</li>
                  <li>App is content, lists, forms, CRUD, bookings</li>
                  <li>You want to ship fast on a tighter budget</li>
                  <li>30–50% less cost than two native codebases</li>
                  <li>Modern Flutter does 60fps without breaking a sweat</li>
                </ul>
              </div>
              <div className="compare-col">
                <h3>Native</h3>
                <div className="compare-col__sub">Swift / Kotlin when it's worth it</div>
                <ul>
                  <li>Deep platform integration — widgets, Live Activities</li>
                  <li>AR, RealityKit, platform-specific frameworks</li>
                  <li>Heavy real-time audio/video or games</li>
                  <li>Every last millisecond of performance matters</li>
                  <li>You're genuinely a one-platform company</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="svc-sec svc-sec--coal">
          <div className="container">
            <div className="svc-sec__head">
              <span className="svc-sec__eyebrow">What's included</span>
              <h2 className="svc-sec__title">Store-ready, <em>end to end</em>.</h2>
            </div>
            <div className="svc-deliver-grid">
              <div className="svc-deliver"><div className="svc-deliver__num">01</div><h3>One codebase</h3><p>iOS and Android from a single Flutter codebase — or native where it counts.</p></div>
              <div className="svc-deliver"><div className="svc-deliver__num">02</div><h3>Store submission</h3><p>App Store and Play Store listings, signing, and review — all handled.</p></div>
              <div className="svc-deliver"><div className="svc-deliver__num">03</div><h3>Offline-first</h3><p>Background sync so the app works on patchy 4G and reconciles later.</p></div>
              <div className="svc-deliver"><div className="svc-deliver__num">04</div><h3>Analytics</h3><p>Crashlytics, usage analytics, and A/B testing wired in from day one.</p></div>
              <div className="svc-deliver"><div className="svc-deliver__num">05</div><h3>Native polish</h3><p>Platform-correct components so it never feels like a generic cross-platform app.</p></div>
              <div className="svc-deliver"><div className="svc-deliver__num">06</div><h3>White-label SDKs</h3><p>Reusable SDKs for resellers and partners when your app is also a platform.</p></div>
            </div>
          </div>
        </section>

        <section className="svc-sec svc-sec--ink">
          <div className="container">
            <div className="svc-sec__head">
              <span className="svc-sec__eyebrow">How it runs</span>
              <h2 className="svc-sec__title">Idea to <em>App Store</em>.</h2>
            </div>
            <div className="svc-process">
              <div className="svc-step"><div className="svc-step__dot"></div><div className="svc-step__n">Week 1</div><h4>Scope &amp; decide</h4><p>Define the app, pick Flutter or native, map the core flows.</p></div>
              <div className="svc-step"><div className="svc-step__dot"></div><div className="svc-step__n">Week 2</div><h4>Design</h4><p>Platform-correct screens and a prototype you can hold on a real phone.</p></div>
              <div className="svc-step"><div className="svc-step__dot"></div><div className="svc-step__n">Weeks 3–6</div><h4>Build</h4><p>Sprints with TestFlight / internal-track builds you can use as we go.</p></div>
              <div className="svc-step"><div className="svc-step__dot"></div><div className="svc-step__n">Launch</div><h4>Ship</h4><p>Store submission, review, launch, and post-launch monitoring.</p></div>
            </div>
          </div>
        </section>

        <TechMatrix
          variant="coal"
          eyebrow="Tools we use"
          title={<>Deep where it counts. <em>Fluent</em> everywhere else.</>}
          deep={<><p>We default to <strong>Flutter</strong> for most business apps and go <strong>native</strong> when it earns its keep. That's where our depth is — but the mobile world is wide and we move across it.</p></>}
          agnostic={<p><strong>Your app, your constraints.</strong> Prefer React Native? Need a specific backend, a particular analytics suite, or to plug into an existing codebase? Tell us — we'll work in whatever fits, not just our defaults.</p>}
          categories={[
            { label: 'Cross-platform', tags: [{name:'Flutter',core:true},{name:'Dart',core:true},{name:'React Native'},{name:'Expo'}] },
            { label: 'Native', tags: [{name:'Swift',core:true},{name:'SwiftUI'},{name:'Kotlin',core:true},{name:'Jetpack Compose'}] },
            { label: 'State & data', tags: [{name:'Riverpod',core:true},{name:'Bloc'},{name:'Provider'},{name:'GetX'},{name:'SQLite / Drift'}] },
            { label: 'Backend & sync', tags: [{name:'Firebase',core:true},{name:'Supabase'},{name:'Offline-first'},{name:'REST'},{name:'GraphQL'}] },
            { label: 'Quality & ops', tags: [{name:'Crashlytics'},{name:'Analytics'},{name:'A/B testing'},{name:'TestFlight'},{name:'Fastlane'}] },
            { label: 'Stores', tags: [{name:'App Store'},{name:'Play Store'},{name:'App signing'},{name:'White-label SDKs'}] },
          ]}
        />

        <section className="svc-sec svc-sec--ink">
          <div className="container">
            <div className="svc-proof">
              <div>
                <div className="svc-proof__eyebrow">Proof · Field operations</div>
                <blockquote>An offline-first Flutter app used daily by <em>1,200 technicians</em> across eight states.</blockquote>
                <div className="svc-proof__cite"><strong>Vortek Industries</strong> · Field-ops platform</div>
              </div>
              <a href="/portfolio" className="btn btn--gold svc-proof__link">View the case study →</a>
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
              <a href="/services/custom-software" className="svc-related"><div className="svc-related__band">Build</div><h3>Custom <em>Software</em></h3><p>The backend, dashboard, and admin that powers your app.</p><span className="svc-related__arrow">Explore →</span></a>
              <a href="/services/api-integrations" className="svc-related"><div className="svc-related__band">Grow</div><h3>API &amp; <em>Integrations</em></h3><p>Payments, push, messaging, and third-party services wired in.</p><span className="svc-related__arrow">Explore →</span></a>
              <a href="/services/ui-ux-design" className="svc-related"><div className="svc-related__band">Grow</div><h3>UI/UX <em>Design</em></h3><p>Mobile-first design that feels right on every device.</p><span className="svc-related__arrow">Explore →</span></a>
            </div>
          </div>
        </section>

        <section className="bigcta" id="contact">
          <div className="container bigcta__inner">
            <h2>Got an app <br /><em>in your head?</em></h2>
            <p className="bigcta__sub">Tell us what it does and who it's for. We'll recommend Flutter or native — honestly — and come back with a plan within one business day.</p>
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
