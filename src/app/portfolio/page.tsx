import BrowserFrame from '@app/components/BrowserFrame'
import UtilityBar from '../components/UtilityBar'
import Header from '../components/Header'
import PageHero from '../components/PageHero'
import { Footer, BigCTA } from '../components/Sections4'
import PortfolioContent from '../components/PortfolioContent'

import { getPortfolio } from '../../lib/projects'

import type { Metadata } from "next";
import { getSeo } from "../../lib/seo";

const storageUrl = process.env.NEXT_PUBLIC_STORAGE_URL;

export async function generateMetadata(): Promise<Metadata> {
  try {
    const seo = await getSeo("portfolio");

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
      title: "Projects",
      description: "Our Projects",
    };
  }
}

export default async function PortfolioPage() {

  const data = await getPortfolio();

  return (
    <>
      <UtilityBar />
      <Header />
      <main>
        <PageHero
          breadcrumb={[{ label: 'Home', href: '/' }, { label: 'Portfolio' }]}
          title={<>Sixteen years.<br /><em>Four hundred projects</em>.</>}
          lede={<>A selection of our work across <strong>web development, custom software, AI solutions, and mobile applications</strong> for businesses, educational institutions, healthcare, manufacturing, and government organizations. Explore our featured projects to see how we've helped clients solve real business challenges with technology.</>}
        />

        <PortfolioContent
          featured={data.featured}
          projects={data.projects}
          categories={data.categories}
        />

        <BigCTA />
      </main>
      <Footer />
      <a href="/contact" className="fab">Let's talk →</a>
    </>
  )
}
