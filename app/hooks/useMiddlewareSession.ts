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

      // IMPORTANT: Don't set Referer header manually - browser does it automatically
      // Setting it manually causes "Refused to set unsafe header" error
      // Browser automatically sends Referer header with fetch requests
      const response = await fetch(`${API_BASE_URL}/api/middleware/check-session`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Include cookies if needed
        // Referer header is automatically sent by browser
      })

      if (!response.ok) {
        // Handle CORS and other HTTP errors
        if (response.status === 0 || response.type === 'opaque') {
          throw new Error('CORS error: Backend needs to allow requests from this domain')
        }
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
    } catch (error: any) {
      // On error, show normal website (fail gracefully)
      if (process.env.NODE_ENV === 'development') {
        console.error('❌ Google session check failed:', error)
        if (error.message?.includes('CORS')) {
          console.error('⚠️ CORS Error: Backend at zap2link.com needs to allow requests from simplewebtoolsbox.com')
          console.error('⚠️ Backend should add: Access-Control-Allow-Origin: https://simplewebtoolsbox.com')
        }
        if (error.message?.includes('Failed to fetch')) {
          console.error('⚠️ Network Error: Could not reach API. Check if backend is running and CORS is configured.')
        }
      }
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

