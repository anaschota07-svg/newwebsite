'use client'

import { useState, useEffect } from 'react'
import { Play, Pause, RotateCcw } from 'lucide-react'

export default function PomodoroTimer() {
  const [minutes, setMinutes] = useState(25)
  const [seconds, setSeconds] = useState(0)
  const [isActive, setIsActive] = useState(false)

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null

    if (isActive) {
      interval = setInterval(() => {
        if (seconds === 0) {
          if (minutes === 0) {
            setIsActive(false)
          } else {
            setMinutes(minutes - 1)
            setSeconds(59)
          }
        } else {
          setSeconds(seconds - 1)
        }
      }, 1000)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isActive, minutes, seconds])

  const reset = () => {
    setIsActive(false)
    setMinutes(25)
    setSeconds(0)
  }

  return (
    <div className="space-y-4">
      <div className="glass rounded-3xl p-12 border border-slate-200 dark:border-slate-700 shadow-lg text-center">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-8">
          🍅 Pomodoro Timer
        </h3>
        <div className="text-8xl font-semibold mb-8">
          {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
        </div>
        <div className="flex gap-4 justify-center">
          <button
            onClick={() => setIsActive(!isActive)}
            className="px-8 py-4 bg-slate-900 hover:bg-slate-800 dark:bg-sky-600 dark:hover:bg-sky-500 text-white font-bold rounded-xl shadow-lg transition-all flex items-center gap-2"
          >
            {isActive ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
            {isActive ? 'Pause' : 'Start'}
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

      <div className="glass rounded-3xl p-6 border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-800/50">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-3">
          💡 Pomodoro Technique
        </h3>
        <ul className="space-y-2 text-sm text-slate-700 dark:text-slate-300">
          <li className="flex items-start gap-2">
            <span className="text-cyan-500 font-bold">✦</span>
            <span>Work for 25 minutes</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-purple-500 font-bold">✦</span>
            <span>Take a 5-minute break</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-pink-500 font-bold">✦</span>
            <span>After 4 pomodoros, take a 15-30 minute break</span>
          </li>
        </ul>
      </div>
    </div>
  )
}
