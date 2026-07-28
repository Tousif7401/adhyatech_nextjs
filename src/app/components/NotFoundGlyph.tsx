'use client'

import { useEffect, useRef } from 'react'

/**
 * NotFoundGlyph — the "404" rendered as drifting gold/cream dots that
 * scatter away from the cursor, like a page coming apart. Canvas 2D, no deps.
 * Draws immediately; does not depend on an IntersectionObserver to start.
 */
export default function NotFoundGlyph() {
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
    const GOLD = '232,181,71', RED = '208,0,0', WHITE = '255,255,255'

    let W = 0, H = 0, t = 0, raf = 0
    let mx = -9999, my = -9999
    let pts: { x: number; y: number; ph: number }[] = []

    const buildPts = () => {
      const off = document.createElement('canvas')
      off.width = 460; off.height = 460
      const o = off.getContext('2d')
      if (!o) return
      o.fillStyle = '#fff'
      o.font = 'bold 210px "Bricolage Grotesque", sans-serif'
      o.textAlign = 'center'; o.textBaseline = 'middle'
      o.fillText('404', 230, 235)
      const img = o.getImageData(0, 0, 460, 460).data
      pts = []
      for (let y = 0; y < 460; y += 9) {
        for (let x = 0; x < 460; x += 9) {
          if (img[(y * 460 + x) * 4 + 3] > 128) {
            pts.push({ x: x / 460 * 2 - 1, y: y / 460 * 2 - 1, ph: Math.random() * 6.28 })
          }
        }
      }
    }

    const size = () => {
      const b = wrap.getBoundingClientRect()
      W = b.width; H = b.height
      canvas.width = Math.round(W * dpr)
      canvas.height = Math.round(H * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    const draw = () => {
      if (!reduced) t += 0.01
      const cx = W / 2, cy = H / 2, S = Math.min(W, H) * 0.44
      ctx.clearRect(0, 0, W, H)
      for (const p of pts) {
        const drift = Math.sin(t + p.ph) * 0.01
        let px = cx + (p.x + drift) * S
        let py = cy + (p.y + drift) * S
        const dx = px - mx, dy = py - my
        const d = Math.hypot(dx, dy)
        if (d < 70) { const push = (70 - d) / 70 * 22; px += dx / d * push; py += dy / d * push }
        const tw = 0.55 + 0.45 * Math.sin(t * 2 + p.ph)
        const col = p.ph > 4 ? GOLD : p.ph > 2 ? RED : WHITE
        ctx.beginPath(); ctx.arc(px, py, 1.3 + tw * 1.2, 0, 7)
        ctx.fillStyle = `rgba(${col},${0.3 + tw * 0.55})`; ctx.fill()
      }
      raf = requestAnimationFrame(draw)
    }

    const onMove = (e: MouseEvent) => {
      const b = wrap.getBoundingClientRect(); mx = e.clientX - b.left; my = e.clientY - b.top
    }
    const onLeave = () => { mx = -9999; my = -9999 }

    buildPts()
    size()
    const ro = new ResizeObserver(size); ro.observe(wrap)
    wrap.addEventListener('mousemove', onMove)
    wrap.addEventListener('mouseleave', onLeave)
    raf = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      wrap.removeEventListener('mousemove', onMove)
      wrap.removeEventListener('mouseleave', onLeave)
    }
  }, [])

  return (
    <div ref={wrapRef} className="nf-glyph" aria-hidden="true">
      <canvas ref={canvasRef} />
    </div>
  )
}
