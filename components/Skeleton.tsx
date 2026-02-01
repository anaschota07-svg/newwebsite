'use client'

import { motion } from 'framer-motion'

interface SkeletonProps {
  className?: string
  variant?: 'text' | 'card' | 'image' | 'circle'
  lines?: number
}

export default function Skeleton({ className = '', variant = 'text', lines = 1 }: SkeletonProps) {
  if (variant === 'text') {
    return (
      <div className={`space-y-2 ${className}`}>
        {Array.from({ length: lines }).map((_, i) => (
          <div
            key={i}
            className="h-4 bg-gray-200 dark:bg-slate-700 rounded animate-pulse"
            style={{
              width: i === lines - 1 ? '75%' : '100%',
            }}
          />
        ))}
      </div>
    )
  }

  if (variant === 'card') {
    return (
      <div className={`bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 overflow-hidden ${className}`}>
        <div className="h-48 bg-gray-200 dark:bg-slate-700 animate-pulse" />
        <div className="p-6 space-y-4">
          <div className="h-6 bg-gray-200 dark:bg-slate-700 rounded animate-pulse w-3/4" />
          <div className="h-4 bg-gray-200 dark:bg-slate-700 rounded animate-pulse" />
          <div className="h-4 bg-gray-200 dark:bg-slate-700 rounded animate-pulse w-5/6" />
        </div>
      </div>
    )
  }

  if (variant === 'image') {
    return (
      <div className={`bg-gray-200 dark:bg-slate-700 rounded animate-pulse ${className}`} />
    )
  }

  if (variant === 'circle') {
    return (
      <div className={`bg-gray-200 dark:bg-slate-700 rounded-full animate-pulse ${className}`} />
    )
  }

  return null
}
