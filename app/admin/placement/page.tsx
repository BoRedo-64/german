'use client'

import { useState } from 'react'

import { supabase } from '@/lib/supabaseClient'
import { AdminSidebar } from '@/components/AdminSidebar'
import { useLanguage } from '@/context/LanguageContext'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

import {
  Brain,
  Sparkles,
  ImageIcon,
  Headphones,
  CheckCircle2,
  Menu,
  Plus,
  Trophy,
  BookOpen,
} from 'lucide-react'

export default function AdminPlacementPage() {
  const [
    sidebarOpen,
    setSidebarOpen,
  ] = useState(false)

  const [question, setQuestion] =
    useState('')

  const [type, setType] =
    useState('quiz')

  const [level, setLevel] =
    useState('A1')

  const [category, setCategory] =
    useState('grammar')

  const [imageUrl, setImageUrl] =
    useState('')

  const [audioUrl, setAudioUrl] =
    useState('')

  const [optionA, setOptionA] =
    useState('')

  const [optionB, setOptionB] =
    useState('')

  const [optionC, setOptionC] =
    useState('')

  const [optionD, setOptionD] =
    useState('')

  const [
    correctAnswer,
    setCorrectAnswer,
  ] = useState('A')

  const [loading, setLoading] =
    useState(false)

  const [
    uploadingAudio,
    setUploadingAudio,
  ] = useState(false)

  const [success, setSuccess] =
    useState(false)

  // 🔥 AUDIO UPLOAD
  const handleAudioUpload =
    async (
      e: React.ChangeEvent<HTMLInputElement>
    ) => {
      const file =
        e.target.files?.[0]

      if (!file) return

      setUploadingAudio(true)

      const fileName = `${Date.now()}-${file.name}`

      const { error } =
        await supabase.storage
          .from('exercise-audio')
          .upload(
            fileName,
            file
          )

      if (error) {
        console.error(error)

        alert(
          'Failed to upload audio'
        )

        setUploadingAudio(false)

        return
      }

      const { data } =
        supabase.storage
          .from(
            'exercise-audio'
          )
          .getPublicUrl(
            fileName
          )

      setAudioUrl(
        data.publicUrl
      )

      setUploadingAudio(false)
    }

  // 🔥 SUBMIT
  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault()

    // VALIDATION
    if (
      !question.trim() ||
      !optionA.trim() ||
      !optionB.trim() ||
      !optionC.trim() ||
      !optionD.trim()
    ) {
      alert(
        'Please fill the question and all answers'
      )

      return
    }

    if (
      type === 'audio' &&
      !audioUrl
    ) {
      alert(
        'Please upload an audio file'
      )

      return
    }

    if (
      type === 'image' &&
      !imageUrl.trim()
    ) {
      alert(
        'Please provide an image URL'
      )

      return
    }

    setLoading(true)

    const { error } =
      await supabase
        .from(
          'placement_questions'
        )
        .insert([
          {
            question,
            type,
            level,
            category,

            image_url:
              imageUrl || null,

            audio_url:
              audioUrl || null,

            option_a: optionA,
            option_b: optionB,
            option_c: optionC,
            option_d: optionD,

            correct_answer:
              correctAnswer,
          },
        ])

    setLoading(false)

    if (error) {
      console.error(error)

      alert(
        'Error adding question'
      )

      return
    }

    setSuccess(true)

    // RESET
    setQuestion('')
    setImageUrl('')
    setAudioUrl('')
    setOptionA('')
    setOptionB('')
    setOptionC('')
    setOptionD('')
    setCorrectAnswer('A')

    setTimeout(() => {
      setSuccess(false)
    }, 3000)
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

          <div className="max-w-6xl mx-auto px-6 py-6 flex items-center gap-4">

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

            <div className="flex items-center gap-4">

              <div>

                <h1 className="text-4xl font-black tracking-tight">
                  Add Test Questions
                </h1>

                <p className="text-muted-foreground mt-1">
                  Create smart assessment questions
                </p>

              </div>

            </div>

          </div>
        </div>

        {/* HERO */}
        <div className="max-w-6xl mx-auto px-6 pt-8">

          <div className="relative overflow-hidden rounded-[40px] bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 p-10 text-white shadow-2xl">

            {/* BG */}
            <div className="absolute inset-0 opacity-20">

              <div className="absolute top-0 right-0 w-72 h-72 rounded-full bg-white blur-3xl" />

              <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-cyan-300 blur-3xl" />

            </div>

            <div className="relative z-10 max-w-3xl">

              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-5 py-2 rounded-2xl mb-6">

                <Sparkles className="w-4 h-4" />

                <span className="font-semibold text-sm">
                  Deutschly Placement System
                </span>

              </div>

              <h2 className="text-5xl md:text-6xl font-black leading-tight">
                Build Placement Tests
              </h2>

              <p className="text-white/80 text-xl mt-6 leading-relaxed">
                Add grammar, listening, vocabulary and
                image-based questions to evaluate student levels
                accurately.
              </p>

            </div>
          </div>
        </div>

        {/* CONTENT */}
        <div className="max-w-6xl mx-auto px-6 py-10">

          {/* SUCCESS */}
          {success && (
            <div className="mb-8 bg-green-100 border border-green-200 text-green-800 rounded-[28px] p-5 flex items-center gap-4 shadow-sm">

              <div className="w-14 h-14 rounded-2xl bg-green-500 flex items-center justify-center text-white shadow-lg">

                <CheckCircle2 className="w-7 h-7" />

              </div>

              <div>

                <p className="font-bold text-lg">
                  Question Added
                </p>

                <p className="text-sm opacity-80">
                  Placement question created successfully.
                </p>

              </div>

            </div>
          )}

          <div className="grid xl:grid-cols-[1fr_360px] gap-8">

            {/* FORM */}
            <form
              onSubmit={handleSubmit}
              className="space-y-8"
            >

              <div className="bg-white rounded-[36px] border shadow-2xl overflow-hidden">

                {/* TOP */}
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-8 text-white">

                  <div className="flex items-center gap-4">

                    <div className="w-16 h-16 rounded-3xl bg-white/20 flex items-center justify-center">

                      <BookOpen className="w-8 h-8" />

                    </div>

                    <div>

                      <h3 className="text-3xl font-black">
                        Question Details
                      </h3>

                      <p className="text-white/80 mt-1">
                        Configure your placement assessment
                      </p>

                    </div>

                  </div>
                </div>

                {/* CONTENT */}
                <div className="p-8 space-y-7">

                  {/* QUESTION */}
                  <div className="space-y-3">

                    <label className="text-sm font-bold uppercase tracking-wide text-muted-foreground">
                      Question
                    </label>

                    <textarea
                      value={question}
                      onChange={(e) =>
                        setQuestion(
                          e.target.value
                        )
                      }
                      placeholder="Write your placement question..."
                      className="
                        w-full min-h-[140px]
                        rounded-[28px]
                        border-2 border-border
                        p-5 resize-none
                        focus:outline-none focus:ring-2 focus:ring-blue-500
                      "
                    />

                  </div>

                  {/* TYPE + LEVEL */}
                  <div className="grid md:grid-cols-2 gap-6">

                    <div className="space-y-3">

                      <label className="text-sm font-bold uppercase tracking-wide text-muted-foreground">
                        Question Type
                      </label>

                      <select
                        value={type}
                        onChange={(e) =>
                          setType(
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

                        <option value="quiz">
                          Quiz
                        </option>

                        <option value="audio">
                          Audio
                        </option>

                        <option value="image">
                          Image
                        </option>

                      </select>

                    </div>

                    <div className="space-y-3">

                      <label className="text-sm font-bold uppercase tracking-wide text-muted-foreground">
                        Level
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

                        <option>A1</option>
                        <option>A2</option>
                        <option>B1</option>
                        <option>B2</option>
                        <option>C1</option>
                        <option>C2</option>

                      </select>

                    </div>

                  </div>

                  {/* CATEGORY */}
                  <div className="space-y-3">

                    <label className="text-sm font-bold uppercase tracking-wide text-muted-foreground">
                      Category
                    </label>

                    <select
                      value={category}
                      onChange={(e) =>
                        setCategory(
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

                      <option value="grammar">
                        Grammar
                      </option>

                      <option value="vocabulary">
                        Vocabulary
                      </option>

                      <option value="listening">
                        Listening
                      </option>

                      <option value="reading">
                        Reading
                      </option>

                    </select>

                  </div>

                  {/* IMAGE */}
                  {type ===
                    'image' && (
                    <div className="space-y-3">

                      <label className="text-sm font-bold uppercase tracking-wide text-muted-foreground">
                        Image URL
                      </label>

                      <div className="relative">

                        <ImageIcon className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />

                        <Input
                          value={
                            imageUrl
                          }
                          onChange={(
                            e
                          ) =>
                            setImageUrl(
                              e.target
                                .value
                            )
                          }
                          placeholder="https://..."
                          className="h-14 rounded-2xl border-2 pl-14"
                        />

                      </div>

                    </div>
                  )}

                  {/* AUDIO */}
                  {type ===
                    'audio' && (
                    <div className="space-y-4">

                      <label className="text-sm font-bold uppercase tracking-wide text-muted-foreground">
                        Upload Audio
                      </label>

                      <div className="rounded-[28px] border-2 border-dashed border-border bg-secondary/30 p-8 text-center">

                        <div className="w-20 h-20 rounded-[28px] bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center mx-auto shadow-xl mb-5">

                          <Headphones className="w-10 h-10 text-white" />

                        </div>

                        <h3 className="text-2xl font-black">
                          Upload Audio File
                        </h3>

                        <p className="text-muted-foreground mt-3 mb-6">
                          MP3, WAV or audio files
                        </p>

                        <label>

                          <input
                            type="file"
                            accept="audio/*"
                            onChange={
                              handleAudioUpload
                            }
                            className="hidden"
                          />

                          <div
                            className="
                              inline-flex items-center gap-3
                              h-14 px-8 rounded-2xl
                              bg-gradient-to-r from-blue-600 to-purple-600
                              hover:opacity-90
                              text-white font-bold
                              shadow-lg cursor-pointer
                            "
                          >

                            <Headphones className="w-5 h-5" />

                            {uploadingAudio
                              ? 'Uploading...'
                              : 'Choose Audio'}

                          </div>

                        </label>

                        {audioUrl && (
                          <div className="mt-6 rounded-2xl bg-green-100 border border-green-200 p-4 text-green-700 font-semibold">

                            ✅ Audio uploaded successfully

                          </div>
                        )}

                      </div>
                    </div>
                  )}

                  {/* OPTIONS */}
                  <div className="grid md:grid-cols-2 gap-5">

                    <OptionInput
                      label="Option A"
                      value={optionA}
                      onChange={
                        setOptionA
                      }
                    />

                    <OptionInput
                      label="Option B"
                      value={optionB}
                      onChange={
                        setOptionB
                      }
                    />

                    <OptionInput
                      label="Option C"
                      value={optionC}
                      onChange={
                        setOptionC
                      }
                    />

                    <OptionInput
                      label="Option D"
                      value={optionD}
                      onChange={
                        setOptionD
                      }
                    />

                  </div>

                  {/* CORRECT */}
                  <div className="space-y-3">

                    <label className="text-sm font-bold uppercase tracking-wide text-muted-foreground">
                      Correct Answer
                    </label>

                    <select
                      value={
                        correctAnswer
                      }
                      onChange={(e) =>
                        setCorrectAnswer(
                          e.target
                            .value
                        )
                      }
                      className="
                        w-full h-14 rounded-2xl
                        border-2 border-border
                        px-5 bg-white
                        focus:outline-none focus:ring-2 focus:ring-blue-500
                      "
                    >

                      <option value="A">
                        A
                      </option>

                      <option value="B">
                        B
                      </option>

                      <option value="C">
                        C
                      </option>

                      <option value="D">
                        D
                      </option>

                    </select>

                  </div>

                  {/* BUTTON */}
                  <Button
                    type="submit"
                    disabled={
                      loading ||
                      uploadingAudio
                    }
                    className="
                      h-14 px-10 rounded-2xl
                      bg-gradient-to-r from-blue-600 to-purple-600
                      hover:opacity-90
                      text-white font-bold shadow-lg
                      text-base
                    "
                  >

                    <div className="flex items-center gap-2">

                      <Plus className="w-5 h-5" />

                      {loading
                        ? 'Adding Question...'
                        : 'Add Question'}

                    </div>

                  </Button>

                </div>
              </div>
            </form>

            {/* SIDE */}
            <div className="space-y-6">

              <div className="bg-white rounded-[36px] border shadow-2xl overflow-hidden">

                <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-7 text-white">

                  <h3 className="text-2xl font-black">
                    Live Preview
                  </h3>

                  <p className="text-white/80 mt-1">
                    Question appearance
                  </p>

                </div>

                <div className="p-7">

                  <div className="rounded-[28px] bg-gradient-to-br from-blue-600 to-purple-600 p-7 text-white shadow-xl">

                    <div className="w-16 h-16 rounded-3xl bg-white/20 flex items-center justify-center mb-6">

                      <Trophy className="w-8 h-8" />

                    </div>

                    <p className="text-white/70 text-sm">
                      {level} • {category}
                    </p>

                    <h4 className="text-2xl font-black mt-3 leading-snug">

                      {question ||
                        'Your question preview will appear here...'}

                    </h4>

                  </div>

                </div>
              </div>

              <div className="bg-white rounded-[36px] border shadow-2xl p-7">

                <h3 className="text-2xl font-black mb-6">
                  Placement Tips
                </h3>

                <div className="space-y-5">

                  <TipCard
                    title="Balanced Difficulty"
                    text="Mix easy and advanced questions for better accuracy."
                  />

                  <TipCard
                    title="Use Listening"
                    text="Audio questions improve speaking evaluation."
                  />

                  <TipCard
                    title="Visual Learning"
                    text="Image questions help contextual understanding."
                  />

                </div>
              </div>

            </div>
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

      <Input
        value={value}
        onChange={(e) =>
          onChange(
            e.target.value
          )
        }
        placeholder={`Enter ${label}`}
        className="h-14 rounded-2xl border-2"
      />

    </div>
  )
}

function TipCard({
  title,
  text,
}: any) {
  return (
    <div className="rounded-2xl bg-secondary p-5">

      <p className="font-bold">
        {title}
      </p>

      <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
        {text}
      </p>

    </div>
  )
}