import UtilityBar from '../components/UtilityBar'
import Header from '../components/Header'
import PageHero from '../components/PageHero'
import { Footer } from '../components/Sections4'
import { Impact } from '../components/Sections3'
import Team from '../components/Team'
import Link from "next/link";

import type { Metadata } from "next";
import { getSeo } from "../../lib/seo";
import { getTeamData } from '@/lib/team'

const storageUrl = process.env.NEXT_PUBLIC_STORAGE_URL;

export async function generateMetadata(): Promise<Metadata> {
  try {
    const seo = await getSeo("about");

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


const timeline = [
  { year: '2010', title: 'Founded in Ballari', body: 'Started as a 1-person Joomla shop, building websites for local businesses and educational institutions.' },
  { year: '2012', title: 'Launching of NammaBellary Portal', body: 'NammaBellary.com is Bellary digital portal connecting businesses, jobs, news, events, services, and the local community.' },
  { year: '2015', title: 'Expanded into custom software', body: 'Added Laravel and Node.js practice. First ERP shipped.' },
  { year: '2018', title: 'Mobile app practice launched', body: 'Flutter team formed. Shipped 10+ apps in two years.' },
  { year: '2021', title: 'Govt of Karnataka trusted vendor', body: 'Officially listed as an trusted IT vendor with the Karnataka State Government for digital services.' },
  { year: '2023', title: 'Osciva AI sub-brand launched', body: 'Started a dedicated AI practice. Built our first production RAG system for a fintech client.' },
  { year: '2025', title: 'Alumnyo SaaS goes live', body: 'Shipped our flagship product — alumni management for higher education. Live with 5 universities in 6 months.' },
  { year: '2026', title: '400+ clients, 600+ projects delivered', body: 'Where we are today: senior, bootstrapped, profitable, and busier than ever.' },
]

const values = [
  { num: '/01', title: <>Senior people, <em>actual</em> ownership</>, body: 'No subcontractors. No offshore black-boxes. Every line of code is shipped by someone whose name and face you know.' },
  { num: '/02', title: <>Weekly demos, <em>always</em></>, body: 'Every Friday, on every engagement. We don\'t hide work behind milestones. You see what\'s shipped, you give feedback, we iterate.' },
  { num: '/03', title: <>Boring tech where it <em>counts</em></>, body: 'We pick battle-tested tools over hype tools — most of the time. We pick the hype tool when it\'s measurably better. We tell you which is which.' },
]

export default async function AboutPage() {
  const team = await getTeamData();

  return (
    <>
      <UtilityBar />
      <Header />
      <main>
        <PageHero
          breadcrumb={[{ label: 'Home', href: '/' }, { label: 'About' }]}
          title={<>Sixteen years.<br /><em>One studio</em>.<br />Built in Ballari.</>}
          lede={<>
            Based in <strong>Ballari, Karnataka</strong>, Adyatech brings together experienced engineers, designers, and AI practitioners to create high-performance digital products. We partner with organizations to deliver custom web solutions, software platforms, mobile apps, and AI experiences that drive measurable business outcomes.</>}
        />

        {/* Our Story */}
        <section className="story-section theme-light" id="story">
          <div className="container">
            <div className="story-grid">
              <div>
                <span className="eyebrow">Our story · 01</span>
                <h2>Beyond <em>Websites</em>. Engineering Digital Solutions.</h2>
                <p>
                  For over 15 years, Adyatech has been delivering technology solutions that solve real business challenges. From award-worthy websites to enterprise software, SaaS platforms, AI solutions, and mobile applications, we help organizations transform ideas into scalable digital products.
                </p>
                <p>What hasn't changed: we still ship every project as if our name is on it. Because it is. <strong>Adyatech</strong> is on every commit message, every deployment, every weekly demo.</p>
                <p>
                  For us, success isn't measured by the number of projects we undertake, but by the impact they create. We focus on delivering secure, scalable, and future-ready digital solutions that help organizations grow with confidence.
                </p>
              </div>
              <div className="story-visual">
                <div className="story-visual__badge">
                  <div className="year">2010</div>
                  <p>Founded in Ballari, Karnataka.<br />Still here. Still hiring.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="timeline-section">
          <div className="container">
            <div className="industries__head">
              <span className="eyebrow">The journey · 02</span>
              <h2 className="section-title">From <em>2010 to today</em>.</h2>
            </div>
            <div className="timeline">
              {timeline.map(item => (
                <div key={item.year} className="timeline-item">
                  <div className="timeline-year">{item.year}</div>
                  <div className="timeline-content">
                    <h3>{item.title}</h3>
                    <p>{item.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="values-section" id="values">
          <div className="container">
            <div className="values-head">
              <span className="eyebrow">What we believe · 03</span>
              <h2 className="section-title">Three principles, <em>religiously held</em>.</h2>
            </div>
            <div className="values-grid">
              {values.map((v, i) => (
                <div key={i} className="value-card">
                  <div className="value-num">{v.num}</div>
                  <h3>{v.title}</h3>
                  <p>{v.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team */}
        <Team members={team} />

        <Impact />
      </main>
      <Footer />
      <Link href="/contact" className="fab">Let's talk →</Link>
    </>
  )
}
