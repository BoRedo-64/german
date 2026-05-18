'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { useRouter } from 'next/navigation'

import { AdminSidebar } from '@/components/AdminSidebar'

import {
  Plus,
  Sparkles,
  Brain,
  CheckCircle2,
  Menu,
  Trash2,
  UploadCloud,
  Headphones,
} from 'lucide-react'


export default function AdminQuizPage() {
  const router = useRouter()

  const [sidebarOpen, setSidebarOpen] =
    useState(false)

  const [title, setTitle] =
    useState('')

  const [level, setLevel] =
    useState('A1')

  const [type, setType] =
    useState<'quiz' | 'audio'>(
      'quiz'
    )

  const [fileUrl, setFileUrl] =
    useState('')

  const [uploading, setUploading] =
    useState(false)

  const [questions, setQuestions] =
    useState([
      {
        question: '',
        option_a: '',
        option_b: '',
        option_c: '',
        option_d: '',
        correct_answer: 'a',
      },
    ])

  const [loading, setLoading] =
    useState(false)

  // 🔥 ADD QUESTION
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

  // 🔥 DELETE QUESTION
  const removeQuestion = (
    index: number
  ) => {
    if (questions.length === 1)
      return

    const updated =
      questions.filter(
        (_, i) => i !== index
      )

    setQuestions(updated)
  }

  // 🔥 HANDLE CHANGE
  const handleChange = (
    i: number,
    field: string,
    value: string
  ) => {
    const updated = [...questions]

    updated[i][field] = value

    setQuestions(updated)
  }

  // 🔥 AUDIO UPLOAD
  const handleAudioUpload = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file =
      e.target.files?.[0]

    if (!file) return

    setUploading(true)

    try {
      const fileName = `${Date.now()}-${
        file.name
      }`

      const { error } =
        await supabase.storage
          .from('audio')
          .upload(fileName, file)

      if (error) throw error

      const { data } =
        supabase.storage
          .from('audio')
          .getPublicUrl(
            fileName
          )

      setFileUrl(
        data.publicUrl
      )
    } catch (err) {
      console.error(err)

      alert(
        'Error uploading audio ❌'
      )
    } finally {
      setUploading(false)
    }
  }

  // 🔥 SUBMIT
  const handleSubmit = async () => {
    if (!title)
      return alert(
        'Title required'
      )

    if (
      type === 'audio' &&
      !fileUrl
    ) {
      return alert(
        'Please upload audio file'
      )
    }

    setLoading(true)

    try {
      // CREATE EXERCISE
      const {
        data: exercise,
        error: exError,
      } = await supabase
        .from('exercises')
        .insert([
          {
            title,
            type,
            level,
            file_url:
              type === 'audio'
                ? fileUrl
                : null,
          },
        ])
        .select()
        .single()

      if (exError)
        throw exError

      // FORMAT QUESTIONS
      const formatted =
        questions.map((q) => ({
          exercise_id:
            exercise.id,

          question:
            q.question,

          option_a:
            q.option_a,

          option_b:
            q.option_b,

          option_c:
            q.option_c,

          option_d:
            q.option_d,

          correct_answer:
            q.correct_answer,
        }))

      // INSERT QUESTIONS
      const {
        error: qError,
      } = await supabase
        .from(
          'quiz_questions'
        )
        .insert(formatted)

      if (qError)
        throw qError

      alert(
        `${
          type === 'audio'
            ? 'Audio quiz'
            : 'Quiz'
        } created successfully ✅`
      )

      router.push(
        '/admin/exercises'
      )
    } catch (err) {
      console.error(err)

      alert(
        'Error creating quiz ❌'
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex h-screen overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">

      {/* SIDEBAR */}
      <AdminSidebar
        open={sidebarOpen}
        setOpen={setSidebarOpen}
      />

      {/* MAIN */}
      <main className="flex-1 h-screen overflow-y-auto">

        {/* HEADER */}
        <div className="sticky top-0 z-20 backdrop-blur-xl bg-white/70 border-b border-white/30">

          <div className="max-w-6xl mx-auto px-6 py-6 flex items-center justify-between">

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

              <div className="flex items-center gap-4">

                <div>

                  <h1 className="text-4xl font-black tracking-tight">
                    Create Quiz
                  </h1>

                  <p className="text-muted-foreground mt-1">
                    Build interactive quizzes for students
                  </p>

                </div>

              </div>
            </div>

          </div>
        </div>

        {/* HERO */}
        <div className="max-w-6xl mx-auto px-6 pt-8">

          <div className="relative overflow-hidden rounded-[36px] bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 p-10 text-white shadow-2xl">

            {/* BG */}
            <div className="absolute inset-0 opacity-20">

              <div className="absolute top-0 right-0 w-72 h-72 rounded-full bg-white blur-3xl" />

              <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-cyan-300 blur-3xl" />

            </div>

            <div className="relative z-10 max-w-2xl">

              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-2 rounded-2xl mb-5">

                <Sparkles className="w-4 h-4" />

                <span className="text-sm font-semibold">
                  Deutschly Quiz Builder
                </span>

              </div>

              <h2 className="text-5xl font-black leading-tight">
                Create Smart Quizzes
              </h2>

              <p className="text-white/80 text-lg mt-4 leading-relaxed">
                Design engaging quizzes to help students improve grammar,
                vocabulary and comprehension.
              </p>

            </div>
          </div>
        </div>

        {/* CONTENT */}
        <div className="max-w-6xl mx-auto px-6 py-10 space-y-8">

          {/* QUIZ INFO */}
          <div className="bg-white rounded-[32px] border shadow-xl p-8">

            <div className="flex items-center gap-3 mb-8">

              <div className="w-14 h-14 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center shadow-lg">

                <Brain className="w-7 h-7 text-white" />

              </div>

              <div>

                <h3 className="text-3xl font-black">
                  Quiz Information
                </h3>

                <p className="text-muted-foreground mt-1">
                  Configure the main quiz settings
                </p>

              </div>

            </div>

            <div className="grid md:grid-cols-3 gap-6">

              {/* TITLE */}
              <div className="space-y-3">

                <label className="text-sm font-bold uppercase tracking-wide text-muted-foreground">
                  Quiz Title
                </label>

                <input
                  className="
                    w-full h-14 rounded-2xl
                    border-2 border-border
                    px-5 bg-white
                    focus:outline-none focus:ring-2 focus:ring-blue-500
                  "
                  placeholder="German Grammar Basics"
                  value={title}
                  onChange={(e) =>
                    setTitle(
                      e.target.value
                    )
                  }
                />

              </div>

              {/* LEVEL */}
              <div className="space-y-3">

                <label className="text-sm font-bold uppercase tracking-wide text-muted-foreground">
                  Difficulty Level
                </label>

                <select
                  value={level}
                  onChange={(e) =>
                    setLevel(
                      e.target.value
                    )
                  }
                  className="
                    w-full h-14 rounded-2xl
                    border-2 border-border
                    px-5 bg-white
                    focus:outline-none focus:ring-2 focus:ring-blue-500
                  "
                >
                  <option value="A1">
                    A1
                  </option>

                  <option value="A2">
                    A2
                  </option>

                  <option value="B1">
                    B1
                  </option>

                  <option value="B2">
                    B2
                  </option>

                  <option value="C1">
                    C1
                  </option>

                  <option value="C2">
                    C2
                  </option>

                </select>

              </div>

              {/* TYPE */}
              <div className="space-y-3">

                <label className="text-sm font-bold uppercase tracking-wide text-muted-foreground">
                  Exercise Type
                </label>

                <select
                  value={type}
                  onChange={(e) => {
                    setType(
                      e.target.value as
                        | 'quiz'
                        | 'audio'
                    )

                    setFileUrl('')
                  }}
                  className="
                    w-full h-14 rounded-2xl
                    border-2 border-border
                    px-5 bg-white
                    focus:outline-none focus:ring-2 focus:ring-blue-500
                  "
                >

                  <option value="quiz">
                    Quiz
                  </option>

                  <option value="audio">
                    Audio Quiz
                  </option>

                </select>

              </div>

            </div>

            {/* AUDIO SECTION */}
            {type === 'audio' && (
              <div className="mt-8">

                <div className="space-y-4">

                  <label className="text-sm font-bold uppercase tracking-wide text-muted-foreground">
                    Audio Upload
                  </label>

                  <div className="rounded-[28px] border-2 border-dashed border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50 p-10 text-center">

                    <div className="mx-auto mb-6 w-20 h-20 rounded-3xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center shadow-xl">

                      <UploadCloud className="w-10 h-10 text-white" />

                    </div>

                    <input
                      type="file"
                      accept="audio/*"
                      onChange={
                        handleAudioUpload
                      }
                      className="mb-6"
                    />

                    {uploading ? (
                      <div className="space-y-3">

                        <p className="font-semibold text-blue-700">
                          Uploading audio...
                        </p>

                        <div className="w-full bg-blue-100 rounded-full h-3 overflow-hidden">

                          <div className="bg-blue-600 h-3 w-2/3 animate-pulse rounded-full" />

                        </div>

                      </div>
                    ) : fileUrl ? (
                      <div className="space-y-5">

                        <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-5 py-3 rounded-2xl font-semibold">

                          <Headphones className="w-5 h-5" />

                          Audio uploaded successfully

                        </div>

                        <audio
                          controls
                          className="w-full"
                        >

                          <source
                            src={fileUrl}
                          />

                        </audio>

                      </div>
                    ) : (
                      <div>

                        <p className="font-semibold text-foreground">
                          Upload MP3 audio
                        </p>

                        <p className="text-sm text-muted-foreground mt-2">
                          Listening exercises supported
                        </p>

                      </div>
                    )}

                  </div>

                </div>

              </div>
            )}

          </div>

          {/* QUESTIONS */}
          <div className="space-y-8">

            {questions.map((q, i) => (
              <div
                key={i}
                className="bg-white rounded-[32px] border shadow-xl overflow-hidden"
              >

                {/* TOP */}
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white flex items-center justify-between">

                  <div className="flex items-center gap-4">

                    <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center">

                      <CheckCircle2 className="w-7 h-7" />

                    </div>

                    <div>

                      <h3 className="text-2xl font-black">
                        Question {i + 1}
                      </h3>

                      <p className="text-white/80 text-sm">
                        Create multiple choice answers
                      </p>

                    </div>

                  </div>

                  {questions.length >
                    1 && (
                    <button
                      onClick={() =>
                        removeQuestion(
                          i
                        )
                      }
                      className="
                        w-12 h-12 rounded-2xl
                        bg-red-500/20 hover:bg-red-500/30
                        flex items-center justify-center
                        transition
                      "
                    >

                      <Trash2 className="w-5 h-5" />

                    </button>
                  )}

                </div>

                {/* CONTENT */}
                <div className="p-8 space-y-6">

                  {/* QUESTION */}
                  <div className="space-y-3">

                    <label className="text-sm font-bold uppercase tracking-wide text-muted-foreground">
                      Question
                    </label>

                    <textarea
                      placeholder="Write your question..."
                      value={q.question}
                      onChange={(e) =>
                        handleChange(
                          i,
                          'question',
                          e.target.value
                        )
                      }
                      className="
                        w-full min-h-[120px]
                        rounded-2xl border-2 border-border
                        p-5 resize-none
                        focus:outline-none focus:ring-2 focus:ring-blue-500
                      "
                    />

                  </div>

                  {/* OPTIONS */}
                  <div className="grid md:grid-cols-2 gap-5">

                    <OptionInput
                      label="Option A"
                      value={q.option_a}
                      onChange={(v) =>
                        handleChange(
                          i,
                          'option_a',
                          v
                        )
                      }
                    />

                    <OptionInput
                      label="Option B"
                      value={q.option_b}
                      onChange={(v) =>
                        handleChange(
                          i,
                          'option_b',
                          v
                        )
                      }
                    />

                    <OptionInput
                      label="Option C"
                      value={q.option_c}
                      onChange={(v) =>
                        handleChange(
                          i,
                          'option_c',
                          v
                        )
                      }
                    />

                    <OptionInput
                      label="Option D"
                      value={q.option_d}
                      onChange={(v) =>
                        handleChange(
                          i,
                          'option_d',
                          v
                        )
                      }
                    />

                  </div>

                  {/* CORRECT ANSWER */}
                  <div className="space-y-3">

                    <label className="text-sm font-bold uppercase tracking-wide text-muted-foreground">
                      Correct Answer
                    </label>

                    <select
                      value={
                        q.correct_answer
                      }
                      onChange={(e) =>
                        handleChange(
                          i,
                          'correct_answer',
                          e.target.value
                        )
                      }
                      className="
                        h-14 rounded-2xl
                        border-2 border-border
                        px-5 bg-white
                        focus:outline-none focus:ring-2 focus:ring-blue-500
                      "
                    >
                      <option value="a">
                        Option A
                      </option>

                      <option value="b">
                        Option B
                      </option>

                      <option value="c">
                        Option C
                      </option>

                      <option value="d">
                        Option D
                      </option>

                    </select>

                  </div>

                </div>
              </div>
            ))}

          </div>

          {/* BUTTONS */}
          <div className="flex flex-wrap gap-5">

            {/* ADD QUESTION */}
            <button
              onClick={addQuestion}
              className="
                h-14 px-8 rounded-2xl
                bg-white border shadow-lg
                hover:shadow-xl
                transition-all
                font-semibold
                flex items-center gap-3
              "
            >

              <Plus className="w-5 h-5" />

              Add Question

            </button>

            {/* CREATE QUIZ */}
            <button
              onClick={handleSubmit}
              disabled={
                loading ||
                uploading
              }
              className="
                h-14 px-10 rounded-2xl
                bg-gradient-to-r from-blue-600 to-purple-600
                hover:opacity-90
                text-white font-bold shadow-lg
                transition-all
              "
            >
              {loading
                ? 'Creating Quiz...'
                : 'Create Quiz'}
            </button>

          </div>
        </div>
      </main>
    </div>
  )
}

function OptionInput({
  label,
  value,
  onChange,
}: any) {
  return (
    <div className="space-y-3">

      <label className="text-sm font-bold uppercase tracking-wide text-muted-foreground">
        {label}
      </label>

      <input
        value={value}
        onChange={(e) =>
          onChange(e.target.value)
        }
        placeholder={`Enter ${label}`}
        className="
          w-full h-14 rounded-2xl
          border-2 border-border
          px-5 bg-white
          focus:outline-none focus:ring-2 focus:ring-blue-500
        "
      />

    </div>
  )
}