import type { LucideIcon } from 'lucide-react'

type PageKickerProps = {
  icon: LucideIcon
  label: string
  className?: string
}

/**
 * Matches the Tools page pattern: Lucide icon + short label in sky (light/dark aware).
 */
export function PageKicker({ icon: Icon, label, className = '' }: PageKickerProps) {
  return (
    <p className={`flex items-center gap-2 ${className}`}>
      <Icon className="h-5 w-5 shrink-0 text-sky-600 dark:text-sky-400" aria-hidden />
      <span className="text-sm font-semibold text-sky-600 dark:text-sky-400">{label}</span>
    </p>
  )
}
