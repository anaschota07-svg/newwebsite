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
    <div className="space-y-4">
      <div className="glass rounded-2xl p-6 border border-white/10 shadow-lg">
        <div className="flex gap-3 mb-5">
          <button
            onClick={() => setUnit('metric')}
            className={`flex-1 py-2.5 px-5 rounded-xl font-bold transition-all ${
              unit === 'metric'
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/50'
                : 'glass border border-white/10 text-slate-900 dark:text-slate-300 hover:border-cyan-500/50'
            }`}
          >
            📏 Metric (kg, cm)
          </button>
          <button
            onClick={() => setUnit('imperial')}
            className={`flex-1 py-2.5 px-5 rounded-xl font-bold transition-all ${
              unit === 'imperial'
                ? 'bg-gradient-to-r from-purple-500 to-pink-600 text-white shadow-lg shadow-purple-500/50'
                : 'glass border border-white/10 text-slate-900 dark:text-slate-300 hover:border-purple-500/50'
            }`}
          >
            📐 Imperial (lbs, in)
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-bold text-slate-900 dark:text-slate-300 mb-2">
              ⚖️ Weight {unit === 'metric' ? '(kg)' : '(lbs)'}
            </label>
            <div className="relative">
              <input
                type="number"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                placeholder={unit === 'metric' ? 'e.g., 70' : 'e.g., 154'}
                className="w-full px-5 py-3 pl-12 glass border border-white/10 rounded-xl focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 text-slate-900 dark:text-white transition-all font-semibold"
              />
              <Weight className="absolute left-4 top-3 h-5 w-5 text-cyan-500" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-900 dark:text-slate-300 mb-2">
              📏 Height {unit === 'metric' ? '(cm)' : '(inches)'}
            </label>
            <div className="relative">
              <input
                type="number"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                placeholder={unit === 'metric' ? 'e.g., 175' : 'e.g., 69'}
                className="w-full px-5 py-3 pl-12 glass border border-white/10 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 text-slate-900 dark:text-white transition-all font-semibold"
              />
              <Ruler className="absolute left-4 top-3 h-5 w-5 text-purple-500" />
            </div>
          </div>

          <button
            onClick={calculateBMI}
            disabled={!weight || !height}
            className="w-full px-6 py-3 bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 hover:from-cyan-600 hover:via-blue-700 hover:to-purple-700 disabled:from-slate-300 disabled:to-slate-400 dark:disabled:from-slate-700 dark:disabled:to-slate-800 text-white font-bold rounded-xl shadow-lg hover:shadow-2xl hover:shadow-cyan-500/20 transition-all disabled:cursor-not-allowed disabled:shadow-none"
          >
            🎯 Calculate BMI
          </button>
        </div>
      </div>

      {bmi && (
        <div className="glass rounded-2xl p-6 border border-white/10 shadow-lg animate-slide-up bg-gradient-to-br from-cyan-500/5 to-purple-500/5">
          <h3 className="text-xl font-black text-slate-900 dark:text-white mb-4 text-center">
            📊 Your BMI Result
          </h3>
          <div className="text-center mb-5">
            <div className="text-6xl font-black bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 to-purple-600 mb-2">
              {bmi.value}
            </div>
            <div className={`text-2xl font-bold ${bmi.color}`}>{bmi.category}</div>
          </div>

          <div className="space-y-3">
            <div className="glass rounded-xl p-4 border border-white/10">
              <p className="text-sm text-slate-900 dark:text-slate-300 leading-relaxed font-semibold">
                💡 {bmi.advice}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs font-bold">
              <div className="glass rounded-xl p-3 border border-blue-500/20">
                <div className="text-slate-900 dark:text-slate-400 mb-1">Underweight</div>
                <div className="text-blue-500">&lt; 18.5</div>
              </div>
              <div className="glass rounded-xl p-3 border border-green-500/20">
                <div className="text-slate-900 dark:text-slate-400 mb-1">Normal</div>
                <div className="text-green-500">18.5 - 24.9</div>
              </div>
              <div className="glass rounded-xl p-3 border border-yellow-500/20">
                <div className="text-slate-900 dark:text-slate-400 mb-1">Overweight</div>
                <div className="text-yellow-500">25 - 29.9</div>
              </div>
              <div className="glass rounded-xl p-3 border border-red-500/20">
                <div className="text-slate-900 dark:text-slate-400 mb-1">Obese</div>
                <div className="text-red-500">≥ 30</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
