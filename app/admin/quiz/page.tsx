'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { useRouter } from 'next/navigation'
import { AdminSidebar } from '@/components/AdminSidebar'

type Language = 'en' | 'fr' | 'ar'

export default function AdminQuizPage() {
  const router = useRouter()

  const [language, setLanguage] = useState<Language>('en')
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const [title, setTitle] = useState('')
  const [level, setLevel] = useState('A1')

  const [questions, setQuestions] = useState([
    {
      question: '',
      option_a: '',
      option_b: '',
      option_c: '',
      option_d: '',
      correct_answer: 'a',
    },
  ])

  const [loading, setLoading] = useState(false)

  const addQuestion = () => {
    setQuestions([
      ...questions,
      {
        question: '',
        option_a: '',
        option_b: '',
        option_c: '',
        option_d: '',
        correct_answer: 'a',
      },
    ])
  }

  const handleChange = (i: number, field: string, value: string) => {
    const updated = [...questions]
    updated[i][field] = value
    setQuestions(updated)
  }

  const handleSubmit = async () => {
    if (!title) return alert('Title required')

    setLoading(true)

    try {
      const { data: exercise, error: exError } = await supabase
        .from('exercises')
        .insert([
          {
            title,
            type: 'quiz',
            level,
          },
        ])
        .select()
        .single()

      if (exError) throw exError

      const formatted = questions.map((q) => ({
        exercise_id: exercise.id,
        question: q.question,
        option_a: q.option_a,
        option_b: q.option_b,
        option_c: q.option_c,
        option_d: q.option_d,
        correct_answer: q.correct_answer,
      }))

      const { error: qError } = await supabase
        .from('quiz_questions')
        .insert(formatted)

      if (qError) throw qError

      alert('Quiz created successfully ✅')
      router.push('/admin/exercises')

    } catch (err) {
      console.error(err)
      alert('Error creating quiz ❌')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen bg-background">
      
      {/* SIDEBAR */}
      <AdminSidebar
        language={language}
        open={sidebarOpen}
        setOpen={setSidebarOpen}
      />

      {/* MAIN */}
      <main className="flex-1 p-6">

        <h1 className="text-2xl font-bold mb-6">Create Quiz</h1>

        {/* TITLE */}
        <input
          className="w-full border p-3 rounded-lg mb-4"
          placeholder="Quiz title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        {/* LEVEL */}
        <select
          value={level}
          onChange={(e) => setLevel(e.target.value)}
          className="border p-3 rounded-lg mb-6"
        >
          <option value="A1">A1</option>
          <option value="A2">A2</option>
          <option value="B1">B1</option>
          <option value="B2">B2</option>
        </select>

        {/* QUESTIONS */}
        <div className="space-y-6">
          {questions.map((q, i) => (
            <div key={i} className="border p-4 rounded-lg space-y-3">
              <h3 className="font-semibold">Question {i + 1}</h3>

              <input
                className="w-full border p-2 rounded"
                placeholder="Question"
                value={q.question}
                onChange={(e) =>
                  handleChange(i, 'question', e.target.value)
                }
              />

              <input
                className="w-full border p-2 rounded"
                placeholder="Option A"
                value={q.option_a}
                onChange={(e) =>
                  handleChange(i, 'option_a', e.target.value)
                }
              />

              <input
                className="w-full border p-2 rounded"
                placeholder="Option B"
                value={q.option_b}
                onChange={(e) =>
                  handleChange(i, 'option_b', e.target.value)
                }
              />

              <input
                className="w-full border p-2 rounded"
                placeholder="Option C"
                value={q.option_c}
                onChange={(e) =>
                  handleChange(i, 'option_c', e.target.value)
                }
              />

              <input
                className="w-full border p-2 rounded"
                placeholder="Option D"
                value={q.option_d}
                onChange={(e) =>
                  handleChange(i, 'option_d', e.target.value)
                }
              />

              <select
                value={q.correct_answer}
                onChange={(e) =>
                  handleChange(i, 'correct_answer', e.target.value)
                }
                className="border p-2 rounded"
              >
                <option value="a">Correct: A</option>
                <option value="b">Correct: B</option>
                <option value="c">Correct: C</option>
                <option value="d">Correct: D</option>
              </select>
            </div>
          ))}
        </div>

        {/* BUTTONS */}
        <div className="flex gap-3 mt-6">
          <button
            onClick={addQuestion}
            className="px-4 py-2 bg-secondary rounded-lg"
          >
            + Add Question
          </button>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="px-6 py-2 bg-primary text-white rounded-lg"
          >
            {loading ? 'Creating...' : 'Create Quiz'}
          </button>
        </div>

      </main>
    </div>
  )
}