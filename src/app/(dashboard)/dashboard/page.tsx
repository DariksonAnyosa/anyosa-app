'use client'

import { useState, useEffect } from 'react'
import { 
  CheckCircle, 
  Clock, 
  Target, 
  TrendingUp,
  Calendar,
  Flame,
  Trophy,
  Settings,
  BarChart3
} from 'lucide-react'
import Card from '@/components/ui/Card'
import StatsCard from '@/components/dashboard/StatsCard'
import DraggableTaskList from '@/components/dashboard/DraggableTaskList'
import AdvancedMetrics from '@/components/dashboard/AdvancedMetrics'
import TaskItem from '@/components/dashboard/TaskItem'
import { useAchievements } from '@/lib/hooks/useAchievements'
import { TaskStorage } from '@/lib/storage/taskStorage'

export default function DashboardPage() {
  const { stats, achievements, celebrateTaskCompletion, playClickSound } = useAchievements()
  const [tasks, setTasks] = useState<any[]>([])
  const [showAdvancedMetrics, setShowAdvancedMetrics] = useState(false)

  // Cargar tareas al inicializar
  useEffect(() => {
    const loadedData = TaskStorage.loadData()
    setTasks(loadedData.tasks)
  }, [])

  const handleTaskToggle = (taskId: string, taskName: string, completed: boolean) => {
    if (completed) {
      const completedTask = celebrateTaskCompletion(taskId, taskName)
      if (completedTask) {
        // Actualizar la lista local de tareas
        setTasks(prev => prev.map(task => 
          task.id === taskId 
            ? { ...task, completed: true, completedAt: new Date() }
            : task
        ))
      }
    } else {
      // Si se desmarca, solo actualizar localmente
      setTasks(prev => prev.map(task => 
        task.id === taskId 
          ? { ...task, completed: false, completedAt: undefined }
          : task
      ))
    }
  }

  const handleTaskReorder = (newTasks: any[]) => {
    setTasks(newTasks)
    console.log('🔄 Tareas reordenadas')
  }

  const metricsData = {
    ...stats,
    averageCompletionTime: 45,
    productivityScore: Math.min(85 + (stats.currentStreak * 2), 100),
    weeklyGoal: 15
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">
            🎯 Centro de Comando
          </h1>
          <p className="text-slate-400">
            Lunes, 25 de Mayo 2025 • Semana 21
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowAdvancedMetrics(!showAdvancedMetrics)}
            className={`px-4 py-2 rounded-lg border transition-all duration-200 flex items-center gap-2 ${
              showAdvancedMetrics 
                ? 'bg-blue-900/20 border-blue-500/50 text-blue-400' 
                : 'border-slate-600 text-slate-400 hover:border-slate-500'
            }`}
          >
            <BarChart3 size={16} />
            <span className="text-sm">Métricas Avanzadas</span>
          </button>
          
          <div className="px-4 py-2 bg-green-900/20 border border-green-800/30 rounded-lg">
            <span className="text-green-400 text-sm font-medium">🔥 {stats.currentStreak} días de racha</span>
          </div>
          
          <div className="px-4 py-2 bg-purple-900/20 border border-purple-800/30 rounded-lg">
            <span className="text-purple-400 text-sm font-medium">⚡ {stats.totalPoints} puntos</span>
          </div>
        </div>
      </div>

      {/* Métricas Avanzadas (Condicional) */}
      {showAdvancedMetrics && (
        <div className="space-y-6">
          <AdvancedMetrics stats={metricsData} />
        </div>
      )}

      {/* Stats Overview Básicas */}
      {!showAdvancedMetrics && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <StatsCard value={stats.tasksCompleted.toString()} label="Tareas Completadas" color="blue" />
          <StatsCard value="4" label="Proyectos Activos" color="green" />
          <StatsCard value={`${stats.weeklyProgress}%`} label="Progreso Semanal" color="purple" />
          <StatsCard value={tasks.filter(t => !t.completed).length.toString()} label="Tareas Pendientes" color="yellow" />
        </div>
      )}

      {/* Logros Recientes */}
      {achievements.length > 0 && (
        <div className="mb-8">
          <Card>
            <div className="flex items-center gap-3 mb-4">
              <Trophy className="text-yellow-400" size={24} />
              <h2 className="text-xl font-bold text-white">🏆 Logros Recientes</h2>
            </div>
            
            <div className="space-y-3">
              {achievements.slice(0, 3).map((achievement) => (
                <div key={achievement.id} className="flex items-center gap-4 p-3 bg-gradient-to-r from-yellow-900/20 to-yellow-800/10 border border-yellow-800/30 rounded-lg bounce-in">
                  <div className="text-2xl">{achievement.icon}</div>
                  <div className="flex-1">
                    <div className="font-semibold text-yellow-400">{achievement.title}</div>
                    <div className="text-sm text-slate-400">{achievement.description}</div>
                  </div>
                  <div className="text-xs text-slate-500">
                    {achievement.timestamp.toLocaleTimeString()}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Misiones de Hoy */}
        <div className="lg:col-span-2">
          <Card>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <Target className="text-blue-400" size={24} />
                <h2 className="text-xl font-bold text-white">Misiones de Hoy</h2>
              </div>
              <button 
                onClick={() => window.location.href = '/nueva-mision'}
                className="text-blue-400 hover:text-blue-300 text-sm font-medium hover:underline"
              >
                + Agregar nueva
              </button>
            </div>
            
            {tasks.length === 0 ? (
              <div className="text-center py-8 text-slate-400">
                <Target size={48} className="mx-auto mb-4 opacity-50" />
                <p className="mb-2">No hay tareas para hoy</p>
                <button 
                  onClick={() => window.location.href = '/nueva-mision'}
                  className="text-blue-400 hover:text-blue-300 underline"
                >
                  Crear tu primera misión
                </button>
              </div>
            ) : (
              // Si DraggableTaskList no funciona, usar TaskItem normal
              <div className="space-y-4">
                {tasks.map((task) => (
                  <TaskItem
                    key={task.id}
                    id={task.id}
                    task={task.title}
                    priority={task.priority}
                    initialCompleted={task.completed}
                    onToggle={handleTaskToggle}
                    onSound={playClickSound}
                  />
                ))}
              </div>
            )}
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Progreso Semanal */}
          <Card>
            <div className="flex items-center gap-3 mb-4">
              <TrendingUp className="text-purple-400" size={20} />
              <h3 className="font-bold text-white">Progreso Semanal</h3>
            </div>
            
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-slate-400">Tareas Completadas</span>
                  <span className="text-purple-400 font-medium">{stats.tasksCompleted}/15</span>
                </div>
                <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-purple-500 to-blue-500 rounded-full transition-all duration-1000"
                    style={{ width: `${Math.min((stats.tasksCompleted / 15) * 100, 100)}%` }}
                  ></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-slate-400">Hábitos Diarios</span>
                  <span className="text-green-400 font-medium">6/7</span>
                </div>
                <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                  <div className="h-full w-5/6 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full"></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-slate-400">Puntos Esta Semana</span>
                  <span className="text-yellow-400 font-medium">{stats.totalPoints}</span>
                </div>
                <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full transition-all duration-1000"
                    style={{ width: `${Math.min((stats.totalPoints / 500) * 100, 100)}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </Card>

          {/* Proyectos en Fuego */}
          <Card>
            <div className="flex items-center gap-3 mb-4">
              <Flame className="text-orange-400" size={20} />
              <h3 className="font-bold text-white">En Fuego 🔥</h3>
            </div>
            
            <div className="space-y-3">
              {[
                { name: 'ANYOSA-APP', progress: 85, color: 'blue', tasks: tasks.filter(t => t.title.includes('ANYOSA')).length },
                { name: 'Renova Q2', progress: 65, color: 'orange', tasks: tasks.filter(t => t.title.includes('Renova')).length },
                { name: 'SIGE v2.0', progress: 40, color: 'green', tasks: tasks.filter(t => t.title.includes('SIGE')).length },
              ].map((project, index) => (
                <div key={index} className="p-3 bg-slate-800/30 rounded-lg hover-lift cursor-pointer">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-white">{project.name}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-slate-400">{project.tasks} tareas</span>
                      <span className="text-xs text-slate-400">{project.progress}%</span>
                    </div>
                  </div>
                  <div className="h-1.5 bg-slate-700 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full transition-all duration-1000 ${
                        project.color === 'blue' 
                          ? 'bg-gradient-to-r from-blue-500 to-cyan-500'
                          : project.color === 'orange'
                          ? 'bg-gradient-to-r from-orange-500 to-red-500'
                          : 'bg-gradient-to-r from-green-500 to-emerald-500'
                      }`}
                      style={{ width: `${project.progress}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Próximas Citas */}
          <Card>
            <div className="flex items-center gap-3 mb-4">
              <Calendar className="text-blue-400" size={20} />
              <h3 className="font-bold text-white">Próximas Citas</h3>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-2 hover:bg-slate-800/30 rounded-lg transition-colors">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-white">Reunión Renova</p>
                  <p className="text-xs text-slate-400">Hoy 15:00 • En 2 horas</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-2 hover:bg-slate-800/30 rounded-lg transition-colors">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-white">Code Review</p>
                  <p className="text-xs text-slate-400">Mañana 10:00</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-2 hover:bg-slate-800/30 rounded-lg transition-colors">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-white">Sesión Inglés</p>
                  <p className="text-xs text-slate-400">Miércoles 18:00</p>
                </div>
              </div>
            </div>
          </Card>

          {/* Quick Actions */}
          <Card>
            <div className="flex items-center gap-3 mb-4">
              <Settings className="text-slate-400" size={20} />
              <h3 className="font-bold text-white">Acciones Rápidas</h3>
            </div>
            
            <div className="space-y-2">
              <button 
                onClick={() => window.location.href = '/nueva-mision'}
                className="w-full text-left p-3 bg-blue-900/20 border border-blue-800/30 rounded-lg hover:bg-blue-900/30 transition-colors text-blue-400"
              >
                <div className="font-medium">➕ Nueva Misión</div>
                <div className="text-xs text-blue-400/70">Crear objetivo rápido</div>
              </button>
              
              <button 
                onClick={() => {
                  const completedCount = tasks.filter(t => t.completed).length
                  alert(`🎯 Progreso del día:\n✅ ${completedCount} tareas completadas\n⚡ ${stats.totalPoints} puntos ganados\n🔥 ${stats.currentStreak} días de racha`)
                }}
                className="w-full text-left p-3 bg-green-900/20 border border-green-800/30 rounded-lg hover:bg-green-900/30 transition-colors text-green-400"
              >
                <div className="font-medium">📊 Resumen Diario</div>
                <div className="text-xs text-green-400/70">Ver progreso de hoy</div>
              </button>
              
              <button 
                onClick={() => {
                  const data = TaskStorage.loadData()
                  console.log('📁 Backup de datos:', data)
                  alert('💾 Datos exportados a la consola (F12)')
                }}
                className="w-full text-left p-3 bg-purple-900/20 border border-purple-800/30 rounded-lg hover:bg-purple-900/30 transition-colors text-purple-400"
              >
                <div className="font-medium">💾 Exportar Datos</div>
                <div className="text-xs text-purple-400/70">Backup en consola</div>
              </button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}