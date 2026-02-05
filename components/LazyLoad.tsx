'use client'

import { useEffect, useRef, useState } from 'react'

interface LazyLoadProps {
  children: React.ReactNode
  className?: string
  threshold?: number
  rootMargin?: string
}

export default function LazyLoad({ 
  children, 
  className = '', 
  threshold = 0.1,
  rootMargin = '50px'
}: LazyLoadProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [hasLoaded, setHasLoaded] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasLoaded) {
          setIsVisible(true)
          setHasLoaded(true)
          // Disconnect after first load to save resources
          if (ref.current) {
            observer.unobserve(ref.current)
          }
        }
      },
      {
        threshold,
        rootMargin,
      }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current)
      }
    }
  }, [threshold, rootMargin, hasLoaded])

  return (
    <div 
      ref={ref} 
      className={`lazy-load-container ${isVisible ? 'lazy-loaded' : 'lazy-loading'} ${className}`}
    >
      {isVisible ? children : <div className="lazy-placeholder" />}
    </div>
  )
}
