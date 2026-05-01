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
      <div className="glass rounded-2xl p-8 border border-slate-200 dark:border-slate-700 shadow-lg">
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
                    ? 'bg-slate-900 text-white shadow-sm dark:bg-sky-600'
                    : 'glass border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-sky-500/50'
                }`}
              >
                X is what % of Y
              </button>
              <button
                onClick={() => setMode('increase')}
                className={`px-4 py-3 rounded-xl font-bold transition-all text-sm ${
                  mode === 'increase'
                    ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg shadow-emerald-500/50'
                    : 'glass border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-emerald-500/50'
                }`}
              >
                % Increase
              </button>
              <button
                onClick={() => setMode('decrease')}
                className={`px-4 py-3 rounded-xl font-bold transition-all text-sm ${
                  mode === 'decrease'
                    ? 'bg-gradient-to-r from-orange-500 to-red-600 text-white shadow-lg shadow-orange-500/50'
                    : 'glass border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-orange-500/50'
                }`}
              >
                % Decrease
              </button>
              <button
                onClick={() => setMode('percentageOf')}
                className={`px-4 py-3 rounded-xl font-bold transition-all text-sm ${
                  mode === 'percentageOf'
                    ? 'bg-gradient-to-r from-purple-500 to-pink-600 text-white shadow-lg shadow-purple-500/50'
                    : 'glass border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-purple-500/50'
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
              className="w-full px-5 py-4 glass border border-slate-200 dark:border-slate-700 rounded-xl focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 text-slate-900 dark:text-white transition-all font-semibold text-lg"
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
              className="w-full px-5 py-4 glass border border-slate-200 dark:border-slate-700 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 text-slate-900 dark:text-white transition-all font-semibold text-lg"
            />
          </div>

          <div className="flex gap-3">
            <button
              onClick={calculate}
              className="flex-1 px-6 py-4 bg-slate-900 hover:bg-slate-800 dark:bg-sky-600 dark:hover:bg-sky-500 text-white font-bold rounded-xl shadow-lg hover:shadow-2xl hover:shadow-cyan-500/20 transition-all"
            >
              ⚡ Calculate
            </button>
            <button
              onClick={handleClear}
              className="px-6 py-4 glass border border-slate-200 dark:border-slate-700 hover:border-red-500/50 text-slate-700 dark:text-slate-300 font-bold rounded-xl transition-all"
            >
              <RefreshCw className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {result && (
        <div className="glass rounded-2xl p-8 border border-slate-200 dark:border-slate-700 shadow-lg animate-slide-up text-center bg-slate-50 dark:bg-slate-800/50">
          <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-6">
            🎯 Result
          </h3>
          <div className="text-7xl font-semibold mb-2">
            {result}%
          </div>
        </div>
      )}
    </div>
  )
}
