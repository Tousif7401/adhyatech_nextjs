'use client'

import { useState } from "react";
import { Testimonial } from "@/types/testimonial";
import { useSettings } from "../context/SettingsContext";

import { sendNewsletterSubscribe } from "@/lib/newsletter";

import Link from "next/link";

interface TestimonialProps {
  testimonials: Testimonial[];
}

export function Testimonials({ testimonials }: TestimonialProps) {
  return (
    <section className="testimonials">
      <div className="container">
        <div className="testimonials__head" data-aos="fade-up">
          <span className="eyebrow">Clients say · 12</span>
          <h2 className="section-title">Words from the people who <em>signed the cheques</em>.</h2>
        </div>
        <div className="testimonials__grid">
          {testimonials.map((t, i) => (
            <article key={i} className={`testimonial${t.span2 ? ' testimonial--featured' : ''}`} data-aos="fade-up" data-aos-delay={i * 100}>
              <p className="testimonial__quote">{t.quote}</p>
              <div className="testimonial__person">
                <div className="testimonial__avatar">{t.author_initials}</div>
                <div><strong>{t.author_name}</strong><span>{t.author_role}</span></div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}


import { Article } from "@/types/article";

interface ArticleProps {
  articles: Article[];
}

export function Insights({ articles }: ArticleProps) {
  return (
    <section className="insights theme-light" id="insights">
      <div className="container">
        <div className="insights__head">
          <div data-aos="fade-up">
            <span className="eyebrow">Field notes · 13</span>
            <h2 className="section-title">What we're <em>writing about</em>.</h2>
          </div>
          <Link href={`/insights`} className="btn btn--ghost-l">All insights <span className="arrow">↗</span></Link>
        </div>
        <div className="insights__grid">
          {articles.map((a, i) => (
            <article
              key={a.id}
              className="article"
              data-aos="fade-up"
              data-aos-delay={i * 100}
            >
              <div className="article__meta">
                <span className="article__cat">
                  {a.categories?.map(cat => cat.title).join(", ")}
                </span>

                <span>{a.publish_date}</span>
              </div>

              <h3>{a.heading}</h3>

              <p>{a.description}</p>

              <Link href={`/insights/${a.slug}`} className="article__read">
                Read article →
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export function BigCTA() {

  const settings = useSettings();

  return (
    <section className="bigcta" id="contact">
      <div className="container bigcta__inner">
        <h2>Let's build<br /><em>something that lasts.</em></h2>
        <p className="bigcta__sub">
          Tell us what you're trying to ship. We'll come back within one business day with a real assessment — not a sales pitch.
        </p>
        <div className="bigcta__actions">
          <Link href="/quote" className="btn btn--red btn--lg">Request a quote <span className="arrow">↗</span></Link>
          <Link href="/contact" className="btn btn--ghost-d btn--lg">Or just send a message</Link>
        </div>
        <div className="bigcta__email">
          Or just write to us → <a href={`mailto:${settings.emails[0].value}`}>{settings.emails[0].value}</a>
        </div>
      </div>
    </section>
  )
}

export function Footer() {

  const settings = useSettings();

  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
  });

  const handleNewsletter = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await sendNewsletterSubscribe(formData);

      setSubmitted(true);

      setFormData({
        email: ""
      });

    } catch (err) {
      console.error(err);
      alert("Failed to send message.");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined
    setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }))
  }

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__top">
          <div className="footer__brand">
            <Link href="/" className="logo">
              <img className="logo__img logo__img--light" src={`${process.env.NEXT_PUBLIC_BASE_PATH || ""}/assets/logo/adyatech-logo-light.png`} alt="Adyatech Solutions LLP" />
            </Link>
            <p>A Ballari-born studio building custom web, software, AI and mobile experiences for ambitious teams worldwide. Home of Osciva AI and Alumnyo.</p>
            <div className="footer__address">
              <strong>Ballari Office</strong>
              <a href={`${settings.addresses[0].link_url}`} target="_blank" rel="noopener noreferrer">
                {settings.addresses[0].value.split("\n").map((line, index) => (
                  <span key={index}>
                    {line}
                    <br />
                  </span>
                ))}
              </a>
            </div>
            {submitted ? (
              <p className="footer__newsletter-success">
                🎉 Thank you for subscribing! We'll keep you updated.
              </p>
            ) : (
              <form className="footer__newsletter" onSubmit={handleNewsletter}>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@company.com"
                  required
                />
                <button type="submit">Subscribe →</button>
              </form>
            )}
          </div>

          <div className="footer__links">
            <div>
              <h4>Studio</h4>
              <ul>
                <li><Link href="/about">About</Link></li>
                <li><Link href="/about#leadership">Leadership</Link></li>
                <li><Link href="/#government">Govt Projects</Link></li>
                <li><Link href="/careers">Careers</Link></li>
                <li><Link href="/contact">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h4>Services</h4>
              <ul>
                <li><Link href="/services#web">Web Development</Link></li>
                <li><Link href="/services#software">Custom Software</Link></li>
                <li><Link href="/services#ai">AI Development</Link></li>
                <li><Link href="/services#mobile">Mobile Apps</Link></li>
              </ul>
            </div>
            <div>
              <h4>Products</h4>
              <ul>
                <li><Link href="/osciva">Osciva AI</Link></li>
                <li><Link href="/alumnyo">Alumnyo</Link></li>
                <li><Link href="/#joomlaxpress">JoomlaXpress</Link></li>
                <li><Link href="/#leadflux">LeadFlux</Link></li>
              </ul>
            </div>
            <div>
              <h4>Resources</h4>
              <ul>
                <li><Link href="/portfolio">Portfolio</Link></li>
                <li><Link href="/testimonials">Testimonials</Link></li>
                <li><Link href="/insights">Insights</Link></li>
                <li><Link href="/contact">Contact</Link></li>
                <li><Link href="/quote">Request a quote</Link></li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="footer__giant"><span>ADYATECH</span></div>

      <div className="container footer__bottom">
  <span>© {new Date().getFullYear()} Adyatech Solutions LLP · Ballari, Karnataka, India · CIN: ACH-5622</span>
  <div className="footer__legal">
    <Link href="/terms">Terms</Link>
    <Link href="/privacy">Privacy</Link>
    <Link href="/cookies">Cookies</Link>
    <Link href="/disclaimer">Disclaimer</Link>
    <Link href="/refund">Refund</Link>
  </div>
  <div className="footer__social">
    {[['in', 'LinkedIn'], ['gh', 'GitHub'], ['dr', 'Dribbble'], ['𝕏', 'X / Twitter']].map(([icon, label]) => (
      <Link key={label} href="#" aria-label={label}>{icon}</Link>
    ))}
  </div>
</div>
    </footer>
  )
}
