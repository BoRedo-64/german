'use client'

import { useState } from 'react'
import { DashboardSidebar } from '@/components/DashboardSidebar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { t } from '@/lib/i18n'

type Language = 'en' | 'fr' | 'ar'

export default function AddExercisePage() {
  const [language, setLanguage] = useState<Language>('en')
  const [formData, setFormData] = useState({
    title: '',
    level: 'A1',
    type: 'quiz',
    content: '',
  })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 3000)
    setFormData({ title: '', level: 'A1', type: 'quiz', content: '' })
  }

  return (
    <div className="flex h-screen bg-background">
      <DashboardSidebar language={language} />

      <main className="flex-1 overflow-y-auto">
        {/* Header */}
        <div className="bg-white border-b border-border sticky top-0 z-10">
          <div className="max-w-2xl mx-auto px-6 py-6 flex items-center justify-between">
            <h1 className="text-3xl font-bold text-foreground">
              {t('addExercise', language)}
            </h1>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value as Language)}
              className="px-3 py-2 rounded-lg border border-border bg-background text-foreground"
            >
              <option value="en">English</option>
              <option value="fr">Français</option>
              <option value="ar">العربية</option>
            </select>
          </div>
        </div>

        <div className="max-w-2xl mx-auto px-6 py-8">
          {/* Success Message */}
          {submitted && (
            <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-800 rounded-lg">
              ✅ Exercise added successfully!
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title */}
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">
                Exercise Title
              </label>
              <Input
                type="text"
                placeholder="Enter exercise title"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                required
                className="w-full"
              />
            </div>

            {/* Level Select */}
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">
                Level
              </label>
              <Select value={formData.level} onValueChange={(value) =>
                setFormData({ ...formData, level: value })
              }>
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="A1">A1 - Beginner</SelectItem>
                  <SelectItem value="A2">A2 - Elementary</SelectItem>
                  <SelectItem value="B1">B1 - Intermediate</SelectItem>
                  <SelectItem value="B2">B2 - Upper Intermediate</SelectItem>
                  <SelectItem value="C1">C1 - Advanced</SelectItem>
                  <SelectItem value="C2">C2 - Mastery</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Type Select */}
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">
                Exercise Type
              </label>
              <Select value={formData.type} onValueChange={(value) =>
                setFormData({ ...formData, type: value })
              }>
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="quiz">❓ Quiz</SelectItem>
                  <SelectItem value="listening">🎧 Listening</SelectItem>
                  <SelectItem value="writing">✍️ Writing</SelectItem>
                  <SelectItem value="speaking">🗣️ Speaking</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Content Textarea */}
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">
                Content
              </label>
              <Textarea
                placeholder="Enter exercise content, questions, or instructions"
                value={formData.content}
                onChange={(e) =>
                  setFormData({ ...formData, content: e.target.value })
                }
                required
                className="w-full min-h-32"
              />
            </div>

            {/* Submit Button */}
            <div className="flex gap-3">
              <Button
                type="submit"
                className="bg-accent hover:bg-accent/90 text-accent-foreground px-8 rounded-lg font-semibold"
              >
                {t('submit', language)}
              </Button>
              <Button
                type="button"
                variant="outline"
                className="px-8 rounded-lg"
                onClick={() => setFormData({ title: '', level: 'A1', type: 'quiz', content: '' })}
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
