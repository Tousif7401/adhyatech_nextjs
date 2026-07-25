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
          <span className="govt-badge">★ Govt of Karnataka empanelled</span>
        </div>
        <div className="utility__right">
          <a href="#careers">Careers</a>
          <span className="sep">|</span>
          <a href="mailto:hello@adyatech.com">hello@adyatech.com</a>
          <span className="sep">|</span>
          <a href="tel:+910000000000">+91 00000 00000</a>
        </div>
      </div>
    </div>
  )
}
