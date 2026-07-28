'use client'

import Link from 'next/link'
import type { ReactNode } from 'react'
import { useEffect, useState } from 'react'
import UtilityBar from '@/app/components/UtilityBar'
import Header from '@/app/components/Header'
import { Footer } from '@/app/components/Sections4'

export interface LegalSection {
  id: string
  heading: string
  /** Final copy. Omit to render the dashed placeholder note. */
  body?: ReactNode
  /** Shown inside the placeholder when body is absent. */
  placeholder?: string
}

interface LegalPageProps {
  title: string
  subtitle: string
  lastUpdated?: string        // e.g. "12 July 2026" — defaults to a [DATE] token
  intro: string
  sections: LegalSection[]
}

export default function LegalPage({
  title,
  subtitle,
  lastUpdated = '[DATE]',
  intro,
  sections,
}: LegalPageProps) {
  const [activeSection, setActiveSection] = useState<string>('')

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      {
        rootMargin: '-20% 0px -70% 0px',
        threshold: 0
      }
    )

    sections.forEach((section) => {
      const element = document.getElementById(section.id)
      if (element) {
        observer.observe(element)
      }
    })

    return () => observer.disconnect()
  }, [sections])

  return (
    <>
      <UtilityBar />
      <Header />
      <main>
        <section className="legal-hero">
          <div className="legal-hero__mesh" aria-hidden="true">
            <div className="legal-hero__mesh-blob"></div>
            <div className="legal-hero__mesh-blob"></div>
          </div>
          <div className="container">
            <Link href="/" className="legal-hero__back">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 12H5M12 19l-7-7 7-7"/>
              </svg>
              Back
            </Link>
            <div className="legal-hero__crumb">
              <Link href="/">Home</Link> / {title}
            </div>
            <h1>{title}</h1>
            <div className="legal-hero__updated">
              Last updated <b>{lastUpdated}</b> · Adyatech Solutions LLP
            </div>
          </div>
        </section>

        <div className="container">
          <div className="legal-wrap">
            <nav className="legal-toc">
              <div className="legal-toc__label">On this page</div>
              {sections.map((s) => (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  className={activeSection === s.id ? 'is-active' : ''}
                >
                  {s.heading}
                </a>
              ))}
            </nav>

            <div className="legal-body">
              <p style={{ fontSize: 18, color: 'rgba(245,242,234,.85)' }}>{intro}</p>

              {sections.map((s) => (
                <section key={s.id}>
                  <h2 id={s.id}>{s.heading}</h2>
                  {s.body ?? (
                    <div className="legal-placeholder">
                      — {s.placeholder} —
                      <br />
                      Add your finalised content here. This section is scaffolded and
                      styled; only the text is pending.
                    </div>
                  )}
                </section>
              ))}

              <div className="legal-note">
                Questions about this policy? Write to{' '}
                <a href="mailto:hello@adyatech.com">hello@adyatech.com</a> or Adyatech
                Solutions LLP, Ballari, Karnataka, India — 583101.
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
