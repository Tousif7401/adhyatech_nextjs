import type { Metadata } from 'next'
import Link from 'next/link'
import LegalPage, { type LegalSection } from '@/app/legal/LegalPage'

export const metadata: Metadata = {
  title: 'Privacy Policy — Adyatech Solutions',
  description: 'What personal information Adyatech Solutions collects, how we use it, and your choices.',
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
        <p>Welcome to Adyatech Solutions LLP ("Adyatech", "we", "our", or "us").</p>
        <p>Your privacy is important to us. We believe that every visitor, client, and business partner deserves transparency about how their personal information is collected, used, protected, and managed. This Privacy Policy explains our practices regarding the collection and processing of personal information when you visit our website, contact us, request a quotation, engage our professional services, or interact with our products and digital platforms.</p>
        <p>Whether you are an individual, a business, an educational institution, a government organization, or an international client, we are committed to handling your information responsibly and in accordance with applicable laws.</p>
        <p>By accessing our website or submitting your information through any contact form, quotation request, consultation booking, email, telephone, WhatsApp, or any other communication channel, you acknowledge that you have read and accepted this Privacy Policy.</p>
      </>
    ),
  },
  {
    id: 'about',
    heading: '1. About Adyatech Solutions LLP',
    body: (
      <>
        <p>Adyatech Solutions LLP is an Information Technology company based in Ballari, Karnataka, India, providing technology solutions to clients across India and internationally.</p>
        <p>Our areas of expertise include:</p>
        <ul>
          <li>Website Design & Development</li>
          <li>Government & Institutional Portals</li>
          <li>Custom Software Development</li>
          <li>Enterprise Applications</li>
          <li>Mobile Application Development</li>
          <li>Artificial Intelligence (AI) Solutions</li>
          <li>SaaS Product Development</li>
          <li>UI/UX Design</li>
          <li>API Development & System Integration</li>
          <li>Cloud & Hosting Solutions</li>
          <li>Digital Marketing</li>
          <li>Search Engine Optimization (SEO)</li>
          <li>Website Maintenance & Annual Maintenance Contracts (AMC)</li>
          <li>IT Consulting & Technology Advisory</li>
        </ul>
        <p>This Privacy Policy applies to all our websites, applications, products, and professional services unless a separate privacy notice is provided.</p>
      </>
    ),
  },
  {
    id: 'collect',
    heading: '2. Information We Collect',
    body: (
      <>
        <p>The information we collect depends on how you interact with us.</p>
        <p><strong>Personal Information</strong></p>
        <p>When you contact us, request a quotation, schedule a consultation, subscribe to updates, or engage our services, we may collect information including:</p>
        <ul>
          <li>Full Name</li>
          <li>Company or Organization Name</li>
          <li>Email Address</li>
          <li>Mobile Number</li>
          <li>WhatsApp Number</li>
          <li>Business Address</li>
          <li>City, State, and Country</li>
          <li>Project Requirements</li>
          <li>Budget Information</li>
          <li>Uploaded Documents or Files</li>
          <li>Billing Information (where applicable)</li>
          <li>Any additional information you voluntarily provide</li>
        </ul>
        <p>You are not required to provide personal information; however, certain services may not be available without it.</p>
        <p><strong>Technical Information</strong></p>
        <p>When you browse our website, certain technical information may be collected automatically, including:</p>
        <ul>
          <li>IP Address</li>
          <li>Browser Type and Version</li>
          <li>Operating System</li>
          <li>Device Information</li>
          <li>Screen Resolution</li>
          <li>Language Preferences</li>
          <li>Referral Website</li>
          <li>Pages Visited</li>
          <li>Time Spent on Pages</li>
          <li>Date and Time of Visit</li>
          <li>General Website Usage Analytics</li>
        </ul>
        <p>This information is primarily used for security, diagnostics, analytics, and improving user experience.</p>
      </>
    ),
  },
  {
    id: 'use',
    heading: '3. How We Use Your Information',
    body: (
      <>
        <p>Your information is collected only for legitimate business purposes.</p>
        <p>These purposes include:</p>
        <ul>
          <li>Responding to enquiries</li>
          <li>Preparing project proposals and quotations</li>
          <li>Scheduling consultations or demonstrations</li>
          <li>Delivering requested products and services</li>
          <li>Managing client relationships</li>
          <li>Providing technical support</li>
          <li>Processing invoices and payments</li>
          <li>Improving our website and services</li>
          <li>Maintaining security and preventing misuse</li>
          <li>Complying with legal or regulatory obligations</li>
          <li>Communicating important service updates</li>
        </ul>
        <p>With your permission, we may also send newsletters, product announcements, company updates, or educational content. You may unsubscribe from such communications at any time.</p>
      </>
    ),
  },
  {
    id: 'forms',
    heading: '4. Contact Forms & Get a Quote Requests',
    body: (
      <>
        <p>When you submit information through our:</p>
        <ul>
          <li>Contact Us</li>
          <li>Get a Quote</li>
          <li>Book a Consultation</li>
          <li>Career Application</li>
          <li>Support Request</li>
          <li>Demo Request</li>
          <li>Partnership Enquiry</li>
        </ul>
        <p>the information you provide is used solely for understanding your requirements and communicating with you regarding your enquiry.</p>
        <p>Submitting an enquiry does not create a contractual relationship, guarantee acceptance of a project, or obligate either party to proceed with an engagement.</p>
      </>
    ),
  },
  {
    id: 'communication',
    heading: '5. Communication',
    body: (
      <>
        <p>We may communicate with you using the contact information you voluntarily provide, including through:</p>
        <ul>
          <li>Email</li>
          <li>Telephone</li>
          <li>WhatsApp</li>
          <li>SMS</li>
          <li>Video Conferencing Platforms</li>
          <li>Project Management Platforms</li>
          <li>Customer Support Systems</li>
        </ul>
        <p>These communications are limited to legitimate business purposes related to your enquiry, project, or service relationship.</p>
      </>
    ),
  },
  {
    id: 'share',
    heading: '6. Information Sharing',
    body: (
      <>
        <p>We do not sell your personal information to third parties.</p>
        <p>Your information may be shared with trusted partners solely for delivering our services, including:</p>
        <ul>
          <li>Cloud Hosting Providers</li>
          <li>Domain Registrars</li>
          <li>Email Service Providers</li>
          <li>Payment Processing Partners</li>
          <li>Communication Platforms</li>
          <li>Technology Vendors</li>
          <li>Government Authorities where legally required</li>
          <li>Professional Advisors such as auditors or legal consultants where necessary</li>
        </ul>
        <p>These service providers are expected to protect your information and use it only for authorized purposes.</p>
      </>
    ),
  },
  {
    id: 'security',
    heading: '7. Data Security',
    body: (
      <>
        <p>Protecting your information is one of our highest priorities.</p>
        <p>We implement appropriate administrative, technical, and organizational safeguards to protect personal information against unauthorized access, disclosure, alteration, misuse, or destruction.</p>
        <p>Security measures may include:</p>
        <ul>
          <li>Secure servers</li>
          <li>Access controls</li>
          <li>Password protection</li>
          <li>Encryption where appropriate</li>
          <li>Firewall protection</li>
          <li>Software updates</li>
          <li>Secure development practices</li>
        </ul>
        <p>While we strive to protect your information, no method of electronic transmission or storage can guarantee absolute security.</p>
      </>
    ),
  },
  {
    id: 'retention',
    heading: '8. Data Retention',
    body: (
      <>
        <p>We retain personal information only for as long as reasonably necessary to:</p>
        <ul>
          <li>Respond to enquiries</li>
          <li>Deliver contracted services</li>
          <li>Maintain project history</li>
          <li>Meet accounting obligations</li>
          <li>Comply with applicable laws</li>
          <li>Resolve disputes</li>
          <li>Enforce agreements</li>
        </ul>
        <p>When information is no longer required, it is securely deleted, anonymized, or archived in accordance with our internal policies.</p>
      </>
    ),
  },
  {
    id: 'third-party',
    heading: '9. Third-Party Services',
    body: (
      <>
        <p>Our website and services may integrate with trusted third-party platforms including, but not limited to:</p>
        <ul>
          <li>Google</li>
          <li>Microsoft</li>
          <li>Meta Platforms</li>
          <li>WhatsApp Business</li>
          <li>Cloud Infrastructure Providers</li>
          <li>Payment Gateways</li>
          <li>Domain Registrars</li>
          <li>AI Service Providers</li>
          <li>Video Conferencing Platforms</li>
          <li>Mapping Services</li>
          <li>Email Marketing Platforms</li>
        </ul>
        <p>These third parties operate under their own privacy policies. We encourage users to review those policies before using such services.</p>
      </>
    ),
  },
  {
    id: 'ai',
    heading: '10. Artificial Intelligence Services',
    body: (
      <>
        <p>Some Adyatech products and services incorporate Artificial Intelligence technologies to improve automation, productivity, content generation, analytics, software functionality, and customer support.</p>
        <p>Where AI services are used:</p>
        <ul>
          <li>Human review may be involved where appropriate.</li>
          <li>AI-generated outputs should be independently verified before making important business, legal, financial, or medical decisions.</li>
        </ul>
        <p>We continuously strive to use AI responsibly and ethically.</p>
      </>
    ),
  },
  {
    id: 'children',
    heading: '11. Children\'s Privacy',
    body: (
      <>
        <p>Our services are designed primarily for businesses, organizations, educational institutions, and adults.</p>
        <p>We do not knowingly collect personal information from children without appropriate parental or legal guardian consent.</p>
        <p>If you believe that a child has provided personal information to us, please contact us so appropriate action can be taken.</p>
      </>
    ),
  },
  {
    id: 'rights',
    heading: '12. Your Rights',
    body: (
      <>
        <p>Depending on applicable laws, you may have the right to:</p>
        <ul>
          <li>Request access to your personal information</li>
          <li>Request correction of inaccurate information</li>
          <li>Request deletion of your information where legally permitted</li>
          <li>Withdraw consent where applicable</li>
          <li>Request details regarding how your information is processed</li>
          <li>Object to certain processing activities where permitted by law</li>
        </ul>
        <p>Requests may be submitted using the contact information provided below.</p>
      </>
    ),
  },
  {
    id: 'international',
    heading: '13. International Users',
    body: (
      <>
        <p>Adyatech Solutions LLP serves clients from multiple countries.</p>
        <p>If you access our website or engage our services from outside India, you understand that your information may be processed, stored, or transferred to systems located in India or other jurisdictions where our service providers operate.</p>
        <p>We take reasonable steps to ensure appropriate safeguards are maintained for such transfers.</p>
      </>
    ),
  },
  {
    id: 'external-links',
    heading: '14. External Links',
    body: (
      <>
        <p>Our website may contain links to external websites operated by third parties.</p>
        <p>We are not responsible for the privacy practices, security, or content of those websites. Users should review the privacy policies of any third-party websites they visit.</p>
      </>
    ),
  },
  {
    id: 'changes',
    heading: '15. Changes to this Privacy Policy',
    body: (
      <>
        <p>Technology, legal requirements, and our services continue to evolve.</p>
        <p>Accordingly, we may update this Privacy Policy from time to time. Any revisions will be published on this page with an updated "Last Updated" date.</p>
        <p>Your continued use of our website after changes are published constitutes acceptance of the revised Privacy Policy.</p>
      </>
    ),
  },
  {
    id: 'dpdp-rights',
    heading: 'DPDP Rights – How to Exercise Them',
    body: (
      <>
        <p>Under India's Digital Personal Data Protection Act, 2023 (DPDP Act), you have specific rights regarding your personal data.</p>
        <p><strong>Your Rights:</strong></p>
        <ul>
          <li><strong>Right to Access:</strong> Request a summary of your personal data and how it's processed</li>
          <li><strong>Right to Correction:</strong> Request correction of inaccurate or incomplete data</li>
          <li><strong>Right to Erasure:</strong> Request deletion of your data where legally permitted</li>
          <li><strong>Right to Withdraw Consent:</strong> Withdraw previously given consent at any time</li>
          <li><strong>Right to Grievance:</strong> File a complaint about how your data is handled</li>
        </ul>
        <p><strong>How to Exercise Your Rights:</strong></p>
        <p>Use our <a href="/privacy-request">Privacy Request form</a> to exercise any of these rights. We will acknowledge your request within 7 days and respond within 30 days.</p>
        <p><strong>Privacy Contact:</strong></p>
        <p>For DPDP-related questions or requests, email us at <a href="mailto:privacy@adyatech.com">privacy@adyatech.com</a></p>
      </>
    ),
  },
  {
    id: 'contact',
    heading: '17. Contact Us',
    body: (
      <>
        <p>If you have any questions regarding this Privacy Policy or the way your personal information is handled, please contact us.</p>
        <p><strong>Adyatech Solutions LLP</strong><br />
        Registered Office<br />
        2nd Floor, Above Gupta Book Stall<br />
        Opp. Nexa Showroom<br />
        Infantry Road<br />
        Ballari – 583104<br />
        Karnataka, India</p>
        <p><strong>Phone:</strong> +91 8392 359873 / +91 98868 53308<br />
        <strong>Email:</strong> hello@adyatech.com<br />
        <strong>Website:</strong> www.adyatech.com</p>
        <p><strong>Your Consent</strong><br />
        By using our website, submitting an enquiry, requesting a quotation, applying for employment, subscribing to our communications, or engaging our services, you acknowledge that you have read, understood, and agreed to this Privacy Policy.</p>
      </>
    ),
  },
]

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      subtitle="Privacy Policy"
      intro="This policy explains what personal information Adyatech Solutions collects, how we use it, and the choices you have. It applies to adyatech.com and our client engagements."
      lastUpdated="July 25, 2026"
      sections={sections}
    />
  )
}
