'use client'

import { useState, useCallback, useEffect } from 'react'
import { TaskStorage } from '@/lib/storage/taskStorage'
import { CelebrationSounds } from '@/lib/audio/celebrationSounds'

interface Achievement {
  id: string
  title: string
  description: string
  icon: string
  color: string
  timestamp: Date
}

interface Stats {
  tasksCompleted: number
  currentStreak: number
  weeklyProgress: number
  totalPoints: number
}

export function useAchievements() {
  const [stats, setStats] = useState<Stats>({
    tasksCompleted: 0,
    currentStreak: 0,
    weeklyProgress: 0,
    totalPoints: 0
  })

  const [achievements, setAchievements] = useState<Achievement[]>([])

  // Cargar datos al inicializar
  useEffect(() => {
    const loadedStats = TaskStorage.getStats()
    const loadedAchievements = TaskStorage.getAchievements()
    
    setStats(loadedStats)
    setAchievements(loadedAchievements.map(a => ({
      ...a,
      color: 'text-yellow-400',
      timestamp: a.unlockedAt
    })))
  }, [])

  const celebrateTaskCompletion = useCallback((taskId: string, taskName: string) => {
    // Completar tarea en storage
    const completedTask = TaskStorage.completeTask(taskId)
    if (!completedTask) return

    // Reproducir sonido de celebración
    CelebrationSounds.playTaskComplete()

    // Actualizar stats localmente
    const newStats = TaskStorage.getStats()
    setStats(newStats)

    // Verificar logros
    const newAchievements: Achievement[] = []
    
    // Logro: Cada 5 tareas
    if (newStats.tasksCompleted % 5 === 0) {
      const achievement = {
        id: `milestone-${Date.now()}`,
        title: '🎯 ¡Milestone Conquistado!',
        description: `Has completado ${newStats.tasksCompleted} tareas`,
        icon: '🏆'
      }
      
      TaskStorage.addAchievement(achievement)
      newAchievements.push({
        ...achievement,
        color: 'text-yellow-400',
        timestamp: new Date()
      })
      
      CelebrationSounds.playAchievementUnlocked()
    }

    // Logro: Héroe semanal
    if (newStats.tasksCompleted === 15) {
      const achievement = {
        id: `weekly-hero-${Date.now()}`,
        title: '👑 Héroe Semanal',
        description: 'Completaste 15 tareas esta semana',
        icon: '👑'
      }
      
      TaskStorage.addAchievement(achievement)
      newAchievements.push({
        ...achievement,
        color: 'text-purple-400',
        timestamp: new Date()
      })
      
      CelebrationSounds.playAchievementUnlocked()
    }

    // Logro: Master de productividad
    if (newStats.tasksCompleted === 25) {
      const achievement = {
        id: `productivity-master-${Date.now()}`,
        title: '⚡ Master de Productividad',
        description: '25 tareas completadas - ¡Eres imparable!',
        icon: '⚡'
      }
      
      TaskStorage.addAchievement(achievement)
      newAchievements.push({
        ...achievement,
        color: 'text-blue-400',
        timestamp: new Date()
      })
      
      CelebrationSounds.playStreakBonus()
    }

    // Actualizar achievements localmente
    if (newAchievements.length > 0) {
      setAchievements(prev => [...newAchievements, ...prev])
      
      // Mostrar notificación
      newAchievements.forEach(achievement => {
        showNotification(achievement)
      })
    }

    // Celebración en consola con más estilo
    console.log(`
    🎉 ¡VICTORIA ÉPICA! 
    ✅ Tarea: ${taskName}
    💪 Total completadas: ${newStats.tasksCompleted}
    ⚡ Puntos ganados: +${completedTask.points}
    🏆 Total puntos: ${newStats.totalPoints}
    📈 Progreso semanal: ${newStats.weeklyProgress}%
    `)

    return completedTask
  }, [])

  const showNotification = (achievement: Achievement) => {
    console.log(`🏆 NUEVO LOGRO DESBLOQUEADO: ${achievement.title}`)
    console.log(`📝 ${achievement.description}`)
    
    // Notificación visual mejorada
    if (typeof window !== 'undefined') {
      const notification = document.createElement('div')
      notification.innerHTML = `
        <div style="
          position: fixed;
          top: 20px;
          right: 20px;
          background: linear-gradient(135deg, #1e293b 0%, #334155 100%);
          border: 2px solid #fbbf24;
          color: white;
          padding: 20px;
          border-radius: 16px;
          box-shadow: 0 20px 40px rgba(0,0,0,0.4);
          z-index: 9999;
          animation: slideInBounce 0.5s ease-out;
          max-width: 300px;
        ">
          <div style="font-weight: bold; margin-bottom: 8px; font-size: 16px; color: #fbbf24;">
            ${achievement.icon} ${achievement.title}
          </div>
          <div style="font-size: 14px; color: #94a3b8; line-height: 1.4;">
            ${achievement.description}
          </div>
          <div style="
            margin-top: 12px;
            padding: 8px 12px;
            background: rgba(251, 191, 36, 0.1);
            border-radius: 8px;
            font-size: 12px;
            color: #fbbf24;
            text-align: center;
          ">
            🎉 ¡Logro desbloqueado!
          </div>
        </div>
      `
      
      // Agregar estilos de animación
      const style = document.createElement('style')
      style.textContent = `
        @keyframes slideInBounce {
          0% {
            transform: translateX(100%) scale(0.8);
            opacity: 0;
          }
          60% {
            transform: translateX(-10px) scale(1.05);
            opacity: 1;
          }
          100% {
            transform: translateX(0) scale(1);
            opacity: 1;
          }
        }
      `
      document.head.appendChild(style)
      document.body.appendChild(notification)
      
      // Remover después de 4 segundos con animación de salida
      setTimeout(() => {
        if (notification.parentNode) {
          notification.style.animation = 'slideOutRight 0.3s ease-in forwards'
          setTimeout(() => {
            if (notification.parentNode) {
              notification.parentNode.removeChild(notification)
            }
            if (style.parentNode) {
              style.parentNode.removeChild(style)
            }
          }, 300)
        }
      }, 4000)
    }
  }

  const playClickSound = useCallback(() => {
    CelebrationSounds.playClick()
  }, [])

  return {
    stats,
    achievements,
    celebrateTaskCompletion,
    playClickSound
  }
}