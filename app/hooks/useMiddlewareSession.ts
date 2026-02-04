'use client'

import { useEffect, useState, useRef } from 'react'
import { useSearchParams } from 'next/navigation'
import { checkGoogleSession } from '@/app/services/api'

/**
 * Hook to detect and manage middleware session from URL parameters or Google search
 * Based on the guide: 
 * 1. First checks for ?session=TOKEN&link=CODE (direct links)
 * 2. If not found, checks if user came from Google and calls check-session API
 * 3. Otherwise shows normal website
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
    // Only run on client side
    if (typeof window === 'undefined') return

    const checkSession = async () => {
      // Step 1: Check URL parameters first (for direct links with session)
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
        // Direct link with session - show middleware UI
        setSessionToken(token)
        setShortCode(code)
        setHasSession(true)
        setIsCheckingGoogle(false)
        hasCheckedGoogle.current = true // Don't check Google if we have direct session
        if (process.env.NODE_ENV === 'development') {
          console.log('✅ Session detected from URL:', { token: token.substring(0, 10) + '...', code })
        }
        return
      }

      // Step 2: Check if user came from Google (only check once)
      if (hasCheckedGoogle.current) {
        return
      }

      const referrer = document.referrer
      const isFromGoogle = referrer.includes('google.com') || 
                          referrer.includes('google.co.') ||
                          referrer.includes('google.co.in') ||
                          referrer.includes('google.co.uk')

      if (isFromGoogle) {
        // User came from Google - check for session via API
        hasCheckedGoogle.current = true
        setIsCheckingGoogle(true)
        if (process.env.NODE_ENV === 'development') {
          console.log('🔍 User came from Google, checking for session...', {
            referrer: referrer,
            currentUrl: window.location.href
          })
        }

        try {
          const result = await checkGoogleSession()

          if (process.env.NODE_ENV === 'development') {
            console.log('📊 Session check result:', {
              hasSession: result.hasSession,
              showAds: result.showAds,
              hasToken: !!result.sessionToken,
              hasCode: !!result.shortCode,
              message: result.message,
              error: result.error
            })
          }

          if (result.hasSession && result.showAds && result.sessionToken && result.shortCode) {
            // User has active session - show middleware UI with ads
            setSessionToken(result.sessionToken)
            setShortCode(result.shortCode)
            setHasSession(true)
            if (process.env.NODE_ENV === 'development') {
              console.log('✅ Google session detected:', {
                token: result.sessionToken.substring(0, 10) + '...',
                code: result.shortCode,
                message: result.message
              })
            }
          } else {
            // No session - show normal website
            setSessionToken(null)
            setShortCode(null)
            setHasSession(false)
            if (process.env.NODE_ENV === 'development') {
              console.log('❌ No Google session found:', {
                message: result.message,
                error: result.error,
                hasSession: result.hasSession,
                showAds: result.showAds
              })
            }
          }
        } catch (error: any) {
          if (process.env.NODE_ENV === 'development') {
            console.error('❌ Session check exception:', {
              error,
              message: error?.message,
              response: error?.response?.data,
              status: error?.response?.status
            })
          }
          // On error, show normal website
          setSessionToken(null)
          setShortCode(null)
          setHasSession(false)
        } finally {
          setIsCheckingGoogle(false)
        }
      } else {
        // Not from Google - show normal website
        setSessionToken(null)
        setShortCode(null)
        setHasSession(false)
        setIsCheckingGoogle(false)
        hasCheckedGoogle.current = true
        if (process.env.NODE_ENV === 'development') {
          console.log('❌ No session detected - not from Google and no URL params')
        }
      }
    }

    checkSession()
  }, [searchParams])

  return {
    sessionToken,
    shortCode,
    hasSession,
    isCheckingGoogle,
  }
}

