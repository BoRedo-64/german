'use client'

import { useState } from 'react'
import { AdminSidebar } from '@/components/AdminSidebar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

import { t } from '@/lib/i18n'
import { supabase } from '@/lib/supabaseClient'
import { useLanguage } from '@/context/LanguageContext'

import {
  FileText,
  Headphones,
  UploadCloud,
  Sparkles,
} from 'lucide-react'

type Language = 'en' | 'fr' | 'ar'

export default function AddExercisePage() {
  const { language, setLanguage } =
    useLanguage()

  const [sidebarOpen, setSidebarOpen] =
    useState(false)

  const [title, setTitle] = useState('')
  const [level, setLevel] = useState('A1')

  const [type, setType] = useState<
    'pdf' | 'audio'
  >('pdf')

  const [fileUrl, setFileUrl] =
    useState('')

  const [loading, setLoading] =
    useState(false)

  const [success, setSuccess] =
    useState(false)

  const [uploading, setUploading] =
    useState(false)

  // 🔥 AUDIO UPLOAD
  const handleAudioUpload = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0]

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
          .getPublicUrl(fileName)

      setFileUrl(data.publicUrl)
    } catch (err) {
      console.error(err)
      alert('Error uploading audio ❌')
    } finally {
      setUploading(false)
    }
  }

  // 🔥 SUBMIT
  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault()

    if (!title) {
      alert('Title required')
      return
    }

    if (!fileUrl) {
      alert('Please add a file')
      return
    }

    setLoading(true)

    try {
      const { error } =
        await supabase
          .from('exercises')
          .insert([
            {
              title,
              level,
              type,
              file_url: fileUrl,
            },
          ])

      if (error) throw error

      setSuccess(true)

      setTitle('')
      setFileUrl('')
      setLevel('A1')
      setType('pdf')

      setTimeout(
        () => setSuccess(false),
        3000
      )
    } catch (err) {
      console.error(err)
      alert('Error creating exercise ❌')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-50 to-blue-50">

      <AdminSidebar
        language={language}
        open={sidebarOpen}
        setOpen={setSidebarOpen}
      />

      <main className="flex-1 overflow-y-auto">

        {/* HEADER */}
        <div className="sticky top-0 z-20 backdrop-blur-xl bg-white/80 border-b border-white/40">

          <div className="max-w-5xl mx-auto px-6 py-6 flex items-center justify-between">

            <div>
              <h1 className="text-4xl font-black tracking-tight text-foreground">
                Add Exercise
              </h1>

              <p className="text-muted-foreground mt-1">
                Create new lessons and learning resources
              </p>
            </div>

            <select
              value={language}
              onChange={(e) =>
                setLanguage(
                  e.target.value as Language
                )
              }
              className="px-4 py-2 rounded-2xl border border-border bg-white shadow-sm"
            >
              <option value="en">
                English
              </option>

              <option value="fr">
                Français
              </option>

              <option value="ar">
                العربية
              </option>
            </select>

          </div>
        </div>

        {/* CONTENT */}
        <div className="max-w-5xl mx-auto px-6 py-10">

          {/* SUCCESS */}
          {success && (
            <div className="mb-8 bg-green-100 border border-green-200 text-green-800 rounded-3xl p-5 flex items-center gap-3 shadow-sm">

              <div className="w-12 h-12 rounded-2xl bg-green-500 flex items-center justify-center text-white text-xl">
                ✓
              </div>

              <div>
                <p className="font-bold">
                  Exercise Added
                </p>

                <p className="text-sm opacity-80">
                  Your exercise has been created successfully
                </p>
              </div>

            </div>
          )}

          <div className="grid lg:grid-cols-[1fr_340px] gap-8">

            {/* MAIN FORM */}
            <div className="bg-white rounded-[32px] shadow-xl border border-white/50 overflow-hidden">

              {/* TOP HERO */}
              <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 p-8 text-white">

                <div className="absolute inset-0 opacity-20">
                  <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-white/30 blur-3xl" />
                  <div className="absolute bottom-0 left-0 w-32 h-32 rounded-full bg-cyan-300/30 blur-3xl" />
                </div>

                <div className="relative z-10 flex items-center gap-4">

                  <div className="w-16 h-16 rounded-3xl bg-white/20 backdrop-blur-md flex items-center justify-center shadow-lg">
                    <Sparkles className="w-8 h-8" />
                  </div>

                  <div>
                    <h2 className="text-3xl font-black">
                      New Exercise
                    </h2>

                    <p className="text-white/80 mt-1">
                      Add PDFs or audio lessons for students
                    </p>
                  </div>

                </div>
              </div>

              {/* FORM */}
              <form
                onSubmit={handleSubmit}
                className="p-8 space-y-8"
              >

                {/* TITLE */}
                <div className="space-y-3">

                  <label className="text-sm font-bold uppercase tracking-wide text-muted-foreground">
                    Exercise Title
                  </label>

                  <Input
                    value={title}
                    onChange={(e) =>
                      setTitle(
                        e.target.value
                      )
                    }
                    placeholder="German Listening Practice"
                    className="h-14 rounded-2xl border-2"
                  />

                </div>

                {/* GRID */}
                <div className="grid md:grid-cols-2 gap-6">

                  {/* LEVEL */}
                  <div className="space-y-3">

                    <label className="text-sm font-bold uppercase tracking-wide text-muted-foreground">
                      Difficulty Level
                    </label>

                    <Select
                      value={level}
                      onValueChange={setLevel}
                    >
                      <SelectTrigger className="h-14 rounded-2xl border-2">
                        <SelectValue />
                      </SelectTrigger>

                      <SelectContent>
                        <SelectItem value="A1">
                          A1
                        </SelectItem>

                        <SelectItem value="A2">
                          A2
                        </SelectItem>

                        <SelectItem value="B1">
                          B1
                        </SelectItem>

                        <SelectItem value="B2">
                          B2
                        </SelectItem>

                        <SelectItem value="C1">
                          C1
                        </SelectItem>

                        <SelectItem value="C2">
                          C2
                        </SelectItem>
                      </SelectContent>
                    </Select>

                  </div>

                  {/* TYPE */}
                  <div className="space-y-3">

                    <label className="text-sm font-bold uppercase tracking-wide text-muted-foreground">
                      Exercise Type
                    </label>

                    <Select
                      value={type}
                      onValueChange={(
                        v:
                          | 'pdf'
                          | 'audio'
                      ) => {
                        setType(v)
                        setFileUrl('')
                      }}
                    >
                      <SelectTrigger className="h-14 rounded-2xl border-2">
                        <SelectValue />
                      </SelectTrigger>

                      <SelectContent>

                        <SelectItem value="pdf">
                          📄 PDF
                        </SelectItem>

                        <SelectItem value="audio">
                          🎧 Audio
                        </SelectItem>

                      </SelectContent>
                    </Select>

                  </div>

                </div>

                {/* FILE SECTION */}
                <div className="space-y-4">

                  <label className="text-sm font-bold uppercase tracking-wide text-muted-foreground">
                    {type === 'audio'
                      ? 'Audio Upload'
                      : 'PDF URL'}
                  </label>

                  {type === 'audio' ? (
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
                            Drag & upload your audio lesson
                          </p>

                          <p className="text-sm text-muted-foreground mt-2">
                            MP3 recommended
                          </p>
                        </div>
                      )}

                    </div>
                  ) : (
                    <div className="relative">

                      <FileText className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />

                      <Input
                        placeholder="https://..."
                        value={fileUrl}
                        onChange={(e) =>
                          setFileUrl(
                            e.target.value
                          )
                        }
                        className="h-14 rounded-2xl border-2 pl-12"
                      />

                    </div>
                  )}

                </div>

                {/* BUTTONS */}
                <div className="flex flex-wrap gap-4 pt-4">

                  <Button
                    type="submit"
                    disabled={
                      loading ||
                      uploading
                    }
                    className="
                      h-14 px-10 rounded-2xl
                      bg-gradient-to-r from-blue-600 to-purple-600
                      hover:opacity-90
                      text-white font-bold shadow-lg
                    "
                  >
                    {loading
                      ? 'Creating...'
                      : 'Create Exercise'}
                  </Button>

                  <Button
                    type="button"
                    variant="outline"
                    className="h-14 px-8 rounded-2xl border-2"
                    onClick={() => {
                      setTitle('')
                      setFileUrl('')
                    }}
                  >
                    Clear
                  </Button>

                </div>

              </form>
            </div>

            {/* SIDE INFO */}
            <div className="space-y-6">

              {/* TYPE PREVIEW */}
              <div className="bg-white rounded-[28px] border shadow-lg p-6">

                <h3 className="text-xl font-bold mb-5">
                  Exercise Preview
                </h3>

                <div className="rounded-3xl bg-gradient-to-br from-blue-600 to-purple-600 p-6 text-white">

                  <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center mb-5">

                    {type === 'audio' ? (
                      <Headphones className="w-8 h-8" />
                    ) : (
                      <FileText className="w-8 h-8" />
                    )}

                  </div>

                  <p className="text-sm text-white/70">
                    {level} Level
                  </p>

                  <h4 className="text-2xl font-black mt-2 break-words">
                    {title || 'Exercise Title'}
                  </h4>

                  <div className="mt-6 inline-flex items-center px-4 py-2 rounded-2xl bg-white/20 text-sm font-semibold">
                    {type === 'audio'
                      ? 'Audio Lesson'
                      : 'PDF Resource'}
                  </div>

                </div>
              </div>

              {/* QUICK TIPS */}
              <div className="bg-white rounded-[28px] border shadow-lg p-6">

                <h3 className="text-xl font-bold mb-5">
                  Tips
                </h3>

                <div className="space-y-4">

                  <div className="rounded-2xl bg-blue-50 p-4">
                    <p className="font-semibold">
                      Keep titles short
                    </p>

                    <p className="text-sm text-muted-foreground mt-1">
                      Clear titles improve navigation
                    </p>
                  </div>

                  <div className="rounded-2xl bg-purple-50 p-4">
                    <p className="font-semibold">
                      Match level carefully
                    </p>

                    <p className="text-sm text-muted-foreground mt-1">
                      Exercises should fit student abilities
                    </p>
                  </div>

                  <div className="rounded-2xl bg-green-50 p-4">
                    <p className="font-semibold">
                      Audio quality matters
                    </p>

                    <p className="text-sm text-muted-foreground mt-1">
                      Use clear voices and minimal noise
                    </p>
                  </div>

                </div>
              </div>

            </div>
          </div>
        </div>
      </main>
    </div>
  )
}