'use client'

import { useState, useRef, useEffect } from 'react'
import UtilityBar from '../../components/UtilityBar'
import Header from '../../components/Header'
import { Footer } from '../../components/Sections4'
import TechMatrix from '../../components/TechMatrix'

const faqs = [
  { q: 'How do we choose between Joomla, headless, and a custom editor?', a: 'It depends on who maintains it and what content lives where. Joomla 5/6 with SP Page Builder Pro wins when non-technical staff need to update pages directly and the site has standard structure. Headless (Sanity, Strapi, Payload) wins when content feeds multiple front-ends — site, app, signage. A custom editor wins only when nothing off-the-shelf fits a specific editorial workflow. We pick on facts, not preferences.' },
  { q: 'Will my team actually be able to update the site?', a: 'That\'s the design goal — not a hope. We model fields and components around how your editors think, not how developers like to structure data. We name things in your language. We hide what they don\'t need. And we run a training session with whoever maintains it, then leave documentation written for that audience. Most clients\' staff are updating the site solo within a week.' },
  { q: 'What about content workflows — drafts, approvals, scheduling?', a: 'Standard. Multi-step approval workflows (editor → reviewer → publisher), scheduled publishing, version history, role-based permissions down to individual fields. Critical for institutions, regulated industries, and any team where multiple people touch content.' },
  { q: 'Can we migrate from our current CMS?', a: 'Almost always, yes. We\'ve migrated sites from WordPress, Drupal, custom-built CMSes, even old static HTML. The work is in mapping your existing content structure to a cleaner one — and preserving URLs so SEO doesn\'t suffer. We do that as part of the build, not as a surprise extra.' },
]

