'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { QuizCard, type QuizQuestion } from '@/components/QuizCard'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { supabase } from '@/lib/supabaseClient'

interface QuizStats {
  correct: number
  total: number
}

export default function QuizPage() {
  const params = useParams()
  const quizId = params.id as string

  const [loading, setLoading] = useState(true)
  const [questions, setQuestions] = useState<QuizQuestion[]>([])

  const [quizStarted, setQuizStarted] = useState(false)
  const [quizCompleted, setQuizCompleted] = useState(false)
  const [stats, setStats] = useState<QuizStats | null>(null)

  // 🔥 FETCH QUESTIONS
  useEffect(() => {
    const fetchQuestions = async () => {
      const { data, error } = await supabase
        .from('quiz_questions')
        .select('*')
        .eq('exercise_id', quizId)

      if (error) {
        console.error(error)
        return
      }

      const formatted: QuizQuestion[] =
        data?.map((q: any) => ({
          id: q.id,
          question: q.question,
          icon: '🧠',
          answers: [
            { id: 'a', text: q.option_a, isCorrect: q.correct_answer === 'a' },
            { id: 'b', text: q.option_b, isCorrect: q.correct_answer === 'b' },
            { id: 'c', text: q.option_c, isCorrect: q.correct_answer === 'c' },
            { id: 'd', text: q.option_d, isCorrect: q.correct_answer === 'd' },
          ],
          explanation: q.explanation || '',
        })) || []

      setQuestions(formatted)
      setLoading(false)
    }

    fetchQuestions()
  }, [quizId])

  // 🔥 FIXED ACTIVITY SYSTEM
  const handleQuizComplete = async (quizStats: QuizStats) => {
    setStats(quizStats)
    setQuizCompleted(true)

    const { data } = await supabase.auth.getUser()
    const user = data.user
    if (!user) return

    const today = new Date().toISOString().split('T')[0]

    // 🔥 1. GET TODAY ACTIVITY
    const { data: existing } = await supabase
      .from('user_activity')
      .select('*')
      .eq('user_id', user.id)
      .eq('date', today)
      .single()

    if (existing) {
      // ✅ UPDATE (ACCUMULATE)
      await supabase
        .from('user_activity')
        .update({
          correct_answers:
            (existing.correct_answers || 0) + quizStats.correct,
          wrong_answers:
            (existing.wrong_answers || 0) +
            (quizStats.total - quizStats.correct),
        })
        .eq('id', existing.id)
    } else {
      // ✅ INSERT
      await supabase.from('user_activity').insert({
        user_id: user.id,
        date: today,
        correct_answers: quizStats.correct,
        wrong_answers: quizStats.total - quizStats.correct,
      })
    }

    // 🔥 2. UPDATE GLOBAL PROGRESS
    const { data: progress } = await supabase
      .from('user_progress')
      .select('*')
      .eq('user_id', user.id)
      .single()

    const newCorrect =
      (progress?.total_correct || 0) + quizStats.correct

    const newWrong =
      (progress?.total_wrong || 0) +
      (quizStats.total - quizStats.correct)

    await supabase.from('user_progress').upsert({
      user_id: user.id,
      total_correct: newCorrect,
      total_wrong: newWrong,
      last_activity_date: today,
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
      <div className="min-h-screen flex items-center justify-center">
        Loading quiz...
      </div>
    )
  }

  // 🚀 START
  if (!quizStarted) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-4xl font-bold mb-4">Ready for a Quiz?</h1>

        <p className="mb-6 text-muted-foreground">
          {questions.length} questions waiting for you
        </p>

        <Button
          onClick={() => setQuizStarted(true)}
          className="px-8 py-4 text-lg"
        >
          Start Quiz 🎯
        </Button>
      </div>
    )
  }

  // 🏆 RESULT
  if (quizCompleted && stats) {
    const percentage = Math.round(
      (stats.correct / stats.total) * 100
    )

    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center space-y-6">
        <h1 className="text-4xl font-bold">Quiz Complete 🎉</h1>

        <div className="text-6xl font-bold text-primary">
          {stats.correct}/{stats.total}
        </div>

        <div className="w-full max-w-md">
          <Progress value={percentage} />
          <p className="mt-2">{percentage}% accuracy</p>
        </div>

        <div className="flex gap-4">
          <Button onClick={handleRetry}>Try Again</Button>

          <Link href="/dashboard/exercises">
            <Button variant="outline">Back</Button>
          </Link>
        </div>
      </div>
    )
  }

  // 🧠 QUIZ
  return (
    <div className="min-h-screen p-4">
      <QuizCard
        questions={questions}
        onComplete={handleQuizComplete}
      />
    </div>
  )
}