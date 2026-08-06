'use client'

import { useState, useRef, useEffect } from 'react'
import UtilityBar from '../../components/UtilityBar'
import Header from '../../components/Header'
import { Footer } from '../../components/Sections4'
import TechMatrix from '../../components/TechMatrix'

const faqs = [
  { q: 'Does it really work in Kannada and Hindi, or just English?', a: 'It really works in Indic languages — that\'s our edge. Off-the-shelf speech recognition drops sharply on Kannada, Hindi, and code-mixed speech ("doctor available hai kya tomorrow?"). We tune the speech model on your actual call recordings, which is how we take accuracy from the low 70s into the high 80s on real conversations.' },
  { q: 'What happens on a complex or emotional call?', a: 'It hands off to a human — cleanly. A small intent classifier decides early whether a call is routine (book, cancel, simple question) or needs a person. Anything sensitive, ambiguous, or out-of-scope is transferred to a live agent with the full conversation context, so the caller never has to repeat themselves.' },
  { q: 'Will callers feel like they\'re talking to a robot?', a: 'Less than you\'d expect, and we optimise for usable over "natural." Stressed callers — most people phoning a hospital or service line — actually prefer a clear, structured flow that confirms each step. The agent asks one thing at a time and confirms aggressively. It books the appointment; that\'s what they wanted.' },
  { q: 'Is call data handled compliantly?', a: 'Yes. We capture consent at the start of the call, log only what\'s needed, and purge on a defined retention schedule in line with India\'s DPDP Act. Recordings and transcripts are access-controlled. Compliance is built into the flow, not bolted on after.' },
]

