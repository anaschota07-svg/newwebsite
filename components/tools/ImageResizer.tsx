'use client'

import { useState } from 'react'
import { Upload, Download } from 'lucide-react'

export default function ImageResizer() {
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 })
  const [maintainRatio, setMaintainRatio] = useState(true)

  return (
    <div className="space-y-4">
      <div className="glass rounded-3xl p-6 border border-white/10 shadow-lg">
        <h3 className="text-lg font-black text-slate-900 dark:text-white mb-4">
          📐 Upload Image
        </h3>
        <div className="border-2 border-dashed border-white/20 rounded-2xl p-12 text-center hover:border-cyan-500/50 transition-all cursor-pointer">
          <Upload className="h-12 w-12 mx-auto mb-4 text-slate-400" />
          <p className="text-slate-600 dark:text-slate-400 font-semibold">
            Click to upload an image
          </p>
        </div>
      </div>

      <div className="glass rounded-3xl p-6 border border-white/10 shadow-lg">
        <h3 className="text-lg font-black text-slate-900 dark:text-white mb-4">
          ⚙️ Resize Options
        </h3>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                Width (px)
              </label>
              <input
                type="number"
                value={dimensions.width}
                onChange={(e) => setDimensions({ ...dimensions, width: parseInt(e.target.value) || 0 })}
                className="w-full px-4 py-3 glass border border-white/10 rounded-xl focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 text-slate-900 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                Height (px)
              </label>
              <input
                type="number"
                value={dimensions.height}
                onChange={(e) => setDimensions({ ...dimensions, height: parseInt(e.target.value) || 0 })}
                className="w-full px-4 py-3 glass border border-white/10 rounded-xl focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 text-slate-900 dark:text-white"
              />
            </div>
          </div>

          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={maintainRatio}
              onChange={(e) => setMaintainRatio(e.target.checked)}
              className="w-5 h-5 rounded border-white/10"
            />
            <span className="text-sm font-bold text-slate-700 dark:text-slate-300">
              Maintain aspect ratio
            </span>
          </label>

          <button className="w-full px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white font-bold rounded-xl shadow-lg transition-all flex items-center justify-center gap-2">
            <Download className="h-5 w-5" />
            Resize & Download
          </button>
        </div>
      </div>
    </div>
  )
}
