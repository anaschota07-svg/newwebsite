'use client'

import { useState } from 'react'
import { Download } from 'lucide-react'
import { QRCodeSVG } from 'qrcode.react'

export default function QRCodeGenerator() {
  const [text, setText] = useState('')
  const [size, setSize] = useState(256)

  const downloadQRCode = () => {
    if (!text) return
    
    const svg = document.getElementById('qrcode-svg')
    if (!svg) return

    const svgData = new XMLSerializer().serializeToString(svg)
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    const img = new Image()

    img.onload = () => {
      canvas.width = size
      canvas.height = size
      ctx?.drawImage(img, 0, 0)
      canvas.toBlob((blob) => {
        if (blob) {
          const url = URL.createObjectURL(blob)
          const link = document.createElement('a')
          link.href = url
          link.download = 'qrcode.png'
          link.click()
          URL.revokeObjectURL(url)
        }
      })
    }

    img.src = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgData)))
  }

  return (
    <div className="space-y-6">
      <div className="glass rounded-2xl p-8 border border-slate-200 dark:border-slate-700 shadow-lg">
        <div className="space-y-5">
          <div>
            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-3">
              📝 Enter Text or URL
            </label>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Enter text, URL, or contact information..."
              rows={4}
              className="w-full px-5 py-4 glass border border-slate-200 dark:border-slate-700 rounded-xl focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 text-slate-900 dark:text-white resize-none transition-all font-semibold"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-3">
              📐 QR Code Size: {size}px
            </label>
            <input
              type="range"
              min="128"
              max="512"
              step="32"
              value={size}
              onChange={(e) => setSize(Number(e.target.value))}
              className="w-full h-3 glass rounded-full appearance-none cursor-pointer accent-cyan-500"
            />
            <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400 mt-2 font-bold">
              <span>128px</span>
              <span>512px</span>
            </div>
          </div>
        </div>
      </div>

      {text && (
        <div className="glass rounded-2xl p-8 border border-slate-200 dark:border-slate-700 shadow-lg text-center animate-slide-up">
          <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-6">
            ✨ Your QR Code
          </h3>
          <div className="flex justify-center mb-6 p-6 glass rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900">
            <QRCodeSVG
              id="qrcode-svg"
              value={text}
              size={size}
              level="H"
              includeMargin={true}
            />
          </div>
          <button
            onClick={downloadQRCode}
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-bold rounded-xl shadow-lg hover:shadow-2xl hover:shadow-emerald-500/20 transition-all gap-3"
          >
            <Download className="h-5 w-5" />
            Download QR Code
          </button>
        </div>
      )}

      <div className="glass rounded-2xl p-8 border border-slate-200 dark:border-slate-600 shadow-lg bg-slate-50 dark:bg-slate-800/50">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
          🎯 QR Code Uses
        </h3>
        <ul className="space-y-3 text-sm text-slate-700 dark:text-slate-300">
          <li className="flex items-start gap-3 p-3 glass rounded-xl">
            <span className="text-cyan-500 font-bold">✦</span>
            <span>Share website URLs quickly</span>
          </li>
          <li className="flex items-start gap-3 p-3 glass rounded-xl">
            <span className="text-blue-500 font-bold">✦</span>
            <span>Add contact information to business cards</span>
          </li>
          <li className="flex items-start gap-3 p-3 glass rounded-xl">
            <span className="text-purple-500 font-bold">✦</span>
            <span>Create WiFi connection codes</span>
          </li>
          <li className="flex items-start gap-3 p-3 glass rounded-xl">
            <span className="text-pink-500 font-bold">✦</span>
            <span>Generate payment links</span>
          </li>
        </ul>
      </div>
    </div>
  )
}
