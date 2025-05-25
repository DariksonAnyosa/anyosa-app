'use client'

import { useEffect, useState } from 'react'

interface CircularProgressProps {
  percentage: number
  size?: number
  strokeWidth?: number
  color?: string
  backgroundColor?: string
  showPercentage?: boolean
  animationDuration?: number
  label?: string
}

export default function CircularProgress({
  percentage,
  size = 120,
  strokeWidth = 8,
  color = '#3b82f6',
  backgroundColor = '#1e293b',
  showPercentage = true,
  animationDuration = 1000,
  label
}: CircularProgressProps) {
  const [animatedPercentage, setAnimatedPercentage] = useState(0)
  
  // Calcular dimensiones
  const radius = (size - strokeWidth) / 2
  const circumference = radius * 2 * Math.PI
  const strokeDasharray = circumference
  const strokeDashoffset = circumference - (animatedPercentage / 100) * circumference

  // Animar el progreso
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedPercentage(percentage)
    }, 100)

    return () => clearTimeout(timer)
  }, [percentage])

  // Determinar color según el progreso
  const getProgressColor = () => {
    if (animatedPercentage >= 90) return '#10b981' // Verde
    if (animatedPercentage >= 70) return '#3b82f6' // Azul
    if (animatedPercentage >= 50) return '#8b5cf6' // Púrpura
    if (animatedPercentage >= 30) return '#f59e0b' // Amarillo
    return '#ef4444' // Rojo
  }

  const progressColor = color === '#3b82f6' ? getProgressColor() : color

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg
        width={size}
        height={size}
        className="transform -rotate-90"
      >
        {/* Background Circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={backgroundColor}
          strokeWidth={strokeWidth}
          fill="transparent"
          className="opacity-30"
        />
        
        {/* Progress Circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={progressColor}
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeDasharray={strokeDasharray}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className="transition-all duration-1000 ease-out"
          style={{
            filter: `drop-shadow(0 0 6px ${progressColor}40)`
          }}
        />
        
        {/* Glow Effect */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={progressColor}
          strokeWidth={2}
          fill="transparent"
          strokeDasharray={strokeDasharray}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className="transition-all duration-1000 ease-out opacity-60"
          style={{
            filter: `blur(3px)`
          }}
        />
      </svg>

      {/* Center Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        {showPercentage && (
          <div className="text-2xl font-bold text-white">
            {Math.round(animatedPercentage)}%
          </div>
        )}
        {label && (
          <div className="text-xs text-slate-400 mt-1 text-center max-w-16">
            {label}
          </div>
        )}
      </div>

      {/* Pulse Animation for 100% */}
      {animatedPercentage >= 100 && (
        <div 
          className="absolute inset-0 rounded-full animate-ping"
          style={{
            backgroundColor: `${progressColor}20`,
            animationDuration: '2s'
          }}
        />
      )}
    </div>
  )
}