'use client'

import { useState, useRef } from 'react'
import TaskItem from './TaskItem'
import { GripVertical, ArrowUp, ArrowDown } from 'lucide-react'

interface Task {
  id: string
  title: string
  priority: 'alta' | 'media' | 'baja'
  completed: boolean
  points: number
}

interface DraggableTaskListProps {
  tasks: Task[]
  onTaskToggle: (taskId: string, taskName: string, completed: boolean) => void
  onTaskReorder: (tasks: Task[]) => void
  onSound: () => void
}

export default function DraggableTaskList({ 
  tasks, 
  onTaskToggle, 
  onTaskReorder,
  onSound 
}: DraggableTaskListProps) {
  const [draggedTask, setDraggedTask] = useState<string | null>(null)
  const [draggedOver, setDraggedOver] = useState<string | null>(null)
  const dragCounter = useRef(0)

  const handleDragStart = (e: React.DragEvent, taskId: string) => {
    setDraggedTask(taskId)
    e.dataTransfer.effectAllowed = 'move'
    e.dataTransfer.setData('text/html', taskId)
    onSound()
  }

  const handleDragEnd = () => {
    setDraggedTask(null)
    setDraggedOver(null)
    dragCounter.current = 0
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
  }

  const handleDragEnter = (e: React.DragEvent, taskId: string) => {
    e.preventDefault()
    dragCounter.current++
    setDraggedOver(taskId)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    dragCounter.current--
    if (dragCounter.current === 0) {
      setDraggedOver(null)
    }
  }

  const handleDrop = (e: React.DragEvent, dropTaskId: string) => {
    e.preventDefault()
    
    if (!draggedTask || draggedTask === dropTaskId) {
      return
    }

    const draggedIndex = tasks.findIndex(t => t.id === draggedTask)
    const dropIndex = tasks.findIndex(t => t.id === dropTaskId)

    if (draggedIndex === -1 || dropIndex === -1) return

    const newTasks = [...tasks]
    const [removed] = newTasks.splice(draggedIndex, 1)
    newTasks.splice(dropIndex, 0, removed)

    onTaskReorder(newTasks)
    onSound()
    
    console.log(`🔄 Tarea reordenada: ${removed.title}`)
  }

  const moveTasks = (taskId: string, direction: 'up' | 'down') => {
    const currentIndex = tasks.findIndex(t => t.id === taskId)
    if (currentIndex === -1) return

    const newIndex = direction === 'up' 
      ? Math.max(0, currentIndex - 1)
      : Math.min(tasks.length - 1, currentIndex + 1)

    if (currentIndex === newIndex) return

    const newTasks = [...tasks]
    const [task] = newTasks.splice(currentIndex, 1)
    newTasks.splice(newIndex, 0, task)

    onTaskReorder(newTasks)
    onSound()
  }

  return (
    <div className="space-y-4">
      {tasks.map((task, index) => (
        <div
          key={task.id}
          draggable
          onDragStart={(e) => handleDragStart(e, task.id)}
          onDragEnd={handleDragEnd}
          onDragOver={handleDragOver}
          onDragEnter={(e) => handleDragEnter(e, task.id)}
          onDragLeave={handleDragLeave}
          onDrop={(e) => handleDrop(e, task.id)}
          className={`group relative transition-all duration-200 ${
            draggedTask === task.id 
              ? 'opacity-50 scale-95 rotate-2' 
              : draggedOver === task.id
              ? 'scale-102 border-blue-400'
              : ''
          }`}
        >
          {/* Drop Indicator */}
          {draggedOver === task.id && draggedTask !== task.id && (
            <div className="absolute -top-2 left-0 right-0 h-1 bg-blue-400 rounded-full animate-pulse z-10" />
          )}

          <div className="relative flex items-center gap-3">
            {/* Drag Handle */}
            <div className="flex flex-col items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity cursor-grab active:cursor-grabbing">
              <button
                onClick={() => moveTasks(task.id, 'up')}
                disabled={index === 0}
                className="p-1 hover:bg-slate-700 rounded disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <ArrowUp size={12} className="text-slate-400" />
              </button>
              
              <GripVertical size={16} className="text-slate-500" />
              
              <button
                onClick={() => moveTasks(task.id, 'down')}
                disabled={index === tasks.length - 1}
                className="p-1 hover:bg-slate-700 rounded disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <ArrowDown size={12} className="text-slate-400" />
              </button>
            </div>

            {/* Task Item */}
            <div className="flex-1">
              <TaskItem
                id={task.id}
                task={task.title}
                priority={task.priority}
                initialCompleted={task.completed}
                onToggle={onTaskToggle}
                onSound={onSound}
              />
            </div>

            {/* Priority Badge */}
            <div className={`px-2 py-1 text-xs rounded-full font-medium ${
              task.priority === 'alta' 
                ? 'bg-red-900/30 text-red-400 border border-red-800/30'
                : task.priority === 'media'
                ? 'bg-yellow-900/30 text-yellow-400 border border-yellow-800/30'
                : 'bg-slate-700/30 text-slate-400 border border-slate-600/30'
            }`}>
              {task.points}pts
            </div>
          </div>
        </div>
      ))}

      {/* Drop Zone at Bottom */}
      {draggedTask && (
        <div 
          onDragOver={handleDragOver}
          onDrop={(e) => {
            e.preventDefault()
            if (draggedTask && tasks.length > 0) {
              handleDrop(e, tasks[tasks.length - 1].id)
            }
          }}
          className="h-16 border-2 border-dashed border-slate-600 rounded-lg flex items-center justify-center text-slate-400 hover:border-blue-400 hover:text-blue-400 transition-colors"
        >
          <span className="text-sm">Soltar aquí para mover al final</span>
        </div>
      )}

      {/* Instructions */}
      <div className="text-center text-xs text-slate-500 mt-4">
        💡 Arrastra las tareas para reorganizar o usa las flechas
      </div>
    </div>
  )
}