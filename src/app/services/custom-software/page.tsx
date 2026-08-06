'use client'

import { useState, useRef, useEffect } from 'react'
import UtilityBar from '../../components/UtilityBar'
import Header from '../../components/Header'
import { Footer } from '../../components/Sections4'
import TechMatrix from '../../components/TechMatrix'

const faqs = [
  { q: 'Why is your quote often lower than the last one we got?', a: 'Because we don\'t pad timelines, we don\'t need a 10-person team to ship a 2-person project, and we measure success in working software — not slide decks. A senior pod of two or three people, working in tight sprints, gets more done than a large team with layers of coordination overhead.' },
  { q: 'What does "first usable build in 4–6 weeks" actually mean?', a: 'It means a real, working slice of the software running on staging that you can click through and react to — not a mockup, not a prototype that gets thrown away. We build the core workflow first, get it in your hands, then expand. You\'re never waiting six months to see something real.' },
  { q: 'Do we own the code?', a: 'Completely. Full source-code handover with documentation is standard. No lock-in, no per-seat licensing on your own software, no holding the repository hostage. It\'s yours.' },
  { q: 'What about security and compliance?', a: 'Role-based access, audit logs, and encryption-at-rest are built in by default. For regulated work — fintech, healthcare — we build to the relevant standard (we\'ve shipped SOC 2-ready and HIPAA-aware systems) and document it for your auditors.' },
]

