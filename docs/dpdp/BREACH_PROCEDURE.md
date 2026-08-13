# Data Breach Response Procedure - Adyatech Solutions LLP

**Last Updated:** August 13, 2026
**Purpose:** Define procedures for responding to personal data breaches

## Overview

This document outlines Adyatech Solutions LLP's procedures for detecting, reporting, and responding to personal data breaches, in accordance with the Digital Personal Data Protection Act, 2023 and the DPDP Rules, 2025.

## Definitions

**Personal Data Breach:** A breach of security leading to accidental or unlawful destruction, loss, alteration, or disclosure of, or access to, personal data transmitted, stored, or processed.

**Significant Breach:** A breach that is likely to:
- Harm individuals (identity theft, financial loss, discrimination)
- Cause significant financial or reputational damage
- Affect a large number of data principals

## Breach Classification

### Low Risk
- **Example:** Single email sent to wrong recipient, isolated internal access
- **Impact:** Minimal harm to individuals
- **Response:** Internal resolution, log for reference

### Medium Risk
- **Example:** Server exposing limited data for short period, lost device with encrypted data
- **Impact:** Potential harm but limited scope
- **Response:** Internal + affected individual notification

### High Risk (Significant Breach)
- **Example:** Database hack, ransomware, large-scale unauthorized access
- **Impact:** Widespread harm, financial/reputational damage
- **Response:** Full incident response + Board notification + affected individuals

## Incident Response Team

| Role | Responsibility | Contact |
|------|----------------|---------|
| **Incident Commander** | Overall coordination, decision-making | Managing Director |
| **Technical Lead** | System investigation, containment | IT Manager |
| **Legal Advisor** | Legal assessment, regulatory compliance | Legal Counsel |
| **Communications Lead** | Internal/external communications | Marketing Manager |
| **Data Protection Officer** | Privacy compliance, records | Designated person (if applicable) |

**Alternate Contacts:**
- **Primary:** privacy@adyatech.com
- **Emergency:** +91 8392 359873 / +91 98868 53308

## Response Procedure

### Phase 1: Detection & Initial Assessment (0-24 hours)

**Actions:**
1. **Detect breach** – Through monitoring, user reports, or system alerts
2. **Immediate containment** – Disconnect affected systems, change passwords
3. **Initial assessment** – Determine scope, affected data, potential impact
4. **Activate response team** – Notify all team members
5. **Create incident log** – Document discovery time, initial facts

**Documentation:**
- Incident # (assigned sequentially)
- Date/time detected
- How it was discovered
- Initial containment actions taken

### Phase 2: Investigation & Assessment (24-72 hours)

**Actions:**
1. **Forensic analysis** – Determine root cause, timeline, extent of breach
2. **Data mapping** – Identify specific personal data affected
3. **Individual identification** – List affected data principals
4. **Risk classification** – Determine if breach is "significant"
5. **Legal consultation** – Assess notification requirements

**Investigation Questions:**
- What happened? When? How?
- What data was exposed?
- How many individuals affected?
- Was data encrypted, authenticated, protected?
- Who may have accessed the data?
- Is the breach ongoing?

### Phase 3: Notification & Reporting (72 hours – 7 days)

**To Data Protection Board of India (if significant breach):**

**Timeline:** Within 72 hours of becoming aware (extendable by additional 72 hours with justification)

**Report Contents:**
- Nature of breach
- Categories of data affected
- Number of individuals affected (or estimate)
- Likely consequences
- Actions taken to mitigate
- Contact information for follow-up

**To Affected Individuals:**

**Timeline:** Without undue delay (typically within 7 days for significant breaches)

**Notification Contents:**
- What happened
- What data was affected
- What we're doing about it
- What the individual should do (password changes, monitoring)
- Contact for more information

**Notification Methods:**
- Email (primary)
- Website notice
- Direct mail (if email unavailable)
- Phone call (for high-risk cases)

### Phase 4: Remediation & Recovery (7-30 days)

