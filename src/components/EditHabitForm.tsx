import { useState } from 'react'
import type { Habit, HabitFormData } from '../types/habit'
import { HABIT_COLORS, HABIT_CATEGORIES } from '../types/habit'

interface EditHabitFormProps {
  habit: Habit
  onUpdateHabit: (id: string, updates: Partial<Habit>) => void
  onCancel: () => void
}

export default function EditHabitForm({
  habit,
  onUpdateHabit,
  onCancel,
}: EditHabitFormProps) {
  const [formData, setFormData] = useState<HabitFormData>({
    name: habit.name,
    description: habit.description || '',
    color: habit.color,
    category: habit.category,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.name.trim()) {
      onUpdateHabit(habit.id, formData)
      onCancel()
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-slate-800 rounded-2xl p-6 w-full max-w-md shadow-2xl border border-slate-700">
        <h2 className="text-2xl font-bold text-white mb-6">Edit Habit</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-slate-300 mb-2"
            >
              Habit Name *
            </label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, name: e.target.value }))
              }
              className="w-full px-4 py-3 border border-slate-600 bg-slate-700 text-white rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all placeholder-slate-400"
              placeholder="e.g., Drink 8 glasses of water"
              required
            />
          </div>

          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-slate-300 mb-2"
            >
              Description
            </label>
            <textarea
              id="description"
              value={formData.description}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
              className="w-full px-4 py-3 border border-slate-600 bg-slate-700 text-white rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-none placeholder-slate-400"
              placeholder="Optional description"
              rows={3}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Category
            </label>
            <select
              value={formData.category}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, category: e.target.value }))
              }
              className="w-full px-4 py-3 border border-slate-600 bg-slate-700 text-white rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
            >
              {HABIT_CATEGORIES.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-3">
              Color
            </label>
            <div className="grid grid-cols-5 gap-3">
              {HABIT_COLORS.map((color) => (
                <button
                  key={color}
                  type="button"
                  onClick={() => setFormData((prev) => ({ ...prev, color }))}
                  className={`w-12 h-12 rounded-xl transition-all ${
                    formData.color === color
                      ? 'ring-4 ring-slate-400 scale-110'
                      : 'hover:scale-105'
                  }`}
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <div className="relative group flex-1">
              <div className="absolute inset-0 bg-gradient-to-r from-slate-500/10 to-slate-600/10 rounded-xl blur group-hover:blur-lg transition-all duration-300"></div>
              <button
                type="button"
                onClick={onCancel}
                className="relative w-full cursor-pointer px-6 py-3 bg-white/5 backdrop-blur-md border border-white/20 text-slate-300 rounded-xl hover:bg-white/10 hover:border-white/30 hover:text-white transition-all duration-300 font-medium"
              >
                Cancel
              </button>
            </div>
            <div className="relative group flex-1">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/30 to-blue-600/30 rounded-xl blur group-hover:blur-lg transition-all duration-300"></div>
              <button
                type="submit"
                className="relative cursor-pointer w-full px-6 py-3 bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-xl hover:bg-white/15 hover:border-blue-400/40 transition-all duration-300 font-medium shadow-xl hover:shadow-blue-500/20"
              >
                Save Changes
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
