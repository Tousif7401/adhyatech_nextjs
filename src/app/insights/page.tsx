import UtilityBar from '../components/UtilityBar'
import Header from '../components/Header'
import PageHero from '../components/PageHero'
import InsightContent from '../components/InsightContent'
import { Footer, BigCTA } from '../components/Sections4'

import { getArticles, getBlogCategories } from "../../lib/articles";
import type { Metadata } from "next";
import { getSeo } from "../../lib/seo";

const storageUrl = process.env.NEXT_PUBLIC_STORAGE_URL;

export async function generateMetadata(): Promise<Metadata> {
  try {
    const seo = await getSeo("insights");

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

export default async function InsightsPage() {

  const articles = await getArticles();
  const categories = await getBlogCategories();

  return (
    <>
      <UtilityBar />
      <Header />

      <main>
        <PageHero
          breadcrumb={[
            { label: 'Home', href: '/' },
            { label: 'Insights' },
          ]}
          title={
            <>
              Notes from the
              <br />
              <em>workshop floor</em>.
            </>
          }
          lede={
            <>
              Essays, postmortems, and unglamorous truth about building
              software in 2026 — from the team that's been doing it since
              2009. No thought leadership. Just{' '}
              <strong>what actually works</strong>, and what doesn't.
            </>
          }
        />

        <InsightContent articles={articles} categories={categories} />

        <BigCTA />
      </main>

      <Footer />
      <a href="/contact" className="fab">
        Let's talk →
      </a>
    </>
  )
}