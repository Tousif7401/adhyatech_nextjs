'use client'

import { useRef, useEffect } from 'react'

interface PageHeroProps {
  breadcrumb: { label: string; href?: string }[]
  title: React.ReactNode
  lede: React.ReactNode
}

export default function PageHero({ breadcrumb, title, lede }: PageHeroProps) {
  const heroRef = useRef<HTMLElement>(null)
  const auraRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const hero = heroRef.current
    const aura = auraRef.current
    if (!hero || !aura || window.innerWidth < 768) return

    // Brand colour stops the aura cycles through
    const C1 = [[232, 181, 71], [208, 0, 0], [240, 140, 60]]  // inner: gold, red, amber
    const C2 = [[208, 0, 0], [232, 181, 71], [120, 40, 10]]    // outer: red, gold, deep

    let tx = 50, ty = 50, mx = 50, my = 50, phase = 0, lastMove = Date.now()

    function lerp(a: number, b: number, f: number): number {
      return a + (b - a) * f
    }

    function mix(arr: number[][], p: number): number[] {
      const n = arr.length
      const i = Math.floor(p) % n
      const j = (i + 1) % n
      const f = p - Math.floor(p)
      return [
        Math.round(lerp(arr[i][0], arr[j][0], f)),
        Math.round(lerp(arr[i][1], arr[j][1], f)),
        Math.round(lerp(arr[i][2], arr[j][2], f))
      ]
    }

    const onMove = (e: MouseEvent) => {
      const rect = hero.getBoundingClientRect()
      tx = ((e.clientX - rect.left) / rect.width) * 100
      ty = ((e.clientY - rect.top) / rect.height) * 100
      lastMove = Date.now()
    }

    function loop() {
      if (!aura) return

      mx += (tx - mx) * 0.12
      my += (ty - my) * 0.12

      const moving = Date.now() - lastMove < 120
      phase += moving ? 0.012 : 0.004

      const c1 = mix(C1, phase)
      const c2 = mix(C2, phase * 0.8 + 0.3)

      aura.style.setProperty('--mx', mx.toFixed(1) + '%')
      aura.style.setProperty('--my', my.toFixed(1) + '%')
      aura.style.setProperty('--c1', c1.join(','))
      aura.style.setProperty('--c2', c2.join(','))

      requestAnimationFrame(loop)
    }

    hero.addEventListener('mousemove', onMove)
    const rafId = requestAnimationFrame(loop)

    return () => {
      hero.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <section className="page-hero" ref={heroRef}>
      <div className="page-hero__mesh" aria-hidden="true">
        <div className="page-hero__mesh-blob"></div>
        <div className="page-hero__mesh-blob"></div>
      </div>
      <div className="page-hero__aura" ref={auraRef} aria-hidden="true"></div>
      <div className="container">
        <div className="page-hero__inner">
          <div className="page-hero__breadcrumb">
            {breadcrumb.map((b, i) => (
              <span key={i}>
                {b.href ? <a href={b.href}>{b.label}</a> : <span>{b.label}</span>}
                {i < breadcrumb.length - 1 && <span className="sep">/</span>}
              </span>
            ))}
          </div>
          <h1>{title}</h1>
          <p className="page-hero__lede">{lede}</p>
        </div>
      </div>
    </section>
  )
}
