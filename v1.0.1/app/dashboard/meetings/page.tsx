'use client'

import { useState } from 'react'
import { DashboardSidebar } from '@/components/DashboardSidebar'
import { Button } from '@/components/ui/button'
import { t } from '@/lib/i18n'
import { mockMeetings } from '@/lib/mockData'

type Language = 'en' | 'fr' | 'ar'

export default function MeetingsPage() {
  const [language, setLanguage] = useState<Language>('en')

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
            <div className="text-right">
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
        </div>

        <div className="max-w-6xl mx-auto px-6 py-8">
          <div className="space-y-6">
            <p className="text-muted-foreground mb-8">
              Join one of our interactive learning sessions to connect with other learners and practice together.
            </p>

            {mockMeetings.map((meeting) => (
              <div
                key={meeting.id}
                className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-6 border border-border hover:shadow-md transition-all"
              >
                <div className="flex items-start justify-between gap-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-2xl">🎤</span>
                      <h3 className="text-2xl font-bold text-foreground">
                        {meeting.title}
                      </h3>
                    </div>
                    <div className="space-y-2 text-foreground/80">
                      <p>
                        <span className="font-semibold">Date & Time:</span> {meeting.date}
                      </p>
                      <p>
                        <span className="font-semibold">Participants:</span>{' '}
                        {meeting.participants} people registered
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col gap-3">
                    <Button
                      className="bg-primary hover:bg-primary/90 text-white rounded-lg px-6"
                      onClick={() =>
                        window.open(meeting.link, '_blank')
                      }
                    >
                      Join Now →
                    </Button>
                    <Button
                      variant="outline"
                      className="rounded-lg"
                    >
                      Save Event
                    </Button>
                  </div>
                </div>
              </div>
            ))}

            {/* Empty state fallback */}
            {mockMeetings.length === 0 && (
              <div className="text-center py-16">
                <div className="text-6xl mb-4">📅</div>
                <p className="text-muted-foreground text-lg">
                  No scheduled meetings at the moment
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