export default function CustomSoftwarePage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0)
  const heroRef = useRef<HTMLElement>(null)
  const auraRef = useRef<HTMLDivElement>(null)

  // Glow cursor effect
  useEffect(() => {
    const hero = heroRef.current
    const aura = auraRef.current
    if (!hero || !aura || window.innerWidth < 768) return

    // Brand colour stops the aura cycles through
    const C1 = [[232, 181, 71], [208, 0, 0], [240, 140, 60]]  // inner: gold, red, amber
    const C2 = [[208, 0, 0], [232, 181, 71], [120, 40, 10]]    // outer: red, gold, deep

    let tx = 50, ty = 50, mx = 50, my = 50, phase = 0, lastMove = Date.now()

    function lerp(a: number, b: number, f: number): number {
      return a + (b - a) * f
    }

    function mix(arr: number[][], p: number): number[] {
      const n = arr.length
      const i = Math.floor(p) % n
      const j = (i + 1) % n
      const f = p - Math.floor(p)
      return [
        Math.round(lerp(arr[i][0], arr[j][0], f)),
        Math.round(lerp(arr[i][1], arr[j][1], f)),
        Math.round(lerp(arr[i][2], arr[j][2], f))
      ]
    }

    const onMove = (e: MouseEvent) => {
      const rect = hero.getBoundingClientRect()
      tx = ((e.clientX - rect.left) / rect.width) * 100
      ty = ((e.clientY - rect.top) / rect.height) * 100
      lastMove = Date.now()
    }

    function loop() {
      if (!aura) return

      mx += (tx - mx) * 0.12
      my += (ty - my) * 0.12

      const moving = Date.now() - lastMove < 120
      phase += moving ? 0.012 : 0.004

      const c1 = mix(C1, phase)
      const c2 = mix(C2, phase * 0.8 + 0.3)

      aura.style.setProperty('--mx', mx.toFixed(1) + '%')
      aura.style.setProperty('--my', my.toFixed(1) + '%')
      aura.style.setProperty('--c1', c1.join(','))
      aura.style.setProperty('--c2', c2.join(','))

      requestAnimationFrame(loop)
    }

    hero.addEventListener('mousemove', onMove)
    const rafId = requestAnimationFrame(loop)

    return () => {
      hero.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <>
      <UtilityBar />
      <Header />
      <main style={{ ['--svc-accent' as string]: 'rgba(208,0,0,0.16)', ['--svc-accent-solid' as string]: '#E8B547' }}>

        <section className="svc-hero" ref={heroRef}>
          <div className="svc-hero__aura" ref={auraRef} aria-hidden="true"></div>
          <div className="svc-hero__bg"></div>
          <div className="svc-hero__grid-lines"></div>
          <div className="container">
            <div className="svc-hero__inner">
              <div className="svc-hero__breadcrumb">
                <a href="/">Home</a><span className="sep">/</span>
                <a href="/services">Services</a><span className="sep">/</span>
                <span>Custom Software</span>
              </div>
              <div className="svc-hero__band"><span className="dot"></span>Build · 02</div>
              <h1>Working software in <em>weeks</em>. Not slide decks in months.</h1>
              <p className="svc-hero__lede">ERPs, CRMs, dashboards, internal tools, integration platforms. We pair a designer with two engineers and ship the first usable build in 4–6 weeks — then expand from something real.</p>
              <div className="svc-hero__actions">
                <a href="/quote" className="btn btn--red btn--lg">Request a quote <span className="arrow">↗</span></a>
                <a href="/portfolio" className="btn btn--ghost-d btn--lg">See our work</a>
              </div>
              <div className="svc-hero__stats">
                <div className="svc-hero__stat"><strong>4–6<span className="accent"> wks</span></strong><span>To first usable build</span></div>
                <div className="svc-hero__stat"><strong>2<span className="accent">-wk</span></strong><span>Sprints, Friday demos</span></div>
                <div className="svc-hero__stat"><strong>100<span className="accent">%</span></strong><span>Source-code handover</span></div>
              </div>
            </div>
          </div>
        </section>

        <section className="svc-intro">
          <div className="container">
            <div className="svc-intro__grid">
              <div className="svc-intro__label">What this actually means</div>
              <div className="svc-intro__body">
                <p>Most custom software projects fail the same way: months of requirements documents, a big-bang delivery, and software nobody wanted by the time it arrives.</p>
                <p>We work the opposite way. A small senior pod builds the <strong>core workflow first</strong> and gets it running on staging within 4–6 weeks. You click through real software, react to it, and we adjust. Two-week sprints, a demo every Friday, no surprises.</p>
                <p>It's faster, cheaper, and far less risky — because you're never more than a phase away from a working product, and you can change direction whenever reality demands it.</p>
              </div>
            </div>
          </div>
        </section>

        {/* SIGNATURE: sprint timeline */}
        <section className="svc-sec svc-sec--ink">
          <div className="container">
            <div className="svc-sec__head">
              <span className="svc-sec__eyebrow">The first six weeks</span>
              <h2 className="svc-sec__title">From kickoff to <em>real software</em>.</h2>
              <p className="svc-sec__intro">Here's what actually happens in a typical engagement's opening phase — the part that determines whether a project succeeds.</p>
            </div>
            <div className="sprint-timeline">
              <div className="sprint-week">
                <div className="sprint-week__when"><strong>Wk 1</strong>Discovery</div>
                <div><h4>Map the real workflow</h4><p>We sit with the people who'll actually use this. What's the job to be done? Where does the current process break? We leave with a prioritised build plan, not a 40-page spec.</p></div>
              </div>
              <div className="sprint-week">
                <div className="sprint-week__when"><strong>Wk 2</strong>Design</div>
                <div><h4>Design the core screens</h4><p>The two or three screens where the real work happens, designed and approved. Data model sketched. Architecture decided. You see exactly what's coming.</p></div>
              </div>
              <div className="sprint-week">
                <div className="sprint-week__when"><strong>Wk 3–4</strong>Sprint 1</div>
                <div><h4>Build the core loop</h4><p>The single most important workflow, built end-to-end and running on staging. Friday demo. You click through real software for the first time.</p></div>
              </div>
              <div className="sprint-week">
                <div className="sprint-week__when"><strong>Wk 5–6</strong>Sprint 2</div>
                <div><h4>Expand &amp; harden</h4><p>Second workflow, auth and permissions, the rough edges smoothed. By now you have a usable product and a clear picture of the road ahead.</p></div>
              </div>
            </div>
          </div>
        </section>

        <section className="svc-sec svc-sec--coal">
          <div className="container">
            <div className="svc-sec__head">
              <span className="svc-sec__eyebrow">What's included</span>
              <h2 className="svc-sec__title">Built like it'll <em>run for years</em>.</h2>
            </div>
            <div className="svc-deliver-grid">
              <div className="svc-deliver"><div className="svc-deliver__num">01</div><h3>Two-week sprints</h3><p>Predictable cadence with a working demo every Friday. No black-box months.</p></div>
              <div className="svc-deliver"><div className="svc-deliver__num">02</div><h3>Role-based access</h3><p>Granular permissions, audit logs, and encryption-at-rest as defaults.</p></div>
              <div className="svc-deliver"><div className="svc-deliver__num">03</div><h3>CI/CD pipelines</h3><p>Automated testing and deployment so releases are boring and safe.</p></div>
              <div className="svc-deliver"><div className="svc-deliver__num">04</div><h3>Real documentation</h3><p>Architecture notes, API docs, and runbooks your team can actually use.</p></div>
              <div className="svc-deliver"><div className="svc-deliver__num">05</div><h3>Source handover</h3><p>The complete codebase is yours. No lock-in, no licensing on your own software.</p></div>
              <div className="svc-deliver"><div className="svc-deliver__num">06</div><h3>Integrations</h3><p>Payments, messaging, third-party APIs — wired in with proper error handling.</p></div>
            </div>
          </div>
        </section>

        <TechMatrix
          variant="ink"
          eyebrow="Tools we use"
          title={<>Deep where it counts. <em>Fluent</em> everywhere else.</>}
          deep={<><p>We reach for <strong>Laravel, Node, and Python</strong> most often because we know them cold and they ship fast. That fluency is why our 4–6 week timelines are real, not optimistic.</p></>}
          agnostic={<p><strong>But the stack serves the project, not the other way round.</strong> Already on .NET, Go, or Rails? Need a specific database or cloud? We'll work in your world — and tell you honestly if a different choice would serve you better.</p>}
          categories={[
            { label: 'Backend', tags: [{name:'Laravel',core:true},{name:'Node.js',core:true},{name:'Python',core:true},{name:'Django'},{name:'FastAPI'},{name:'.NET'},{name:'Go'},{name:'Rails'}] },
            { label: 'Frontend', tags: [{name:'React',core:true},{name:'Next.js'},{name:'Vue'},{name:'Inertia'},{name:'Livewire'},{name:'TypeScript'}] },
            { label: 'Databases', tags: [{name:'PostgreSQL',core:true},{name:'MySQL'},{name:'MongoDB'},{name:'Redis'},{name:'Elasticsearch'},{name:'ClickHouse'}] },
            { label: 'Cloud & Infra', tags: [{name:'AWS',core:true},{name:'GCP'},{name:'Azure'},{name:'Docker'},{name:'Kubernetes'},{name:'Terraform'}] },
            { label: 'Integration', tags: [{name:'REST'},{name:'GraphQL'},{name:'gRPC'},{name:'Webhooks'},{name:'Message queues'},{name:'Kafka'}] },
            { label: 'Quality', tags: [{name:'CI/CD',core:true},{name:'Automated testing'},{name:'Audit logging'},{name:'SOC 2-ready'},{name:'HIPAA-aware'}] },
          ]}
        />

        <section className="svc-sec svc-sec--coal">
          <div className="container">
            <div className="svc-proof">
              <div>
                <div className="svc-proof__eyebrow">Proof · Logistics</div>
                <blockquote>"They delivered our ERP in 16 weeks — the previous vendor had spent 9 months and shipped <em>nothing usable</em>."</blockquote>
                <div className="svc-proof__cite"><strong>Logiwave India</strong> · Verified Google Review</div>
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
              <a href="/services/saas-development" className="svc-related"><div className="svc-related__band">Products</div><h3>SaaS <em>Development</em></h3><p>From validated MVP to multi-tenant scale. We run our own, too.</p><span className="svc-related__arrow">Explore →</span></a>
              <a href="/services/api-integrations" className="svc-related"><div className="svc-related__band">Grow</div><h3>API &amp; <em>Integrations</em></h3><p>The connective tissue — payments, messaging, third-party services.</p><span className="svc-related__arrow">Explore →</span></a>
              <a href="/services/cloud-devops" className="svc-related"><div className="svc-related__band">Grow</div><h3>Cloud &amp; <em>DevOps</em></h3><p>Deployment, CI/CD, monitoring, and maintenance that keeps it healthy.</p><span className="svc-related__arrow">Explore →</span></a>
            </div>
          </div>
        </section>

        <section className="bigcta" id="contact">
          <div className="container bigcta__inner">
            <h2>Got a process that <br /><em>software could fix?</em></h2>
            <p className="bigcta__sub">Tell us what's slow, manual, or held together with spreadsheets. We'll come back with a real scope and a 4–6 week plan within one business day.</p>
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
