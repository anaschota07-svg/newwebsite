export const indexedToolSlugs = [
  'age-calculator',
  'password-generator',
  'qr-code-generator',
  'json-formatter',
  'loan-calculator',
  'date-calculator',
  'word-counter',
] as const

export const indexedBlogSlugs = [
  'loan-calculator-guide',
  'credit-score-guide-2026',
  'effective-study-techniques',
  'cloud-computing-comparison-2026',
] as const

const indexedToolSet = new Set(indexedToolSlugs)
const indexedBlogSet = new Set(indexedBlogSlugs)

export function isIndexedToolSlug(slug: string): boolean {
  return indexedToolSet.has(slug as (typeof indexedToolSlugs)[number])
}

export function isIndexedBlogSlug(slug: string): boolean {
  return indexedBlogSet.has(slug as (typeof indexedBlogSlugs)[number])
}
