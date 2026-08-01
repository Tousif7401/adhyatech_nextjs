import type { CSSProperties } from 'react'

type Ratio = '16/10' | '4/3' | '16/9' | '21/9'

const RATIO_CLASS: Record<Ratio, string> = {
  '16/10': 'shot--1610',
  '4/3':   'shot--43',
  '16/9':  'shot--169',
  '21/9':  'shot--219',
}

interface BrowserFrameProps {
  /** Raw filename from admin, e.g. "bks-hospital.webp" — or a full URL */
  image: string
  /** Used as alt text */
  title: string
  /** Shown in the URL bar. Protocol and trailing slash are stripped. */
  siteUrl?: string | null
  /** Green pulsing dot when true, red when false */
  isLive?: boolean
  ratio?: Ratio
  /** Hide the chrome bar entirely (rare — e.g. mobile app screenshots) */
  showChrome?: boolean
  className?: string
  style?: CSSProperties
}

export default function BrowserFrame({
  image,
  title,
  siteUrl,
  isLive = true,
  ratio = '16/10',
  showChrome = true,
  className = '',
  style,
}: BrowserFrameProps) {
  const safeSrc = src?.startsWith('http://')
    ? src.replace('http://', 'https://')
    : `${process.env.NEXT_PUBLIC_STORAGE_URL || ''}/${image}`

  const displayUrl =
    siteUrl?.replace(/^https?:\/\//, '').replace(/\/$/, '') || 'adyatech.com'

  return (
    <div
      className={`shot ${RATIO_CLASS[ratio]} ${className}`.trim()}
      style={style}
    >
      {showChrome && (
        <div className="shot__chrome">
          <span className="shot__dot shot__dot--r" />
          <span className="shot__dot shot__dot--y" />
          <span className="shot__dot shot__dot--g" />
          <span className="shot__url">{displayUrl}</span>
          <span className={`shot__status shot__status--${isLive ? 'live' : 'off'}`}>
            <span className="shot__status-dot" />
            <span className="shot__status-label">
              {isLive ? 'Live' : 'Archived'}
            </span>
          </span>
        </div>
      )}
      <div className="shot__viewport">
        <img src={src} alt={title} loading="lazy" />
      </div>
    </div>
  )
}
