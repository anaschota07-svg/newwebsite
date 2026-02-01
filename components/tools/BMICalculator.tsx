'use client'

import { useState } from 'react'
import { Weight, Ruler } from 'lucide-react'

export default function BMICalculator() {
  const [weight, setWeight] = useState('')
  const [height, setHeight] = useState('')
  const [unit, setUnit] = useState<'metric' | 'imperial'>('metric')
  const [bmi, setBMI] = useState<{
    value: number
    category: string
    color: string
    advice: string
  } | null>(null)

  const calculateBMI = () => {
    if (!weight || !height) return

    let bmiValue: number
    const w = parseFloat(weight)
    const h = parseFloat(height)

    if (unit === 'metric') {
      bmiValue = w / ((h / 100) ** 2)
    } else {
      bmiValue = (w / (h ** 2)) * 703
    }

    let category = ''
    let color = ''
    let advice = ''

    if (bmiValue < 18.5) {
      category = 'Underweight'
      color = 'text-blue-600 dark:text-blue-400'
      advice = 'Consider consulting with a healthcare provider about healthy weight gain strategies.'
    } else if (bmiValue < 25) {
      category = 'Normal Weight'
      color = 'text-green-600 dark:text-green-400'
      advice = 'Great! Maintain your healthy lifestyle with balanced diet and regular exercise.'
    } else if (bmiValue < 30) {
      category = 'Overweight'
      color = 'text-yellow-600 dark:text-yellow-400'
      advice = 'Consider adopting healthier eating habits and increasing physical activity.'
    } else {
      category = 'Obese'
      color = 'text-red-600 dark:text-red-400'
      advice = 'We recommend consulting with a healthcare provider for personalized advice.'
    }

    setBMI({
      value: parseFloat(bmiValue.toFixed(1)),
      category,
      color,
      advice,
    })
  }

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-gray-200 dark:border-slate-700 shadow-sm transition-colors duration-300">
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setUnit('metric')}
            className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
              unit === 'metric'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 dark:bg-slate-900 text-gray-700 dark:text-gray-300'
            }`}
          >
            Metric (kg, cm)
          </button>
          <button
            onClick={() => setUnit('imperial')}
            className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
              unit === 'imperial'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 dark:bg-slate-900 text-gray-700 dark:text-gray-300'
            }`}
          >
            Imperial (lbs, in)
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 transition-colors duration-300">
              Weight {unit === 'metric' ? '(kg)' : '(lbs)'}
            </label>
            <div className="relative">
              <input
                type="number"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                placeholder={unit === 'metric' ? 'e.g., 70' : 'e.g., 154'}
                className="w-full px-4 py-3 pl-10 bg-gray-50 dark:bg-slate-900 border border-gray-300 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white transition-colors duration-300"
              />
              <Weight className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 transition-colors duration-300">
              Height {unit === 'metric' ? '(cm)' : '(inches)'}
            </label>
            <div className="relative">
              <input
                type="number"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                placeholder={unit === 'metric' ? 'e.g., 175' : 'e.g., 69'}
                className="w-full px-4 py-3 pl-10 bg-gray-50 dark:bg-slate-900 border border-gray-300 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white transition-colors duration-300"
              />
              <Ruler className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
            </div>
          </div>

          <button
            onClick={calculateBMI}
            disabled={!weight || !height}
            className="w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 dark:disabled:bg-gray-700 text-white font-semibold rounded-lg transition-colors disabled:cursor-not-allowed"
          >
            Calculate BMI
          </button>
        </div>
      </div>

      {bmi && (
        <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl p-6 border border-blue-200 dark:border-blue-800 animate-slide-up transition-colors duration-300">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 transition-colors duration-300">Your BMI Result</h3>
          <div className="text-center mb-6">
            <div className="text-5xl font-bold text-blue-600 dark:text-blue-400 mb-2">{bmi.value}</div>
            <div className={`text-2xl font-semibold ${bmi.color}`}>{bmi.category}</div>
          </div>

          <div className="space-y-3">
            <div className="bg-white dark:bg-slate-800 rounded-lg p-4 transition-colors duration-300">
              <p className="text-sm text-gray-700 dark:text-gray-300 transition-colors duration-300">{bmi.advice}</p>
            </div>

            <div className="text-xs text-gray-500 dark:text-gray-400 space-y-1 transition-colors duration-300">
              <div className="flex justify-between">
                <span>Underweight:</span>
                <span>&lt; 18.5</span>
              </div>
              <div className="flex justify-between">
                <span>Normal weight:</span>
                <span>18.5 - 24.9</span>
              </div>
              <div className="flex justify-between">
                <span>Overweight:</span>
                <span>25 - 29.9</span>
              </div>
              <div className="flex justify-between">
                <span>Obese:</span>
                <span>≥ 30</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
