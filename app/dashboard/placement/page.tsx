'use client'

import Link from 'next/link'
import { DashboardSidebar } from '@/components/DashboardSidebar'
import { useLanguage } from '@/context/LanguageContext'
import { useState } from 'react'

export default function PlacementPage() {
  const { language } = useLanguage()

  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="flex min-h-screen bg-background">

      <main className="flex-1 overflow-y-auto">

        <div className="max-w-4xl mx-auto px-6 py-16">

          <div className="bg-gradient-to-br from-blue-100 to-purple-100 rounded-3xl p-10 text-center">

            <h1 className="text-5xl font-bold mb-6">
              Test de Niveau 🇩🇪
            </h1>

            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
              Discover your German level with grammar, vocabulary, listening and image-based questions.
            </p>

            <div className="grid md:grid-cols-3 gap-4 mb-10">

              <div className="bg-white rounded-2xl p-5">
                <p className="text-3xl mb-2">🧠</p>
                <p className="font-semibold">30 Random Questions</p>
              </div>

              <div className="bg-white rounded-2xl p-5">
                <p className="text-3xl mb-2">🎧</p>
                <p className="font-semibold">Audio & Images</p>
              </div>

              <div className="bg-white rounded-2xl p-5">
                <p className="text-3xl mb-2">🏆</p>
                <p className="font-semibold">Automatic Level</p>
              </div>

            </div>

            <Link href="/dashboard/placement/test">
              <button className="bg-primary text-white px-10 py-4 rounded-xl text-lg font-semibold hover:scale-[1.02] transition">
                Start Test
              </button>
            </Link>

          </div>
        </div>
      </main>
    </div>
  )
}