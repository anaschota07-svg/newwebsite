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
      <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-gray-200 dark:border-slate-700 shadow-sm transition-colors duration-300">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 transition-colors duration-300">
              Unit Type
            </label>
            <div className="flex gap-2">
              <button
                onClick={() => setUnitType('length')}
                className={`flex-1 px-4 py-2 rounded-lg font-medium transition-colors ${
                  unitType === 'length'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 dark:bg-slate-900 text-gray-700 dark:text-gray-300'
                }`}
              >
                Length
              </button>
              <button
                onClick={() => setUnitType('weight')}
                className={`flex-1 px-4 py-2 rounded-lg font-medium transition-colors ${
                  unitType === 'weight'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 dark:bg-slate-900 text-gray-700 dark:text-gray-300'
                }`}
              >
                Weight
              </button>
              <button
                onClick={() => setUnitType('temperature')}
                className={`flex-1 px-4 py-2 rounded-lg font-medium transition-colors ${
                  unitType === 'temperature'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 dark:bg-slate-900 text-gray-700 dark:text-gray-300'
                }`}
              >
                Temperature
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 transition-colors duration-300">
                From
              </label>
              <select
                value={fromUnit}
                onChange={(e) => setFromUnit(e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 dark:bg-slate-900 border border-gray-300 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white transition-colors duration-300"
              >
                {getUnits().map((unit) => (
                  <option key={unit} value={unit}>
                    {unit.charAt(0).toUpperCase() + unit.slice(1)}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 transition-colors duration-300">
                To
              </label>
              <select
                value={toUnit}
                onChange={(e) => setToUnit(e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 dark:bg-slate-900 border border-gray-300 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white transition-colors duration-300"
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
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 transition-colors duration-300">
              Value
            </label>
            <input
              type="number"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onKeyUp={handleConvert}
              placeholder="Enter value to convert..."
              className="w-full px-4 py-3 bg-gray-50 dark:bg-slate-900 border border-gray-300 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white transition-colors duration-300"
            />
          </div>

          <div className="flex gap-2">
            <button
              onClick={handleConvert}
              className="flex-1 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
            >
              Convert
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
            {result} {toUnit.charAt(0).toUpperCase() + toUnit.slice(1)}
          </div>
        </div>
      )}

      <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl p-6 border border-blue-200 dark:border-blue-800 transition-colors duration-300">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 transition-colors duration-300">Unit Conversion</h3>
        <p className="text-sm text-gray-700 dark:text-gray-300 mb-3 transition-colors duration-300">
          Convert between different units of measurement including length, weight, and temperature. All conversions are accurate and use standard conversion factors.
        </p>
      </div>
    </div>
  )
}
