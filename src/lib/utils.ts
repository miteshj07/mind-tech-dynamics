import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// URL slug of a case study, from its CMS title. Same rule in scripts/prerender.mjs.
// ponytail: renaming a case study in the CMS changes its URL; add a stored slug if titles start changing.
export const caseStudySlug = (title: string) =>
  title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
