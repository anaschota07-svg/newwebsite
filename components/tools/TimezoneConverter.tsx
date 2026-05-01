'use client'

import { useState } from 'react'

export default function TimezoneConverter() {
  const [time, setTime] = useState(new Date().toTimeString().slice(0, 5))
  const [fromZone, setFromZone] = useState('UTC')
  const [toZone, setToZone] = useState('America/New_York')

  const timezones = [
    'UTC', 'America/New_York', 'America/Los_Angeles', 'Europe/London', 
    'Europe/Paris', 'Asia/Tokyo', 'Asia/Dubai', 'Australia/Sydney'
  ]

  return (
    <div className="space-y-4">
      <div className="glass rounded-3xl p-6 border border-slate-200 dark:border-slate-700 shadow-lg">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
          🌍 Convert Time
        </h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Time</label>
            <input type="time" value={time} onChange={(e) => setTime(e.target.value)} className="w-full px-4 py-3 glass border border-slate-200 dark:border-slate-700 rounded-xl focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 text-slate-900 dark:text-white" />
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">From Timezone</label>
            <select value={fromZone} onChange={(e) => setFromZone(e.target.value)} className="w-full px-4 py-3 glass border border-slate-200 dark:border-slate-700 rounded-xl focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 text-slate-900 dark:text-white">
              {timezones.map((tz) => <option key={tz} value={tz}>{tz}</option>)}
            </select>
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">To Timezone</label>
            <select value={toZone} onChange={(e) => setToZone(e.target.value)} className="w-full px-4 py-3 glass border border-slate-200 dark:border-slate-700 rounded-xl focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 text-slate-900 dark:text-white">
              {timezones.map((tz) => <option key={tz} value={tz}>{tz}</option>)}
            </select>
          </div>
        </div>
      </div>

      <div className="glass rounded-3xl p-6 border border-slate-200 dark:border-slate-700 shadow-lg">
        <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">
          🕐 Converted Time
        </h3>
        <p className="text-4xl font-semibold">
          {time}
        </p>
        <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">{toZone}</p>
      </div>
    </div>
  )
}
