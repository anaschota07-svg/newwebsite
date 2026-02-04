'use client'

import { useState } from 'react'
import { Upload, Download } from 'lucide-react'

export default function ImageCompressor() {
  const [image, setImage] = useState<string | null>(null)
  const [quality, setQuality] = useState(80)

  return (
    <div className="space-y-4">
      <div className="glass rounded-3xl p-6 border border-white/10 shadow-lg">
        <h3 className="text-lg font-black text-slate-900 dark:text-white mb-4">
          🖼️ Upload Image
        </h3>
        <div className="border-2 border-dashed border-white/20 rounded-2xl p-12 text-center hover:border-cyan-500/50 transition-all cursor-pointer">
          <Upload className="h-12 w-12 mx-auto mb-4 text-slate-400" />
          <p className="text-slate-600 dark:text-slate-400 font-semibold">
            Click to upload or drag and drop
          </p>
          <p className="text-sm text-slate-500 dark:text-slate-500 mt-2">
            Supports JPEG, PNG, WebP (Max 10MB)
          </p>
        </div>
      </div>

      <div className="glass rounded-3xl p-6 border border-white/10 shadow-lg">
        <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
          Compression Quality: {quality}%
        </label>
        <input
          type="range"
          min="1"
          max="100"
          value={quality}
          onChange={(e) => setQuality(parseInt(e.target.value))}
          className="w-full"
        />
      </div>

      <div className="glass rounded-3xl p-6 border border-cyan-500/20 bg-gradient-to-br from-cyan-500/5 to-purple-500/5">
        <h3 className="text-lg font-black text-slate-900 dark:text-white mb-3">
          💡 About Compression
        </h3>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          Reduce image file size without significant quality loss. Lower quality values create smaller files but may reduce image clarity.
        </p>
      </div>
    </div>
  )
}
