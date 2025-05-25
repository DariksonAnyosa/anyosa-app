'use client'

import { useState } from 'react'
import { 
  Target, 
  Calendar, 
  Flag, 
  Zap, 
  CheckCircle, 
  Clock,
  ArrowRight
} from 'lucide-react'
import Card from '../ui/Card'
import { TaskStorage } from '@/lib/storage/taskStorage'
import { CelebrationSounds } from '@/lib/audio/celebrationSounds'

export default function NewMissionForm() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'semanal',
    priority: 'media' as 'alta' | 'media' | 'baja',
    deadline: '',
    impact: ''
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.title.trim()) {
      alert('⚠️ El título es obligatorio')
      return
    }

    setIsSubmitting(true)
    
    try {
      // Calcular puntos según prioridad
      const points = formData.priority === 'alta' ? 15 : formData.priority === 'media' ? 10 : 8

      // Crear nueva tarea
      const newTask = TaskStorage.addTask({
        title: formData.title,
        priority: formData.priority,
        completed: false,
        category: formData.category,
        points
      })

      // Sonido de éxito
      CelebrationSounds.playTaskComplete()
      
      // Mostrar notificación de éxito
      showSuccessNotification(newTask.title, points)

      console.log(`
      🎯 ¡NUEVA MISIÓN CREADA!
      📝 Título: ${newTask.title}
      ⚡ Puntos: ${points}
      🔥 Prioridad: ${formData.priority}
      📅 Creada: ${new Date().toLocaleString()}
      `)

      // Resetear formulario
      setFormData({
        title: '',
        description: '',
        category: 'semanal',
        priority: 'media',
        deadline: '',
        impact: ''
      })

      // Redirigir al dashboard después de un breve delay
      setTimeout(() => {
        window.location.href = '/dashboard'
      }, 1500)

    } catch (error) {
      console.error('Error creando misión:', error)
      alert('❌ Error al crear la misión. Inténtalo de nuevo.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const showSuccessNotification = (title: string, points: number) => {
    if (typeof window !== 'undefined') {
      const notification = document.createElement('div')
      notification.innerHTML = `
        <div style="
          position: fixed;
          top: 20px;
          right: 20px;
          background: linear-gradient(135deg, #1e293b 0%, #334155 100%);
          border: 2px solid #10b981;
          color: white;
          padding: 20px;
          border-radius: 16px;
          box-shadow: 0 20px 40px rgba(0,0,0,0.4);
          z-index: 9999;
          animation: slideInBounce 0.5s ease-out;
          max-width: 320px;
        ">
          <div style="font-weight: bold; margin-bottom: 8px; font-size: 16px; color: #10b981;">
            🎯 ¡Misión Creada con Éxito!
          </div>
          <div style="font-size: 14px; color: #94a3b8; line-height: 1.4; margin-bottom: 8px;">
            "${title}"
          </div>
          <div style="
            padding: 8px 12px;
            background: rgba(16, 185, 129, 0.1);
            border-radius: 8px;
            font-size: 12px;
            color: #10b981;
            text-align: center;
          ">
            ⚡ Valdrá ${points} puntos al completarse
          </div>
        </div>
      `
      
      document.body.appendChild(notification)
      
      setTimeout(() => {
        if (notification.parentNode) {
          notification.style.animation = 'slideOutRight 0.3s ease-in forwards'
          setTimeout(() => {
            if (notification.parentNode) {
              notification.parentNode.removeChild(notification)
            }
          }, 300)
        }
      }, 3000)
    }
  }

  const categories = [
    { id: 'semanal', label: 'Objetivo Semanal', icon: Target, color: 'blue' },
    { id: 'proyecto', label: 'Proyecto', icon: Zap, color: 'orange' },
    { id: 'tecnico', label: 'Técnico', icon: CheckCircle, color: 'green' },
    { id: 'personal', label: 'Personal', icon: Clock, color: 'purple' }
  ]

  return (
    <Card>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Título */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Título de la Misión *
          </label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            placeholder="Ej: Completar sistema de autenticación en ANYOSA-APP"
            className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
            disabled={isSubmitting}
          />
        </div>

        {/* Descripción */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Descripción & Contexto
          </label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="¿Qué específicamente vas a hacer? ¿Por qué es importante?"
            rows={3}
            className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            disabled={isSubmitting}
          />
        </div>

        {/* Categoría */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-3">
            Categoría
          </label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {categories.map((category) => {
              const Icon = category.icon
              const isSelected = formData.category === category.id
              
              return (
                <button
                  key={category.id}
                  type="button"
                  onClick={() => setFormData({ ...formData, category: category.id })}
                  disabled={isSubmitting}
                  className={`p-3 rounded-lg border transition-all duration-200 text-left disabled:opacity-50 ${
                    isSelected
                      ? `bg-${category.color}-900/30 border-${category.color}-500/50`
                      : 'bg-slate-800/50 border-slate-700 hover:border-slate-600'
                  }`}
                >
                  <Icon 
                    size={20} 
                    className={`mb-2 ${
                      isSelected 
                        ? `text-${category.color}-400` 
                        : 'text-slate-400'
                    }`} 
                  />
                  <div className={`text-sm font-medium ${
                    isSelected ? 'text-white' : 'text-slate-300'
                  }`}>
                    {category.label}
                  </div>
                </button>
              )
            })}
          </div>
        </div>

        {/* Prioridad y Fecha */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Prioridad
            </label>
            <select
              value={formData.priority}
              onChange={(e) => setFormData({ ...formData, priority: e.target.value as 'alta' | 'media' | 'baja' })}
              className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              disabled={isSubmitting}
            >
              <option value="baja">🟢 Baja - Cuando tengas tiempo (8 pts)</option>
              <option value="media">🟡 Media - Esta semana (10 pts)</option>
              <option value="alta">🔴 Alta - Urgente (15 pts)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Fecha Límite
            </label>
            <input
              type="date"
              value={formData.deadline}
              onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
              className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              disabled={isSubmitting}
            />
          </div>
        </div>

        {/* Impacto */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            ¿Qué logras al completar esto? (Opcional)
          </label>
          <input
            type="text"
            value={formData.impact}
            onChange={(e) => setFormData({ ...formData, impact: e.target.value })}
            placeholder="Ej: Los usuarios podrán registrarse y usar la app de forma segura"
            className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            disabled={isSubmitting}
          />
        </div>

        {/* Botones */}
        <div className="flex gap-4 pt-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-slate-600 disabled:to-slate-700 px-6 py-3 rounded-lg font-semibold text-white transition-all duration-200 hover-lift flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full"></div>
                Creando...
              </>
            ) : (
              <>
                Crear Misión
                <ArrowRight size={20} />
              </>
            )}
          </button>
          
          <button
            type="button"
            onClick={() => window.location.href = '/dashboard'}
            disabled={isSubmitting}
            className="px-6 py-3 border border-slate-600 hover:border-slate-500 disabled:border-slate-700 rounded-lg font-medium text-slate-300 hover:text-white disabled:text-slate-500 transition-all duration-200"
          >
            Cancelar
          </button>
        </div>
      </form>
    </Card>
  )
}