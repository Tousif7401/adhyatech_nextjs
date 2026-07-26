import type { Metadata } from 'next'
import LegalPage, { type LegalSection } from '@/app/legal/LegalPage'

export const metadata: Metadata = {
  title: 'Product Refund Policy — Adyatech Solutions',
  description:
    'Refunds and cancellations for Adyatech SaaS products, including Osciva AI and Alumnyo.',
}

const sections: LegalSection[] = [
  { id: 'scope', heading: 'Products this covers', placeholder: 'List the SaaS products — Osciva, Alumnyo — this policy applies to' },
  { id: 'trials', heading: 'Free trials', placeholder: 'Trial length, what happens at the end, no charge during trial' },
  { id: 'billing', heading: 'Subscription & billing', placeholder: 'Annual/monthly billing, renewal, price shown at purchase — reference your pricing e.g. Alumnyo ₹49,000/yr' },
  { id: 'cancel', heading: 'Cancelling a subscription', placeholder: 'How a customer cancels, when access ends, no auto-refund of the current term unless stated' },
  { id: 'refund', heading: 'Refund eligibility', placeholder: 'Window for refunds after purchase, pro-rata rules if any' },
  {
    id: 'contact',
    heading: 'Requesting a refund',
    body: (
      <p>To cancel or request a refund on a product subscription, contact us with your account email.</p>
    ),
  },
]

export default function ProductRefundPage() {
  return (
    <LegalPage
      title="Product Refund Policy"
      subtitle="Product Refund Policy"
      intro="This policy explains refunds and cancellations for Adyatech's SaaS products, including Osciva AI and Alumnyo. For project engagements, see our main refund policy."
      sections={sections}
    />
  )
}
