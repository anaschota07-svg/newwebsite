'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ExternalLink, Loader } from 'lucide-react'
import { validateSession } from '@/app/services/api'
import { useMiddlewareFlow } from '@/app/contexts/MiddlewareFlowContext'
import toast from 'react-hot-toast'

// Zap2Link main domain for verification page redirect
// IMPORTANT: /complete/[shortCode] route exists on Zap2Link backend, NOT on middleware website!
// Always use Zap2Link domain (not localhost) unless explicitly set via env variable
const ZAP2LINK_DOMAIN = process.env.NEXT_PUBLIC_ZAP2LINK_DOMAIN || 'https://zap2link.com'

export const GetLinkButton = () => {
  const { sessionToken, shortCode, setCurrentStep, totalTimeSpent } = useMiddlewareFlow()
  const [isLoading, setIsLoading] = useState(false)

  const handleGetLink = async () => {
    if (!sessionToken || !shortCode) {
      toast.error('Session information missing')
      return
    }

    setIsLoading(true)

    try {
      // 1. Validate session and check minimum steps
      const validation = await validateSession(sessionToken, shortCode)

      if (!validation.valid) {
        toast.error('Session expired. Please click the link again.')
        setIsLoading(false)
        return
      }

      if (!validation.requirements_met) {
        toast.error(`Please complete ${validation.steps_remaining} more step(s) before continuing.`)
        setIsLoading(false)
        return
      }

      // Calculate final total time from homepage to Get Link
      const storageKey = `session_start_${sessionToken.substring(0, 10)}`
      const storedStartTime = localStorage.getItem(storageKey)
      let finalTimeSpent = totalTimeSpent
      
      if (storedStartTime) {
        // Calculate from stored start time (most accurate)
        const startTime = parseInt(storedStartTime, 10)
        finalTimeSpent = Math.floor((Date.now() - startTime) / 1000)
        if (process.env.NODE_ENV === 'development') {
          console.log('⏱️ Total time calculated:', {
            startTime: new Date(startTime).toLocaleTimeString(),
            endTime: new Date().toLocaleTimeString(),
            totalSeconds: finalTimeSpent,
            totalMinutes: Math.floor(finalTimeSpent / 60),
          })
        }
      }

      // Mark step 3 as completed (Get Link clicked)
      if (sessionToken && shortCode) {
        const { incrementStep } = await import('@/app/services/api')
        await incrementStep(sessionToken, shortCode)
      }

      // 3. Build query parameters for Zap2Link verification page
      // Steps: 1 = Home page, 2 = Article page, 3 = Get Link clicked
      const params = new URLSearchParams({
        session: sessionToken,
        timeSpent: finalTimeSpent.toString(), // Use calculated final time
        steps: '1,2,3', // All steps completed
      })

      // Optional: Add adViews and scrollDepth if tracking them
      // For now, we'll skip these as they're not being tracked in this component

      // 4. ⚠️ IMPORTANT: Redirect to Zap2Link verification page (NOT directly to original URL)
      // Format: https://zap2link.com/complete/:shortCode?session=TOKEN&timeSpent=120&steps=1,2,3
      const zap2LinkUrl = `${ZAP2LINK_DOMAIN}/complete/${shortCode}?${params.toString()}`
      
      if (process.env.NODE_ENV === 'development') {
        console.log('🔗 Redirecting to Zap2Link verification page:', zap2LinkUrl)
        console.log('📊 Final Session data sent:', {
          sessionToken: sessionToken.substring(0, 10) + '...',
          shortCode,
          totalTimeSpent: finalTimeSpent,
          totalTimeFormatted: `${Math.floor(finalTimeSpent / 60)}m ${finalTimeSpent % 60}s`,
          steps: '1,2,3',
        })
      }

      setCurrentStep('completed')

      // Redirect to Zap2Link verification page (NOT directly to original URL)
      window.location.href = zap2LinkUrl
    } catch (error: any) {
      if (process.env.NODE_ENV === 'development') {
        console.error('Get link error:', error)
      }
      toast.error('Failed to redirect. Please try again.')
      setIsLoading(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex justify-center my-2"
    >
      {/* Completely different theme - Bright Orange/Red gradient with neon effect */}
      <motion.button
        onClick={handleGetLink}
        disabled={isLoading}
        whileHover={!isLoading ? { scale: 1.05, boxShadow: '0 0 30px rgba(255, 69, 0, 0.6)' } : {}}
        whileTap={!isLoading ? { scale: 0.95 } : {}}
        animate={!isLoading ? {
          boxShadow: [
            '0 0 20px rgba(255, 69, 0, 0.4)',
            '0 0 30px rgba(255, 69, 0, 0.6)',
            '0 0 20px rgba(255, 69, 0, 0.4)',
          ]
        } : {}}
        transition={{ duration: 2, repeat: Infinity }}
        className={`
          relative px-4 py-2
          rounded-lg font-bold
          text-white text-xl
          bg-gradient-to-r from-orange-500 via-red-500 to-pink-500
          hover:from-orange-600 hover:via-red-600 hover:to-pink-600
          disabled:from-gray-400 disabled:via-gray-500 disabled:to-gray-400
          shadow-2xl
          transition-all flex items-center gap-3
          border-2 border-white
          ${isLoading ? 'opacity-70 cursor-not-allowed' : 'cursor-pointer'}
          overflow-hidden
        `}
      >
        {/* Animated background shine effect */}
        {!isLoading && (
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
            animate={{
              x: ['-100%', '200%'],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
        )}

        {/* Button content */}
        <span className="relative z-10 flex items-center gap-3">
          {isLoading ? (
            <>
              <Loader className="w-6 h-6 animate-spin" />
              <span>Getting Link...</span>
            </>
          ) : (
            <>
              <span className="text-2xl">🔗</span>
              <span>Get Link</span>
              <ExternalLink className="w-6 h-6" />
            </>
          )}
        </span>
      </motion.button>
    </motion.div>
  )
}
