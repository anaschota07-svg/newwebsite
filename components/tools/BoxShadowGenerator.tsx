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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 dark:from-slate-950 dark:via-blue-950 dark:to-purple-950 p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-black bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
            Box Shadow Generator
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            Create beautiful shadows with live preview
          </p>
        </div>

        {/* Preview Section */}
        <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-3xl p-8 border border-slate-200 dark:border-slate-700 shadow-xl">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-2 h-8 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full" />
            <h3 className="text-xl font-black text-slate-900 dark:text-white">
              Preview
            </h3>
          </div>
          
          {/* Grid background for better shadow visibility */}
          <div 
            className="relative flex items-center justify-center p-16 rounded-2xl overflow-hidden"
            style={{
              background: 'linear-gradient(90deg, #f8fafc 1px, transparent 1px), linear-gradient(#f8fafc 1px, transparent 1px)',
              backgroundSize: '20px 20px',
            }}
          >
            {/* Gradient overlay for depth */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-purple-50/50 dark:from-blue-950/30 dark:to-purple-950/30" />
            
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

        {/* Controls Section */}
        <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-3xl p-8 border border-slate-200 dark:border-slate-700 shadow-xl">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-2 h-8 bg-gradient-to-b from-emerald-500 to-teal-500 rounded-full" />
            <h3 className="text-xl font-black text-slate-900 dark:text-white">
              Controls
            </h3>
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
                  <label className="text-sm font-bold text-slate-700 dark:text-slate-300">
                    {control.label}
                  </label>
                  <span className={`text-lg font-black bg-gradient-to-r ${control.color} bg-clip-text text-transparent`}>
                    {shadow[control.key as keyof typeof shadow]}{control.key === 'opacity' ? '%' : 'px'}
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

        {/* CSS Output Section */}
        <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-3xl p-8 border border-slate-200 dark:border-slate-700 shadow-xl">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <div className="w-2 h-8 bg-gradient-to-b from-pink-500 to-rose-500 rounded-full" />
              <h3 className="text-xl font-black text-slate-900 dark:text-white">
                CSS Code
              </h3>
            </div>
            <button
              onClick={handleCopy}
              className="group relative px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold rounded-xl flex items-center gap-2 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
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
    </div>
  )
}