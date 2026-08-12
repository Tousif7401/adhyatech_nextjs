import type { Metadata } from 'next'
import LegalPage, { type LegalSection } from '@/app/legal/LegalPage'

export const metadata: Metadata = {
  title: 'Cookie Policy — Adyatech Solutions',
  description: 'How adyatech.com uses cookies and how you can manage them.',
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
        <p>This Cookie Policy explains how we use cookies and similar technologies when you visit our website. It describes what cookies are, why we use them, and the choices you have regarding their use.</p>
        <p>By continuing to browse or use our website, you consent to the use of cookies as described in this Cookie Policy unless you choose to disable them through your browser settings or cookie preferences.</p>
        <p>This Cookie Policy should be read together with our Privacy Policy and Terms of Service.</p>
      </>
    ),
  },
  {
    id: 'what',
    heading: '1. What Are Cookies?',
    body: (
      <>
        <p>Cookies are small text files that are stored on your computer, smartphone, tablet, or other device when you visit a website.</p>
        <p>Cookies help websites recognize your device, remember your preferences, improve website performance, enhance security, and provide a more personalized browsing experience.</p>
        <p>Cookies do not normally contain information that directly identifies you. However, they may be linked with information you voluntarily provide through forms or other interactions on our website.</p>
      </>
    ),
  },
  {
    id: 'why',
    heading: '2. Why We Use Cookies',
    body: (
      <>
        <p>We use cookies to make our website more reliable, secure, and user-friendly.</p>
        <p>Cookies may help us to:</p>
        <ul>
          <li>Keep the website functioning correctly</li>
          <li>Remember your preferences and settings</li>
          <li>Improve page loading performance</li>
          <li>Understand how visitors interact with our website</li>
          <li>Analyze website traffic and visitor behaviour</li>
          <li>Improve our products and services</li>
          <li>Detect technical issues</li>
          <li>Protect against fraud, spam, and malicious activity</li>
          <li>Measure the effectiveness of marketing campaigns</li>
          <li>Enhance your overall browsing experience</li>
        </ul>
      </>
    ),
  },
  {
    id: 'types',
    heading: '3. Types of Cookies We Use',
    body: (
      <>
        <p><strong>Essential Cookies</strong></p>
        <p>These cookies are necessary for the operation of our website and cannot normally be disabled.</p>
        <p>They help with functions such as:</p>
        <ul>
          <li>Website navigation</li>
          <li>Security</li>
          <li>Form submissions</li>
          <li>Session management</li>
          <li>Load balancing</li>
          <li>Basic functionality</li>
        </ul>
        <p>Without these cookies, certain parts of our website may not function properly.</p>
        <p><strong>Performance & Analytics Cookies</strong></p>
        <p>These cookies help us understand how visitors use our website.</p>
        <p>They collect anonymous or aggregated information such as:</p>
        <ul>
          <li>Number of visitors</li>
          <li>Popular pages</li>
          <li>Time spent on pages</li>
          <li>Device types</li>
          <li>Browser information</li>
          <li>Navigation paths</li>
          <li>Website performance</li>
        </ul>
        <p>This information helps us continuously improve our website and services.</p>
        <p><strong>Functional Cookies</strong></p>
        <p>Functional cookies remember your preferences and improve your experience.</p>
        <p>Examples include:</p>
        <ul>
          <li>Preferred language</li>
          <li>Region or location settings</li>
          <li>Previously entered information</li>
          <li>Accessibility preferences</li>
          <li>User interface settings</li>
        </ul>
        <p>These cookies make future visits more convenient.</p>
        <p><strong>Marketing & Advertising Cookies</strong></p>
        <p>Where applicable, marketing cookies help us understand how visitors discover our website and measure the effectiveness of our advertising campaigns.</p>
        <p>These cookies may be used to:</p>
        <ul>
          <li>Measure advertising performance</li>
          <li>Track campaign effectiveness</li>
          <li>Limit repeated advertisements</li>
          <li>Improve future marketing campaigns</li>
        </ul>
        <p>We do not use cookies to sell your personal information.</p>
        <p><strong>Third-Party Cookies</strong></p>
        <p>Some pages on our website may include content or services provided by trusted third parties.</p>
        <p>These providers may place their own cookies in accordance with their respective privacy policies.</p>
        <p>Examples include:</p>
        <ul>
          <li>Google Analytics</li>
          <li>Google Maps</li>
          <li>Google Fonts</li>
          <li>YouTube</li>
          <li>Meta (Facebook & Instagram)</li>
          <li>LinkedIn</li>
          <li>WhatsApp</li>
          <li>Microsoft Services</li>
          <li>Cloud Hosting Providers</li>
        </ul>
        <p>These third-party providers operate independently of Adyatech Solutions LLP.</p>
      </>
    ),
  },
  {
    id: 'used',
    heading: '4. Cookies Used on Our Website',
    body: (
      <>
        <p>Depending on the services enabled on our website, cookies may be used for:</p>
        <ul>
          <li>Website security</li>
          <li>Contact forms</li>
          <li>Quote request forms</li>
          <li>User session management</li>
          <li>Website analytics</li>
          <li>Performance monitoring</li>
          <li>Marketing campaign measurement</li>
          <li>Embedded videos</li>
          <li>Interactive maps</li>
          <li>Social media integration</li>
          <li>Live chat services (if available)</li>
        </ul>
        <p>The specific cookies used may change as our website evolves.</p>
      </>
    ),
  },
  {
    id: 'managing',
    heading: '5. Managing Cookies',
    body: (
      <>
        <p>Most web browsers automatically accept cookies.</p>
        <p>You can choose to:</p>
        <ul>
          <li>Accept all cookies</li>
          <li>Block all cookies</li>
          <li>Delete existing cookies</li>
          <li>Receive notifications before cookies are stored</li>
          <li>Block cookies from specific websites</li>
        </ul>
        <p>Browser settings are usually available under Settings, Privacy, or Security.</p>
        <p>Please note that disabling cookies may affect certain website features, forms, or functionality.</p>
      </>
    ),
  },
  {
    id: 'retention',
    heading: '6. Cookie Retention',
    body: (
      <>
        <p>Some cookies exist only while your browser session remains active and are automatically deleted when you close your browser.</p>
        <p>Other cookies remain on your device for a longer period to remember your preferences when you return to our website.</p>
        <p>The retention period depends on the purpose of each cookie and your browser settings.</p>
      </>
    ),
  },
  {
    id: 'third-party-services',
    heading: '7. Third-Party Services',
    body: (
      <>
        <p>To improve our services, we may use trusted third-party platforms that use cookies or similar technologies.</p>
        <p>These may include:</p>
        <ul>
          <li>Google Analytics</li>
          <li>Google Tag Manager</li>
          <li>Google Maps</li>
          <li>Google Fonts</li>
          <li>YouTube</li>
          <li>Meta Pixel</li>
          <li>LinkedIn Insights</li>
          <li>Microsoft Services</li>
          <li>Cloudflare</li>
          <li>Payment Service Providers</li>
          <li>CRM Platforms</li>
          <li>AI-powered tools</li>
          <li>Live Chat Platforms</li>
        </ul>
        <p>Your interaction with these services is governed by their own privacy and cookie policies.</p>
      </>
    ),
  },
  {
    id: 'international',
    heading: '8. International Visitors',
    body: (
      <>
        <p>Adyatech Solutions LLP serves clients from Ballari, across India, and internationally.</p>
        <p>If you access our website from outside India, cookies may be processed on servers located in India or other countries where our trusted technology providers operate.</p>
        <p>We take reasonable steps to work with reputable service providers that maintain appropriate security and privacy standards.</p>
      </>
    ),
  },
  {
    id: 'changes',
    heading: '9. Changes to This Cookie Policy',
    body: (
      <>
        <p>Technology and privacy standards continue to evolve.</p>
        <p>We may update this Cookie Policy periodically to reflect changes in our website, services, legal requirements, or technology partners.</p>
        <p>The latest version will always be published on this page with an updated "Last Updated" date.</p>
        <p>Your continued use of our website after changes are published constitutes acceptance of the revised Cookie Policy.</p>
      </>
    ),
  },
  {
    id: 'contact',
    heading: '10. Contact Us',
    body: (
      <>
        <p>If you have any questions regarding this Cookie Policy or our use of cookies, please contact us.</p>
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
        <p><strong>How We Use Cookies on This Website</strong></p>
        <p>Our website uses the following categories of cookies:</p>
        <ul>
          <li><strong>Necessary Cookies:</strong> Required for the website to function properly (always active)</li>
          <li><strong>Analytics Cookies:</strong> Google Analytics for understanding website traffic and usage patterns</li>
          <li><strong>Marketing Cookies:</strong> Meta Pixel for measuring advertising campaign effectiveness</li>
          <li><strong>Functional Cookies:</strong> Optional website functionality and user preferences</li>
        </ul>
        <p><strong>Your Cookie Choices</strong></p>
        <p>When you first visit our website, you will see a cookie consent banner that allows you to:</p>
        <ul>
          <li><strong>Accept All:</strong> Enable all cookie categories</li>
          <li><strong>Reject Non-Essential:</strong> Keep only necessary cookies active</li>
          <li><strong>Manage Preferences:</strong> Choose which categories to enable individually</li>
        </ul>
        <p>You can change your cookie preferences at any time by clicking the <strong>"Cookie Settings"</strong> button in the footer of any page on our website.</p>
        <p><strong>Google Analytics</strong></p>
        <p>We use Google Analytics to understand how visitors use our website. Google Analytics collects anonymous information such as:</p>
        <ul>
          <li>Number of visitors</li>
          <li>Popular pages and navigation paths</li>
          <li>Time spent on pages</li>
          <li>Device types and browser information</li>
        </ul>
        <p>Google Analytics only loads if you accept Analytics Cookies in your cookie preferences.</p>
        <p><strong>Meta Pixel</strong></p>
        <p>We use Meta (Facebook) Pixel to measure the effectiveness of our advertising campaigns on Facebook and Instagram. This helps us understand how users discover our website and engage with our marketing content.</p>
        <p>Meta Pixel only loads if you accept Marketing Cookies in your cookie preferences.</p>
        <p><strong>Withdrawing Consent</strong></p>
        <p>To withdraw or change your cookie consent at any time:</p>
        <ul>
          <li>Click <strong>"Cookie Settings"</strong> in the footer of any page</li>
          <li>Toggle your preferred cookie categories on or off</li>
          <li>Click <strong>"Save Preferences"</strong> to apply your changes</li>
        </ul>
        <p>You can also manage cookies through your web browser settings, though this may affect website functionality.</p>
        <p><strong>Cookie Storage</strong></p>
        <p>Your cookie preferences are stored locally on your device for 30 days. After this period, you will be asked to review your cookie preferences again.</p>
        <p><strong>International Data Transfers</strong></p>
        <p>When you accept Analytics or Marketing cookies, certain information may be processed by third-party service providers located outside India. These providers include:</p>
        <ul>
          <li><strong>Google LLC</strong> (United States) — for Google Analytics</li>
          <li><strong>Meta Platforms, Inc.</strong> (United States) — for Meta Pixel</li>
        </ul>
        <p>These services operate under their own privacy policies and data protection frameworks. By enabling these cookie categories, you consent to such data transfers in accordance with their respective policies.</p>
        <p><strong>Legal Framework</strong></p>
        <p>Our cookie consent system is designed to comply with applicable privacy laws, including India's Digital Personal Data Protection Act, 2023 (DPDP Act) and the Digital Personal Data Protection Rules, 2025. We provide clear, granular choices and mechanisms for managing and withdrawing your consent.</p>
      </>
    ),
  },
]

export default function CookiesPage() {
  return (
    <LegalPage
      title="Cookie Policy"
      subtitle="Cookie Policy"
      intro="This policy explains how adyatech.com uses cookies and similar technologies, and how you can manage them."
      lastUpdated="July 25, 2026"
      sections={sections}
    />
  )
}
