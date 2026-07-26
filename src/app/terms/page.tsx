import UtilityBar from '@/app/components/UtilityBar'
import Header from '@/app/components/Header'
import { Footer } from '@/app/components/Sections4'
import type { Metadata } from 'next'
import LegalPage, { type LegalSection } from '@/app/legal/LegalPage'

export const metadata: Metadata = {
  title: 'Terms of Service — Adyatech Solutions',
  description:
    'The terms governing use of the Adyatech Solutions website and engagements with us.',
}

const sections: LegalSection[] = [
  { id: 'acceptance', heading: 'Acceptance of terms', placeholder: 'Explain that using the site or engaging Adyatech constitutes acceptance of these terms' },
  { id: 'services', heading: 'Our services', placeholder: 'Describe the services Adyatech provides — web, software, AI, mobile — and any limits' },
  { id: 'engagement', heading: 'Engagements & scope', placeholder: 'How projects are scoped, quoted, and agreed; what a signed proposal covers' },
  { id: 'payment', heading: 'Payment terms', placeholder: 'Invoicing schedule, milestones, late payment, currency, taxes' },
  { id: 'ip', heading: 'Intellectual property', placeholder: 'Who owns delivered work, when ownership transfers, licences to pre-existing tools' },
  { id: 'liability', heading: 'Limitation of liability', placeholder: 'Standard limitation clause — cap on liability, exclusions' },
  { id: 'termination', heading: 'Termination', placeholder: 'How either party may end an engagement and what happens to work in progress' },
  {
    id: 'law',
    heading: 'Governing law',
    body: (
      <p>
        These terms are governed by the laws of India, with jurisdiction in the
        courts of Ballari, Karnataka.
      </p>
    ),
  },
]

export default function TermsPage() {
  return (
    <>
      <UtilityBar />
      <Header />
      <LegalPage
        title="Terms of Service"
        subtitle="Terms of Service"
        intro="These terms govern your use of the Adyatech Solutions website and any engagement you enter into with us. Please read them carefully."
        sections={sections}
      />
      <Footer />
    </>
  )
}
