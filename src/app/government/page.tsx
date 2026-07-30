import type { Metadata } from 'next'
import { getGovProjects } from '@/lib/government'
import GovCard from './GovCard'
import UtilityBar from '@/app/components/UtilityBar'
import Header from '@/app/components/Header'
import PageHero from '@/app/components/PageHero'
import { Footer, BigCTA } from '@/app/components/Sections4'

export const metadata: Metadata = {
  title: 'Government Projects — Adyatech Solutions',
  description:
    'Systems Adyatech builds and maintains for State Government and Zilla Panchayat — fund tracking, asset management, and citizen services.',
}

export default async function GovernmentPage() {
  const projects = await getGovProjects()

  return (
    <>
      <UtilityBar />
      <Header />
      <main>
        <PageHero
          breadcrumb={[{ label: 'Home', href: '/' }, { label: 'Government Projects' }]}
          title={
            <>
              Systems that public<br />
              offices <em>actually run on.</em>
            </>
          }
          lede={
            <>
              We build and maintain systems for <strong>State Government and Zilla Panchayat</strong> projects — fund tracking, asset management, and citizen services. Not pilots. Working software that district officers open every morning.
            </>
          }
        />
        <section className="gov-hero-stats">
          <div className="container">
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
      <BigCTA />
      <Footer />
    </>
  )
}
