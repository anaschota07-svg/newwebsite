'use client'

import { useState } from 'react'

export default function DateCalculator() {
  const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0])
  const [endDate, setEndDate] = useState(new Date().toISOString().split('T')[0])
  const [difference, setDifference] = useState<any>(null)

  const calculateDifference = () => {
    const start = new Date(startDate)
    const end = new Date(endDate)
    const diffTime = Math.abs(end.getTime() - start.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    const years = Math.floor(diffDays / 365)
    const months = Math.floor((diffDays % 365) / 30)
    const days = diffDays % 30

    setDifference({ diffDays, years, months, days })
  }

  return (
    <div className="space-y-4">
      <div className="glass rounded-3xl p-6 border border-white/10 shadow-lg">
        <h3 className="text-lg font-black text-slate-900 dark:text-white mb-4">
          📅 Select Dates
        </h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Start Date</label>
            <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="w-full px-4 py-3 glass border border-white/10 rounded-xl focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 text-slate-900 dark:text-white" />
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">End Date</label>
            <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} className="w-full px-4 py-3 glass border border-white/10 rounded-xl focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 text-slate-900 dark:text-white" />
          </div>

          <button onClick={calculateDifference} className="w-full px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white font-bold rounded-xl shadow-lg transition-all">
            Calculate Difference
          </button>
        </div>
      </div>

      {difference && (
        <div className="glass rounded-3xl p-6 border border-white/10 shadow-lg animate-slide-up">
          <h3 className="text-xl font-black text-slate-900 dark:text-white mb-6">
            ⏱️ Time Difference
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="glass rounded-xl p-4 border border-white/10">
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">Total Days</p>
              <p className="text-3xl font-black text-cyan-600">{difference.diffDays}</p>
            </div>
            <div className="glass rounded-xl p-4 border border-white/10">
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">Years</p>
              <p className="text-3xl font-black text-purple-600">{difference.years}</p>
            </div>
            <div className="glass rounded-xl p-4 border border-white/10">
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">Months</p>
              <p className="text-3xl font-black text-pink-600">{difference.months}</p>
            </div>
            <div className="glass rounded-xl p-4 border border-white/10">
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">Days</p>
              <p className="text-3xl font-black text-blue-600">{difference.days}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
