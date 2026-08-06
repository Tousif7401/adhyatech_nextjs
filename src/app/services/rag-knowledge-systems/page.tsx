'use client'

import { useState, useRef, useEffect } from 'react'
import UtilityBar from '../../components/UtilityBar'
import Header from '../../components/Header'
import { Footer } from '../../components/Sections4'
import TechMatrix from '../../components/TechMatrix'

const faqs = [
  { q: 'Isn\'t this just "chat with your PDF"?', a: 'That\'s the afternoon-demo version, and it tops out around 60–70% accuracy — fine for a toy, dangerous for a business. Production RAG needs content-aware chunking, hybrid (semantic + keyword) retrieval, reranking, and a real eval set. That\'s the difference between a demo and a system your team can actually trust.' },
  { q: 'How do you stop it making things up?', a: 'Three ways. It only answers from retrieved source material and cites it, so you can check. It\'s tuned to say "I don\'t know" rather than invent. And every answer is logged against an eval set so we catch accuracy drift before your users do. Honesty about uncertainty is a feature, not a bug.' },
  { q: 'Will it respect who\'s allowed to see what?', a: 'Yes. Retrieval is permission-aware — the system only surfaces content a given user is entitled to see. A frontline agent and a director asking the same question get answers scoped to their access. Critical for legal, finance, and HR knowledge.' },
  { q: 'What happens when our documents change?', a: 'The index updates as your content does, and answers reflect the current source. The system can also flag when it\'s relying on material that looks stale, so nobody acts on an out-of-date policy. Keeping answers fresh is part of the build, not an afterthought.' },
]

