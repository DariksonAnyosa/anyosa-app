import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'ANYOSA-APP | Centro de Comando Personal',
  description: 'Tu sistema de productividad y organización estratégica',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className="dark">
      <body className={`${inter.className} antialiased bg-slate-950 text-slate-100`}>
        <div className="min-h-screen">
          {/* Header */}
          <header className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-sm">
            <div className="container mx-auto px-4 py-4">
              <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                  ANYOSA-APP
                </h1>
                <div className="text-sm text-slate-400">
                  Centro de Comando Personal
                </div>
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main className="container mx-auto px-4 py-6">
            {children}
          </main>

          {/* Footer */}
          <footer className="border-t border-slate-800 mt-16">
            <div className="container mx-auto px-4 py-6 text-center text-slate-500">
              <p>ANYOSA-APP - Tu imperio en construcción 🚀</p>
            </div>
          </footer>
        </div>
      </body>
    </html>
  )
}