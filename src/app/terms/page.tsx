import type { Metadata } from 'next'
import LegalPage, { type LegalSection } from '@/app/legal/LegalPage'

export const metadata: Metadata = {
  title: 'Terms of Service — Adyatech Solutions',
  description: 'The terms governing use of the Adyatech Solutions website and engagements with us.',
}

const sections: LegalSection[] = [
  {
    id: 'effective-date',
    heading: 'Effective Date',
    body: <p>July 25, 2026</p>,
  },
  {
    id: 'introduction',
    heading: 'Introduction',
    body: (
      <>
        <p>Welcome to Adyatech Solutions LLP ("Adyatech", "we", "our", or "us"). These Terms of Service ("Terms") govern your access to and use of our website, products, software, applications, and professional services. Please read these Terms carefully before using our website or engaging our services.</p>
        <p>By accessing our website, requesting a quotation, submitting an enquiry, signing a proposal, purchasing our services, or otherwise engaging with Adyatech Solutions LLP, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service. If you do not agree with these Terms, you should refrain from using our website or engaging our services.</p>
        <p>These Terms apply to all individuals, businesses, institutions, government organizations, non-profit organizations, and international clients who interact with Adyatech Solutions LLP.</p>
      </>
    ),
  },
  {
    id: 'acceptance',
    heading: '1. Acceptance of Terms',
    body: (
      <>
        <p>Your use of this website or engagement with Adyatech Solutions LLP constitutes your acceptance of these Terms of Service, our Privacy Policy, and any additional agreements that may apply to specific services or projects.</p>
        <p>Acceptance may occur through, but is not limited to:</p>
        <ul>
          <li>Accessing or browsing our website.</li>
          <li>Submitting a contact or quotation request.</li>
          <li>Accepting a proposal or quotation.</li>
          <li>Issuing a purchase order or work order.</li>
          <li>Making an advance or milestone payment.</li>
          <li>Providing written or electronic approval to commence work.</li>
          <li>Continuing to use any software, website, application, or service delivered by Adyatech.</li>
        </ul>
        <p>These Terms apply equally to clients located within Ballari, Karnataka, across India, and internationally. Where local laws impose additional consumer or commercial protections, those laws shall apply only to the extent required.</p>
      </>
    ),
  },
  {
    id: 'services',
    heading: '2. Our Services',
    body: (
      <>
        <p>Adyatech Solutions LLP provides professional technology consulting and software development services, including but not limited to:</p>
        <ul>
          <li>Website Design & Development</li>
          <li>Corporate and Government Portals</li>
          <li>Custom Software Development</li>
          <li>Enterprise Applications</li>
          <li>Mobile Application Development</li>
          <li>Artificial Intelligence (AI) Solutions</li>
          <li>SaaS Product Development</li>
          <li>UI/UX Design</li>
          <li>E-Commerce Solutions</li>
          <li>API Development & Integrations</li>
          <li>Cloud Deployment & Hosting Support</li>
          <li>Digital Marketing Services</li>
          <li>Search Engine Optimization (SEO)</li>
          <li>Website Maintenance & Annual Maintenance Contracts (AMC)</li>
          <li>Technical Consulting and IT Advisory Services</li>
        </ul>
        <p>Unless specifically stated in a written agreement, our services do not include ongoing maintenance, content updates, hosting, domain renewals, third-party licensing, technical support, or future feature enhancements after project delivery.</p>
        <p>We reserve the right to modify, discontinue, improve, or replace any service offering at our discretion.</p>
      </>
    ),
  },
  {
    id: 'engagements',
    heading: '3. Engagements & Scope',
    body: (
      <>
        <p>Every project begins with an agreed scope of work documented through a proposal, quotation, statement of work, agreement, purchase order, or other written communication accepted by both parties.</p>
        <p>The agreed scope typically defines:</p>
        <ul>
          <li>Project objectives</li>
          <li>Deliverables</li>
          <li>Features and functionality</li>
          <li>Timelines</li>
          <li>Milestones</li>
          <li>Pricing</li>
          <li>Payment schedule</li>
          <li>Client responsibilities</li>
          <li>Acceptance criteria</li>
        </ul>
        <p>Any request that extends beyond the agreed scope shall be treated as a change request and may require revised timelines, additional fees, or a separate agreement.</p>
        <p>Clients are responsible for providing timely approvals, content, branding materials, access credentials, feedback, and any information reasonably required to complete the project. Delays in providing these may result in revised delivery schedules without liability to Adyatech.</p>
        <p>Verbal discussions, informal messages, or assumptions shall not modify the agreed project scope unless confirmed in writing.</p>
      </>
    ),
  },
  {
    id: 'payment',
    heading: '4. Payment Terms',
    body: (
      <>
        <p>Unless otherwise agreed in writing, projects are invoiced according to the approved quotation or proposal.</p>
        <p>Payments may include:</p>
        <ul>
          <li>Advance payment before project commencement.</li>
          <li>Milestone-based payments during project execution.</li>
          <li>Final payment before deployment, handover, or source code transfer.</li>
          <li>AMC or subscription payments as agreed.</li>
        </ul>
        <p>Payments may be made through:</p>
        <ul>
          <li>Bank Transfer</li>
          <li>NEFT / RTGS / IMPS</li>
          <li>UPI</li>
          <li>Cheque</li>
          <li>Other mutually accepted payment methods</li>
        </ul>
        <p>Applicable taxes, including GST or other statutory taxes, shall be charged where required under applicable laws.</p>
        <p>Invoices are payable within the period specified on the invoice or agreement. Delayed payments may result in:</p>
        <ul>
          <li>Suspension of ongoing work.</li>
          <li>Delayed project delivery.</li>
          <li>Temporary suspension of hosted services where applicable.</li>
          <li>Withholding of final deliverables until outstanding amounts are cleared.</li>
        </ul>
        <p>Adyatech reserves the right to charge reasonable interest or recovery costs on overdue commercial invoices where permitted by law.</p>
        <p>For international engagements, payments shall be made in the currency specified in the quotation or invoice. Any applicable banking charges, exchange fees, withholding taxes, or international transfer costs shall be borne by the client unless otherwise agreed.</p>
      </>
    ),
  },
  {
    id: 'ip',
    heading: '5. Intellectual Property',
    body: (
      <>
        <p>Unless otherwise agreed in writing, all intellectual property created specifically for a client as part of the project shall transfer to the client only after full payment of all outstanding invoices.</p>
        <p>Until full payment is received:</p>
        <ul>
          <li>All designs, source code, documents, concepts, graphics, software, databases, and deliverables remain the property of Adyatech Solutions LLP.</li>
          <li>Clients receive no ownership rights beyond evaluation purposes unless expressly authorized.</li>
        </ul>
        <p>Adyatech retains ownership of:</p>
        <ul>
          <li>Internal development frameworks</li>
          <li>Proprietary methodologies</li>
          <li>Libraries</li>
          <li>Reusable code</li>
          <li>Automation tools</li>
          <li>AI models and prompts</li>
          <li>Templates</li>
          <li>Utilities</li>
          <li>Development processes</li>
          <li>Pre-existing intellectual property</li>
        </ul>
        <p>Where third-party software, frameworks, plugins, APIs, fonts, themes, libraries, or commercial licenses are used, ownership remains with their respective licensors, and clients are bound by the applicable third-party licence terms.</p>
        <p>Unless prohibited by a confidentiality agreement, Adyatech may identify completed projects in its portfolio, proposals, presentations, or marketing materials.</p>
      </>
    ),
  },
  {
    id: 'liability',
    heading: '6. Limitation of Liability',
    body: (
      <>
        <p>To the fullest extent permitted by applicable law, Adyatech Solutions LLP shall not be liable for any indirect, incidental, consequential, exemplary, punitive, or special damages, including but not limited to:</p>
        <ul>
          <li>Loss of profits</li>
          <li>Loss of business opportunities</li>
          <li>Loss of revenue</li>
          <li>Loss of goodwill</li>
          <li>Business interruption</li>
          <li>Data loss</li>
          <li>Cybersecurity incidents beyond our reasonable control</li>
          <li>Third-party service failures</li>
          <li>Hosting outages</li>
          <li>Internet disruptions</li>
          <li>Delays caused by client actions or external dependencies</li>
        </ul>
        <p>Our aggregate liability arising from any engagement shall not exceed the total amount actually paid by the client to Adyatech for the specific project giving rise to the claim.</p>
        <p>Nothing in these Terms excludes liability where such exclusion is prohibited under applicable law.</p>
      </>
    ),
  },
  {
    id: 'termination',
    heading: '7. Termination',
    body: (
      <>
        <p>Either party may terminate an engagement by providing written notice in accordance with the applicable agreement.</p>
        <p>Upon termination:</p>
        <ul>
          <li>Payment becomes immediately due for all completed work, approved milestones, and expenses incurred up to the termination date.</li>
          <li>Completed deliverables for paid work may be released to the client.</li>
          <li>Work that remains unpaid shall remain the intellectual property of Adyatech.</li>
          <li>Third-party licences, hosting subscriptions, domain registrations, and cloud services already purchased are generally non-refundable.</li>
          <li>Any ongoing access to development environments or hosted services may be suspended or withdrawn until outstanding obligations are fulfilled.</li>
        </ul>
        <p>Termination shall not affect rights or obligations that accrued before termination, including confidentiality, payment obligations, and intellectual property rights.</p>
      </>
    ),
  },
  {
    id: 'law',
    heading: '8. Governing Law & Jurisdiction',
    body: (
      <>
        <p>These Terms of Service shall be governed by and interpreted in accordance with the laws of the Republic of India.</p>
        <p>For clients located in India, the courts of Ballari, Karnataka, shall have exclusive jurisdiction over disputes arising out of or relating to these Terms, except where mandatory law provides otherwise.</p>
        <p>For international clients, Adyatech Solutions LLP will first seek to resolve disputes through good-faith discussions and negotiation. Where a dispute cannot be resolved amicably, the governing law shall remain the laws of India, and the courts located in Ballari, Karnataka, India shall have jurisdiction unless a separate written agreement specifies otherwise.</p>
      </>
    ),
  },
  {
    id: 'contact',
    heading: 'Contact Information',
    body: (
      <>
        <p>If you have any questions regarding these Terms of Service, please contact us:</p>
        <p><strong>Adyatech Solutions LLP</strong><br />
        2nd Floor, Above Gupta Book Stall<br />
        Opp. Nexa Showroom<br />
        Infantry Road<br />
        Ballari – 583104<br />
        Karnataka, India</p>
        <p>Phone: +91 8392 359873 / +91 98868 53308<br />
        Email: hello@adyatech.com<br />
        Website: www.adyatech.com</p>
        <p>By continuing to access our website or engaging our services, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service.</p>
      </>
    ),
  },
]

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms of Service"
      subtitle="Terms of Service"
      intro="These terms govern your use of the Adyatech Solutions website and any engagement you enter into with us. Please read them carefully."
      lastUpdated="July 25, 2026"
      sections={sections}
    />
  )
}
