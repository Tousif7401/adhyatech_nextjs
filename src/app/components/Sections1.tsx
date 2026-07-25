'use client'

export function LegacyBand() {
  return (
    <section className="legacy-band">
      <div className="container legacy-band__inner">
        <div className="legacy-item" data-aos="fade-up">
          <div className="legacy-item__num">16<span className="small">+</span></div>
          <div className="legacy-item__text"><strong>Years building</strong><span>Since 2010</span></div>
        </div>
        <div className="legacy-item" data-aos="fade-up" data-aos-delay="100">
          <div className="legacy-item__num">400<span className="small">+</span></div>
          <div className="legacy-item__text"><strong>Clients served</strong><span>99% Satisfied</span></div>
        </div>
        <div className="legacy-item is-govt" data-aos="fade-up" data-aos-delay="200">
          <div className="legacy-item__num">★</div>
          <div className="legacy-item__text"><strong>Govt of Karnataka</strong><span>Trusted vendor</span></div>
        </div>
        <div className="legacy-item" data-aos="fade-up" data-aos-delay="300">
          <div className="legacy-item__num">98<span className="small">%</span></div>
          <div className="legacy-item__text"><strong>Client retention</strong><span>18+ month engagements</span></div>
        </div>
      </div>
    </section>
  )
}

const marqueeItems = [
  'Govt of Karnataka', 'V.V Sangha', 'T.E.H.R.D Trust', 'Zilla Panchayat, Ballari',
  'Ramaiah Healthplus', 'BKS Hospital', 'Varsha Agri', 'Marchad Groups', 'BDCCI'
]

export function Marquee() {
  const doubled = [...marqueeItems, ...marqueeItems]
  return (
    <section className="marquee">
      <p className="marquee__label">TRUSTED BY 400+ CLIENTS · 16+ YEARS OF EXCELLENCE</p>
      <div className="marquee__track">
        {doubled.map((item, i) => (
          <span key={i} className="marquee__item">{item}<span className="star">✦</span></span>
        ))}
      </div>
    </section>
  )
}

export function Manifesto() {
  return (
    <section className="manifesto theme-light" id="about">
      <div className="container manifesto__inner">

        <div className="manifesto__label" data-aos="fade-up">
          <span className="eyebrow">About Adyatech · 01</span>
          <p className="manifesto__label-text">
            Founded in 2010 in Ballari.
            Delivering enterprise websites, custom software, AI solutions, and mobile applications.
            16+ years of innovation and excellence.
          </p>
        </div>

        <div className="manifesto__copy" data-aos="fade-up" data-aos-delay="100">
          <h2>
            We don't just <em>ship</em> code —<br />
            we ship <em>outcomes</em> that move<br />
            a real number on a real business.
          </h2>
          <p>
            At Adyatech, we combine engineering expertise, thoughtful design, and artificial intelligence to build digital solutions that solve real business challenges. Based in <strong>Ballari, Karnataka</strong>, we've spent over 16 years delivering enterprise-grade websites, custom software, SaaS platforms, mobile applications, and AI-powered systems for organizations across diverse industries.
          </p>
          <p>
            Our expertise spans four key disciplines: <strong>enterprise website development</strong>, <strong>custom software engineering</strong>, <strong>artificial intelligence solutions</strong> through our AI brand <strong>Osciva</strong>, and <strong>cross-platform mobile application development</strong>. We also invest in building our own SaaS products, including <strong>Alumnyo</strong>, a modern alumni management platform that helps educational institutions strengthen engagement with their alumni community.
          </p>
          <p>
            What you actually get when you work with us: senior people, fewer meetings, weekly demos, and code you'd be proud to inherit.
          </p>
          <div className="manifesto__signature">
            <div className="signature-avatar">V</div>
            <div className="signature-text">
              <strong>Vijay & the Adyatech team</strong>
              <span>Founders · Adyatech Solutions LLP · Ballari</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}

const industries = [
  { icon: 'Ed', name: 'Education', count: '30+ projects' },
  { icon: 'Gv', name: 'Government', count: '3 projects' },
  { icon: 'Hc', name: 'Healthcare', count: '5 projects' },
  { icon: 'Rt', name: 'Retail & D2C', count: '10+ projects' },
  { icon: 'Fn', name: 'Fintech', count: '2 projects' },
  { icon: 'Re', name: 'Real Estate', count: '3 projects' },
  { icon: 'Lg', name: 'Business', count: '20+ projects' },
]

export function Industries() {
  return (
    <section className="industries">
      <div className="container">
        <div className="industries__head" data-aos="fade-up">
          <span className="eyebrow">Industries · 02</span>
          <h2 className="section-title">Sectors we know <em>by heart</em>.</h2>
          <p className="lede" style={{ margin: '24px auto 0' }}>
            Sixteen years of project work means we've shipped real, production software in every one of these. We bring the patterns, the gotchas, and the playbooks.
          </p>
        </div>
        <div className="industries__grid">
          {industries.map((ind) => (
            <div key={ind.name} className="industry-card" data-aos="fade-up">
              <div className="industry-card__icon">{ind.icon}</div>
              <div className="industry-card__name">{ind.name}</div>
              <div className="industry-card__count">{ind.count}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
