'use client'

import { useEffect, useState } from 'react'
import { 
  TrendingUp, 
  Target, 
  Zap, 
  Calendar,
  Clock,
  Award,
  Activity
} from 'lucide-react'
import Card from '../ui/Card'
import CircularProgress from '../ui/CircularProgress'

interface MetricsData {
  tasksCompleted: number
  totalPoints: number
  weeklyProgress: number
  currentStreak: number
  averageCompletionTime: number
  productivityScore: number
  weeklyGoal: number
}

interface AdvancedMetricsProps {
  stats: MetricsData
}

export default function AdvancedMetrics({ stats }: AdvancedMetricsProps) {
  const [animatedStats, setAnimatedStats] = useState({
    tasksCompleted: 0,
    totalPoints: 0,
    weeklyProgress: 0,
    currentStreak: 0,
    productivityScore: 0
  })

  // Animar números
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedStats({
        tasksCompleted: stats.tasksCompleted,
        totalPoints: stats.totalPoints,
        weeklyProgress: stats.weeklyProgress,
        currentStreak: stats.currentStreak,
        productivityScore: stats.productivityScore || 85
      })
    }, 300)

    return () => clearTimeout(timer)
  }, [stats])

  // Calcular métricas derivadas
  const completionRate = Math.round((stats.tasksCompleted / (stats.weeklyGoal || 15)) * 100)
  const pointsPerTask = Math.round(stats.totalPoints / Math.max(stats.tasksCompleted, 1))
  const streakBonus = Math.min(stats.currentStreak * 5, 50)

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {/* Progreso Semanal Circular */}
      <Card>
        <div className="text-center">
          <CircularProgress
            percentage={animatedStats.weeklyProgress}
            size={100}
            color="#8b5cf6"
            label="Semanal"
          />
          <div className="mt-3">
            <div className="text-sm text-slate-400">Progreso de la Semana</div>
            <div className="text-xs text-purple-400 mt-1">
              {stats.tasksCompleted}/{stats.weeklyGoal || 15} tareas
            </div>
          </div>
        </div>
      </Card>

      {/* Score de Productividad */}
      <Card>
        <div className="text-center">
          <CircularProgress
            percentage={animatedStats.productivityScore}
            size={100}
            color="#10b981"
            label="Score"
          />
          <div className="mt-3">
            <div className="text-sm text-slate-400">Productividad</div>
            <div className="flex items-center justify-center gap-2 mt-1">
              <TrendingUp size={12} className="text-green-400" />
              <span className="text-xs text-green-400">+{streakBonus}% bonus</span>
            </div>
          </div>
        </div>
      </Card>

      {/* Métricas de Rendimiento */}
      <Card>
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Target className="text-blue-400" size={20} />
            <div>
              <div className="text-sm text-slate-400">Tasa de Completado</div>
              <div className="text-lg font-bold text-blue-400">{completionRate}%</div>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <Zap className="text-yellow-400" size={20} />
            <div>
              <div className="text-sm text-slate-400">Puntos por Tarea</div>
              <div className="text-lg font-bold text-yellow-400">{pointsPerTask}</div>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <Award className="text-purple-400" size={20} />
            <div>
              <div className="text-sm text-slate-400">Racha Actual</div>
              <div className="text-lg font-bold text-purple-400">{animatedStats.currentStreak} días</div>
            </div>
          </div>
        </div>
      </Card>

      {/* Estadísticas de Tiempo */}
      <Card>
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Clock className="text-cyan-400" size={20} />
            <div>
              <div className="text-sm text-slate-400">Tiempo Promedio</div>
              <div className="text-lg font-bold text-cyan-400">
                {stats.averageCompletionTime || 45}min
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <Calendar className="text-green-400" size={20} />
            <div>
              <div className="text-sm text-slate-400">Esta Semana</div>
              <div className="text-lg font-bold text-green-400">{animatedStats.tasksCompleted}</div>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <Activity className="text-orange-400" size={20} />
            <div>
              <div className="text-sm text-slate-400">Total Puntos</div>
              <div className="text-lg font-bold text-orange-400">{animatedStats.totalPoints}</div>
            </div>
          </div>
        </div>
      </Card>

      {/* Gráfico de Progreso Semanal */}
      <div className="md:col-span-2 lg:col-span-4">
        <Card>
          <div className="flex items-center gap-3 mb-6">
            <TrendingUp className="text-blue-400" size={24} />
            <h3 className="text-xl font-bold text-white">Progreso de la Semana</h3>
          </div>
          
          <div className="space-y-4">
            {/* Progreso Diario Simulado */}
            {[
              { day: 'Lun', completed: 3, goal: 2 },
              { day: 'Mar', completed: 2, goal: 2 },
              { day: 'Mié', completed: 4, goal: 2 },
              { day: 'Jue', completed: 1, goal: 2 },
              { day: 'Vie', completed: 2, goal: 2 },
              { day: 'Sáb', completed: 0, goal: 1 },
              { day: 'Dom', completed: 0, goal: 1 }
            ].map((dayData, index) => (
              <div key={dayData.day} className="flex items-center gap-4">
                <div className="w-12 text-sm text-slate-400">{dayData.day}</div>
                
                <div className="flex-1 flex items-center gap-2">
                  <div className="flex-1 h-6 bg-slate-800 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full transition-all duration-1000 delay-${index * 100} ${
                        dayData.completed >= dayData.goal 
                          ? 'bg-gradient-to-r from-green-500 to-emerald-500' 
                          : dayData.completed > 0
                          ? 'bg-gradient-to-r from-yellow-500 to-orange-500'
                          : 'bg-slate-700'
                      }`}
                      style={{ 
                        width: `${Math.min((dayData.completed / dayData.goal) * 100, 100)}%` 
                      }}
                    />
                  </div>
                  
                  <div className="text-sm text-slate-400 w-16">
                    {dayData.completed}/{dayData.goal}
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-6 p-4 bg-slate-800/30 rounded-lg">
            <div className="text-sm text-slate-400 mb-2">Resumen Semanal</div>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-lg font-bold text-green-400">12</div>
                <div className="text-xs text-slate-500">Completadas</div>
              </div>
              <div>
                <div className="text-lg font-bold text-blue-400">85%</div>
                <div className="text-xs text-slate-500">Tasa de Éxito</div>
              </div>
              <div>
                <div className="text-lg font-bold text-purple-400">+50</div>
                <div className="text-xs text-slate-500">Puntos Bonus</div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}