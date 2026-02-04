'use client'

import { motion } from 'framer-motion'

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export default function LoadingSpinner({ size = 'md', className = '' }: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'h-6 w-6',
    md: 'h-10 w-10',
    lg: 'h-16 w-16',
  }

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div className="relative">
        {/* Outer Ring */}
        <motion.div
          className={`${sizeClasses[size]} border-4 border-transparent rounded-full`}
          style={{
            borderTopColor: '#06b6d4',
            borderRightColor: '#3b82f6',
            borderBottomColor: '#a855f7',
            borderLeftColor: '#ec4899',
          }}
          animate={{ rotate: 360 }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
        {/* Inner Ring */}
        <motion.div
          className={`absolute inset-2 border-4 border-transparent rounded-full`}
          style={{
            borderTopColor: '#ec4899',
            borderRightColor: '#a855f7',
            borderBottomColor: '#3b82f6',
            borderLeftColor: '#06b6d4',
          }}
          animate={{ rotate: -360 }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
        {/* Center Dot */}
        <motion.div
          className="absolute inset-0 m-auto w-2 h-2 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [1, 0.5, 1],
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
          }}
        />
      </div>
    </div>
  )
}
