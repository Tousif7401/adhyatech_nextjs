import type { Metadata, Viewport } from 'next'
import { SettingsProvider } from "./context/SettingsContext";
import { getSettings } from "@/lib/settings";
import type { SettingsResponse } from "@/types/setting";
import CookieConsent from "@/components/CookieConsent";


import './globals.css'
import './product-details-v1.css'
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";

const inter = Inter({subsets:['latin'],variable:'--font-sans'});

// Canonical origin of the deployed site — used for metadataBase, OG URLs,
// sitemap.xml and robots.txt. Override with NEXT_PUBLIC_SITE_URL if the
// domain changes.
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://adyatech.com';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: 'Adyatech Solutions — Engineered for the Next Web · Ballari, IN',
  description: 'Adyatech Solutions LLP — 16 years building custom web, software, AI & mobile experiences from Ballari for the world. 400+ clients including Karnataka State Government. Home of Osciva AI and Alumnyo.',
  // Card type default; title/description/images are inherited from each
  // page's openGraph metadata.
  twitter: {
    card: 'summary_large_image',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

// When the CMS is unreachable, render with empty settings instead of
// failing the whole page.
const FALLBACK_SETTINGS: SettingsResponse = {
  phones: [],
  emails: [],
  addresses: [],
  socials: [],
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const settings = await getSettings().catch(() => FALLBACK_SETTINGS);

  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning className={cn("font-sans", inter.variable)}>
      <head>
        <link rel="icon" type="image/svg+xml" href={`${process.env.NEXT_PUBLIC_BASE_PATH || ""}/icon.svg`} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400;12..96,500;12..96,600;12..96,700;12..96,800&family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600&family=Instrument+Serif:ital,wght@0,400;1,400&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <SettingsProvider settings={settings}>
          {children}
        </SettingsProvider>

        <CookieConsent />
      </body>
    </html>
  )
}
