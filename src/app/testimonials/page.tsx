import UtilityBar from '../components/UtilityBar'
import Header from '../components/Header'
import PageHero from '../components/PageHero'
import { Footer, BigCTA } from '../components/Sections4'

import TestimonialContent from '../components/TestimonialContent'

import { getTestimonials } from '../../lib/testimonials'

import type { Metadata } from "next";
import { getSeo } from "../../lib/seo";

const storageUrl = process.env.NEXT_PUBLIC_STORAGE_URL;

export async function generateMetadata(): Promise<Metadata> {
  try {
    const seo = await getSeo("testimonials");

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


export default async function TestimonialsPage() {
  const testimonials = await getTestimonials();

  return (
    <>
      <UtilityBar />
      <Header />

      <main>
        <PageHero
          breadcrumb={[
            { label: "Home", href: "/" },
            { label: "Testimonials" },
          ]}
          title={<>What our <em>clients</em> actually say.</>}
          lede={<>...</>}
        />

        <TestimonialContent testimonials={testimonials} />

        <BigCTA />
      </main>

      <Footer />

      <a href="/contact" className="fab">
        Let's talk →
      </a>
    </>
  );
}
