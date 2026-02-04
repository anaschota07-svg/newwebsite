'use client'

import { useState } from 'react'
import { Copy } from 'lucide-react'

export default function ColorPicker() {
  const [color, setColor] = useState('#3b82f6')

  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16),
        }
      : null
  }

  const hexToHsl = (hex: string) => {
    const rgb = hexToRgb(hex)
    if (!rgb) return null

    const r = rgb.r / 255
    const g = rgb.g / 255
    const b = rgb.b / 255

    const max = Math.max(r, g, b)
    const min = Math.min(r, g, b)
    let h = 0
    let s = 0
    const l = (max + min) / 2

    if (max !== min) {
      const d = max - min
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min)

      switch (max) {
        case r:
          h = ((g - b) / d + (g < b ? 6 : 0)) / 6
          break
        case g:
          h = ((b - r) / d + 2) / 6
          break
        case b:
          h = ((r - g) / d + 4) / 6
          break
      }
    }

    return {
      h: Math.round(h * 360),
      s: Math.round(s * 100),
      l: Math.round(l * 100),
    }
  }

  const rgb = hexToRgb(color)
  const hsl = hexToHsl(color)

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  const colorShades = [
    { name: 'Lighter', factor: 1.3 },
    { name: 'Light', factor: 1.15 },
    { name: 'Base', factor: 1 },
    { name: 'Dark', factor: 0.85 },
    { name: 'Darker', factor: 0.7 },
  ]

  const adjustColor = (hex: string, factor: number) => {
    const rgb = hexToRgb(hex)
    if (!rgb) return hex

    const adjust = (value: number) => Math.min(255, Math.max(0, Math.round(value * factor)))

    const r = adjust(rgb.r).toString(16).padStart(2, '0')
    const g = adjust(rgb.g).toString(16).padStart(2, '0')
    const b = adjust(rgb.b).toString(16).padStart(2, '0')

    return `#${r}${g}${b}`
  }

  return (
    <div className="space-y-6">
      <div className="glass rounded-2xl p-8 border border-white/10 shadow-lg">
        <div className="space-y-8">
          <div className="flex flex-col items-center">
            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-5">
              🎨 Pick a Color
            </label>
            <div className="relative w-full">
              <input
                type="color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                className="w-full h-64 rounded-2xl cursor-pointer border-4 border-white/20 shadow-2xl hover:scale-102 transition-transform"
              />
              <div 
                className="absolute -top-2 -right-2 w-16 h-16 rounded-full border-4 border-white dark:border-slate-800 shadow-xl"
                style={{ backgroundColor: color }}
              />
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between p-4 glass border border-white/10 rounded-xl group hover:border-cyan-500/50 transition-all">
              <div>
                <span className="text-xs font-bold text-slate-500 dark:text-slate-400">HEX</span>
                <div className="font-mono text-xl font-bold text-slate-900 dark:text-white">{color.toUpperCase()}</div>
              </div>
              <button
                onClick={() => copyToClipboard(color)}
                className="p-3 glass border border-white/10 hover:border-cyan-500 rounded-xl transition-all group-hover:scale-110"
              >
                <Copy className="h-5 w-5 text-cyan-500" />
              </button>
            </div>

            {rgb && (
              <div className="flex items-center justify-between p-4 glass border border-white/10 rounded-xl group hover:border-blue-500/50 transition-all">
                <div>
                  <span className="text-xs font-bold text-slate-500 dark:text-slate-400">RGB</span>
                  <div className="font-mono text-xl font-bold text-slate-900 dark:text-white">
                    rgb({rgb.r}, {rgb.g}, {rgb.b})
                  </div>
                </div>
                <button
                  onClick={() => copyToClipboard(`rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`)}
                  className="p-3 glass border border-white/10 hover:border-blue-500 rounded-xl transition-all group-hover:scale-110"
                >
                  <Copy className="h-5 w-5 text-blue-500" />
                </button>
              </div>
            )}

            {hsl && (
              <div className="flex items-center justify-between p-4 glass border border-white/10 rounded-xl group hover:border-purple-500/50 transition-all">
                <div>
                  <span className="text-xs font-bold text-slate-500 dark:text-slate-400">HSL</span>
                  <div className="font-mono text-xl font-bold text-slate-900 dark:text-white">
                    hsl({hsl.h}, {hsl.s}%, {hsl.l}%)
                  </div>
                </div>
                <button
                  onClick={() => copyToClipboard(`hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`)}
                  className="p-3 glass border border-white/10 hover:border-purple-500 rounded-xl transition-all group-hover:scale-110"
                >
                  <Copy className="h-5 w-5 text-purple-500" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="glass rounded-2xl p-8 border border-white/10 shadow-lg">
        <h3 className="text-lg font-black text-slate-900 dark:text-white mb-6 bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 to-purple-500">
          🌈 Color Palette
        </h3>
        <div className="grid grid-cols-5 gap-3">
          {colorShades.map((shade) => {
            const shadeColor = adjustColor(color, shade.factor)
            return (
              <button
                key={shade.name}
                onClick={() => setColor(shadeColor)}
                className="group relative aspect-square rounded-xl overflow-hidden border-3 border-white/20 hover:border-white/60 hover:scale-110 transition-all shadow-lg hover:shadow-2xl"
                style={{ backgroundColor: shadeColor }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/0 to-black/20 group-hover:from-white/10 group-hover:to-black/30 transition-all flex items-center justify-center">
                  <span className="text-xs font-bold text-white opacity-0 group-hover:opacity-100 transition-opacity drop-shadow-lg">
                    {shade.name}
                  </span>
                </div>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
