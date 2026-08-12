'use client'

import { useEffect, useState } from 'react'
import Link from "next/link";

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [theme, setTheme] = useState('dark')
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem('adyatech-theme')
    if (stored) {
      setTheme(stored)
      document.documentElement.setAttribute('data-theme', stored)
    }
    const handleScroll = () => setScrolled(window.pageYOffset > 40)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark'
    setTheme(next)
    document.documentElement.setAttribute('data-theme', next)
    localStorage.setItem('adyatech-theme', next)
  }

  const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    // If it's a same-page anchor only
    if (href.startsWith('#')) {
      e.preventDefault()
      const target = document.querySelector(href)
      if (target) {
        window.scrollTo({ top: (target as HTMLElement).offsetTop - 80, behavior: 'smooth' })
      }
    }
    setMenuOpen(false)
  }

  return (
    <header className={`header${scrolled ? ' is-scrolled' : ''}`} id="siteHeader">
      <div className="container header__inner">
        <Link href="/" className="logo" aria-label="Adyatech Solutions home" style={{ marginLeft: '10px' }}>
          <img className="logo__img logo__img--light" src={`${process.env.NEXT_PUBLIC_BASE_PATH || ""}/assets/logo/adyatech-logo-light.png`} alt="Adyatech Solutions LLP" />

        </Link>

        <nav className="nav" aria-label="Main">
          <ul className="nav__list">
            <li className="nav__item">
              <Link className="nav__link" href="/portfolio">Portfolio</Link>
            </li>

            {/* Services Mega-menu */}
            <li className="nav__item nav__item--mega">
              <Link className="nav__link" href="/services">Services <span className="caret">▾</span></Link>
              <div className="dropdown dropdown--mega">
                <div className="mega__col">
                  <Link href="/services#build" className="mega__head">Build</Link>
                  <Link href="/services/web-development" className="mega__item"><strong>Web Development</strong><span>Joomla, Next.js, Laravel, headless</span></Link>
                  <Link href="/services/custom-software" className="mega__item"><strong>Custom Software</strong><span>ERPs, CRMs, enterprise apps</span></Link>
                  <Link href="/services/mobile-apps" className="mega__item"><strong>Mobile Apps</strong><span>Flutter, React Native, native</span></Link>
                  <Link href="/services/ecommerce" className="mega__item"><strong>E-commerce</strong><span>Razorpay, UPI, WhatsApp, Shiprocket</span></Link>
                </div>
                <div className="mega__col">
                  <Link href="/services#ai" className="mega__head">AI · Osciva</Link>
                  <Link href="/services/ai-agents" className="mega__item"><strong>AI Agents &amp; Automation<span className="osciva-dot"></span></strong><span>Workflow bots, copilots</span></Link>
                  <Link href="/services/rag-knowledge-systems" className="mega__item"><strong>RAG &amp; Knowledge<span className="osciva-dot"></span></strong><span>Chat with your documents</span></Link>
                  <Link href="/services/voice-ai" className="mega__item"><strong>Voice AI<span className="osciva-dot"></span></strong><span>Kannada, Hindi, English bots</span></Link>
                </div>
                <div className="mega__col">
                  <Link href="/services#products" className="mega__head">Products</Link>
                  <Link href="/services/saas-development" className="mega__item"><strong>SaaS Development</strong><span>MVP to multi-tenant scale</span></Link>
                  <Link href="/services/cms-content-platforms" className="mega__item"><strong>CMS &amp; Content</strong><span>Joomla, headless, custom</span></Link>
                  <Link href="/alumnyo" className="mega__item"><strong>Alumnyo</strong><span>Our alumni-management SaaS</span></Link>
                </div>
                <div className="mega__col">
                  <Link href="/services#grow" className="mega__head">Grow</Link>
                  <Link href="/services#api-integrations" className="mega__item"><strong>API &amp; Integrations</strong><span>Payments, WhatsApp, logistics</span></Link>
                  <Link href="/services#cloud-devops" className="mega__item"><strong>Cloud &amp; DevOps</strong><span>Deploy, CI/CD, maintenance</span></Link>
                  <Link href="/services#ui-ux-design" className="mega__item"><strong>UI/UX Design</strong><span>Research, systems, prototypes</span></Link>
                </div>
                <div className="mega__feature">
                  <div className="mega__feature-eyebrow">Not sure which?</div>
                  <h4>Tell us the problem.<br /><em>We'll scope it.</em></h4>
                  <p>Four short steps and a senior engineer comes back with a real estimate within one business day.</p>
                  <Link href="/quote" className="mega__feature-cta">Request a quote →</Link>
                  <Link href="/portfolio" className="mega__feature-proof"><strong>Or see the proof →</strong> 400+ projects shipped</Link>
                </div>
                <div className="mega__footer">
                  <div className="mega__stats">
                    <div className="mega__stat"><strong>16<span className="accent">+</span></strong><span>Years shipping</span></div>
                    <div className="mega__stats-divider"></div>
                    <div className="mega__stat"><strong>400<span className="accent">+</span></strong><span>Projects delivered</span></div>
                    <div className="mega__stats-divider"></div>
                    <div className="mega__stat"><strong>4.9<span className="accent">★</span></strong><span>Avg client rating</span></div>
                    <div className="mega__stats-divider"></div>
                    <div className="mega__stat"><strong>60<span className="accent">+</span></strong><span>Active clients</span></div>
                  </div>
                  <div className="mega__footer-note">
                    <span className="dot"></span>
                    Available for new projects · Q3 2026
                  </div>
                </div>
              </div>
            </li>

            {/* Products Dropdown */}
            <li className="nav__item">
              <Link className="nav__link" href="/#products">Products <span className="caret">▾</span></Link>
              <ul className="dropdown">
                <li><Link href="/osciva">
                  <span className="dropdown__icon">Os</span>
                  <span className="dropdown__text"><strong>Osciva AI</strong><span>Our AI sub-brand · agents, RAG, voice</span></span>
                </Link></li>
                <li><Link href="/alumnyo">
                  <span className="dropdown__icon">Al</span>
                  <span className="dropdown__text"><strong>Alumnyo</strong><span>Alumni management for colleges & universities</span></span>
                </Link></li>
                {/* JoomlaXpress — we will add it later */}
                {/* <li><Link href="/#joomlaxpress">
                  <span className="dropdown__icon">Jx</span>
                  <span className="dropdown__text"><strong>JoomlaXpress</strong><span>Premium Joomla templates & addons</span></span>
                </Link></li> */}
                {/* LeadFlux — we will add it later */}
                {/* <li><Link href="/#leadflux">
                  <span className="dropdown__icon">Lf</span>
                  <span className="dropdown__text"><strong>LeadFlux</strong><span>WhatsApp + web lead capture for SMEs</span></span>
                </Link></li> */}
                <li className="dropdown__divider"></li>
                <li><Link href="/#products" className="dropdown__footer">All products →</Link></li>
              </ul>
            </li>

            <li className="nav__item">
              <Link className="nav__link is-osciva" href="/osciva">Osciva</Link>
            </li>

            {/* About Dropdown */}
            <li className="nav__item">
              <Link className="nav__link" href="/about">About <span className="caret">▾</span></Link>
              <ul className="dropdown">
                <li><Link href="/about#story">
                  <span className="dropdown__icon">01</span>
                  <span className="dropdown__text"><strong>Our Story</strong><span>16 years of building from Ballari</span></span>
                </Link></li>
                <li><Link href="/about#leadership">
                  <span className="dropdown__icon">02</span>
                  <span className="dropdown__text"><strong>Leadership</strong><span>The team that signs every line of code</span></span>
                </Link></li>
                {/* <li><Link href="/#clients">
                  <span className="dropdown__icon">03</span>
                  <span className="dropdown__text"><strong>Clients</strong><span>400+ organisations across 14 countries</span></span>
                </Link></li> */}
                <li><Link href="/government">
                  <span className="dropdown__icon">★</span>
                  <span className="dropdown__text"><strong>Government Projects</strong><span>Karnataka State Govt empanelled vendor</span></span>
                </Link></li>
                <li><Link href="/careers">
                  <span className="dropdown__icon">04</span>
                  <span className="dropdown__text"><strong>Careers</strong><span>We're hiring senior engineers & designers</span></span>
                </Link></li>
              </ul>
            </li>

            <li className="nav__item"><Link className="nav__link" href="/testimonials">Testimonials</Link></li>
            <li className="nav__item"><Link className="nav__link" href="/insights">Insights</Link></li>
            <li className="nav__item"><Link className="nav__link" href="/contact">Contact</Link></li>
          </ul>
        </nav>

        <div className="header__actions">
          {/* <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
            <svg className="icon-moon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
            </svg>
            <svg className="icon-sun" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
            </svg>
          </button> */}
          {/* Desktop CTA — full label */}
<Link href="/quote" className="btn btn--red header__cta-desktop">Start a project <span className="arrow">↗</span></Link>

{/* Mobile CTA — compact, sits beside the burger */}
<Link href="https://wa.me/message/CZWJEKQ556UZI1" className="btn btn--red header__cta-mobile">Chat now</Link>
          <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu" aria-expanded={menuOpen} style={{ marginRight: '10px' }}>
            {menuOpen ? (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            ) : (
              <>
                <span></span><span></span><span></span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div style={{
          position: 'fixed',
          top: '60px',
          left: 0,
          right: 0,
          height: 'calc(100vh - 60px)',
          backgroundColor: 'rgba(8, 8, 12, 0.98)',
          backdropFilter: 'blur(20px) saturate(140%)',
          WebkitBackdropFilter: 'blur(20px) saturate(140%)',
          zIndex: 9999999999,
          padding: '12px var(--gutter) 24px var(--gutter)',
          display: 'flex',
          flexDirection: 'column',
          gap: '4px',
          overflowY: 'auto'
        }}>
          {[
            { label: 'Portfolio', href: '/portfolio' },
            { label: 'Services', href: '/services' },
            { label: 'Osciva', href: '/osciva' },
            { label: 'Alumnyo', href: '/alumnyo' },
            { label: 'About', href: '/about' },
            { label: 'Insights', href: '/insights' },
            { label: 'Testimonials', href: '/testimonials' },
            { label: 'Careers', href: '/careers' },
            { label: 'Contact', href: '/contact' },
            { label: 'Request a quote', href: '/quote' },
          ].map(item => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              style={{
                fontFamily: 'var(--f-display)',
                fontSize: '1.3rem',
                fontWeight: '700',
                color: '#F5F2EA',
                padding: '8px 0',
                borderBottom: '1px solid var(--line-d)',
              }}
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  )
}
