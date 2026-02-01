'use client'

import { useState } from 'react'
import { Calendar } from 'lucide-react'

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
    <div className="space-y-6">
      <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-gray-200 dark:border-slate-700 shadow-sm transition-colors duration-300">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 transition-colors duration-300">
              Enter Your Birth Date
            </label>
            <div className="relative">
              <input
                type="date"
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
                max={new Date().toISOString().split('T')[0]}
                className="w-full px-4 py-3 bg-gray-50 dark:bg-slate-900 border border-gray-300 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white transition-colors duration-300"
              />
              <Calendar className="absolute right-3 top-3.5 h-5 w-5 text-gray-400 pointer-events-none" />
            </div>
          </div>

          <button
            onClick={calculateAge}
            disabled={!birthDate}
            className="w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 dark:disabled:bg-gray-700 text-white font-semibold rounded-lg transition-colors disabled:cursor-not-allowed"
          >
            Calculate Age
          </button>
        </div>
      </div>

      {age && (
        <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl p-6 border border-blue-200 dark:border-blue-800 animate-slide-up transition-colors duration-300">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 transition-colors duration-300">Your Age</h3>
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 transition-colors duration-300">{age.years}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400 transition-colors duration-300">Years</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 transition-colors duration-300">{age.months}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400 transition-colors duration-300">Months</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-pink-600 dark:text-pink-400 transition-colors duration-300">{age.days}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400 transition-colors duration-300">Days</div>
            </div>
          </div>

          <div className="space-y-2 pt-4 border-t border-blue-200 dark:border-blue-800 transition-colors duration-300">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-400 transition-colors duration-300">Total Months:</span>
              <span className="font-semibold text-gray-900 dark:text-white transition-colors duration-300">{age.totalMonths.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-400 transition-colors duration-300">Total Weeks:</span>
              <span className="font-semibold text-gray-900 dark:text-white transition-colors duration-300">{age.totalWeeks.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-400 transition-colors duration-300">Total Days:</span>
              <span className="font-semibold text-gray-900 dark:text-white transition-colors duration-300">{age.totalDays.toLocaleString()}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
