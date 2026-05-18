'use client'

import {
  useEffect,
  useState,
} from 'react'

import { useRouter } from 'next/navigation'

import { supabase } from '@/lib/supabaseClient'

import {
  Brain,
  Headphones,
  ImageIcon,
  Trophy,
  Sparkles,
  CheckCircle2,
} from 'lucide-react'

export default function PlacementTestPage() {
  const router = useRouter()

  const [questions, setQuestions] =
    useState<any[]>([])

  const [
    currentIndex,
    setCurrentIndex,
  ] = useState(0)

  const [score, setScore] =
    useState(0)

  const [selected, setSelected] =
    useState<string | null>(null)

  const [loading, setLoading] =
    useState(true)

  // 🔥 FETCH QUESTIONS
  useEffect(() => {
    const fetchQuestions =
      async () => {

        // A1
        const { data: a1 } =
          await supabase
            .from(
              'placement_questions'
            )
            .select('*')
            .eq('level', 'A1')

        // A2
        const { data: a2 } =
          await supabase
            .from(
              'placement_questions'
            )
            .select('*')
            .eq('level', 'A2')

        // B1
        const { data: b1 } =
          await supabase
            .from(
              'placement_questions'
            )
            .select('*')
            .eq('level', 'B1')

        // B2
        const { data: b2 } =
          await supabase
            .from(
              'placement_questions'
            )
            .select('*')
            .eq('level', 'B2')

        const selectedQuestions = [
          ...(a1 || [])
            .sort(
              () =>
                Math.random() -
                0.5
            )
            .slice(0, 10),

          ...(a2 || [])
            .sort(
              () =>
                Math.random() -
                0.5
            )
            .slice(0, 10),

          ...(b1 || [])
            .sort(
              () =>
                Math.random() -
                0.5
            )
            .slice(0, 10),

          ...(b2 || [])
            .sort(
              () =>
                Math.random() -
                0.5
            )
            .slice(0, 10),
        ]

        // FINAL SHUFFLE
        const shuffled =
          selectedQuestions.sort(
            () =>
              Math.random() -
              0.5
          )

        setQuestions(
          shuffled
        )

        setLoading(false)
      }

    fetchQuestions()
  }, [])

  // 🔥 LOADING
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">

        <div className="text-center space-y-5">

          <div className="w-20 h-20 rounded-[28px] bg-gradient-to-r from-blue-600 to-purple-600 animate-pulse mx-auto shadow-xl" />

          <div>

            <h2 className="text-2xl font-black">
              Loading Test
            </h2>

            <p className="text-muted-foreground mt-2">
              Preparing your questions...
            </p>

          </div>

        </div>
      </div>
    )
  }

  const current =
    questions[currentIndex]

  // 🔥 HANDLE ANSWER
  const handleAnswer = (
    answer: string
  ) => {
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
        localStorage.setItem(
          'placementScore',
          String(newScore)
        )

        router.push(
          '/placement/result'
        )

        return
      }

      setCurrentIndex(next)

      setSelected(null)
    }, 700)
  }

  const progress =
    ((currentIndex + 1) /
      questions.length) *
    100

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-8 px-4">

      <div className="max-w-5xl mx-auto">

        {/* HEADER */}
        <div className="relative overflow-hidden rounded-[36px] bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 p-8 md:p-10 text-white shadow-2xl mb-8">

          {/* BG */}
          <div className="absolute inset-0 opacity-20">

            <div className="absolute top-0 right-0 w-72 h-72 rounded-full bg-white blur-3xl" />

            <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-cyan-300 blur-3xl" />

          </div>

          <div className="relative z-10">

            {/* TOP */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">

              {/* LEFT */}
              <div className="flex items-center gap-5">

                <div className="w-20 h-20 rounded-[28px] bg-white/20 backdrop-blur-md flex items-center justify-center shadow-2xl">

                  <Brain className="w-10 h-10 text-white" />

                </div>

                <div>

                  <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-2 rounded-2xl mb-4">

                    <Sparkles className="w-4 h-4" />

                    <span className="font-semibold text-sm">
                      Deutschly Placement Test
                    </span>

                  </div>

                  <h1 className="text-4xl md:text-5xl font-black">
                    Question{' '}
                    {
                      currentIndex +
                      1
                    }
                  </h1>

                  <p className="text-white/80 text-lg mt-2">
                    Keep going — you're doing great 🚀
                  </p>

                </div>

              </div>

              {/* RIGHT */}
              <div className="bg-white/20 backdrop-blur-md rounded-[28px] px-6 py-5 min-w-[180px]">

                <p className="text-white/70 text-sm">
                  Difficulty
                </p>

                <h3 className="text-4xl font-black mt-2">
                  {
                    current.level
                  }
                </h3>

              </div>

            </div>

            {/* PROGRESS */}
            <div className="mt-8">

              <div className="flex items-center justify-between mb-3">

                <p className="font-semibold">
                  Progress
                </p>

                <p className="text-white/80">
                  {
                    currentIndex +
                    1
                  }
                  /
                  {
                    questions.length
                  }
                </p>

              </div>

              <div className="w-full h-4 rounded-full bg-white/20 overflow-hidden">

                <div
                  className="h-full bg-white rounded-full transition-all duration-500"
                  style={{
                    width: `${progress}%`,
                  }}
                />

              </div>

            </div>
          </div>
        </div>

        {/* QUESTION CARD */}
        <div className="bg-white rounded-[36px] border shadow-2xl overflow-hidden">

          {/* MEDIA */}
          {(current.type ===
            'image' ||
            current.type ===
              'audio') && (
            <div className="p-8 pb-0">

              {/* IMAGE */}
              {current.type ===
                'image' &&
                current.image_url && (
                  <div className="relative overflow-hidden rounded-[28px] shadow-xl mb-6">

                    <img
                      src={
                        current.image_url
                      }
                      alt="Question"
                      className="w-full h-[320px] object-cover"
                    />

                    <div className="absolute top-5 left-5 bg-black/50 backdrop-blur-md text-white px-4 py-2 rounded-2xl flex items-center gap-2">

                      <ImageIcon className="w-4 h-4" />

                      Image Question

                    </div>

                  </div>
                )}

              {/* AUDIO */}
              {current.type ===
                'audio' &&
                current.audio_url && (
                  <div className="rounded-[28px] bg-gradient-to-r from-blue-50 to-purple-50 border p-8 shadow-sm mb-6">

                    <div className="flex items-center gap-4 mb-5">

                      <div className="w-16 h-16 rounded-3xl bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center shadow-lg">

                        <Headphones className="w-8 h-8 text-white" />

                      </div>

                      <div>

                        <h3 className="text-2xl font-black">
                          Listening Question
                        </h3>

                        <p className="text-muted-foreground mt-1">
                          Listen carefully before answering
                        </p>

                      </div>

                    </div>

                    <audio
                      controls
                      className="w-full"
                    >
                      <source
                        src={
                          current.audio_url
                        }
                      />
                    </audio>

                  </div>
                )}

            </div>
          )}

          {/* QUESTION */}
          <div className="p-8 md:p-10">

            {/* QUESTION TITLE */}
            <div className="mb-10">

              <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-2xl font-semibold mb-5">

                <Trophy className="w-4 h-4" />

                German Assessment

              </div>

              <h2 className="text-3xl md:text-4xl font-black leading-relaxed">

                {
                  current.question
                }

              </h2>

            </div>

            {/* ANSWERS */}
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
                (option) => {
                  const isSelected =
                    selected ===
                    option.key

                  const isCorrect =
                    option.key ===
                    current.correct_answer

                  return (
                    <button
                      key={
                        option.key
                      }
                      disabled={
                        !!selected
                      }
                      onClick={() =>
                        handleAnswer(
                          option.key
                        )
                      }
                      className={`
                        relative overflow-hidden
                        text-left rounded-[28px]
                        border-2 p-6 md:p-7
                        transition-all duration-300
                        hover:scale-[1.01]
                        ${
                          selected
                            ? isCorrect
                              ? 'border-green-500 bg-green-50'
                              : isSelected
                              ? 'border-red-500 bg-red-50'
                              : 'border-border opacity-70'
                            : 'border-border hover:border-blue-400 hover:bg-blue-50'
                        }
                      `}
                    >

                      <div className="flex items-center gap-5">

                        {/* LETTER */}
                        <div
                          className={`
                            min-w-[58px] h-[58px]
                            rounded-2xl flex items-center justify-center
                            text-xl font-black shadow-md
                            ${
                              selected
                                ? isCorrect
                                  ? 'bg-green-500 text-white'
                                  : isSelected
                                  ? 'bg-red-500 text-white'
                                  : 'bg-secondary'
                                : 'bg-secondary'
                            }
                          `}
                        >

                          {
                            option.key
                          }

                        </div>

                        {/* TEXT */}
                        <div className="flex-1">

                          <p className="text-lg font-semibold leading-relaxed">

                            {
                              option.value
                            }

                          </p>

                        </div>

                        {/* CORRECT ICON */}
                        {selected &&
                          isCorrect && (
                            <CheckCircle2 className="w-7 h-7 text-green-600" />
                          )}

                      </div>
                    </button>
                  )
                }
              )}

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}