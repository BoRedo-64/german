'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'

import { DashboardSidebar } from '@/components/DashboardSidebar'
import { supabase } from '@/lib/supabaseClient'
import { useLanguage } from '@/context/LanguageContext'

import {
  Headphones,
  PlayCircle,
  CheckCircle2,
  XCircle,
  Trophy,
  Brain,
  Menu,
} from 'lucide-react'

export default function AudioPage() {
  const params = useParams()
  const id = params.id as string

  const { language } =
    useLanguage()

  const [
    sidebarOpen,
    setSidebarOpen,
  ] = useState(false)

  const [exercise, setExercise] =
    useState<any>(null)

  const [questions, setQuestions] =
    useState<any[]>([])

  const [loading, setLoading] =
    useState(true)

  const [
    currentIndex,
    setCurrentIndex,
  ] = useState(0)

  const [score, setScore] =
    useState(0)

  const [selected, setSelected] =
    useState<string | null>(null)

  const [finished, setFinished] =
    useState(false)

  // 🔥 FETCH
  useEffect(() => {
    const fetchData =
      async () => {
        // EXERCISE
        const {
          data: exerciseData,
        } = await supabase
          .from('exercises')
          .select('*')
          .eq('id', id)
          .single()

        // QUESTIONS
        const {
          data: questionsData,
        } = await supabase
          .from(
            'quiz_questions'
          )
          .select('*')
          .eq(
            'exercise_id',
            id
          )

        setExercise(
          exerciseData
        )

        setQuestions(
          questionsData || []
        )

        setLoading(false)
      }

    fetchData()
  }, [id])

  // 🔥 LOADING
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        Loading...
      </div>
    )
  }

  // 🔥 NOT FOUND
  if (!exercise) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        Audio not found
      </div>
    )
  }

  const current =
    questions[currentIndex]

  // 🔥 ANSWER
  const handleAnswer = (
    answer: string
  ) => {
    if (selected) return

    setSelected(answer)

    let newScore = score

    if (
      answer ===
      current.correct_answer
    ) {
      newScore++
      setScore(newScore)
    }

    setTimeout(() => {
      const next =
        currentIndex + 1

      if (
        next >=
        questions.length
      ) {
        setFinished(true)
        return
      }

      setCurrentIndex(next)

      setSelected(null)
    }, 1000)
  }

  return (
    <div className="flex h-screen overflow-hidden bg-gradient-to-br from-slate-50 via-purple-50 to-blue-50">

      {/* SIDEBAR */}
      <DashboardSidebar
        language={language}
        open={sidebarOpen}
        setOpen={setSidebarOpen}
      />

      {/* MAIN */}
      <main className="flex-1 h-screen overflow-y-auto">

        {/* HEADER */}
        <div className="sticky top-0 z-20 bg-white/80 backdrop-blur-xl border-b border-border">

          <div className="max-w-5xl mx-auto px-6 py-6 flex items-center gap-4">

            {/* MOBILE */}
            <button
              onClick={() =>
                setSidebarOpen(true)
              }
              className="md:hidden w-12 h-12 rounded-2xl bg-white border shadow-sm flex items-center justify-center"
            >
              <Menu className="w-6 h-6" />
            </button>

            <div>

              <h1 className="text-4xl font-black">
                Audio Lesson
              </h1>

              <p className="text-muted-foreground mt-1">
                Listening comprehension exercise
              </p>

            </div>

          </div>
        </div>

        {/* CONTENT */}
        <div className="max-w-5xl mx-auto px-6 py-10">

          {/* HERO */}
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-[36px] p-10 text-white shadow-2xl overflow-hidden relative">

            {/* BG */}
            <div className="absolute top-0 right-0 w-72 h-72 rounded-full bg-white/20 blur-3xl" />

            <div className="relative z-10">

              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-5 py-2 rounded-2xl mb-6">

                <PlayCircle className="w-4 h-4" />

                Listening Practice

              </div>

              <h2 className="text-5xl font-black leading-tight">
                {exercise.title}
              </h2>

              <p className="text-white/80 text-xl mt-6 max-w-2xl leading-relaxed">
                Listen carefully and answer the questions below.
              </p>

              {/* AUDIO */}
              <div className="mt-10 bg-white rounded-[28px] p-6 text-black shadow-2xl">

                <div className="flex items-center gap-4 mb-5">

                  <div className="w-14 h-14 rounded-2xl bg-purple-100 flex items-center justify-center">

                    <Headphones className="w-7 h-7 text-purple-600" />

                  </div>

                  <div>

                    <p className="font-bold text-lg">
                      Audio Player
                    </p>

                    <p className="text-muted-foreground text-sm">
                      Listen before answering
                    </p>

                  </div>

                </div>

                <audio
                  controls
                  className="w-full"
                >
                  <source
                    src={
                      exercise.file_url
                    }
                    type="audio/mpeg"
                  />
                </audio>

              </div>

            </div>
          </div>

          {/* QUESTIONS */}
          {questions.length >
            0 && (
            <div className="mt-8">

              {/* RESULT */}
              {finished ? (
                <div className="bg-white rounded-[36px] border shadow-2xl p-10 text-center">

                  <div className="w-28 h-28 rounded-[32px] bg-gradient-to-r from-purple-600 to-blue-600 flex items-center justify-center mx-auto shadow-2xl mb-8">

                    <Trophy className="w-14 h-14 text-white" />

                  </div>

                  <h2 className="text-5xl font-black">
                    Finished!
                  </h2>

                  <p className="text-muted-foreground text-xl mt-5">
                    You scored
                  </p>

                  <p className="text-7xl font-black mt-4 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                    {score} / {
                      questions.length
                    }
                  </p>

                </div>
              ) : (
                <div className="bg-white rounded-[36px] border shadow-2xl overflow-hidden">

                  {/* TOP */}
                  <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-8 text-white">

                    <div className="flex items-center justify-between gap-5">

                      <div className="flex items-center gap-4">

                        <div className="w-16 h-16 rounded-3xl bg-white/20 flex items-center justify-center">

                          <Brain className="w-8 h-8" />

                        </div>

                        <div>

                          <p className="text-white/70 text-sm">
                            Question
                          </p>

                          <h3 className="text-4xl font-black">
                            {
                              currentIndex +
                              1
                            }
                            /
                            {
                              questions.length
                            }
                          </h3>

                        </div>

                      </div>

                      <div className="bg-white/20 px-5 py-3 rounded-2xl">

                        <p className="font-bold">
                          Score:{' '}
                          {score}
                        </p>

                      </div>

                    </div>

                    {/* PROGRESS */}
                    <div className="mt-6 w-full h-4 rounded-full bg-white/20 overflow-hidden">

                      <div
                        className="h-full bg-white rounded-full transition-all"
                        style={{
                          width: `${
                            ((currentIndex +
                              1) /
                              questions.length) *
                            100
                          }%`,
                        }}
                      />

                    </div>

                  </div>

                  {/* BODY */}
                  <div className="p-8">

                    <h2 className="text-3xl font-black leading-relaxed mb-10">

                      {
                        current.question
                      }

                    </h2>

                    <div className="grid gap-5">

                      {[
                        {
                          key: 'A',
                          value:
                            current.option_a,
                        },

                        {
                          key: 'B',
                          value:
                            current.option_b,
                        },

                        {
                          key: 'C',
                          value:
                            current.option_c,
                        },

                        {
                          key: 'D',
                          value:
                            current.option_d,
                        },
                      ].map(
                        (
                          option
                        ) => {
                          const isCorrect =
                            option.key ===
                            current.correct_answer

                          const isSelected =
                            selected ===
                            option.key

                          return (
                            <button
                              key={
                                option.key
                              }
                              onClick={() =>
                                handleAnswer(
                                  option.key
                                )
                              }
                              disabled={
                                !!selected
                              }
                              className={`
                                text-left rounded-[28px]
                                border-2 p-6 transition-all
                                ${
                                  selected
                                    ? isCorrect
                                      ? 'border-green-500 bg-green-50'
                                      : isSelected
                                      ? 'border-red-500 bg-red-50'
                                      : 'opacity-60'
                                    : 'hover:border-purple-400 hover:bg-purple-50'
                                }
                              `}
                            >

                              <div className="flex items-center justify-between gap-5">

                                <div className="flex items-center gap-5">

                                  <div className="w-14 h-14 rounded-2xl bg-secondary flex items-center justify-center font-black text-lg">

                                    {
                                      option.key
                                    }

                                  </div>

                                  <p className="font-semibold text-lg">

                                    {
                                      option.value
                                    }

                                  </p>

                                </div>

                                {selected &&
                                  isCorrect && (
                                    <CheckCircle2 className="w-7 h-7 text-green-600" />
                                  )}

                                {selected &&
                                  isSelected &&
                                  !isCorrect && (
                                    <XCircle className="w-7 h-7 text-red-600" />
                                  )}

                              </div>

                            </button>
                          )
                        }
                      )}

                    </div>

                  </div>
                </div>
              )}

            </div>
          )}

        </div>
      </main>
    </div>
  )
}