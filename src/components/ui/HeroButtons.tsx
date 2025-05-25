'use client'

import { ArrowRight, LayoutDashboard } from 'lucide-react'

export default function HeroButtons() {
  return (
    <div className="flex flex-col sm:flex-row gap-4 justify-center">
      <button 
        onClick={() => window.location.href = '/nueva-mision'}
        className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-8 py-3 rounded-lg font-semibold transition-all duration-200 hover-lift flex items-center justify-center gap-2"
      >
        Comenzar Misión
        <ArrowRight size={20} />
      </button>
      
      <button 
        onClick={() => window.location.href = '/dashboard'}
        className="border border-slate-600 hover:border-slate-500 px-8 py-3 rounded-lg font-semibold transition-all duration-200 hover:bg-slate-800 flex items-center justify-center gap-2"
      >
        <LayoutDashboard size={20} />
        Ver Dashboard
      </button>
    </div>
  )
}