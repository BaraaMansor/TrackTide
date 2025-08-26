import { useState, useEffect } from 'react'
import type { Habit } from '../types/habit'

const STORAGE_KEY = 'tracktide-habits'

export function useLocalStorage() {
  const [habits, setHabits] = useState<Habit[]>([])

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        const parsedHabits = JSON.parse(stored)
        setHabits(parsedHabits)
      }
    } catch (error) {
      console.error('Error loading habits from localStorage:', error)
    }
  }, [])

  // Save habits to localStorage whenever habits change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(habits))
    } catch (error) {
      console.error('Error saving habits to localStorage:', error)
    }
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
    setHabits((prev) => [...prev, newHabit])
  }

  const updateHabit = (id: string, updates: Partial<Habit>) => {
    setHabits((prev) =>
      prev.map((habit) => (habit.id === id ? { ...habit, ...updates } : habit)),
    )
  }

  const deleteHabit = (id: string) => {
    setHabits((prev) => prev.filter((habit) => habit.id !== id))
  }

  const toggleHabitCompletion = (id: string, date: string) => {
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
