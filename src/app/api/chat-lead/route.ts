import { NextResponse } from 'next/server'
import crypto from 'crypto'

// Chat-widget lead capture → appends a row to a Google Sheet.
// Zero-dependency: the service-account JWT is signed with node:crypto,
// exchanged for an access token, and the Sheets REST API does the append.
// Setup guide: docs/google-sheets-leads.md

export const runtime = 'nodejs'

const SHEET_HEADERS = ['Received at (IST)', 'Name', 'Email', 'Phone', 'Message', 'Source']
const SCOPE = 'https://www.googleapis.com/auth/spreadsheets'
const TOKEN_URL = 'https://oauth2.googleapis.com/token'

// ── service account → access token (cached until ~1 min before expiry) ──
let cachedToken: { token: string; expiresAt: number } | null = null

async function getAccessToken(): Promise<string> {
  if (cachedToken && Date.now() < cachedToken.expiresAt) return cachedToken.token

  const clientEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL
  const privateKey = (process.env.GOOGLE_PRIVATE_KEY || '').replace(/\n/g, '\n')
  if (!clientEmail || !privateKey) {
    throw new Error('GOOGLE_SERVICE_ACCOUNT_EMAIL / GOOGLE_PRIVATE_KEY are not set')
  }

  const iat = Math.floor(Date.now() / 1000)
  const header = Buffer.from(JSON.stringify({ alg: 'RS256', typ: 'JWT' })).toString('base64url')
  const payload = Buffer.from(
    JSON.stringify({ iss: clientEmail, scope: SCOPE, aud: TOKEN_URL, iat, exp: iat + 3600 }),
  ).toString('base64url')
  const signature = crypto
    .createSign('RSA-SHA256')
    .update(`${header}.${payload}`)
    .sign(privateKey, 'base64url')

  const res = await fetch(TOKEN_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion: `${header}.${payload}.${signature}`,
    }),
  })
  if (!res.ok) throw new Error(`Google token exchange failed (${res.status})`)

  const data = await res.json()
  cachedToken = {
    token: data.access_token,
    expiresAt: Date.now() + (Number(data.expires_in) - 60) * 1000,
  }
  return cachedToken.token
}

// ── write the header row once (bolded), if the tab is still empty ──
async function ensureHeaders(token: string, tab: string, sheetId: string) {
  const range = encodeURIComponent(`${tab}!A1:Z1`)
  const get = await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${range}`,
    { headers: { Authorization: `Bearer ${token}` } },
  )
  const data = await get.json().catch(() => null)
  if (get.ok && Array.isArray(data?.values) && data.values.length > 0) return

  await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${encodeURIComponent(
      `${tab}!A1`,
    )}?valueInputOption=RAW`,
    {
      method: 'PUT',
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ values: [SHEET_HEADERS] }),
    },
  )

  // bold the header row — cosmetic, best effort. Resolve the tab's numeric id first.
  const meta = await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}?fields=sheets.properties`,
    { headers: { Authorization: `Bearer ${token}` } },
  )
  const metaJson: { sheets?: { properties?: { title?: string; sheetId?: number } }[] } | null =
    await meta.json().catch(() => null)
  const tabId = metaJson?.sheets?.find(s => s.properties?.title === tab)?.properties?.sheetId
  if (tabId === undefined) return

  const fmt = await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}:batchUpdate`,
    {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        requests: [{
          repeatCell: {
            range: {
              sheetId: tabId,
              startRowIndex: 0,
              endRowIndex: 1,
              startColumnIndex: 0,
              endColumnIndex: SHEET_HEADERS.length,
            },
            cell: { userEnteredFormat: { textFormat: { bold: true } } },
            fields: 'userEnteredFormat.textFormat.bold',
          },
        }],
      }),
    },
  )
  if (!fmt.ok) console.error('[chat-lead] header bold failed:', fmt.status, await fmt.text())
}

// ── WhatsApp ping to the owner on each lead (via CallMeBot, free) ──
// Activated by WHATSAPP_PHONE (+91XXXXXXXXXX) + WHATSAPP_APIKEY in
// .env.local — setup steps in docs/google-sheets-leads.md.
// Best-effort: a WhatsApp failure never blocks or fails the saved lead.
async function notifyWhatsApp(name: string, email: string, phone: string, message: string) {
  const to = process.env.WHATSAPP_PHONE
  const apikey = process.env.WHATSAPP_APIKEY
  if (!to || !apikey) return

  const text =
    `🔔 New website lead\n` +
    `Name: ${name}\n` +
    `Email: ${email}\n` +
    (phone ? `Phone: ${phone}\n` : '') +
    (message ? `Message: ${message}` : '')

  try {
    await fetch(
      `https://api.callmebot.com/whatsapp.php?phone=${encodeURIComponent(to)}` +
        `&apikey=${encodeURIComponent(apikey)}&text=${encodeURIComponent(text)}`,
      { signal: AbortSignal.timeout(4000) },
    )
  } catch (err) {
    console.error('[chat-lead] WhatsApp notify failed (lead still saved):', err)
  }
}

export async function POST(req: Request) {
  let body: Record<string, unknown>
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }

  // honeypot — hidden field humans never fill; pretend success so bots move on
  if (typeof body.website === 'string' && body.website.trim() !== '') {
    return NextResponse.json({ ok: true })
  }

  const name = String(body.name ?? '').trim()
  const email = String(body.email ?? '').trim()
  const phone = String(body.phone ?? '').trim()
  const message = String(body.message ?? '').trim()
  const source = String(body.source ?? 'chat-widget').trim().slice(0, 40) || 'chat-widget'

  if (!name || !/\S+@\S+\.\S+/.test(email)) {
    return NextResponse.json({ error: 'Name and a valid email are required.' }, { status: 422 })
  }

  const sheetId = process.env.GOOGLE_SHEET_ID
  const clientEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL
  const privateKey = process.env.GOOGLE_PRIVATE_KEY
  if (!sheetId || !clientEmail || !privateKey) {
    console.error('[chat-lead] Google Sheets env vars are not set — see docs/google-sheets-leads.md')
    return NextResponse.json({ error: 'Lead capture is not configured yet.' }, { status: 500 })
  }

  const tab = process.env.GOOGLE_SHEET_TAB || 'Sheet1'

  try {
    const token = await getAccessToken()
    await ensureHeaders(token, tab, sheetId)

    const receivedAt = new Date().toLocaleString('en-IN', {
      timeZone: 'Asia/Kolkata',
      hour12: false,
    })

    const res = await fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${encodeURIComponent(
        `${tab}!A:G`,
      )}:append?valueInputOption=RAW&insertDataOption=INSERT_ROWS`,
      {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          values: [[receivedAt, name, email, phone, message || '—', source]],
        }),
      },
    )
    if (!res.ok) {
      console.error('[chat-lead] Sheets append failed:', res.status, await res.text())
      return NextResponse.json(
        { error: 'Could not save your details. Please try again.' },
        { status: 502 },
      )
    }

    await notifyWhatsApp(name, email, phone, message || '—')

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('[chat-lead]', err)
    return NextResponse.json({ error: 'Something went wrong. Please try again.' }, { status: 500 })
  }
}
