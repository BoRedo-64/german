'use client'

import { useEffect, useState } from 'react'
import { DashboardSidebar } from '@/components/DashboardSidebar'
import { Button } from '@/components/ui/button'
import { supabase } from '@/lib/supabaseClient'
import { Video, Calendar } from 'lucide-react'

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

  useEffect(() => {
    const fetchMeetings = async () => {
      const { data: userData } = await supabase.auth.getUser()
      const user = userData.user

      if (!user) return

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

      if (error) console.error(error)

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
                  className="bg-gradient-to-r from-blue-500 to-blue-50 text-white rounded-xl p-5 shadow hover:shadow-md transition flex items-center justify-between gap-4"
                >
                  {/* LEFT */}
                  <div className="flex items-center gap-4">

                    {/* ICON */}
                    <div>
                      <Video className="w-10 h-10 mr-5 ml-5" />
                    </div>

                    {/* TEXT */}
                    <div>
                      <h3 className="text-lg font-semibold">
                        {meeting.title}
                      </h3>

                      {meeting.scheduled_at && (
                        <div className="flex items-center gap-2 text-sm text-white/80 mt-1">
                          <Calendar className="w-4 h-4" />
                          <span>
                            {new Date(meeting.scheduled_at).toLocaleString()}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* RIGHT */}
                  <Button
                    className="bg-white/1 text-lg text-blue-500 hover:bg-white/1 cursor-pointer rounded-lg px-5 font-semibold"
                    onClick={() =>
                      window.open(meeting.meeting_link, '_blank')
                    }
                  >
                    Join →
                  </Button>
                </div>
              ))}

              {/* EMPTY STATE */}
              {meetings.length === 0 && (
                <div className="text-center py-16">
                  <div className="flex justify-center mb-4">
                    <div className="bg-muted p-4 rounded-full">
                      <Calendar className="w-8 h-8 text-muted-foreground" />
                    </div>
                  </div>
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