import { useEffect, useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Clock, Shield, ExternalLink, AlertTriangle, CheckCircle2 } from 'lucide-react'
import { toast } from 'react-hot-toast'
import { validateMiddlewareSession, completeMiddlewareSession, updateClickSession } from '@/app/services/api'
import { loadAdSense, renderPlaceholderAd } from '@/app/utils/adIntegration'

// Configuration from guide
const CONFIG = {
  API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL || 'https://zap2link.com',
  SESSION_DURATION: 10 * 60 * 1000, // 10 minutes
  MINIMUM_TIME: 60 * 1000, // 1 minute (60 seconds)
  TRACKING_INTERVAL: 5000, // 5 seconds
  VALIDATION_INTERVAL: 300000, // 5 minutes (reduced frequency to prevent rate limiting)
}

interface MiddlewareSession {
  id: string
  linkId: string
  currentStep: number
  completedSteps: number[]
  requirementsMet: boolean
  isDuplicate: boolean
}

interface LinkData {
  id: string
  original_url: string
  title?: string
  description?: string
}

interface MiddlewareOverlayProps {
  sessionToken: string
  shortCode: string
  onClose: () => void
}

export const MiddlewareOverlay = ({ sessionToken, shortCode, onClose }: MiddlewareOverlayProps) => {
  const [session, setSession] = useState<MiddlewareSession | null>(null)
  const [link, setLink] = useState<LinkData | null>(null)
  const [isValidating, setIsValidating] = useState(true)
  const [sessionStartTime, setSessionStartTime] = useState<number | null>(null)
  const [minimumTimeElapsed, setMinimumTimeElapsed] = useState(false)
  const [totalTimeSpent, setTotalTimeSpent] = useState(0)
  const [adBlocked, setAdBlocked] = useState(false)
  const [isCompleting, setIsCompleting] = useState(false)

  const trackingData = useRef({
    stepsCompleted: [] as number[],
    adViews: 0,
    clicks: 0,
    scrollDepth: 0,
  })

  const validationIntervalRef = useRef<NodeJS.Timeout | null>(null)
  const trackingIntervalRef = useRef<NodeJS.Timeout | null>(null)
  const timerIntervalRef = useRef<NodeJS.Timeout | null>(null)
  const lastValidationRef = useRef<number>(0)
  const isMountedRef = useRef(true)

  // Initialize session validation (only once on mount)
  useEffect(() => {
    isMountedRef.current = true
    
    // Validate immediately on mount
    if (sessionToken && shortCode) {
      validateSession()
      lastValidationRef.current = Date.now()
    }

    // Periodic validation with rate limiting
    validationIntervalRef.current = setInterval(() => {
      // Only validate if enough time has passed since last validation
      const timeSinceLastValidation = Date.now() - lastValidationRef.current
      if (timeSinceLastValidation >= CONFIG.VALIDATION_INTERVAL && isMountedRef.current) {
        validateSession()
        lastValidationRef.current = Date.now()
      }
    }, CONFIG.VALIDATION_INTERVAL)

    return () => {
      isMountedRef.current = false
      if (validationIntervalRef.current) {
        clearInterval(validationIntervalRef.current)
        validationIntervalRef.current = null
      }
      if (trackingIntervalRef.current) {
        clearInterval(trackingIntervalRef.current)
        trackingIntervalRef.current = null
      }
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current)
        timerIntervalRef.current = null
      }
    }
  }, []) // Only run once on mount, not on every sessionToken/shortCode change

  // Validate session with error handling and rate limiting
  const validateSession = async () => {
    if (!sessionToken || !shortCode || !isMountedRef.current) return
    
    // Rate limiting: Don't validate if called too recently
    const timeSinceLastValidation = Date.now() - lastValidationRef.current
    if (timeSinceLastValidation < 10000) { // Minimum 10 seconds between validations
      if (process.env.NODE_ENV === 'development') {
        console.log('⏸️ Validation skipped - rate limiting')
      }
      return
    }

    if (process.env.NODE_ENV === 'development') {
      console.log('MiddlewareOverlay - Validating session:', { sessionToken: sessionToken.substring(0, 10) + '...', shortCode })
    }
    
    try {
      const { data, error } = await validateMiddlewareSession(sessionToken, shortCode)

      if (process.env.NODE_ENV === 'development') {
        console.log('MiddlewareOverlay - Validation response:', { valid: data?.valid, error })
      }

      if (error || !data?.valid) {
        // Don't show error toast on 429 (rate limit) - it's expected
        if (error && !error.includes('429') && !error.includes('Too Many Requests')) {
          console.error('❌ Session validation failed:', error || 'Invalid session')
          toast.error('Session expired or invalid')
        }
        setIsValidating(false)
        return
      }

      if (!isMountedRef.current) return

      setSession(data.session)
      setLink(data.link)
      setIsValidating(false)
      lastValidationRef.current = Date.now()

      // Start timers and tracking if not already started
      if (!sessionStartTime) {
        startTimers()
        checkAdBlocker()
        loadAds()
        startTracking()
      }
    } catch (error: any) {
      // Silently handle rate limit errors
      if (error?.response?.status === 429 || error?.message?.includes('429')) {
        if (process.env.NODE_ENV === 'development') {
          console.warn('⚠️ Rate limited - will retry later')
        }
        return
      }
      console.error('Session validation error:', error)
      if (isMountedRef.current) {
        toast.error('Failed to validate session')
        onClose()
      }
    }
  }

  // Start timers
  const startTimers = () => {
    const startTime = Date.now()
    setSessionStartTime(startTime)

    // Minimum time requirement
    setTimeout(() => {
      setMinimumTimeElapsed(true)
    }, CONFIG.MINIMUM_TIME)

    // Update timer display
    timerIntervalRef.current = setInterval(() => {
      const elapsed = Math.floor((Date.now() - startTime) / 1000)
      setTotalTimeSpent(elapsed)

      // Check expiration
      if (Date.now() - startTime > CONFIG.SESSION_DURATION) {
        toast.error('Session expired. Please click the link again.')
        onClose()
      }
    }, 1000)
  }

  // Start tracking
  const startTracking = () => {
    // Periodic updates
    trackingIntervalRef.current = setInterval(() => {
      sendTrackingUpdate()
    }, CONFIG.TRACKING_INTERVAL)

    // Track scroll
    const handleScroll = () => {
      const scrollPercent =
        (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
      trackingData.current.scrollDepth = Math.max(trackingData.current.scrollDepth, scrollPercent)
    }

    // Track clicks
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (!target.closest('#middleware-overlay')) {
        trackingData.current.clicks++
      }
    }

    window.addEventListener('scroll', handleScroll)
    document.addEventListener('click', handleClick)

    // Track ad views
    observeAdViews()

    return () => {
      window.removeEventListener('scroll', handleScroll)
      document.removeEventListener('click', handleClick)
    }
  }

  // Observe ad views
  const observeAdViews = () => {
    const ads = document.querySelectorAll('.ad-container')
    ads.forEach((ad) => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              trackingData.current.adViews++
              sendTrackingUpdate()
            }
          })
        },
        { threshold: 0.5 }
      )
      observer.observe(ad)
    })
  }

  // Send tracking update
  const sendTrackingUpdate = async () => {
    if (!session?.id) return

    try {
      await updateClickSession(session.id, {
        time_spent_seconds: totalTimeSpent,
        completed_steps: trackingData.current.stepsCompleted,
        metadata: {
          adViews: trackingData.current.adViews,
          clicks: trackingData.current.clicks,
          scrollDepth: trackingData.current.scrollDepth,
        },
      })
    } catch (error) {
      console.error('Tracking update failed:', error)
    }
  }

  // Check ad blocker
  const checkAdBlocker = () => {
    const testAd = document.createElement('div')
    testAd.innerHTML = '&nbsp;'
    testAd.className = 'adsbox'
    testAd.style.position = 'absolute'
    testAd.style.left = '-9999px'
    document.body.appendChild(testAd)

    setTimeout(() => {
      const isBlocked =
        testAd.offsetHeight === 0 ||
        testAd.offsetWidth === 0 ||
        window.getComputedStyle(testAd).display === 'none'

      if (isBlocked) {
        setAdBlocked(true)
        toast.error('Please disable your ad blocker to continue', { duration: 5000 })
        // Extend minimum time if ad blocker detected
        setTimeout(() => {
          if (!minimumTimeElapsed) {
            setMinimumTimeElapsed(true)
          }
        }, 30000)
      }

      if (document.body.contains(testAd)) {
        document.body.removeChild(testAd)
      }
    }, 100)
  }

  // Load ads
  const loadAds = () => {
    // @ts-ignore
    const adsensePublisherId =
      process.env.NEXT_PUBLIC_ADSENSE_PUBLISHER_ID ||
      'ca-pub-2268511139409784'

    if (adsensePublisherId) {
      loadAdSense('ad-top', 'top-banner', adsensePublisherId)
      loadAdSense('ad-middle', 'middle-rectangle', adsensePublisherId)
      loadAdSense('ad-bottom', 'bottom-banner', adsensePublisherId)
    } else {
      // Placeholder ads for development
      renderPlaceholderAd('ad-top', '728x90', 'Top Banner')
      renderPlaceholderAd('ad-middle', '300x250', 'Middle Rectangle')
      renderPlaceholderAd('ad-bottom', '728x90', 'Bottom Banner')
    }
  }

  // Security: Prevent bypass attempts
  useEffect(() => {
    // Disable right-click
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault()
    }

    // Disable developer tools shortcuts
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.key === 'F12' ||
        (e.ctrlKey && e.shiftKey && e.key === 'I') ||
        (e.ctrlKey && e.shiftKey && e.key === 'C') ||
        (e.ctrlKey && e.shiftKey && e.key === 'J') ||
        (e.ctrlKey && e.key === 'U')
      ) {
        e.preventDefault()
        toast.error('This action is not allowed')
      }
    }

    // Disable text selection (optional - can be removed if needed)
    const handleSelectStart = () => {
      // Allow selection for better UX, but you can disable it if needed
      // e.preventDefault()
    }

    document.addEventListener('contextmenu', handleContextMenu)
    document.addEventListener('keydown', handleKeyDown)
    document.addEventListener('selectstart', handleSelectStart)

    // Add middleware-mode class to body
    document.body.classList.add('middleware-mode')

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu)
      document.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('selectstart', handleSelectStart)
      document.body.classList.remove('middleware-mode')
    }
  }, [])

  // Complete and redirect
  const handleComplete = async () => {
    if (!minimumTimeElapsed) {
      toast.error('Please wait for the minimum time requirement.')
      return
    }

    setIsCompleting(true)

    try {
      const { data, error } = await completeMiddlewareSession(shortCode, {
        sessionToken,
        completedSteps: trackingData.current.stepsCompleted,
        timeSpent: totalTimeSpent,
        adViews: trackingData.current.adViews,
        scrollDepth: trackingData.current.scrollDepth,
      })

      if (error || !data?.success) {
        throw new Error(error || 'Completion failed')
      }

      // Redirect to final URL
      window.location.href = data.redirect_url
    } catch (error: any) {
      console.error('Completion error:', error)
      toast.error('Failed to redirect. Please try again.')
      setIsCompleting(false)
    }
  }

  // Format time
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  // Calculate remaining seconds for continue button
  const continueTimerSeconds = Math.max(0, 60 - totalTimeSpent)

  // Always show overlay if we have session token and short code
  // Show validation state or error state
  if (isValidating) {
    return (
      <div
        id="middleware-overlay"
        className="fixed inset-0 bg-black/95 z-[9999] flex items-center justify-center"
        style={{ display: 'block' }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center text-white"
        >
          <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="font-medium">Validating session...</p>
          <p className="text-sm text-slate-400 mt-2">Please wait...</p>
        </motion.div>
      </div>
    )
  }

  // Show error state if validation failed but we still have session params
  if (!session || !link) {
    return (
      <div
        id="middleware-overlay"
        className="fixed inset-0 bg-black/95 z-[9999] flex items-center justify-center"
        style={{ display: 'block' }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center text-white max-w-md"
        >
          <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertTriangle className="w-8 h-8 text-red-400" />
          </div>
          <h2 className="text-2xl font-bold mb-2">Session Invalid</h2>
          <p className="text-slate-400 mb-4">
            The session token is invalid or expired. Please click the link again.
          </p>
          <button
            onClick={onClose}
            className="px-6 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors"
          >
            Close
          </button>
        </motion.div>
      </div>
    )
  }

  return (
    <motion.div
      id="middleware-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/95 z-[9999] overflow-y-auto"
    >
      <div className="max-w-4xl mx-auto px-4 py-8 text-white">
        {/* Navigation Bar */}
        <nav className="bg-slate-900/50 backdrop-blur-sm rounded-lg p-4 mb-6 flex justify-between items-center">
          <h2 className="text-xl font-semibold">{link.title || 'Redirecting...'}</h2>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <div className="text-sm text-slate-400">Time</div>
              <div className="text-2xl font-bold text-green-400">{formatTime(totalTimeSpent)}</div>
            </div>
          </div>
        </nav>

        {/* Content Area */}
        <div className="space-y-6">
          {/* Top Ad */}
          <div
            id="ad-top"
            className="ad-container w-full min-h-[90px] flex items-center justify-center bg-slate-800/50 rounded-lg border-2 border-dashed border-slate-600"
          ></div>

          {/* Website Preview / Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="card bg-slate-800/50 backdrop-blur-sm"
          >
            <div className="text-center mb-8">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring' }}
                className="w-20 h-20 bg-gradient-to-br from-green-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4"
              >
                <Shield className="w-10 h-10 text-white" />
              </motion.div>
              <h1 className="text-3xl font-bold mb-2">
                {minimumTimeElapsed ? 'Ready to Continue' : 'Preparing Your Link...'}
              </h1>
              <p className="text-slate-400">
                {minimumTimeElapsed
                  ? 'Complete verification to continue to your destination'
                  : 'Please wait while we verify the destination'}
              </p>
            </div>

            {/* Timer Display */}
            <div className="text-center mb-8">
              <motion.div
                key={continueTimerSeconds}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-7xl font-bold mb-4"
              >
                {minimumTimeElapsed ? (
                  <CheckCircle2 className="w-20 h-20 mx-auto text-green-500" />
                ) : (
                  <span className="text-blue-500">{continueTimerSeconds}</span>
                )}
              </motion.div>
              <p className="text-slate-400 font-medium">
                {minimumTimeElapsed
                  ? 'Verification Complete'
                  : `${continueTimerSeconds} seconds remaining`}
              </p>
            </div>

            {/* Middle Ad */}
            <div
              id="ad-middle"
              className="ad-container w-full min-h-[250px] flex items-center justify-center bg-slate-800/50 rounded-lg border-2 border-dashed border-slate-600 my-6"
            ></div>

            {/* Destination Info */}
            <AnimatePresence>
              {minimumTimeElapsed && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="bg-slate-700/50 rounded-lg p-4 mb-6 border-l-4 border-green-500"
                >
                  <p className="text-sm text-slate-400 mb-2 font-medium">You will be redirected to:</p>
                  <p className="text-green-400 font-semibold break-all">{link.original_url}</p>
                  {link.description && (
                    <p className="text-sm text-slate-500 mt-2">{link.description}</p>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Continue Button */}
            <motion.button
              onClick={handleComplete}
              disabled={!minimumTimeElapsed || adBlocked || isCompleting}
              whileHover={minimumTimeElapsed && !adBlocked ? { scale: 1.02 } : {}}
              whileTap={minimumTimeElapsed && !adBlocked ? { scale: 0.98 } : {}}
              className={`w-full py-4 px-8 rounded-lg font-semibold text-lg transition-all duration-300 ${minimumTimeElapsed && !adBlocked && !isCompleting
                  ? 'bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white shadow-lg hover:shadow-xl animate-pulse-soft'
                  : 'bg-slate-700 text-slate-400 cursor-not-allowed'
                }`}
            >
              {isCompleting ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Redirecting...
                </span>
              ) : adBlocked ? (
                <span className="flex items-center justify-center gap-2">
                  <AlertTriangle className="w-5 h-5" />
                  Disable Ad Blocker to Continue
                </span>
              ) : minimumTimeElapsed ? (
                <span className="flex items-center justify-center gap-2">
                  <span>Continue to Website</span>
                  <ExternalLink className="w-5 h-5" />
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  <Clock className="w-5 h-5" />
                  Please wait {continueTimerSeconds}s...
                </span>
              )}
            </motion.button>

            {/* Security Notice */}
            <div className="mt-6 p-3 bg-blue-900/20 rounded-lg text-center">
              <p className="text-xs text-blue-400">
                🔒 This link is protected by security verification to ensure safe browsing
              </p>
            </div>
          </motion.div>

          {/* Bottom Ad */}
          <div
            id="ad-bottom"
            className="ad-container w-full min-h-[90px] flex items-center justify-center bg-slate-800/50 rounded-lg border-2 border-dashed border-slate-600"
          ></div>
        </div>
      </div>
    </motion.div>
  )
}