export default function VoiceAIPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0)
  const heroRef = useRef<HTMLElement>(null)
  const auraRef = useRef<HTMLDivElement>(null)

  // Glow cursor effect
  useEffect(() => {
    const hero = heroRef.current
    const aura = auraRef.current
    if (!hero || !aura || window.innerWidth < 768) return

    // Brand colour stops the aura cycles through
    const C1 = [[232, 181, 71], [31, 78, 92], [240, 140, 60]]  // inner: gold, teal, amber
    const C2 = [[31, 78, 92], [232, 181, 71], [120, 40, 10]]    // outer: teal, gold, deep

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
      <main style={{ ['--svc-accent' as string]: 'rgba(31,78,92,0.42)', ['--svc-accent-solid' as string]: '#E8B547' }}>

        <section className="svc-hero" ref={heroRef}>
          <div className="svc-hero__aura" ref={auraRef} aria-hidden="true"></div>
          <div className="svc-hero__bg"></div>
          <div className="svc-hero__grid-lines"></div>
          <div className="container">
            <div className="svc-hero__inner">
              <div className="svc-hero__breadcrumb">
                <a href="/">Home</a><span className="sep">/</span>
                <a href="/services">Services</a><span className="sep">/</span>
                <span>Voice AI</span>
              </div>
              <div className="svc-hero__band"><span className="dot"></span>AI · Osciva · 07</div>
              <h1>Voice AI that actually works <em>in Indic languages</em>.</h1>
              <p className="svc-hero__lede">Inbound and outbound voice agents fluent in Kannada, Hindi, Telugu, and English — including the code-mixed speech off-the-shelf models choke on. They book, cancel, answer, and hand off to a human cleanly.</p>
              <div className="svc-hero__actions">
                <a href="/quote" className="btn btn--red btn--lg">Request a quote <span className="arrow">↗</span></a>
                <a href="/portfolio" className="btn btn--ghost-d btn--lg">See our work</a>
              </div>
              <div className="svc-hero__stats">
                <div className="svc-hero__stat"><strong>60<span className="accent">%</span></strong><span>Calls handled end-to-end</span></div>
                <div className="svc-hero__stat"><strong>&lt;2<span className="accent">s</span></strong><span>Response latency</span></div>
                <div className="svc-hero__stat"><strong>4.7<span className="accent">/5</span></strong><span>Caller satisfaction</span></div>
              </div>
            </div>
          </div>
        </section>

        <section className="svc-intro">
          <div className="container">
            <div className="svc-intro__grid">
              <div className="svc-intro__label">What this actually means</div>
              <div className="svc-intro__body">
                <p>A busy phone line is lost revenue. Callers who can't get through to book, ask, or buy simply call someone else.</p>
                <p>A voice agent answers every call instantly, in the caller's own language. It verifies who they are, checks availability, books or cancels, confirms by SMS, and answers routine questions — <strong>handing off to a human</strong> the moment a call needs one. No hold music, no missed calls at peak hours.</p>
                <p>The hard part is doing this in Kannada, Hindi, and code-mixed speech — where generic models fall apart. That's exactly where we've built and shipped, including a system now handling <em>60% of bookings</em> for a four-hospital network.</p>
              </div>
            </div>
          </div>
        </section>

        {/* SIGNATURE: language panel + call flow */}
        <section className="svc-sec svc-sec--ink">
          <div className="container">
            <div className="svc-sec__head">
              <span className="svc-sec__eyebrow">Languages &amp; the call flow</span>
              <h2 className="svc-sec__title">Fluent where it <em>matters</em>.</h2>
              <p className="svc-sec__intro">Tuned on real call recordings — including the mix of languages people actually speak on the phone.</p>
            </div>
            <div className="lang-grid">
              <div className="lang-chip"><div className="lang-chip__native">ಕನ್ನಡ</div><div className="lang-chip__name">Kannada</div><div className="lang-chip__note">Custom-tuned STT</div></div>
              <div className="lang-chip"><div className="lang-chip__native">हिन्दी</div><div className="lang-chip__name">Hindi</div><div className="lang-chip__note">Custom-tuned STT</div></div>
              <div className="lang-chip"><div className="lang-chip__native">తెలుగు</div><div className="lang-chip__name">Telugu</div><div className="lang-chip__note">Supported</div></div>
              <div className="lang-chip"><div className="lang-chip__native">English</div><div className="lang-chip__name">+ Code-mixed</div><div className="lang-chip__note">The real-world mix</div></div>
            </div>
            <div className="call-flow">
              <div className="call-step"><div className="call-step__n">01</div><h4>Answer &amp; verify</h4><p>Picks up instantly, greets in-language, confirms who's calling.</p></div>
              <div className="call-step"><div className="call-step__n">02</div><h4>Understand</h4><p>Classifies intent — book, cancel, question, or needs a human.</p></div>
              <div className="call-step"><div className="call-step__n">03</div><h4>Act</h4><p>Checks availability, books or cancels, confirms by SMS.</p></div>
              <div className="call-step"><div className="call-step__n">04</div><h4>Hand off</h4><p>Anything complex goes to a live agent with full context.</p></div>
            </div>
          </div>
        </section>

        <section className="svc-sec svc-sec--coal">
          <div className="container">
            <div className="svc-sec__head">
              <span className="svc-sec__eyebrow">What we build</span>
              <h2 className="svc-sec__title">A line that <em>never rings busy</em>.</h2>
            </div>
            <div className="svc-deliver-grid">
              <div className="svc-deliver"><div className="svc-deliver__num">01</div><h3>Indic-language STT</h3><p>Speech recognition tuned on your calls — Kannada, Hindi, Telugu, English.</p></div>
              <div className="svc-deliver"><div className="svc-deliver__num">02</div><h3>Booking &amp; actions</h3><p>End-to-end booking, cancellation, and confirmation without a human.</p></div>
              <div className="svc-deliver"><div className="svc-deliver__num">03</div><h3>Clean handoff</h3><p>Transfers to a live agent with full conversation context attached.</p></div>
              <div className="svc-deliver"><div className="svc-deliver__num">04</div><h3>Telephony</h3><p>Plugs into your phone numbers and lines via Twilio and similar.</p></div>
              <div className="svc-deliver"><div className="svc-deliver__num">05</div><h3>Low latency</h3><p>Under-2-second responses with filler audio so it never feels frozen.</p></div>
              <div className="svc-deliver"><div className="svc-deliver__num">06</div><h3>DPDP-compliant</h3><p>Consent capture, scoped logging, and a clear retention schedule.</p></div>
            </div>
          </div>
        </section>

        <TechMatrix
          variant="ink"
          eyebrow="Tools we use"
          title={<>Deep where it counts. <em>Fluent</em> everywhere else.</>}
          deep={<><p>Our edge is <strong>Indic-language speech</strong> — tuning STT and TTS on real call data so Kannada, Hindi, and code-mixed speech actually work. That tuning is the whole game in voice.</p></>}
          agnostic={<p><strong>Telephony- and vendor-flexible.</strong> Twilio, Exotel, Plivo, or your existing PBX; whichever speech and model providers hit your latency and language needs. We fit your phone setup, not the other way round.</p>}
          categories={[
            { label: 'Telephony', tags: [{name:'Twilio',core:true},{name:'Exotel'},{name:'Plivo'},{name:'SIP / PBX'},{name:'WebRTC'}] },
            { label: 'Speech-to-text', tags: [{name:'Deepgram',core:true},{name:'Custom STT',core:true},{name:'Whisper'},{name:'Google STT'},{name:'Sarvam'}] },
            { label: 'Text-to-speech', tags: [{name:'ElevenLabs',core:true},{name:'Azure TTS'},{name:'Google TTS'},{name:'Indic voices'}] },
            { label: 'Models', tags: [{name:'Claude',core:true},{name:'GPT-4 / 5'},{name:'Intent classifier'},{name:'Open weights'}] },
            { label: 'Backend', tags: [{name:'Node.js'},{name:'Python'},{name:'Redis'},{name:'PostgreSQL'},{name:'WebSockets'}] },
            { label: 'Compliance', tags: [{name:'DPDP',core:true},{name:'Consent capture'},{name:'Scoped logging'},{name:'Retention policy'}] },
          ]}
        />

        <section className="svc-sec svc-sec--coal">
          <div className="container">
            <div className="svc-proof">
              <div>
                <div className="svc-proof__eyebrow">Proof · Healthcare</div>
                <blockquote>A multilingual voice agent now handles <em>60% of inbound bookings</em> across a four-hospital network — in Kannada, Hindi, and English.</blockquote>
                <div className="svc-proof__cite"><strong>Helio Health</strong> · Voice booking platform</div>
              </div>
              <a href="/portfolio/helio-health-voice-booking" className="btn btn--gold svc-proof__link">View the case study →</a>
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
              <a href="/services/ai-agents" className="svc-related"><div className="svc-related__band">AI · Osciva</div><h3>AI Agents &amp; <em>Automation</em></h3><p>The same intelligence, working across chat, email, and your tools.</p><span className="svc-related__arrow">Explore →</span></a>
              <a href="/services/rag-knowledge-systems" className="svc-related"><div className="svc-related__band">AI · Osciva</div><h3>RAG &amp; <em>Knowledge</em></h3><p>Ground voice answers in your real policies and knowledge base.</p><span className="svc-related__arrow">Explore →</span></a>
              <a href="/services/api-integrations" className="svc-related"><div className="svc-related__band">Grow</div><h3>API &amp; <em>Integrations</em></h3><p>Wire the voice agent into your CRM, calendar, and booking systems.</p><span className="svc-related__arrow">Explore →</span></a>
            </div>
          </div>
        </section>

        <section className="bigcta" id="contact">
          <div className="container bigcta__inner">
            <h2>Phone line always <br /><em>ringing busy?</em></h2>
            <p className="bigcta__sub">Tell us your call volume and the languages your callers speak. We'll come back with whether voice AI fits — and what it could handle — within one business day.</p>
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
