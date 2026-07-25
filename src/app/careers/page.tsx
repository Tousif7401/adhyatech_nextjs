import UtilityBar from '../components/UtilityBar'
import Header from '../components/Header'
import PageHero from '../components/PageHero'
import { Footer, BigCTA } from '../components/Sections4'
import CareersContent from "../components/CareersContent";

import Link from "next/link";

import { getCareerData } from "@/lib/career";

import type { Metadata } from "next";
import { getSeo } from "../../lib/seo";

const storageUrl = process.env.NEXT_PUBLIC_STORAGE_URL;

export async function generateMetadata(): Promise<Metadata> {
  try {
    const seo = await getSeo("careers");

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


// const perks = [
//   { icon: '01', title: 'Senior team, no juniors', body: 'You\'ll work next to people who\'ve shipped real production software for a decade. We don\'t do the junior-engineer-on-the-keyboard-with-a-senior-on-the-shoulder thing.' },
//   { icon: '02', title: 'Ballari HQ, remote OK', body: 'We\'re based in Ballari, Karnataka. Most of the team is here, but we\'re remote-friendly. Come for the team offsite twice a year. We pay for travel.' },
//   { icon: '03', title: 'Profitable & bootstrapped', body: 'No funding round panic. No layoffs cycle. We\'ve been profitable every year since 2009 and we plan to stay that way.' },
//   { icon: '04', title: 'Weekly demos', body: 'Every Friday, every team. You\'ll know exactly what everyone\'s shipping. No hidden work, no surprises in performance reviews.' },
//   { icon: '05', title: 'Real ownership', body: 'You\'ll own features end-to-end. Discovery, design partnership, build, ship, monitor. Not a Jira ticket in a 12-person team.' },
//   { icon: '06', title: 'Equipment & learning', body: 'We pay for your laptop, your courses, your conferences, and any tool that makes you faster. No multi-page approval process.' },
// ]

// const jobs = [
//   { title: 'Senior Full-stack Engineer (Laravel + Next.js)', location: 'Ballari · Remote OK', type: 'Full-time', exp: '5+ years' },
//   { title: 'AI / RAG Engineer (Osciva)', location: 'Ballari · Remote OK', type: 'Full-time', exp: '3+ years' },
//   { title: 'Senior Flutter Engineer', location: 'Ballari · Remote OK', type: 'Full-time', exp: '4+ years' },
//   { title: 'Senior Joomla Developer', location: 'Ballari preferred', type: 'Full-time', exp: '4+ years' },
//   { title: 'Product Designer (Figma + design systems)', location: 'Ballari · Remote OK', type: 'Full-time', exp: '4+ years' },
//   { title: 'DevOps Engineer (AWS + Docker)', location: 'Remote', type: 'Full-time', exp: '3+ years' },
//   { title: 'Technical Project Manager', location: 'Ballari', type: 'Full-time', exp: '5+ years' },
// ]

export default async function CareersPage() {

  const career = await getCareerData();

  return (
    <>
      <UtilityBar />
      <Header />
      <main>
        <PageHero
          breadcrumb={[{ label: 'Home', href: '/' }, { label: 'Careers' }]}
          title={<>We're <em>hiring senior</em> engineers, designers, and AI practitioners.</>}
          lede={<>If you've been writing production code for five years, want real ownership of features, and want to ship — not sit in stand-ups — we'd like to talk. We're <strong>profitable, bootstrapped, and not chasing a funding round</strong>.</>}
        />

        <CareersContent data={career} />

        <BigCTA />
      </main>
      <Footer />
      <Link href="/contact" className="fab">Let's talk →</Link>
    </>
  )
}
