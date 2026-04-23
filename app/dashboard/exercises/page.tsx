'use client'

import { useEffect, useState } from 'react'
import { DashboardSidebar } from '@/components/DashboardSidebar'
import { supabase } from '@/lib/supabaseClient'
import { Button } from '@/components/ui/button'
import { t } from '@/lib/i18n'
import Link from 'next/link'
import { Brain, FileText, Headphones } from 'lucide-react'

type Language = 'en' | 'fr' | 'ar'

export default function ExercisesPage() {
  const [language, setLanguage] = useState<Language>('en')

  const [loading, setLoading] = useState(true)
  const [level, setLevel] = useState<string>('A1')
  const [exercises, setExercises] = useState<any[]>([])
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const { data: userData } = await supabase.auth.getUser()
      const user = userData.user

      if (!user) return

      // 🔥 GET USER LEVEL
      const { data: profile } = await supabase
        .from('profiles')
        .select('level')
        .eq('id', user.id)
        .single()

      const userLevel = profile?.level || 'A1'
      setLevel(userLevel)

      // 🔥 GET EXERCISES FOR THAT LEVEL
      const { data: ex } = await supabase
        .from('exercises')
        .select('*')
        .eq('level', userLevel)

      setExercises(ex || [])
      setLoading(false)
    }

    fetchData()
  }, [])

  // 🔥 GROUP BY TYPE
  const quizzes = exercises.filter(e => e.type === 'quiz')
  const pdfs = exercises.filter(e => e.type === 'pdf')
  const audio = exercises.filter(e => e.type === 'audio')

  if (loading) {
    return <div className="p-10">Loading...</div>
  }

  return (
    <div className="flex h-screen bg-background">
      <DashboardSidebar language={language} open={sidebarOpen} setOpen={setSidebarOpen}/>

      <main className="flex-1 overflow-y-auto">

        {/* Header */}
        <div className="bg-white border-b border-border sticky top-0 z-10">
          <div className="max-w-6xl mx-auto px-6 py-6 flex items-center justify-between">

            {/* LEFT SIDE (button + title) */}
            <div className="flex items-center gap-4">
              
              {/* 🔥 MOBILE SIDEBAR BUTTON */}
              <button
                onClick={() => setSidebarOpen(true)}
                className="md:hidden text-2xl"
              >
                ☰
              </button>

              <h1 className="text-3xl font-bold text-foreground">
                {t('exercises', language)} ({level})
              </h1>
            </div>

            {/* RIGHT SIDE */}
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value as Language)}
              className="px-3 py-2 rounded-lg border border-border bg-background"
            >
              <option value="en">English</option>
              <option value="fr">Français</option>
              <option value="ar">العربية</option>
            </select>

          </div>
        </div>

        <div className="max-w-6xl mx-auto px-6 py-8 space-y-10">

          {/* 🧠 QUIZZES */}
          <Section>
            {quizzes.map((q) => (
              <Link key={q.id} href={`/dashboard/quiz/${q.id}`}>
                <div className="bg-gradient-to-r from-blue-500 to-blue-300 rounded-xl p-4 text-white shadow flex items-center gap-3 hover:scale-[1.02] transition">
                  
                  <div>
                    <Brain className="w-6 h-6" />
                  </div>

                  <h3 className="font-semibold text-lg">{q.title}</h3>
                </div>
              </Link>
            ))}
          </Section>

          {/* 📄 PDFs */}
          <Section>
            {pdfs.map((p) => (
              <div
                key={p.id}
                onClick={() => window.open(p.file_url, '_blank')}
                className="bg-gradient-to-r from-blue-500 to-blue-300 rounded-xl p-4 text-white shadow flex items-center gap-3 hover:scale-[1.02] transition cursor-pointer"
              >
                
                <div>
                  <FileText className="w-6 h-6" />
                </div>

                <h3 className="font-semibold text-lg">{p.title}</h3>
              </div>
            ))}
          </Section>

          {/* 🎧 AUDIO */}
          <Section>
            {audio.map((a) => (
              <div
                key={a.id}
                onClick={() => window.open(a.file_url, '_blank')}
                className="bg-gradient-to-r from-blue-500 to-blue-300 rounded-xl p-4 text-white shadow flex items-center gap-3 hover:scale-[1.02] transition cursor-pointer"
              >
                
                <div>
                  <Headphones className="w-6 h-6" />
                </div>

                <h3 className="font-semibold text-lg">{a.title}</h3>
              </div>
            ))}
          </Section>

          {/* EMPTY */}
          {exercises.length === 0 && (
            <div className="text-center py-16">
              <p className="text-muted-foreground">
                No exercises for your level yet
              </p>
            </div>
          )}

        </div>
      </main>
    </div>
  )
}

function Section({ title, children }: any) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">{title}</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {children}
      </div>
    </div>
  )
}

function Card({ title, onClick }: any) {
  return (
    <div
      onClick={onClick}
      className="cursor-pointer bg-card p-6 rounded-xl border border-border hover:shadow-md transition"
    >
      <h3 className="font-semibold text-lg">{title}</h3>
    </div>
  )
}