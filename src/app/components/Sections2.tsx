'use client'
import BrowserFrame from '@app/components/BrowserFrame'
import { useMemo, useState } from 'react'
import Link from 'next/link';

import { Service } from "@/types/service";

interface Props {
  services: Service[];
}

export function Services({ services }: Props) {
  return (
    <section className="services" id="services">
      <div className="container">
        <div className="services__head">
          <div data-aos="fade-up">
            <span className="eyebrow">What we do · 03</span>
            <h2 className="section-title">Everything you need.<br />One <em>obsessive</em> standard.</h2>
          </div>
          <div data-aos="fade-up" data-aos-delay="100">
            <p className="lede">
              From websites and custom software to AI agents, mobile apps, SaaS, and commerce — we have a senior pod for it. No subcontractors, no offshore factories, no surprises.
            </p>
          </div>
        </div>

        <div className="services__grid">
          {services.map((svc, i) => (
            <Link key={svc.slug} className="service" href={`/services#${svc.slug}`} id={svc.slug} data-aos="fade-up" data-aos-delay={i % 2 === 1 ? 100 : undefined}>
              <div className="service__num"><span>S/{svc.code}</span><span className="service__arrow">→</span></div>
              {svc.band === 'AI' && <span className="osciva-badge">⚡ Osciva AI</span>}
              <h3>{svc.title} <em>{svc.title_em}</em></h3>
              <p>{svc.short}</p>
              <ul className="service__list">
                {svc.tags.slice(0, 6).map(t => <li key={t}>{t}</li>)}
              </ul>
              {svc.case_study_label && (
                <span className="service__proof">Proof → {svc.case_study_label}</span>
              )}
            </Link>
          ))}
        </div>

        <div className="services__more">
          <Link href="/services" className="btn btn--ghost-d">View all 12 services →</Link>
        </div>
      </div>
    </section>
  )
}

const layouts = [
  { col: "case--feature", visual: "case__visual--slate" },

  { col: "case--side", visual: "case__visual--gold" },
  { col: "case--side", visual: "case__visual--red" },

  { col: "case--half", visual: "case__visual--cream" },
  { col: "case--half", visual: "case__visual--violet" },

  { col: "case--feature", visual: "case__visual--gold" },

  { col: "case--half", visual: "case__visual--slate" },
  { col: "case--side", visual: "case__visual--cream" },

  { col: "case--feature", visual: "case__visual--red" },

  { col: "case--half", visual: "case__visual--gold" },
  { col: "case--side", visual: "case__visual--violet" },

  { col: "case--half", visual: "case__visual--red" },
];

import { Project } from "@/types/project";

interface WorkProps {
  projects: Project[];
}

export function Work({ projects }: WorkProps) {
  const [activeFilter, setActiveFilter] = useState("All");

  // Generate filters dynamically
  const filters = useMemo(
    () => ["All", ...new Set(projects.map((p) => p.category))],
    [projects]
  );

  // Filter projects
  const visible =
    activeFilter === "All"
      ? projects
      : projects.filter((p) => p.category === activeFilter);

  return (
    <section className="work theme-light" id="work">
      <div className="container">
        <div className="work__head">
          <div data-aos="fade-up">
            <span className="eyebrow">
              Selected work · {projects.length}
            </span>

            <h2 className="section-title">
              Sites we shipped.
              <br />
              Numbers we <em>moved</em>.
            </h2>
          </div>

          <div
            className="work__filters"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            {filters.map((filter) => (
              <button
                key={filter}
                className={`work__filter ${activeFilter === filter ? "is-active" : ""
                  }`}
                onClick={() => setActiveFilter(filter)}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        <div className="work__grid">
          {visible.map((project, i) => {
            const layout = layouts[i % layouts.length];

            return (
              <article
                key={project.id}
                className={`case ${layout.col}`}
                data-aos="fade-up"
                data-aos-delay={i % 2 ? 100 : undefined}
              >
                <div className={`case__visual ${layout.visual}`}>
                  <img
                    src={`${process.env.NEXT_PUBLIC_STORAGE_URL}/${project.image}`}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="case__body">
                  <div className="case__meta">
                    <span>{project.client}</span>
                    <span>{project.category}</span>
                    <span>{project.year}</span>
                  </div>

                  <h3>{project.title}</h3>

                  {project.summary && <p>{project.summary}</p>}
                </div>
              </article>
            );
          })}
        </div>

        <div className="work__cta">
          <Link href="/portfolio" className="btn btn--ghost-l btn--lg">
            View all projects <span className="arrow">↗</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

export function Process() {
  const steps = [
    { num: '01', title: 'Discover', body: 'One paid 90-min workshop. We map your goals, users, edge cases, and constraints. You leave with a written brief — even if you don\'t hire us.' },
    { num: '02', title: 'Design', body: 'Wireframes in week one. Clickable prototype in week two. We iterate fast in Figma — you approve before a single line of code is written.' },
    { num: '03', title: 'Build', body: 'Two-week sprints. Weekly demo on Friday. You get a staging URL on day 3, not day 30. We push to production behind feature flags, not launch events.' },
    { num: '04', title: 'Scale', body: 'Launch is a milestone, not the finish line. We stay on for performance, A/B tests, and the next set of features. Most clients stay 18+ months.' },
  ]
  return (
    <section className="process">
      <div className="container">
        <div className="process__head">
          <span className="eyebrow">How we work · 05</span>
          <h2 className="section-title">A process that <em>respects</em> your time.</h2>
          <p className="lede">No 80-page proposals. No three-month "discovery". You'll see real, working software inside 30 days — every single engagement.</p>
        </div>
        <div className="process__steps">
          {steps.map((s, i) => (
            <div key={s.num} className="step" data-aos="fade-up" data-aos-delay={i * 100}>
              <div className="step__num">{s.num}</div>
              <h3>{s.title}</h3>
              <p>{s.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
