'use client'

import { useState } from 'react'
import Image from 'next/image'
import { BookOpen } from 'lucide-react'

interface BlogImageProps {
  src: string
  alt: string
  className?: string
  priority?: boolean
  sizes?: string
}

export default function BlogImage({ 
  src, 
  alt, 
  className = '', 
  priority = false,
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
}: BlogImageProps) {
  const [hasError, setHasError] = useState(false)

  if (hasError || !src || !src.startsWith('http')) {
    return (
      <div
        className={`flex h-full w-full items-center justify-center bg-slate-200 dark:bg-slate-800 ${className}`}
        role="img"
        aria-label={alt || 'Article image placeholder'}
      >
        <BookOpen className="h-10 w-10 text-slate-400 dark:text-slate-500" aria-hidden />
      </div>
    )
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      className={className}
      sizes={sizes}
      priority={priority}
      quality={priority ? 82 : 75}
      onError={() => setHasError(true)}
      loading={priority ? undefined : 'lazy'}
    />
  )
}
