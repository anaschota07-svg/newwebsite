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
      <div className="glass rounded-2xl p-8 border border-white/10 shadow-lg">
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
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/50'
                    : 'glass border border-white/10 text-slate-700 dark:text-slate-300 hover:border-cyan-500/50'
                }`}
              >
                Length
              </button>
              <button
                onClick={() => setUnitType('weight')}
                className={`flex-1 px-4 py-3 rounded-xl font-bold transition-all ${
                  unitType === 'weight'
                    ? 'bg-gradient-to-r from-purple-500 to-pink-600 text-white shadow-lg shadow-purple-500/50'
                    : 'glass border border-white/10 text-slate-700 dark:text-slate-300 hover:border-purple-500/50'
                }`}
              >
                Weight
              </button>
              <button
                onClick={() => setUnitType('temperature')}
                className={`flex-1 px-4 py-3 rounded-xl font-bold transition-all ${
                  unitType === 'temperature'
                    ? 'bg-gradient-to-r from-orange-500 to-red-600 text-white shadow-lg shadow-orange-500/50'
                    : 'glass border border-white/10 text-slate-700 dark:text-slate-300 hover:border-orange-500/50'
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
                className="w-full px-5 py-4 glass border border-white/10 rounded-xl focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 text-slate-900 dark:text-white transition-all font-bold"
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
                className="w-full px-5 py-4 glass border border-white/10 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 text-slate-900 dark:text-white transition-all font-bold"
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
              className="w-full px-5 py-4 glass border border-white/10 rounded-xl focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 text-slate-900 dark:text-white transition-all font-semibold text-lg"
            />
          </div>

          <div className="flex gap-3">
            <button
              onClick={handleConvert}
              className="flex-1 px-6 py-4 bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white font-bold rounded-xl shadow-lg hover:shadow-2xl hover:shadow-cyan-500/20 transition-all"
            >
              ⚡ Convert
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
            ✨ Result
          </h3>
          <div className="text-6xl font-black bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 mb-2">
            {result}
          </div>
          <div className="text-xl font-bold text-slate-700 dark:text-slate-300">
            {toUnit.charAt(0).toUpperCase() + toUnit.slice(1)}
          </div>
        </div>
      )}

      <div className="glass rounded-2xl p-8 border border-cyan-500/20 shadow-lg bg-gradient-to-br from-cyan-500/5 to-purple-500/5">
        <h3 className="text-lg font-black text-slate-900 dark:text-white mb-4 bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 to-purple-500">
          💡 Unit Conversion
        </h3>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-semibold">
          Convert between different units of measurement including length, weight, and temperature. All conversions are accurate and use standard conversion factors.
        </p>
      </div>
    </div>
  )
}
