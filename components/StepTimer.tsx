'use client'

import { useState, useEffect, useRef } from 'react'
import { Check } from 'lucide-react'

interface StepTimerProps {
  duration: number
  onComplete: () => void
  showContinueButton?: boolean
  continueButtonText?: string
}

export const StepTimer = ({
  duration,
  onComplete,
  showContinueButton = true,
  continueButtonText = 'Continue',
}: StepTimerProps) => {
  const [timeLeft, setTimeLeft] = useState(duration)
  const [isComplete, setIsComplete] = useState(false)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const onCompleteRef = useRef(onComplete)
  const showContinueRef = useRef(showContinueButton)

  // Update refs when props change
  useEffect(() => {
    onCompleteRef.current = onComplete
    showContinueRef.current = showContinueButton
  }, [onComplete, showContinueButton])

  useEffect(() => {
    setTimeLeft(duration)
    setIsComplete(false)

    if (intervalRef.current) clearInterval(intervalRef.current)

    intervalRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setIsComplete(true)
          if (!showContinueRef.current) {
            onCompleteRef.current()
          }
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [duration])

  const progress = ((duration - timeLeft) / duration) * 100

  return (
    <div className="w-full max-w-xs mx-auto">
      {!isComplete ? (
        <div className="space-y-2">
          {/* Minimal Timer Display */}
          <div className="text-center">
            <span className="text-lg font-medium text-gray-700 dark:text-gray-300 tabular-nums">
              {timeLeft}s
            </span>
          </div>

          {/* Thin Progress Bar */}
          <div className="relative h-1 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <div
              className="absolute inset-y-0 left-0 bg-blue-500 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      ) : (
        <>
          {showContinueButton && (
            <button
              onClick={onComplete}
              className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium rounded-lg transition-colors"
            >
              <Check className="w-4 h-4" />
              {continueButtonText}
            </button>
          )}
        </>
      )}
    </div>
  )
}