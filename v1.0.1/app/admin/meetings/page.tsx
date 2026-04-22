'use client'

import { useState } from 'react'
import { DashboardSidebar } from '@/components/DashboardSidebar'
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
import { mockUsers } from '@/lib/mockData'

type Language = 'en' | 'fr' | 'ar'

export default function AddMeetingPage() {
  const [language, setLanguage] = useState<Language>('en')
  const [formData, setFormData] = useState({
    title: '',
    selectedUser: '',
    meetingLink: '',
    date: '',
  })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 3000)
    setFormData({ title: '', selectedUser: '', meetingLink: '', date: '' })
  }

  return (
    <div className="flex h-screen bg-background">
      <DashboardSidebar language={language} />

      <main className="flex-1 overflow-y-auto">
        {/* Header */}
        <div className="bg-white border-b border-border sticky top-0 z-10">
          <div className="max-w-2xl mx-auto px-6 py-6 flex items-center justify-between">
            <h1 className="text-3xl font-bold text-foreground">
              {t('addMeeting', language)}
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
              ✅ Meeting scheduled successfully!
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Meeting Title */}
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">
                Meeting Title
              </label>
              <Input
                type="text"
                placeholder="e.g., German Conversation Group"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                required
                className="w-full"
              />
            </div>

            {/* Select User */}
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">
                {t('selectUser', language)}
              </label>
              <Select value={formData.selectedUser} onValueChange={(value) =>
                setFormData({ ...formData, selectedUser: value })
              }>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a user to invite" />
                </SelectTrigger>
                <SelectContent>
                  {mockUsers.map((user) => (
                    <SelectItem key={user.id} value={user.id}>
                      {user.name} ({user.level})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Date */}
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">
                Date & Time
              </label>
              <Input
                type="datetime-local"
                value={formData.date}
                onChange={(e) =>
                  setFormData({ ...formData, date: e.target.value })
                }
                required
                className="w-full"
              />
            </div>

            {/* Meeting Link */}
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">
                {t('meetingLink', language)}
              </label>
              <Input
                type="url"
                placeholder="https://meet.example.com/meeting-id"
                value={formData.meetingLink}
                onChange={(e) =>
                  setFormData({ ...formData, meetingLink: e.target.value })
                }
                required
                className="w-full"
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
                onClick={() =>
                  setFormData({
                    title: '',
                    selectedUser: '',
                    meetingLink: '',
                    date: '',
                  })
                }
              >
                Clear
              </Button>
            </div>
          </form>

          {/* Info Box */}
          <div className="mt-12 p-6 bg-blue-50 border border-blue-200 rounded-xl">
            <h3 className="font-semibold text-foreground mb-2">💡 Tips</h3>
            <ul className="text-sm text-foreground/80 space-y-1">
              <li>✓ Meetings are visible to all registered users</li>
              <li>✓ Users will receive notification invitations</li>
              <li>✓ Ensure the meeting link is valid before submitting</li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  )
}
