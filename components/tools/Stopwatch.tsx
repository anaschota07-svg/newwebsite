'use client'

import { useState, useEffect, useRef } from 'react'
import { Play, Pause, RotateCcw } from 'lucide-react'

export default function Stopwatch() {
  const [time, setTime] = useState(0)
  const [isRunning, setIsRunning] = useState(false)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTime(t => t + 10)
      }, 10)
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [isRunning])

  const reset = () => {
    setIsRunning(false)
    setTime(0)
  }

  const formatTime = (ms: number) => {
    const minutes = Math.floor(ms / 60000)
    const seconds = Math.floor((ms % 60000) / 1000)
    const milliseconds = Math.floor((ms % 1000) / 10)
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}.${String(milliseconds).padStart(2, '0')}`
  }

  return (
    <div className="space-y-4">
      <div className="glass rounded-3xl p-12 border border-slate-200 dark:border-slate-700 shadow-lg text-center">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-8">
          ⏱️ Stopwatch
        </h3>
        <div className="text-7xl font-semibold mb-8 font-mono">
          {formatTime(time)}
        </div>
        <div className="flex gap-4 justify-center">
          <button
            onClick={() => setIsRunning(!isRunning)}
            className="px-8 py-4 bg-slate-900 hover:bg-slate-800 dark:bg-sky-600 dark:hover:bg-sky-500 text-white font-bold rounded-xl shadow-lg transition-all flex items-center gap-2"
          >
            {isRunning ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
            {isRunning ? 'Pause' : 'Start'}
          </button>
          <button
            onClick={reset}
            className="px-8 py-4 glass border border-slate-200 dark:border-slate-700 hover:border-cyan-500 text-slate-900 dark:text-white font-bold rounded-xl transition-all flex items-center gap-2"
          >
            <RotateCcw className="h-5 w-5" />
            Reset
          </button>
        </div>
      </div>
    </div>
  )
}
