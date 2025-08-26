export interface Habit {
  id: string
  name: string
  description?: string
  color: string
  category: string
  createdAt: string
  completions: string[] // Array of dates in YYYY-MM-DD format
}

export interface HabitFormData {
  name: string
  description?: string
  color: string
  category: string
}

export const HABIT_COLORS = [
  '#3B82F6', // Blue
  '#10B981', // Emerald
  '#F59E0B', // Amber
  '#EF4444', // Red
  '#8B5CF6', // Violet
  '#06B6D4', // Cyan
  '#F97316', // Orange
  '#84CC16', // Lime
  '#EC4899', // Pink
  '#6B7280', // Gray
] as const

export const HABIT_CATEGORIES = [
  'Health & Fitness',
  'Learning',
  'Productivity',
  'Mindfulness',
  'Social',
  'Hobbies',
  'Finance',
  'Other',
] as const
