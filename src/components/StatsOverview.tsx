import type { Habit } from '../types/habit'

interface StatsOverviewProps {
  habits: Habit[]
}

export default function StatsOverview({ habits }: StatsOverviewProps) {
  const today = new Date().toISOString().split('T')[0]
  const completedToday = habits.filter((habit) =>
    habit.completions.includes(today),
  ).length
  const totalHabits = habits.length
  const completionRate =
    totalHabits > 0 ? Math.round((completedToday / totalHabits) * 100) : 0

  // Calculate total streak across all habits
  const totalCompletions = habits.reduce(
    (sum, habit) => sum + habit.completions.length,
    0,
  )

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {/* Today's Progress - Glass Effect */}
      <div className="relative group">
        <div className="absolute cursor-pointer  inset-0 bg-gradient-to-br from-blue-500/20 to-blue-600/30 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
        <div className="relative bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-2xl shadow-2xl hover:shadow-blue-500/10 hover:border-blue-500/30 transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-200 text-sm font-medium mb-1">
                Today's Progress
              </p>
              <p className="text-3xl font-bold text-white mb-1">
                {completedToday}/{totalHabits}
              </p>
              <p className="text-blue-300 text-sm">
                {completionRate}% complete
              </p>
            </div>
            <div className="w-16 h-16 bg-blue-500/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-blue-400/30">
              <svg
                className="w-8 h-8 text-blue-300"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Total Habits - Glass Effect */}
      <div className="relative group">
        <div className="absolute inset-0 bg-gradient-to-br from-green-500/20 to-green-600/30 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
        <div className="relative bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-2xl shadow-2xl hover:shadow-green-500/10 hover:border-green-500/30 transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-200 text-sm font-medium mb-1">
                Total Habits
              </p>
              <p className="text-3xl font-bold text-white mb-1">
                {totalHabits}
              </p>
              <p className="text-green-300 text-sm">Active habits</p>
            </div>
            <div className="w-16 h-16 bg-green-500/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-green-400/30">
              <svg
                className="w-8 h-8 text-green-300"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Total Completions - Glass Effect */}
      <div className="relative group">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-purple-600/30 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
        <div className="relative bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-2xl shadow-2xl hover:shadow-purple-500/10 hover:border-purple-500/30 transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-200 text-sm font-medium mb-1">
                Total Completions
              </p>
              <p className="text-3xl font-bold text-white mb-1">
                {totalCompletions}
              </p>
              <p className="text-purple-300 text-sm">All time</p>
            </div>
            <div className="w-16 h-16 bg-purple-500/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-purple-400/30">
              <svg
                className="w-8 h-8 text-purple-300"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
