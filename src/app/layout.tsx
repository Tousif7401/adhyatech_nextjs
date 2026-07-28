import type { Metadata } from 'next'
import { SettingsProvider } from "./context/SettingsContext";
import { getSettings } from "@/lib/settings";


import './globals.css'
import './product-details-v1.css'

export const metadata: Metadata = {
  title: 'Adyatech Solutions — Engineered for the Next Web · Ballari, IN',
  description: 'Adyatech Solutions LLP — 16 years building custom web, software, AI & mobile experiences from Ballari for the world. 400+ clients including Karnataka State Government. Home of Osciva AI and Alumnyo.',
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
  },
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const settings = await getSettings();

  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <head>
        <link rel="icon" type="image/png" href={`${process.env.NEXT_PUBLIC_BASE_PATH || ""}/assets/logo/adyatech-logo-light.png`} />
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
      </body>
    </html>
  )
}
