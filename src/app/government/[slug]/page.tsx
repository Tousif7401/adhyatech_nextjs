import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getGovProject, getGovProjects } from '@/lib/government'

interface Props {
  params: { slug: string }
}

// Pre-render all gov detail pages at build time.
// If you switch to a live API, this still works — it fetches the list to know the slugs.
export async function generateStaticParams() {
  const projects = await getGovProjects()
  return projects.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = await getGovProject(params.slug)
  if (!project) return { title: 'Government Project — Adyatech' }
  return {
    title: `${project.title} — Government Projects — Adyatech`,
    description: project.summary,
  }
}

export default async function GovProjectPage({ params }: Props) {
  const project = await getGovProject(params.slug)
  if (!project) notFound()

  // next project for the footer link (wraps around)
  const all = await getGovProjects()
  const idx = all.findIndex((p) => p.slug === project.slug)
  const next = all[(idx + 1) % all.length]

  const storageUrl = process.env.NEXT_PUBLIC_STORAGE_URL || ''
  const imgSrc = project.image
    ? project.image.startsWith('http')
      ? project.image
      : `${storageUrl}/${project.image}`
    : null

  return (
    <main>
      <article className="cs">
        <header className="cs-hero">
          <div className="container">
            <div className="cs-hero__crumb">
              <Link href="/government">Government Projects</Link> / {project.title}
            </div>
            <div className="cs-meta">
              <span className="cs-meta__tag">{project.tag}</span>
              <span>{project.department}</span>
              <span>·</span>
              <span>{project.year}</span>
            </div>
            <h1>{project.title}</h1>
            <p className="cs-lede">{project.summary}</p>
          </div>
        </header>

        <div className="container cs-shot">
          <div className="cs-shot__frame">
            <div className="cs-shot__chrome">
              <span></span>
              <span></span>
              <span></span>
              <em>{project.site_url || project.slug}</em>
            </div>
            <div className="cs-shot__body">
              {imgSrc ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={imgSrc} alt={project.title} />
              ) : (
                <>
                  Screenshot / mockup goes here
                  <br />
                  <small>recommended 1600×1000</small>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="container cs-grid">
          <div className="cs-main">
            <section className="cs-block">
              <h2>
                <span className="cs-num">01</span> The challenge
              </h2>
              <p>{project.challenge}</p>
            </section>
            <section className="cs-block">
              <h2>
                <span className="cs-num">02</span> How we overcame it
              </h2>
              <p>{project.solution}</p>
            </section>
            <section className="cs-block">
              <h2>
                <span className="cs-num">03</span> What changed
              </h2>
              <ul className="cs-outcomes">
                {project.outcome.map((o, i) => (
                  <li key={i}>{o}</li>
                ))}
              </ul>
            </section>
          </div>

          <aside className="cs-side">
            <div className="cs-fact">
              <span>Department</span>
              <strong>{project.department}</strong>
            </div>
            <div className="cs-fact">
              <span>Year</span>
              <strong>{project.year}</strong>
            </div>
            <div className="cs-fact">
              <span>Category</span>
              <strong>{project.tag}</strong>
            </div>
            <div className="cs-fact">
              <span>Built with</span>
              <div className="cs-stack">
                {project.stack.map((s) => (
                  <span key={s}>{s}</span>
                ))}
              </div>
            </div>
            <Link
              href="/contact"
              className="btn btn--red"
              style={{ width: '100%', justifyContent: 'center', marginTop: 8 }}
            >
              Discuss a similar project ↗
            </Link>
          </aside>
        </div>

        <div className="container cs-next">
          <Link href={`/government/${next.slug}`} className="cs-next__link">
            <span>Next case study</span>
            <strong>{next.title} →</strong>
          </Link>
        </div>
      </article>
    </main>
  )
}
