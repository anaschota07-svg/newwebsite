'use client'

import { useState } from 'react'
import { Copy, RefreshCw } from 'lucide-react'

export default function GradientGenerator() {
  const [gradient, setGradient] = useState({
    color1: '#06b6d4',
    color2: '#8b5cf6',
    direction: 'to right'
  })
  const [copied, setCopied] = useState(false)

  const directions = [
    { value: 'to right', label: '→ Right' },
    { value: 'to left', label: '← Left' },
    { value: 'to bottom', label: '↓ Bottom' },
    { value: 'to top', label: '↑ Top' },
    { value: 'to bottom right', label: '↘ Bottom Right' },
    { value: 'to bottom left', label: '↙ Bottom Left' },
    { value: 'to top right', label: '↗ Top Right' },
    { value: 'to top left', label: '↖ Top Left' },
  ]

  const presets = [
    { name: 'Ocean', color1: '#06b6d4', color2: '#3b82f6' },
    { name: 'Sunset', color1: '#f97316', color2: '#ec4899' },
    { name: 'Forest', color1: '#10b981', color2: '#059669' },
    { name: 'Purple Haze', color1: '#8b5cf6', color2: '#ec4899' },
    { name: 'Fire', color1: '#ef4444', color2: '#f59e0b' },
    { name: 'Night Sky', color1: '#1e293b', color2: '#7c3aed' },
  ]

  const generateRandomGradient = () => {
    const randomColor = () => {
      return '#' + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0')
    }
    setGradient({
      ...gradient,
      color1: randomColor(),
      color2: randomColor()
    })
  }

  const cssCode = `background: linear-gradient(${gradient.direction}, ${gradient.color1}, ${gradient.color2});`

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="space-y-4">
      {/* Preview */}
      <div className="glass rounded-3xl p-6 border border-slate-200 dark:border-slate-700 shadow-lg">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
          🎨 Preview
        </h3>
        <div
          className="w-full h-64 rounded-2xl shadow-xl"
          style={{
            background: `linear-gradient(${gradient.direction}, ${gradient.color1}, ${gradient.color2})`
          }}
        />
      </div>

      {/* Controls */}
      <div className="glass rounded-3xl p-6 border border-slate-200 dark:border-slate-700 shadow-lg">
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                Color 1
              </label>
              <div className="flex gap-2">
                <input
                  type="color"
                  value={gradient.color1}
                  onChange={(e) => setGradient({ ...gradient, color1: e.target.value })}
                  className="h-12 w-16 rounded-xl cursor-pointer border-2 border-slate-200 dark:border-slate-700"
                />
                <input
                  type="text"
                  value={gradient.color1}
                  onChange={(e) => setGradient({ ...gradient, color1: e.target.value })}
                  className="flex-1 px-4 py-3 glass border border-slate-200 dark:border-slate-700 rounded-xl focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 text-slate-900 dark:text-white font-mono"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                Color 2
              </label>
              <div className="flex gap-2">
                <input
                  type="color"
                  value={gradient.color2}
                  onChange={(e) => setGradient({ ...gradient, color2: e.target.value })}
                  className="h-12 w-16 rounded-xl cursor-pointer border-2 border-slate-200 dark:border-slate-700"
                />
                <input
                  type="text"
                  value={gradient.color2}
                  onChange={(e) => setGradient({ ...gradient, color2: e.target.value })}
                  className="flex-1 px-4 py-3 glass border border-slate-200 dark:border-slate-700 rounded-xl focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 text-slate-900 dark:text-white font-mono"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
              Direction
            </label>
            <select
              value={gradient.direction}
              onChange={(e) => setGradient({ ...gradient, direction: e.target.value })}
              className="w-full px-4 py-3 glass border border-slate-200 dark:border-slate-700 rounded-xl focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 text-slate-900 dark:text-white font-bold"
            >
              {directions.map((dir) => (
                <option key={dir.value} value={dir.value}>
                  {dir.label}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={generateRandomGradient}
            className="w-full px-6 py-3 bg-slate-900 hover:bg-slate-800 dark:bg-sky-600 dark:hover:bg-sky-500 text-white font-bold rounded-xl shadow-lg transition-all flex items-center justify-center gap-2"
          >
            <RefreshCw className="h-5 w-5" />
            Random Gradient
          </button>
        </div>
      </div>

      {/* Presets */}
      <div className="glass rounded-3xl p-6 border border-slate-200 dark:border-slate-700 shadow-lg">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
          ✨ Presets
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {presets.map((preset) => (
            <button
              key={preset.name}
              onClick={() => setGradient({ ...gradient, color1: preset.color1, color2: preset.color2 })}
              className="group relative p-4 rounded-xl overflow-hidden border-2 border-slate-200 dark:border-slate-700 hover:border-sky-500/50 transition-all"
              style={{
                background: `linear-gradient(${gradient.direction}, ${preset.color1}, ${preset.color2})`
              }}
            >
              <span className="relative z-10 text-white font-bold text-sm drop-shadow-lg">
                {preset.name}
              </span>
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all" />
            </button>
          ))}
        </div>
      </div>

      {/* CSS Code */}
      <div className="glass rounded-3xl p-6 border border-slate-200 dark:border-slate-700 shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
            📋 CSS Code
          </h3>
          <button
            onClick={() => handleCopy(cssCode)}
            className="px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white text-sm font-bold rounded-xl shadow-md transition-all flex items-center gap-2"
          >
            <Copy className="h-4 w-4" />
            {copied ? '✓ Copied!' : 'Copy'}
          </button>
        </div>
        <div className="p-4 glass rounded-xl border border-slate-200 dark:border-slate-700">
          <code className="text-sm font-mono text-slate-900 dark:text-white">
            {cssCode}
          </code>
        </div>
      </div>

      {/* Tips */}
      <div className="glass rounded-3xl p-6 border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-800/50">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-3">
          💡 Tips
        </h3>
        <ul className="space-y-2 text-sm text-slate-700 dark:text-slate-300">
          <li className="flex items-start gap-2">
            <span className="text-cyan-500 font-bold">✦</span>
            <span>Use gradients for buttons, backgrounds, and hero sections</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-purple-500 font-bold">✦</span>
            <span>Combine with opacity for subtle effects</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-pink-500 font-bold">✦</span>
            <span>Test accessibility with text overlays</span>
          </li>
        </ul>
      </div>
    </div>
  )
}
