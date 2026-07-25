'use client'

import { useEffect, useRef, useState } from 'react'
import BrowserFrame from '@/app/components/BrowserFrame'
import { Project } from "@/types/project";
import { WovenParticles } from './WovenParticles';

interface HeroProps {
  featuredProjects: Project[];
}


const rotatorWords = ['websites', 'software', 'AI agents', 'mobile apps', 'websites']

export default function Hero({
  featuredProjects
}: HeroProps) {
  const heroRef = useRef<HTMLElement>(null)
  const glowRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const [activeSlide, setActiveSlide] = useState(0)
  const [rotatorIndex, setRotatorIndex] = useState(0)
  const slideTimer = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    const hero = heroRef.current
    const glow = glowRef.current
    if (!hero || !glow || window.innerWidth < 768) return

    const onMove = (e: MouseEvent) => {
      const rect = hero.getBoundingClientRect()
      glow.style.left = `${e.clientX - rect.left}px`
      glow.style.top = `${e.clientY - rect.top}px`
    }

    hero.addEventListener('mousemove', onMove)
    return () => hero.removeEventListener('mousemove', onMove)

  }, [])

  useEffect(() => {
    if (window.innerWidth < 768) return

    const onScroll = () => {
      const el = titleRef.current
      if (!el) return

      const y = window.pageYOffset

      if (y < window.innerHeight) {
        el.style.transform = `translateY(${y * 0.15}px)`
        el.style.opacity = String(Math.max(0, 1 - y / (window.innerHeight * 0.8)))
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)

  }, [])

  useEffect(() => {
    if (!featuredProjects.length) return

    slideTimer.current = setInterval(() => {
      setActiveSlide(i => (i + 1) % featuredProjects.length)
    }, 6000)

    return () => {
      if (slideTimer.current) clearInterval(slideTimer.current)
    }

  }, [featuredProjects.length])

  useEffect(() => {
    const timer = setInterval(() => {
      setRotatorIndex(i => {
        if (i === rotatorWords.length - 1) return 0
        return i + 1
      })
    }, 2500)

    return () => clearInterval(timer)

  }, [])

  const goTo = (index: number) => {
    if (slideTimer.current) clearInterval(slideTimer.current)

    setActiveSlide(index)

    slideTimer.current = setInterval(() => {
      setActiveSlide(prev => (prev + 1) % featuredProjects.length)
    }, 6000)

  }

  return (
    <section className="hero" id="hero" ref={heroRef}>
      {/* 3D Particle Background */}
      <WovenParticles particleCount={15000} />

      <div className="hero__mesh" aria-hidden="true" style={{ zIndex: -1 }}> <div className="hero__mesh-blob"></div> <div className="hero__mesh-blob"></div> <div className="hero__mesh-blob"></div> <div className="hero__mesh-blob"></div> </div>

      <div className="hero__particles" aria-hidden="true">
        <span className="particle"></span>
        <span className="particle"></span>
        <span className="particle"></span>
        <span className="particle"></span>
        <span className="particle"></span>
        <span className="particle"></span>
        <span className="particle"></span>
        <span className="particle"></span>
      </div>

      <div className="hero__cursor-glow" id="cursorGlow" ref={glowRef} aria-hidden="true"></div>

      <div className="container hero__inner" style={{ zIndex: 10, position: 'relative' }}>
        <div className="hero__top">
          <h1 className="hero__title" ref={titleRef}>
            <span className="row"><span>From Ballari,</span></span>
            <span className="row"><span>we engineer{' '}
              <span className="rotator">
                <ul className="rotator__list" style={{ transform: `translateY(-${rotatorIndex * 1.1}em)` }}>
                  <li>websites</li>
                  <li>software</li>
                  <li>AI agents</li>
                  <li>mobile apps</li>
                  <li>Enterprises</li>
                </ul>
              </span>
            </span></span>
            <span className="row"><span>that <span className="accent">compound.</span></span></span>
          </h1>

          <div className="hero__side">
            <p className="hero__lede">
              A <strong>16-year-old</strong> studio building custom web, software, AI and mobile experiences for ambitious teams worldwide. Home of <strong>Osciva AI</strong> and <strong>Alumnyo</strong>.
            </p>

            <div className="hero__actions">
              <a href="#work" className="btn btn--red">See our work <span className="arrow">↗</span></a>
              <a href="#contact" className="btn btn--ghost-d">Start a project</a>
            </div>
          </div>
        </div>

        <div className="hero__slider" data-aos="fade-up" data-aos-delay="500">
          <div className="hero__slides">
            {featuredProjects.map((project, index) => (
              <article
                key={project.id}
                className={`hero__slide ${activeSlide === index ? "is-active" : ""
                  }`}
              >
                <div className="slide__copy">
                  <span className="slide__num">
                    Featured · {String(index + 1).padStart(2, "0")} /{" "}
                    {String(featuredProjects.length).padStart(2, "0")}
                  </span>

                  <h3 className="slide__head">
                    {project.title}
                  </h3>

                  <p>{project.summary}</p>

                  <div className="slide__meta">
                    {project.tags?.map(tag => (
                      <span key={tag} className="tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="slide__visual">
                  {project.image && (
                    <BrowserFrame
                      image={project.image}
                      title={project.title}
                      siteUrl={project.site_url}
                      isLive={project.is_live}
                      ratio="16/10"
                    />
                  )}
                </div>
              </article>
            ))}
          </div>

          <div className="slider__nav" id="sliderNav">
            {featuredProjects.map((_, index) => (
              <button
                key={index}
                type="button"
                className={`slider__dot${activeSlide === index ? " is-active" : ""
                  }`}
                onClick={() => goTo(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>

  )
}
