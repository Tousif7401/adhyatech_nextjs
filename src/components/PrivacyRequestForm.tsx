'use client'

import { useState } from 'react'
import { sendPrivacyRequest } from "@/lib/privacy-request"
import './PrivacyRequestForm.css'

type Step = 1 | 2 | 3 | 4

const REQUEST_TYPES = [
  { value: 'access', title: 'Access Request', desc: 'I want to know what personal information you have about me' },
  { value: 'correction', title: 'Correction Request', desc: 'I want to correct inaccurate information' },
  { value: 'erasure', title: 'Erasure Request', desc: 'I want my data deleted' },
  { value: 'withdraw', title: 'Withdraw Consent', desc: 'I want to withdraw my consent' },
  { value: 'grievance', title: 'Grievance', desc: 'I want to file a complaint' },
]

interface FormErrors {
  requestType?: string
  name?: string
  email?: string
  description?: string
  consent?: string
}

interface FormData {
  requestType: string
  name: string
  email: string
  phone: string
  description: string
  consent: boolean
}

export default function PrivacyRequestForm() {
  const [step, setStep] = useState<Step>(1)
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [errors, setErrors] = useState<FormErrors>({})

  const initialForm: FormData = {
    requestType: '',
    name: '',
    email: '',
    phone: '',
    description: '',
    consent: false,
  }

  const [form, setForm] = useState<FormData>(initialForm)

  const validateStep = () => {
    const newErrors: FormErrors = {}

    if (step === 1) {
      if (!form.requestType) {
        newErrors.requestType = 'Please select a request type.'
      }
    }

    if (step === 2) {
      if (!form.name.trim()) {
        newErrors.name = 'Name is required.'
      } else if (form.name.trim().length < 2) {
        newErrors.name = 'Name must be at least 2 characters.'
      }

      if (!form.email.trim()) {
        newErrors.email = 'Email is required.'
      } else if (!/\S+@\S+\.\S+/.test(form.email)) {
        newErrors.email = 'Enter a valid email address.'
      }
    }

    if (step === 3) {
      if (!form.description.trim()) {
        newErrors.description = 'Please describe your request.'
      } else if (form.description.trim().length < 20) {
        newErrors.description = 'Description must be at least 20 characters.'
      }
    }

    if (step === 4) {
      if (!form.consent) {
        newErrors.consent = 'Please accept the privacy policy to continue.'
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateStep()) return

    setLoading(true)

    try {
      await sendPrivacyRequest(form)
      setSubmitted(true)
      setForm(initialForm)
    } catch (err) {
      console.error(err)
      alert('Failed to submit privacy request. Please try again or contact privacy@adyatech.com directly.')
    } finally {
      setLoading(false)
    }
  }

  const update = (key: keyof FormData, value: string | boolean) => {
    setForm(prev => ({ ...prev, [key]: value }))
    setErrors(prev => ({ ...prev, [key]: undefined }))
  }

  const canAdvance = () => {
    if (step === 1) return !!form.requestType
    if (step === 2) return form.name && form.email
    if (step === 3) return form.description.length >= 20
    if (step === 4) return form.consent
    return true
  }

  if (submitted) {
    return (
      <div className="privacy-request-success" style={{ textAlign: 'center', padding: '64px 32px', maxWidth: '600px', margin: '0 auto' }}>
        <div className="form-success__icon" style={{ background: 'var(--brand-gold)', width: '64px', height: '64px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px', fontSize: '32px' }}>
          ✓
        </div>
        <h2 style={{ fontFamily: 'var(--f-display)', fontSize: 'clamp(1.6rem,2.6vw,2.2rem)', fontWeight: 700, color: 'var(--fg)', marginBottom: 14, letterSpacing: '-0.02em' }}>
          Privacy request <em style={{ fontFamily: 'var(--f-serif)', fontStyle: 'italic', fontWeight: 400 }}>received</em>.
        </h2>
        <p style={{ fontSize: '1rem', lineHeight: 1.6, color: 'var(--fg-mute)', marginBottom: 32 }}>
          Thanks, {form.name || 'there'}. We've received your request and will respond within <strong>7 business days</strong> with an acknowledgment, and within <strong>30 days</strong> with a resolution. If your request is urgent, please contact us directly at <a href="mailto:privacy@adyatech.com" style={{ color: 'var(--brand-gold)' }}>privacy@adyatech.com</a>.
        </p>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <button onClick={() => { setSubmitted(false); setStep(1) }} className="btn btn--red btn--sm">
            Submit another request
          </button>
          <a href="/" className="btn btn--ghost-d btn--sm">Back to home</a>
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="privacy-request-form">
      <div className="privacy-request-stepper">
        {[
          { n: 1, label: 'Request Type' },
          { n: 2, label: 'Your Details' },
          { n: 3, label: 'Description' },
          { n: 4, label: 'Review' },
        ].map((s, idx) => (
          <div key={s.n} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div className={`quote-stepper__step${step === s.n ? ' is-active' : ''}${step > s.n ? ' is-done' : ''}`}>
              <div className="quote-stepper__num">{step > s.n ? '✓' : s.n}</div>
              <span className="quote-stepper__label">{s.label}</span>
            </div>
            {idx < 3 && <div className="quote-stepper__line"></div>}
          </div>
        ))}
      </div>

      <div className="privacy-request-card">
        {/* Step 1: Request Type */}
        <div className={`privacy-request-step${step === 1 ? ' is-active' : ''}`}>
          <div className="privacy-request-card__head">
            <span className="eyebrow">Step 1 of 4</span>
            <h2>What type of <em>request</em> is this?</h2>
            <p>Select the type of privacy request you would like to make.</p>
          </div>
          {errors.requestType && (
            <p className="error-text" style={{ marginBottom: "10px" }}>
              {errors.requestType}
            </p>
          )}
          <div className="request-type-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16 }}>
            {REQUEST_TYPES.map(type => (
              <label
                key={type.value}
                className={`request-type-card${form.requestType === type.value ? ' is-checked' : ''}`}
                style={{
                  display: 'block',
                  padding: '24px',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
              >
                <input
                  type="radio"
                  name="requestType"
                  value={type.value}
                  checked={form.requestType === type.value}
                  onChange={(e) => update('requestType', e.target.value)}
                  style={{ display: 'none' }}
                />
                <span className="request-type-card__title" style={{ display: 'block', fontWeight: 600, marginBottom: 8, color: 'var(--fg)' }}>{type.title}</span>
                <span className="request-type-card__desc" style={{ display: 'block', fontSize: '0.875rem', color: 'var(--fg-mute)' }}>{type.desc}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Step 2: Your Details */}
        <div className={`privacy-request-step${step === 2 ? ' is-active' : ''}`}>
          <div className="privacy-request-card__head">
            <span className="eyebrow">Step 2 of 4</span>
            <h2>Your <em>contact details</em>.</h2>
            <p>We need your information to verify your identity and respond to your request.</p>
          </div>
          <div className="form-grid">
            <div className="form-field">
              <label htmlFor="pr-name">Full Name <span className="req">*</span></label>
              <input
                id="pr-name"
                type="text"
                value={form.name}
                onChange={(e) => update('name', e.target.value)}
                placeholder="Your full name"
                className={errors.name ? 'form-field--error' : ''}
              />
              {errors.name && <p className="error-text">{errors.name}</p>}
            </div>
            <div className="form-field">
              <label htmlFor="pr-email">Email Address <span className="req">*</span></label>
              <input
                id="pr-email"
                type="email"
                value={form.email}
                onChange={(e) => update('email', e.target.value)}
                placeholder="you@example.com"
                className={errors.email ? 'form-field--error' : ''}
              />
              {errors.email && <p className="error-text">{errors.email}</p>}
            </div>
            <div className="form-field form-field--full">
              <label htmlFor="pr-phone">Phone (Optional)</label>
              <input
                id="pr-phone"
                type="tel"
                value={form.phone}
                onChange={(e) => update('phone', e.target.value)}
                placeholder="+91 …"
              />
              <span className="form-field__hint">Optional — helps us verify your identity if needed</span>
            </div>
          </div>
        </div>

        {/* Step 3: Description */}
        <div className={`privacy-request-step${step === 3 ? ' is-active' : ''}`}>
          <div className="privacy-request-card__head">
            <span className="eyebrow">Step 3 of 4</span>
            <h2>Tell us <em>more</em>.</h2>
            <p>Please provide details about your request so we can help you effectively.</p>
          </div>
          <div className="form-field">
            <label htmlFor="pr-description">Request Details <span className="req">*</span></label>
            {errors.description && <p className="error-text">{errors.description}</p>}
            <textarea
              id="pr-description"
              value={form.description}
              onChange={(e) => update('description', e.target.value)}
              placeholder="Please describe your request in detail. Include specific information about what data you're concerned about, what you'd like us to do, and any other relevant context."
              rows={6}
              style={{ width: '100%', padding: '12px 16px', border: '1px solid var(--line-d)', borderRadius: '4px', background: 'rgba(245,242,234,0.04)', color: 'var(--fg)' }}
              className={errors.description ? 'form-field--error' : ''}
            />
            <span className="form-field__hint">Minimum 20 characters. {form.description.length} so far.</span>
          </div>
        </div>

        {/* Step 4: Review */}
        <div className={`privacy-request-step${step === 4 ? ' is-active' : ''}`}>
          <div className="privacy-request-card__head">
            <span className="eyebrow">Step 4 of 4</span>
            <h2>Review & <em>submit</em>.</h2>
            <p>Please review your request and confirm to submit.</p>
          </div>
          <div className="privacy-request-review" style={{ padding: '24px', background: 'rgba(245,242,234,0.04)', borderRadius: '8px', marginBottom: 24 }}>
            <div style={{ marginBottom: 16 }}>
              <span className="form-field__hint">Request Type</span>
              <p style={{ fontSize: '1.125rem', fontWeight: 600, marginTop: 4 }}>
                {REQUEST_TYPES.find(t => t.value === form.requestType)?.title || 'Not selected'}
              </p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16, marginBottom: 16 }}>
              <div>
                <span className="form-field__hint">Name</span>
                <p style={{ marginTop: 4 }}>{form.name || 'Not provided'}</p>
              </div>
              <div>
                <span className="form-field__hint">Email</span>
                <p style={{ marginTop: 4 }}>{form.email || 'Not provided'}</p>
              </div>
            </div>
            <div>
              <span className="form-field__hint">Description</span>
              <p style={{ marginTop: 4, lineHeight: 1.6 }}>{form.description || 'Not provided'}</p>
            </div>
          </div>
          <div className="form-field">
            <label className={`form-consent ${errors.consent ? 'form-consent--error' : ''}`}>
              <input
                type="checkbox"
                checked={form.consent}
                onChange={(e) => update('consent', e.target.checked)}
              />
              <span>I consent to Adyatech processing this privacy request. I understand my details will be handled per the <a href="/privacy">privacy policy</a> and that I will receive a response within 30 days.</span>
            </label>
            {errors.consent && <p className="error-text">{errors.consent}</p>}
          </div>
        </div>

        <div className="privacy-request-nav">
          <button
            type="button"
            className="quote-nav__back"
            onClick={() => { setErrors({}); setStep((step - 1) as Step) }}
            disabled={step === 1}
          >
            ← Back
          </button>
          {step < 4 ? (
            <button
              type="button"
              className="quote-nav__next"
              disabled={!canAdvance()}
              onClick={() => { if (validateStep()) setStep((step + 1) as Step) }}
            >
              Next step →
            </button>
          ) : (
            <button
              type="submit"
              className="quote-nav__next is-final"
              disabled={loading || !canAdvance()}
            >
              {loading ? 'Submitting...' : 'Submit privacy request'}
              {!loading && <span>↗</span>}
            </button>
          )}
        </div>
      </div>
    </form>
  )
}
