'use client'

interface PageHeroProps {
  breadcrumb: { label: string; href?: string }[]
  title: React.ReactNode
  lede: React.ReactNode
}

export default function PageHero({ breadcrumb, title, lede }: PageHeroProps) {
  return (
    <section className="page-hero">
      <div className="page-hero__mesh" aria-hidden="true">
        <div className="page-hero__mesh-blob"></div>
        <div className="page-hero__mesh-blob"></div>
      </div>
      <div className="container">
        <div className="page-hero__inner">
          <div className="page-hero__breadcrumb">
            {breadcrumb.map((b, i) => (
              <span key={i}>
                {b.href ? <a href={b.href}>{b.label}</a> : <span>{b.label}</span>}
                {i < breadcrumb.length - 1 && <span className="sep">/</span>}
              </span>
            ))}
          </div>
          <h1>{title}</h1>
          <p className="page-hero__lede">{lede}</p>
        </div>
      </div>
    </section>
  )
}
