"use client";

import { useState } from "react";
import { sendContact } from "@/lib/contact";
import { useSettings } from "../context/SettingsContext";

interface FormErrors {
    name?: string;
    email?: string;
    company?: string;
    phone?: string;
    message?: string;
    consent?: string;
}

export default function ContactContent() {

    const settings = useSettings();

    const [submitted, setSubmitted] = useState(false);
    const [errors, setErrors] = useState<FormErrors>({});
    const [touched, setTouched] = useState<Record<string, boolean>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showErrorModal, setShowErrorModal] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        company: '',
        phone: '',
        inquiry: 'new-project',
        message: '',
        consent: false,
    });

    const validateField = (name: string, value: string | boolean): string | undefined => {
        switch (name) {
            case 'name':
                if (!value || typeof value !== 'string' || value.trim().length < 2) {
                    return 'Name must be at least 2 characters';
                }
                if (value.trim().length > 100) {
                    return 'Name must be less than 100 characters';
                }
                // Only allow letters, spaces, hyphens, apostrophes, and periods
                const nameRegex = /^[a-zA-ZÀ-ſ\s\-\.\']{2,}$/;
                if (!nameRegex.test(value.trim())) {
                    return 'Name can only contain letters (no numbers)';
                }
                break;

            case 'email':
                if (!value || typeof value !== 'string') {
                    return 'Email is required';
                }
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(value.trim())) {
                    return 'Please enter a valid email address';
                }
                break;

            case 'company':
                if (value && typeof value === 'string' && value.trim()) {
                    if (value.trim().length < 2) {
                        return 'Company name must be at least 2 characters';
                    }
                    if (value.trim().length > 100) {
                        return 'Company name must be less than 100 characters';
                    }
                }
                break;

            case 'phone':
                if (value && typeof value === 'string' && value.trim()) {
                    const phoneRegex = /^[\d\s\-\+\(\)]{10,}$/;
                    const digitsOnly = value.replace(/[^\d]/g, ''); // Extract just the digits

                    if (!phoneRegex.test(value.trim())) {
                        return 'Please enter a valid phone number (min 10 digits)';
                    }
                    if (digitsOnly.length > 15) {
                        return 'Phone number cannot exceed 15 digits';
                    }
                }
                break;

            case 'message':
                if (!value || typeof value !== 'string' || value.trim().length < 10) {
                    return 'Message must be at least 10 characters';
                }
                if (value.trim().length > 2000) {
                    return 'Message must be less than 2000 characters';
                }
                break;

            case 'consent':
                if (!value) {
                    return 'You must consent to continue';
                }
                break;
        }
        return undefined;
    };

    const validateForm = (): boolean => {
        const newErrors: FormErrors = {};

        newErrors.name = validateField('name', formData.name);
        newErrors.email = validateField('email', formData.email);
        newErrors.phone = validateField('phone', formData.phone);
        newErrors.message = validateField('message', formData.message);
        newErrors.consent = validateField('consent', formData.consent);

        setErrors(newErrors);
        return !Object.values(newErrors).some(error => error !== undefined);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validate all fields
        if (!validateForm()) {
            return;
        }

        setIsSubmitting(true);

        try {
            await sendContact(formData);

            setSubmitted(true);
            setErrors({});
            setTouched({});

            setFormData({
                name: "",
                email: "",
                company: "",
                phone: "",
                inquiry: "new-project",
                message: "",
                consent: false,
            });

        } catch (err) {
            console.error(err);
            setErrorMessage("Failed to send message. Please check your connection and try again.");
            setShowErrorModal(true);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target
        const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined
        const newValue: string | boolean = type === 'checkbox' ? checked! : value;

        setFormData(prev => ({ ...prev, [name]: newValue }));

        // Validate on change if field was already touched
        if (touched[name]) {
            const error = validateField(name, newValue);
            setErrors(prev => ({ ...prev, [name]: error }));
        }
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name } = e.target;
        setTouched(prev => ({ ...prev, [name]: true }));

        const value = e.target.type === 'checkbox'
            ? (e.target as HTMLInputElement).checked
            : e.target.value;

        const error = validateField(name, value);
        setErrors(prev => ({ ...prev, [name]: error }));
    };

    return (
        <>
            <section className="contact-section">
                <div className="container">
                    <div className="contact-grid">

                        <div className="contact-info">
                            <div className="contact-info__intro">
                                <h2>Reach us <em>directly</em>.</h2>
                                <p>The fastest way to a real human is the channels below. We try to keep our inbox to zero. We almost succeed.</p>
                            </div>

                            <div className="contact-channels">
                                <a href="https://mail.google.com/mail/?view=cm&fs=1&to=hello@adyatech.com" target="_blank" rel="noopener noreferrer" className="contact-channel">
                                    <div className="contact-channel__icon">@</div>
                                    <div className="contact-channel__text">
                                        <span className="contact-channel__label">Email</span>
                                        <span className="contact-channel__value">hello@adyatech.com</span>
                                    </div>
                                </a>
                                <a href={`tel:${settings.phones[0].value}`} className="contact-channel">
                                    <div className="contact-channel__icon">☏</div>
                                    <div className="contact-channel__text">
                                        <span className="contact-channel__label">Phone</span>
                                        <span className="contact-channel__value">{settings.phones[0].value}</span>
                                    </div>
                                </a>
                                <a href="https://wa.me/message/CZWJEKQ556UZI1" target="_blank" rel="noopener noreferrer" className="contact-channel">
                                    <div className="contact-channel__icon">
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                                        </svg>
                                    </div>
                                    <div className="contact-channel__text">
                                        <span className="contact-channel__label">WhatsApp</span>
                                        <span className="contact-channel__value">Chat with us</span>
                                    </div>
                                </a>
                                <a href={`${settings.socials[2].value}`} target="_blank" rel="noopener noreferrer" className="contact-channel">
                                    <div className="contact-channel__icon">in</div>
                                    <div className="contact-channel__text">
                                        <span className="contact-channel__label">LinkedIn</span>
                                        <span className="contact-channel__value">@adyatech</span>
                                    </div>
                                </a>
                            </div>

                            <div className="contact-office">
                                <h4>Our office</h4>
                                <p>
                                    <a href={`${settings.addresses[0].link_url}`} target="_blank" rel="noopener noreferrer">
                                        {settings.addresses[0].value.split("\n").map((line, index) => (
                                            <span key={index}>
                                                {line}
                                                <br />
                                            </span>
                                        ))}
                                    </a>
                                </p>
                                <span className="hours">Mon–Fri · 10:00 AM – 7:00 PM IST</span>
                            </div>
                        </div>

                        <div className="contact-form-card">
                            {submitted ? (
                                <div className="form-success">
                                    <div className="form-success__icon">✓</div>
                                    <h3>Got it. We'll be in touch.</h3>
                                    <p>Thanks for reaching out — we'll come back within one business day with next steps. If it's urgent, WhatsApp is the fastest path.</p>
                                    <div className="form-success__actions">
                                        <button
                                            type="button"
                                            className="form-submit"
                                            onClick={() => setSubmitted(false)}
                                        >
                                            Send another message
                                            <span className="arrow">↗</span>
                                        </button>
                                        <a
                                            href="https://wa.me/message/CZWJEKQ556UZI1"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="form-submit form-submit--secondary"
                                        >
                                            WhatsApp us
                                            <span className="arrow">↗</span>
                                        </a>
                                    </div>
                                </div>
                            ) : (
                                <>
                                    <div className="contact-form-card__head">
                                        <span className="eyebrow">Send us a message · 01</span>
                                        <h3>Tell us about <em>your project</em>.</h3>
                                    </div>

                                    <form onSubmit={handleSubmit} noValidate>
                                        <div className="form-grid">
                                            <div className="form-field">
                                                <label htmlFor="name">Name <span className="req">*</span></label>
                                                <input
                                                    id="name"
                                                    name="name"
                                                    type="text"
                                                    value={formData.name}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    placeholder="Your full name"
                                                    className={errors.name && touched.name ? 'form-field--error' : ''}
                                                    aria-invalid={errors.name && touched.name ? 'true' : 'false'}
                                                    aria-describedby={errors.name && touched.name ? 'name-error' : undefined}
                                                />
                                                {errors.name && touched.name && (
                                                    <span id="name-error" className="form-field__error">{errors.name}</span>
                                                )}
                                            </div>
                                            <div className="form-field">
                                                <label htmlFor="email">Work email <span className="req">*</span></label>
                                                <input
                                                    id="email"
                                                    name="email"
                                                    type="email"
                                                    value={formData.email}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    placeholder="you@company.com"
                                                    className={errors.email && touched.email ? 'form-field--error' : ''}
                                                    aria-invalid={errors.email && touched.email ? 'true' : 'false'}
                                                    aria-describedby={errors.email && touched.email ? 'email-error' : undefined}
                                                />
                                                {errors.email && touched.email && (
                                                    <span id="email-error" className="form-field__error">{errors.email}</span>
                                                )}
                                            </div>
                                            <div className="form-field">
                                                <label htmlFor="company">Company</label>
                                                <input
                                                    id="company"
                                                    name="company"
                                                    type="text"
                                                    value={formData.company}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    placeholder="Where you work"
                                                    className={errors.company && touched.company ? 'form-field--error' : ''}
                                                    aria-invalid={errors.company && touched.company ? 'true' : 'false'}
                                                    aria-describedby={errors.company && touched.company ? 'company-error' : undefined}
                                                />
                                                {errors.company && touched.company && (
                                                    <span id="company-error" className="form-field__error">{errors.company}</span>
                                                )}
                                            </div>
                                            <div className="form-field">
                                                <label htmlFor="phone">Phone / WhatsApp</label>
                                                <input
                                                    id="phone"
                                                    name="phone"
                                                    type="tel"
                                                    value={formData.phone}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    placeholder="+91 …"
                                                    className={errors.phone && touched.phone ? 'form-field--error' : ''}
                                                    aria-invalid={errors.phone && touched.phone ? 'true' : 'false'}
                                                    aria-describedby={errors.phone && touched.phone ? 'phone-error' : undefined}
                                                />
                                                {errors.phone && touched.phone && (
                                                    <span id="phone-error" className="form-field__error">{errors.phone}</span>
                                                )}
                                            </div>
                                            <div className="form-field form-field--full">
                                                <label htmlFor="inquiry">What's this about? <span className="req">*</span></label>
                                                <select
                                                    id="inquiry"
                                                    name="inquiry"
                                                    value={formData.inquiry}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                >
                                                    <option value="new-project">A new project</option>
                                                    <option value="existing-build">Improving an existing build</option>
                                                    <option value="alumnyo">Alumnyo (alumni SaaS)</option>
                                                    <option value="osciva">Osciva (AI services)</option>
                                                    <option value="careers">Careers / hiring</option>
                                                    <option value="partnership">Partnership / vendor</option>
                                                    <option value="other">Something else</option>
                                                </select>
                                            </div>
                                            <div className="form-field form-field--full">
                                                <label htmlFor="message">Your message <span className="req">*</span></label>
                                                <textarea
                                                    id="message"
                                                    name="message"
                                                    value={formData.message}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    placeholder="Briefly — what are you trying to build, what's the rough timeline, what's getting in the way?"
                                                    className={errors.message && touched.message ? 'form-field--error' : ''}
                                                    aria-invalid={errors.message && touched.message ? 'true' : 'false'}
                                                    aria-describedby={errors.message && touched.message ? 'message-error' : undefined}
                                                ></textarea>
                                                <span className="form-field__hint">A few sentences is plenty. We'll ask for more on the call.</span>
                                                {errors.message && touched.message && (
                                                    <span id="message-error" className="form-field__error">{errors.message}</span>
                                                )}
                                            </div>
                                            <div className="form-field form-field--full">
                                                <label className={`form-consent ${errors.consent && touched.consent ? 'form-consent--error' : ''}`}>
                                                    <input
                                                        type="checkbox"
                                                        name="consent"
                                                        checked={formData.consent}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                    />
                                                    <span>I consent to Adyatech contacting me about this enquiry. I understand my details will be handled per the <a href="/privacy">privacy policy</a>.</span>
                                                </label>
                                                {errors.consent && touched.consent && (
                                                    <span className="form-field__error">{errors.consent}</span>
                                                )}
                                            </div>
                                        </div>

                                        <div className="form-actions">
                                            <span className="form-actions__note">→ We respond within 1 business day</span>
                                            <button type="submit" className="form-submit" disabled={isSubmitting}>
                                                {isSubmitting ? (
                                                    <>
                                                        <span className="form-submit__spinner"></span>
                                                        Sending...
                                                    </>
                                                ) : (
                                                    <>
                                                        Send message
                                                        <span className="arrow">↗</span>
                                                    </>
                                                )}
                                            </button>
                                        </div>
                                    </form>
                                </>
                            )}
                        </div>

                    </div>
                </div>
            </section>

            {/* Error Modal */}
            {showErrorModal && (
                <div className="error-modal" onClick={() => setShowErrorModal(false)}>
                    <div className="error-modal__content" onClick={(e) => e.stopPropagation()}>
                        <div className="error-modal__icon">⚠</div>
                        <h3>Oops! Something went wrong</h3>
                        <p>{errorMessage}</p>
                        <div className="error-modal__actions">
                            <button
                                type="button"
                                className="form-submit"
                                onClick={() => setShowErrorModal(false)}
                            >
                                Try again
                                <span className="arrow">↗</span>
                            </button>
                            <a
                                href="https://wa.me/message/CZWJEKQ556UZI1"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="form-submit form-submit--secondary"
                            >
                                Contact via WhatsApp
                                <span className="arrow">↗</span>
                            </a>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}