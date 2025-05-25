import NewMissionForm from '@/components/forms/NewMissionForm'
import { Target, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default function NuevaMisionPage() {
  return (
    <div className="max-w-2xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link 
          href="/"
          className="p-2 hover:bg-slate-800 rounded-lg transition-colors"
        >
          <ArrowLeft size={20} className="text-slate-400" />
        </Link>
        
        <div>
          <div className="flex items-center gap-3 mb-2">
            <Target className="text-blue-400" size={28} />
            <h1 className="text-3xl font-bold text-white">Nueva Misión</h1>
          </div>
          <p className="text-slate-400">
            Define tu próximo objetivo y conviértelo en realidad
          </p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <button className="p-4 bg-gradient-to-br from-blue-900/20 to-blue-800/10 border border-blue-800/30 rounded-xl text-left hover-lift">
          <div className="text-blue-400 font-semibold mb-1">🎯 Objetivo Semanal</div>
          <div className="text-sm text-slate-400">Meta para esta semana</div>
        </button>
        
        <button className="p-4 bg-gradient-to-br from-green-900/20 to-green-800/10 border border-green-800/30 rounded-xl text-left hover-lift">
          <div className="text-green-400 font-semibold mb-1">💻 Tarea Técnica</div>
          <div className="text-sm text-slate-400">Código, bugs, features</div>
        </button>
        
        <button className="p-4 bg-gradient-to-br from-purple-900/20 to-purple-800/10 border border-purple-800/30 rounded-xl text-left hover-lift">
          <div className="text-purple-400 font-semibold mb-1">🧠 Hábito Personal</div>
          <div className="text-sm text-slate-400">Crecimiento diario</div>
        </button>
      </div>

      {/* Form */}
      <NewMissionForm />
      
      {/* Tips */}
      <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6">
        <h3 className="font-bold text-white mb-3 flex items-center gap-2">
          💡 Tips para Misiones Poderosas
        </h3>
        
        <ul className="space-y-2 text-sm text-slate-400">
          <li className="flex items-start gap-2">
            <span className="text-blue-400">•</span>
            <span>Sé específico: "Completar feature de auth" vs "Trabajar en app"</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-400">•</span>
            <span>Define el impacto: ¿Qué logras cuando termines esto?</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-purple-400">•</span>
            <span>Pon fecha límite realista pero ambiciosa</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-yellow-400">•</span>
            <span>Una misión = Una victoria clara y medible</span>
          </li>
        </ul>
      </div>
    </div>
  )
}