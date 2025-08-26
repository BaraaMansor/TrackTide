import { useState } from 'react'
import type { Habit } from './types/habit'
import { useLocalStorage } from './hooks/useLocalStorage'
import StatsOverview from './components/StatsOverview'
import HabitCard from './components/HabitCard'
import AddHabitForm from './components/AddHabitForm'
import EditHabitForm from './components/EditHabitForm'
import Footer from './components/Footer'

function App() {
  const { habits, addHabit, updateHabit, deleteHabit, toggleHabitCompletion } =
    useLocalStorage()
  const [showAddForm, setShowAddForm] = useState(false)
  const [editingHabit, setEditingHabit] = useState<Habit | null>(null)
  const [filter, setFilter] = useState<'all' | 'completed' | 'pending'>('all')

  const today = new Date().toISOString().split('T')[0]

  const filteredHabits = habits.filter((habit) => {
    const isCompletedToday = habit.completions.includes(today)
    switch (filter) {
      case 'completed':
        return isCompletedToday
      case 'pending':
        return !isCompletedToday
      default:
        return true
    }
  })

  const handleDeleteHabit = (id: string) => {
    if (window.confirm('Are you sure you want to delete this habit?')) {
      deleteHabit(id)
    }
  }

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Header */}
      <header className="bg-slate-800 shadow-sm border-b border-slate-700">
        <div className="max-w-6xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex">
                <img
                  src="/tracktide-mark.svg"
                  alt="logo"
                  width={40}
                  height={40}
                />
                <h1 className="text-3xl font-bold text-white">TrackTide</h1>
              </div>
              <p className="text-slate-400 mt-1">
                Build better habits, one day at a time
              </p>
            </div>
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/30 to-blue-600/30 rounded-xl blur-lg group-hover:blur-xl transition-all duration-300"></div>
              <button
                onClick={() => setShowAddForm(true)}
                className="relative px-6 py-3 bg-white/10 backdrop-blur-md border border-white/20 text-white cursor-pointer rounded-xl hover:bg-white/15 hover:border-blue-400/40 transition-all duration-300 font-medium shadow-2xl hover:shadow-blue-500/20 flex items-center gap-2"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
                Add Habit
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-8">
        {/* Stats Overview */}
        <StatsOverview habits={habits} />

        {/* Filter Tabs */}
        {habits.length > 0 && (
          <div className="flex items-center gap-2 mb-6">
            <span className="text-sm font-medium text-slate-300 mr-2">
              Filter:
            </span>
            {[
              { key: 'all', label: 'All Habits', count: habits.length },
              {
                key: 'pending',
                label: 'Pending',
                count: habits.filter((h) => !h.completions.includes(today))
                  .length,
              },
              {
                key: 'completed',
                label: 'Completed',
                count: habits.filter((h) => h.completions.includes(today))
                  .length,
              },
            ].map(({ key, label, count }) => (
              <div key={key} className="relative group">
                {filter === key && (
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/30 to-blue-600/30 rounded-lg blur-lg transition-all duration-300"></div>
                )}
                <button
                  onClick={() => setFilter(key as typeof filter)}
                  className={`relative cursor-pointer px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                    filter === key
                      ? 'bg-white/10 backdrop-blur-md border border-blue-400/40 text-white shadow-xl shadow-blue-500/20'
                      : 'bg-white/5 backdrop-blur-sm border border-white/10 text-slate-300 hover:bg-white/10 hover:border-white/20 hover:text-white'
                  }`}
                >
                  {label} ({count})
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Habits Grid */}
        {filteredHabits.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredHabits.map((habit) => (
              <HabitCard
                key={habit.id}
                habit={habit}
                onToggleCompletion={toggleHabitCompletion}
                onEdit={setEditingHabit}
                onDelete={handleDeleteHabit}
              />
            ))}
          </div>
        ) : habits.length === 0 ? (
          // Empty state - no habits
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg
                className="w-12 h-12 text-slate-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">
              No habits yet
            </h3>
            <p className="text-slate-400 mb-6 max-w-md mx-auto">
              Start building better habits by adding your first one. Whether
              it's drinking more water, reading daily, or exercising, every
              journey begins with a single step.
            </p>
            <div className="relative group inline-block">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/30 to-blue-600/30 rounded-xl blur-lg group-hover:blur-xl transition-all duration-300"></div>
              <button
                onClick={() => setShowAddForm(true)}
                className="relative cursor-pointer px-6 py-3 bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-xl hover:bg-white/15 hover:border-blue-400/40 transition-all duration-300 font-medium shadow-xl hover:shadow-blue-500/20"
              >
                Add Your First Habit
              </button>
            </div>
          </div>
        ) : (
          // Empty state - filtered results
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg
                className="w-12 h-12 text-slate-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">
              No habits found
            </h3>
            <p className="text-slate-400 mb-6">
              No habits match your current filter. Try changing the filter or
              add a new habit.
            </p>
            <div className="relative group inline-block mr-3">
              <div className="absolute inset-0 bg-gradient-to-r from-slate-500/20 to-slate-600/20 rounded-xl blur-lg group-hover:blur-xl transition-all duration-300"></div>
              <button
                onClick={() => setFilter('all')}
                className="relative cursor-pointer px-6 py-3 bg-white/5 backdrop-blur-md border border-white/10 text-slate-300 rounded-xl hover:bg-white/10 hover:border-white/20 hover:text-white transition-all duration-300 font-medium shadow-xl"
              >
                Show All Habits
              </button>
            </div>
            <div className="relative group inline-block">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/30 to-blue-600/30 rounded-xl blur-lg group-hover:blur-xl transition-all duration-300"></div>
              <button
                onClick={() => setShowAddForm(true)}
                className="relative cursor-pointer px-6 py-3 bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-xl hover:bg-white/15 hover:border-blue-400/40 transition-all duration-300 font-medium shadow-xl hover:shadow-blue-500/20"
              >
                Add New Habit
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <Footer />

      {/* Modals */}
      {showAddForm && (
        <AddHabitForm
          onAddHabit={(habitData) => {
            addHabit(habitData)
            setShowAddForm(false)
          }}
          onCancel={() => setShowAddForm(false)}
        />
      )}

      {editingHabit && (
        <EditHabitForm
          habit={editingHabit}
          onUpdateHabit={updateHabit}
          onCancel={() => setEditingHabit(null)}
        />
      )}
    </div>
  )
}

export default App
