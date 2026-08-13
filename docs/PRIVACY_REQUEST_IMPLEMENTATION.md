# Privacy Request Feature - Implementation Status

**Last Updated:** August 13, 2026
**Feature:** DPDP Privacy Rights Request Form
**Status:** Frontend Complete | Backend Pending

---

## Overview

This feature enables users to exercise their rights under India's Digital Personal Data Protection Act (DPDP), 2023 by submitting privacy requests (access, correction, erasure, withdraw consent, grievance).

---

## ✅ Current Implementation (Frontend)

### Page Route
- **Path:** `/privacy-request`
- **File:** `src/app/privacy-request/page.tsx`
- **Status:** Complete

### Components

#### 1. PrivacyRequestForm Component
- **File:** `src/components/PrivacyRequestForm.tsx`
- **Status:** Complete

**Features:**
- 4-step multi-step form with validation
- Request type selection (access, correction, erasure, withdraw consent, grievance)
- Contact details collection (name, email, phone)
- Request description textarea
- Review & consent step
- Success state with confirmation message
- Stepper navigation (Back/Next buttons)
- Form validation per step

**Request Types Supported:**
| Value | Icon | Title |
|-------|------|-------|
| `access` | 📋 | Access Request |
| `correction` | ✏️ | Correction Request |
| `erasure` | 🗑️ | Erasure Request |
| `withdraw` | ↩️ | Withdraw Consent |
| `grievance` | ⚠️ | Grievance |

#### 2. Styling
- **File:** `src/components/PrivacyRequestForm.css`
- **File:** `src/app/privacy-request/privacy-request.css`
- **Status:** Complete

**Styling Features:**
- Responsive card layout
- Custom stepper navigation
- Gold/brand accent colors for selection states
- Error message styling
- Success state styling

#### 3. API Integration
- **File:** `src/lib/privacy-request.ts`
- **Status:** Implemented (calls non-existent backend)

**Current Code:**
```typescript
export async function sendPrivacyRequest(data: any) {
  return apiFetch("/privacy-request", {
    method: "POST",
    body: JSON.stringify(data),
  });
}
```

**API Configuration:**
- Base URL: `process.env.NEXT_PUBLIC_API_URL`
- Endpoint: `POST /privacy-request`
- Content-Type: `application/json`

**Request Payload:**
```typescript
{
  requestType: string,      // 'access' | 'correction' | 'erasure' | 'withdraw' | 'grievance'
  name: string,              // User's full name
  email: string,            // User's email address
  phone: string,             // Optional phone number
  description: string,       // Request details (min 20 chars)
  consent: boolean           // Consent to processing
}
```

---

## ❌ Backend Implementation (Not Started)

### Required Backend Endpoint

#### POST /privacy-request

**Purpose:** Receive and store privacy requests from the frontend form

**Request Body:**
```json
{
  "requestType": "access",
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+91 9876543210",
  "description": "I want to know what personal information you have about me.",
  "consent": true
}
```

**Response (Success):**
```json
{
  "success": true,
  "requestId": "PR-2026-0813-001",
  "message": "Privacy request submitted successfully"
}
```

**Response (Error):**
```json
{
  "success": false,
  "error": "Invalid email address"
}
```

---

## 📋 What Still Needs To Be Done

### Phase 1: Backend API Implementation

#### 1.1 Database Schema
Create a table to store privacy requests:

```sql
CREATE TABLE privacy_requests (
  id VARCHAR(255) PRIMARY KEY,           -- e.g., PR-2026-0813-001
  request_type ENUM('access','correction','erasure','withdraw','grievance'),
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50),
  description TEXT NOT NULL,
  consent BOOLEAN NOT NULL,
  status ENUM('pending','in_progress','resolved','rejected') DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  resolved_at TIMESTAMP NULL,
  notes TEXT,
  INDEX idx_email (email),
  INDEX idx_status (status),
  INDEX idx_created_at (created_at)
);
```

#### 1.2 API Endpoint Implementation
- **Location:** Backend server (app.ballari.live)
- **Route:** `POST /api/privacy-request`
- **Tasks:**
  - [ ] Validate incoming request data
  - [ ] Generate unique request ID
  - [ ] Store in database
  - [ ] Send confirmation email to user
  - [ ] Send notification email to privacy@adyatech.com
  - [ ] Return success response

#### 1.3 Validation Rules
- `requestType`: Must be one of the 5 valid types
- `name`: Required, min 2 characters
- `email`: Required, valid email format
- `phone`: Optional, if provided validate format
- `description`: Required, min 20 characters
- `consent`: Required, must be true

### Phase 2: Admin Interface

#### 2.1 Admin Dashboard
- [ ] Create admin page to view all privacy requests
- [ ] Filter by status, type, date range
- [ ] Search by email/name/request ID

#### 2.2 Request Management
- [ ] View request details
- [ ] Update status (pending → in_progress → resolved/rejected)
- [ ] Add notes/resolution details
- [ ] Mark resolved with timestamp

#### 2.3 Email Notifications
- [ ] Send acknowledgment email to user (within 7 days)
- [ ] Send resolution email to user (within 30 days)
- [ ] Notify admins of new requests

### Phase 3: Documentation & Compliance

#### 3.1 Privacy Policy Update
- [ ] Update `/privacy` page to include privacy request procedure
- [ ] Add response time commitments (7/30 days)
- [ ] Include contact email: privacy@adyatech.com

#### 3.2 SOP Documentation
- [ ] Document internal process for handling requests
- [ ] Define roles/responsibilities
- [ ] Create response templates for each request type
- [ ] Document verification procedures

#### 3.3 Record Keeping
- [ ] Implement data retention for resolved requests
- [ ] Archive deleted request records per policy
- [ ] Audit trail for status changes

---

## 🔧 Environment Variables Required

### Frontend (.env.local)
```env
NEXT_PUBLIC_API_URL=https://app.ballari.live/api
```

### Backend (to be configured)
```env
# Email Service
SMTP_HOST=
SMTP_PORT=
SMTP_USER=
SMTP_PASS=
FROM_EMAIL=privacy@adyatech.com

# Database
DB_HOST=
DB_PORT=
DB_NAME=
DB_USER=
DB_PASS=

# Admin
ADMIN_EMAIL=privacy@adyatech.com
```

---

## 📊 Progress Summary

| Component | Status | Completion |
|-----------|--------|------------|
| Frontend Form | ✅ Complete | 100% |
| Styling | ✅ Complete | 100% |
| API Client | ✅ Implemented | 100% |
| Backend API | ❌ Not Started | 0% |
| Database | ❌ Not Started | 0% |
| Admin Panel | ❌ Not Started | 0% |
| Email Service | ❌ Not Started | 0% |
| Documentation | 🟡 Partial | 40% |

**Overall Progress:** ~30% (Frontend complete, backend pending)

---

## 🚀 Next Steps (Priority Order)

1. **HIGH PRIORITY:** Set up backend API endpoint
2. **HIGH PRIORITY:** Create database table
3. **MEDIUM:** Implement email notifications
4. **MEDIUM:** Build admin dashboard
5. **LOW:** Update privacy policy page

---

## 📞 Contact

For questions about this implementation, contact:
- **Technical:** dev team
- **Privacy/Compliance:** privacy@adyatech.com

---

*This document is maintained alongside the privacy request feature development.*
