'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { RouteLoader, useRouteLoader } from '@/components/RouteLoader'
import { AssistantRuntimeProvider } from '@assistant-ui/react'
import { useChatRuntime } from '@assistant-ui/ai-sdk'
import { VoiceOrb } from '@/components/orb.aui'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'

interface Message {
  id: number
  from: 'bot' | 'user' | 'form'
  text: string
  time: string
}

// ── quick replies ────────────────────────────────────────────
const QUICK_REPLIES = [
  'What services do you offer?',
  'How do I get a quote?',
  'Tell me about Osciva AI',
  'View portfolio',
]

const CALLBACK_CHIP = 'Get a callback'

// fallback when the AI endpoint can't be reached — still points the visitor somewhere useful
const FALLBACK_REPLY =
  "I'm having trouble answering right now, but our team definitely can. Drop us a line at hello@adyatech.com or request a quote and we'll get back within one business day."

interface HistoryTurn {
  role: 'user' | 'model'
  text: string
}

// site paths the assistant may mention — matched as bare tokens and rendered as links
const ROUTE_RE =
  /(?<![\w\-/])(\/(?:about|alumnyo|careers|contact|cookies|disclaimer|government|insights|osciva|portfolio|privacy-request|privacy|products|quote|refund-products|refund|services|terms)(?:\/[a-z0-9-]+)?)(?![\w-])/gi

// [natural link text](/path) — the assistant's preferred link format
const MD_LINK_RE = /\[([^\]\n]+)\]\((\/[a-zA-Z0-9\-/]*)\)/g

// display names for bare paths that slip through without a label
const ROUTE_NAMES: Record<string, string> = {
  about: 'About us',
  alumnyo: 'Alumnyo',
  careers: 'Careers',
  contact: 'Contact us',
  cookies: 'Cookie policy',
  disclaimer: 'Disclaimer',
  government: 'Government work',
  insights: 'Insights',
  osciva: 'Osciva AI',
  portfolio: 'Portfolio',
  privacy: 'Privacy policy',
  'privacy-request': 'Privacy request',
  products: 'Products',
  quote: 'Get a quote',
  'refund-products': 'Product refunds',
  refund: 'Refund policy',
  services: 'Our services',
  terms: 'Terms',
}

function humanize(slug: string) {
  return slug
    .split('-')
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ')
}

function routeLabel(path: string): string {
  const [, parent, sub] = path.split('/')
  if (sub) {
    if (parent === 'insights') return 'this article'
    if (parent === 'portfolio') return 'this case study'
    if (parent === 'government') return 'this project'
    return humanize(sub)
  }
  return ROUTE_NAMES[parent] ?? humanize(parent)
}

function pushLink(parts: React.ReactNode[], key: string, href: string, label: string) {
  parts.push(
    <Link key={key} href={href}>
      {label}
    </Link>,
  )
}

// bare paths without a label — linkified with their display name
function linkifyBare(segment: string, out: React.ReactNode[], nextKey: () => string) {
  let last = 0
  for (const m of segment.matchAll(ROUTE_RE)) {
    const i = m.index ?? 0
    if (i > last) out.push(segment.slice(last, i))
    pushLink(out, nextKey(), m[0], routeLabel(m[0]))
    last = i + m[0].length
  }
  if (last < segment.length) out.push(segment.slice(last))
}

// turn "[text](/path)" links (and any bare "/path" mentions) into text + <Link> segments
function linkify(text: string) {
  const parts: React.ReactNode[] = []
  let k = 0
  let last = 0

  for (const m of text.matchAll(MD_LINK_RE)) {
    const i = m.index ?? 0
    if (i > last) linkifyBare(text.slice(last, i), parts, () => `bare-${k++}`)
    pushLink(parts, `md-${k++}`, m[2], m[1])
    last = i + m[0].length
  }
  if (last < text.length) linkifyBare(text.slice(last), parts, () => `bare-${k++}`)

  return parts
}

