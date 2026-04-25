'use client'

import { getToolComponentBySlug } from '@/components/tools/dynamicToolRegistry'

export function ToolRunner({ slug }: { slug: string }) {
  const Tool = getToolComponentBySlug(slug)
  if (!Tool) {
    return (
      <div className="rounded-2xl border border-amber-500/30 bg-amber-500/10 p-6 text-sm font-medium text-amber-900 dark:text-amber-100">
        This tool is not available. Please use the sitemap or tools directory to find an active page.
      </div>
    )
  }
  return <Tool />
}
