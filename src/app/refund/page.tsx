import type { Metadata } from 'next'
import LegalPage, { type LegalSection } from '@/app/legal/LegalPage'

export const metadata: Metadata = {
  title: 'Refund & Cancellation Policy — Adyatech Solutions',
  description: 'How cancellations and refunds work for project engagements with Adyatech Solutions.',
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
        <p>This Project Payment, Cancellation & Refund Policy explains the payment terms, project cancellation procedures, and refund conditions applicable to all services provided by Adyatech Solutions LLP.</p>
        <p>As a professional Information Technology company, we primarily deliver customized digital services and solutions. Since every project is planned, designed, and developed according to each client's specific requirements, our refund policy differs from that of businesses selling physical or off-the-shelf products.</p>
        <p>By approving a quotation, signing an agreement, issuing a purchase order, making an advance payment, or requesting us to commence work, you acknowledge that you have read, understood, and agreed to this Policy.</p>
      </>
    ),
  },
  {
    id: 'scope',
    heading: '1. Scope of this Policy',
    body: (
      <>
        <p>This Policy applies to all services provided by Adyatech Solutions LLP, including but not limited to:</p>
        <ul>
          <li>Website Design & Development</li>
          <li>Government & Institutional Portals</li>
          <li>Custom Software Development</li>
          <li>Enterprise Applications</li>
          <li>Mobile Application Development</li>
          <li>Artificial Intelligence (AI) Solutions</li>
          <li>SaaS Products</li>
          <li>E-Commerce Solutions</li>
          <li>UI/UX Design</li>
          <li>API Development & Integrations</li>
          <li>Cloud & Hosting Services</li>
          <li>Website Maintenance</li>
          <li>Annual Maintenance Contracts (AMC)</li>
          <li>Digital Marketing</li>
          <li>SEO Services</li>
          <li>Branding & Creative Design</li>
          <li>IT Consulting</li>
          <li>Technical Support Services</li>
        </ul>
        <p>This Policy applies to clients located in Ballari, across India, and internationally unless a separate written agreement specifies otherwise.</p>
      </>
    ),
  },
  {
    id: 'confirmation',
    heading: '2. Project Confirmation',
    body: (
      <>
        <p>A project is considered officially confirmed only after one or more of the following has occurred:</p>
        <ul>
          <li>Written acceptance of our quotation or proposal.</li>
          <li>Approval of a Statement of Work (SOW).</li>
          <li>Issue of a Purchase Order (PO).</li>
          <li>Execution of a service agreement.</li>
          <li>Payment of the agreed advance amount.</li>
          <li>Written confirmation to commence work.</li>
        </ul>
        <p>Once work has commenced, project resources, developers, designers, infrastructure, and schedules are allocated specifically to your project.</p>
      </>
    ),
  },
  {
    id: 'payment-terms',
    heading: '3. Payment Terms',
    body: (
      <>
        <p>Unless otherwise agreed in writing, payments are generally structured as follows:</p>
        <ul>
          <li>Advance payment before project commencement.</li>
          <li>Milestone-based payments during project execution.</li>
          <li>Final payment before deployment or project handover.</li>
          <li>AMC or recurring service fees as agreed.</li>
        </ul>
        <p>Payments may be made through:</p>
        <ul>
          <li>Bank Transfer</li>
          <li>NEFT / RTGS / IMPS</li>
          <li>UPI</li>
          <li>Cheque</li>
          <li>Other mutually agreed payment methods</li>
        </ul>
        <p>We currently do not process payments directly through our website.</p>
        <p>Applicable taxes, including GST or other statutory taxes, shall be charged wherever required under applicable laws.</p>
        <p>Invoices shall be payable within the period specified in the quotation, agreement, or invoice.</p>
      </>
    ),
  },
  {
    id: 'advance',
    heading: '4. Advance Payments',
    body: (
      <>
        <p>Advance payments allow us to:</p>
        <ul>
          <li>Reserve development resources.</li>
          <li>Allocate project schedules.</li>
          <li>Conduct planning and discovery.</li>
          <li>Prepare designs and technical architecture.</li>
          <li>Purchase necessary software licences or services.</li>
          <li>Begin development activities.</li>
        </ul>
        <p>Accordingly, advance payments are generally non-refundable once work has commenced.</p>
        <p>However, where exceptional circumstances exist, Adyatech may, at its sole discretion, consider a partial refund after deducting charges for work completed, expenses incurred, and third-party costs already paid.</p>
      </>
    ),
  },
  {
    id: 'milestones',
    heading: '5. Milestone Payments',
    body: (
      <>
        <p>Projects are typically executed in stages.</p>
        <p>Payments made for completed milestones are considered earned upon completion of the corresponding deliverables and are non-refundable.</p>
        <p>Failure to make milestone payments may result in:</p>
        <ul>
          <li>Suspension of development.</li>
          <li>Delay in project delivery.</li>
          <li>Suspension of testing or deployment.</li>
          <li>Temporary withholding of deliverables until outstanding invoices are settled.</li>
        </ul>
      </>
    ),
  },
  {
    id: 'client-cancellation',
    heading: '6. Project Cancellation by the Client',
    body: (
      <>
        <p>Clients may request cancellation of a project by providing written notice.</p>
        <p>Where cancellation occurs after work has commenced:</p>
        <ul>
          <li>Charges for all completed work remain payable.</li>
          <li>Time already invested in planning, design, development, testing, meetings, documentation, or project management will be billed.</li>
          <li>Third-party purchases are non-refundable.</li>
          <li>Outstanding invoices become immediately payable.</li>
        </ul>
        <p>If the value of completed work exceeds the advance received, the client shall pay the outstanding balance.</p>
        <p>If the advance exceeds the value of completed work and eligible expenses, Adyatech may refund the remaining balance after applicable deductions.</p>
      </>
    ),
  },
  {
    id: 'adyatech-cancellation',
    heading: '7. Project Cancellation by Adyatech',
    body: (
      <>
        <p>Adyatech reserves the right to suspend or terminate a project where:</p>
        <ul>
          <li>The client repeatedly fails to provide required information.</li>
          <li>Payments remain overdue.</li>
          <li>The client requests unlawful or unethical work.</li>
          <li>There is abusive, threatening, or inappropriate conduct.</li>
          <li>Continued execution becomes commercially or technically impractical.</li>
          <li>Force majeure events prevent project completion.</li>
        </ul>
        <p>Where termination occurs for reasons solely attributable to Adyatech, a fair refund may be provided for work not performed after deducting completed work and legitimate project expenses.</p>
      </>
    ),
  },
  {
    id: 'third-party',
    heading: '8. Third-Party Products & Services',
    body: (
      <>
        <p>Certain project costs are paid directly to third-party providers.</p>
        <p>Examples include:</p>
        <ul>
          <li>Domain Registration</li>
          <li>Web Hosting</li>
          <li>SSL Certificates</li>
          <li>Cloud Infrastructure</li>
          <li>Premium Themes</li>
          <li>Premium Plugins</li>
          <li>Commercial Fonts</li>
          <li>Stock Images</li>
          <li>SMS Gateways</li>
          <li>Email Services</li>
          <li>Payment Gateway Charges</li>
          <li>API Subscription Fees</li>
          <li>AI Platform Usage</li>
          <li>Software Licences</li>
        </ul>
        <p>Once purchased or activated, these charges are non-refundable, irrespective of project cancellation.</p>
        <p>Where possible, ownership or account access may be transferred to the client.</p>
      </>
    ),
  },
  {
    id: 'digital-products',
    heading: '9. Digital Products & Custom Development',
    body: (
      <>
        <p>The services provided by Adyatech involve customized digital work created specifically for individual clients.</p>
        <p>Unlike physical goods, digital services cannot be returned after delivery.</p>
        <p>Accordingly:</p>
        <ul>
          <li>Completed software.</li>
          <li>Website designs.</li>
          <li>Source code.</li>
          <li>UI/UX designs.</li>
          <li>Databases.</li>
          <li>Graphics.</li>
          <li>Documentation.</li>
          <li>AI workflows.</li>
          <li>Mobile applications.</li>
        </ul>
        <p>are generally not eligible for refunds once delivered or approved.</p>
      </>
    ),
  },
  {
    id: 'delays',
    heading: '10. Delays Caused by the Client',
    body: (
      <>
        <p>Project timelines depend on timely cooperation from the client.</p>
        <p>Delays caused by:</p>
        <ul>
          <li>Late approvals.</li>
          <li>Delayed content submission.</li>
          <li>Missing project requirements.</li>
          <li>Incomplete documentation.</li>
          <li>Delayed payments.</li>
          <li>Change requests.</li>
        </ul>
        <p>may result in revised delivery schedules and additional costs where appropriate.</p>
        <p>Such delays do not constitute grounds for cancellation or refund.</p>
      </>
    ),
  },
  {
    id: 'change-requests',
    heading: '11. Change Requests',
    body: (
      <>
        <p>Any request beyond the agreed scope shall be treated as a Change Request.</p>
        <p>Additional work may require:</p>
        <ul>
          <li>Revised quotations.</li>
          <li>Additional development time.</li>
          <li>New milestones.</li>
          <li>Separate invoices.</li>
        </ul>
        <p>Change requests do not invalidate the original payment obligations.</p>
      </>
    ),
  },
  {
    id: 'amc',
    heading: '12. Annual Maintenance Contracts (AMC)',
    body: (
      <>
        <p>AMC and maintenance services begin on the agreed commencement date.</p>
        <p>Once the service period has started:</p>
        <ul>
          <li>AMC payments are generally non-refundable.</li>
          <li>Unused support hours cannot normally be converted into cash refunds.</li>
        </ul>
        <p>Support coverage is governed by the applicable AMC agreement.</p>
      </>
    ),
  },
  {
    id: 'subscription',
    heading: '13. Subscription & Recurring Services',
    body: (
      <>
        <p>Where Adyatech provides subscription-based products or recurring services:</p>
        <ul>
          <li>Billing frequency will be specified in the applicable agreement.</li>
          <li>Clients may discontinue future renewals by providing reasonable advance notice.</li>
          <li>Payments already billed for the active service period are generally non-refundable unless otherwise agreed.</li>
        </ul>
      </>
    ),
  },
  {
    id: 'international',
    heading: '14. International Clients',
    body: (
      <>
        <p>For international engagements:</p>
        <ul>
          <li>Payments shall be made in the agreed currency.</li>
          <li>International banking charges, intermediary fees, exchange costs, and applicable taxes shall normally be borne by the client unless otherwise agreed.</li>
          <li>Refunds, where applicable, shall be processed using the original payment method wherever reasonably possible.</li>
        </ul>
      </>
    ),
  },
  {
    id: 'exceptions',
    heading: '15. Exceptional Circumstances',
    body: (
      <>
        <p>Adyatech understands that unforeseen situations may arise.</p>
        <p>Requests for exceptions to this Policy will be reviewed individually and fairly.</p>
        <p>Approval of any exception shall remain entirely at the discretion of Adyatech Solutions LLP and shall not establish a precedent for future engagements.</p>
      </>
    ),
  },
  {
    id: 'changes',
    heading: '16. Changes to this Policy',
    body: (
      <>
        <p>We may revise this Policy from time to time to reflect:</p>
        <ul>
          <li>Changes in our services.</li>
          <li>Business practices.</li>
          <li>Legal requirements.</li>
          <li>Technology.</li>
          <li>Industry standards.</li>
        </ul>
        <p>The latest version will always be available on our website with the updated revision date.</p>
      </>
    ),
  },
  {
    id: 'contact',
    heading: '17. Contact Us',
    body: (
      <>
        <p>If you have any questions regarding this Project Payment, Cancellation & Refund Policy, please contact us.</p>
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
        <hr />
        <p><strong>Final Statement</strong><br />
        At Adyatech Solutions LLP, we believe in building long-term relationships through transparency, fairness, and mutual trust. Our goal is to deliver high-quality technology solutions while maintaining clear and equitable payment, cancellation, and refund practices for every client, whether local, national, or international.</p>
        <p>By engaging our services, you acknowledge that you have read, understood, and agreed to this Project Payment, Cancellation & Refund Policy.</p>
      </>
    ),
  },
]

export default function RefundPage() {
  return (
    <LegalPage
      title="Project Payment, Cancellation & Refund Policy"
      subtitle="Refund & Cancellation Policy"
      intro="This policy explains how cancellations and refunds work for project engagements with Adyatech Solutions. For our SaaS products, see the product refund policy."
      lastUpdated="July 25, 2026"
      sections={sections}
    />
  )
}