// stream the scope-locked Adyatech assistant's reply (Gemini behind /api/chat)
async function streamAssistant(
  message: string,
  history: HistoryTurn[],
  onDelta: (text: string) => void,
): Promise<void> {
  const ctrl = new AbortController()
  const timer = setTimeout(() => ctrl.abort(), 30_000)
  try {
    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message, history }),
      signal: ctrl.signal,
    })
    if (!res.ok || !res.body) {
      const data = await res.json().catch(() => null)
      throw new Error(data?.error || 'assistant unavailable')
    }
    const reader = res.body.getReader()
    const decoder = new TextDecoder()
    for (;;) {
      const { done, value } = await reader.read()
      if (done) break
      const chunk = decoder.decode(value, { stream: true })
      if (chunk) onDelta(chunk)
    }
    const last = decoder.decode()
    if (last) onDelta(last)
  } finally {
    clearTimeout(timer)
  }
}

function now() {
  return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}

const INITIAL_MESSAGE: Message = {
  id: 0,
  from: 'bot',
  text: "Hey 👋 I'm the Adyatech assistant. Ask me anything about our services, products, or how to get started.",
  time: now(),
}

// bot copy that precedes the inline form
const FORM_INVITE =
  '☏ Want a callback? Leave your details right here, and an advisor will reach out within one business day.'

