import UtilityBar from '../components/UtilityBar'
import Header from '../components/Header'
import PageHero from '../components/PageHero'
import { Footer } from '../components/Sections4'
import PrivacyRequestForm from '@/components/PrivacyRequestForm'
import './privacy-request.css'

import type { Metadata } from "next";

const storageUrl = process.env.NEXT_PUBLIC_STORAGE_URL;

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Privacy Request — Adyatech Solutions",
    description: "Exercise your DPDP rights - request access, correction, or deletion of your personal data. Submit a privacy request to Adyatech Solutions.",
  };
}

export default async function PrivacyRequestPage() {
  return (
    <>
      <UtilityBar />
      <Header />
      <main className="privacy-request-main">
        <PageHero
          breadcrumb={[{ label: 'Home', href: '/' }, { label: 'Privacy Request' }]}
          title={<>Exercise your <em>DPDP rights</em>.</>}
          lede={<>Under India's Digital Personal Data Protection Act, you have the right to access, correct, or delete your personal data. Use this form to submit a privacy request. We'll respond within 7 days with acknowledgment and within 30 days with a resolution.</>}
        />
        <section className="privacy-request-section">
          <div className="container">
            <div className="privacy-request-wrapper">
              <div className="privacy-request-info">
                <h2>Your <em>DPDP Rights</em></h2>
                <p>Under the Digital Personal Data Protection Act, 2023, you have the following rights regarding your personal data:</p>
                <ul>
                  <li><strong>Right to Access:</strong> Request a summary of your personal data and how it's processed</li>
                  <li><strong>Right to Correction:</strong> Request correction of inaccurate or incomplete data</li>
                  <li><strong>Right to Erasure:</strong> Request deletion of your data where legally permitted</li>
                  <li><strong>Right to Withdraw Consent:</strong> Withdraw previously given consent at any time</li>
                  <li><strong>Right to Grievance:</strong> File a complaint about how your data is handled</li>
                </ul>
                <div className="privacy-request-contact">
                  <h3>Need help?</h3>
                  <p>For questions about your privacy rights or this form, contact us at:</p>
                  <a href="mailto:privacy@adyatech.com" className="btn btn--ghost-d btn--sm">
                    privacy@adyatech.com
                  </a>
                </div>
              </div>
              <PrivacyRequestForm />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