export default function RAGPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0)
  const heroRef = useRef<HTMLElement>(null)
  const auraRef = useRef<HTMLDivElement>(null)
  const ladderRef = useRef<HTMLDivElement>(null)

  // Ladder animations
  const [ladderVisible, setLadderVisible] = useState(false)
  const [percentages, setPercentages] = useState([0, 0, 0, 0])
  const targetPercentages = [60, 72, 80, 85]
  const [hoveredRung, setHoveredRung] = useState<number | null>(null)

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

  // Ladder intersection observer and counting animation
  useEffect(() => {
    const ladder = ladderRef.current
    if (!ladder) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setLadderVisible(true)
          }
        })
      },
      { threshold: 0.3 }
    )

    observer.observe(ladder)
    return () => observer.disconnect()
  }, [])

  // Counting animation
  useEffect(() => {
    if (!ladderVisible) return

    const duration = 1500 // 1.5 seconds total animation
    const startTime = Date.now()

    function animate() {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)

      // Easing function for smooth counting
      const easeOut = 1 - Math.pow(1 - progress, 3)

      setPercentages(
        targetPercentages.map((target) => Math.floor(target * easeOut))
      )

      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }

    animate()
  }, [ladderVisible])

  return (
    <>
      <UtilityBar />
      <Header />
      <main style={{ ['--svc-accent' as string]: 'rgba(42,47,54,0.5)', ['--svc-accent-solid' as string]: '#E8B547' }}>

        <section className="svc-hero" ref={heroRef}>
          <div className="svc-hero__aura" ref={auraRef} aria-hidden="true"></div>
          <div className="svc-hero__bg"></div>
          <div className="svc-hero__grid-lines"></div>
          <div className="container">
            <div className="svc-hero__inner">
              <div className="svc-hero__breadcrumb">
                <a href="/">Home</a><span className="sep">/</span>
                <a href="/services">Services</a><span className="sep">/</span>
                <span>RAG &amp; Knowledge Systems</span>
              </div>
              <div className="svc-hero__band"><span className="dot"></span>AI · Osciva · 06</div>
              <h1>Chat with your knowledge <em>and actually trust</em> the answer.</h1>
              <p className="svc-hero__lede">Retrieval systems grounded in your documents, contracts, and policies. Cited, permission-aware, and honest about what they don't know — built to clear the 85%+ accuracy bar real businesses need.</p>
              <div className="svc-hero__actions">
                <a href="/quote" className="btn btn--red btn--lg">Request a quote <span className="arrow">↗</span></a>
                <a href="/portfolio" className="btn btn--ghost-d btn--lg">See our work</a>
              </div>
              <div className="svc-hero__stats">
                <div className="svc-hero__stat"><strong>85<span className="accent">%+</span></strong><span>Production accuracy</span></div>
                <div className="svc-hero__stat"><strong>Cited</strong><span>Every answer, sourced</span></div>
                <div className="svc-hero__stat"><strong>Perm<span className="accent">-aware</span></strong><span>Respects who sees what</span></div>
              </div>
            </div>
          </div>
        </section>

        <section className="svc-intro">
          <div className="container">
            <div className="svc-intro__grid">
              <div className="svc-intro__label">What this actually means</div>
              <div className="svc-intro__body">
                <p>Your organisation already knows the answer to most questions — it's just buried in contracts, wikis, tickets, and PDFs nobody can search properly.</p>
                <p>A retrieval-augmented system puts that knowledge one question away. Ask in plain language; get an answer drawn from <strong>your</strong> material, with citations you can click to verify. It says "I don't know" when the answer isn't there, and only shows each person what they're allowed to see.</p>
                <p>The catch: the afternoon-demo version of this is wrong often enough to be dangerous. Getting from a <em>convincing demo</em> to a <em>trustworthy system</em> is the actual work — and it's the work we've done, repeatedly, in production.</p>
              </div>
            </div>
          </div>
        </section>

        {/* SIGNATURE: accuracy ladder */}
        <section className="svc-sec svc-sec--ink">
          <div className="container">
            <div className="svc-sec__head">
              <span className="svc-sec__eyebrow">Demo vs production</span>
              <h2 className="svc-sec__title">Climbing past the <em>60% ceiling</em>.</h2>
              <p className="svc-sec__intro">Every shortcut tops out where a toy stops being useful. Here's how each technique we add lifts real-world accuracy.</p>
            </div>
            <div className="ladder" ref={ladderRef}>
              <div
                className={`ladder__rung${ladderVisible ? ' is-visible' : ''}${hoveredRung === 0 ? ' is-hovered' : ''}`}
                style={{ transitionDelay: ladderVisible ? '0ms' : '0ms' }}
                onMouseEnter={() => setHoveredRung(0)}
                onMouseLeave={() => setHoveredRung(null)}
              >
                <div className="ladder__pct">{ladderVisible ? `~${percentages[0]}%` : '~0%'}</div>
                <div className="ladder__label"><h4>Naïve "embed &amp; retrieve"</h4><p>Top-K chunks from a vector DB, straight to the model. The afternoon demo.</p></div>
                <div className="ladder__bar"><i style={{ width: `${ladderVisible ? percentages[0] : 0}%` }}></i></div>
              </div>
              <div
                className={`ladder__rung${ladderVisible ? ' is-visible' : ''}${hoveredRung === 1 ? ' is-hovered' : ''}`}
                style={{ transitionDelay: ladderVisible ? '150ms' : '0ms' }}
                onMouseEnter={() => setHoveredRung(1)}
                onMouseLeave={() => setHoveredRung(null)}
              >
                <div className="ladder__pct">{ladderVisible ? `~${percentages[1]}%` : '~0%'}</div>
                <div className="ladder__label"><h4>+ Content-aware chunking</h4><p>Split by clause, table, and section — not blind character counts.</p></div>
                <div className="ladder__bar"><i style={{ width: `${ladderVisible ? percentages[1] : 0}%` }}></i></div>
              </div>
              <div
                className={`ladder__rung${ladderVisible ? ' is-visible' : ''}${hoveredRung === 2 ? ' is-hovered' : ''}`}
                style={{ transitionDelay: ladderVisible ? '300ms' : '0ms' }}
                onMouseEnter={() => setHoveredRung(2)}
                onMouseLeave={() => setHoveredRung(null)}
              >
                <div className="ladder__pct">{ladderVisible ? `~${percentages[2]}%` : '~0%'}</div>
                <div className="ladder__label"><h4>+ Hybrid retrieval</h4><p>Semantic search plus keyword (BM25) so names, dates, and IDs land.</p></div>
                <div className="ladder__bar"><i style={{ width: `${ladderVisible ? percentages[2] : 0}%` }}></i></div>
              </div>
              <div
                className={`ladder__rung ladder__rung--peak${ladderVisible ? ' is-visible' : ''}${hoveredRung === 3 ? ' is-hovered' : ''}`}
                style={{ transitionDelay: ladderVisible ? '450ms' : '0ms' }}
                onMouseEnter={() => setHoveredRung(3)}
                onMouseLeave={() => setHoveredRung(null)}
              >
                <div className="ladder__pct">{ladderVisible ? `${percentages[3]}%+` : '0%+'}</div>
                <div className="ladder__label"><h4>+ Reranking &amp; evals</h4><p>A reranker filters false positives; evals catch drift. Production-grade.</p></div>
                <div className="ladder__bar"><i style={{ width: `${ladderVisible ? percentages[3] : 0}%` }}></i></div>
              </div>
            </div>
          </div>
        </section>

        <section className="svc-sec svc-sec--coal">
          <div className="container">
            <div className="svc-sec__head">
              <span className="svc-sec__eyebrow">What we build</span>
              <h2 className="svc-sec__title">Knowledge you can <em>query</em>.</h2>
            </div>
            <div className="svc-deliver-grid">
              <div className="svc-deliver"><div className="svc-deliver__num">01</div><h3>Grounded answers</h3><p>Responses drawn only from your source material — no free-floating guesses.</p></div>
              <div className="svc-deliver"><div className="svc-deliver__num">02</div><h3>Citations</h3><p>Every answer links back to the exact source, so it's verifiable in one click.</p></div>
              <div className="svc-deliver"><div className="svc-deliver__num">03</div><h3>Hybrid retrieval</h3><p>Semantic + keyword search with reranking for that 85%+ accuracy floor.</p></div>
              <div className="svc-deliver"><div className="svc-deliver__num">04</div><h3>Permission-aware</h3><p>Retrieval scoped to each user's access — no leaking restricted content.</p></div>
              <div className="svc-deliver"><div className="svc-deliver__num">05</div><h3>Eval dashboards</h3><p>Accuracy measured continuously so regressions are caught early.</p></div>
              <div className="svc-deliver"><div className="svc-deliver__num">06</div><h3>Freshness</h3><p>Index updates with your content, with flags when sources look stale.</p></div>
            </div>
          </div>
        </section>

        <TechMatrix
          variant="ink"
          eyebrow="Tools we use"
          title={<>Deep where it counts. <em>Fluent</em> everywhere else.</>}
          deep={<><p>Our depth is in the <strong>retrieval pipeline</strong> — chunking, hybrid search, reranking, and evals. That's where accuracy is won or lost, and it's what separates our systems from a weekend demo.</p></>}
          agnostic={<p><strong>Stack-flexible.</strong> Any model, any vector store, on our cloud or inside your own VPC for data that can't leave. Already invested in a particular database or embedding model? We'll build around it.</p>}
          categories={[
            { label: 'Models', tags: [{name:'Claude',core:true},{name:'GPT-4 / 5'},{name:'Gemini'},{name:'Open weights'}] },
            { label: 'Embeddings', tags: [{name:'OpenAI',core:true},{name:'Cohere'},{name:'Voyage'},{name:'BGE'},{name:'Instructor'}] },
            { label: 'Vector stores', tags: [{name:'Pinecone',core:true},{name:'Weaviate'},{name:'Qdrant'},{name:'pgvector'},{name:'Milvus'}] },
            { label: 'Retrieval', tags: [{name:'Hybrid search',core:true},{name:'BM25'},{name:'Rerankers',core:true},{name:'LlamaIndex'},{name:'LangChain'}] },
            { label: 'Evals', tags: [{name:'RAGAS',core:true},{name:'Custom eval sets'},{name:'LLM-judge'},{name:'Recall@k'},{name:'LangSmith'}] },
            { label: 'Deploy', tags: [{name:'Python'},{name:'FastAPI'},{name:'AWS'},{name:'On-prem / VPC'},{name:'Docker'}] },
          ]}
        />

        <section className="svc-sec svc-sec--coal">
          <div className="container">
            <div className="svc-proof">
              <div>
                <div className="svc-proof__eyebrow">Proof · Banking</div>
                <blockquote>"Adyatech built us a system that doesn't just predict — it tells us <em>why</em>. That changed how our entire team works."</blockquote>
                <div className="svc-proof__cite"><strong>Suresh Krishnamurthy</strong> · Chief Data Officer, Civic Bank</div>
              </div>
              <a href="/portfolio/civic-bank-churn-model" className="btn btn--gold svc-proof__link">View the case study →</a>
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
              <a href="/services/ai-agents" className="svc-related"><div className="svc-related__band">AI · Osciva</div><h3>AI Agents &amp; <em>Automation</em></h3><p>Put your grounded knowledge to work inside agents that take action.</p><span className="svc-related__arrow">Explore →</span></a>
              <a href="/services/voice-ai" className="svc-related"><div className="svc-related__band">AI · Osciva</div><h3>Voice <em>AI</em></h3><p>Answer questions over the phone, grounded in your knowledge base.</p><span className="svc-related__arrow">Explore →</span></a>
              <a href="/services/custom-software" className="svc-related"><div className="svc-related__band">Build</div><h3>Custom <em>Software</em></h3><p>The interface and workflows your knowledge system lives inside.</p><span className="svc-related__arrow">Explore →</span></a>
            </div>
          </div>
        </section>

        <section className="bigcta" id="contact">
          <div className="container bigcta__inner">
            <h2>Knowledge buried <br /><em>where no one can find it?</em></h2>
            <p className="bigcta__sub">Tell us what your team keeps re-asking and re-searching. We'll come back with whether RAG fits — and how we'd hit the accuracy you need — within one business day.</p>
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
