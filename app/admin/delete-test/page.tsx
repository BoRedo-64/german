'use client'

import { useEffect, useState } from 'react'

import { supabase } from '@/lib/supabaseClient'
import { AdminSidebar } from '@/components/AdminSidebar'

import {
  Trash2,
  Brain,
  Search,
  Sparkles,
  CheckCircle2,
  Menu,
  Loader2,
  Calendar,
  Layers3,
  Headphones,
  Image as ImageIcon,
} from 'lucide-react'

type Question = {
  id: string
  type: string
  level: string
  category: string
  question: string
  image_url?: string
  audio_url?: string
  option_a?: string
  option_b?: string
  option_c?: string
  option_d?: string
  correct_answer?: string
  created_at?: string
}

export default function DeletePlacementQuestionsPage() {

  const [
    sidebarOpen,
    setSidebarOpen,
  ] = useState(false)

  const [loading, setLoading] =
    useState(true)

  const [
    deletingId,
    setDeletingId,
  ] = useState<string | null>(
    null
  )

  const [search, setSearch] =
    useState('')

  const [success, setSuccess] =
    useState(false)

  const [questions, setQuestions] =
    useState<Question[]>([])

  // 🔥 FETCH QUESTIONS
  const fetchQuestions =
    async () => {
      setLoading(true)

      const { data, error } =
        await supabase
          .from(
            'placement_questions'
          )
          .select('*')
          .order(
            'created_at',
            {
              ascending: false,
            }
          )

      if (error) {
        console.error(error)
      } else {
        setQuestions(
          data || []
        )
      }

      setLoading(false)
    }

  useEffect(() => {
    fetchQuestions()
  }, [])

  // 🔥 DELETE QUESTION
  const handleDelete =
    async (
      question: Question
    ) => {
      const confirmed =
        confirm(
          `Delete this question?`
        )

      if (!confirmed) return

      setDeletingId(
        question.id
      )

      const { error } =
        await supabase
          .from(
            'placement_questions'
          )
          .delete()
          .eq(
            'id',
            question.id
          )

      if (error) {
        console.error(error)

        alert(
          'Failed to delete question'
        )

        setDeletingId(
          null
        )

        return
      }

      setQuestions((prev) =>
        prev.filter(
          (q) =>
            q.id !== question.id
        )
      )

      setDeletingId(
        null
      )

      setSuccess(true)

      setTimeout(() => {
        setSuccess(false)
      }, 3000)
    }

  // 🔥 FILTER
  const filtered =
    questions.filter((q) =>
      q.question
        ?.toLowerCase()
        .includes(
          search.toLowerCase()
        )
    )

  // 🔥 TYPE ICON
  const getIcon = (
    type: string
  ) => {
    switch (type) {
      case 'audio':
        return Headphones

      case 'image':
        return ImageIcon

      default:
        return Brain
    }
  }

  // 🔥 TYPE COLOR
  const getColor = (
    type: string
  ) => {
    switch (type) {
      case 'audio':
        return 'from-orange-500 to-red-500'

      case 'image':
        return 'from-green-500 to-emerald-600'

      default:
        return 'from-purple-600 to-pink-600'
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

          <div className="max-w-7xl mx-auto px-6 py-6 flex items-center gap-4">

            {/* MOBILE */}
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

              <h1 className="text-4xl font-black tracking-tight">
                Delete Placement Questions
              </h1>

              <p className="text-muted-foreground mt-1">
                Manage and remove placement test questions
              </p>

            </div>

          </div>
        </div>

        {/* HERO */}
        <div className="max-w-7xl mx-auto px-6 pt-8">

          <div className="relative overflow-hidden rounded-[40px] bg-gradient-to-r from-red-500 via-pink-600 to-purple-600 p-10 text-white shadow-2xl">

            {/* BG */}
            <div className="absolute inset-0 opacity-20">

              <div className="absolute top-0 right-0 w-72 h-72 rounded-full bg-white blur-3xl" />

              <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-orange-300 blur-3xl" />

            </div>

            <div className="relative z-10 max-w-3xl">

              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-5 py-2 rounded-2xl mb-6">

                <Sparkles className="w-4 h-4" />

                <span className="font-semibold text-sm">
                  Placement Manager
                </span>

              </div>

              <h2 className="text-5xl md:text-6xl font-black leading-tight">
                Delete Questions
              </h2>

              <p className="text-white/80 text-xl mt-6 leading-relaxed">
                Remove placement test questions instantly
                from your platform.
              </p>

            </div>
          </div>
        </div>

        {/* CONTENT */}
        <div className="max-w-7xl mx-auto px-6 py-10">

          {/* SUCCESS */}
          {success && (
            <div className="mb-8 bg-green-100 border border-green-200 text-green-800 rounded-[28px] p-5 flex items-center gap-4 shadow-sm">

              <div className="w-14 h-14 rounded-2xl bg-green-500 flex items-center justify-center text-white shadow-lg">

                <CheckCircle2 className="w-7 h-7" />

              </div>

              <div>

                <p className="font-bold text-lg">
                  Question Deleted
                </p>

                <p className="text-sm opacity-80">
                  The question was removed successfully.
                </p>

              </div>

            </div>
          )}

          {/* SEARCH */}
          <div className="bg-white rounded-[32px] border shadow-xl p-6 mb-8">

            <div className="relative">

              <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />

              <input
                type="text"
                placeholder="Search questions..."
                value={search}
                onChange={(e) =>
                  setSearch(
                    e.target.value
                  )
                }
                className="
                  w-full h-14 rounded-2xl
                  border-2 border-border
                  pl-14 pr-5 bg-white
                  focus:outline-none focus:ring-2 focus:ring-red-500
                "
              />

            </div>

          </div>

          {/* LOADING */}
          {loading ? (
            <div className="flex items-center justify-center py-24">

              <div className="text-center space-y-5">

                <Loader2 className="w-14 h-14 animate-spin mx-auto text-red-500" />

                <div>

                  <h2 className="text-2xl font-black">
                    Loading Questions
                  </h2>

                  <p className="text-muted-foreground mt-2">
                    Please wait...
                  </p>

                </div>

              </div>

            </div>
          ) : filtered.length ===
            0 ? (
            <div className="bg-white rounded-[36px] border shadow-xl p-16 text-center">

              <div className="w-24 h-24 rounded-[32px] bg-secondary flex items-center justify-center mx-auto mb-8">

                <Trash2 className="w-12 h-12 text-muted-foreground" />

              </div>

              <h2 className="text-4xl font-black">
                No Questions Found
              </h2>

              <p className="text-muted-foreground text-lg mt-4">
                Try another search keyword.
              </p>

            </div>
          ) : (
            <div className="space-y-6">

              {filtered.map(
                (question) => {
                  const Icon =
                    getIcon(
                      question.type
                    )

                  return (
                    <div
                      key={
                        question.id
                      }
                      className="bg-white rounded-[32px] border shadow-xl overflow-hidden hover:shadow-2xl transition-all"
                    >

                      {/* TOP */}
                      <div
                        className={`
                          bg-gradient-to-r ${getColor(
                            question.type
                          )}
                          p-7 text-white
                        `}
                      >

                        <div className="flex items-start justify-between gap-5">

                          <div className="flex items-center gap-4">

                            <div className="w-16 h-16 rounded-3xl bg-white/20 flex items-center justify-center">

                              <Icon className="w-8 h-8 text-white" />

                            </div>

                            <div>

                              <p className="text-white/70 text-sm uppercase tracking-wide">
                                {
                                  question.type
                                }
                              </p>

                              <h3 className="text-2xl font-black mt-1 break-words">
                                {
                                  question.question
                                }
                              </h3>

                            </div>

                          </div>

                        </div>
                      </div>

                      {/* CONTENT */}
                      <div className="p-7 space-y-6">

                        {/* INFO */}
                        <div className="grid md:grid-cols-3 gap-4">

                          {/* LEVEL */}
                          <div className="rounded-2xl bg-secondary p-5">

                            <div className="flex items-center gap-2 mb-2">

                              <Layers3 className="w-4 h-4 text-muted-foreground" />

                              <p className="text-sm text-muted-foreground">
                                Level
                              </p>

                            </div>

                            <p className="font-bold text-lg capitalize">
                              {
                                question.level
                              }
                            </p>

                          </div>

                          {/* CATEGORY */}
                          <div className="rounded-2xl bg-secondary p-5">

                            <p className="text-sm text-muted-foreground">
                              Category
                            </p>

                            <p className="font-bold text-lg mt-2 capitalize">
                              {
                                question.category
                              }
                            </p>

                          </div>

                          {/* DATE */}
                          <div className="rounded-2xl bg-secondary p-5">

                            <p className="text-sm text-muted-foreground">
                              Created
                            </p>

                            <div className="flex items-center gap-2 mt-2">

                              <Calendar className="w-4 h-4 text-muted-foreground" />

                              <p className="font-semibold text-sm">
                                {question.created_at
                                  ? new Date(
                                      question.created_at
                                    ).toLocaleDateString()
                                  : '—'}
                              </p>

                            </div>

                          </div>

                        </div>

                        {/* OPTIONS */}
                        <div className="grid md:grid-cols-2 gap-4">

                          <div className="rounded-2xl border p-4">
                            <p className="text-sm text-muted-foreground">
                              A
                            </p>
                            <p className="font-semibold mt-1">
                              {
                                question.option_a
                              }
                            </p>
                          </div>

                          <div className="rounded-2xl border p-4">
                            <p className="text-sm text-muted-foreground">
                              B
                            </p>
                            <p className="font-semibold mt-1">
                              {
                                question.option_b
                              }
                            </p>
                          </div>

                          <div className="rounded-2xl border p-4">
                            <p className="text-sm text-muted-foreground">
                              C
                            </p>
                            <p className="font-semibold mt-1">
                              {
                                question.option_c
                              }
                            </p>
                          </div>

                          <div className="rounded-2xl border p-4">
                            <p className="text-sm text-muted-foreground">
                              D
                            </p>
                            <p className="font-semibold mt-1">
                              {
                                question.option_d
                              }
                            </p>
                          </div>

                        </div>

                        {/* CORRECT ANSWER */}
                        <div className="rounded-2xl bg-green-50 border border-green-200 p-5">

                          <p className="text-sm text-green-600">
                            Correct Answer
                          </p>

                          <p className="font-black text-xl text-green-700 mt-2 uppercase">
                            {
                              question.correct_answer
                            }
                          </p>

                        </div>

                        {/* DELETE BUTTON */}
                        <button
                          onClick={() =>
                            handleDelete(
                              question
                            )
                          }
                          disabled={
                            deletingId ===
                            question.id
                          }
                          className="
                            w-full h-14 rounded-2xl
                            bg-gradient-to-r from-red-500 to-pink-600
                            hover:opacity-90
                            transition-all
                            text-white font-bold
                            shadow-lg
                            flex items-center justify-center gap-3
                          "
                        >

                          {deletingId ===
                          question.id ? (
                            <>
                              <Loader2 className="w-5 h-5 animate-spin" />

                              Deleting...
                            </>
                          ) : (
                            <>
                              <Trash2 className="w-5 h-5" />

                              Delete Question
                            </>
                          )}

                        </button>

                      </div>
                    </div>
                  )
                }
              )}

            </div>
          )}

        </div>
      </main>
    </div>
  )
}