**Actions:**
1. **Root cause fix** – Patch vulnerabilities, update systems
2. **Process improvements** – Update security policies, procedures
3. **Staff training** – Address human error if applicable
4. **Monitoring enhancement** – Implement additional detection
5. **Post-incident review** – Lessons learned, action items

## Specific Scenarios

### Ransomware Attack

**Immediate Actions:**
1. Isolate affected systems
2. Do NOT pay ransom (consult authorities first)
3. Assess data exfiltration vs. encryption only
4. Preserve forensic evidence

### Unauthorized Access (Insider Threat)

**Immediate Actions:**
1. Revoke access privileges immediately
2. Preserve access logs
3. Legal assessment for employee action
4. Law enforcement if criminal

### Lost/Stolen Device

**Immediate Actions:**
1. Remote wipe if available
2. Assess what data was on device
3. Determine if encrypted
4. Notify individuals if unencrypted personal data

### Third-Party Breach

**Immediate Actions:**
1. Request details from vendor
2. Assess impact on Adyatech data
3. Determine if Adyatech must notify individuals
4. Re-evaluate vendor relationship

## Notification Templates

### Template 1: To Data Protection Board

```
To: Data Protection Board of India
From: Adyatech Solutions LLP
Subject: Personal Data Breach Report - [Incident #]

1. Incident Details:
   - Incident ID: #[number]
   - Discovery Date: [date]
   - Breach Date: [date if known]
   - Report Date: [date]

2. Breach Description:
   [Detailed description of what happened]

3. Data Affected:
   - Categories: [e.g., names, emails, phone numbers]
   - Approximate number of individuals: [count]
   - Special categories: [if applicable]

4. Impact Assessment:
   - Likely consequences: [description]
   - Risk level: [Low/Medium/High]

5. Mitigation Actions:
   [List of actions taken]

6. Contact:
   - Name: [contact person]
   - Email: privacy@adyatech.com
   - Phone: [number]
```

### Template 2: To Affected Individuals

```
Subject: Important Information About Your Personal Data

Dear [Name],

We are writing to inform you about an incident that may have involved your personal data.

What happened:
[Clear, simple explanation]

What information was affected:
[Types of data, not specifics]

What we are doing:
[Actions taken, improvements being made]

What you should do:
[Recommended actions, if any]

We sincerely apologize for any concern this may cause. If you have questions, please contact us at:

Email: privacy@adyatech.com
Phone: +91 8392 359873

Sincerely,
Adyatech Solutions LLP
```

## Post-Incident Activities

### 30-Day Review

**Review Questions:**
- Could this have been prevented?
- Were response procedures effective?
- Were notifications timely and appropriate?
- What changes are needed?

### Documentation

**Maintain Records Of:**
- Incident timeline
- Investigation findings
- Communications sent
- Board/individual responses
- Remediation actions
- Lessons learned

### Policy Update

**Update This Procedure When:**
- New breach scenarios identified
- Regulatory requirements change
- Response team roles change
- Contact information changes

## Breach Prevention Measures

**Technical:**
- Regular security updates
- Access controls and authentication
- Encryption for data at rest and in transit
- Regular security audits
- Employee security training

**Administrative:**
- Access principle of least privilege
- Regular data backups
- Vendor due diligence
- Incident response drills (annually)

## Quick Reference Card

**Breach Detected?**
1. ✅ Contain it (isolate systems)
2. ✅ Document it (start incident log)
3. ✅ Report it (notify team lead)
4. ✅ Assess it (determine scope/risk)
5. ✅ Notify (if significant → Board + individuals)

**Key Contacts:**
- privacy@adyatech.com
- +91 8392 359873 / +91 98868 53308

**Critical Timelines:**
- 72 hours: Notify Board (if significant)
- 7 days: Notify individuals (if significant)
- 30 days: Complete remediation review

---

*This document is part of Adyatech Solutions LLP's DPDP Act compliance records.*
*For questions, contact: privacy@adyatech.com*
