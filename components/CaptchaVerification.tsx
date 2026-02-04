'use client'

import { useEffect, useRef, useState } from 'react'
import { verifyCaptcha } from '@/app/services/api'

interface Props {
  onVerify: () => void
}

// Extend window interface for grecaptcha v2
declare global {
  interface Window {
    grecaptcha: {
      ready: (callback: () => void) => void
      render: (container: HTMLElement, options: {
        sitekey: string
        callback: (token: string) => void
        'expired-callback'?: () => void
        'error-callback'?: () => void
      }) => number
      reset: (widgetId?: number) => void
      getResponse: (widgetId?: number) => string
      execute: (widgetId?: number) => void
    }
  }
}

export default function ReCaptchaBox({ onVerify }: Props) {
  const captchaRef = useRef<HTMLDivElement>(null)
  const widgetIdRef = useRef<number | null>(null)
  const isRenderingRef = useRef<boolean>(false)
  const onVerifyRef = useRef(onVerify)
  const checkIntervalRef = useRef<NodeJS.Timeout | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Check if we're in development mode on localhost
  const isLocalhost = typeof window !== 'undefined' && 
    (window.location.hostname === 'localhost' || 
     window.location.hostname === '127.0.0.1' ||
     window.location.hostname.startsWith('192.168.'))
  const isDevelopment = process.env.NODE_ENV === 'development'
  const skipCaptcha = isDevelopment && isLocalhost

  // Update callback ref when onVerify changes
  useEffect(() => {
    onVerifyRef.current = onVerify
  }, [onVerify])

  useEffect(() => {
    // Skip captcha in development on localhost
    if (skipCaptcha) {
      setIsLoading(false)
      console.log('🔧 Development mode: Captcha skipped for localhost')
      return
    }

    // Script is already loaded in index.html head tag
    // No need to load script again

    // Listen for reCAPTCHA verification event from global callback
    const handleRecaptchaEvent = (_event: CustomEvent) => {
      // Call the onVerify callback when reCAPTCHA is verified
      onVerifyRef.current()
    }

    window.addEventListener('recaptcha-verified', handleRecaptchaEvent as EventListener)

    // Render reCAPTCHA when script loads
    const checkAndRender = () => {
      // Prevent multiple simultaneous renders
      if (isRenderingRef.current) {
        return
      }

      // Check if widget is already rendered
      if (widgetIdRef.current !== null) {
        return
      }

      if (!captchaRef.current) {
        return
      }

      // Check if element already has reCAPTCHA widget
      if (captchaRef.current.querySelector('.grecaptcha-badge') || 
          captchaRef.current.querySelector('iframe[src*="recaptcha"]') ||
          captchaRef.current.hasAttribute('data-recaptcha-id')) {
        return
      }

      if (!window.grecaptcha) {
        setError('reCAPTCHA not loaded. Please refresh the page.')
        setIsLoading(false)
        return
      }

      try {
        isRenderingRef.current = true
        setIsLoading(true)
        setError(null)
        
        // Use reCAPTCHA v2 API (checkbox)
        window.grecaptcha.ready(() => {
          if (!captchaRef.current || widgetIdRef.current !== null) {
            isRenderingRef.current = false
            setIsLoading(false)
            return
          }

          try {
            // Mark element to prevent re-render
            captchaRef.current.setAttribute('data-recaptcha-id', 'pending')
            
            // Render reCAPTCHA v2 (Checkbox)
            // Get site key from environment variable or use fallback
            const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || '6LesRl8sAAAAAJI7Ab_QiiXPY4C-cibhw30LjD-6'
            
            if (!siteKey) {
              setError('reCAPTCHA site key is not configured')
              setIsLoading(false)
              isRenderingRef.current = false
              return
            }
            
            const widgetId = window.grecaptcha.render(captchaRef.current, {
              sitekey: siteKey,
              callback: async (token: string) => {
                console.log('✅ reCAPTCHA checkbox verified, token:', token.substring(0, 20) + '...')
                
                // Call global callback function
                if (typeof (window as any).handleRecaptchaCallback === 'function') {
                  (window as any).handleRecaptchaCallback(token)
                }
                
                // Verify token with backend (non-blocking - don't fail if verification fails)
                try {
                  const verification = await verifyCaptcha(token, 'verify')
                  if (verification.success) {
                    console.log('✅ reCAPTCHA verified successfully with backend')
                  } else {
                    console.warn('⚠️ reCAPTCHA verification failed but proceeding:', verification.error)
                    // Still proceed even if backend verification fails
                    // Backend might not be set up yet, so we allow user to continue
                  }
                } catch (error) {
                  console.warn('⚠️ reCAPTCHA verification error but proceeding:', error)
                  // Still proceed even if verification request fails
                }
                
                // Always call the React component's callback
                // User clicked checkbox and verified successfully
                onVerifyRef.current()
              },
              'expired-callback': () => {
                console.warn('reCAPTCHA token expired')
                setError('reCAPTCHA expired. Please try again.')
                // Reset widget on expire
                if (widgetIdRef.current !== null && window.grecaptcha) {
                  window.grecaptcha.reset(widgetIdRef.current)
                }
              },
              'error-callback': () => {
                console.error('reCAPTCHA error occurred')
                // Check for 401/domain mismatch errors
                const errorMsg = 'reCAPTCHA configuration error. Please check if the site key is valid for this domain.'
                setError(errorMsg)
                setIsLoading(false)
              },
            })
            widgetIdRef.current = widgetId
            captchaRef.current.setAttribute('data-recaptcha-id', widgetId.toString())
            isRenderingRef.current = false
            setIsLoading(false)
            console.log('✅ reCAPTCHA rendered successfully')
          } catch (renderError: any) {
            isRenderingRef.current = false
            setIsLoading(false)
            // If already rendered error, try to find existing widget
            if (renderError.message?.includes('already been rendered')) {
              console.warn('reCAPTCHA already rendered, skipping...')
              setError('reCAPTCHA already loaded')
              return
            }
            console.error('reCAPTCHA render error:', renderError)
            
            // Check for domain/authentication errors
            const errorMessage = renderError.message || ''
            if (errorMessage.includes('401') || errorMessage.includes('Unauthorized') || errorMessage.includes('invalid site key')) {
              setError('reCAPTCHA site key is not valid for this domain. Please check your reCAPTCHA configuration.')
            } else {
              setError('Failed to load reCAPTCHA. Please refresh the page.')
            }
          }
        })
      } catch (error: any) {
        isRenderingRef.current = false
        setIsLoading(false)
        console.error('reCAPTCHA ready error:', error)
        
        // Check for domain/authentication errors
        const errorMessage = error?.message || ''
        if (errorMessage.includes('401') || errorMessage.includes('Unauthorized') || errorMessage.includes('invalid site key')) {
          setError('reCAPTCHA site key is not valid for this domain. Please check your reCAPTCHA configuration in Google reCAPTCHA console.')
        } else {
          setError('Failed to initialize reCAPTCHA. Please refresh the page.')
        }
      }
    }

    // Check if grecaptcha is already loaded
    if (window.grecaptcha && typeof window.grecaptcha.ready === 'function') {
      checkAndRender()
    } else {
      // Wait for script to load
      let attempts = 0
      const maxAttempts = 100 // 10 seconds max wait
      
      checkIntervalRef.current = setInterval(() => {
        attempts++
        if (window.grecaptcha && typeof window.grecaptcha.ready === 'function') {
          if (checkIntervalRef.current) {
            clearInterval(checkIntervalRef.current)
            checkIntervalRef.current = null
          }
          checkAndRender()
        } else if (attempts >= maxAttempts) {
          // Timeout after max attempts
          if (checkIntervalRef.current) {
            clearInterval(checkIntervalRef.current)
            checkIntervalRef.current = null
          }
          setIsLoading(false)
          setError('reCAPTCHA script took too long to load. Please refresh the page.')
          console.error('reCAPTCHA script loading timeout')
        }
      }, 100)
    }

    // Cleanup function
    return () => {
      // Remove event listener
      window.removeEventListener('recaptcha-verified', handleRecaptchaEvent as EventListener)

      // Clear interval if still running
      if (checkIntervalRef.current) {
        clearInterval(checkIntervalRef.current)
        checkIntervalRef.current = null
      }

      // Reset widget if it exists
      if (widgetIdRef.current !== null && window.grecaptcha) {
        try {
          window.grecaptcha.reset(widgetIdRef.current)
        } catch (error) {
          // Ignore errors during cleanup
        }
      }
      
      // Reset refs
      widgetIdRef.current = null
      isRenderingRef.current = false
      
      // Clear element attributes
      if (captchaRef.current) {
        captchaRef.current.removeAttribute('data-recaptcha-id')
        captchaRef.current.innerHTML = ''
      }
    }
  }, []) // Empty dependency array - only run once on mount

  return (
    <div className="flex flex-col items-center justify-center py-4">
      {skipCaptcha ? (
        // Development Mode: Skip Captcha Button
        <div className="text-center">
          <div className="mb-3 px-4 py-2 bg-yellow-100 dark:bg-yellow-900/30 border border-yellow-300 dark:border-yellow-700 rounded-lg">
            <p className="text-xs font-semibold text-yellow-800 dark:text-yellow-300 mb-1">
              🔧 Development Mode
            </p>
            <p className="text-xs text-yellow-700 dark:text-yellow-400">
              Captcha is disabled for localhost testing
            </p>
          </div>
          <button
            onClick={() => {
              console.log('✅ Dev mode: Captcha bypassed on localhost')
              onVerifyRef.current()
            }}
            className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg font-bold hover:from-green-600 hover:to-emerald-600 transition-all shadow-lg"
          >
            ✓ Skip Captcha (Dev Mode)
          </button>
        </div>
      ) : (
        // Production Mode: Real reCAPTCHA
        <>
      {isLoading && !error && (
        <div className="mb-4 text-sm text-slate-600 dark:text-slate-400">
          Loading reCAPTCHA...
        </div>
      )}
      {error && (
            <div className="mb-4 text-sm text-red-600 dark:text-red-400 max-w-md text-center">
          {error}
              <div className="mt-2 text-xs text-slate-500">
                For localhost testing, the captcha is auto-skipped in development mode.
              </div>
        </div>
      )}
      <div ref={captchaRef} className="min-h-[60px] flex items-center justify-center">
      
      </div>
      {!isLoading && !error && widgetIdRef.current === null && (
        <div className="mt-2 text-xs text-slate-500 dark:text-slate-500">
          Complete the reCAPTCHA above to continue
        </div>
          )}
        </>
      )}
    </div>
  )
}