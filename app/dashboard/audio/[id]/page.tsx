'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { DashboardSidebar } from '@/components/DashboardSidebar'
import { supabase } from '@/lib/supabaseClient'
import { useLanguage } from '@/context/LanguageContext'
import { Headphones, PlayCircle } from 'lucide-react'

export default function AudioPage() {
  const params = useParams()
  const id = params.id as string

  const { language } = useLanguage()

  const [sidebarOpen, setSidebarOpen] = useState(false)

  const [exercise, setExercise] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  // 🔥 FETCH AUDIO
  useEffect(() => {
    const fetchExercise = async () => {
      const { data, error } = await supabase
        .from('exercises')
        .select('*')
        .eq('id', id)
        .single()

      if (error) {
        console.error(error)
      }

      setExercise(data)
      setLoading(false)
    }

    fetchExercise()
  }, [id])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        Loading...
      </div>
    )
  }

  if (!exercise) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        Audio not found
      </div>
    )
  }

  return (
    <div className="flex min-h-screen bg-background">

      {/* SIDEBAR */}
      <DashboardSidebar
        language={language}
        open={sidebarOpen}
        setOpen={setSidebarOpen}
      />

      {/* MAIN */}
      <main className="flex-1 overflow-y-auto">

        {/* HEADER */}
        <div className="bg-white border-b border-border sticky top-0 z-10">
          <div className="max-w-5xl mx-auto px-6 py-6 flex items-center gap-4">

            {/* MOBILE BUTTON */}
            <button
              onClick={() => setSidebarOpen(true)}
              className="md:hidden text-2xl"
            >
              ☰
            </button>

            <h1 className="text-3xl font-bold">
              Audio Lesson
            </h1>
          </div>
        </div>

        {/* CONTENT */}
        <div className="max-w-4xl mx-auto px-6 py-12">

          {/* HERO CARD */}
          <div className="bg-gradient-to-br from-purple-100 to-blue-100 rounded-3xl p-8 md:p-12 shadow-sm border border-border">

            {/* TOP */}
            <div className="flex flex-col md:flex-row md:items-center gap-8">

              {/* ICON */}
              <div className="flex justify-center md:justify-start">
                <div className="bg-white/70 backdrop-blur-sm p-6 rounded-full shadow-sm">
                  <Headphones className="w-16 h-16 text-purple-600" />
                </div>
              </div>

              {/* TEXT */}
              <div className="flex-1">

                <div className="inline-flex items-center gap-2 bg-white/60 px-4 py-2 rounded-full text-sm font-medium text-purple-700 mb-4">
                  <PlayCircle className="w-4 h-4" />
                  Listening Practice
                </div>

                <h2 className="text-4xl font-bold text-foreground mb-4 leading-tight">
                  {exercise.title}
                </h2>

                <p className="text-muted-foreground text-lg leading-relaxed">
                  Improve your German listening comprehension by carefully listening to this lesson.
                </p>

              </div>

            </div>

            {/* AUDIO PLAYER */}
            <div className="mt-10 bg-white rounded-2xl p-6 shadow-sm border border-border">

              <div className="flex items-center gap-3 mb-4">
                <div className="bg-purple-100 p-3 rounded-full">
                  <Headphones className="w-5 h-5 text-purple-600" />
                </div>

                <div>
                  <p className="font-semibold text-foreground">
                    Audio Player
                  </p>

                  <p className="text-sm text-muted-foreground">
                    Press play to start listening
                  </p>
                </div>
              </div>

              <audio
                controls
                className="w-full"
              >
                <source
                  src={exercise.file_url}
                  type="audio/mpeg"
                />

                Your browser does not support audio playback.
              </audio>

            </div>

            {/* TIP BOX */}
            <div className="mt-6 bg-white/70 border border-white rounded-2xl p-5 flex items-start gap-4">

              <div className="text-2xl">
                💡
              </div>

              <div>
                <p className="font-semibold mb-1">
                  Listening Tip
                </p>

                <p className="text-sm text-muted-foreground leading-relaxed">
                  Try listening once without subtitles, then replay the audio and focus on pronunciation and keywords.
                </p>
              </div>

            </div>

          </div>

        </div>
      </main>
    </div>
  )
}