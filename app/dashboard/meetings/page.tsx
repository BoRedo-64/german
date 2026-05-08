'use client'

import { useEffect, useState } from 'react'

import { DashboardSidebar } from '@/components/DashboardSidebar'
import { Button } from '@/components/ui/button'
import { supabase } from '@/lib/supabaseClient'

import {
  Video,
  Calendar,
  Menu,
  Sparkles,
  Clock3,
  ExternalLink,
  BookOpen,
} from 'lucide-react'

import { useLanguage } from '@/context/LanguageContext'

type Language = 'en' | 'fr' | 'ar'

interface Meeting {
  id: string
  title: string
  meeting_link: string
  scheduled_at: string | null
}

export default function MeetingsPage() {
  const { language, setLanguage } =
    useLanguage()

  const [meetings, setMeetings] =
    useState<Meeting[]>([])

  const [loading, setLoading] =
    useState(true)

  const [sidebarOpen, setSidebarOpen] =
    useState(false)

  useEffect(() => {
    const fetchMeetings = async () => {
      const { data: userData } =
        await supabase.auth.getUser()

      const user = userData.user

      if (!user) return

      const { data, error } =
        await supabase
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

      const formatted =
        data
          ?.map(
            (item: any) =>
              item.meeting
          )
          .filter(Boolean) || []

      setMeetings(formatted)
      setLoading(false)
    }

    fetchMeetings()
  }, [])

  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">

      <DashboardSidebar
        language={language}
        open={sidebarOpen}
        setOpen={setSidebarOpen}
      />

      <main className="flex-1 overflow-y-auto">

        {/* HEADER */}
        <div className="sticky top-0 z-20 backdrop-blur-xl bg-white/70 border-b border-white/30">

          <div className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">

            {/* LEFT */}
            <div className="flex items-center gap-4">

              {/* MOBILE MENU */}
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
                    Live Sessions
                  </h1>

                  <p className="text-muted-foreground mt-1">
                    Join your scheduled German learning meetings
                  </p>

                </div>

              </div>
            </div>

            {/* RIGHT */}
            <select
              value={language}
              onChange={(e) =>
                setLanguage(
                  e.target.value as Language
                )
              }
              className="
                px-4 py-3 rounded-2xl
                border bg-white shadow-sm
              "
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

        {/* HERO */}
        <div className="max-w-7xl mx-auto px-6 pt-8">

          <div className="relative overflow-hidden rounded-[36px] bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 p-10 text-white shadow-2xl">

            {/* BG */}
            <div className="absolute inset-0 opacity-20">

              <div className="absolute top-0 right-0 w-72 h-72 rounded-full bg-white blur-3xl" />

              <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-cyan-300 blur-3xl" />

            </div>

            <div className="relative z-10 max-w-2xl">

              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-2 rounded-2xl mb-5">

                <Sparkles className="w-4 h-4" />

                <span className="text-sm font-semibold">
                  Deutschly Sessions
                </span>

              </div>

              <h2 className="text-5xl font-black leading-tight">
                Learn Together Live
              </h2>

              <p className="text-white/80 text-lg mt-4 leading-relaxed">
                Attend interactive sessions with your teacher
                and improve your speaking and listening skills.
              </p>

            </div>
          </div>
        </div>

        {/* CONTENT */}
        <div className="max-w-7xl mx-auto px-6 py-10">

          {loading ? (
            <div className="flex flex-col items-center justify-center py-32">

              <div className="w-16 h-16 rounded-3xl bg-gradient-to-r from-blue-600 to-purple-600 animate-pulse" />

              <p className="mt-6 text-muted-foreground font-medium">
                Loading sessions...
              </p>

            </div>
          ) : (
            <div className="space-y-10">

              {/* TIPS */}
              <div className="grid md:grid-cols-3 gap-5">

                <TipCard
                  icon={
                    <Clock3 className="w-6 h-6 text-blue-600" />
                  }
                  title="Be On Time"
                  text="Join a few minutes early for a smoother session."
                />

                <TipCard
                  icon={
                    <BookOpen className="w-6 h-6 text-purple-600" />
                  }
                  title="Participate"
                  text="Speaking during sessions improves fluency much faster."
                />

                <TipCard
                  icon={
                    <Video className="w-6 h-6 text-green-600" />
                  }
                  title="Use Headphones"
                  text="Better audio quality helps concentration and listening."
                />

              </div>

              {/* MEETINGS */}
              {meetings.length > 0 ? (
                <div className="grid lg:grid-cols-2 gap-7">

                  {meetings.map(
                    (meeting) => (
                      <div
                        key={meeting.id}
                        className="
                          group relative overflow-hidden
                          rounded-[32px]
                          bg-white border border-white/50
                          shadow-lg hover:shadow-2xl
                          transition-all duration-300
                          hover:-translate-y-1
                        "
                      >

                        {/* TOP */}
                        <div className="relative bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 p-8 text-white overflow-hidden">

                          <div className="absolute inset-0 opacity-20">

                            <div className="absolute top-0 right-0 w-40 h-40 rounded-full bg-white blur-3xl" />

                          </div>

                          <div className="relative z-10">

                            <div className="w-16 h-16 rounded-3xl bg-white/20 backdrop-blur-md flex items-center justify-center shadow-lg mb-6">

                              <Video className="w-8 h-8" />

                            </div>

                            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-2 rounded-2xl text-sm font-semibold mb-5">

                              <Calendar className="w-4 h-4" />

                              Live Session

                            </div>

                            <h3 className="text-3xl font-black leading-tight break-words">
                              {meeting.title}
                            </h3>

                          </div>
                        </div>

                        {/* CONTENT */}
                        <div className="p-7">

                          {meeting.scheduled_at && (
                            <div className="flex items-center gap-3 bg-secondary rounded-2xl p-4 mb-6">

                              <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center shadow-sm">

                                <Clock3 className="w-5 h-5 text-blue-600" />

                              </div>

                              <div>

                                <p className="text-sm text-muted-foreground">
                                  Scheduled Time
                                </p>

                                <p className="font-bold">
                                  {new Date(
                                    meeting.scheduled_at
                                  ).toLocaleString()}
                                </p>

                              </div>

                            </div>
                          )}

                          <Button
                            onClick={() =>
                              window.open(
                                meeting.meeting_link,
                                '_blank'
                              )
                            }
                            className="
                              w-full h-14 rounded-2xl
                              bg-gradient-to-r from-blue-600 to-purple-600
                              hover:opacity-90
                              text-white font-bold
                              shadow-lg
                              text-base
                            "
                          >

                            <div className="flex items-center gap-2">

                              <ExternalLink className="w-5 h-5" />

                              Join Session

                            </div>

                          </Button>

                        </div>
                      </div>
                    )
                  )}

                </div>
              ) : (
                <div className="bg-white rounded-[36px] border shadow-lg p-16 text-center">

                  <div className="w-24 h-24 rounded-[28px] bg-gradient-to-r from-blue-600 to-purple-600 mx-auto flex items-center justify-center shadow-xl">

                    <Calendar className="w-12 h-12 text-white" />

                  </div>

                  <h3 className="text-3xl font-black mt-8">
                    No Sessions Yet
                  </h3>

                  <p className="text-muted-foreground mt-3 text-lg max-w-md mx-auto">
                    Your teacher hasn't assigned any live sessions yet.
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

function TipCard({
  icon,
  title,
  text,
}: any) {
  return (
    <div className="bg-white rounded-[28px] border shadow-lg p-6 hover:shadow-xl transition-all">

      <div className="w-14 h-14 rounded-2xl bg-secondary flex items-center justify-center mb-5">

        {icon}

      </div>

      <h3 className="text-xl font-bold">
        {title}
      </h3>

      <p className="text-muted-foreground mt-2 leading-relaxed">
        {text}
      </p>

    </div>
  )
}