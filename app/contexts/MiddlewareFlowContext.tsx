'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

export type FlowStep =
  | 'popup' // Step 1: Ad popup
  | 'captcha' // Step 2: Captcha verification
  | 'home-timer' // Step 3: Home screen timer (20s)
  | 'home-continue' // Step 4: Home continue button (unused)
  | 'home-next' // Step 4: Next button on home (scroll down instruction)
  | 'tools-timer' // Step 5: Tools page timer (20s, hidden with rainbow message)
  | 'tools-next' // Step 6: Tools page - click tool instruction
  | 'tool-detail-timer' // Step 7: Tool detail page hidden timer (20s)
  | 'tool-detail-continue' // Step 8: Tool continue (unused)
  | 'articles-timer' // Alternative: Articles page timer (for article flow)
  | 'articles-continue' // Alternative: Articles continue
  | 'articles-next' // Alternative: Next button on articles
  | 'article-timer' // Alternative: Article detail timer (legacy)
  | 'article-detail-timer' // Alternative: Article detail timer
  | 'article-continue' // Alternative: Article continue (legacy)
  | 'article-detail-continue' // Alternative: Article continue
  | 'get-link' // Step 8: Get Link button (final step)
  | 'completed' // Final: Redirected to Zap2Link

interface MiddlewareFlowContextType {
  currentStep: FlowStep
  setCurrentStep: (step: FlowStep) => void
  sessionToken: string | null
  setSessionToken: (token: string | null) => void
  shortCode: string | null
  setShortCode: (code: string | null) => void
  captchaCompleted: boolean
  setCaptchaCompleted: (completed: boolean) => void
  finalUrl: string | null
  setFinalUrl: (url: string | null) => void
  popupClosed: boolean
  setPopupClosed: (closed: boolean) => void
  totalTimeSpent: number
  setTotalTimeSpent: (time: number) => void
  sessionStartTime: number | null
  setSessionStartTime: (time: number | null) => void
}

const MiddlewareFlowContext = createContext<MiddlewareFlowContextType | undefined>(undefined)

export const MiddlewareFlowProvider = ({ children }: { children: ReactNode }) => {
  const [currentStep, setCurrentStepState] = useState<FlowStep>('popup')
  const [sessionToken, setSessionToken] = useState<string | null>(null)
  const [shortCode, setShortCode] = useState<string | null>(null)
  const [captchaCompleted, setCaptchaCompleted] = useState(false)
  const [finalUrl, setFinalUrl] = useState<string | null>(null)
  const [popupClosed, setPopupClosed] = useState(false)
  const [totalTimeSpent, setTotalTimeSpent] = useState<number>(0)
  const [sessionStartTime, setSessionStartTime] = useState<number | null>(null)

  // Persist currentStep to localStorage for navigation persistence
  const setCurrentStep = (step: FlowStep) => {
    setCurrentStepState(step)
    if (sessionToken) {
      const stepKey = `session_step_${sessionToken.substring(0, 10)}`
      localStorage.setItem(stepKey, step)
      if (process.env.NODE_ENV === 'development') {
        console.log(`💾 Saved step to localStorage: ${step}`)
      }
    }
  }

  // Restore currentStep from localStorage on mount
  useEffect(() => {
    if (sessionToken) {
      const stepKey = `session_step_${sessionToken.substring(0, 10)}`
      const storedStep = localStorage.getItem(stepKey) as FlowStep | null
      if (storedStep && storedStep !== currentStep) {
        setCurrentStepState(storedStep)
        if (process.env.NODE_ENV === 'development') {
          console.log(`🔄 Restored step from localStorage: ${storedStep}`)
        }
      }
    }
  }, [sessionToken])

  // Track total time across all pages - persists across navigation
  useEffect(() => {
    if (sessionToken) {
      // Check if we have a stored start time (persists across page navigations)
      const storageKey = `session_start_${sessionToken.substring(0, 10)}`
      const storedStartTime = localStorage.getItem(storageKey)
      
      let startTime: number
      
      if (storedStartTime && !sessionStartTime) {
        // Resume from stored time (page navigation)
        startTime = parseInt(storedStartTime, 10)
        setSessionStartTime(startTime)
        // Calculate elapsed time so far
        const elapsed = Math.floor((Date.now() - startTime) / 1000)
        setTotalTimeSpent(elapsed)
      } else if (!sessionStartTime) {
        // First time - start new session
        startTime = Date.now()
        setSessionStartTime(startTime)
        localStorage.setItem(storageKey, startTime.toString())
        setTotalTimeSpent(0)
      } else {
        // Use existing start time
        startTime = sessionStartTime
      }
      
      // Update total time every second
      const interval = setInterval(() => {
        const currentStartTime = sessionStartTime || parseInt(localStorage.getItem(storageKey) || '0', 10)
        if (currentStartTime > 0) {
          const elapsed = Math.floor((Date.now() - currentStartTime) / 1000)
          setTotalTimeSpent(elapsed)
        }
      }, 1000)

      return () => clearInterval(interval)
    } else if (!sessionToken) {
      // Clear stored time and step when session ends
      // Clean up any stored session times and steps
      Object.keys(localStorage).forEach(key => {
        if (key.startsWith('session_start_') || key.startsWith('session_step_')) {
          localStorage.removeItem(key)
        }
      })
      setSessionStartTime(null)
      setTotalTimeSpent(0)
      setCurrentStepState('popup')
    }
  }, [sessionToken, sessionStartTime])

  return (
    <MiddlewareFlowContext.Provider
      value={{
        currentStep,
        setCurrentStep,
        sessionToken,
        setSessionToken,
        shortCode,
        setShortCode,
        captchaCompleted,
        setCaptchaCompleted,
        finalUrl,
        setFinalUrl,
        popupClosed,
        setPopupClosed,
        totalTimeSpent,
        setTotalTimeSpent,
        sessionStartTime,
        setSessionStartTime,
      }}
    >
      {children}
    </MiddlewareFlowContext.Provider>
  )
}

export const useMiddlewareFlow = () => {
  const context = useContext(MiddlewareFlowContext)
  if (!context) {
    throw new Error('useMiddlewareFlow must be used within MiddlewareFlowProvider')
  }
  return context
}

