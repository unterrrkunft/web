import { useContext, useRef, useState } from 'react'
import { TaskContext } from '../App'
import TaskItem from './TaskItem'

export default function TaskList() {
  const { filteredTasks, addTask } = useContext(TaskContext)
  const [text, setText] = useState('')
  const inputRef = useRef(null)

  const handleAdd = () => {
    if (!text.trim()) return

    addTask(text)
    setText('')

    // фокус назад в інпут
    inputRef.current?.focus()
  }

  return (
    <div>
      <div className="input-box">
        <input
          ref={inputRef}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="New task..."
        />
        <button onClick={handleAdd}>Add</button>
      </div>

      <ul>
        {filteredTasks.map(task => (
          <TaskItem key={task.id} task={task} />
        ))}
      </ul>
    </div>
  )
}
