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

type Language = 'en' | 'fr' | 'ar'

export default function AddExercisePage() {
  const { language, setLanguage } = useLanguage()

  const [sidebarOpen, setSidebarOpen] = useState(false)

  const [title, setTitle] = useState('')
  const [level, setLevel] = useState('A1')
  const [type, setType] = useState<'pdf' | 'audio'>('pdf')

  const [fileUrl, setFileUrl] = useState('')

  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  // 🔥 AUDIO UPLOAD STATE
  const [uploading, setUploading] = useState(false)

  // 🔥 AUDIO UPLOAD
  const handleAudioUpload = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0]

    if (!file) return

    setUploading(true)

    try {
      const fileName = `${Date.now()}-${file.name}`

      // 🔥 upload to supabase storage
      const { error } = await supabase.storage
        .from('audio')
        .upload(fileName, file)

      if (error) throw error

      // 🔥 get public URL
      const { data } = supabase.storage
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
  const handleSubmit = async (e: React.FormEvent) => {
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
      const { error } = await supabase.from('exercises').insert([
        {
          title,
          level,
          type,
          file_url: fileUrl,
        },
      ])

      if (error) throw error

      setSuccess(true)

      // reset
      setTitle('')
      setFileUrl('')
      setLevel('A1')
      setType('pdf')

      setTimeout(() => setSuccess(false), 3000)

    } catch (err) {
      console.error(err)
      alert('Error creating exercise ❌')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex h-screen bg-background">

      <AdminSidebar
        language={language}
        open={sidebarOpen}
        setOpen={setSidebarOpen}
      />

      <main className="flex-1 overflow-y-auto">

        {/* HEADER */}
        <div className="bg-white border-b border-border sticky top-0 z-10">
          <div className="max-w-2xl mx-auto px-6 py-6 flex items-center justify-between">

            <h1 className="text-3xl font-bold text-foreground">
              {t('addExercise', language)}
            </h1>

            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value as Language)}
              className="px-3 py-2 rounded-lg border border-border bg-background"
            >
              <option value="en">English</option>
              <option value="fr">Français</option>
              <option value="ar">العربية</option>
            </select>

          </div>
        </div>

        {/* CONTENT */}
        <div className="max-w-2xl mx-auto px-6 py-8">

          {/* SUCCESS */}
          {success && (
            <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-800 rounded-lg">
              ✅ Exercise added successfully!
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">

            {/* TITLE */}
            <div>
              <label className="block text-sm font-semibold mb-2">
                Title
              </label>

              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter exercise title"
              />
            </div>

            {/* LEVEL */}
            <div>
              <label className="block text-sm font-semibold mb-2">
                Level
              </label>

              <Select value={level} onValueChange={setLevel}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="A1">A1</SelectItem>
                  <SelectItem value="A2">A2</SelectItem>
                  <SelectItem value="B1">B1</SelectItem>
                  <SelectItem value="B2">B2</SelectItem>
                  <SelectItem value="C1">C1</SelectItem>
                  <SelectItem value="C2">C2</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* TYPE */}
            <div>
              <label className="block text-sm font-semibold mb-2">
                Type
              </label>

              <Select
                value={type}
                onValueChange={(v: 'pdf' | 'audio') => {
                  setType(v)
                  setFileUrl('')
                }}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="pdf">📄 PDF</SelectItem>
                  <SelectItem value="audio">🎧 Audio</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* FILE */}
            <div>
              <label className="block text-sm font-semibold mb-2">
                {type === 'audio' ? 'Upload Audio' : 'File URL'}
              </label>

              {type === 'audio' ? (
                <div className="border-2 border-dashed border-border rounded-xl p-8 text-center bg-secondary/30">

                  <input
                    type="file"
                    accept="audio/*"
                    onChange={handleAudioUpload}
                    className="mb-4"
                  />

                  {uploading ? (
                    <p className="text-sm text-muted-foreground">
                      Uploading audio...
                    </p>
                  ) : fileUrl ? (
                    <div className="space-y-4">

                      <p className="text-green-600 font-medium">
                        ✅ Audio uploaded successfully
                      </p>

                      <audio controls className="w-full">
                        <source src={fileUrl} />
                      </audio>

                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground">
                      Upload an MP3 audio lesson
                    </p>
                  )}

                </div>
              ) : (
                <Input
                  placeholder="https://..."
                  value={fileUrl}
                  onChange={(e) => setFileUrl(e.target.value)}
                />
              )}
            </div>

            {/* SUBMIT */}
            <div className="flex gap-3">

              <Button
                type="submit"
                disabled={loading || uploading}
                className="px-8"
              >
                {loading ? 'Saving...' : t('submit', language)}
              </Button>

              <Button
                type="button"
                variant="outline"
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
      </main>
    </div>
  )
}