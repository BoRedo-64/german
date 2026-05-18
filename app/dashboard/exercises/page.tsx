'use client'

import { useEffect, useState } from 'react'
import { DashboardSidebar } from '@/components/DashboardSidebar'
import { supabase } from '@/lib/supabaseClient'
import Link from 'next/link'

import {
  Brain,
  FileText,
  Headphones,
  Menu,
  Sparkles,
  BookOpen,
  Volume2,
} from 'lucide-react'

import {
  useLanguage,
  type Language,
} from '@/context/LanguageContext'

import { t } from '@/lib/translations'

export default function ExercisesPage() {
  const {
    language,
    setLanguage,
  } = useLanguage()

  const isRTL =
    language === 'ar'

  const [loading, setLoading] =
    useState(true)

  const [level, setLevel] =
    useState<string>('A1')

  const [exercises, setExercises] =
    useState<any[]>([])

  const [sidebarOpen, setSidebarOpen] =
    useState(false)

  useEffect(() => {
    const fetchData = async () => {
      const { data: userData } =
        await supabase.auth.getUser()

      const user = userData.user

      if (!user) return

      // 🔥 GET USER LEVEL
      const { data: profile } =
        await supabase
          .from('profiles')
          .select('level')
          .eq('id', user.id)
          .single()

      const userLevel =
        profile?.level || 'A1'

      setLevel(userLevel)

      // 🔥 GET EXERCISES
      const { data: ex } =
        await supabase
          .from('exercises')
          .select('*')
          .eq('level', userLevel)

      setExercises(ex || [])
      setLoading(false)
    }

    fetchData()
  }, [])

  // 🔥 GROUPS
  const quizzes = exercises.filter(
    (e) => e.type === 'quiz'
  )

  const pdfs = exercises.filter(
    (e) => e.type === 'pdf'
  )

  const audio = exercises.filter(
    (e) => e.type === 'audio'
  )

  if (loading) {
    return (
      <div
        dir={
          isRTL
            ? 'rtl'
            : 'ltr'
        }
        className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50"
      >

        <div className="text-center space-y-4">

          <div className="w-16 h-16 rounded-3xl bg-gradient-to-r from-blue-600 to-purple-600 mx-auto animate-pulse" />

          <p className="text-muted-foreground font-medium">

            {t(
              'exercise.loading',
              language
            )}

          </p>

        </div>
      </div>
    )
  }

  return (
    <div
      dir={
        isRTL
          ? 'rtl'
          : 'ltr'
      }
      className="flex h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50"
    >

      <DashboardSidebar
        language={language}
        open={sidebarOpen}
        setOpen={setSidebarOpen}
      />

      <main className="flex-1 overflow-y-auto">

        {/* HEADER */}
        <div className="sticky top-0 z-20 backdrop-blur-xl bg-white/70 border-b border-white/30">

          <div className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">

            {/* LEFT */}
            <div className="flex items-center gap-4">

              {/* MOBILE BTN */}
              <button
                onClick={() =>
                  setSidebarOpen(true)
                }
                className="
                  md:hidden
                  w-12 h-12 rounded-2xl
                  bg-white shadow-md border
                  flex items-center justify-center
                "
              >
                <Menu className="w-6 h-6" />
              </button>

              <div>

                <div className="flex items-center gap-3">

                  <div>

                    <h1 className="text-4xl font-black tracking-tight">

                      {t(
                        'exercise.title',
                        language
                      )}

                    </h1>

                    <p className="text-muted-foreground mt-1">

                      {t(
                        'exercise.subtitle',
                        language
                      )}

                    </p>

                  </div>

                </div>

              </div>
            </div>

            {/* RIGHT */}
            <div className="flex items-center gap-4">

              <div className="hidden md:flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-5 py-3 rounded-2xl shadow-lg">

                <BookOpen className="w-5 h-5" />

                <span className="font-bold">
                  {level}
                </span>

              </div>

              <select
                value={language}
                onChange={(e) =>
                  setLanguage(
                    e.target.value as Language
                  )
                }
                className="
                  px-4 py-3 rounded-2xl
                  border bg-white shadow-sm
                "
              >
                <option value="en">
                  English
                </option>

                <option value="fr">
                  Français
                </option>

                <option value="ar">
                  العربية
                </option>

              </select>

            </div>
          </div>
        </div>

        {/* HERO */}
        <div className="max-w-7xl mx-auto px-6 pt-8">

          <div className="relative overflow-hidden rounded-[36px] bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 p-10 text-white shadow-2xl">

            {/* BG EFFECTS */}
            <div className="absolute inset-0 opacity-20">

              <div className="absolute top-0 right-0 w-72 h-72 bg-white rounded-full blur-3xl" />

              <div className="absolute bottom-0 left-0 w-64 h-64 bg-cyan-300 rounded-full blur-3xl" />

            </div>

            <div className="relative z-10 max-w-2xl">

              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-2 rounded-2xl mb-5">

                <Sparkles className="w-4 h-4" />

                <span className="text-sm font-semibold">

                  {t(
                    'exercise.hero.badge',
                    language
                  )}

                </span>

              </div>

              <h2 className="text-5xl font-black leading-tight">

                {t(
                  'exercise.hero.title',
                  language
                )}

              </h2>

              <p className="text-white/80 text-lg mt-4 leading-relaxed">

                {t(
                  'exercise.hero.desc',
                  language
                )}

              </p>

            </div>
          </div>
        </div>

        {/* CONTENT */}
        <div className="max-w-7xl mx-auto px-6 py-10 space-y-12">

          {/* QUIZZES */}
          {quizzes.length > 0 && (
            <Section
              title={t(
                'exercise.quizzes',
                language
              )}
              subtitle={t(
                'exercise.quizzes.desc',
                language
              )}
            >

              {quizzes.map((q) => (
                <Link
                  key={q.id}
                  href={`/dashboard/quiz/${q.id}`}
                >
                  <ExerciseCard
                    icon={
                      <Brain className="w-7 h-7 text-white" />
                    }
                    title={q.title}
                    gradient="from-blue-600 to-cyan-500"
                    badge={t(
                      'exercise.badge.quiz',
                      language
                    )}
                    language={language}
                  />
                </Link>
              ))}

            </Section>
          )}

          {/* PDFs */}
          {pdfs.length > 0 && (
            <Section
              title={t(
                'exercise.pdfs',
                language
              )}
              subtitle={t(
                'exercise.pdfs.desc',
                language
              )}
            >

              {pdfs.map((p) => (
                <div
                  key={p.id}
                  onClick={() =>
                    window.open(
                      p.file_url,
                      '_blank'
                    )
                  }
                >
                  <ExerciseCard
                    icon={
                      <FileText className="w-7 h-7 text-white" />
                    }
                    title={p.title}
                    gradient="from-purple-600 to-pink-500"
                    badge={t(
                      'exercise.badge.pdf',
                      language
                    )}
                    language={language}
                  />
                </div>
              ))}

            </Section>
          )}

          {/* AUDIO */}
          {audio.length > 0 && (
            <Section
              title={t(
                'exercise.audio',
                language
              )}
              subtitle={t(
                'exercise.audio.desc',
                language
              )}
            >

              {audio.map((a) => (
                <Link
                  key={a.id}
                  href={`/dashboard/audio/${a.id}`}
                >
                  <ExerciseCard
                    icon={
                      <Headphones className="w-7 h-7 text-white" />
                    }
                    title={a.title}
                    gradient="from-orange-500 to-red-500"
                    badge={t(
                      'exercise.badge.audio',
                      language
                    )}
                    language={language}
                  />
                </Link>
              ))}

            </Section>
          )}

          {/* EMPTY */}
          {exercises.length === 0 && (
            <div className="bg-white rounded-[32px] border shadow-lg p-16 text-center">

              <div className="w-24 h-24 rounded-[28px] bg-gradient-to-r from-blue-600 to-purple-600 mx-auto flex items-center justify-center shadow-xl">

                <BookOpen className="w-12 h-12 text-white" />

              </div>

              <h3 className="text-3xl font-black mt-8">

                {t(
                  'exercise.empty.title',
                  language
                )}

              </h3>

              <p className="text-muted-foreground mt-3 text-lg">

                {t(
                  'exercise.empty.desc',
                  language
                )}

              </p>

            </div>
          )}

        </div>
      </main>
    </div>
  )
}

