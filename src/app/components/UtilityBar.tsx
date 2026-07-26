'use client'

export default function UtilityBar() {
  return (
    <div className="utility">
      <div className="container utility__inner">
        <div className="utility__left">
          <span><span className="live-dot"></span>Available · Q3 2026</span>
          <span className="sep">|</span>
          <span>Ballari, Karnataka · Serving globally</span>
          <span className="sep">|</span>
          <span className="govt-badge">★ Govt of Karnataka trusted</span>
        </div>
        <div className="utility__right">
          <a href="/careers">Careers</a>
          <span className="sep">|</span>
          <a href="mailto:hello@adyatech.com">hello@adyatech.com</a>
          <span className="sep">|</span>
          <a href="tel:+918392359873">+91 8392 359873</a>
        </div>
      </div>
    </div>
  )
}
