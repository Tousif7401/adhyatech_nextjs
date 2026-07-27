// data/government.ts
//
// TEMPORARY hardcoded data so the pages render before backend integration.
// When ready, delete this file and have lib/government.ts fetch from Laravel instead.
// The objects below already match the GovProject type.

import type { GovProject } from '@/types/government'

export const GOV_PROJECTS: GovProject[] = [
  {
    slug: 'zilla-panchayat-edraft',
    title: 'E-Draft Management System',
    department: 'Zilla Panchayat, Ballari',
    year: '2025',
    tag: 'Fund Tracking',
    summary:
      'A fund-allocation and draft-tracking system replacing a paper trail that spanned four offices.',
    challenge:
      'Fund allocation drafts moved physically between the Zilla Panchayat, taluk offices, and the treasury. Nobody could say where a file was, how much of a sanction had been drawn, or which drafts were pending approval. Reconciliation happened once a quarter, by hand, and rarely matched.',
    solution:
      'We built a single system where every draft is created, routed, and approved digitally. Each fund head shows real-time balance, drawn amount, and pending sanctions. Officers see exactly which drafts sit at which desk. The treasury reconciles against live figures instead of a quarterly paper audit.',
    outcome: [
      'Reconciliation time cut from weeks to same-day',
      'Every draft traceable to the officer and hour',
      'Zero physical file movement between offices',
    ],
    stack: ['Laravel', 'MySQL', 'Role-based access', 'Audit trail'],
    image: null,
    site_url: null,
  },
  {
    slug: 'stock-maintaining-system',
    title: 'Stock Maintaining System',
    department: 'Zilla Panchayat, Ballari',
    year: '2025',
    tag: 'Asset Tracking',
    summary:
      'Geo-tagged asset tracking with photo verification for public infrastructure across the district.',
    challenge:
      'The district held thousands of assets — furniture, equipment, vehicles, infrastructure — logged in registers that were years out of date. Physical verification meant a clerk walking to a site with a ledger. Assets were double-counted, lost, or existed only on paper.',
    solution:
      'Every asset now carries a record with a geo-tagged photograph taken at the point of verification. Field officers verify on a mobile device; the system stamps location and time. A verification workflow flags assets not seen in a defined period, so the register reflects what physically exists.',
    outcome: [
      'Every asset geo-located and photo-verified',
      'Verification workflow surfaces stale records automatically',
      'Register now matches ground reality',
    ],
    stack: ['Flutter', 'Laravel', 'Geo-tagging', 'Photo verification'],
    image: null,
    site_url: null,
  },
  {
    slug: 'citizen-services-portal',
    title: 'Citizen Services Portal',
    department: 'State Government of Karnataka',
    year: '2024',
    tag: 'Citizen Services',
    summary:
      'A single front door for citizens to raise, track, and resolve service requests online.',
    challenge:
      'Citizens had to visit offices in person for routine requests, with no way to track status. Departments received the same complaints through multiple channels and lost track of what was resolved.',
    solution:
      'A public portal where citizens submit requests, receive a tracking number, and see status updates. Departments get a unified queue with SLAs. Escalation is automatic when a request ages past its target.',
    outcome: [
      'Requests trackable end-to-end by the citizen',
      'Single queue replaced four intake channels',
      'Automatic escalation on SLA breach',
    ],
    stack: ['Next.js', 'Laravel', 'SMS/Email alerts', 'SLA engine'],
    image: null,
    site_url: null,
  },
]
export interface GovProject {
  slug: string
  title: string
  department: string
  year: string
  tag: string
  summary: string
  challenge: string
  solution: string
  outcome: string[]
  stack: string[]
  image: string | null
  site_url: string | null
}
import type { GovProject } from "@/types/government";

export const GOV_PROJECTS: GovProject[] = [
  ...
];
