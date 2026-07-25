import UtilityBar from '../components/UtilityBar'
import Header from '../components/Header'
import PageHero from '../components/PageHero'
import { Footer, BigCTA } from '../components/Sections4'
import { Process } from '../components/Sections2'
import { TechStack } from '../components/Sections3'
import Link from "next/link";

import type { Metadata } from "next";
import { getSeo } from "../../lib/seo";

import { getServices } from "../../lib/services";

import { bands } from "../../lib/constants";

const storageUrl = process.env.NEXT_PUBLIC_STORAGE_URL;

export async function generateMetadata(): Promise<Metadata> {
  try {
    const seo = await getSeo("services");

    return {
      title: seo.meta_title,
      description: seo.meta_description,
      keywords: seo.meta_keywords?.split(","),
      robots: seo.meta_robots,
      openGraph: {
        title: seo.og_title || seo.meta_title,
        description: seo.og_description || seo.meta_description,
        images: seo.meta_image
          ? [`${storageUrl}/${seo.meta_image}`]
          : [],
      },
    };
  } catch {
    return {
      title: "Services",
      description: "Our Services",
    };
  }
}

export default async function ServicesPage() {

  const services = await getServices();

  const groupedServices = bands.map((band) => ({
    ...band,
    services: services.filter(
      (service) => service.band === band.name
    ),
  }));

  return (
    <>
      <UtilityBar />
      <Header />
      <main>
        <PageHero
          breadcrumb={[{ label: 'Home', href: '/' }, { label: 'Services' }]}
          title={<>Everything you need.<br />One <em>obsessive</em> standard.</>}
          lede={<>Twelve services across four disciplines — <strong>Build, AI, Products, and Grow</strong>. No subcontractors, no offshore factories, no surprises. Every engagement runs through a senior pod that signs its own work.</>}
        />

        {groupedServices.map((band, index) => (
          (
            <section key={band.name} className="svc-band" id={band.name.toLowerCase()}>
              <div className="container">
                <div className="svc-band__head">
                  <span className="svc-band__num">0{index + 1}</span>
                  <span className="svc-band__eyebrow">{band.eyebrow}</span>
                  <p className="svc-band__blurb">{band.blurb}</p>
                </div>
                <div className="svc-grid">
                  {band.services.map((svc) => (
                    <article key={svc.slug} className="svc-card" id={svc.slug}>
                      <div className={`svc-card__icon ${svc.icon_class}`}>{svc.icon_label}</div>
                      <div>
                        <div className="svc-card__code">S/{svc.code}</div>
                        <h3>{svc.title} <em>{svc.title_em}</em></h3>
                        <p className="svc-card__desc">{svc.description[0]}</p>
                        <div className="svc-card__tags">
                          {svc.tags.slice(0, 6).map(t => <span key={t}>{t}</span>)}
                        </div>
                        <ul className="svc-card__features">
                          {svc.features.slice(0, 4).map(f => <li key={f}>{f}</li>)}
                        </ul>
                        {svc.has_detail_page && (
                          <Link href={`/services/${svc.slug}`} className="svc-card__learn">Explore {svc.title_em} →</Link>
                        )}
                        {svc.case_study_label && svc.case_study_href ? (
                          <Link href={svc.case_study_href} className="svc-card__proof">
                            <span className="label">Proof →</span> {svc.case_study_label}
                          </Link>
                        ) : (
                          <Link href="/contact" className="svc-card__proof">
                            <span className="label">→</span> Discuss this service
                          </Link>
                        )}
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </section>
          )
        ))}

        <Process />
        <TechStack />
        <BigCTA />
      </main>
      <Footer />
      <Link href="/contact" className="fab">Let's talk →</Link>
    </>
  )
}
