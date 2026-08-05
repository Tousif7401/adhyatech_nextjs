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