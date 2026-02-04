'use client'

import { useState } from 'react'
import { RefreshCw } from 'lucide-react'

export default function PercentageCalculator() {
  const [mode, setMode] = useState<'basic' | 'increase' | 'decrease' | 'percentageOf'>('basic')
  const [value1, setValue1] = useState('')
  const [value2, setValue2] = useState('')
  const [result, setResult] = useState('')

  const calculate = () => {
    const v1 = parseFloat(value1)
    const v2 = parseFloat(value2)

    if (isNaN(v1) || isNaN(v2)) {
      setResult('')
      return
    }

    let calculated = 0
    if (mode === 'basic') {
      calculated = (v1 / v2) * 100
    } else if (mode === 'increase') {
      calculated = ((v2 - v1) / v1) * 100
    } else if (mode === 'decrease') {
      calculated = ((v1 - v2) / v1) * 100
    } else {
      calculated = (v1 * v2) / 100
    }

    setResult(calculated.toFixed(2))
  }

  const handleClear = () => {
    setValue1('')
    setValue2('')
    setResult('')
  }

  return (
    <div className="space-y-6">
      <div className="glass rounded-2xl p-8 border border-white/10 shadow-lg">
        <div className="space-y-5">
          <div>
            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-3">
              🧮 Calculation Type
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setMode('basic')}
                className={`px-4 py-3 rounded-xl font-bold transition-all text-sm ${
                  mode === 'basic'
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/50'
                    : 'glass border border-white/10 text-slate-700 dark:text-slate-300 hover:border-cyan-500/50'
                }`}
              >
                X is what % of Y
              </button>
              <button
                onClick={() => setMode('increase')}
                className={`px-4 py-3 rounded-xl font-bold transition-all text-sm ${
                  mode === 'increase'
                    ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg shadow-emerald-500/50'
                    : 'glass border border-white/10 text-slate-700 dark:text-slate-300 hover:border-emerald-500/50'
                }`}
              >
                % Increase
              </button>
              <button
                onClick={() => setMode('decrease')}
                className={`px-4 py-3 rounded-xl font-bold transition-all text-sm ${
                  mode === 'decrease'
                    ? 'bg-gradient-to-r from-orange-500 to-red-600 text-white shadow-lg shadow-orange-500/50'
                    : 'glass border border-white/10 text-slate-700 dark:text-slate-300 hover:border-orange-500/50'
                }`}
              >
                % Decrease
              </button>
              <button
                onClick={() => setMode('percentageOf')}
                className={`px-4 py-3 rounded-xl font-bold transition-all text-sm ${
                  mode === 'percentageOf'
                    ? 'bg-gradient-to-r from-purple-500 to-pink-600 text-white shadow-lg shadow-purple-500/50'
                    : 'glass border border-white/10 text-slate-700 dark:text-slate-300 hover:border-purple-500/50'
                }`}
              >
                X% of Y
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-3">
              {mode === 'basic' ? '🔢 Value 1 (X)' : mode === 'percentageOf' ? '📊 Percentage (%)' : '📈 Original Value'}
            </label>
            <input
              type="number"
              value={value1}
              onChange={(e) => setValue1(e.target.value)}
              onKeyUp={calculate}
              placeholder="Enter value..."
              className="w-full px-5 py-4 glass border border-white/10 rounded-xl focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 text-slate-900 dark:text-white transition-all font-semibold text-lg"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-3">
              {mode === 'basic' ? '🔢 Value 2 (Y)' : mode === 'percentageOf' ? '🎯 Value (Y)' : '📉 New Value'}
            </label>
            <input
              type="number"
              value={value2}
              onChange={(e) => setValue2(e.target.value)}
              onKeyUp={calculate}
              placeholder="Enter value..."
              className="w-full px-5 py-4 glass border border-white/10 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 text-slate-900 dark:text-white transition-all font-semibold text-lg"
            />
          </div>

          <div className="flex gap-3">
            <button
              onClick={calculate}
              className="flex-1 px-6 py-4 bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white font-bold rounded-xl shadow-lg hover:shadow-2xl hover:shadow-cyan-500/20 transition-all"
            >
              ⚡ Calculate
            </button>
            <button
              onClick={handleClear}
              className="px-6 py-4 glass border border-white/10 hover:border-red-500/50 text-slate-700 dark:text-slate-300 font-bold rounded-xl transition-all"
            >
              <RefreshCw className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {result && (
        <div className="glass rounded-2xl p-8 border border-white/10 shadow-lg animate-slide-up text-center bg-gradient-to-br from-cyan-500/5 to-purple-500/5">
          <h3 className="text-xl font-black text-slate-900 dark:text-white mb-6 bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 to-purple-500">
            🎯 Result
          </h3>
          <div className="text-7xl font-black bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 mb-2">
            {result}%
          </div>
        </div>
      )}
    </div>
  )
}
