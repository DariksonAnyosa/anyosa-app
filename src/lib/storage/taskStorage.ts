interface Task {
  id: string
  title: string
  priority: 'alta' | 'media' | 'baja'
  completed: boolean
  createdAt: Date
  completedAt?: Date
  category: string
  points: number
}

interface AppData {
  tasks: Task[]
  stats: {
    tasksCompleted: number
    currentStreak: number
    weeklyProgress: number
    totalPoints: number
    lastActiveDate: string
  }
  achievements: Array<{
    id: string
    title: string
    description: string
    icon: string
    unlockedAt: Date
  }>
}

const STORAGE_KEY = 'anyosa-app-data'

export class TaskStorage {
  private static getInitialData(): AppData {
    return {
      tasks: [
        {
          id: '1',
          title: 'Completar feature de autenticación en ANYOSA-APP',
          priority: 'alta',
          completed: false,
          createdAt: new Date(),
          category: 'tecnico',
          points: 15
        },
        {
          id: '2',
          title: 'Revisar propuesta comercial Renova Q2',
          priority: 'media',
          completed: true,
          createdAt: new Date(Date.now() - 86400000), // 1 día atrás
          completedAt: new Date(),
          category: 'proyecto',
          points: 10
        },
        {
          id: '3',
          title: 'Actualizar documentación técnica SIGE', 
          priority: 'baja',
          completed: false,
          createdAt: new Date(),
          category: 'tecnico',
          points: 8
        },
        {
          id: '4',
          title: 'Session de inglés - Business vocabulary',
          priority: 'alta',
          completed: false,
          createdAt: new Date(),
          category: 'personal',
          points: 12
        }
      ],
      stats: {
        tasksCompleted: 12,
        currentStreak: 7,
        weeklyProgress: 85,
        totalPoints: 340,
        lastActiveDate: new Date().toISOString()
      },
      achievements: []
    }
  }

  static loadData(): AppData {
    if (typeof window === 'undefined') {
      return this.getInitialData()
    }

    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (!stored) {
        const initialData = this.getInitialData()
        this.saveData(initialData)
        return initialData
      }

      const parsed = JSON.parse(stored)
      
      // Convertir strings de fecha de vuelta a objetos Date
      parsed.tasks = parsed.tasks.map((task: any) => ({
        ...task,
        createdAt: new Date(task.createdAt),
        completedAt: task.completedAt ? new Date(task.completedAt) : undefined
      }))

      parsed.achievements = parsed.achievements.map((achievement: any) => ({
        ...achievement,
        unlockedAt: new Date(achievement.unlockedAt)
      }))

      return parsed
    } catch (error) {
      console.error('Error loading data:', error)
      return this.getInitialData()
    }
  }

  static saveData(data: AppData): void {
    if (typeof window === 'undefined') return

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
    } catch (error) {
      console.error('Error saving data:', error)
    }
  }

  static completeTask(taskId: string): Task | null {
    const data = this.loadData()
    const task = data.tasks.find(t => t.id === taskId)
    
    if (!task || task.completed) return null

    task.completed = true
    task.completedAt = new Date()
    
    // Actualizar estadísticas
    data.stats.tasksCompleted += 1
    data.stats.totalPoints += task.points
    data.stats.weeklyProgress = Math.min(100, data.stats.weeklyProgress + 2)
    data.stats.lastActiveDate = new Date().toISOString()

    this.saveData(data)
    return task
  }

  static addTask(taskData: Omit<Task, 'id' | 'createdAt'>): Task {
    const data = this.loadData()
    
    const newTask: Task = {
      ...taskData,
      id: Date.now().toString(),
      createdAt: new Date()
    }

    data.tasks.unshift(newTask) // Agregar al inicio
    this.saveData(data)
    
    return newTask
  }

  static deleteTask(taskId: string): boolean {
    const data = this.loadData()
    const initialLength = data.tasks.length
    
    data.tasks = data.tasks.filter(t => t.id !== taskId)
    
    if (data.tasks.length < initialLength) {
      this.saveData(data)
      return true
    }
    
    return false
  }

  static addAchievement(achievement: Omit<AppData['achievements'][0], 'unlockedAt'>): void {
    const data = this.loadData()
    
    const newAchievement = {
      ...achievement,
      unlockedAt: new Date()
    }
    
    data.achievements.unshift(newAchievement)
    this.saveData(data)
  }

  static getTasksForToday(): Task[] {
    const data = this.loadData()
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    
    return data.tasks.filter(task => {
      const taskDate = new Date(task.createdAt)
      taskDate.setHours(0, 0, 0, 0)
      return taskDate.getTime() === today.getTime()
    })
  }

  static getStats() {
    const data = this.loadData()
    return data.stats
  }

  static getAchievements() {
    const data = this.loadData()
    return data.achievements
  }
}