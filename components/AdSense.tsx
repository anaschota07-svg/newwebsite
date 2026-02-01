'use client'

import { useEffect, useRef, useState } from 'react'

export type AdSize = 'responsive' | '728x90' | '300x250' | '300x600' | '320x50' | 'in-article' | 'auto'

export interface AdComponentProps {
  adSlotId?: string
  size?: AdSize
  className?: string
  style?: React.CSSProperties
  format?: 'horizontal' | 'vertical' | 'rectangle'
}

const publisherId = 'ca-pub-2268511139409784'
const defaultAdSlot = '4571421232'

// Helper to check if AdSense script is loaded
const isAdSenseLoaded = (): boolean => {
  return typeof window !== 'undefined' && typeof (window as any).adsbygoogle !== 'undefined'
}

// Wait for AdSense to be ready
const waitForAdSense = (callback: () => void, maxAttempts = 50) => {
  let attempts = 0
  const checkInterval = setInterval(() => {
    attempts++
    if (isAdSenseLoaded() || attempts >= maxAttempts) {
      clearInterval(checkInterval)
      if (isAdSenseLoaded()) {
        callback()
      } else {
        console.warn('AdSense script failed to load')
      }
    }
  }, 100) // Check every 100ms
}

/**
 * Optimized Ad Component for Google AdSense
 * Handles script loading, race conditions, and proper ad initialization
 */
export default function AdSense({
  adSlotId = defaultAdSlot,
  size = 'responsive',
  className = '',
  style = {},
  format = 'horizontal',
}: AdComponentProps) {
  const adRef = useRef<HTMLDivElement>(null)
  const adPushed = useRef(false)
  const [isScriptReady, setIsScriptReady] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  // Check if element is visible using Intersection Observer
  useEffect(() => {
    if (!adRef.current) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > 0) {
            setIsVisible(true)
            observer.disconnect()
          }
        })
      },
      { threshold: 0.1 }
    )

    observer.observe(adRef.current)

    return () => {
      observer.disconnect()
    }
  }, [])

  // Wait for AdSense script to be ready
  useEffect(() => {
    if (isAdSenseLoaded()) {
      setIsScriptReady(true)
    } else {
      waitForAdSense(() => {
        setIsScriptReady(true)
      })
    }
  }, [])

  useEffect(() => {
    // Don't proceed if script not ready, not visible, already pushed, or container has no width
    if (!isScriptReady || !isVisible || !adRef.current || adPushed.current) {
      return
    }

    // Check if container has width
    const rect = adRef.current.getBoundingClientRect()
    if (rect.width === 0) {
      // Retry after a short delay
      const retryTimeout = setTimeout(() => {
        const retryRect = adRef.current?.getBoundingClientRect()
        if (retryRect && retryRect.width > 0) {
          // Container now has width, proceed
        }
      }, 500)
      return () => clearTimeout(retryTimeout)
    }

    // Initialize adsbygoogle if not exists
    if (!(window as any).adsbygoogle) {
      (window as any).adsbygoogle = []
    }

    // Check if ad already exists in this container
    const existingAd = adRef.current.querySelector('ins.adsbygoogle')
    if (existingAd) {
      adPushed.current = true
      return
    }

    // Create the ad element - exactly like Google's code
    const ins = document.createElement('ins')
    ins.className = 'adsbygoogle'
    ins.style.display = 'block'
    ins.setAttribute('data-ad-client', publisherId)
    ins.setAttribute('data-ad-slot', adSlotId)

    // Set format based on size
    if (size === 'responsive' || format === 'horizontal') {
      ins.setAttribute('data-ad-format', 'auto')
      ins.setAttribute('data-full-width-responsive', 'true')
    } else if (size === 'in-article') {
      ins.setAttribute('data-ad-format', 'fluid')
      ins.setAttribute('data-ad-layout-key', '-6t+ed+2i-1n-4w')
    } else if (size !== 'auto') {
      // Fixed size ads
      const [width, height] = size.split('x')
      ins.style.width = `${width}px`
      ins.style.height = `${height}px`
      ins.setAttribute('data-ad-format', 'rectangle')
    }

    // Append to DOM first
    adRef.current.appendChild(ins)

    // Small delay to ensure DOM is ready and has width, then push to AdSense
    const pushTimeout = setTimeout(() => {
      // Double check width before pushing
      const finalRect = adRef.current?.getBoundingClientRect()
      if (finalRect && finalRect.width > 0) {
        try {
          adPushed.current = true
          ;((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({})
        } catch (error) {
          console.error('AdSense push error:', error)
          adPushed.current = false // Allow retry on error
        }
      } else {
        console.warn('AdSense: Container has no width, skipping ad push')
        adPushed.current = false
      }
    }, 200) // Increased delay to ensure container is ready

    return () => {
      clearTimeout(pushTimeout)
    }
  }, [adSlotId, size, isScriptReady, isVisible, format])

  // Reset when adSlotId changes
  useEffect(() => {
    adPushed.current = false
  }, [adSlotId])

  return (
    <div
      ref={adRef}
      className={`w-full ${className}`}
      style={{
        minHeight: '100px',
        minWidth: '100%',
        width: '100%',
        maxWidth: '100%',
        display: 'block',
        ...style,
      }}
      data-ad-slot={adSlotId}
    />
  )
}
