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
      <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-gray-200 dark:border-slate-700 shadow-sm transition-colors duration-300">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 transition-colors duration-300">
              Number of UUIDs to Generate
            </label>
            <input
              type="number"
              min="1"
              max="100"
              value={count}
              onChange={(e) => setCount(Math.max(1, Math.min(100, parseInt(e.target.value) || 1)))}
              className="w-full px-4 py-3 bg-gray-50 dark:bg-slate-900 border border-gray-300 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white transition-colors duration-300"
            />
          </div>

          <button
            onClick={handleGenerate}
            className="w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
          >
            Generate UUIDs
          </button>
        </div>
      </div>

      {uuids.length > 0 && (
        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-gray-200 dark:border-slate-700 shadow-sm animate-slide-up transition-colors duration-300">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white transition-colors duration-300">
              Generated UUIDs ({uuids.length})
            </h3>
            <button
              onClick={handleCopyAll}
              className="inline-flex items-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-medium rounded-lg transition-colors gap-2"
            >
              <Copy className="h-4 w-4" />
              {copied === -1 ? 'Copied!' : 'Copy All'}
            </button>
          </div>
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {uuids.map((uuid, index) => (
              <div
                key={index}
                className="flex items-center justify-between bg-gray-50 dark:bg-slate-900 rounded-lg p-3 border border-gray-200 dark:border-slate-700 transition-colors duration-300"
              >
                <code className="font-mono text-sm text-gray-900 dark:text-white transition-colors duration-300">{uuid}</code>
                <button
                  onClick={() => handleCopy(uuid, index)}
                  className="ml-4 px-3 py-1 bg-green-600 hover:bg-green-700 text-white text-xs font-medium rounded transition-colors"
                >
                  {copied === index ? 'Copied!' : 'Copy'}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl p-6 border border-blue-200 dark:border-blue-800 transition-colors duration-300">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 transition-colors duration-300">About UUIDs</h3>
        <p className="text-sm text-gray-700 dark:text-gray-300 mb-3 transition-colors duration-300">
          UUID (Universally Unique Identifier) is a 128-bit identifier that is unique across time and space. UUIDs are commonly used in databases, distributed systems, and applications where unique identifiers are required.
        </p>
        <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300 transition-colors duration-300">
          <li className="flex items-start">
            <span className="text-blue-600 dark:text-blue-400 mr-2">•</span>
            <span>Format: xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx</span>
          </li>
          <li className="flex items-start">
            <span className="text-blue-600 dark:text-blue-400 mr-2">•</span>
            <span>Version 4 (random) UUIDs are generated</span>
          </li>
          <li className="flex items-start">
            <span className="text-blue-600 dark:text-blue-400 mr-2">•</span>
            <span>Extremely low probability of collisions</span>
          </li>
        </ul>
      </div>
    </div>
  )
}
