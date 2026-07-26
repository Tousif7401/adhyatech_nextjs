import type { Metadata } from 'next'
import LegalPage, { type LegalSection } from '@/app/legal/LegalPage'
import UtilityBar from '@/app/components/UtilityBar'
import Header from '@/app/components/Header'
import { Footer } from '@/app/components/Sections4'

export const metadata: Metadata = {
  title: 'Disclaimer — Adyatech Solutions',
  description: 'The terms on which you rely on information provided on adyatech.com.',
}

const sections: LegalSection[] = [
  { id: 'general', heading: 'General disclaimer', placeholder: 'The site and its content are provided on an as-is basis' },
  { id: 'accuracy', heading: 'Accuracy of information', placeholder: "You strive for accuracy but don't warrant completeness; content may change" },
  {
    id: 'external',
    heading: 'External links',
    body: (
      <p>
        Our site may link to third-party websites. We are not responsible for their
        content or practices.
      </p>
    ),
  },
  { id: 'professional', heading: 'No professional advice', placeholder: 'Content is informational, not legal/financial/technical advice for a specific situation' },
  { id: 'liability', heading: 'Limitation of liability', placeholder: 'You are not liable for losses arising from use of the site' },
]

export default function DisclaimerPage() {
  return (
    <>
      <UtilityBar />
      <Header />
      <LegalPage
        title="Disclaimer"
        subtitle="Disclaimer"
        intro="The information on this website is provided in good faith and for general information only. This disclaimer sets out the terms on which you rely on it."
        sections={sections}
      />
      <Footer />
    </>
  )
}
