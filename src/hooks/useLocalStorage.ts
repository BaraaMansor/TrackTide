import { useState, useEffect } from 'react'
import type { Habit } from '../types/habit'

const STORAGE_KEY = 'tracktide-habits'

// Helper function to safely get from localStorage
const getStoredHabits = (): Habit[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      return JSON.parse(stored)
    }
  } catch (error) {
    console.error('Error loading habits from localStorage:', error)
  }
  return []
}

// Helper function to safely save to localStorage
const saveHabits = (habits: Habit[]) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(habits))
    console.log('Habits saved to localStorage:', habits.length, 'habits')
  } catch (error) {
    console.error('Error saving habits to localStorage:', error)
  }
}

export function useLocalStorage() {
  // Initialize with stored habits immediately
  const [habits, setHabits] = useState<Habit[]>(() => getStoredHabits())

  // Save habits to localStorage whenever habits change
  useEffect(() => {
    saveHabits(habits)
  }, [habits])

  const addHabit = (
    habitData: Omit<Habit, 'id' | 'createdAt' | 'completions'>,
  ) => {
    const newHabit: Habit = {
      ...habitData,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      completions: [],
    }
    console.log('Adding new habit:', newHabit.name)
    setHabits((prev) => {
      const updated = [...prev, newHabit]
      return updated
    })
  }

  const updateHabit = (id: string, updates: Partial<Habit>) => {
    console.log('Updating habit:', id, updates)
    setHabits((prev) =>
      prev.map((habit) => (habit.id === id ? { ...habit, ...updates } : habit)),
    )
  }

  const deleteHabit = (id: string) => {
    console.log('Deleting habit:', id)
    setHabits((prev) => prev.filter((habit) => habit.id !== id))
  }

  const toggleHabitCompletion = (id: string, date: string) => {
    console.log('Toggling habit completion:', id, date)
    setHabits((prev) =>
      prev.map((habit) => {
        if (habit.id === id) {
          const completions = habit.completions.includes(date)
            ? habit.completions.filter((d) => d !== date)
            : [...habit.completions, date]
          return { ...habit, completions }
        }
        return habit
      }),
    )
  }

  return {
    habits,
    addHabit,
    updateHabit,
    deleteHabit,
    toggleHabitCompletion,
  }
}