export default function CMSPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0)
  const heroRef = useRef<HTMLElement>(null)
  const auraRef = useRef<HTMLDivElement>(null)

  // Glow cursor effect
  useEffect(() => {
    const hero = heroRef.current
    const aura = auraRef.current
    if (!hero || !aura || window.innerWidth < 768) return

    // Brand colour stops the aura cycles through
    const C1 = [[232, 181, 71], [48, 86, 128], [240, 140, 60]]  // inner: gold, blue, amber
    const C2 = [[48, 86, 128], [232, 181, 71], [120, 40, 10]]    // outer: blue, gold, deep

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
      <main style={{ ['--svc-accent' as string]: 'rgba(244,241,233,0.14)', ['--svc-accent-solid' as string]: '#E8B547' }}>

        <section className="svc-hero" ref={heroRef}>
          <div className="svc-hero__aura" ref={auraRef} aria-hidden="true"></div>
          <div className="svc-hero__bg"></div>
          <div className="svc-hero__grid-lines"></div>
          <div className="container">
            <div className="svc-hero__inner">
              <div className="svc-hero__breadcrumb">
                <a href="/">Home</a><span className="sep">/</span>
                <a href="/services">Services</a><span className="sep">/</span>
                <span>CMS &amp; Content Platforms</span>
              </div>
              <div className="svc-hero__band"><span className="dot"></span>Products · 09</div>
              <h1>A CMS your team can <em>actually run</em>.</h1>
              <p className="svc-hero__lede">Content platforms built around the people who update them — clear editing, sensible permissions, and workflows that survive staff turnover. Joomla, headless, or custom — whichever fits.</p>
              <div className="svc-hero__actions">
                <a href="/quote" className="btn btn--red btn--lg">Request a quote <span className="arrow">↗</span></a>
                <a href="/portfolio" className="btn btn--ghost-d btn--lg">See our work</a>
              </div>
              <div className="svc-hero__stats">
                <div className="svc-hero__stat"><strong>1<span className="accent"> week</span></strong><span>To editor independence</span></div>
                <div className="svc-hero__stat"><strong>4<span className="accent"> langs</span></strong><span>Multilingual ready</span></div>
                <div className="svc-hero__stat"><strong>Decade<span className="accent">+</span></strong><span>Sites still being updated</span></div>
              </div>
            </div>
          </div>
        </section>

        <section className="svc-intro">
          <div className="container">
            <div className="svc-intro__grid">
              <div className="svc-intro__label">What this actually means</div>
              <div className="svc-intro__body">
                <p>Most CMS projects are designed for developers and inflicted on editors. The result: a site that looks great on launch day and slowly rots because nobody on staff can update it.</p>
                <p>We design the other way round. Start from <strong>who actually maintains the site</strong> — their job, their vocabulary, their patience for technical detail (usually none). Build the editing experience around them. Then build everything else.</p>
                <p>The technology under the hood matters far less than this principle. We use <strong>Joomla, headless CMS, or custom editors</strong> depending on fit — but every project optimises for the same metric: <em>is the original owner still updating it three years from now?</em></p>
              </div>
            </div>
          </div>
        </section>

        {/* SIGNATURE: editor vs visitor split */}
        <section className="svc-sec svc-sec--ink">
          <div className="container">
            <div className="svc-sec__head">
              <span className="svc-sec__eyebrow">Two views, one platform</span>
              <h2 className="svc-sec__title">What your <em>team</em> sees. What your <em>visitors</em> see.</h2>
              <p className="svc-sec__intro">The editing experience is engineered as carefully as the public site. Here's what that means in practice.</p>
            </div>
            <div className="editor-split">
              <div className="editor-pane editor-pane--admin">
                <div className="editor-pane__chrome">
                  <span className="dot"></span><span className="dot"></span><span className="dot"></span>
                  <span className="editor-pane__label">Admin · what your team sees</span>
                </div>
                <div className="editor-pane__body">
                  <h4>Edit your homepage</h4>
                  <p className="editor-pane__sub">Fields named in your language. Hide what you don't need.</p>
                  <div className="editor-row"><div className="editor-row__icon">H</div>Hero headline <span className="editor-row__hint">text · required</span></div>
                  <div className="editor-row"><div className="editor-row__icon">P</div>Hero photo <span className="editor-row__hint">image · 1600×900</span></div>
                  <div className="editor-row"><div className="editor-row__icon">B</div>Primary button label <span className="editor-row__hint">text</span></div>
                  <div className="editor-row"><div className="editor-row__icon">S</div>Featured services <span className="editor-row__hint">pick 3</span></div>
                  <div className="editor-row"><div className="editor-row__icon">L</div>Language <span className="editor-row__hint">ಕನ್ನಡ · हिन्दी · EN</span></div>
                  <div className="editor-row"><div className="editor-row__icon">✓</div>Save &amp; Publish <span className="editor-row__hint">draft → live</span></div>
                </div>
              </div>
              <div className="editor-pane">
                <div className="editor-pane__chrome">
                  <span className="dot"></span><span className="dot"></span><span className="dot"></span>
                  <span className="editor-pane__label">Public · what visitors see</span>
                </div>
                <div className="editor-pane__body">
                  <h4>The polished, fast, multilingual site</h4>
                  <p className="editor-pane__sub">Rendered fresh on every publish. SEO-clean. Mobile-first.</p>
                  <div className="editor-row"><div className="editor-row__icon">⚡</div>Loads in under 1.5s <span className="editor-row__hint">global CDN</span></div>
                  <div className="editor-row"><div className="editor-row__icon">📱</div>Mobile-first design <span className="editor-row__hint">tested on real phones</span></div>
                  <div className="editor-row"><div className="editor-row__icon">🌐</div>Multilingual rendering <span className="editor-row__hint">auto by URL</span></div>
                  <div className="editor-row"><div className="editor-row__icon">🔍</div>SEO &amp; schema markup <span className="editor-row__hint">built in</span></div>
                  <div className="editor-row"><div className="editor-row__icon">♿</div>WCAG 2.2 AA <span className="editor-row__hint">accessible</span></div>
                  <div className="editor-row"><div className="editor-row__icon">📊</div>Analytics ready <span className="editor-row__hint">GA4 · plausible</span></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="svc-sec svc-sec--coal">
          <div className="container">
            <div className="svc-sec__head">
              <span className="svc-sec__eyebrow">What's included</span>
              <h2 className="svc-sec__title">Built to <em>last</em>.</h2>
            </div>
            <div className="svc-deliver-grid">
              <div className="svc-deliver"><div className="svc-deliver__num">01</div><h3>Editor-first design</h3><p>Fields, components, and labels designed around how your team actually thinks.</p></div>
              <div className="svc-deliver"><div className="svc-deliver__num">02</div><h3>Workflows &amp; roles</h3><p>Draft → review → publish, with fine-grained permissions down to individual fields.</p></div>
              <div className="svc-deliver"><div className="svc-deliver__num">03</div><h3>Multilingual</h3><p>Kannada, Hindi, Telugu, English — content translated and managed per locale.</p></div>
              <div className="svc-deliver"><div className="svc-deliver__num">04</div><h3>Version history</h3><p>Every edit logged and revertable. No "who changed this and when" mysteries.</p></div>
              <div className="svc-deliver"><div className="svc-deliver__num">05</div><h3>Headless option</h3><p>Content-as-API when you need to feed multiple front-ends — site, app, signage.</p></div>
              <div className="svc-deliver"><div className="svc-deliver__num">06</div><h3>Migration &amp; training</h3><p>Bring your existing content with you; leave with a team that knows how to run it.</p></div>
            </div>
          </div>
        </section>

        <section className="svc-sec svc-sec--ink">
          <div className="container">
            <div className="svc-sec__head">
              <span className="svc-sec__eyebrow">How it runs</span>
              <h2 className="svc-sec__title">From audit to <em>self-sufficient</em>.</h2>
            </div>
            <div className="svc-process">
              <div className="svc-step"><div className="svc-step__dot"></div><div className="svc-step__n">Week 1</div><h4>Editor audit</h4><p>Meet the people who'll maintain this. Map their content model and language.</p></div>
              <div className="svc-step"><div className="svc-step__dot"></div><div className="svc-step__n">Week 2</div><h4>Design &amp; CMS pick</h4><p>Editing experience designed first. Joomla, headless, or custom — chosen on fit.</p></div>
              <div className="svc-step"><div className="svc-step__dot"></div><div className="svc-step__n">Wk 3–6</div><h4>Build &amp; migrate</h4><p>Site, editor, and content migration. Editors test as we go, not at the end.</p></div>
              <div className="svc-step"><div className="svc-step__dot"></div><div className="svc-step__n">Launch</div><h4>Train &amp; hand over</h4><p>Live training session, written docs, and a 30-day support window for questions.</p></div>
            </div>
          </div>
        </section>

        <TechMatrix
          variant="coal"
          eyebrow="Tools we use"
          title={<>Deep where it counts. <em>Fluent</em> everywhere else.</>}
          deep={<><p>Our depth is in <strong>Joomla 5/6 with Helix and SP Page Builder Pro</strong> for content-heavy sites — but we're equally comfortable in headless CMS land when the brief calls for it.</p></>}
          agnostic={<p><strong>Platform-flexible.</strong> Already on WordPress, Drupal, or a custom system? We'll work with what you have or migrate cleanly. The right CMS is the one your editors will actually use for the next five years.</p>}
          categories={[
            { label: 'Traditional CMS', tags: [{name:'Joomla 5/6',core:true},{name:'WordPress'},{name:'Drupal'},{name:'TYPO3'},{name:'Concrete5'}] },
            { label: 'Headless CMS', tags: [{name:'Sanity',core:true},{name:'Strapi'},{name:'Payload'},{name:'Directus'},{name:'Contentful'},{name:'Storyblok'}] },
            { label: 'Page builders', tags: [{name:'SP Page Builder Pro',core:true},{name:'Helix Framework',core:true},{name:'Elementor'},{name:'Gutenberg'}] },
            { label: 'Frontend', tags: [{name:'Next.js'},{name:'Nuxt'},{name:'Astro'},{name:'Remix'},{name:'React'},{name:'Vue'}] },
            { label: 'Workflow', tags: [{name:'Roles &amp; permissions',core:true},{name:'Approval workflows'},{name:'Scheduled publishing'},{name:'Version history'},{name:'i18n / multilingual'}] },
            { label: 'Hosting', tags: [{name:'cPanel'},{name:'VPS'},{name:'AWS'},{name:'Vercel'},{name:'Netlify'},{name:'DigitalOcean'}] },
          ]}
        />

        <section className="svc-sec svc-sec--ink">
          <div className="container">
            <div className="svc-proof">
              <div>
                <div className="svc-proof__eyebrow">Proof · Education</div>
                <blockquote>"Their admin assistant has been updating our site for <em>five years</em> — and we have a developer at the institution. That tells you everything."</blockquote>
                <div className="svc-proof__cite"><strong>Shree Medha Degree College</strong> · Institutional CMS</div>
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
              <a href="/services/web-development" className="svc-related"><div className="svc-related__band">Build</div><h3>Web <em>Development</em></h3><p>The polished public-facing site your CMS powers.</p><span className="svc-related__arrow">Explore →</span></a>
              <a href="/services/ui-ux-design" className="svc-related"><div className="svc-related__band">Grow</div><h3>UI/UX <em>Design</em></h3><p>Design systems for editors as well as visitors — both deserve good UX.</p><span className="svc-related__arrow">Explore →</span></a>
              <a href="/services/api-integrations" className="svc-related"><div className="svc-related__band">Grow</div><h3>API &amp; <em>Integrations</em></h3><p>Content APIs that feed your apps, signage, and partner systems.</p><span className="svc-related__arrow">Explore →</span></a>
            </div>
          </div>
        </section>

        <section className="bigcta" id="contact">
          <div className="container bigcta__inner">
            <h2>Got a CMS your team <br /><em>doesn't actually use?</em></h2>
            <p className="bigcta__sub">Tell us who maintains the site and what they avoid touching. We'll come back with whether a rebuild or rework makes sense — honestly — within one business day.</p>
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