function Section({
  title,
  subtitle,
  children,
}: any) {
  return (
    <div className="space-y-6">

      <div className="flex items-end justify-between">

        <div>

          <h2 className="text-3xl font-black">
            {title}
          </h2>

          <p className="text-muted-foreground mt-2">
            {subtitle}
          </p>

        </div>

      </div>

      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-7">
        {children}
      </div>

    </div>
  )
}

function ExerciseCard({
  icon,
  title,
  gradient,
  badge,
  language,
}: any) {
  return (
    <div
      dir={
        language === 'ar'
          ? 'rtl'
          : 'ltr'
      }
      className="
        group relative overflow-hidden
        rounded-[30px]
        bg-white border border-white/50
        shadow-lg hover:shadow-2xl
        transition-all duration-300
        hover:-translate-y-1
        cursor-pointer
      "
    >

      {/* TOP */}
      <div
        className={`
          relative h-40 bg-gradient-to-br ${gradient}
          overflow-hidden
        `}
      >

        <div className="absolute inset-0 opacity-20">

          <div className="absolute top-0 right-0 w-40 h-40 rounded-full bg-white blur-3xl" />

        </div>

        <div className="relative z-10 p-6 flex flex-col justify-between h-full">

          <div className="w-16 h-16 rounded-3xl bg-white/20 backdrop-blur-md flex items-center justify-center shadow-lg">

            {icon}

          </div>

          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-2 rounded-2xl text-sm font-semibold w-fit">

            <Volume2 className="w-4 h-4" />

            {badge}

          </div>

        </div>
      </div>

      {/* CONTENT */}
      <div className="p-6">

        <h3 className="text-2xl font-black leading-tight group-hover:text-blue-600 transition-colors break-words">
          {title}
        </h3>

        <div className="mt-6 flex items-center justify-between">

          <div className="text-sm text-muted-foreground">

            {t(
              'exercise.start',
              language
            )}

          </div>

          <div className="w-10 h-10 rounded-2xl bg-secondary group-hover:bg-blue-600 transition-all flex items-center justify-center">

            <span className="group-hover:text-white transition">
              →
            </span>

          </div>

        </div>

      </div>
    </div>
  )
}