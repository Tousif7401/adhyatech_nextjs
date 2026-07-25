'use client'

import { useState, useEffect } from 'react'
import UtilityBar from '../components/UtilityBar'
import Header from '../components/Header'
import PageHero from '../components/PageHero'
import { Footer } from '../components/Sections4'

import { sendQuote } from "@/lib/quote";

type Step = 1 | 2 | 3 | 4

const SERVICE_TYPES = [
  { value: 'web', icon: 'WEB', title: 'Website / Web App', desc: 'Joomla, Next.js, Laravel — marketing sites to full apps' },
  { value: 'software', icon: 'ERP', title: 'Custom Software', desc: 'ERPs, CRMs, SaaS products, internal tools' },
  { value: 'ai', icon: 'AI', title: 'AI / Osciva', desc: 'RAG, agents, voice AI, custom ML' },
  { value: 'mobile', icon: 'APP', title: 'Mobile App', desc: 'Flutter or native iOS / Android' },
  { value: 'alumnyo', icon: 'AL', title: 'Alumnyo', desc: 'Alumni management SaaS for schools and universities' },
  { value: 'other', icon: 'OTH', title: 'Something else', desc: "Not sure — let's talk it through" },
]

export default function QuotePage() {
  const [step, setStep] = useState<Step>(1)
  useEffect(() => { setErrors({}); }, [step]);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const validateStep = () => {
    const newErrors: Record<string, string> = {};

    if (step === 1) {
      if (!form.serviceType) {
        newErrors.serviceType = "Please select a service.";
      }
    }

    if (step === 2) {
      if (!form.description.trim()) {
        newErrors.description = "Please describe your project.";
      } else if (form.description.trim().length < 10) {
        newErrors.description =
          "Description must be at least 10 characters.";
      }
    }

    if (step === 3) {
      if (!form.budget) {
        newErrors.budget = "Please select a budget.";
      }

      if (!form.timeline) {
        newErrors.timeline = "Please select a timeline.";
      }
    }

    if (step === 4) {
      if (!form.name.trim()) {
        newErrors.name = "Name is required.";
      }

      if (!form.email.trim()) {
        newErrors.email = "Email is required.";
      } else if (!/\S+@\S+\.\S+/.test(form.email)) {
        newErrors.email = "Enter a valid email.";
      }

      if (!form.consent) {
        newErrors.consent = "Please accept the privacy policy.";
      }
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };
  const initialForm = {
    serviceType: "",
    projectName: "",
    description: "",
    goals: "",
    audience: "",
    budget: "",
    timeline: "",
    startDate: "",
    name: "",
    email: "",
    company: "",
    phone: "",
    role: "",
    consent: false,
  };
  const [form, setForm] = useState(initialForm);

  const update = (key: keyof typeof form, value: string | boolean) => {
    setForm(prev => ({
      ...prev,
      [key]: value,
    }));

    setErrors(prev => ({
      ...prev,
      [key]: "",
    }));
  };

  const canAdvance = () => {
    // if (step === 1) return !!form.serviceType
    // if (step === 2) return form.description.length > 10
    // if (step === 3) return !!form.budget && !!form.timeline
    // if (step === 4) return form.name && form.email && form.consent
    return true
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateStep()) return;

    setLoading(true);

    try {
      await sendQuote(form);

      setSubmitted(true);

      setForm(initialForm);
    } catch (err) {
      console.error(err);
      alert("Failed to submit quote request.");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <>
        <UtilityBar />
        <Header />
        <main>
          <section className="quote-section" style={{ minHeight: '70vh', display: 'flex', alignItems: 'center' }}>
            <div className="container">
              <div className="quote-wrapper">
                <div className="quote-card" style={{ textAlign: 'center', padding: '64px 32px' }}>
                  <div className="form-success__icon" style={{ background: 'var(--brand-gold)' }}>✓</div>
                  <h2 style={{ fontFamily: 'var(--f-display)', fontSize: 'clamp(1.6rem,2.6vw,2.2rem)', fontWeight: 700, color: 'var(--char)', marginTop: 24, marginBottom: 14, letterSpacing: '-0.02em' }}>
                    Quote request <em style={{ fontFamily: 'var(--f-serif)', fontStyle: 'italic', fontWeight: 400 }}>received</em>.
                  </h2>
                  <p style={{ fontSize: '1rem', lineHeight: 1.6, color: 'rgba(19,19,25,0.7)', maxWidth: '50ch', margin: '0 auto 32px' }}>
                    Thanks, {form.name || 'there'}. We've got your request and a senior person on our team will read it personally. Expect a response within <strong>one business day</strong> — usually a few short questions, then a proposed scope and price.
                  </p>
                  <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
                    <a href="/" className="btn btn--red">Back to home</a>
                    <a href="/portfolio" className="btn btn--ghost-d">Browse our work</a>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </>
    )
  }

  return (
    <>
      <UtilityBar />
      <Header />
      <main>
        <PageHero
          breadcrumb={[{ label: 'Home', href: '/' }, { label: 'Request a quote' }]}
          title={<>Tell us what you need.<br /><em>We'll come back with numbers</em>.</>}
          lede={<>Four short steps. You'll get a real cost estimate and proposed timeline within one business day — from a senior engineer who actually reads your description, not a sales auto-responder.</>}
        />

        <section className="quote-section">
          <div className="container">
            <div className="quote-wrapper">

              <div className="quote-stepper">
                {[
                  { n: 1, label: 'Service' },
                  { n: 2, label: 'Project' },
                  { n: 3, label: 'Budget' },
                  { n: 4, label: 'You' },
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

              <form onSubmit={handleSubmit} className="quote-card">

                {/* Step 1: Service type */}
                <div className={`quote-step${step === 1 ? ' is-active' : ''}`}>
                  <div className="quote-card__head">
                    <span className="eyebrow">Step 1 of 4</span>
                    <h2>What kind of <em>project</em> is this?</h2>
                    <p>Pick the closest match. We'll get into specifics next.</p>
                  </div>
                  {errors.serviceType && (
                    <p className="error-text" style={{ marginBottom: "10px" }}>
                      {errors.serviceType}
                    </p>
                  )}
                  <div className="service-type-grid">
                    {SERVICE_TYPES.map(svc => (
                      <label
                        key={svc.value}
                        className={`service-type-card${form.serviceType === svc.value ? ' is-checked' : ''}`}
                      >
                        <input
                          type="radio"
                          name="serviceType"
                          value={svc.value}
                          checked={form.serviceType === svc.value}
                          onChange={(e) => update('serviceType', e.target.value)}
                        />
                        <span className="service-type-card__icon">{svc.icon}</span>
                        <span className="service-type-card__title">{svc.title}</span>
                        <span className="service-type-card__desc">{svc.desc}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Step 2: Project details */}
                <div className={`quote-step${step === 2 ? ' is-active' : ''}`}>
                  <div className="quote-card__head">
                    <span className="eyebrow">Step 2 of 4</span>
                    <h2>Tell us about it <em>in your words</em>.</h2>
                    <p>Don't worry about technical details — what are you trying to do, and for whom?</p>
                  </div>
                  <div className="form-grid">
                    <div className="form-field form-field--full">
                      <label htmlFor="projectName">Project name or working title</label>
                      <input id="projectName" type="text" value={form.projectName} onChange={(e) => update('projectName', e.target.value)} placeholder="e.g. Alumni portal v2, Internal CRM, Mobile booking app" />
                    </div>
                    <div className="form-field form-field--full">
                      <label htmlFor="description">What are you trying to build? <span className="req">*</span></label>
                      {errors.description && (
                        <p className="error-text">
                          {errors.description}
                        </p>
                      )}
                      <textarea id="description" value={form.description} onChange={(e) => update('description', e.target.value)} placeholder="A few sentences is plenty. What's the project, what problem does it solve?"></textarea>
                      <span className="form-field__hint">Minimum 10 characters. {form.description.length} so far.</span>
                    </div>
                    <div className="form-field">
                      <label htmlFor="goals">Main goal</label>
                      <input id="goals" type="text" value={form.goals} onChange={(e) => update('goals', e.target.value)} placeholder="e.g. Increase admissions, reduce manual work" />
                    </div>
                    <div className="form-field">
                      <label htmlFor="audience">Who will use it?</label>
                      <input id="audience" type="text" value={form.audience} onChange={(e) => update('audience', e.target.value)} placeholder="e.g. Students, internal staff, patients" />
                    </div>
                  </div>
                </div>

                {/* Step 3: Budget + Timeline */}
                <div className={`quote-step${step === 3 ? ' is-active' : ''}`}>
                  <div className="quote-card__head">
                    <span className="eyebrow">Step 3 of 4</span>
                    <h2>Budget and <em>timing</em>.</h2>
                    <p>Approximate is fine. This helps us scope the right team and approach.</p>
                  </div>

                  <div className="form-field form-field--full" style={{ marginBottom: 24 }}>
                    <label>Budget range <span className="req">*</span></label>
                    {errors.budget && (
                      <p className="error-text">
                        {errors.budget}
                      </p>
                    )}
                    <div className="chip-group">
                      {['< ₹2 lakh', '₹2-5 lakh', '₹5-10 lakh', '₹10-25 lakh', '₹25 lakh - 1 cr', '> ₹1 cr', 'Not sure yet'].map(b => (
                        <span key={b}>
                          <input
                            type="radio"
                            name="budget"
                            id={`budget-${b}`}
                            value={b}
                            checked={form.budget === b}
                            onChange={(e) => update('budget', e.target.value)}
                          />
                          <label htmlFor={`budget-${b}`}>{b}</label>
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="form-field form-field--full" style={{ marginBottom: 24 }}>
                    <label>Ideal timeline <span className="req">*</span></label>
                    {errors.timeline && (
                      <p className="error-text">
                        {errors.timeline}
                      </p>
                    )}
                    <div className="chip-group">
                      {['ASAP / weeks', '1-3 months', '3-6 months', '6+ months', 'Flexible'].map(t => (
                        <span key={t}>
                          <input
                            type="radio"
                            name="timeline"
                            id={`timeline-${t}`}
                            value={t}
                            checked={form.timeline === t}
                            onChange={(e) => update('timeline', e.target.value)}
                          />
                          <label htmlFor={`timeline-${t}`}>{t}</label>
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="form-field">
                    <label htmlFor="startDate">Hoped-for start date</label>
                    <input id="startDate" type="date" value={form.startDate} onChange={(e) => update('startDate', e.target.value)} />
                    <span className="form-field__hint">Approximate is fine.</span>
                  </div>
                </div>

                {/* Step 4: Your details */}
                <div className={`quote-step${step === 4 ? ' is-active' : ''}`}>
                  <div className="quote-card__head">
                    <span className="eyebrow">Step 4 of 4</span>
                    <h2>How do we <em>reach you?</em></h2>
                    <p>We send the quote to one human. No automated funnels.</p>
                  </div>
                  <div className="form-grid">
                    <div className="form-field">
                      <label htmlFor="qname">Your name <span className="req">*</span></label>
                      {errors.name && (
                        <p className="error-text">
                          {errors.name}
                        </p>
                      )}
                      <input id="qname" type="text" value={form.name} onChange={(e) => update('name', e.target.value)} placeholder="Full name" />
                    </div>
                    <div className="form-field">
                      <label htmlFor="qemail">Work email <span className="req">*</span></label>
                      {errors.email && (
                        <p className="error-text">
                          {errors.email}
                        </p>
                      )}
                      <input id="qemail" type="email" value={form.email} onChange={(e) => update('email', e.target.value)} placeholder="you@company.com" />
                    </div>
                    <div className="form-field">
                      <label htmlFor="qcompany">Company / Organisation</label>
                      <input id="qcompany" type="text" value={form.company} onChange={(e) => update('company', e.target.value)} placeholder="Where you work" />
                    </div>
                    <div className="form-field">
                      <label htmlFor="qrole">Your role</label>
                      <input id="qrole" type="text" value={form.role} onChange={(e) => update('role', e.target.value)} placeholder="e.g. Registrar, Founder, IT lead" />
                    </div>
                    <div className="form-field form-field--full">
                      <label htmlFor="qphone">Phone / WhatsApp</label>
                      <input id="qphone" type="tel" value={form.phone} onChange={(e) => update('phone', e.target.value)} placeholder="+91 …" />
                      <span className="form-field__hint">Optional — we'll usually email first. WhatsApp helps for back-and-forth.</span>
                    </div>
                    <div className="form-field form-field--full">
                      <label className="form-consent">
                        <input type="checkbox" checked={form.consent} onChange={(e) => update('consent', e.target.checked)} />
                        <span>I consent to Adyatech contacting me about this quote request. I understand my details will be handled per the <a href="/privacy">privacy policy</a>.</span>
                      </label>
                      {errors.consent && (
                        <p className="error-text">
                          {errors.consent}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="quote-nav">
                  <button
                    type="button"
                    className="quote-nav__back"
                    onClick={() => {
                      setErrors({});
                      setStep((step - 1) as Step);
                    }}
                    disabled={step === 1}
                  >
                    ← Back
                  </button>
                  {step < 4 ? (
                    <button
                      type="button"
                      className="quote-nav__next"
                      disabled={!canAdvance()}
                      onClick={() => {
                        if (validateStep()) {
                          setStep((step + 1) as Step);
                        }
                      }}
                    >
                      Next stepa →
                    </button>
                  ) : (
                    <button
                      type="submit"
                      className="quote-nav__next is-final"
                      disabled={loading || !canAdvance()}
                    >
                      {loading ? "Sending..." : "Send quote request"}
                      {!loading && <span>↗</span>}
                    </button>
                  )}
                </div>

              </form>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
