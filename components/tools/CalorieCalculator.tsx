'use client'

import { useState } from 'react'

export default function CalorieCalculator() {
  const [data, setData] = useState({
    age: 25,
    weight: 70,
    height: 170,
    gender: 'male',
    activity: '1.375'
  })
  const [calories, setCalories] = useState<number | null>(null)

  const calculate = () => {
    let bmr: number
    if (data.gender === 'male') {
      bmr = 10 * data.weight + 6.25 * data.height - 5 * data.age + 5
    } else {
      bmr = 10 * data.weight + 6.25 * data.height - 5 * data.age - 161
    }
    const tdee = bmr * parseFloat(data.activity)
    setCalories(Math.round(tdee))
  }

  return (
    <div className="space-y-4">
      <div className="glass rounded-3xl p-6 border border-white/10 shadow-lg">
        <h3 className="text-lg font-black text-slate-900 dark:text-white mb-4">
          🥗 Your Details
        </h3>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Age</label>
              <input type="number" value={data.age} onChange={(e) => setData({ ...data, age: parseInt(e.target.value) || 0 })} className="w-full px-4 py-3 glass border border-white/10 rounded-xl focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 text-slate-900 dark:text-white" />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Weight (kg)</label>
              <input type="number" value={data.weight} onChange={(e) => setData({ ...data, weight: parseFloat(e.target.value) || 0 })} className="w-full px-4 py-3 glass border border-white/10 rounded-xl focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 text-slate-900 dark:text-white" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Height (cm)</label>
            <input type="number" value={data.height} onChange={(e) => setData({ ...data, height: parseFloat(e.target.value) || 0 })} className="w-full px-4 py-3 glass border border-white/10 rounded-xl focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 text-slate-900 dark:text-white" />
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Gender</label>
            <select value={data.gender} onChange={(e) => setData({ ...data, gender: e.target.value })} className="w-full px-4 py-3 glass border border-white/10 rounded-xl focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 text-slate-900 dark:text-white">
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Activity Level</label>
            <select value={data.activity} onChange={(e) => setData({ ...data, activity: e.target.value })} className="w-full px-4 py-3 glass border border-white/10 rounded-xl focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 text-slate-900 dark:text-white">
              <option value="1.2">Sedentary</option>
              <option value="1.375">Lightly Active</option>
              <option value="1.55">Moderately Active</option>
              <option value="1.725">Very Active</option>
              <option value="1.9">Extremely Active</option>
            </select>
          </div>

          <button onClick={calculate} className="w-full px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white font-bold rounded-xl shadow-lg transition-all">
            Calculate Calories
          </button>
        </div>
      </div>

      {calories && (
        <div className="glass rounded-3xl p-6 border border-white/10 shadow-lg animate-slide-up">
          <h3 className="text-xl font-black text-slate-900 dark:text-white mb-4">
            Daily Calorie Needs
          </h3>
          <p className="text-5xl font-black bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 to-purple-500">
            {calories} kcal
          </p>
        </div>
      )}
    </div>
  )
}
