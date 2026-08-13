# Data Inventory - Adyatech Solutions LLP

**Last Updated:** August 13, 2026
**Purpose:** Internal record of personal data collected by Adyatech Solutions

## Overview

This document catalogs all personal data collected, processed, and stored by Adyatech Solutions LLP across its digital platforms, primarily adyatech.com.

## Data Sources & Categories

### 1. Contact Form Submissions

**Source:** `/contact` page (ContactContent component)

**Data Collected:**
| Field | Type | Purpose | Required |
|-------|------|---------|----------|
| Name | Text | Identify and address the enquirer | Yes |
| Email | Email | Communication | Yes |
| Company | Text | Business context | No |
| Phone | Phone | Follow-up communication | No |
| Inquiry Type | Select | Categorise request | Yes |
| Message | Text | Understand enquiry details | Yes |
| Consent | Boolean | Privacy compliance | Yes |

**Storage:** Backend API (app.ballari.live/api/contact)
**Retention:** 3 years from last interaction, or as per project contract duration
**Access:** Sales team, technical team, management

### 2. Quote Request Submissions

**Source:** `/quote` page (multi-step form)

**Data Collected:**
| Field | Type | Purpose | Required |
|-------|------|---------|----------|
| Service Type | Select | Understand project category | Yes |
| Project Name | Text | Project identification | No |
| Description | Text | Project scope understanding | Yes |
| Goals | Text | Project objectives | No |
| Audience | Text | Target user understanding | No |
| Budget | Select | Pricing expectation | Yes |
| Timeline | Select | Scheduling expectation | Yes |
| Start Date | Date | Planning | No |
| Name | Text | Contact person identification | Yes |
| Email | Email | Communication | Yes |
| Company | Text | Business identification | No |
| Phone | Phone | Communication | No |
| Role | Text | Decision-maker understanding | No |
| Consent | Boolean | Privacy compliance | Yes |

**Storage:** Backend API (app.ballari.live/api/quote)
**Retention:** 3 years from quote submission, or longer if project progresses to contract
**Access:** Sales team, estimation team, management

### 3. Website Cookie Consent

**Source:** Cookie consent banner (CookieConsent component)

**Data Collected:**
| Data | Type | Purpose | Storage |
|------|------|---------|---------|
| Consent choices | Boolean | Analytics/marketing consent | Browser localStorage |
| Timestamp | ISO datetime | Consent expiry tracking | Browser localStorage |
| Consent categories | Object | Necessary/analytics/marketing/functional | Browser localStorage |

**Storage:** Client-side browser localStorage only (`adyatech_cookie_consent` key)
**Retention:** 30 days, then user is re-prompted
**Access:** Not accessible to server; client-side only

### 4. Website Analytics Data

**Source:** Google Analytics (via AnalyticsScripts component)

**Data Collected:** (With analytics consent only)
| Data | Type | Purpose | Retention |
|------|------|---------|-----------|
| Page views | Count | Traffic measurement | Per Google Analytics policy |
| Session duration | Seconds | Engagement measurement | Per Google Analytics policy |
| Device type | String | Responsive optimization | Per Google Analytics policy |
| Browser info | String | Compatibility tracking | Per Google Analytics policy |
| Geographic location (approx) | String | Regional interest analysis | Per Google Analytics policy |
| Referral source | String | Marketing attribution | Per Google Analytics policy |

**Storage:** Google Analytics servers (Google LLC, USA)
**Retention:** Per Google Analytics data retention policy (configurable, typically 14 months by default)
**Access:** Marketing team, management (via GA dashboard)

### 5. Marketing Pixel Data

**Source:** Meta Pixel (via AnalyticsScripts component)

**Data Collected:** (With marketing consent only)
| Data | Type | Purpose | Retention |
|------|------|---------|-----------|
| Page visits | Event | Campaign measurement | Per Meta Pixel policy |
| Button clicks | Event | Conversion tracking | Per Meta Pixel policy |
| Time on page | Seconds | Engagement measurement | Per Meta Pixel policy |

**Storage:** Meta Platforms servers (Meta Platforms, Inc., USA)
**Retention:** Per Meta Pixel data retention policy
**Access:** Marketing team (via Meta Business Suite)

### 6. Newsletter Subscriptions

**Source:** Footer newsletter form (Sections4 component)

**Data Collected:**
| Field | Type | Purpose | Required |
|-------|------|---------|----------|
| Email | Email | Send newsletters | Yes |

**Storage:** Backend API (app.ballari.live/api/newsletter/subscribe)
**Retention:** Until unsubscribe
**Access:** Marketing team

## Data Processing Purposes

All personal data is collected for the following legitimate business purposes:

1. **Responding to enquiries** - Understanding and addressing user queries
2. **Preparing quotations** - Creating project proposals and pricing
3. **Client communication** - Maintaining ongoing project communication
4. **Marketing analytics** - Understanding website traffic and campaign effectiveness
5. **Service improvement** - Enhancing user experience based on analytics
6. **Legal compliance** - Meeting contractual and regulatory obligations

## Data Not Collected

Adyatech does **NOT** collect:
- Government identification numbers (Aadhaar, PAN, etc.)
- Biometric data
- Health information
- Financial information (bank details, credit card numbers)
- Caste/religion/political affiliation
- Criminal records

## Data Mapping Summary

| Data | Source | Storage Location | Retention |
|------|--------|------------------|-----------|
| Contact form data | /contact | Backend API | 3 years |
| Quote request data | /quote | Backend API | 3 years+ |
| Cookie consent | Banner | localStorage | 30 days |
| Analytics data | GA4 | Google servers | 14 months (config) |
| Marketing data | Meta Pixel | Meta servers | Per Meta policy |
| Newsletter email | Footer | Backend API | Until unsubscribe |

---

*This document is part of Adyatech Solutions LLP's DPDP Act compliance records.*
*For questions, contact: privacy@adyatech.com*
