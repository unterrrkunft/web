import { createContext, useCallback, useEffect, useMemo, useState } from 'react'
import TaskList from './components/TaskList'
import TaskFilter from './components/TaskFilter'
import './App.css'

export const TaskContext = createContext()

export default function App() {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('tasks')
    return saved ? JSON.parse(saved) : []
  })

  const [filter, setFilter] = useState('all')

  // синхронізація з localStorage
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks))
  }, [tasks])

  // додати задачу
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

  // видалити
  const deleteTask = useCallback((id) => {
    setTasks(prev => prev.filter(t => t.id !== id))
  }, [])

  // toggle виконання
  const toggleTask = useCallback((id) => {
    setTasks(prev =>
      prev.map(t =>
        t.id === id ? { ...t, completed: !t.completed } : t
      )
    )
  }, [])

  // редагування
  const editTask = useCallback((id, newText) => {
    setTasks(prev =>
      prev.map(t =>
        t.id === id ? { ...t, text: newText } : t
      )
    )
  }, [])

  // фільтровані задачі (useMemo)
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

  const value = {
    tasks,
    addTask,
    deleteTask,
    toggleTask,
    editTask,
    filter,
    setFilter,
    filteredTasks
  }

  return (
    <TaskContext.Provider value={value}>
      <div className="app">
        <h1>📝 Task Manager</h1>
        <TaskFilter />
        <TaskList />
      </div>
    </TaskContext.Provider>
  )
}
