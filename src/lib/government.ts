// lib/government.ts
//
// Single place your developer swaps sample data for the real API.
// Right now it reads the hardcoded array. To integrate, replace the bodies
// with fetch calls to Laravel — the rest of the app doesn't change.

import { GOV_PROJECTS, type GovProject } from '@/types/government'
import { GOV_PROJECTS } from '@/data/government'

export async function getGovProjects(): Promise<GovProject[]> {
  // --- INTEGRATION: replace with a fetch ---
  // const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/government`, { next: { revalidate: 300 } })
  // if (!res.ok) throw new Error('Failed to load government projects')
  // return res.json()
  return GOV_PROJECTS
}

export async function getGovProject(slug: string): Promise<GovProject | null> {
  // --- INTEGRATION: replace with a fetch ---
  // const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/government/${slug}`, { next: { revalidate: 300 } })
  // if (res.status === 404) return null
  // if (!res.ok) throw new Error('Failed to load government project')
  // return res.json()
  return GOV_PROJECTS.find((p) => p.slug === slug) ?? null
}
