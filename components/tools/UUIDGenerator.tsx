'use client'

import { useState } from 'react'
import { Copy, RefreshCw } from 'lucide-react'

export default function UUIDGenerator() {
  const [uuids, setUuids] = useState<string[]>([])
  const [count, setCount] = useState(1)
  const [copied, setCopied] = useState<number | null>(null)

  const generateUUID = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      const r = (Math.random() * 16) | 0
      const v = c === 'x' ? r : (r & 0x3) | 0x8
      return v.toString(16)
    })
  }

  const handleGenerate = () => {
    const newUUIDs: string[] = []
    for (let i = 0; i < count; i++) {
      newUUIDs.push(generateUUID())
    }
    setUuids(newUUIDs)
  }

  const handleCopy = (uuid: string, index: number) => {
    navigator.clipboard.writeText(uuid)
    setCopied(index)
    setTimeout(() => setCopied(null), 2000)
  }

  const handleCopyAll = () => {
    navigator.clipboard.writeText(uuids.join('\n'))
    setCopied(-1)
    setTimeout(() => setCopied(null), 2000)
  }

  return (
    <div className="space-y-6">
      <div className="glass rounded-2xl p-8 border border-slate-200 dark:border-slate-700 shadow-lg">
        <div className="space-y-5">
          <div>
            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-3">
              🔢 Number of UUIDs to Generate
            </label>
            <input
              type="number"
              min="1"
              max="100"
              value={count}
              onChange={(e) => setCount(Math.max(1, Math.min(100, parseInt(e.target.value) || 1)))}
              className="w-full px-5 py-4 glass border border-slate-200 dark:border-slate-700 rounded-xl focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 text-slate-900 dark:text-white transition-all font-bold text-lg text-center"
            />
          </div>

          <button
            onClick={handleGenerate}
            className="w-full px-6 py-4 bg-slate-900 hover:bg-slate-800 dark:bg-sky-600 dark:hover:bg-sky-500 text-white font-bold rounded-xl shadow-lg hover:shadow-2xl hover:shadow-cyan-500/20 transition-all"
          >
            ⚡ Generate UUIDs
          </button>
        </div>
      </div>

      {uuids.length > 0 && (
        <div className="glass rounded-2xl p-8 border border-slate-200 dark:border-slate-700 shadow-lg animate-slide-up">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-slate-900 dark:text-white">
              ✨ Generated UUIDs ({uuids.length})
            </h3>
            <button
              onClick={handleCopyAll}
              className="inline-flex items-center px-5 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white text-sm font-bold rounded-xl shadow-md hover:shadow-lg transition-all gap-2"
            >
              <Copy className="h-4 w-4" />
              {copied === -1 ? '✓ Copied!' : 'Copy All'}
            </button>
          </div>
          <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
            {uuids.map((uuid, index) => (
              <div
                key={index}
                className="flex items-center justify-between glass border border-slate-200 dark:border-slate-700 rounded-xl p-4 hover:border-sky-500/50 transition-all group"
              >
                <code className="font-mono text-sm font-bold text-slate-900 dark:text-white">{uuid}</code>
                <button
                  onClick={() => handleCopy(uuid, index)}
                  className="ml-4 px-4 py-2 glass border border-slate-200 dark:border-slate-700 hover:border-emerald-500 text-emerald-600 dark:text-emerald-400 text-xs font-bold rounded-xl transition-all group-hover:scale-110"
                >
                  {copied === index ? '✓ Copied!' : 'Copy'}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="glass rounded-2xl p-8 border border-slate-200 dark:border-slate-600 shadow-lg bg-slate-50 dark:bg-slate-800/50">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
          💡 About UUIDs
        </h3>
        <p className="text-sm text-slate-700 dark:text-slate-300 mb-5 leading-relaxed font-semibold">
          UUID (Universally Unique Identifier) is a 128-bit identifier that is unique across time and space. UUIDs are commonly used in databases, distributed systems, and applications where unique identifiers are required.
        </p>
        <ul className="space-y-3 text-sm text-slate-700 dark:text-slate-300">
          <li className="flex items-start gap-3 p-3 glass rounded-xl">
            <span className="text-cyan-500 font-bold">✦</span>
            <span className="font-mono">Format: xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx</span>
          </li>
          <li className="flex items-start gap-3 p-3 glass rounded-xl">
            <span className="text-purple-500 font-bold">✦</span>
            <span>Version 4 (random) UUIDs are generated</span>
          </li>
          <li className="flex items-start gap-3 p-3 glass rounded-xl">
            <span className="text-pink-500 font-bold">✦</span>
            <span>Extremely low probability of collisions</span>
          </li>
        </ul>
      </div>
    </div>
  )
}
