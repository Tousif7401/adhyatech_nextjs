import type { Metadata } from 'next'
import LegalPage, { type LegalSection } from '@/app/legal/LegalPage'

export const metadata: Metadata = {
  title: 'Cookie Policy — Adyatech Solutions',
  description: 'How adyatech.com uses cookies and how you can manage them.',
}

const sections: LegalSection[] = [
  {
    id: 'what',
    heading: 'What cookies are',
    body: (
      <p>
        Cookies are small text files stored on your device when you visit a website.
        They help the site remember your actions and preferences over time.
      </p>
    ),
  },
  { id: 'types', heading: 'Types of cookies we use', placeholder: 'Essential, analytics, preference cookies — what each does. A table works well here' },
  {
    id: 'manage',
    heading: 'Managing cookies',
    body: (
      <p>
        You can control and delete cookies through your browser settings. Blocking
        essential cookies may affect how the site works.
      </p>
    ),
  },
  { id: 'thirdparty', heading: 'Third-party cookies', placeholder: 'Analytics or embedded services that set their own cookies' },
  {
    id: 'changes',
    heading: 'Changes to this policy',
    body: (
      <p>
        We may update this policy as our use of cookies changes. The date above
        reflects the latest revision.
      </p>
    ),
  },
]

export default function CookiesPage() {
  return (
    <LegalPage
      title="Cookie Policy"
      subtitle="Cookie Policy"
      intro="This policy explains how adyatech.com uses cookies and similar technologies, and how you can manage them."
      sections={sections}
    />
  )
}
