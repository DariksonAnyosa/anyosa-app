'use client'

import { Target, Zap, Brain, Trophy, Code, Lightbulb } from 'lucide-react'
import CommandZone from './CommandZone'

const commandZones = [
  {
    title: 'Misión Semanal',
    description: 'Tus 3-5 objetivos clave que SÍ O SÍ debes conquistar esta semana',
    status: '3 misiones activas',
    icon: Target,
    color: 'blue' as const
  },
  {
    title: 'Proyectos en Fuego',
    description: 'Renova, SIGE, Angelic Shop, Botica - Acciones en movimiento',
    status: '4 proyectos activos',
    icon: Zap,
    color: 'orange' as const
  },
  {
    title: 'Ideas que Valen Oro',
    description: 'Captura rápida de ideas geniales antes de que se evaporen',
    status: '8 ideas capturadas',
    icon: Lightbulb,
    color: 'yellow' as const
  },
  {
    title: 'Código & Técnico',
    description: 'Programación pura, bugs, features, arquitectura',
    status: '5 tareas técnicas',
    icon: Code,
    color: 'green' as const
  },
  {
    title: 'Evolución Personal',
    description: 'Inglés CEO, hábitos, mentalidad millonaria, transformación',
    status: 'Daily progress',
    icon: Brain,
    color: 'purple' as const
  },
  {
    title: 'Victorias Semanales',
    description: 'Logros completados - Tu galería de conquistas',
    status: '12 victorias esta semana',
    icon: Trophy,
    color: 'cyan' as const
  }
]

export default function CommandZonesGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {commandZones.map((zone, index) => (
        <CommandZone
          key={index}
          title={zone.title}
          description={zone.description}
          status={zone.status}
          icon={zone.icon}
          color={zone.color}
          onClick={() => {
            const routes: Record<string, string> = {
              'Misión Semanal': '/dashboard',
              'Proyectos en Fuego': '/projects', 
              'Ideas que Valen Oro': '/ideas',
              'Código & Técnico': '/coding',
              'Evolución Personal': '/evolution',
              'Victorias Semanales': '/victories'
            }
            
            const route = routes[zone.title]
            if (route) {
              window.location.href = route
            }
          }}
        />
      ))}
    </div>
  )
}