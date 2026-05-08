'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { AdminSidebar } from '@/components/AdminSidebar'
import { useLanguage } from '@/context/LanguageContext'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

export default function AdminPlacementPage() {
  const { language } = useLanguage()

  const [sidebarOpen, setSidebarOpen] = useState(false)

  const [question, setQuestion] = useState('')
  const [type, setType] = useState('quiz')
  const [level, setLevel] = useState('A1')
  const [category, setCategory] = useState('grammar')

  const [imageUrl, setImageUrl] = useState('')
  const [audioUrl, setAudioUrl] = useState('')

  const [optionA, setOptionA] = useState('')
  const [optionB, setOptionB] = useState('')
  const [optionC, setOptionC] = useState('')
  const [optionD, setOptionD] = useState('')

  const [correctAnswer, setCorrectAnswer] = useState('A')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const { error } = await supabase
      .from('placement_questions')
      .insert([
        {
          question,
          type,
          level,
          category,
          image_url: imageUrl || null,
          audio_url: audioUrl || null,
          option_a: optionA,
          option_b: optionB,
          option_c: optionC,
          option_d: optionD,
          correct_answer: correctAnswer,
        },
      ])

    if (error) {
      console.error(error)
      alert('Error adding question')
      return
    }

    alert('Question added successfully ✅')

    setQuestion('')
    setImageUrl('')
    setAudioUrl('')
    setOptionA('')
    setOptionB('')
    setOptionC('')
    setOptionD('')
  }

  return (
    <div className="flex min-h-screen bg-background">

      <AdminSidebar
        language={language}
        open={sidebarOpen}
        setOpen={setSidebarOpen}
      />

      <main className="flex-1 overflow-y-auto">

        <div className="bg-white border-b sticky top-0 z-10">
          <div className="max-w-3xl mx-auto px-6 py-6 flex items-center gap-4">

            <button
              onClick={() => setSidebarOpen(true)}
              className="md:hidden text-2xl"
            >
              ☰
            </button>

            <h1 className="text-3xl font-bold">
              Add Placement Question
            </h1>
          </div>
        </div>

        <div className="max-w-3xl mx-auto px-6 py-10">

          <form onSubmit={handleSubmit} className="space-y-6">

            <div>
              <label className="block mb-2 font-medium">
                Question
              </label>

              <Input
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">

              <div>
                <label className="block mb-2 font-medium">
                  Type
                </label>

                <select
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  className="w-full border rounded-lg p-3"
                >
                  <option value="quiz">Quiz</option>
                  <option value="audio">Audio</option>
                  <option value="image">Image</option>
                </select>
              </div>

              <div>
                <label className="block mb-2 font-medium">
                  Level
                </label>

                <select
                  value={level}
                  onChange={(e) => setLevel(e.target.value)}
                  className="w-full border rounded-lg p-3"
                >
                  <option>A1</option>
                  <option>A2</option>
                  <option>B1</option>
                  <option>B2</option>
                  <option>C1</option>
                  <option>C2</option>
                </select>
              </div>

            </div>

            <div>
              <label className="block mb-2 font-medium">
                Category
              </label>

              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full border rounded-lg p-3"
              >
                <option value="grammar">Grammar</option>
                <option value="vocabulary">Vocabulary</option>
                <option value="listening">Listening</option>
                <option value="reading">Reading</option>
              </select>
            </div>

            {type === 'image' && (
              <div>
                <label className="block mb-2 font-medium">
                  Image URL
                </label>

                <Input
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                />
              </div>
            )}

            {type === 'audio' && (
              <div>
                <label className="block mb-2 font-medium">
                  Audio URL
                </label>

                <Input
                  value={audioUrl}
                  onChange={(e) => setAudioUrl(e.target.value)}
                />
              </div>
            )}

            <div className="grid md:grid-cols-2 gap-4">
              <Input placeholder="Option A" value={optionA} onChange={(e) => setOptionA(e.target.value)} />
              <Input placeholder="Option B" value={optionB} onChange={(e) => setOptionB(e.target.value)} />
              <Input placeholder="Option C" value={optionC} onChange={(e) => setOptionC(e.target.value)} />
              <Input placeholder="Option D" value={optionD} onChange={(e) => setOptionD(e.target.value)} />
            </div>

            <div>
              <label className="block mb-2 font-medium">
                Correct Answer
              </label>

              <select
                value={correctAnswer}
                onChange={(e) => setCorrectAnswer(e.target.value)}
                className="w-full border rounded-lg p-3"
              >
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
                <option value="D">D</option>
              </select>
            </div>

            <Button className="bg-primary text-white">
              Add Question
            </Button>

          </form>
        </div>
      </main>
    </div>
  )
}