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
      <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-gray-200 dark:border-slate-700 shadow-sm transition-colors duration-300">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 transition-colors duration-300">
              Calculation Type
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setMode('basic')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors text-sm ${
                  mode === 'basic'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 dark:bg-slate-900 text-gray-700 dark:text-gray-300'
                }`}
              >
                X is what % of Y
              </button>
              <button
                onClick={() => setMode('increase')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors text-sm ${
                  mode === 'increase'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 dark:bg-slate-900 text-gray-700 dark:text-gray-300'
                }`}
              >
                % Increase
              </button>
              <button
                onClick={() => setMode('decrease')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors text-sm ${
                  mode === 'decrease'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 dark:bg-slate-900 text-gray-700 dark:text-gray-300'
                }`}
              >
                % Decrease
              </button>
              <button
                onClick={() => setMode('percentageOf')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors text-sm ${
                  mode === 'percentageOf'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 dark:bg-slate-900 text-gray-700 dark:text-gray-300'
                }`}
              >
                X% of Y
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 transition-colors duration-300">
              {mode === 'basic' ? 'Value 1 (X)' : mode === 'percentageOf' ? 'Percentage (%)' : 'Original Value'}
            </label>
            <input
              type="number"
              value={value1}
              onChange={(e) => setValue1(e.target.value)}
              onKeyUp={calculate}
              placeholder="Enter value..."
              className="w-full px-4 py-3 bg-gray-50 dark:bg-slate-900 border border-gray-300 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white transition-colors duration-300"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 transition-colors duration-300">
              {mode === 'basic' ? 'Value 2 (Y)' : mode === 'percentageOf' ? 'Value (Y)' : 'New Value'}
            </label>
            <input
              type="number"
              value={value2}
              onChange={(e) => setValue2(e.target.value)}
              onKeyUp={calculate}
              placeholder="Enter value..."
              className="w-full px-4 py-3 bg-gray-50 dark:bg-slate-900 border border-gray-300 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white transition-colors duration-300"
            />
          </div>

          <div className="flex gap-2">
            <button
              onClick={calculate}
              className="flex-1 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
            >
              Calculate
            </button>
            <button
              onClick={handleClear}
              className="px-6 py-3 bg-gray-200 dark:bg-slate-900 hover:bg-gray-300 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 font-semibold rounded-lg transition-colors"
            >
              <RefreshCw className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {result && (
        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-gray-200 dark:border-slate-700 shadow-sm animate-slide-up transition-colors duration-300">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 transition-colors duration-300">Result</h3>
          <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 transition-colors duration-300">
            {result}%
          </div>
        </div>
      )}
    </div>
  )
}
