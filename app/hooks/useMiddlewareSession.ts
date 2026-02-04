'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'

/**
 * Hook to detect and manage middleware session from URL parameters
 * Based on the guide: checks for ?session=TOKEN&link=CODE
 * Updated for Next.js App Router
 */
export const useMiddlewareSession = () => {
  const searchParams = useSearchParams()
  const [sessionToken, setSessionToken] = useState<string | null>(null)
  const [shortCode, setShortCode] = useState<string | null>(null)
  const [hasSession, setHasSession] = useState(false)

  useEffect(() => {
    // Check for session token and link code in URL
    const token = searchParams?.get('session')
    const code = searchParams?.get('link') || searchParams?.get('code')

    console.log('useMiddlewareSession - URL params:', {
      token: token ? 'present' : 'missing',
      code: code ? 'present' : 'missing',
      allParams: searchParams ? Object.fromEntries(searchParams.entries()) : {},
    })

    if (token && code) {
      setSessionToken(token)
      setShortCode(code)
      setHasSession(true)
      console.log('✅ Session detected:', { token: token.substring(0, 10) + '...', code })
    } else {
      setSessionToken(null)
      setShortCode(null)
      setHasSession(false)
      console.log('❌ No session detected')
    }
  }, [searchParams])

  return {
    sessionToken,
    shortCode,
    hasSession,
  }
}

