'use client'

import { ReactNode } from 'react'
import { clsx } from 'clsx'

interface CardProps {
  children: ReactNode
  className?: string
  variant?: 'default' | 'gradient' | 'stats'
  color?: 'blue' | 'orange' | 'yellow' | 'green' | 'purple' | 'cyan'
  onClick?: () => void
}

export default function Card({ 
  children, 
  className, 
  variant = 'default',
  color = 'blue',
  onClick 
}: CardProps) {
  const gradientClasses = {
    blue: 'from-blue-900/20 to-blue-800/10 border-blue-800/30',
    orange: 'from-orange-900/20 to-red-800/10 border-orange-800/30',
    yellow: 'from-yellow-900/20 to-yellow-800/10 border-yellow-800/30',
    green: 'from-green-900/20 to-green-800/10 border-green-800/30',
    purple: 'from-purple-900/20 to-purple-800/10 border-purple-800/30',
    cyan: 'from-cyan-900/20 to-cyan-800/10 border-cyan-800/30',
  }

  const baseClasses = 'rounded-xl p-6 transition-all duration-200'
  
  const variantClasses = {
    default: 'bg-slate-900/50 border border-slate-800 hover-lift',
    gradient: `bg-gradient-to-br ${gradientClasses[color]} hover-lift`,
    stats: 'bg-slate-900/50 border border-slate-800 hover-lift text-center'
  }

  return (
    <div 
      className={clsx(
        baseClasses,
        variantClasses[variant],
        onClick && 'cursor-pointer',
        className
      )}
      onClick={onClick}
    >
      {children}
    </div>
  )
}