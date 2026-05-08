'use client'

import {
  useEffect,
  useState,
} from 'react'

import Link from 'next/link'
import { useParams } from 'next/navigation'

import {
  Brain,
  Trophy,
  Sparkles,
  Target,
  RotateCcw,
  ArrowLeft,
  CheckCircle2,
} from 'lucide-react'

import {
  QuizCard,
  type QuizQuestion,
} from '@/components/QuizCard'

import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'

import { supabase } from '@/lib/supabaseClient'

interface QuizStats {
  correct: number
  total: number
}

export default function QuizPage() {
  const params = useParams()

  const quizId =
    params.id as string

  const [loading, setLoading] =
    useState(true)

  const [questions, setQuestions] =
    useState<QuizQuestion[]>([])

  const [
    quizStarted,
    setQuizStarted,
  ] = useState(false)

  const [
    quizCompleted,
    setQuizCompleted,
  ] = useState(false)

  const [stats, setStats] =
    useState<QuizStats | null>(
      null
    )

  // 🔥 FETCH QUESTIONS
  useEffect(() => {
    const fetchQuestions =
      async () => {
        const {
          data,
          error,
        } = await supabase
          .from(
            'quiz_questions'
          )
          .select('*')
          .eq(
            'exercise_id',
            quizId
          )

        if (error) {
          console.error(error)
          return
        }

        const formatted: QuizQuestion[] =
          data?.map(
            (q: any) => ({
              id: q.id,

              question:
                q.question,

              icon: '🧠',

              answers: [
                {
                  id: 'a',
                  text:
                    q.option_a,
                  isCorrect:
                    q.correct_answer ===
                    'a',
                },

                {
                  id: 'b',
                  text:
                    q.option_b,
                  isCorrect:
                    q.correct_answer ===
                    'b',
                },

                {
                  id: 'c',
                  text:
                    q.option_c,
                  isCorrect:
                    q.correct_answer ===
                    'c',
                },

                {
                  id: 'd',
                  text:
                    q.option_d,
                  isCorrect:
                    q.correct_answer ===
                    'd',
                },
              ],

              explanation:
                q.explanation ||
                '',
            })
          ) || []

        setQuestions(
          formatted
        )

        setLoading(false)
      }

    fetchQuestions()
  }, [quizId])

  // 🔥 COMPLETE
  const handleQuizComplete =
    async (
      quizStats: QuizStats
    ) => {
      setStats(quizStats)

      setQuizCompleted(true)

      const { data } =
        await supabase.auth.getUser()

      const user =
        data.user

      if (!user) return

      const today =
        new Date()
          .toISOString()
          .split('T')[0]

      // 🔥 ACTIVITY
      const {
        data: existing,
      } = await supabase
        .from(
          'user_activity'
        )
        .select('*')
        .eq(
          'user_id',
          user.id
        )
        .eq(
          'date',
          today
        )
        .single()

      if (existing) {
        await supabase
          .from(
            'user_activity'
          )
          .update({
            correct_answers:
              (existing.correct_answers ||
                0) +
              quizStats.correct,

            wrong_answers:
              (existing.wrong_answers ||
                0) +
              (quizStats.total -
                quizStats.correct),
          })
          .eq(
            'id',
            existing.id
          )
      } else {
        await supabase
          .from(
            'user_activity'
          )
          .insert({
            user_id:
              user.id,

            date: today,

            correct_answers:
              quizStats.correct,

            wrong_answers:
              quizStats.total -
              quizStats.correct,
          })
      }

      // 🔥 GLOBAL PROGRESS
      const {
        data: progress,
      } = await supabase
        .from(
          'user_progress'
        )
        .select('*')
        .eq(
          'user_id',
          user.id
        )
        .single()

      const newCorrect =
        (progress?.total_correct ||
          0) +
        quizStats.correct

      const newWrong =
        (progress?.total_wrong ||
          0) +
        (quizStats.total -
          quizStats.correct)

      await supabase
        .from(
          'user_progress'
        )
        .upsert({
          user_id: user.id,

          total_correct:
            newCorrect,

          total_wrong:
            newWrong,

          last_activity_date:
            today,
        })
    }

  const handleRetry = () => {
    setQuizStarted(false)

    setQuizCompleted(false)

    setStats(null)
  }

  // 🔄 LOADING
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">

        <div className="text-center space-y-5">

          <div className="w-20 h-20 rounded-[28px] bg-gradient-to-r from-blue-600 to-purple-600 animate-pulse mx-auto shadow-xl" />

          <div>

            <h2 className="text-2xl font-black">
              Loading Quiz
            </h2>

            <p className="text-muted-foreground mt-2">
              Preparing your questions...
            </p>

          </div>

        </div>
      </div>
    )
  }

  // 🚀 START SCREEN
  if (!quizStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center px-6 py-12">

        <div className="max-w-3xl w-full">

          <div className="relative overflow-hidden rounded-[40px] bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 p-10 text-white shadow-2xl">

            {/* BG */}
            <div className="absolute inset-0 opacity-20">

              <div className="absolute top-0 right-0 w-72 h-72 rounded-full bg-white blur-3xl" />

              <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-cyan-300 blur-3xl" />

            </div>

            <div className="relative z-10 text-center">

              <div className="w-28 h-28 rounded-[32px] bg-white/20 backdrop-blur-md flex items-center justify-center mx-auto shadow-2xl mb-8">

                <Brain className="w-14 h-14 text-white" />

              </div>

              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-5 py-2 rounded-2xl mb-6">

                <Sparkles className="w-4 h-4" />

                <span className="font-semibold text-sm">
                  Deutschly Quiz
                </span>

              </div>

              <h1 className="text-6xl font-black leading-tight">
                Ready?
              </h1>

              <p className="text-white/80 text-xl mt-5 max-w-xl mx-auto leading-relaxed">
                Test your German knowledge and improve your grammar,
                vocabulary and comprehension skills.
              </p>

              {/* STATS */}
              <div className="grid md:grid-cols-2 gap-5 mt-10">

                <div className="bg-white/15 backdrop-blur-md rounded-3xl p-6">

                  <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center mx-auto mb-4">

                    <Target className="w-7 h-7" />

                  </div>

                  <h3 className="text-4xl font-black">
                    {
                      questions.length
                    }
                  </h3>

                  <p className="text-white/70 mt-2">
                    Questions
                  </p>

                </div>

                <div className="bg-white/15 backdrop-blur-md rounded-3xl p-6">

                  <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center mx-auto mb-4">

                    <Trophy className="w-7 h-7" />

                  </div>

                  <h3 className="text-4xl font-black">
                    100%
                  </h3>

                  <p className="text-white/70 mt-2">
                    Best Accuracy
                  </p>

                </div>

              </div>

              {/* BUTTON */}
              <Button
                onClick={() =>
                  setQuizStarted(
                    true
                  )
                }
                className="
                  mt-10 h-16 px-12 rounded-3xl
                  bg-white text-blue-600
                  hover:bg-white/90
                  text-xl font-black
                  shadow-2xl
                "
              >
                Start Quiz 🚀
              </Button>

            </div>
          </div>
        </div>
      </div>
    )
  }

  // 🏆 RESULTS
  if (
    quizCompleted &&
    stats
  ) {
    const percentage =
      Math.round(
        (stats.correct /
          stats.total) *
          100
      )

    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center px-6 py-12">

        <div className="max-w-3xl w-full">

          <div className="bg-white rounded-[40px] border shadow-2xl overflow-hidden">

            {/* TOP */}
            <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 p-10 text-white text-center">

              {/* BG */}
              <div className="absolute inset-0 opacity-20">

                <div className="absolute top-0 right-0 w-72 h-72 rounded-full bg-white blur-3xl" />

              </div>

              <div className="relative z-10">

                <div className="w-28 h-28 rounded-[32px] bg-white/20 backdrop-blur-md flex items-center justify-center mx-auto shadow-2xl mb-8">

                  <Trophy className="w-14 h-14 text-white" />

                </div>

                <h1 className="text-5xl font-black">
                  Quiz Complete 🎉
                </h1>

                <p className="text-white/80 text-lg mt-4">
                  Great job finishing the quiz
                </p>

              </div>
            </div>

            {/* CONTENT */}
            <div className="p-10 space-y-10">

              {/* SCORE */}
              <div className="grid md:grid-cols-2 gap-6">

                <div className="rounded-[30px] bg-gradient-to-br from-blue-50 to-blue-100 p-8 text-center">

                  <div className="w-16 h-16 rounded-3xl bg-blue-600 flex items-center justify-center mx-auto mb-5 shadow-lg">

                    <CheckCircle2 className="w-8 h-8 text-white" />

                  </div>

                  <p className="text-muted-foreground font-medium">
                    Correct Answers
                  </p>

                  <h2 className="text-6xl font-black mt-3">
                    {
                      stats.correct
                    }
                    /
                    {
                      stats.total
                    }
                  </h2>

                </div>

                <div className="rounded-[30px] bg-gradient-to-br from-purple-50 to-purple-100 p-8 text-center">

                  <div className="w-16 h-16 rounded-3xl bg-purple-600 flex items-center justify-center mx-auto mb-5 shadow-lg">

                    <Target className="w-8 h-8 text-white" />

                  </div>

                  <p className="text-muted-foreground font-medium">
                    Accuracy
                  </p>

                  <h2 className="text-6xl font-black mt-3">
                    {
                      percentage
                    }
                    %
                  </h2>

                </div>

              </div>

              {/* PROGRESS */}
              <div>

                <div className="flex items-center justify-between mb-4">

                  <p className="font-bold text-lg">
                    Performance
                  </p>

                  <p className="font-semibold text-muted-foreground">
                    {
                      percentage
                    }
                    %
                  </p>

                </div>

                <Progress
                  value={
                    percentage
                  }
                  className="h-5 rounded-full"
                />

              </div>

              {/* BUTTONS */}
              <div className="flex flex-wrap gap-5 justify-center">

                <Button
                  onClick={
                    handleRetry
                  }
                  className="
                    h-14 px-8 rounded-2xl
                    bg-gradient-to-r from-blue-600 to-purple-600
                    hover:opacity-90
                    text-white font-bold shadow-lg
                  "
                >

                  <div className="flex items-center gap-2">

                    <RotateCcw className="w-5 h-5" />

                    Try Again

                  </div>

                </Button>

                <Link href="/dashboard/exercises">

                  <Button
                    variant="outline"
                    className="h-14 px-8 rounded-2xl border-2"
                  >

                    <div className="flex items-center gap-2">

                      <ArrowLeft className="w-5 h-5" />

                      Back

                    </div>

                  </Button>

                </Link>

              </div>

            </div>
          </div>
        </div>
      </div>
    )
  }

  // 🧠 QUIZ
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-10 px-4">

      <div className="max-w-5xl mx-auto">

        {/* HEADER */}
        <div className="mb-8 text-center">

          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-5 py-3 rounded-2xl shadow-lg mb-5">

            <Brain className="w-5 h-5" />

            <span className="font-semibold">
              Interactive Quiz
            </span>

          </div>

          <h1 className="text-5xl font-black">
            German Quiz
          </h1>

          <p className="text-muted-foreground text-lg mt-3">
            Answer the questions and improve your skills
          </p>

        </div>

        {/* QUIZ CARD */}
        <div className="bg-white rounded-[36px] shadow-2xl border overflow-hidden">

          <QuizCard
            questions={
              questions
            }
            onComplete={
              handleQuizComplete
            }
          />

        </div>
      </div>
    </div>
  )
}