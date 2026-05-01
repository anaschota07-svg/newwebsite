'use client'

import { useState } from 'react'
import { RefreshCw } from 'lucide-react'

type UnitType = 'length' | 'weight' | 'temperature'

const conversions = {
  length: {
    meter: 1,
    kilometer: 0.001,
    centimeter: 100,
    millimeter: 1000,
    inch: 39.3701,
    foot: 3.28084,
    yard: 1.09361,
    mile: 0.000621371,
  },
  weight: {
    kilogram: 1,
    gram: 1000,
    pound: 2.20462,
    ounce: 35.274,
    ton: 0.001,
  },
  temperature: {
    celsius: 'celsius',
    fahrenheit: 'fahrenheit',
    kelvin: 'kelvin',
  },
}

export default function UnitConverter() {
  const [unitType, setUnitType] = useState<UnitType>('length')
  const [fromUnit, setFromUnit] = useState('meter')
  const [toUnit, setToUnit] = useState('kilometer')
  const [value, setValue] = useState('')
  const [result, setResult] = useState('')

  const handleConvert = () => {
    if (!value || isNaN(Number(value))) {
      setResult('')
      return
    }

    const numValue = Number(value)

    if (unitType === 'temperature') {
      let celsius = numValue
      if (fromUnit === 'fahrenheit') {
        celsius = (numValue - 32) * (5 / 9)
      } else if (fromUnit === 'kelvin') {
        celsius = numValue - 273.15
      }

      if (toUnit === 'fahrenheit') {
        setResult(((celsius * 9) / 5 + 32).toFixed(2))
      } else if (toUnit === 'kelvin') {
        setResult((celsius + 273.15).toFixed(2))
      } else {
        setResult(celsius.toFixed(2))
      }
    } else {
      const units = conversions[unitType]
      const baseValue = numValue / units[fromUnit as keyof typeof units]
      const convertedValue = baseValue * units[toUnit as keyof typeof units]
      setResult(convertedValue.toFixed(6))
    }
  }

  const handleClear = () => {
    setValue('')
    setResult('')
  }

  const getUnits = () => {
    if (unitType === 'temperature') {
      return Object.keys(conversions.temperature)
    }
    return Object.keys(conversions[unitType])
  }

  return (
    <div className="space-y-6">
      <div className="glass rounded-2xl p-8 border border-slate-200 dark:border-slate-700 shadow-lg">
        <div className="space-y-5">
          <div>
            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-3">
              📏 Unit Type
            </label>
            <div className="flex gap-3">
              <button
                onClick={() => setUnitType('length')}
                className={`flex-1 px-4 py-3 rounded-xl font-bold transition-all ${
                  unitType === 'length'
                    ? 'bg-slate-900 text-white shadow-sm dark:bg-sky-600'
                    : 'glass border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-sky-500/50'
                }`}
              >
                Length
              </button>
              <button
                onClick={() => setUnitType('weight')}
                className={`flex-1 px-4 py-3 rounded-xl font-bold transition-all ${
                  unitType === 'weight'
                    ? 'bg-gradient-to-r from-purple-500 to-pink-600 text-white shadow-lg shadow-purple-500/50'
                    : 'glass border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-purple-500/50'
                }`}
              >
                Weight
              </button>
              <button
                onClick={() => setUnitType('temperature')}
                className={`flex-1 px-4 py-3 rounded-xl font-bold transition-all ${
                  unitType === 'temperature'
                    ? 'bg-gradient-to-r from-orange-500 to-red-600 text-white shadow-lg shadow-orange-500/50'
                    : 'glass border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-orange-500/50'
                }`}
              >
                Temperature
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-3">
                📤 From
              </label>
              <select
                value={fromUnit}
                onChange={(e) => setFromUnit(e.target.value)}
                className="w-full px-5 py-4 glass border border-slate-200 dark:border-slate-700 rounded-xl focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 text-slate-900 dark:text-white transition-all font-bold"
              >
                {getUnits().map((unit) => (
                  <option key={unit} value={unit}>
                    {unit.charAt(0).toUpperCase() + unit.slice(1)}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-3">
                📥 To
              </label>
              <select
                value={toUnit}
                onChange={(e) => setToUnit(e.target.value)}
                className="w-full px-5 py-4 glass border border-slate-200 dark:border-slate-700 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 text-slate-900 dark:text-white transition-all font-bold"
              >
                {getUnits().map((unit) => (
                  <option key={unit} value={unit}>
                    {unit.charAt(0).toUpperCase() + unit.slice(1)}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-3">
              🔢 Value
            </label>
            <input
              type="number"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onKeyUp={handleConvert}
              placeholder="Enter value to convert..."
              className="w-full px-5 py-4 glass border border-slate-200 dark:border-slate-700 rounded-xl focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 text-slate-900 dark:text-white transition-all font-semibold text-lg"
            />
          </div>

          <div className="flex gap-3">
            <button
              onClick={handleConvert}
              className="flex-1 px-6 py-4 bg-slate-900 hover:bg-slate-800 dark:bg-sky-600 dark:hover:bg-sky-500 text-white font-bold rounded-xl shadow-lg hover:shadow-2xl hover:shadow-cyan-500/20 transition-all"
            >
              ⚡ Convert
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
            ✨ Result
          </h3>
          <div className="text-6xl font-semibold mb-2">
            {result}
          </div>
          <div className="text-xl font-bold text-slate-700 dark:text-slate-300">
            {toUnit.charAt(0).toUpperCase() + toUnit.slice(1)}
          </div>
        </div>
      )}

      <div className="glass rounded-2xl p-8 border border-slate-200 dark:border-slate-600 shadow-lg bg-slate-50 dark:bg-slate-800/50">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
          💡 Unit Conversion
        </h3>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-semibold">
          Convert between different units of measurement including length, weight, and temperature. All conversions are accurate and use standard conversion factors.
        </p>
      </div>
    </div>
  )
}
