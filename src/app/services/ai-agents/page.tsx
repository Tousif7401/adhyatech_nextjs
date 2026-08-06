'use client'

import { useState, useRef, useEffect } from 'react'
import UtilityBar from '../../components/UtilityBar'
import Header from '../../components/Header'
import { Footer } from '../../components/Sections4'
import TechMatrix from '../../components/TechMatrix'

const faqs = [
  { q: 'How is an "agent" different from a chatbot?', a: 'A chatbot answers questions. An agent completes work. It can read a document, decide what to do, call your tools (CRM, email, database, APIs), take an action, check the result, and escalate to a human when it\'s unsure. We build the second kind — measured by tasks completed and hours saved, not by how chatty it is.' },
  { q: 'Will it make mistakes on important work?', a: 'Every agent we ship has guardrails. High-stakes actions go through a human-in-the-loop approval step; the agent drafts, a person confirms. We log every decision so it\'s auditable, and we tune against a real eval set so accuracy is measured, not assumed. The goal is to remove the boring 80%, not to gamble on the critical 20%.' },
  { q: 'What does it cost to run?', a: 'We design cost in from the start — a cheap classifier routes easy work to small models, and only genuinely hard tasks hit a frontier model. On one project this cut running costs ~70% with no accuracy loss. You get a token-usage dashboard so spend is never a surprise.' },
  { q: 'Which tools can it connect to?', a: 'Most things with an API — CRMs, email, Slack, Google Workspace, databases, your own internal systems, payment and messaging platforms. If it has an API or a webhook, an agent can usually work with it. We map your actual stack during discovery.' },
]

