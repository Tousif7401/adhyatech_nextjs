'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { usePathname } from 'next/navigation'

// Full-screen "page is coming" loader for internal navigation.
// Rendered through a portal to <body> so it always covers the true viewport —
// a parent with backdrop-filter/transform (the navbar has one) otherwise
// traps position:fixed inside its own box.
//
// Timing:
// - SHOW_DELAY_MS: production navigations finish in 8–40ms, so the loader
//   never appears on normal clicks — no flash, instant feel preserved.
// - MIN_DISPLAY_MS: once visible, it stays up for a clean beat instead of
//   strobing on medium loads.
// - SAFETY_TIMEOUT_MS: hard stop so it can never trap the visitor.

const SHOW_DELAY_MS = 300
const MIN_DISPLAY_MS = 400
const SAFETY_TIMEOUT_MS = 10_000

export function useRouteLoader() {
  const pathname = usePathname()
  const [navigating, setNavigating] = useState(false)
  const showTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const minTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const safetyTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const shownAt = useRef(0)

  const clearAll = useCallback(() => {
    for (const t of [showTimer, minTimer, safetyTimer]) {
      if (t.current) clearTimeout(t.current)
      t.current = null
    }
  }, [])

  const hide = useCallback(() => {
    clearAll()
    if (shownAt.current) {
      // loader is visible — honour the minimum display beat
      const remain = Math.max(0, MIN_DISPLAY_MS - (Date.now() - shownAt.current))
      minTimer.current = setTimeout(() => {
        shownAt.current = 0
        setNavigating(false)
      }, remain)
    } else {
      // never became visible — cancel the pending show silently
      setNavigating(false)
    }
  }, [clearAll])

  // route committed — the destination page is rendering
  useEffect(() => {
    hide()
    return clearAll // unmount / re-run: no stray timers
  }, [pathname, hide, clearAll])

  const start = useCallback(
    (href: string) => {
      if (!href || href === pathname) return // same page — nothing to wait for
      clearAll()
      safetyTimer.current = setTimeout(hide, SAFETY_TIMEOUT_MS)
      showTimer.current = setTimeout(() => {
        shownAt.current = Date.now()
        setNavigating(true)
      }, SHOW_DELAY_MS)
    },
    [pathname, clearAll, hide],
  )

  return { navigating, start }
}

export function RouteLoader({ show }: { show: boolean }) {
  // portal target exists only in the browser — skip the server render
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  if (!mounted || !show) return null

  return createPortal(
    <div className="route-loader" role="status" aria-live="polite">
      <span className="route-loader__ring" aria-hidden="true" />
      <span className="route-loader__label">Loading…</span>
    </div>,
    document.body,
  )
}
