import { notFound } from "next/navigation";
import type { Metadata } from "next";

import UtilityBar from "../../components/UtilityBar";
import Header from "../../components/Header";
import { Footer } from "../../components/Sections4";

import type { Project } from "@/types/project";

import { getProjects, getProject, getRelatedProjects } from "../../../lib/projects";

// 👇 Add this
// export async function generateStaticParams() {
//   const projects = await getProjects();

//   return projects.map((project) => ({
//     slug: project.slug,
//   }));
// }

const storageUrl = process.env.NEXT_PUBLIC_STORAGE_URL;

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {

  const { slug } = await params;

  try {
    const project = await getProject(slug);

    return {
      title: `${project.title} — ${project.client} · Adyatech case study`,
      description: project.summary,

      openGraph: {
        title: `${project.title} — ${project.client}`,
        description: project.summary,
        images: project.image
          ? [`${storageUrl}/${project.image}`]
          : [],
      },
    };
  } catch {
    return {
      title: "Project not found · Adyatech",
      description: "The requested project could not be found.",
    };
  }
}


function PortfolioCard({ project }: { project: Project }) {
  const href = project.has_case_study
    ? `/portfolio/${project.slug}`
    : project.external_url || '#'
  const isExternal = !project.has_case_study && !!project.external_url
  const linkProps = isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {}

  return (
    <a href={href} className="portfolio-card" {...linkProps}>
      <div className={`portfolio-card__media is-${project.media_tone}`}>
        {project.image && (
          <img
            src={`${process.env.NEXT_PUBLIC_STORAGE_URL}/${project.image}`}
            alt={project.title}
            className="portfolio-card__image"
          />
        )}
        <div className="portfolio-card__icon">{project.icon}</div>
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

export default async function CaseStudyPage({ params }: { params: { slug: string } }) {
  const { slug } = await params;

  let project;

  try {
    project = await getProject(slug);
  } catch {
    notFound();
  }

  if (!project || !project.has_case_study) {
    notFound();
  }

  let related: Project[] = [];

  try {
    related = await getRelatedProjects(slug);
  } catch {
    related = [];
  }

  return (
    <>
      <UtilityBar />
      <Header />

      <main>
        {/* Hero */}
        <section className="case-hero">
          <div className="container">
            <div className="case-hero__breadcrumb">
              <a href="/">Home</a>

              <span className="sep">/</span>

              <a href="/portfolio">Portfolio</a>

              <span className="sep">/</span>

              <span>{project.client}</span>
            </div>

            <div className="case-hero__category">
              {project.category} · {project.year}

              {project.badges?.includes("Premium") && (
                <> · Premium case study</>
              )}
            </div>

            <h1>{project.title}</h1>

            {project.lede && (
              <p className="case-hero__lede">
                {project.lede}
              </p>
            )}

            <dl className="case-hero__meta">
              <div className="case-hero__meta-item">
                <dt>Client</dt>
                <dd>{project.client}</dd>
              </div>

              {project.scope && (
                <div className="case-hero__meta-item">
                  <dt>Scope</dt>
                  <dd>{project.scope}</dd>
                </div>
              )}

              {project.duration && (
                <div className="case-hero__meta-item">
                  <dt>Duration</dt>
                  <dd>{project.duration}</dd>
                </div>
              )}

              {project.team && (
                <div className="case-hero__meta-item">
                  <dt>Team</dt>
                  <dd>{project.team}</dd>
                </div>
              )}
            </dl>
          </div>
        </section>

        {/* Cover */}
        <section className="case-cover">
          <div className="container">
            <div
              className={`case-cover__inner is-${project.media_tone}`}
            >
              {project.image ? (
                <img
                  src={`${storageUrl}/${project.image}`}
                  alt={project.title}
                  className="case-cover__image"
                />
              ) : (
                <div className="case-cover__icon">
                  {project.icon}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Body */}
        <section className="case-body">
          <div className="container">
            <div className="case-body__inner">
              <div className="case-body__main">
                {project.challenge && (
                  <>
                    <h2>
                      The <em>challenge</em>
                    </h2>

                    <p>{project.challenge}</p>
                  </>
                )}

                {project.approach && (
                  <>
                    <h2>
                      Our <em>approach</em>
                    </h2>

                    <p>{project.approach}</p>
                  </>
                )}

                {project.results &&
                  project.results.length > 0 && (
                    <>
                      <h2>
                        The <em>results</em>
                      </h2>

                      <div className="results-stat">
                        {project.results.map((result, index) => (
                          <div key={index} className="stat-text-item">
                            {result}
                          </div>
                        ))}
                      </div>
                    </>
                  )}

                {project.deliverables &&
                  project.deliverables.length > 0 && (
                    <>
                      <h3>What we shipped</h3>

                      <ul>
                        {project.deliverables.map(
                          (deliverable, index) => (
                            <li key={index}>
                              {deliverable}
                            </li>
                          )
                        )}
                      </ul>
                    </>
                  )}

                {project.testimonial && (
                  <blockquote>
                    “{project.testimonial.quote}”

                    <cite>
                      — {project.testimonial.author},{" "}
                      {project.testimonial.role}
                    </cite>
                  </blockquote>
                )}
              </div>

              {/* Sidebar */}
              <aside className="case-body__aside">
                <div className="case-aside-card">
                  <h4>Project at a glance</h4>

                  <ul>
                    <li>
                      <strong>Client</strong>
                      {project.client}
                    </li>

                    <li>
                      <strong>Category</strong>
                      {project.category}
                    </li>

                    <li>
                      <strong>Year</strong>
                      {project.year}
                    </li>

                    {project.duration && (
                      <li>
                        <strong>Duration</strong>
                        {project.duration}
                      </li>
                    )}
                  </ul>
                </div>

                {project.tech_stack &&
                  project.tech_stack.length > 0 && (
                    <div className="case-aside-card">
                      <h4>Tech stack</h4>

                      <div className="tags-row">
                        {project.tech_stack.map(
                          (technology) => (
                            <span key={technology}>
                              {technology}
                            </span>
                          )
                        )}
                      </div>
                    </div>
                  )}

                <div className="case-aside-card">
                  <h4>Want similar results?</h4>

                  <p
                    style={{
                      fontSize: "0.86rem",
                      lineHeight: 1.6,
                      color: "rgba(19,19,25,0.7)",
                      marginBottom: 16,
                    }}
                  >
                    Let's talk about what you're trying to
                    build. We respond within one business day.
                  </p>

                  <a
                    href="/contact"
                    className="btn btn--red"
                    style={{
                      width: "100%",
                      justifyContent: "center",
                    }}
                  >
                    Start a project →
                  </a>
                </div>
              </aside>
            </div>
          </div>
        </section>

        {/* Related projects */}
        {related.length > 0 && (
          <section className="case-next">
            <div className="container">
              <span className="eyebrow">Continue reading · 03</span>
              <h2>More <em>case studies</em>.</h2>
              <div className="portfolio-grid" style={{ maxWidth: 900, margin: '0 auto' }}>
                {related.map(p => <PortfolioCard key={p.slug} project={p} />)}
              </div>
              <div style={{ marginTop: 48 }}>
                <a href="/portfolio" className="btn btn--ghost-d">← Back to all projects</a>
              </div>
            </div>
          </section>
        )}
      </main>

      <Footer />

      <a href="/contact" className="fab">
        Let's talk →
      </a>
    </>
  );
}