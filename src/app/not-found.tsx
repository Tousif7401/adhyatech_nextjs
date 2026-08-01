import Link from 'next/link'
import type { Metadata } from 'next'
import UtilityBar from '@/app/components/UtilityBar'
import Header from '@/app/components/Header'
import { Footer } from '@/app/components/Sections4'
import NotFoundGlyph from '@/app/components/NotFoundGlyph'

export const metadata: Metadata = {
  title: 'Page not found — Adyatech Solutions',
}

const PATHS = [
  { href: '/portfolio', label: 'Our work', desc: '400+ projects, 14 countries' },
  { href: '/osciva', label: 'Osciva AI', desc: 'agents, RAG, voice bots' },
  // Government projects - TEMPORARILY DISABLED - Will be uncommented later in future
  // { href: '/government', label: 'Government projects', desc: 'state & zilla panchayat systems' },
  { href: '/contact', label: 'Talk to us', desc: 'start a project' },
]

export default function NotFound() {
  return (
    <>
      <UtilityBar />
      <Header />
      <main className="nf-stage">
        <div className="container nf-grid">
          <div>
            <span className="nf-eyebrow">Error 404 · Page not found</span>
            <h1 className="nf-title">
              This page took<br />
              an <em>early exit.</em>
            </h1>
            <p className="nf-lede">
              The link is broken or the page has moved. Nothing you did wrong —
              let&apos;s get you back to something useful.
            </p>

            <ul className="nf-paths">
              {PATHS.map((p) => (
                <li key={p.href}>
                  <Link href={p.href}>
                    <span className="nf-p-label">
                      {p.label}
                      <span className="nf-p-desc">{p.desc}</span>
                    </span>
                    <span className="nf-arr">&rarr;</span>
                  </Link>
                </li>
              ))}
            </ul>

            <div className="nf-actions">
              <Link href="/" className="btn btn--red">
                Back to home
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7" transform="rotate(-45 12 12)"/>
                </svg>
              </Link>
              <Link href="/contact" className="btn btn--ghost-d">Report a broken link</Link>
            </div>
          </div>

          <div className="nf-viz">
            <NotFoundGlyph />
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
