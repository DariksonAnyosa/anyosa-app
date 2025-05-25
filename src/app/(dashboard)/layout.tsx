import DashboardSidebar from '@/components/layout/DashboardSidebar'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen bg-slate-950">
      {/* Sidebar */}
      <DashboardSidebar />
      
      {/* Main Content - Con padding adecuado */}
      <main className="flex-1 ml-64">
        <div className="p-8 max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  )
}