'use client'

import { useEffect, useRef } from 'react'

/**
 * OscivaAgentGraph — ambient AI-agent reasoning visual.
 * Canvas 2D (no WebGL, no deps). A glowing core with tool nodes that
 * light up and fire signals, representing an agent reasoning + calling tools.
 * Loops on its own; pauses when scrolled off-screen.
 */
export default function OscivaAgentGraph() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const wrapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const wrap = wrapRef.current
    if (!canvas || !wrap) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const GOLD = '232,181,71', RED = '208,0,0', CREAM = '245,242,234', SLATE = '58,68,79'

    let W = 0, H = 0, R = 0, t = 0, raf = 0, visible = true

    const tools = Array.from({ length: 6 }, (_, i) => ({ a: (i / 6) * Math.PI * 2 }))

    const rr = (x: number, y: number, w: number, h: number, r: number) => {
      ctx.beginPath()
      ctx.moveTo(x + r, y)
      ctx.arcTo(x + w, y, x + w, y + h, r)
      ctx.arcTo(x + w, y + h, x, y + h, r)
      ctx.arcTo(x, y + h, x, y, r)
      ctx.arcTo(x, y, x + w, y, r)
      ctx.closePath()
    }

    const size = () => {
      const b = wrap.getBoundingClientRect()
      W = b.width; H = b.height
      canvas.width = Math.round(W * dpr)
      canvas.height = Math.round(H * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      R = Math.min(W, H)
    }

    const draw = () => {
      if (!reduced) t += 0.016
      const cx = W / 2, cy = H / 2
      ctx.clearRect(0, 0, W, H)

      tools.forEach((tl, i) => {
        const tx = cx + Math.cos(tl.a + t * 0.15) * R * 0.34
        const ty = cy + Math.sin(tl.a + t * 0.15) * R * 0.34
        ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(tx, ty)
        ctx.strokeStyle = `rgba(${CREAM},0.08)`; ctx.lineWidth = 1; ctx.stroke()

        const active = Math.sin(t * 1.2 + i * 1.1) > 0.3
        if (active) {
          const fp = (t * 0.5 + i * 0.3) % 1
          const sx = cx + (tx - cx) * fp, sy = cy + (ty - cy) * fp
          ctx.beginPath(); ctx.arc(sx, sy, 2.6, 0, 7)
          ctx.fillStyle = `rgba(${GOLD},0.9)`; ctx.fill()
        }
        rr(tx - 13, ty - 9, 26, 18, 5)
        ctx.fillStyle = active ? `rgba(${GOLD},0.2)` : `rgba(${SLATE},0.85)`
        ctx.fill()
        if (active) { ctx.strokeStyle = `rgba(${GOLD},0.6)`; ctx.lineWidth = 1; ctx.stroke() }
      })

      const cp = 0.5 + 0.5 * Math.sin(t * 1.6)
      const cr = R * 0.075 * (0.92 + 0.08 * cp)
      const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, cr * 2.6)
      g.addColorStop(0, `rgba(${GOLD},0.95)`)
      g.addColorStop(0.5, `rgba(${RED},0.85)`)
      g.addColorStop(1, `rgba(${RED},0)`)
      ctx.beginPath(); ctx.arc(cx, cy, cr * 2.6, 0, 7); ctx.fillStyle = g; ctx.fill()
      ctx.beginPath(); ctx.arc(cx, cy, cr, 0, 7); ctx.fillStyle = `rgba(${GOLD},0.95)`; ctx.fill()

      raf = requestAnimationFrame(draw)
    }

    size()
    const ro = new ResizeObserver(size)
    ro.observe(wrap)

    // pause when off-screen
    const io = new IntersectionObserver(
      ([e]) => {
        visible = e.isIntersecting
        if (visible && !raf) raf = requestAnimationFrame(draw)
        else if (!visible) { cancelAnimationFrame(raf); raf = 0 }
      },
      { threshold: 0.01 }
    )
    //io.observe(wrap)

    raf = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      io.disconnect()
    }
  }, [])

  return (
    <div ref={wrapRef} className="osciva-graph" aria-hidden="true">
      <canvas ref={canvasRef} />
    </div>
  )
}