export default function ChatWidget() {
  const [open, setOpen]       = useState(false)
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE])
  const [input, setInput]     = useState('')
  const [typing, setTyping]   = useState(false)
  const [receiving, setReceiving] = useState(false) // bot text is streaming in
  const [unread, setUnread]   = useState(0)
  const [formSent, setFormSent] = useState(false) // invite + form in the stream
  const [formDone, setFormDone] = useState(false) // form submitted

  // lead form state (website = honeypot, hidden from humans)
  const [lead, setLead]       = useState({ name: '', email: '', phone: '', message: '', website: '' })
  const [leadErr, setLeadErr] = useState<Partial<typeof lead>>({})
  const [submitting, setSubmitting] = useState(false)

  const bottomRef  = useRef<HTMLDivElement>(null)
  const inputRef   = useRef<HTMLInputElement>(null)
  const idRef      = useRef(1)

  // timestamps come from the clock — render them only after hydration
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  // ── route-change loader: shown while a clicked chat link loads ──
  const { navigating, start } = useRouteLoader()

  // click anywhere in the stream — catch chat links via delegation
  const handleBodyClick = (e: React.MouseEvent) => {
    const anchor = (e.target as HTMLElement).closest?.('a')
    if (!anchor) return
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return // new-tab clicks
    const href = anchor.getAttribute('href')
    if (!href?.startsWith('/')) return // internal routes only
    start(href)
  }

  // runtime ancestor required by @assistant-ui/voice — no voice adapter yet,
  // the orb renders with an explicit state
  const runtime = useChatRuntime()

  // focus input when chat opens
  useEffect(() => {
    if (open) {
      setUnread(0)
      setTimeout(() => inputRef.current?.focus(), 120)
    }
  }, [open])

  // scroll to bottom on new messages
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, typing])

  // inject the form into the stream
  const injectForm = useCallback(
    (withInvite: boolean) => {
      setFormSent(true)
      setMessages(prev => [
        ...prev,
        ...(withInvite
          ? [{ id: idRef.current++, from: 'bot' as const, text: FORM_INVITE, time: now() }]
          : []),
        { id: idRef.current++, from: 'form' as const, text: '', time: now() },
      ])
      if (!open) setUnread(n => n + 1)
    },
    [open],
  )

  // after 3 user messages, offer the form
  const userMsgCount = messages.filter(m => m.from === 'user').length
  useEffect(() => {
    if (userMsgCount >= 3 && !formSent) {
      const t = setTimeout(() => injectForm(true), 600)
      return () => clearTimeout(t)
    }
  }, [userMsgCount, formSent, injectForm])

  const send = useCallback(
    (text: string) => {
      const trimmed = text.trim()
      if (!trimmed || typing) return

      const userMsg: Message = { id: idRef.current++, from: 'user', text: trimmed, time: now() }
      setMessages(prev => [...prev, userMsg])
      setInput('')
      setTyping(true)

      // last 10 talk messages as conversation context (form entries excluded)
      const history: HistoryTurn[] = messages
        .filter(m => m.from === 'bot' || m.from === 'user')
        .slice(-10)
        .map(m => ({ role: m.from === 'user' ? ('user' as const) : ('model' as const), text: m.text }))

      const botId = idRef.current++ // the streaming reply claims its slot up front
      let started = false

      streamAssistant(trimmed, history, delta => {
        if (!started) {
          // first chunk — swap the typing dots for the growing bubble
          started = true
          setTyping(false)
          setReceiving(true)
          setMessages(prev => [
            ...prev,
            { id: botId, from: 'bot' as const, text: delta, time: now() },
          ])
        } else {
          setMessages(prev => prev.map(m => (m.id === botId ? { ...m, text: m.text + delta } : m)))
        }
      })
        .catch(() => {
          if (started) {
            // died mid-stream — close the bubble off gracefully
            setMessages(prev =>
              prev.map(m => (m.id === botId ? { ...m, text: m.text.trimEnd() + ' …' } : m)),
            )
          } else {
            setMessages(prev => [
              ...prev,
              { id: idRef.current++, from: 'bot' as const, text: FALLBACK_REPLY, time: now() },
            ])
          }
        })
        .finally(() => {
          setTyping(false)
          setReceiving(false)
          if (!open) setUnread(n => n + 1)
        })
    },
    [messages, typing, open],
  )

  const handleChatSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    send(input)
  }

  // ── lead form validation — mirrors the /contact page rules ──
  const fieldError = (field: 'name' | 'email' | 'phone', value: string): string | undefined => {
    const v = value.trim()
    switch (field) {
      case 'name':
        if (!v) return 'Name is required'
        break
      case 'email':
        if (!/^\S+@\S+\.\S+$/.test(v)) return 'Valid email required'
        break
      case 'phone':
        if (v) {
          if (!/^[\d\s\-\+\(\)]{10,}$/.test(v)) return 'Please enter a valid phone number (min 10 digits)'
          if (v.replace(/[^\d]/g, '').length > 15) return 'Phone number cannot exceed 15 digits'
        }
        break
    }
    return undefined
  }

  const validateLead = () => {
    const errs: Partial<typeof lead> = {}
    ;(['name', 'email', 'phone'] as const).forEach(f => {
      const e = fieldError(f, lead[f])
      if (e) errs[f] = e
    })
    setLeadErr(errs)
    return Object.keys(errs).length === 0
  }

  // check a single field when the visitor leaves it
  const blurCheck = (field: 'name' | 'email' | 'phone') => {
    const e = fieldError(field, lead[field])
    setLeadErr(prev => ({ ...prev, [field]: e }))
  }

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateLead()) return
    setSubmitting(true)
    try {
      const res = await fetch('/api/chat-lead', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify(lead),
      })
      if (!res.ok) {
        const data = await res.json().catch(() => null)
        throw new Error(data?.error || 'Something went wrong. Please try again.')
      }

      const first = lead.name.trim().split(/\s+/)[0]
      setFormDone(true)
      setMessages(prev => [
        ...prev,
        {
          id: idRef.current++,
          from: 'bot',
          text: `✓ Got it${first ? ', ' + first : ''}. An advisor will reach out at ${lead.email} within one business day.`,
          time: now(),
        },
      ])
    } catch (err) {
      setLeadErr({ message: err instanceof Error ? err.message : 'Something went wrong. Please try again.' })
    } finally {
      setSubmitting(false)
    }
  }

  const updateLead = (k: keyof typeof lead, v: string) => {
    setLead(prev => ({ ...prev, [k]: v }))
    setLeadErr(prev => ({ ...prev, [k]: undefined }))
  }

  // ── render ───────────────────────────────────────────────────
  return (
    <AssistantRuntimeProvider runtime={runtime}>
      {/* ── Panel ── */}
      <div
        className={`chat-panel${open ? ' chat-panel--open' : ''}`}
        role="dialog"
        aria-label="Chat with Adyatech"
      >
        {/* Header */}
        <div className="chat-panel__head">
          <div className="chat-panel__brand">
            <VoiceOrb state="speaking" variant="brand" className="size-16" />
            <div>
              <strong>Adyatech Assistant</strong>
              <span>Typically replies instantly</span>
            </div>
          </div>
          <div className="chat-panel__head-actions">
            {!formSent && !formDone && (
              <button
                className="chat-panel__advisor-btn"
                onClick={() => injectForm(true)}
                title="Get a callback"
              >
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <rect x="4.75" y="1.75" width="6.5" height="12.5" rx="1.6" stroke="currentColor" strokeWidth="1.5"/>
                  <path d="M7 12.25h2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </button>
            )}
            <button
              className="chat-panel__close"
              onClick={() => setOpen(false)}
              aria-label="Close chat"
            >
              ✕
            </button>
          </div>
        </div>

        {/* ── CHAT STREAM ── */}
        <div className="chat-panel__body" onClick={handleBodyClick}>
          {messages.map(msg =>
            msg.from === 'form' ? (
              /* ── the lead form, living inside the conversation ── */
              <div key={msg.id} className="chat-msg chat-msg--bot">
                <span className="chat-msg__avatar chat-msg__avatar--logo">
                  <img src={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}/icon.svg`} alt="" />
                </span>
                <div className={`chat-msg__bubble chat-msg__bubble--form${formDone ? ' is-done' : ''}`}>
                  {formDone ? (
                    <p className="chat-form-done__text">✓ Details received — we&apos;ll be in touch.</p>
                  ) : (
                    <form className="chat-lead-form chat-lead-form--inline" onSubmit={handleLeadSubmit} noValidate>
                      {/* honeypot — hidden from humans, catches spam bots */}
                      <input
                        type="text"
                        name="website"
                        value={lead.website}
                        onChange={e => updateLead('website', e.target.value)}
                        className="chat-hp"
                        tabIndex={-1}
                        autoComplete="off"
                        aria-hidden="true"
                      />

                      <div className="chat-lead-field">
                        <label htmlFor="cl-name">Your name <span>*</span></label>
                        <input
                          id="cl-name"
                          type="text"
                          value={lead.name}
                          onChange={e => updateLead('name', e.target.value)}
                          onBlur={() => blurCheck('name')}
                          placeholder="Full name"
                          className={leadErr.name ? 'is-error' : ''}
                        />
                        {leadErr.name && <span className="chat-lead-field__err">{leadErr.name}</span>}
                      </div>

                      <div className="chat-lead-field">
                        <label htmlFor="cl-email">Work email <span>*</span></label>
                        <input
                          id="cl-email"
                          type="email"
                          value={lead.email}
                          onChange={e => updateLead('email', e.target.value)}
                          onBlur={() => blurCheck('email')}
                          placeholder="you@company.com"
                          className={leadErr.email ? 'is-error' : ''}
                        />
                        {leadErr.email && <span className="chat-lead-field__err">{leadErr.email}</span>}
                      </div>

                      <div className="chat-lead-field">
                        <label htmlFor="cl-phone">Phone / WhatsApp</label>
                        <input
                          id="cl-phone"
                          type="tel"
                          value={lead.phone}
                          onChange={e => updateLead('phone', e.target.value)}
                          onBlur={() => blurCheck('phone')}
                          placeholder="+91 …"
                          className={leadErr.phone ? 'is-error' : ''}
                        />
                        {leadErr.phone && <span className="chat-lead-field__err">{leadErr.phone}</span>}
                      </div>

                      <p className="chat-lead-form__consent">
                        By submitting you agree to our <a href="/privacy" target="_blank">privacy policy</a>. We never spam.
                      </p>

                      <button
                        type="submit"
                        className="chat-lead-form__submit"
                        disabled={submitting}
                      >
                        {submitting ? 'Sending…' : 'Request a callback →'}
                      </button>

                      <a href="/quote" className="chat-lead-form__alt">
                        Need a detailed quote instead? ↗
                      </a>
                    </form>
                  )}
                </div>
              </div>
            ) : (
              <div key={msg.id} className={`chat-msg chat-msg--${msg.from}`}>
                {msg.from === 'bot' && <span className="chat-msg__avatar chat-msg__avatar--logo">
                  <img src={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}/icon.svg`} alt="" />
                </span>}
                <div className="chat-msg__bubble">
                  {msg.text
                    .split('\n')
                    .filter(Boolean)
                    .map((line, i) => (
                      <p key={i}>{msg.from === 'bot' ? linkify(line) : line}</p>
                    ))}
                  <time>{mounted ? msg.time : ''}</time>
                </div>
              </div>
            ),
          )}

          {typing && !receiving && (
            <div className="chat-msg chat-msg--bot">
              <span className="chat-msg__avatar chat-msg__avatar--logo">
                  <img src={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}/icon.svg`} alt="" />
                </span>
              <div className="chat-msg__bubble chat-msg__bubble--typing">
                <span /><span /><span />
              </div>
            </div>
          )}

          <div ref={bottomRef} />
        </div>

        {/* Quick replies + callback chip */}
        {!typing && (
          <div className="chat-panel__quick">
            {QUICK_REPLIES.map(q => (
              <button key={q} className="chat-quick-btn" onClick={() => send(q)}>
                {q}
              </button>
            ))}
            {!formSent && !formDone && (
              <button className="chat-quick-btn chat-quick-btn--callback" onClick={() => injectForm(true)}>
                <svg width="11" height="11" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <rect x="4.75" y="1.75" width="6.5" height="12.5" rx="1.6" stroke="currentColor" strokeWidth="1.5"/>
                  <path d="M7 12.25h2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
                {CALLBACK_CHIP}
              </button>
            )}
          </div>
        )}

        {/* Input */}
        <form className="chat-panel__foot" onSubmit={handleChatSubmit}>
          <input
            ref={inputRef}
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Ask anything…"
            autoComplete="off"
            aria-label="Chat message"
          />
          <button type="submit" aria-label="Send" disabled={!input.trim()}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M14 8L2 2l2.5 6L2 14l12-6z" fill="currentColor" />
            </svg>
          </button>
        </form>
      </div>

      {/* ── FAB trigger ── */}
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger
            render={
              <button
                className={`chat-fab${open ? ' chat-fab--open' : ''}`}
                onClick={() => setOpen(o => !o)}
                aria-label={open ? 'Close chat' : 'Open chat'}
              >
                {unread > 0 && !open && (
                  <span className="chat-fab__badge">{unread}</span>
                )}
                <span className="chat-fab__icon chat-fab__icon--open" aria-hidden="true">
                  <VoiceOrb state="speaking" variant="brand" className="size-32" />
                </span>
                <span className="chat-fab__icon chat-fab__icon--close" aria-hidden="true">✕</span>
              </button>
            }
          />
          <TooltipContent
            side="top"
            className="border border-[rgba(245,242,234,0.12)] bg-[#1F252C] text-[#F0E8D6]"
          >
            {open ? 'Close chat' : 'Talk with AI'}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      {/* route-change loader — shown until the clicked page renders */}
      <RouteLoader show={navigating} />
    </AssistantRuntimeProvider>
  )
}
