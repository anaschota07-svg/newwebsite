'use client'

import { useState, useEffect } from 'react'
import { AdPopup } from './AdPopup'
import { useMiddlewareSession } from '@/app/hooks/useMiddlewareSession'
import { useMiddlewareFlow } from '@/app/contexts/MiddlewareFlowContext'
import { validateSession, incrementStep } from '@/app/services/api'
import toast from 'react-hot-toast'

/**
 * Wrapper component that detects middleware sessions and shows overlay
 * Based on the guide: Shows middleware overlay when ?session=TOKEN&link=CODE
 * Otherwise shows normal website content
 */
export const MiddlewareWrapper = ({ children }: { children: React.ReactNode }) => {
  const { sessionToken, shortCode, hasSession } = useMiddlewareSession()
  const { setSessionToken, setShortCode, setCurrentStep, currentStep, popupClosed, setPopupClosed, setSessionStartTime, sessionStartTime } = useMiddlewareFlow()
  const [showPopup, setShowPopup] = useState(false)

  useEffect(() => {
    // Initialize flow when session detected
    if (hasSession && sessionToken && shortCode) {
      setSessionToken(sessionToken)
      setShortCode(shortCode)
      
      // Initialize time tracking when session first detected (homepage)
      // Check localStorage first to see if time tracking already started
      const storageKey = `session_start_${sessionToken.substring(0, 10)}`
      const storedStartTime = localStorage.getItem(storageKey)
      
      if (!storedStartTime && !sessionStartTime) {
        // First time - start new session timer from homepage
        const startTime = Date.now()
        localStorage.setItem(storageKey, startTime.toString())
        setSessionStartTime(startTime)
        if (process.env.NODE_ENV === 'development') {
          console.log('⏱️ Session time tracking started from homepage:', new Date(startTime).toLocaleTimeString())
        }
      } else if (storedStartTime && !sessionStartTime) {
        // Resume from stored time (page navigation)
        const startTime = parseInt(storedStartTime, 10)
        setSessionStartTime(startTime)
        if (process.env.NODE_ENV === 'development') {
          console.log('⏱️ Session time tracking resumed from:', new Date(startTime).toLocaleTimeString())
        }
      }
      
      // Validate session on page load
      const validate = async () => {
        const result = await validateSession(sessionToken, shortCode)
        if (!result.valid) {
          toast.error('Session expired. Please click the link again.')
          return
        }
        if (!result.requirements_met && result.steps_remaining > 0) {
          if (process.env.NODE_ENV === 'development') {
            console.log(`Need ${result.steps_remaining} more steps`)
          }
        }
      }
      validate()
      
      // Show popup if not already closed
      if (!popupClosed && currentStep === 'popup') {
        setShowPopup(true)
        setCurrentStep('popup')
      }
    } else {
      // Reset flow when no session
      setSessionToken(null)
      setShortCode(null)
      setCurrentStep('popup')
      setPopupClosed(false)
      setShowPopup(false)
    }
  }, [hasSession, sessionToken, shortCode, popupClosed, currentStep, setSessionToken, setShortCode, setCurrentStep, setSessionStartTime, sessionStartTime])

  const handlePopupClose = async () => {
    setShowPopup(false)
    setPopupClosed(true)
    
    // Increment step when popup closes (Step 1)
    if (sessionToken && shortCode) {
      const result = await incrementStep(sessionToken, shortCode)
      if (process.env.NODE_ENV === 'development') {
        if (result.success) {
          console.log('✅ Step 1 completed - Popup closed')
        } else {
          console.error('Failed to increment step:', result.error)
        }
      }
    }
    
    // Don't change step - captcha already visible
    // Step remains 'popup' so HomePage shows captcha
  }

  return (
    <>
      {/* Normal website content - always rendered */}
      {children}

      {/* Ad Popup - Step 1: Show popup with ads */}
      {showPopup && sessionToken && shortCode && currentStep === 'popup' ? (
        <AdPopup
          sessionToken={sessionToken}
          shortCode={shortCode}
          onClose={handlePopupClose}
        />
      ) : null}
    </>
  )
}

