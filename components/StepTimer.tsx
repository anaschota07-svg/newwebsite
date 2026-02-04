'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Loader2, Sparkles } from 'lucide-react'

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
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (timeLeft <= 0) {
      setIsComplete(true)
      return
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setIsComplete(true)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [timeLeft])

  const handleContinue = async () => {
    if (isComplete && !isLoading) {
      setIsLoading(true)
      try {
        await new Promise(resolve => setTimeout(resolve, 300))
        onComplete()
      } catch (error) {
        setIsLoading(false)
      }
    }
  }

  const progress = ((duration - timeLeft) / duration) * 100

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="w-full"
    >
      {!isComplete ? (
        <div className="space-y-3">
          {/* Timer Display */}
          <div className="text-center">
            <motion.div
              className="inline-flex items-center gap-3 px-6 py-3 rounded-2xl glass border border-cyan-500/30"
              animate={{ scale: [1, 1.02, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              <div className="w-3 h-3 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 animate-pulse-gentle" />
              <span className="text-2xl font-black gradient-text tabular-nums">
                {timeLeft}s
              </span>
            </motion.div>
          </div>

          {/* Progress Bar */}
          <div className="relative h-2 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
            <motion.div
              className="absolute inset-y-0 left-0 rounded-full"
              style={{
                background: 'linear-gradient(90deg, #06b6d4, #3b82f6, #a855f7)',
              }}
              initial={{ width: '0%' }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            />
            {/* Shimmer Effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
              animate={{ x: ['-100%', '200%'] }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            />
          </div>
        </div>
      ) : (
        <>
          {showContinueButton && (
            <motion.button
              onClick={handleContinue}
              disabled={isLoading}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              whileHover={!isLoading ? { scale: 1.05, y: -2 } : {}}
              whileTap={!isLoading ? { scale: 0.95 } : {}}
              className="group relative w-full sm:w-auto mx-auto flex items-center justify-center gap-2 px-6 py-3 rounded-2xl font-bold text-white overflow-hidden disabled:opacity-60 disabled:cursor-not-allowed"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 animate-gradient-shift" />
              <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent" />
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin relative z-10" />  
                  <span className="relative z-10">Processing...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5 relative z-10" />
                  <span className="relative z-10">{continueButtonText}</span>
                </>
              )}
              {/* Shimmer on Hover */}
              <motion.div
                className="absolute inset-0 bg-white/20"
                initial={{ x: '-100%' }}
                whileHover={{ x: '100%' }}
                transition={{ duration: 0.6 }}
              />
            </motion.button>
          )}
        </>
      )}
    </motion.div>
  )
}
