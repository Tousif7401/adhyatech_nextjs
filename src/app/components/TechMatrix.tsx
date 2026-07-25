// Reusable categorized tech matrix for service pages.
// Lead with depth, then show breadth + tech-agnostic messaging.

interface TechMatrixProps {
  variant: 'ink' | 'coal'
  eyebrow: string
  title: React.ReactNode
  deep: React.ReactNode          // "we go deep on X" paragraph
  agnostic: React.ReactNode      // tech-agnostic reassurance
  categories: { label: string; tags: { name: string; core?: boolean }[] }[]
}

export default function TechMatrix({ variant, eyebrow, title, deep, agnostic, categories }: TechMatrixProps) {
  return (
    <section className={`svc-sec svc-sec--${variant}`}>
      <div className="container">
        <div className="svc-sec__head">
          <span className="svc-sec__eyebrow">{eyebrow}</span>
          <h2 className="svc-sec__title">{title}</h2>
        </div>
        <div className="tech-matrix__lead">
          <div className="tech-matrix__deep">{deep}</div>
          <div className="tech-matrix__agnostic">{agnostic}</div>
        </div>
        <div className="tech-matrix__grid">
          {categories.map(cat => (
            <div key={cat.label} className="tech-cat">
              <div className="tech-cat__label">
                <h4>{cat.label}</h4>
                <span className="n">{cat.tags.length}</span>
              </div>
              <div className="tech-cat__tags">
                {cat.tags.map(t => (
                  <span key={t.name} className={t.core ? 'is-core' : ''}>{t.name}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
