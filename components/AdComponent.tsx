import { useEffect, useRef, useState } from 'react'

export type AdSize = 'responsive' | '728x90' | '300x250' | '300x600' | '320x50' | 'in-article' | 'auto'

export interface AdComponentProps {
  adSlotId: string
  size?: AdSize
  className?: string
  style?: React.CSSProperties
  padding?: {
    horizontal?: string | number // e.g., '1rem', '16px', 16
    vertical?: string | number   // e.g., '1rem', '16px', 16
  }
}

const publisherId = 'ca-pub-2268511139409784'

// Helper to check if AdSense script is loaded
const isAdSenseLoaded = (): boolean => {
  return typeof (window as any).adsbygoogle !== 'undefined'
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
export const AdComponent = ({
  adSlotId,
  size = 'responsive',
  className = '',
  style = {},
  padding,
}: AdComponentProps) => {
  const adRef = useRef<HTMLDivElement>(null)
  const adPushed = useRef(false)
  const [isScriptReady, setIsScriptReady] = useState(false)

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
    // Don't proceed if script not ready or already pushed
    if (!isScriptReady || !adRef.current || adPushed.current) {
      if (process.env.NODE_ENV === 'development') {
        console.log(`⏸️ Ad ${adSlotId} waiting:`, {
          scriptReady: isScriptReady,
          containerExists: !!adRef.current,
          alreadyPushed: adPushed.current
        })
      }
      return
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
    if (size === 'responsive') {
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
    
    if (process.env.NODE_ENV === 'development') {
      console.log(`📝 Ad element created for slot: ${adSlotId}`)
    }

    // Small delay to ensure DOM is ready, then push to AdSense
    const pushTimeout = setTimeout(() => {
      try {
        adPushed.current = true
        ;((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({})
        
        if (process.env.NODE_ENV === 'development') {
          console.log(`✅ AdSense ad pushed - Slot: ${adSlotId}`)
        }
      } catch (error) {
        console.error('AdSense push error:', error)
        adPushed.current = false // Allow retry on error
      }
    }, 100)

    return () => {
      clearTimeout(pushTimeout)
    }
  }, [adSlotId, size, isScriptReady])

  // Reset when adSlotId changes
  useEffect(() => {
    adPushed.current = false
  }, [adSlotId])

  // Convert padding props to CSS values
  const paddingHorizontal = padding?.horizontal 
    ? (typeof padding.horizontal === 'number' ? `${padding.horizontal}px` : padding.horizontal)
    : '0'
  const paddingVertical = padding?.vertical 
    ? (typeof padding.vertical === 'number' ? `${padding.vertical}px` : padding.vertical)
    : '0'

  return (
    <div
      ref={adRef}
      className={className || 'w-full'}
      style={{ 
        // Let the ad decide its own height. We just reserve a minimal space
        minHeight: '50px',
        width: '100%',
        maxWidth: '100%',          // Never overflow the parent width
        display: 'block',
        overflowX: 'visible',      // Don't cut ads horizontally
        overflowY: 'hidden',       // If ad is a bit taller, hide extra bottom to avoid layout break
        paddingLeft: paddingHorizontal,
        paddingRight: paddingHorizontal,
        paddingTop: paddingVertical,
        paddingBottom: paddingVertical,
        ...style 
      }}
      data-ad-slot={adSlotId}
    />
  )
}
