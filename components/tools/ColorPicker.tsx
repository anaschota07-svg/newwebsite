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
      <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-gray-200 dark:border-slate-700 shadow-sm">
        <div className="space-y-6">
          <div className="flex flex-col items-center">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-4 transition-colors duration-300">
              Pick a Color
            </label>
            <input
              type="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className="w-full h-48 rounded-lg cursor-pointer border-4 border-gray-200 dark:border-slate-700 transition-colors duration-300"
            />
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-slate-900 rounded-lg transition-colors duration-300">
              <div>
                <span className="text-xs text-gray-500 dark:text-gray-400 transition-colors duration-300">HEX</span>
                <div className="font-mono text-lg text-gray-900 dark:text-white transition-colors duration-300">{color.toUpperCase()}</div>
              </div>
              <button
                onClick={() => copyToClipboard(color)}
                className="p-2 hover:bg-gray-200 dark:hover:bg-slate-800 rounded-lg transition-colors"
              >
                <Copy className="h-5 w-5 text-gray-600 dark:text-gray-400" />
              </button>
            </div>

            {rgb && (
              <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-slate-900 rounded-lg transition-colors duration-300">
                <div>
                  <span className="text-xs text-gray-500 dark:text-gray-400 transition-colors duration-300">RGB</span>
                  <div className="font-mono text-lg text-gray-900 dark:text-white transition-colors duration-300">
                    rgb({rgb.r}, {rgb.g}, {rgb.b})
                  </div>
                </div>
                <button
                  onClick={() => copyToClipboard(`rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`)}
                  className="p-2 hover:bg-gray-200 dark:hover:bg-slate-800 rounded-lg transition-colors"
                >
                  <Copy className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                </button>
              </div>
            )}

            {hsl && (
              <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-slate-900 rounded-lg transition-colors duration-300">
                <div>
                  <span className="text-xs text-gray-500 dark:text-gray-400 transition-colors duration-300">HSL</span>
                  <div className="font-mono text-lg text-gray-900 dark:text-white transition-colors duration-300">
                    hsl({hsl.h}, {hsl.s}%, {hsl.l}%)
                  </div>
                </div>
                <button
                  onClick={() => copyToClipboard(`hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`)}
                  className="p-2 hover:bg-gray-200 dark:hover:bg-slate-800 rounded-lg transition-colors"
                >
                  <Copy className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-gray-200 dark:border-slate-700 shadow-sm transition-colors duration-300">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 transition-colors duration-300">Color Palette</h3>
        <div className="grid grid-cols-5 gap-2">
          {colorShades.map((shade) => {
            const shadeColor = adjustColor(color, shade.factor)
            return (
              <button
                key={shade.name}
                onClick={() => setColor(shadeColor)}
                className="group relative aspect-square rounded-lg overflow-hidden border-2 border-gray-200 dark:border-slate-700 hover:border-blue-500 dark:hover:border-blue-400 transition-colors"
                style={{ backgroundColor: shadeColor }}
              >
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-opacity flex items-end justify-center pb-2">
                  <span className="text-xs font-medium text-white opacity-0 group-hover:opacity-100 transition-opacity">
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
