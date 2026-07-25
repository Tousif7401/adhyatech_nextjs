"use client";

import { useState } from "react";
import { sendContact } from "@/lib/contact";
import { useSettings } from "../context/SettingsContext";


export default function ContactContent() {

    const settings = useSettings();

    const [submitted, setSubmitted] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        company: '',
        phone: '',
        inquiry: 'new-project',
        message: '',
        consent: false,
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            await sendContact(formData);

            setSubmitted(true);

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
            alert("Failed to send message.");
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target
        const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined
        setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }))
    }

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
                                <a href={`mailto:${settings.emails[0].value}`} className="contact-channel">
                                    <div className="contact-channel__icon">@</div>
                                    <div className="contact-channel__text">
                                        <span className="contact-channel__label">Email</span>
                                        <span className="contact-channel__value">{settings.emails[0].value}</span>
                                    </div>
                                </a>
                                <a href={`tel:${settings.phones[0].value}`} className="contact-channel">
                                    <div className="contact-channel__icon">☏</div>
                                    <div className="contact-channel__text">
                                        <span className="contact-channel__label">Phone</span>
                                        <span className="contact-channel__value">{settings.phones[0].value}</span>
                                    </div>
                                </a>
                                <a href={`https://wa.me/${settings.phones[0].value}`} target="_blank" rel="noopener noreferrer" className="contact-channel">
                                    <div className="contact-channel__icon">W</div>
                                    <div className="contact-channel__text">
                                        <span className="contact-channel__label">WhatsApp</span>
                                        <span className="contact-channel__value">{settings.phones[0].value}</span>
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
                                </div>
                            ) : (
                                <>
                                    <div className="contact-form-card__head">
                                        <span className="eyebrow">Send us a message · 01</span>
                                        <h3>Tell us about <em>your project</em>.</h3>
                                    </div>

                                    <form onSubmit={handleSubmit}>
                                        <div className="form-grid">
                                            <div className="form-field">
                                                <label htmlFor="name">Name <span className="req">*</span></label>
                                                <input id="name" name="name" type="text" required value={formData.name} onChange={handleChange} placeholder="Your full name" />
                                            </div>
                                            <div className="form-field">
                                                <label htmlFor="email">Work email <span className="req">*</span></label>
                                                <input id="email" name="email" type="email" required value={formData.email} onChange={handleChange} placeholder="you@company.com" />
                                            </div>
                                            <div className="form-field">
                                                <label htmlFor="company">Company</label>
                                                <input id="company" name="company" type="text" value={formData.company} onChange={handleChange} placeholder="Where you work" />
                                            </div>
                                            <div className="form-field">
                                                <label htmlFor="phone">Phone / WhatsApp</label>
                                                <input id="phone" name="phone" type="tel" value={formData.phone} onChange={handleChange} placeholder="+91 …" />
                                            </div>
                                            <div className="form-field form-field--full">
                                                <label htmlFor="inquiry">What's this about? <span className="req">*</span></label>
                                                <select id="inquiry" name="inquiry" required value={formData.inquiry} onChange={handleChange}>
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
                                                <textarea id="message" name="message" required value={formData.message} onChange={handleChange} placeholder="Briefly — what are you trying to build, what's the rough timeline, what's getting in the way?"></textarea>
                                                <span className="form-field__hint">A few sentences is plenty. We'll ask for more on the call.</span>
                                            </div>
                                            <div className="form-field form-field--full">
                                                <label className="form-consent">
                                                    <input type="checkbox" name="consent" required checked={formData.consent} onChange={handleChange} />
                                                    <span>I consent to Adyatech contacting me about this enquiry. I understand my details will be handled per the <a href="/privacy">privacy policy</a>.</span>
                                                </label>
                                            </div>
                                        </div>

                                        <div className="form-actions">
                                            <span className="form-actions__note">→ We respond within 1 business day</span>
                                            <button type="submit" className="form-submit">
                                                Send message
                                                <span className="arrow">↗</span>
                                            </button>
                                        </div>
                                    </form>
                                </>
                            )}
                        </div>

                    </div>
                </div>
            </section>
        </>
    )
}