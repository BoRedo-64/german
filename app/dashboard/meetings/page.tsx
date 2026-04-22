'use client'

import { useEffect, useState } from 'react'
import { DashboardSidebar } from '@/components/DashboardSidebar'
import { Button } from '@/components/ui/button'
import { supabase } from '@/lib/supabaseClient'

type Language = 'en' | 'fr' | 'ar'

interface Meeting {
  id: string
  title: string
  meeting_link: string
  scheduled_at: string | null
}

export default function MeetingsPage() {
  const [language, setLanguage] = useState<Language>('en')
  const [meetings, setMeetings] = useState<Meeting[]>([])
  const [loading, setLoading] = useState(true)

  // 🔥 FETCH REAL DATA
  useEffect(() => {
    const fetchMeetings = async () => {
      const { data: userData } = await supabase.auth.getUser()
      const user = userData.user

      if (!user) return

      // get meetings through participants table
      const { data, error } = await supabase
        .from('meeting_participants')
        .select(`
          meeting:meetings (
            id,
            title,
            meeting_link,
            scheduled_at
          )
        `)
        .eq('user_id', user.id)

      if (error) {
        console.error(error)
      }

      // flatten data
      const formatted =
        data?.map((item: any) => item.meeting).filter(Boolean) || []

      setMeetings(formatted)
      setLoading(false)
    }

    fetchMeetings()
  }, [])

  return (
    <div className="flex h-screen bg-background">
      <DashboardSidebar language={language} />

      <main className="flex-1 overflow-y-auto">
        {/* Header */}
        <div className="bg-white border-b border-border sticky top-0 z-10">
          <div className="max-w-6xl mx-auto px-6 py-6 flex items-center justify-between">
            <h1 className="text-3xl font-bold text-foreground">
              Join a Session
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

        <div className="max-w-6xl mx-auto px-6 py-8">
          {loading ? (
            <p className="text-center text-muted-foreground">
              Loading meetings...
            </p>
          ) : (
            <div className="space-y-6">

              <p className="text-muted-foreground mb-8">
                Join your scheduled learning sessions.
              </p>

              {meetings.map((meeting) => (
                <div
                  key={meeting.id}
                  className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-6 border border-border hover:shadow-md transition-all"
                >
                  <div className="flex items-start justify-between gap-6">
                    
                    {/* LEFT */}
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-2xl">🎤</span>
                        <h3 className="text-2xl font-bold text-foreground">
                          {meeting.title}
                        </h3>
                      </div>

                      {meeting.scheduled_at && (
                        <p className="text-sm text-muted-foreground">
                          📅 {new Date(meeting.scheduled_at).toLocaleString()}
                        </p>
                      )}
                    </div>

                    {/* RIGHT */}
                    <div className="flex flex-col gap-3">
                      <Button
                        className="bg-primary hover:bg-primary/90 text-white rounded-lg px-6"
                        onClick={() =>
                          window.open(meeting.meeting_link, '_blank')
                        }
                      >
                        Join Now →
                      </Button>
                    </div>

                  </div>
                </div>
              ))}

              {/* EMPTY STATE */}
              {meetings.length === 0 && (
                <div className="text-center py-16">
                  <div className="text-6xl mb-4">📅</div>
                  <p className="text-muted-foreground text-lg">
                    No meetings assigned to you yet
                  </p>
                </div>
              )}

            </div>
          )}
        </div>
      </main>
    </div>
  )
}