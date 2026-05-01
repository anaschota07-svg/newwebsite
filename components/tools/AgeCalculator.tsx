'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Calendar, Sparkles } from 'lucide-react'

export default function AgeCalculator() {
  const [birthDate, setBirthDate] = useState('')
  const [age, setAge] = useState<{
    years: number
    months: number
    days: number
    totalDays: number
    totalWeeks: number
    totalMonths: number
  } | null>(null)

  const calculateAge = () => {
    if (!birthDate) return

    const birth = new Date(birthDate)
    const today = new Date()

    let years = today.getFullYear() - birth.getFullYear()
    let months = today.getMonth() - birth.getMonth()
    let days = today.getDate() - birth.getDate()

    if (days < 0) {
      months--
      const lastMonth = new Date(today.getFullYear(), today.getMonth(), 0)
      days += lastMonth.getDate()
    }

    if (months < 0) {
      years--
      months += 12
    }

    const totalDays = Math.floor((today.getTime() - birth.getTime()) / (1000 * 60 * 60 * 24))
    const totalWeeks = Math.floor(totalDays / 7)
    const totalMonths = years * 12 + months

    setAge({
      years,
      months,
      days,
      totalDays,
      totalWeeks,
      totalMonths,
    })
  }

  return (
    <div className="space-y-4">
      <div className="glass rounded-3xl p-6 border border-slate-200 dark:border-slate-700">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-bold text-slate-900 dark:text-slate-300 mb-2 flex items-center gap-2">
              <Calendar className="h-4 w-4 text-sky-600 dark:text-sky-400" />
              Enter Your Birth Date
            </label>
            <input
              type="date"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
              max={new Date().toISOString().split('T')[0]}
              className="w-full px-5 py-3 glass border border-slate-200 dark:border-slate-700 rounded-2xl focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 text-slate-900 dark:text-white font-semibold transition-all"
            />
          </div>

          <motion.button
            type="button"
            onClick={calculateAge}
            disabled={!birthDate}
            whileHover={birthDate ? { scale: 1.01 } : {}}
            whileTap={birthDate ? { scale: 0.99 } : {}}
            className="flex w-full items-center justify-center gap-2 rounded-2xl bg-slate-900 px-8 py-3 font-semibold text-white transition-colors hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-sky-600 dark:hover:bg-sky-500"
          >
            <Sparkles className="h-5 w-5" aria-hidden />
            Calculate Age
          </motion.button>
        </div>
      </div>

      {age && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="glass rounded-3xl p-6 border border-slate-200 dark:border-slate-700"
        >
          <h3 className="text-2xl font-semibold text-slate-900 dark:text-white mb-5 flex items-center gap-3">
            <Sparkles className="h-6 w-6 text-sky-600 dark:text-sky-400" aria-hidden />
            Your Age
          </h3>
          
          {/* Main Age Display */}
          <div className="mb-5 grid grid-cols-3 gap-3">
            {[
              { value: age.years, label: 'Years' },
              { value: age.months, label: 'Months' },
              { value: age.days, label: 'Days' },
            ].map((item, i) => (
              <motion.div
                key={item.label}
                className="glass rounded-2xl border border-slate-200 p-4 text-center dark:border-slate-700"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <div className="mb-1 text-4xl font-semibold tabular-nums text-slate-900 dark:text-white">{item.value}</div>
                <div className="text-sm font-semibold text-slate-900 dark:text-slate-400 uppercase tracking-wide">{item.label}</div>
              </motion.div>
            ))}
          </div>

          {/* Additional Stats */}
          <div className="space-y-2 pt-4 border-t border-slate-200 dark:border-slate-800">
            {[
              { label: 'Total Months', value: age.totalMonths },
              { label: 'Total Weeks', value: age.totalWeeks },
              { label: 'Total Days', value: age.totalDays },
            ].map((stat, i) => (
              <motion.div
                key={i}
                className="flex justify-between items-center p-3 rounded-xl bg-slate-50 dark:bg-slate-900/50"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + i * 0.05 }}
                whileHover={{ x: 4 }}
              >
                <span className="text-sm font-semibold text-slate-900 dark:text-slate-400">{stat.label}:</span>
                <span className="text-lg font-semibold gradient-text">{stat.value.toLocaleString()}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  )
}
