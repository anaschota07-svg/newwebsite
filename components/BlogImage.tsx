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
        className={`w-full h-full bg-gradient-to-br from-blue-500 via-purple-600 to-pink-500 flex items-center justify-center ${className}`}
        role="img"
        aria-label={alt || 'Image placeholder'}
      >
        <BookOpen className="h-16 w-16 text-white/50" aria-hidden="true" />
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
      onError={() => setHasError(true)}
      loading={priority ? undefined : 'lazy'}
      unoptimized={true}
    />
  )
}
