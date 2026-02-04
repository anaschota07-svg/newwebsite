'use client'

import { useState } from 'react'
import { Copy } from 'lucide-react'

export default function BoxShadowGenerator() {
  const [shadow, setShadow] = useState({
    h: 0,
    v: 8,
    blur: 16,
    spread: 0,
    color: '#000000',
    opacity: 15
  })
  const [copied, setCopied] = useState(false)

  const shadowCSS = `box-shadow: ${shadow.h}px ${shadow.v}px ${shadow.blur}px ${shadow.spread}px rgba(0, 0, 0, ${shadow.opacity / 100});`

  const handleCopy = () => {
    navigator.clipboard.writeText(shadowCSS)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="space-y-4">
      <div className="glass rounded-3xl p-6 border border-white/10 shadow-lg">
        <h3 className="text-lg font-black text-slate-900 dark:text-white mb-4">
          👁️ Preview
        </h3>
        <div className="flex items-center justify-center p-12 bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900 rounded-2xl">
          <div
            className="w-48 h-48 bg-white dark:bg-slate-700 rounded-2xl"
            style={{
              boxShadow: `${shadow.h}px ${shadow.v}px ${shadow.blur}px ${shadow.spread}px rgba(0, 0, 0, ${shadow.opacity / 100})`
            }}
          />
        </div>
      </div>

      <div className="glass rounded-3xl p-6 border border-white/10 shadow-lg">
        <div className="space-y-4">
          {[
            { label: 'Horizontal Offset', key: 'h', min: -50, max: 50 },
            { label: 'Vertical Offset', key: 'v', min: -50, max: 50 },
            { label: 'Blur Radius', key: 'blur', min: 0, max: 100 },
            { label: 'Spread Radius', key: 'spread', min: -50, max: 50 },
            { label: 'Opacity', key: 'opacity', min: 0, max: 100 },
          ].map((control) => (
            <div key={control.key}>
              <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                {control.label}: {shadow[control.key as keyof typeof shadow]}{control.key === 'opacity' ? '%' : 'px'}
              </label>
              <input
                type="range"
                min={control.min}
                max={control.max}
                value={shadow[control.key as keyof typeof shadow]}
                onChange={(e) => setShadow({ ...shadow, [control.key]: parseInt(e.target.value) })}
                className="w-full"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="glass rounded-3xl p-6 border border-white/10 shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-black text-slate-900 dark:text-white">
            📋 CSS Code
          </h3>
          <button
            onClick={handleCopy}
            className="px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-600 text-white text-sm font-bold rounded-xl flex items-center gap-2"
          >
            <Copy className="h-4 w-4" />
            {copied ? '✓ Copied!' : 'Copy'}
          </button>
        </div>
        <div className="p-4 glass rounded-xl border border-white/10">
          <code className="text-sm font-mono text-slate-900 dark:text-white">
            {shadowCSS}
          </code>
        </div>
      </div>
    </div>
  )
}
