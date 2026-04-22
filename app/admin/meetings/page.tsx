'use client'

import { useEffect, useState } from 'react'
import { AdminSidebar } from '@/components/AdminSidebar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { supabase } from '@/lib/supabaseClient'

type Language = 'en' | 'fr' | 'ar'

export default function AddMeetingPage() {
  const [language, setLanguage] = useState<Language>('en')

  const [users, setUsers] = useState<any[]>([])
  const [selectedUsers, setSelectedUsers] = useState<string[]>([])

  const [formData, setFormData] = useState({
    title: '',
    meetingLink: '',
    date: '',
  })

  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  // 🔥 FETCH USERS
  useEffect(() => {
    const fetchUsers = async () => {
      const { data } = await supabase
        .from('profiles')
        .select('id, first_name, last_name, level')
        .eq('is_admin', false)

      setUsers(data || [])
    }

    fetchUsers()
  }, [])

  // 🔥 TOGGLE USER SELECT
  const toggleUser = (id: string) => {
    setSelectedUsers((prev) =>
      prev.includes(id)
        ? prev.filter((u) => u !== id)
        : [...prev, id]
    )
  }

  // 🔥 SUBMIT
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (selectedUsers.length === 0) {
      alert('Select at least one student')
      return
    }

    setLoading(true)

    // 1️⃣ create meeting
    const { data: meeting, error } = await supabase
      .from('meetings')
      .insert({
        title: formData.title,
        meeting_link: formData.meetingLink,
        scheduled_at: formData.date,
      })
      .select()
      .single()

    if (error) {
      console.error(error)
      setLoading(false)
      return
    }

    // 2️⃣ assign users
    const participants = selectedUsers.map((user_id) => ({
      meeting_id: meeting.id,
      user_id,
    }))

    await supabase.from('meeting_participants').insert(participants)

    // reset
    setSuccess(true)
    setFormData({ title: '', meetingLink: '', date: '' })
    setSelectedUsers([])
    setLoading(false)

    setTimeout(() => setSuccess(false), 3000)
  }

  return (
    <div className="flex h-screen bg-background">
      <AdminSidebar language={language} />

      <main className="flex-1 overflow-y-auto">

        {/* Header */}
        <div className="bg-white border-b border-border sticky top-0 z-10">
          <div className="max-w-2xl mx-auto px-6 py-6 flex items-center justify-between">
            <h1 className="text-3xl font-bold">Add Meeting</h1>

            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value as Language)}
              className="px-3 py-2 rounded-lg border"
            >
              <option value="en">English</option>
              <option value="fr">Français</option>
              <option value="ar">العربية</option>
            </select>
          </div>
        </div>

        <div className="max-w-2xl mx-auto px-6 py-8">

          {/* SUCCESS */}
          {success && (
            <div className="mb-6 p-4 bg-green-100 border text-green-800 rounded-lg">
              ✅ Meeting created successfully
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">

            {/* TITLE */}
            <Input
              placeholder="Meeting title"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              required
            />

            {/* DATE */}
            <Input
              type="datetime-local"
              value={formData.date}
              onChange={(e) =>
                setFormData({ ...formData, date: e.target.value })
              }
              required
            />

            {/* LINK */}
            <Input
              type="url"
              placeholder="https://meet.google.com/..."
              value={formData.meetingLink}
              onChange={(e) =>
                setFormData({ ...formData, meetingLink: e.target.value })
              }
              required
            />

            {/* 🔥 MULTI USER SELECT */}
            <div>
              <p className="font-semibold mb-2">Select Students</p>

              <div className="max-h-60 overflow-y-auto border rounded-lg p-2 space-y-2">
                {users.map((user) => {
                  const selected = selectedUsers.includes(user.id)

                  return (
                    <div
                      key={user.id}
                      onClick={() => toggleUser(user.id)}
                      className={`cursor-pointer px-3 py-2 rounded-lg flex justify-between ${
                        selected
                          ? 'bg-primary text-white'
                          : 'hover:bg-muted'
                      }`}
                    >
                      <span>
                        {user.first_name} {user.last_name}
                      </span>
                      <span className="text-xs opacity-70">
                        {user.level}
                      </span>
                    </div>
                  )
                })}
              </div>

              <p className="text-xs mt-2 text-muted-foreground">
                {selectedUsers.length} selected
              </p>
            </div>

            {/* BUTTON */}
            <Button
              type="submit"
              disabled={loading}
              className="w-full"
            >
              {loading ? 'Creating...' : 'Create Meeting'}
            </Button>

          </form>
        </div>
      </main>
    </div>
  )
}