export default function AIAgentsPage() {
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
      <main style={{ ['--svc-accent' as string]: 'rgba(232,181,71,0.2)', ['--svc-accent-solid' as string]: '#E8B547' }}>

        <section className="svc-hero" ref={heroRef}>
          <div className="svc-hero__aura" ref={auraRef} aria-hidden="true"></div>
          <div className="svc-hero__bg"></div>
          <div className="svc-hero__grid-lines"></div>
          <div className="container">
            <div className="svc-hero__inner">
              <div className="svc-hero__breadcrumb">
                <a href="/">Home</a><span className="sep">/</span>
                <a href="/services">Services</a><span className="sep">/</span>
                <span>AI Agents &amp; Automation</span>
              </div>
              <div className="svc-hero__band"><span className="dot"></span>AI · Osciva · 05</div>
              <h1>AI that completes the work <em>not just chats</em> about it.</h1>
              <p className="svc-hero__lede">Workflow agents, internal copilots, and document automation that take real tasks off your team's plate. Built under our AI sub-brand Osciva, and measured in hours saved — not tokens spent.</p>
              <div className="svc-hero__actions">
                <a href="/quote" className="btn btn--red btn--lg">Request a quote <span className="arrow">↗</span></a>
                <a href="/portfolio" className="btn btn--ghost-d btn--lg">See our work</a>
              </div>
              <div className="svc-hero__stats">
                <div className="svc-hero__stat"><strong>~70<span className="accent">%</span></strong><span>Typical cost reduction</span></div>
                <div className="svc-hero__stat"><strong>In prod</strong><span>Fintech · legal · healthcare</span></div>
                <div className="svc-hero__stat"><strong>Human<span className="accent">-in-loop</span></strong><span>On every critical action</span></div>
              </div>
            </div>
          </div>
        </section>

        <section className="svc-intro">
          <div className="container">
            <div className="svc-intro__grid">
              <div className="svc-intro__label">What this actually means</div>
              <div className="svc-intro__body">
                <p>Most "AI" pitches stop at a chatbot that answers questions. The real value is further on — software that does the work a person would otherwise do by hand.</p>
                <p>An agent reads the incoming email, pulls the right record, drafts the reply in your house style, updates the CRM, and flags the one case in twenty that genuinely needs a human. It works across your tools, follows your rules, and <strong>escalates when it's unsure</strong> instead of guessing.</p>
                <p>We're past the demo stage. Our agents run in production for fintech, legal, and healthcare clients — and we judge them the way you would: by the hours they give back and the errors they prevent, <em>not</em> by how clever they sound.</p>
              </div>
            </div>
          </div>
        </section>

        {/* SIGNATURE: before/after workflow */}
        <section className="svc-sec svc-sec--ink">
          <div className="container">
            <div className="svc-sec__head">
              <span className="svc-sec__eyebrow">What automation looks like</span>
              <h2 className="svc-sec__title">The same job. <em>A fraction of the time.</em></h2>
              <p className="svc-sec__intro">A real example: handling an inbound support-and-billing query, before and after we put an agent on it.</p>
            </div>
            <div className="ba-flow">
              <div className="ba-col ba-col--before">
                <div className="ba-col__tag">Before · manual</div>
                <div className="ba-row"><span className="ba-row__dot"></span>Read &amp; classify the email<span className="ba-row__time">4 min</span></div>
                <div className="ba-row"><span className="ba-row__dot"></span>Look up the customer record<span className="ba-row__time">3 min</span></div>
                <div className="ba-row"><span className="ba-row__dot"></span>Check billing &amp; history<span className="ba-row__time">6 min</span></div>
                <div className="ba-row"><span className="ba-row__dot"></span>Draft a reply<span className="ba-row__time">8 min</span></div>
                <div className="ba-row"><span className="ba-row__dot"></span>Update the CRM<span className="ba-row__time">3 min</span></div>
                <div className="ba-result"><strong>24 min</strong><span>per query · per agent</span></div>
              </div>
              <div className="ba-arrow">→</div>
              <div className="ba-col ba-col--after">
                <div className="ba-col__tag">After · agent + human review</div>
                <div className="ba-row"><span className="ba-row__dot"></span>Agent classifies &amp; pulls all context<span className="ba-row__time">3 sec</span></div>
                <div className="ba-row"><span className="ba-row__dot"></span>Agent drafts reply in house style<span className="ba-row__time">5 sec</span></div>
                <div className="ba-row"><span className="ba-row__dot"></span>Agent updates CRM automatically<span className="ba-row__time">1 sec</span></div>
                <div className="ba-row"><span className="ba-row__dot"></span>Human skims &amp; approves<span className="ba-row__time">2 min</span></div>
                <div className="ba-row"><span className="ba-row__dot"></span>Edge cases escalated with context<span className="ba-row__time">auto</span></div>
                <div className="ba-result"><strong>~2 min</strong><span>per query · human stays in control</span></div>
              </div>
            </div>
          </div>
        </section>

        <section className="svc-sec svc-sec--coal">
          <div className="container">
            <div className="svc-sec__head">
              <span className="svc-sec__eyebrow">What we build</span>
              <h2 className="svc-sec__title">Agents with a <em>job description</em>.</h2>
            </div>
            <div className="svc-deliver-grid">
              <div className="svc-deliver"><div className="svc-deliver__num">01</div><h3>Workflow agents</h3><p>Multi-step agents that read, decide, act across your tools, and check their own work.</p></div>
              <div className="svc-deliver"><div className="svc-deliver__num">02</div><h3>Internal copilots</h3><p>Assistants grounded in your data that help staff answer, draft, and decide faster.</p></div>
              <div className="svc-deliver"><div className="svc-deliver__num">03</div><h3>Document processing</h3><p>Extract, classify, summarise, and route documents and email at volume.</p></div>
              <div className="svc-deliver"><div className="svc-deliver__num">04</div><h3>Human-in-the-loop</h3><p>Approval steps on critical actions, so the agent drafts and a person confirms.</p></div>
              <div className="svc-deliver"><div className="svc-deliver__num">05</div><h3>Evals &amp; guardrails</h3><p>Measured accuracy against a real test set, plus rules that keep it on the rails.</p></div>
              <div className="svc-deliver"><div className="svc-deliver__num">06</div><h3>Cost dashboards</h3><p>Token-usage monitoring and smart routing so running costs never surprise you.</p></div>
            </div>
          </div>
        </section>

        <section className="svc-sec svc-sec--ink">
          <div className="container">
            <div className="svc-sec__head">
              <span className="svc-sec__eyebrow">How it runs</span>
              <h2 className="svc-sec__title">From task to <em>autopilot</em>.</h2>
            </div>
            <div className="svc-process">
              <div className="svc-step"><div className="svc-step__dot"></div><div className="svc-step__n">Week 1</div><h4>Find the task</h4><p>We pick one high-volume, rules-based workflow worth automating first.</p></div>
              <div className="svc-step"><div className="svc-step__dot"></div><div className="svc-step__n">Week 2</div><h4>Build the eval</h4><p>Real examples and a scoring set so "good" is defined before we build.</p></div>
              <div className="svc-step"><div className="svc-step__dot"></div><div className="svc-step__n">Weeks 3–5</div><h4>Build &amp; tune</h4><p>The agent, its tools, guardrails, and the human-approval path.</p></div>
              <div className="svc-step"><div className="svc-step__dot"></div><div className="svc-step__n">Live</div><h4>Roll out</h4><p>Ship behind review, watch the dashboard, expand to the next task.</p></div>
            </div>
          </div>
        </section>

        <TechMatrix
          variant="coal"
          eyebrow="Tools we use"
          title={<>Deep where it counts. <em>Fluent</em> everywhere else.</>}
          deep={<><p>We build on <strong>Claude, GPT, and open models</strong> with orchestration that fits the job. Our depth is in shipping agents that survive contact with production — guardrails, evals, and observability included.</p></>}
          agnostic={<p><strong>Model- and vendor-neutral.</strong> Anthropic, OpenAI, Google, or self-hosted open weights — we pick what fits your accuracy, cost, privacy, and latency needs, and we'll happily work inside your existing AI stack.</p>}
          categories={[
            { label: 'Models', tags: [{name:'Claude',core:true},{name:'GPT-4 / 5'},{name:'Gemini'},{name:'Llama'},{name:'Mistral'},{name:'Open weights'}] },
            { label: 'Orchestration', tags: [{name:'LangChain',core:true},{name:'LangGraph'},{name:'LlamaIndex'},{name:'CrewAI'},{name:'Tool use / functions'}] },
            { label: 'Infra & serving', tags: [{name:'Python',core:true},{name:'FastAPI'},{name:'Node.js'},{name:'Docker'},{name:'AWS'},{name:'GCP'},{name:'Modal'}] },
            { label: 'Data & memory', tags: [{name:'PostgreSQL'},{name:'Redis'},{name:'Vector DBs'},{name:'Pinecone'},{name:'Weaviate'}] },
            { label: 'Observability', tags: [{name:'LangSmith',core:true},{name:'Custom evals'},{name:'Token dashboards'},{name:'Tracing'},{name:'Audit logs'}] },
            { label: 'Integrations', tags: [{name:'CRMs'},{name:'Slack'},{name:'Google Workspace'},{name:'Email'},{name:'Webhooks'},{name:'Your APIs'}] },
          ]}
        />

        <section className="svc-sec svc-sec--ink">
          <div className="container">
            <div className="svc-proof">
              <div>
                <div className="svc-proof__eyebrow">Proof · Legal</div>
                <blockquote>"The Osciva team rebuilt our contract review pipeline from scratch. We're now processing 4,000 contracts a day with the <em>same headcount</em>."</blockquote>
                <div className="svc-proof__cite"><strong>Anita Nair</strong> · Managing Partner, Northwind Legal</div>
              </div>
              <a href="/portfolio/northwind-legal-contract-ai" className="btn btn--gold svc-proof__link">View the case study →</a>
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
              <a href="/services/rag-knowledge-systems" className="svc-related"><div className="svc-related__band">AI · Osciva</div><h3>RAG &amp; <em>Knowledge</em></h3><p>Ground your agents in your own documents, accurately and with citations.</p><span className="svc-related__arrow">Explore →</span></a>
              <a href="/services/voice-ai" className="svc-related"><div className="svc-related__band">AI · Osciva</div><h3>Voice <em>AI</em></h3><p>Agents that work over the phone, in Kannada, Hindi, and English.</p><span className="svc-related__arrow">Explore →</span></a>
              <a href="/services/custom-software" className="svc-related"><div className="svc-related__band">Build</div><h3>Custom <em>Software</em></h3><p>The app and dashboards your agents plug into and act through.</p><span className="svc-related__arrow">Explore →</span></a>
            </div>
          </div>
        </section>

        <section className="bigcta" id="contact">
          <div className="container bigcta__inner">
            <h2>Got a task your team <br /><em>does on repeat?</em></h2>
            <p className="bigcta__sub">Tell us the workflow that eats your week. We'll come back with whether an agent can take it — honestly — and a plan, within one business day.</p>
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
