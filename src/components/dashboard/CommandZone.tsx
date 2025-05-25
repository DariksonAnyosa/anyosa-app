'use client'

import { LucideIcon } from 'lucide-react'
import Card from '../ui/Card'

interface CommandZoneProps {
  title: string
  description: string
  status: string
  icon: LucideIcon
  color: 'blue' | 'orange' | 'yellow' | 'green' | 'purple' | 'cyan'
  onClick?: () => void
}

export default function CommandZone({
  title,
  description,
  status,
  icon: Icon,
  color,
  onClick
}: CommandZoneProps) {
  const colorClasses = {
    blue: 'text-blue-400',
    orange: 'text-orange-400',
    yellow: 'text-yellow-400',
    green: 'text-green-400',
    purple: 'text-purple-400',
    cyan: 'text-cyan-400',
  }

  return (
    <Card variant="gradient" color={color} onClick={onClick}>
      <div className="flex items-center gap-3 mb-4">
        <Icon className={colorClasses[color]} size={24} />
        <h3 className="text-xl font-semibold">{title}</h3>
      </div>
      
      <p className="text-slate-400 mb-4">
        {description}
      </p>
      
      <div className={`text-sm ${colorClasses[color]}`}>
        {status}
      </div>
    </Card>
  )
}