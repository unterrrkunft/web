import { createContext, useCallback, useEffect, useMemo, useState } from 'react'

export const TaskContext = createContext(null)

export default function TaskProvider({ children }) {
  const [tasks, setTasks] = useState(() => {
    try {
      const saved = localStorage.getItem('tasks')
      return saved ? JSON.parse(saved) : []
    } catch (e) {
      console.error('Error parsing tasks from localStorage:', e)
      return []
    }
  })

  const [filter, setFilter] = useState('all')

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks))
  }, [tasks])

  const addTask = useCallback((text) => {
    setTasks(prev => [
      ...prev,
      {
        id: Date.now(),
        text,
        completed: false
      }
    ])
  }, [])

  const deleteTask = useCallback((id) => {
    setTasks(prev => prev.filter(t => t.id !== id))
  }, [])

  const toggleTask = useCallback((id) => {
    setTasks(prev =>
      prev.map(t =>
        t.id === id ? { ...t, completed: !t.completed } : t
      )
    )
  }, [])

  const editTask = useCallback((id, newText) => {
    setTasks(prev =>
      prev.map(t =>
        t.id === id ? { ...t, text: newText } : t
      )
    )
  }, [])

  const filteredTasks = useMemo(() => {
    switch (filter) {
      case 'active':
        return tasks.filter(t => !t.completed)
      case 'completed':
        return tasks.filter(t => t.completed)
      default:
        return tasks
    }
  }, [tasks, filter])

  return (
    <TaskContext.Provider
      value={{
        tasks,
        filteredTasks,
        addTask,
        deleteTask,
        toggleTask,
        editTask,
        filter,
        setFilter
      }}
    >
      {children ?? null}
    </TaskContext.Provider>
  )
}