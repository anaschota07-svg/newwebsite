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
      <div className="glass rounded-3xl p-6 border border-white/10">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-bold text-slate-900 dark:text-slate-300 mb-2 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-cyan-500" />
              Enter Your Birth Date
            </label>
            <input
              type="date"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
              max={new Date().toISOString().split('T')[0]}
              className="w-full px-5 py-3 glass border border-white/10 rounded-2xl focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 text-slate-900 dark:text-white font-semibold transition-all"
            />
          </div>

          <motion.button
            onClick={calculateAge}
            disabled={!birthDate}
            whileHover={birthDate ? { scale: 1.02, y: -2 } : {}}
            whileTap={birthDate ? { scale: 0.98 } : {}}
            className="group relative w-full px-8 py-3 rounded-2xl font-bold text-white overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 animate-gradient-shift" />
            <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent" />
            <span className="relative z-10 flex items-center justify-center gap-2">
              <Sparkles className="w-5 h-5" />
              Calculate Age
            </span>
          </motion.button>
        </div>
      </div>

      {age && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="glass rounded-3xl p-6 border border-white/10"
        >
          <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-5 flex items-center gap-3">
            <Sparkles className="w-6 h-6 text-cyan-500" />
            Your Age
          </h3>
          
          {/* Main Age Display */}
          <div className="grid grid-cols-3 gap-3 mb-5">
            {[
              { value: age.years, label: 'Years', gradient: 'from-cyan-500 to-blue-500' },
              { value: age.months, label: 'Months', gradient: 'from-blue-500 to-purple-500' },
              { value: age.days, label: 'Days', gradient: 'from-purple-500 to-pink-500' },
            ].map((item, i) => (
              <motion.div
                key={i}
                className="text-center p-4 rounded-2xl glass border border-white/10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <div className={`text-4xl font-black gradient-text mb-1`}>{item.value}</div>
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
                <span className="text-lg font-black gradient-text">{stat.value.toLocaleString()}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  )
}
