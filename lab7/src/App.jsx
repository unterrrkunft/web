import TaskList from './components/TaskList'
import TaskFilter from './components/TaskFilter'
import './App.css'

export default function App() {
  return (
    <div className="app">
      <h1>📝 Task Manager</h1>
      <TaskFilter />
      <TaskList />
    </div>
  )
}