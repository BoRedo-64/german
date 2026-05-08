'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'

export default function PlacementTestPage() {
  const router = useRouter()

  const [questions, setQuestions] = useState<any[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [score, setScore] = useState(0)

  useEffect(() => {
    const fetchQuestions = async () => {
      const { data } = await supabase
        .from('placement_questions')
        .select('*')

      if (!data) return

      const shuffled = [...data]
        .sort(() => Math.random() - 0.5)
        .slice(0, 30)

      setQuestions(shuffled)
    }

    fetchQuestions()
  }, [])

  if (questions.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        Loading...
      </div>
    )
  }

  const current = questions[currentIndex]

  const handleAnswer = (answer: string) => {
    let newScore = score

    if (answer === current.correct_answer) {
      newScore++
      setScore(newScore)
    }

    const next = currentIndex + 1

    if (next >= questions.length) {
      localStorage.setItem('placementScore', String(newScore))
      router.push('/dashboard/placement/result')
      return
    }

    setCurrentIndex(next)
  }

  return (
    <div className="min-h-screen bg-background">

      <div className="max-w-3xl mx-auto px-6 py-10">

        <div className="mb-8">

          <div className="flex justify-between mb-3">
            <p className="font-medium">
              Question {currentIndex + 1} / {questions.length}
            </p>

            <p className="text-muted-foreground">
              {current.level}
            </p>
          </div>

          <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
            <div
              className="bg-blue-500 h-full transition-all"
              style={{
                width: `${((currentIndex + 1) / questions.length) * 100}%`,
              }}
            />
          </div>
        </div>

        <div className="bg-white rounded-3xl border p-8 shadow-sm">

          {current.type === 'image' && current.image_url && (
            <img
              src={current.image_url}
              className="w-full h-72 object-cover rounded-2xl mb-6"
            />
          )}

          {current.type === 'audio' && current.audio_url && (
            <div className="mb-6 bg-blue-50 rounded-2xl p-6">
              <audio controls className="w-full">
                <source src={current.audio_url} />
              </audio>
            </div>
          )}

          <h1 className="text-3xl font-bold mb-8 leading-relaxed">
            {current.question}
          </h1>

          <div className="grid gap-4">

            {[
              { key: 'A', value: current.option_a },
              { key: 'B', value: current.option_b },
              { key: 'C', value: current.option_c },
              { key: 'D', value: current.option_d },
            ].map((option) => (
              <button
                key={option.key}
                onClick={() => handleAnswer(option.key)}
                className="text-left border rounded-2xl p-5 hover:bg-blue-50 hover:border-blue-400 transition"
              >
                <span className="font-bold mr-3">
                  {option.key}.
                </span>

                {option.value}
              </button>
            ))}

          </div>
        </div>
      </div>
    </div>
  )
}