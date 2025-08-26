import type { Habit } from '../types/habit'

export function getTodayString(): string {
  return new Date().toISOString().split('T')[0]
}

export function getDateString(date: Date): string {
  return date.toISOString().split('T')[0]
}

export function isHabitCompletedToday(habit: Habit): boolean {
  const today = getTodayString()
  return habit.completions.includes(today)
}

export function getHabitStreak(habit: Habit): number {
  if (habit.completions.length === 0) return 0

  const sortedCompletions = [...habit.completions].sort().reverse()
  const today = getTodayString()
  let streak = 0
  let currentDate = new Date()

  // If today is not completed, start from yesterday
  if (!sortedCompletions.includes(today)) {
    currentDate.setDate(currentDate.getDate() - 1)
  }

  for (let i = 0; i < sortedCompletions.length; i++) {
    const dateString = getDateString(currentDate)

    if (sortedCompletions[i] === dateString) {
      streak++
      currentDate.setDate(currentDate.getDate() - 1)
    } else {
      break
    }
  }

  return streak
}

export function getHabitCompletionRate(
  habit: Habit,
  days: number = 30,
): number {
  const today = new Date()
  const startDate = new Date(today.getTime() - (days - 1) * 24 * 60 * 60 * 1000)

  let completedDays = 0
  let totalDays = 0

  for (let i = 0; i < days; i++) {
    const date = new Date(startDate.getTime() + i * 24 * 60 * 60 * 1000)
    const dateString = getDateString(date)

    // Only count days from creation date onwards
    if (date >= new Date(habit.createdAt)) {
      totalDays++
      if (habit.completions.includes(dateString)) {
        completedDays++
      }
    }
  }

  return totalDays > 0 ? Math.round((completedDays / totalDays) * 100) : 0
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  })
}
