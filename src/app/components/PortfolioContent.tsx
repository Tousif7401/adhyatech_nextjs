"use client";
import BrowserFrame from '@/app/components/BrowserFrame'
import { useState, useMemo } from 'react'
import { Project } from "@/types/project";
import { PortfolioResponse } from "@/types/project";


function PortfolioCard({ project }: { project: Project }) {
  const href = project.has_case_study
    ? `/portfolio/${project.slug}`
    : project.external_url || '#'
  const isExternal = !project.has_case_study && !!project.external_url
  const linkProps = isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {}

  return (
    <a href={href} className="portfolio-card" {...linkProps}>
      <div className={`portfolio-card__media is-${project.media_tone}`}>
        {project.image ? (
          <BrowserFrame
            image={project.image}
            title={project.title}
            siteUrl={project.external_url}
            isLive={project.is_live}
            ratio="4/3"
          />
        ) : (
          <div className="portfolio-card__icon">{project.icon}</div>
        )}
        {project.badges && project.badges.length > 0 && (
          <div className="portfolio-card__badges">
            {project.badges.map(b => (
              <span key={b} className={`portfolio-card__badge is-${b.toLowerCase()}`}>{b}</span>
            ))}
          </div>
        )}
        {isExternal && (
          <div className="portfolio-card__external" aria-label="External link">↗</div>
        )}
      </div>
      <div className="portfolio-card__body">
        <div className="portfolio-card__cat">{project.category} · {project.year}</div>
        <h3>{project.title}</h3>
        <div className="portfolio-card__client">{project.client}</div>
        <div className="portfolio-card__tags">
          {project.tags.slice(0, 3).map(t => <span key={t}>{t}</span>)}
        </div>
      </div>
    </a>
  )
}

export default function PortfolioContent({
  featured,
  projects,
  categories,
}: PortfolioResponse) {

  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = useMemo(() => {
    if (activeCategory === "All")
      return projects;

    return projects.filter(
      p => p.category === activeCategory
    );
  }, [activeCategory, projects]);

  const counts = categories.reduce((acc, category) => {
    acc[category] =
      category === "All"
        ? projects.length
        : projects.filter(
          p => p.category === category
        ).length;

    return acc;
  }, {} as Record<string, number>);

  const marqueeProjects = [...featured, ...featured]

  return (
    <>
      <section className="featured-marquee-section">
        <div className="container">
          <div className="featured-marquee-head">
            <div>
              <span className="eyebrow">Premium case studies · 01</span>
              <h2>Featured <em>work</em>.</h2>
            </div>
            <p style={{ color: 'rgba(245,242,234,0.6)', fontSize: '0.9rem', maxWidth: '36ch' }}>
              Hover to pause. Click any card to read the full case study with results, approach, and tech stack.
            </p>
          </div>
        </div>
        <div className="featured-marquee">
          {marqueeProjects.map((p, i) => (
            <a
              key={`${p.slug}-${i}`}
              href={p.has_case_study ? `/portfolio/${p.slug}` : p.external_url || '#'}
              className="featured-card"
            >
              <div className={`featured-card__media is-${p.media_tone}`}>
                {p.image ? (
                  <BrowserFrame
                    image={p.image}
                    title={p.title}
                    siteUrl={p.external_url}
                    isLive={p.is_live}
                    ratio="16/10"
                  />
                ) : (
                  <div className="featured-card__icon">{p.icon}</div>
                )}
                {p.badges?.includes('Premium') && (
                  <div className="featured-card__badge">Premium case study</div>
                )}
              </div>
              <div className="featured-card__body">
                <div className="featured-card__category">{p.category} · {p.year}</div>
                <h3>{p.title}</h3>
                <p>{p.summary}</p>
                <div className="featured-card__meta">
                  <span>{p.client}</span>
                  <span className="featured-card__arrow">→</span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </section>

      <section className="portfolio-section" id="all-work">
        <div className="container">
          <div className="industries__head" style={{ marginBottom: 40 }}>
            <span className="eyebrow">All work · 02</span>
            <h2 className="section-title">Browse by <em>category</em>.</h2>
          </div>

          <div className="portfolio-filter">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={activeCategory === cat ? 'is-active' : ''}
              >
                {cat}
                <span className="portfolio-filter__count">({counts[cat] || 0})</span>
              </button>
            ))}
          </div>

          {filtered.length === 0 ? (
            <p style={{ textAlign: 'center', color: 'rgba(245,242,234,0.5)', padding: '60px 0' }}>
              No projects in this category yet. Check back soon.
            </p>
          ) : (
            <div className="portfolio-grid">
              {filtered.map(p => <PortfolioCard key={p.slug} project={p} />)}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
