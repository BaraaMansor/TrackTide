import type { Habit } from '../types/habit'
import {
  isHabitCompletedToday,
  getHabitStreak,
  getHabitCompletionRate,
} from '../utils/habitUtils'

interface HabitCardProps {
  habit: Habit
  onToggleCompletion: (id: string, date: string) => void
  onEdit: (habit: Habit) => void
  onDelete: (id: string) => void
}

export default function HabitCard({
  habit,
  onToggleCompletion,
  onEdit,
  onDelete,
}: HabitCardProps) {
  const isCompleted = isHabitCompletedToday(habit)
  const streak = getHabitStreak(habit)
  const completionRate = getHabitCompletionRate(habit)
  const today = new Date().toISOString().split('T')[0]

  const handleToggle = () => {
    onToggleCompletion(habit.id, today)
  }

  return (
    <div
      className="bg-slate-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-200 border border-slate-700"
      style={{ borderLeftColor: habit.color, borderLeftWidth: '4px' }}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-white mb-1">
            {habit.name}
          </h3>
          {habit.description && (
            <p className="text-slate-400 text-sm">{habit.description}</p>
          )}
          <span
            className="inline-block px-2 py-1 text-xs font-medium rounded-full mt-2"
            style={{
              backgroundColor: `${habit.color}20`,
              color: habit.color,
            }}
          >
            {habit.category}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-slate-500/10 to-slate-600/10 rounded-lg blur group-hover:blur-md transition-all duration-300"></div>
            <button
              onClick={() => onEdit(habit)}
              className="relative p-2 cursor-pointer bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all duration-300"
              title="Edit habit"
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
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                />
              </svg>
            </button>
          </div>
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-red-600/10 rounded-lg blur group-hover:blur-md transition-all duration-300"></div>
            <button
              onClick={() => onDelete(habit.id)}
              className="relative cursor-pointer p-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg text-slate-400 hover:text-red-400 hover:bg-red-500/10 hover:border-red-500/20 transition-all duration-300"
              title="Delete habit"
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
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-1">
            <svg
              className="w-4 h-4 text-orange-500"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z"
                clipRule="evenodd"
              />
            </svg>
            <span className="text-slate-400">
              {streak} day{streak !== 1 ? 's' : ''} streak
            </span>
          </div>
          <div className="flex items-center gap-1">
            <svg
              className="w-4 h-4 text-green-500"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            <span className="text-slate-400">{completionRate}% this month</span>
          </div>
        </div>

        <div className="relative group">
          {isCompleted && (
            <div className="absolute inset-0 bg-gradient-to-r from-green-500/30 to-green-600/30 rounded-full blur-lg group-hover:blur-xl transition-all duration-300"></div>
          )}
          <button
            onClick={handleToggle}
            className={`relative w-12 h-12 cursor-pointer rounded-full border-4 backdrop-blur-sm transition-all duration-300 ${
              isCompleted
                ? 'border-green-500/50 bg-green-500/20 text-green-300 scale-105 shadow-xl shadow-green-500/20'
                : 'border-white/20 bg-white/5 hover:border-white/30 hover:bg-white/10 text-slate-400 hover:text-slate-300'
            }`}
            title={isCompleted ? 'Mark as incomplete' : 'Mark as complete'}
          >
            {isCompleted ? (
              <svg
                className="w-8 h-8 absolute inset-0 m-auto"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            ) : (
              <svg
                className="w-8 h-8 absolute inset-0 m-auto"
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
            )}
          </button>
        </div>
      </div>
    </div>
  )
}
