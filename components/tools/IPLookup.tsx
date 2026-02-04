'use client'

import { useState } from 'react'
import { Search } from 'lucide-react'

export default function IPLookup() {
  const [ip, setIp] = useState('')
  const [info, setInfo] = useState<any>(null)

  const lookup = async () => {
    // Placeholder - in production, this would call an IP lookup API
    setInfo({
      ip: ip,
      country: 'United States',
      city: 'New York',
      isp: 'Example ISP',
      timezone: 'America/New_York'
    })
  }

  return (
    <div className="space-y-4">
      <div className="glass rounded-3xl p-6 border border-white/10 shadow-lg">
        <h3 className="text-lg font-black text-slate-900 dark:text-white mb-4">
          🌐 IP Address
        </h3>
        <div className="flex gap-3">
          <input
            type="text"
            value={ip}
            onChange={(e) => setIp(e.target.value)}
            placeholder="Enter IP address..."
            className="flex-1 px-4 py-3 glass border border-white/10 rounded-xl focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 text-slate-900 dark:text-white font-mono"
          />
          <button
            onClick={lookup}
            className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white font-bold rounded-xl shadow-lg transition-all flex items-center gap-2"
          >
            <Search className="h-5 w-5" />
            Lookup
          </button>
        </div>
      </div>

      {info && (
        <div className="glass rounded-3xl p-6 border border-white/10 shadow-lg animate-slide-up">
          <h3 className="text-xl font-black text-slate-900 dark:text-white mb-4">
            📍 IP Information
          </h3>
          <div className="space-y-3">
            {Object.entries(info).map(([key, value]) => (
              <div key={key} className="flex justify-between p-3 glass rounded-xl border border-white/10">
                <span className="text-sm font-bold text-slate-600 dark:text-slate-400 capitalize">{key}</span>
                <span className="text-sm font-bold text-slate-900 dark:text-white">{value as string}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
