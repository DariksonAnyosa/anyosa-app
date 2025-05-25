'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  Target, 
  Zap, 
  Lightbulb, 
  Code, 
  Brain, 
  Trophy, 
  LayoutDashboard,
  Home,
  Settings,
  Plus
} from 'lucide-react'
import { clsx } from 'clsx'

const sidebarItems = [
  {
    label: 'Inicio',
    href: '/',
    icon: Home,
    color: 'text-slate-400'
  },
  {
    label: 'Dashboard',
    href: '/dashboard',
    icon: LayoutDashboard,
    color: 'text-blue-400'
  },
  {
    label: 'Nueva Misión',
    href: '/nueva-mision',
    icon: Plus,
    color: 'text-green-400'
  },
  {
    label: 'Misión Semanal',
    href: '/missions',
    icon: Target,
    color: 'text-blue-400'
  },
  {
    label: 'Proyectos en Fuego',
    href: '/projects',
    icon: Zap,
    color: 'text-orange-400'
  },
  {
    label: 'Ideas que Valen Oro',
    href: '/ideas',
    icon: Lightbulb,
    color: 'text-yellow-400'
  },
  {
    label: 'Código & Técnico',
    href: '/coding',
    icon: Code,
    color: 'text-green-400'
  },
  {
    label: 'Evolución Personal',
    href: '/evolution',
    icon: Brain,
    color: 'text-purple-400'
  },
  {
    label: 'Victorias Semanales',
    href: '/victories',
    icon: Trophy,
    color: 'text-cyan-400'
  }
]

export default function DashboardSidebar() {
  const pathname = usePathname()

  return (
    <div className="fixed left-0 top-0 h-screen w-64 bg-slate-900/95 backdrop-blur-sm border-r border-slate-800 flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-slate-800">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">A</span>
          </div>
          <div>
            <h1 className="font-bold text-white">ANYOSA-APP</h1>
            <p className="text-xs text-slate-400">Centro de Comando</p>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {sidebarItems.map((item) => {
          const isActive = pathname === item.href
          const Icon = item.icon
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={clsx(
                'flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group',
                isActive 
                  ? 'bg-slate-800 text-white shadow-lg' 
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
              )}
            >
              <Icon 
                size={20} 
                className={clsx(
                  'transition-colors duration-200',
                  isActive ? item.color : 'text-slate-500 group-hover:text-slate-300'
                )}
              />
              <span className="font-medium text-sm">{item.label}</span>
              
              {isActive && (
                <div className="ml-auto w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
              )}
            </Link>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-slate-800">
        <Link 
          href="/settings"
          className="flex items-center gap-3 px-3 py-2.5 text-slate-400 hover:text-white hover:bg-slate-800/50 rounded-lg transition-all duration-200"
        >
          <Settings size={20} />
          <span className="font-medium text-sm">Configuración</span>
        </Link>
        
        <div className="mt-3 px-3 py-2 bg-slate-800/30 rounded-lg">
          <div className="text-xs text-slate-500 mb-1">Progreso Semanal</div>
          <div className="flex items-center gap-2">
            <div className="flex-1 h-2 bg-slate-700 rounded-full overflow-hidden">
              <div className="h-full w-4/5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
            </div>
            <span className="text-xs font-bold text-purple-400">85%</span>
          </div>
        </div>
      </div>
    </div>
  )
}