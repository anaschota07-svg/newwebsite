'use client'

import { useEffect, useState, useRef } from 'react'
import { useSearchParams } from 'next/navigation'

/**
 * Hook to detect and manage middleware session from:
 * 1. URL parameters (?session=TOKEN&link=CODE)
 * 2. Google Search referrer (via API check)
 * Updated for Next.js App Router
 */
export const useMiddlewareSession = () => {
  const searchParams = useSearchParams()
  const [sessionToken, setSessionToken] = useState<string | null>(null)
  const [shortCode, setShortCode] = useState<string | null>(null)
  const [hasSession, setHasSession] = useState(false)
  const [isCheckingGoogle, setIsCheckingGoogle] = useState(false)
  const hasCheckedGoogle = useRef(false)

  useEffect(() => {
    // Priority 1: Check for session token and link code in URL (direct links)
    const token = searchParams?.get('session')
    const code = searchParams?.get('link') || searchParams?.get('code')

    if (process.env.NODE_ENV === 'development') {
      console.log('useMiddlewareSession - URL params:', {
        token: token ? 'present' : 'missing',
        code: code ? 'present' : 'missing',
        allParams: searchParams ? Object.fromEntries(searchParams.entries()) : {},
      })
    }

    if (token && code) {
      // Direct link with session - use it directly
      setSessionToken(token)
      setShortCode(code)
      setHasSession(true)
      hasCheckedGoogle.current = true // Don't check Google if we have direct session
      if (process.env.NODE_ENV === 'development') {
        console.log('✅ Session detected from URL:', { token: token.substring(0, 10) + '...', code })
      }
      return
    }

    // Priority 2: Check if user came from Google Search
    if (!hasCheckedGoogle.current && typeof window !== 'undefined') {
      hasCheckedGoogle.current = true
      checkGoogleSession()
    } else if (!token && !code) {
      // No session in URL and not from Google
      setSessionToken(null)
      setShortCode(null)
      setHasSession(false)
      if (process.env.NODE_ENV === 'development') {
        console.log('❌ No session detected')
      }
    }
  }, [searchParams])

  const checkGoogleSession = async () => {
    if (typeof window === 'undefined') return

    // Check if user came from Google
    const referrer = document.referrer
    const isFromGoogle = referrer.includes('google.com') || 
                        referrer.includes('google.co.') ||
                        referrer.includes('google.co.in') ||
                        referrer.includes('google.co.uk')

    if (!isFromGoogle) {
      if (process.env.NODE_ENV === 'development') {
        console.log('🔍 Not from Google search - showing normal website')
      }
      setSessionToken(null)
      setShortCode(null)
      setHasSession(false)
      return
    }

    // User came from Google - check for session via API
    setIsCheckingGoogle(true)
    if (process.env.NODE_ENV === 'development') {
      console.log('🔍 Checking for Google session...', { referrer })
    }

    try {
      const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 
        (process.env.NODE_ENV === 'development' ? 'http://localhost:3001' : 'https://zap2link.com')

      const response = await fetch(`${API_BASE_URL}/api/middleware/check-session`, {
        method: 'GET',
        headers: {
          'Referer': window.location.href,
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Include cookies if needed
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()

      if (data.hasSession && data.showAds && data.sessionToken && data.shortCode) {
        // User has active session - show middleware UI
        setSessionToken(data.sessionToken)
        setShortCode(data.shortCode)
        setHasSession(true)
        if (process.env.NODE_ENV === 'development') {
          console.log('✅ Google session detected:', {
            sessionToken: data.sessionToken.substring(0, 10) + '...',
            shortCode: data.shortCode,
            link: data.link?.title || 'N/A'
          })
        }
      } else {
        // No session found - show normal website
        setSessionToken(null)
        setShortCode(null)
        setHasSession(false)
        if (process.env.NODE_ENV === 'development') {
          console.log('❌ No Google session found - showing normal website')
        }
      }
    } catch (error) {
      // On error, show normal website (fail gracefully)
      console.error('❌ Google session check failed:', error)
      setSessionToken(null)
      setShortCode(null)
      setHasSession(false)
    } finally {
      setIsCheckingGoogle(false)
    }
  }

  return {
    sessionToken,
    shortCode,
    hasSession,
    isCheckingGoogle,
  }
}

