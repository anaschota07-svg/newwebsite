'use client'

import { useState } from 'react'
import { Copy, Check } from 'lucide-react'

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
    <div className="mx-auto max-w-4xl space-y-6">
      <p className="sr-only">Adjust shadow values and copy the generated CSS.</p>

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900 sm:p-8">
          <div className="mb-6 flex items-center gap-2">
            <div className="h-8 w-2 rounded-full bg-sky-500" />
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Preview</h3>
          </div>
          
          {/* Grid background for better shadow visibility */}
          <div 
            className="relative flex items-center justify-center p-16 rounded-2xl overflow-hidden"
            style={{
              background: 'linear-gradient(90deg, #f8fafc 1px, transparent 1px), linear-gradient(#f8fafc 1px, transparent 1px)',
              backgroundSize: '20px 20px',
            }}
          >
            <div className="pointer-events-none absolute inset-0 bg-slate-50/60 dark:bg-slate-950/30" />
            
            {/* Preview Box */}
            <div
              className="relative w-56 h-56 bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-900 rounded-2xl border border-slate-200 dark:border-slate-700 transition-all duration-300"
              style={{
                boxShadow: `${shadow.h}px ${shadow.v}px ${shadow.blur}px ${shadow.spread}px rgba(0, 0, 0, ${shadow.opacity / 100})`
              }}
            >
              {/* Inner decoration */}
              <div className="absolute inset-4 border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-xl" />
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900 sm:p-8">
          <div className="mb-6 flex items-center gap-2">
            <div className="h-8 w-2 rounded-full bg-slate-400 dark:bg-slate-500" />
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Controls</h3>
          </div>
          
          <div className="space-y-6">
            {[
              { label: 'Horizontal Offset', key: 'h', min: -50, max: 50, color: 'from-red-500 to-orange-500' },
              { label: 'Vertical Offset', key: 'v', min: -50, max: 50, color: 'from-amber-500 to-yellow-500' },
              { label: 'Blur Radius', key: 'blur', min: 0, max: 100, color: 'from-blue-500 to-cyan-500' },
              { label: 'Spread Radius', key: 'spread', min: -50, max: 50, color: 'from-purple-500 to-pink-500' },
              { label: 'Opacity', key: 'opacity', min: 0, max: 100, color: 'from-emerald-500 to-teal-500' },
            ].map((control) => (
              <div key={control.key} className="group">
                <div className="flex items-center justify-between mb-3">
                  <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                    {control.label}
                  </label>
                  <span className="text-lg font-semibold tabular-nums text-sky-700 dark:text-sky-300">
                    {shadow[control.key as keyof typeof shadow]}
                    {control.key === 'opacity' ? '%' : 'px'}
                  </span>
                </div>
                
                {/* Custom styled range input */}
                <div className="relative">
                  <input
                    type="range"
                    min={control.min}
                    max={control.max}
                    value={shadow[control.key as keyof typeof shadow]}
                    onChange={(e) => setShadow({ ...shadow, [control.key]: parseInt(e.target.value) })}
                    className="w-full h-3 bg-slate-200 dark:bg-slate-700 rounded-full appearance-none cursor-pointer
                      [&::-webkit-slider-thumb]:appearance-none 
                      [&::-webkit-slider-thumb]:w-6 
                      [&::-webkit-slider-thumb]:h-6 
                      [&::-webkit-slider-thumb]:rounded-full 
                      [&::-webkit-slider-thumb]:bg-white
                      [&::-webkit-slider-thumb]:shadow-lg
                      [&::-webkit-slider-thumb]:border-2
                      [&::-webkit-slider-thumb]:border-slate-300
                      [&::-webkit-slider-thumb]:cursor-pointer
                      [&::-webkit-slider-thumb]:transition-all
                      [&::-webkit-slider-thumb]:hover:scale-110
                      [&::-moz-range-thumb]:w-6 
                      [&::-moz-range-thumb]:h-6 
                      [&::-moz-range-thumb]:rounded-full 
                      [&::-moz-range-thumb]:bg-white
                      [&::-moz-range-thumb]:shadow-lg
                      [&::-moz-range-thumb]:border-2
                      [&::-moz-range-thumb]:border-slate-300
                      [&::-moz-range-thumb]:cursor-pointer
                      [&::-moz-range-thumb]:transition-all
                      [&::-moz-range-thumb]:hover:scale-110"
                    style={{
                      background: `linear-gradient(to right, 
                        rgb(${control.color.includes('red') ? '239, 68, 68' : 
                             control.color.includes('amber') ? '245, 158, 11' : 
                             control.color.includes('blue') ? '59, 130, 246' : 
                             control.color.includes('purple') ? '168, 85, 247' : 
                             '16, 185, 129'}) 0%, 
                        rgb(${control.color.includes('orange') ? '249, 115, 22' : 
                             control.color.includes('yellow') ? '234, 179, 8' : 
                             control.color.includes('cyan') ? '6, 182, 212' : 
                             control.color.includes('pink') ? '236, 72, 153' : 
                             '20, 184, 166'}) ${((shadow[control.key as keyof typeof shadow] as number - control.min) / (control.max - control.min)) * 100}%, 
                        rgb(226, 232, 240) ${((shadow[control.key as keyof typeof shadow] as number - control.min) / (control.max - control.min)) * 100}%)`
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900 sm:p-8">
          <div className="mb-6 flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="h-8 w-2 rounded-full bg-sky-500" />
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white">CSS</h3>
            </div>
            <button
              type="button"
              onClick={handleCopy}
              className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-slate-800 dark:bg-sky-600 dark:hover:bg-sky-500"
            >
              {copied ? (
                <>
                  <Check className="h-5 w-5" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="h-5 w-5" />
                  Copy Code
                </>
              )}
            </button>
          </div>
          
          <div className="relative p-6 bg-slate-900 dark:bg-slate-950 rounded-2xl border border-slate-700 overflow-hidden">
            {/* Code decoration */}
            <div className="absolute top-4 right-4 flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
            </div>
            
            <code className="text-sm md:text-base font-mono text-emerald-400 block pr-20">
              {shadowCSS}
            </code>
          </div>
        </div>
    </div>
  )
}