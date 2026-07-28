import type { Metadata } from 'next'
import LegalPage, { type LegalSection } from '@/app/legal/LegalPage'

export const metadata: Metadata = {
  title: 'Disclaimer — Adyatech Solutions',
  description: 'The terms on which you rely on information provided on adyatech.com.',
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
        <p>This Disclaimer governs your use of our website, digital platforms, products, software, applications, and professional services. By accessing our website or engaging with our services, you acknowledge that you have read, understood, and agreed to the terms set out in this Disclaimer.</p>
        <p>The information provided on this website is intended for general informational and business purposes only. While we strive to ensure that all content is accurate, current, and reliable, we do not guarantee that all information is complete, error-free, or suitable for every purpose.</p>
      </>
    ),
  },
  {
    id: 'general',
    heading: '1. General Information',
    body: (
      <>
        <p>The content available on this website, including text, graphics, software, images, videos, documentation, articles, blogs, case studies, and other materials, is published to provide information about Adyatech Solutions LLP and the technology services we offer.</p>
        <p>Nothing contained on this website should be interpreted as legal, financial, tax, investment, medical, engineering, or other professional advice.</p>
        <p>Users should seek independent professional advice before making decisions based on information obtained from this website.</p>
      </>
    ),
  },
  {
    id: 'professional-advice',
    heading: '2. No Professional Advice',
    body: (
      <>
        <p>Any guidance, technical articles, tutorials, demonstrations, AI-generated content, code examples, design concepts, pricing estimates, or recommendations published on this website are provided for informational purposes only.</p>
        <p>They should not be relied upon as professional, legal, accounting, cybersecurity, or business advice without consulting qualified professionals.</p>
      </>
    ),
  },
  {
    id: 'guarantees',
    heading: '3. No Guarantees',
    body: (
      <>
        <p>While we aim to deliver high-quality technology solutions, Adyatech Solutions LLP does not guarantee:</p>
        <ul>
          <li>Specific business outcomes</li>
          <li>Revenue growth</li>
          <li>Increased sales</li>
          <li>Search engine rankings</li>
          <li>Lead generation results</li>
          <li>Website traffic improvements</li>
          <li>Social media performance</li>
          <li>AI-generated accuracy</li>
          <li>Software compatibility with every environment</li>
          <li>Continuous or uninterrupted service availability</li>
        </ul>
        <p>Project outcomes depend on numerous factors beyond our control, including client participation, third-party services, infrastructure, market conditions, and regulatory requirements.</p>
      </>
    ),
  },
  {
    id: 'availability',
    heading: '4. Service Availability',
    body: (
      <>
        <p>We strive to keep our website and digital services available at all times.</p>
        <p>However, we do not guarantee uninterrupted availability and may temporarily suspend services for:</p>
        <ul>
          <li>Scheduled maintenance</li>
          <li>Software updates</li>
          <li>Security improvements</li>
          <li>Infrastructure upgrades</li>
          <li>Emergency maintenance</li>
          <li>Third-party service interruptions</li>
          <li>Internet connectivity issues</li>
          <li>Events beyond our reasonable control</li>
        </ul>
        <p>We shall not be liable for losses arising from temporary service interruptions.</p>
      </>
    ),
  },
  {
    id: 'accuracy',
    heading: '5. Accuracy of Information',
    body: (
      <>
        <p>Although every reasonable effort is made to keep our website accurate and up to date, information may occasionally contain:</p>
        <ul>
          <li>Typographical errors</li>
          <li>Technical inaccuracies</li>
          <li>Pricing changes</li>
          <li>Service updates</li>
          <li>Outdated information</li>
          <li>Broken links</li>
        </ul>
        <p>Adyatech reserves the right to modify, update, remove, or correct website content at any time without prior notice.</p>
      </>
    ),
  },
  {
    id: 'quotations',
    heading: '6. Quotations & Pricing',
    body: (
      <>
        <p>Any pricing, estimates, budgets, timelines, or project examples displayed on our website are provided solely for general guidance.</p>
        <p>Actual project pricing depends on several factors, including:</p>
        <ul>
          <li>Project scope</li>
          <li>Technical complexity</li>
          <li>Required integrations</li>
          <li>Design requirements</li>
          <li>Project timeline</li>
          <li>Third-party licensing</li>
          <li>Hosting infrastructure</li>
          <li>Client requirements</li>
        </ul>
        <p>A written quotation, proposal, or agreement approved by both parties shall govern the final commercial terms of every engagement.</p>
      </>
    ),
  },
  {
    id: 'third-party',
    heading: '7. Third-Party Services',
    body: (
      <>
        <p>Our website and projects may include or integrate with third-party services, including but not limited to:</p>
        <ul>
          <li>Google Services</li>
          <li>Microsoft Services</li>
          <li>Meta Platforms</li>
          <li>WhatsApp Business</li>
          <li>Cloud Hosting Providers</li>
          <li>Payment Service Providers</li>
          <li>Domain Registrars</li>
          <li>AI Platforms</li>
          <li>API Providers</li>
          <li>Open-Source Libraries</li>
          <li>Social Media Platforms</li>
        </ul>
        <p>These services are operated independently of Adyatech Solutions LLP.</p>
        <p>We are not responsible for the availability, content, privacy practices, functionality, or security of third-party websites, platforms, products, or services.</p>
        <p>Users should review the applicable terms and privacy policies of those providers before using them.</p>
      </>
    ),
  },
  {
    id: 'ai',
    heading: '8. Artificial Intelligence Disclaimer',
    body: (
      <>
        <p>Some Adyatech products and services may incorporate Artificial Intelligence (AI), machine learning, automation, or generative AI technologies.</p>
        <p>While we continually improve the quality of AI-assisted services, AI-generated outputs:</p>
        <ul>
          <li>May contain inaccuracies or omissions.</li>
          <li>Should be independently reviewed before implementation.</li>
          <li>Should not be considered legal, financial, medical, or professional advice.</li>
          <li>May require human verification depending on the intended use.</li>
        </ul>
        <p>Clients remain responsible for reviewing, validating, and approving AI-generated content before publication or operational use.</p>
      </>
    ),
  },
  {
    id: 'technical',
    heading: '9. Software & Technical Limitations',
    body: (
      <>
        <p>Software development involves numerous technologies, platforms, browsers, devices, APIs, and third-party integrations.</p>
        <p>Although we follow industry best practices, we cannot guarantee:</p>
        <ul>
          <li>Compatibility with every device or browser.</li>
          <li>Continuous availability of third-party APIs.</li>
          <li>Lifetime compatibility with future operating systems.</li>
          <li>Performance of third-party hosting environments.</li>
          <li>Availability of discontinued software or services.</li>
        </ul>
        <p>Technology evolves continuously, and periodic updates or maintenance may be required after project delivery.</p>
      </>
    ),
  },
  {
    id: 'client-responsibilities',
    heading: '10. Client Responsibilities',
    body: (
      <>
        <p>Clients are responsible for providing:</p>
        <ul>
          <li>Accurate project requirements.</li>
          <li>Timely approvals and feedback.</li>
          <li>Content, branding materials, and assets.</li>
          <li>Required licences and permissions.</li>
          <li>Access credentials where necessary.</li>
          <li>Compliance with applicable laws and regulations.</li>
        </ul>
        <p>Delays caused by incomplete information or delayed approvals may affect project timelines.</p>
      </>
    ),
  },
  {
    id: 'ip',
    heading: '11. Intellectual Property',
    body: (
      <>
        <p>Unless otherwise agreed in writing, all website content, designs, software, graphics, logos, source code, documentation, and other intellectual property belonging to Adyatech Solutions LLP remain protected under applicable copyright and intellectual property laws.</p>
        <p>Unauthorized reproduction, modification, redistribution, reverse engineering, or commercial use of our proprietary materials is prohibited.</p>
        <p>Third-party trademarks, logos, and product names appearing on this website remain the property of their respective owners.</p>
      </>
    ),
  },
  {
    id: 'portfolio',
    heading: '12. Portfolio & Case Studies',
    body: (
      <>
        <p>Our website may display completed projects, client names, logos, testimonials, or case studies.</p>
        <p>These are published with permission, under contractual rights, or as permitted by applicable law.</p>
        <p>Project results achieved for one client should not be interpreted as a guarantee of similar outcomes for other clients.</p>
      </>
    ),
  },
  {
    id: 'liability',
    heading: '13. Limitation of Liability',
    body: (
      <>
        <p>To the maximum extent permitted by applicable law, Adyatech Solutions LLP shall not be liable for any direct, indirect, incidental, special, consequential, or punitive damages arising from:</p>
        <ul>
          <li>Use of this website.</li>
          <li>Reliance on website information.</li>
          <li>Service interruptions.</li>
          <li>Data loss.</li>
          <li>Cybersecurity incidents beyond our reasonable control.</li>
          <li>Third-party software failures.</li>
          <li>Hosting outages.</li>
          <li>Internet disruptions.</li>
          <li>AI-generated content.</li>
          <li>Business interruption.</li>
          <li>Loss of profits or revenue.</li>
          <li>Delayed project delivery caused by external factors.</li>
        </ul>
        <p>Where liability cannot legally be excluded, it shall be limited to the extent permitted under applicable law.</p>
      </>
    ),
  },
  {
    id: 'international',
    heading: '14. International Users',
    body: (
      <>
        <p>Adyatech Solutions LLP provides services to clients located in Ballari, throughout India, and internationally.</p>
        <p>Visitors accessing our website from outside India are responsible for ensuring compliance with their own local laws regarding the use of our website and services.</p>
      </>
    ),
  },
  {
    id: 'changes',
    heading: '15. Changes to This Disclaimer',
    body: (
      <>
        <p>We may update this Disclaimer periodically to reflect changes in:</p>
        <ul>
          <li>Applicable laws</li>
          <li>Industry standards</li>
          <li>Technology</li>
          <li>Business practices</li>
          <li>Services offered</li>
        </ul>
        <p>The updated version will always be published on this page with the revised effective date.</p>
        <p>Continued use of our website constitutes acceptance of the revised Disclaimer.</p>
      </>
    ),
  },
  {
    id: 'contact',
    heading: '16. Contact Us',
    body: (
      <>
        <p>If you have any questions regarding this Disclaimer, please contact us.</p>
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
        <p><strong>Final Statement</strong><br />
        By accessing this website or engaging the services of Adyatech Solutions LLP, you acknowledge that you have read, understood, and agreed to this Disclaimer. If you do not agree with any part of this Disclaimer, you should discontinue the use of this website and its associated services.</p>
      </>
    ),
  },
]

export default function DisclaimerPage() {
  return (
    <LegalPage
      title="Disclaimer"
      subtitle="Disclaimer"
      intro="The information on this website is provided in good faith and for general information only. This disclaimer sets out the terms on which you rely on it."
      lastUpdated="July 25, 2026"
      sections={sections}
    />
  )
}
