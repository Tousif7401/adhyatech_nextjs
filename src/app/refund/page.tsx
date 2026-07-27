import type { Metadata } from 'next'
import LegalPage, { type LegalSection } from '@/app/legal/LegalPage'

export const metadata: Metadata = {
  title: 'Refund & Cancellation Policy — Adyatech Solutions',
  description:
    'How cancellations and refunds work for project engagements with Adyatech Solutions.',
}

const sections: LegalSection[] = [
  { id: 'scope', heading: 'What this covers', placeholder: 'That this applies to project engagements / services, and points SaaS users to the product refund page' },
  { id: 'deposits', heading: 'Deposits & advance payments', placeholder: 'Whether deposits are refundable, and under what conditions' },
  { id: 'cancel', heading: 'Cancelling an engagement', placeholder: 'Notice period, how to cancel, effect on scheduled work' },
  { id: 'refund', heading: 'Refund eligibility', placeholder: "When a refund applies, how it's calculated against work completed" },
  { id: 'milestones', heading: 'Milestone-based work', placeholder: 'How paid milestones are treated on cancellation' },
  {
    id: 'contact',
    heading: 'Requesting a refund',
    body: (
      <p>To request a refund or cancel an engagement, contact us with your project reference.</p>
    ),
  },
]

export default function RefundPage() {
  return (
    <LegalPage
      title="Refund & Cancellation Policy"
      subtitle="Refund & Cancellation Policy"
      intro="This policy explains how cancellations and refunds work for project engagements with Adyatech Solutions. For our SaaS products, see the product refund policy."
      sections={sections}
    />
  )
}
