import StatsCard from '@/components/dashboard/StatsCard'
import CommandZonesGrid from '@/components/dashboard/CommandZonesGrid'
import HeroButtons from '@/components/ui/HeroButtons'
import Card from '@/components/ui/Card'

export default function HomePage() {
  return (
    <div className="space-y-12 fade-in-up">
      {/* Hero Section */}
      <section className="text-center py-16">
        <h1 className="text-5xl font-bold mb-6 gradient-text-anyosa">
          ANYOSA-APP
        </h1>
        <p className="text-xl text-slate-400 mb-8 max-w-2xl mx-auto">
          Tu <span className="text-blue-400 font-semibold">Centro de Comando Personal</span> para conquistar objetivos, 
          organizar proyectos y transformar tu productividad en resultados extraordinarios.
        </p>
        
        <HeroButtons />
      </section>

      {/* Estadísticas */}
      <section className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatsCard value="4" label="Proyectos Activos" color="blue" />
        <StatsCard value="12" label="Tareas Completadas" color="green" />
        <StatsCard value="85%" label="Progreso Semanal" color="purple" />
        <StatsCard value="7" label="Días de Racha" color="yellow" />
      </section>

      {/* Zonas de Comando */}
      <section>
        <h2 className="text-3xl font-bold mb-8 text-center">
          🎯 <span className="gradient-text-anyosa">Zonas de Comando</span>
        </h2>
        
        <CommandZonesGrid />
      </section>

      {/* Call to Action */}
      <section>
        <Card className="bg-gradient-to-r from-slate-900/50 to-slate-800/50 border-slate-700 text-center">
          <h2 className="text-2xl font-bold mb-4">
            ¿Listo para construir tu imperio? 🏗️
          </h2>
          <p className="text-slate-400 mb-6">
            No eres uno más. Tú construyes imperios. Empieza ahora.
          </p>
          <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-8 py-3 rounded-lg font-semibold transition-all duration-200 hover-lift">
            Acceder al Dashboard
          </button>
        </Card>
      </section>
    </div>
  )
}