'use client'

import { useTheme } from 'next-themes'
import { Monitor, Moon, Sun } from 'lucide-react'
import { useEffect, useState } from 'react'

export function ThemeToggle({ className = '' }: { className?: string }) {
  const { theme, setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <span
        className={`inline-flex h-9 w-[5.75rem] rounded-lg border border-slate-200 bg-slate-100 dark:border-slate-700 dark:bg-slate-900 ${className}`}
        aria-hidden
      />
    )
  }

  const cycle = () => {
    if (theme === 'light') setTheme('dark')
    else if (theme === 'dark') setTheme('system')
    else setTheme('light')
  }

  const Icon = theme === 'light' ? Sun : theme === 'dark' ? Moon : Monitor
  const label =
    theme === 'system'
      ? `Theme: system (${resolvedTheme ?? 'system'}) — click to use light`
      : theme === 'light'
        ? 'Theme: light — click to use dark'
        : 'Theme: dark — click to use system preference'

  return (
    <button
      type="button"
      onClick={cycle}
      className={`inline-flex h-9 items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-2.5 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800 ${className}`}
      aria-label={label}
      title={label}
    >
      <Icon className="h-4 w-4 shrink-0 opacity-80" aria-hidden />
      <span className="hidden min-[380px]:inline capitalize">{theme === 'system' ? 'Auto' : theme}</span>
    </button>
  )
}
