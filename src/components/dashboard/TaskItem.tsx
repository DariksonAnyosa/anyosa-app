'use client'

import { useState } from 'react'
import { CheckCircle, Clock } from 'lucide-react'

interface TaskItemProps {
  id: string
  task: string
  priority: 'alta' | 'media' | 'baja'
  initialCompleted?: boolean
  onToggle?: (taskId: string, taskName: string, completed: boolean) => void
  onSound?: () => void
}

export default function TaskItem({ 
  id,
  task, 
  priority, 
  initialCompleted = false,
  onToggle,
  onSound 
}: TaskItemProps) {
  const [completed, setCompleted] = useState(initialCompleted)

  const handleToggle = () => {
    const newCompleted = !completed
    setCompleted(newCompleted)
    
    // Reproducir sonido de click
    onSound?.()
    
    onToggle?.(id, task, newCompleted)
    
    // Feedback visual y sonoro
    if (newCompleted) {
      console.log(`✅ Tarea completada: ${task}`)
    } else {
      console.log(`◯ Tarea pendiente: ${task}`)
    }
  }

  const priorityStyles = {
    alta: 'bg-red-900/30 text-red-400 border border-red-800/30',
    media: 'bg-yellow-900/30 text-yellow-400 border border-yellow-800/30',
    baja: 'bg-slate-700/30 text-slate-400 border border-slate-600/30'
  }

  return (
    <div className={`flex items-center gap-4 p-4 rounded-lg border transition-all duration-200 ${
      completed 
        ? 'bg-green-900/10 border-green-800/20 hover:border-green-700/30' 
        : 'bg-slate-800/30 border-slate-700/50 hover:border-slate-600/50'
    }`}>
      {/* Checkbox */}
      <button
        onClick={handleToggle}
        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
          completed 
            ? 'bg-green-500 border-green-500 hover:bg-green-400 hover:border-green-400' 
            : 'border-slate-500 hover:border-blue-400 hover:bg-blue-400/10'
        }`}
      >
        {completed && <CheckCircle size={12} className="text-white" />}
      </button>
      
      {/* Task Content */}
      <div className="flex-1">
        <p className={`font-medium transition-all duration-200 ${
          completed 
            ? 'line-through text-slate-500' 
            : 'text-white'
        }`}>
          {task}
        </p>
        
        <div className="flex items-center gap-2 mt-1">
          <span className={`text-xs px-2 py-1 rounded-full ${priorityStyles[priority]}`}>
            {priority}
          </span>
          
          {completed && (
            <span className="text-xs text-green-400 font-medium">
              ✓ Completada
            </span>
          )}
        </div>
      </div>
      
      {/* Time Icon */}
      <Clock size={16} className={completed ? 'text-green-400' : 'text-slate-500'} />
    </div>
  )
}