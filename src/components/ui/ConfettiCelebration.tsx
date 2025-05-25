'use client'

import { useEffect, useState } from 'react'

interface ConfettiProps {
  show: boolean
  onComplete?: () => void
}

export default function ConfettiCelebration({ show, onComplete }: ConfettiProps) {
  const [particles, setParticles] = useState<Array<{
    id: number
    x: number
    y: number
    color: string
    size: number
    rotation: number
    velocity: { x: number; y: number }
  }>>([])

  useEffect(() => {
    if (show) {
      // Crear partículas
      const newParticles = Array.from({ length: 50 }, (_, i) => ({
        id: i,
        x: Math.random() * window.innerWidth,
        y: -10,
        color: ['#3b82f6', '#8b5cf6', '#06b6d4', '#10b981', '#f59e0b', '#ef4444'][Math.floor(Math.random() * 6)],
        size: Math.random() * 8 + 4,
        rotation: Math.random() * 360,
        velocity: {
          x: (Math.random() - 0.5) * 6,
          y: Math.random() * 3 + 2
        }
      }))

      setParticles(newParticles)

      // Limpiar después de 3 segundos
      const timeout = setTimeout(() => {
        setParticles([])
        onComplete?.()
      }, 3000)

      return () => clearTimeout(timeout)
    }
  }, [show, onComplete])

  if (!show || particles.length === 0) return null

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute animate-pulse"
          style={{
            left: particle.x,
            top: particle.y,
            width: particle.size,
            height: particle.size,
            backgroundColor: particle.color,
            borderRadius: '50%',
            transform: `rotate(${particle.rotation}deg)`,
            animation: `fall 3s linear forwards, rotate 3s linear infinite`
          }}
        />
      ))}
      
      <style jsx>{`
        @keyframes fall {
          to {
            transform: translateY(100vh) translateX(200px);
          }
        }
        
        @keyframes rotate {
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  )
}