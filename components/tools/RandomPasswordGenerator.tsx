'use client'

import { useState } from 'react'
import { Copy, RefreshCw } from 'lucide-react'

export default function RandomPasswordGenerator() {
  const [passwords, setPasswords] = useState<string[]>([])
  const [count, setCount] = useState(5)
  const [length, setLength] = useState(16)
  const [copied, setCopied] = useState<number | null>(null)

  const generate = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*'
    const newPasswords = Array.from({ length: count }, () =>
      Array.from({ length }, () => chars[Math.floor(Math.random() * chars.length)]).join('')
    )
    setPasswords(newPasswords)
  }

  const handleCopy = (password: string, index: number) => {
    navigator.clipboard.writeText(password)
    setCopied(index)
    setTimeout(() => setCopied(null), 2000)
  }

  return (
    <div className="space-y-4">
      <div className="glass rounded-3xl p-6 border border-white/10 shadow-lg">
        <h3 className="text-lg font-black text-slate-900 dark:text-white mb-4">
          🔒 Settings
        </h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Number of Passwords</label>
            <input type="number" min="1" max="20" value={count} onChange={(e) => setCount(parseInt(e.target.value) || 1)} className="w-full px-4 py-3 glass border border-white/10 rounded-xl focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 text-slate-900 dark:text-white" />
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Password Length</label>
            <input type="number" min="8" max="64" value={length} onChange={(e) => setLength(parseInt(e.target.value) || 8)} className="w-full px-4 py-3 glass border border-white/10 rounded-xl focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 text-slate-900 dark:text-white" />
          </div>

          <button onClick={generate} className="w-full px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white font-bold rounded-xl shadow-lg transition-all flex items-center justify-center gap-2">
            <RefreshCw className="h-5 w-5" />
            Generate Passwords
          </button>
        </div>
      </div>

      {passwords.length > 0 && (
        <div className="glass rounded-3xl p-6 border border-white/10 shadow-lg animate-slide-up">
          <h3 className="text-xl font-black text-slate-900 dark:text-white mb-4">
            ✨ Generated Passwords
          </h3>
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {passwords.map((password, index) => (
              <div key={index} className="flex items-center justify-between glass border border-white/10 rounded-xl p-4 hover:border-cyan-500/50 transition-all">
                <code className="font-mono text-sm font-bold text-slate-900 dark:text-white">{password}</code>
                <button onClick={() => handleCopy(password, index)} className="ml-4 px-4 py-2 glass border border-white/10 hover:border-emerald-500 text-emerald-600 dark:text-emerald-400 text-xs font-bold rounded-xl transition-all">
                  {copied === index ? '✓ Copied!' : 'Copy'}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
