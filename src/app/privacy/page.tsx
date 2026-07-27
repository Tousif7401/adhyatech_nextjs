import type { Metadata } from 'next'
import Link from 'next/link'
import LegalPage, { type LegalSection } from '@/app/legal/LegalPage'

export const metadata: Metadata = {
  title: 'Privacy Policy — Adyatech Solutions',
  description:
    'What personal information Adyatech Solutions collects, how we use it, and your choices.',
}

const sections: LegalSection[] = [
  { id: 'collect', heading: 'What information we collect', placeholder: 'Personal data collected via forms, email, analytics — name, email, company, message, IP, usage' },
  { id: 'use', heading: 'How we use your information', placeholder: 'Responding to enquiries, delivering projects, improving the site, legal obligations' },
  { id: 'share', heading: 'When we share information', placeholder: 'Third parties you use — hosting, analytics, payment — and that you never sell data' },
  {
    id: 'cookies',
    heading: 'Cookies',
    body: (
      <p>
        We use cookies as described in our <Link href="/cookies">Cookie Policy</Link>.
      </p>
    ),
  },
  { id: 'security', heading: 'How we protect your data', placeholder: 'Security measures — encryption, access control, hosting' },
  { id: 'rights', heading: 'Your rights', placeholder: 'Access, correction, deletion, objection — how a person exercises them' },
  { id: 'retention', heading: 'Data retention', placeholder: 'How long you keep data and why' },
  {
    id: 'contact',
    heading: 'Contacting us',
    body: <p>To exercise any right or ask a question, contact us using the details below.</p>,
  },
]

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      subtitle="Privacy Policy"
      intro="This policy explains what personal information Adyatech Solutions collects, how we use it, and the choices you have. It applies to adyatech.com and our client engagements."
      sections={sections}
    />
  )
}
