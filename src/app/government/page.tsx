import type { Metadata } from 'next'
import { getGovProjects } from '@/lib/government'
import GovCard from './GovCard'

// If you have shared Header/Footer components, import and use them here
// instead of relying on the root layout. Example:
// import UtilityBar from '@/app/components/UtilityBar'
// import Header from '@/app/components/Header'
// import { Footer } from '@/app/components/Sections4'

export const metadata: Metadata = {
  title: 'Government Projects — Adyatech Solutions',
  description:
    'Systems Adyatech builds and maintains for State Government and Zilla Panchayat — fund tracking, asset management, and citizen services.',
}

export default async function GovernmentPage() {
  const projects = await getGovProjects()

  return (
    <main>
      <section className="gov-hero">
        <div className="container">
          <div className="gov-hero__crumb">Home / Government Projects</div>
          <div className="eyebrow" style={{ marginBottom: 20 }}>
            Public sector · Delivered
          </div>
          <h1>
            Systems that public<br />
            offices <em>actually run on.</em>
          </h1>
          <p>
            We build and maintain systems for State Government and Zilla Panchayat
            projects — fund tracking, asset management, and citizen services. Not
            pilots. Working software that district officers open every morning.
          </p>
          <div className="gov-hero__stats">
            <div className="gov-hero__stat">
              <strong>{projects.length}+</strong>
              <span>Gov systems live</span>
            </div>
            <div className="gov-hero__stat">
              <strong>2</strong>
              <span>Govt bodies served</span>
            </div>
            <div className="gov-hero__stat">
              <strong>2024</strong>
              <span>First deployment</span>
            </div>
          </div>
        </div>
      </section>

      <section className="gov-grid">
        <div className="container">
          <div className="gov-grid__inner">
            {projects.map((p) => (
              <GovCard key={p.slug} project={p} />
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
