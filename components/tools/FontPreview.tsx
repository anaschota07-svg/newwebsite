'use client'

import { useState } from 'react'

export default function FontPreview() {
  const [text, setText] = useState('The quick brown fox jumps over the lazy dog')
  const [size, setSize] = useState(24)

  const fonts = [
    'Arial', 'Helvetica', 'Times New Roman', 'Georgia', 'Courier New',
    'Verdana', 'Trebuchet MS', 'Comic Sans MS', 'Impact', 'Palatino'
  ]

  return (
    <div className="space-y-4">
      <div className="glass rounded-3xl p-6 border border-slate-200 dark:border-slate-700 shadow-lg">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
          🔤 Settings
        </h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
              Preview Text
            </label>
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="w-full px-4 py-3 glass border border-slate-200 dark:border-slate-700 rounded-xl focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 text-slate-900 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
              Font Size: {size}px
            </label>
            <input
              type="range"
              min="12"
              max="72"
              value={size}
              onChange={(e) => setSize(parseInt(e.target.value))}
              className="w-full"
            />
          </div>
        </div>
      </div>

      <div className="space-y-3">
        {fonts.map((font) => (
          <div key={font} className="glass rounded-3xl p-6 border border-slate-200 dark:border-slate-700 shadow-lg">
            <p className="text-sm font-bold text-slate-600 dark:text-slate-400 mb-3">
              {font}
            </p>
            <p
              className="text-slate-900 dark:text-white"
              style={{ fontFamily: font, fontSize: `${size}px` }}
            >
              {text}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
