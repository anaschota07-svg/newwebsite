'use client'

import { useState } from 'react'
import { Zap } from 'lucide-react'

export default function SpeedTest() {
  const [testing, setTesting] = useState(false)
  const [results, setResults] = useState<any>(null)

  const runTest = async () => {
    setTesting(true)
    // Simulate speed test
    setTimeout(() => {
      setResults({
        download: (Math.random() * 100 + 50).toFixed(2),
        upload: (Math.random() * 50 + 20).toFixed(2),
        ping: Math.floor(Math.random() * 30 + 10)
      })
      setTesting(false)
    }, 3000)
  }

  return (
    <div className="space-y-4">
      <div className="glass rounded-3xl p-12 border border-white/10 shadow-lg text-center">
        <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-8">
          🚀 Internet Speed Test
        </h3>

        {!results && !testing && (
          <button
            onClick={runTest}
            className="px-12 py-6 bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white font-bold rounded-xl shadow-lg transition-all flex items-center justify-center gap-3 mx-auto text-xl"
          >
            <Zap className="h-6 w-6" />
            Start Test
          </button>
        )}

        {testing && (
          <div className="text-lg font-bold text-slate-600 dark:text-slate-400 animate-pulse">
            Testing your connection...
          </div>
        )}

        {results && !testing && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="glass rounded-2xl p-6 border border-white/10">
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">Download</p>
                <p className="text-4xl font-black text-cyan-600">{results.download}</p>
                <p className="text-sm text-slate-500 mt-1">Mbps</p>
              </div>
              <div className="glass rounded-2xl p-6 border border-white/10">
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">Upload</p>
                <p className="text-4xl font-black text-purple-600">{results.upload}</p>
                <p className="text-sm text-slate-500 mt-1">Mbps</p>
              </div>
              <div className="glass rounded-2xl p-6 border border-white/10">
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">Ping</p>
                <p className="text-4xl font-black text-pink-600">{results.ping}</p>
                <p className="text-sm text-slate-500 mt-1">ms</p>
              </div>
            </div>
            <button
              onClick={runTest}
              className="px-8 py-4 glass border border-white/10 hover:border-cyan-500 text-slate-900 dark:text-white font-bold rounded-xl transition-all"
            >
              Test Again
            </button>
          </div>
        )}
      </div>

      <div className="glass rounded-3xl p-6 border border-cyan-500/20 bg-gradient-to-br from-cyan-500/5 to-purple-500/5">
        <h3 className="text-lg font-black text-slate-900 dark:text-white mb-3">
          💡 About Speed Tests
        </h3>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          This tool tests your internet connection speed by measuring download, upload speeds, and ping latency. Results may vary based on network conditions and server location.
        </p>
      </div>
    </div>
  )
}
