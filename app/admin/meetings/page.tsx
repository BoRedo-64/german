'use client'

import {
  useEffect,
  useMemo,
  useState,
} from 'react'

import { AdminSidebar } from '@/components/AdminSidebar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

import { supabase } from '@/lib/supabaseClient'

import {
  Calendar,
  Clock3,
  Link2,
  Menu,
  Sparkles,
  Users,
  Video,
  CheckCircle2,
} from 'lucide-react'

type Language = 'en' | 'fr' | 'ar'

const LEVELS = [
  'A1',
  'A2',
  'B1',
  'B2',
  'C1',
  'C2',
]

export default function AddMeetingPage() {
  const [language, setLanguage] =
    useState<Language>('en')

  const [sidebarOpen, setSidebarOpen] =
    useState(false)

  const [users, setUsers] =
    useState<any[]>([])

  const [
    selectedUsers,
    setSelectedUsers,
  ] = useState<string[]>([])

  const [
    selectedLevel,
    setSelectedLevel,
  ] = useState('')

  const [formData, setFormData] =
    useState({
      title: '',
      meetingLink: '',
      date: '',
    })

  const [loading, setLoading] =
    useState(false)

  const [success, setSuccess] =
    useState(false)

  // 🔥 FETCH USERS
  useEffect(() => {
    const fetchUsers = async () => {
      const { data } =
        await supabase
          .from('profiles')
          .select(
            'id, first_name, last_name, level'
          )
          .eq('is_admin', false)

      setUsers(data || [])
    }

    fetchUsers()
  }, [])

  // 🔥 FILTER USERS
  const filteredUsers =
    useMemo(() => {
      if (!selectedLevel)
        return []

      return users.filter(
        (user) =>
          user.level ===
          selectedLevel
      )
    }, [
      users,
      selectedLevel,
    ])

  // 🔥 AUTO SELECT
  useEffect(() => {
    if (!selectedLevel) {
      setSelectedUsers([])
      return
    }

    const levelUsers =
      filteredUsers.map(
        (user) => user.id
      )

    setSelectedUsers(levelUsers)
  }, [
    selectedLevel,
    filteredUsers,
  ])

  // 🔥 TOGGLE USER
  const toggleUser = (
    id: string
  ) => {
    setSelectedUsers((prev) =>
      prev.includes(id)
        ? prev.filter(
            (u) => u !== id
          )
        : [...prev, id]
    )
  }

  // 🔥 SUBMIT
  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault()

    if (
      selectedUsers.length === 0
    ) {
      alert(
        'Select at least one student'
      )
      return
    }

    setLoading(true)

    // CREATE MEETING
    const {
      data: meeting,
      error,
    } = await supabase
      .from('meetings')
      .insert({
        title: formData.title,
        meeting_link:
          formData.meetingLink,
        scheduled_at:
          formData.date,
        level: selectedLevel,
      })
      .select()
      .single()

    if (error) {
      console.error(error)
      setLoading(false)
      return
    }

    // PARTICIPANTS
    const participants =
      selectedUsers.map(
        (user_id) => ({
          meeting_id:
            meeting.id,
          user_id,
        })
      )

    const {
      error:
        participantsError,
    } = await supabase
      .from(
        'meeting_participants'
      )
      .insert(participants)

    if (participantsError) {
      console.error(
        participantsError
      )

      setLoading(false)
      return
    }

    // RESET
    setSuccess(true)

    setFormData({
      title: '',
      meetingLink: '',
      date: '',
    })

    setSelectedUsers([])
    setSelectedLevel('')

    setLoading(false)

    setTimeout(
      () => setSuccess(false),
      3000
    )
  }

  return (
    <div className="flex h-screen overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">

      {/* SIDEBAR */}
      <AdminSidebar
        language={language}
        open={sidebarOpen}
        setOpen={setSidebarOpen}
      />

      {/* MAIN */}
      <main className="flex-1 h-screen overflow-y-auto">

        {/* HEADER */}
        <div className="sticky top-0 z-20 backdrop-blur-xl bg-white/70 border-b border-white/30">

          <div className="max-w-6xl mx-auto px-6 py-6 flex items-center justify-between">

            {/* LEFT */}
            <div className="flex items-center gap-4">

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
                    Create Meeting
                  </h1>

                  <p className="text-muted-foreground mt-1">
                    Schedule live learning sessions for students
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
        <div className="max-w-6xl mx-auto px-6 pt-8">

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
                Organize Live Classes
              </h2>

              <p className="text-white/80 text-lg mt-4 leading-relaxed">
                Create interactive online sessions and invite
                students by their German level.
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
                  Meeting Created
                </p>

                <p className="text-sm opacity-80">
                  Students have been assigned successfully
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

              {/* MEETING INFO */}
              <div className="bg-white rounded-[32px] border shadow-xl overflow-hidden">

                {/* TOP */}
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-7 text-white">

                  <div className="flex items-center gap-4">

                    <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center">

                      <Calendar className="w-7 h-7" />

                    </div>

                    <div>

                      <h3 className="text-3xl font-black">
                        Meeting Details
                      </h3>

                      <p className="text-white/80 mt-1">
                        Configure your session information
                      </p>

                    </div>

                  </div>
                </div>

                {/* CONTENT */}
                <div className="p-8 space-y-7">

                  {/* TITLE */}
                  <div className="space-y-3">

                    <label className="text-sm font-bold uppercase tracking-wide text-muted-foreground">
                      Meeting Title
                    </label>

                    <div className="relative">

                      <Video className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />

                      <Input
                        placeholder="German Speaking Practice"
                        value={
                          formData.title
                        }
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            title:
                              e.target
                                .value,
                          })
                        }
                        className="h-14 rounded-2xl border-2 pl-14"
                        required
                      />

                    </div>

                  </div>

                  {/* DATE */}
                  <div className="space-y-3">

                    <label className="text-sm font-bold uppercase tracking-wide text-muted-foreground">
                      Schedule
                    </label>

                    <div className="relative">

                      <Clock3 className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />

                      <Input
                        type="datetime-local"
                        value={
                          formData.date
                        }
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            date:
                              e.target
                                .value,
                          })
                        }
                        className="h-14 rounded-2xl border-2 pl-14"
                        required
                      />

                    </div>

                  </div>

                  {/* LINK */}
                  <div className="space-y-3">

                    <label className="text-sm font-bold uppercase tracking-wide text-muted-foreground">
                      Meeting Link
                    </label>

                    <div className="relative">

                      <Link2 className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />

                      <Input
                        type="url"
                        placeholder="https://meet.google.com/..."
                        value={
                          formData.meetingLink
                        }
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            meetingLink:
                              e.target
                                .value,
                          })
                        }
                        className="h-14 rounded-2xl border-2 pl-14"
                        required
                      />

                    </div>

                  </div>

                  {/* LEVEL */}
                  <div className="space-y-3">

                    <label className="text-sm font-bold uppercase tracking-wide text-muted-foreground">
                      Student Level
                    </label>

                    <select
                      value={
                        selectedLevel
                      }
                      onChange={(e) =>
                        setSelectedLevel(
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
                      required
                    >

                      <option value="">
                        Choose a level
                      </option>

                      {LEVELS.map(
                        (level) => (
                          <option
                            key={level}
                            value={
                              level
                            }
                          >
                            {level}
                          </option>
                        )
                      )}

                    </select>

                  </div>
                </div>
              </div>

              {/* STUDENTS */}
              {selectedLevel && (
                <div className="bg-white rounded-[32px] border shadow-xl overflow-hidden">

                  {/* TOP */}
                  <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-7 text-white flex items-center justify-between">

                    <div className="flex items-center gap-4">

                      <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center">

                        <Users className="w-7 h-7" />

                      </div>

                      <div>

                        <h3 className="text-3xl font-black">
                          Students
                        </h3>

                        <p className="text-white/80 mt-1">
                          Level {selectedLevel}
                        </p>

                      </div>

                    </div>

                    <div className="bg-white/20 px-4 py-2 rounded-2xl text-sm font-semibold">

                      {
                        filteredUsers.length
                      }{' '}
                      Students

                    </div>
                  </div>

                  {/* LIST */}
                  <div className="p-6">

                    {filteredUsers.length >
                    0 ? (
                      <div className="grid md:grid-cols-2 gap-4">

                        {filteredUsers.map(
                          (
                            user
                          ) => {
                            const selected =
                              selectedUsers.includes(
                                user.id
                              )

                            return (
                              <div
                                key={
                                  user.id
                                }
                                onClick={() =>
                                  toggleUser(
                                    user.id
                                  )
                                }
                                className={`
                                  cursor-pointer rounded-2xl border-2 p-5 transition-all
                                  ${
                                    selected
                                      ? 'border-blue-500 bg-blue-50 shadow-lg'
                                      : 'border-border hover:border-blue-300 hover:bg-secondary'
                                  }
                                `}
                              >

                                <div className="flex items-center justify-between">

                                  <div>

                                    <p className="font-bold text-lg">
                                      {
                                        user.first_name
                                      }{' '}
                                      {
                                        user.last_name
                                      }
                                    </p>

                                    <p className="text-sm text-muted-foreground mt-1">
                                      Level{' '}
                                      {
                                        user.level
                                      }
                                    </p>

                                  </div>

                                  <div
                                    className={`
                                      w-6 h-6 rounded-full border-2 flex items-center justify-center
                                      ${
                                        selected
                                          ? 'bg-blue-600 border-blue-600'
                                          : 'border-muted-foreground'
                                      }
                                    `}
                                  >

                                    {selected && (
                                      <div className="w-2.5 h-2.5 rounded-full bg-white" />
                                    )}

                                  </div>

                                </div>
                              </div>
                            )
                          }
                        )}

                      </div>
                    ) : (
                      <div className="text-center py-16">

                        <div className="w-20 h-20 rounded-3xl bg-gradient-to-r from-blue-600 to-purple-600 mx-auto flex items-center justify-center shadow-xl">

                          <Users className="w-10 h-10 text-white" />

                        </div>

                        <h3 className="text-2xl font-black mt-6">
                          No Students Found
                        </h3>

                        <p className="text-muted-foreground mt-2">
                          There are currently no students for this level.
                        </p>

                      </div>
                    )}

                  </div>
                </div>
              )}

              {/* BUTTON */}
              <Button
                type="submit"
                disabled={loading}
                className="
                  h-14 px-10 rounded-2xl
                  bg-gradient-to-r from-blue-600 to-purple-600
                  hover:opacity-90
                  text-white font-bold shadow-lg
                  text-base
                "
              >
                {loading
                  ? 'Creating Meeting...'
                  : 'Create Meeting'}
              </Button>

            </form>

            {/* SIDE PANEL */}
            <div className="space-y-6">

              {/* PREVIEW */}
              <div className="bg-white rounded-[32px] border shadow-xl overflow-hidden">

                <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-7 text-white">

                  <h3 className="text-2xl font-black">
                    Meeting Preview
                  </h3>

                  <p className="text-white/80 mt-1">
                    How students will see the session
                  </p>

                </div>

                <div className="p-7">

                  <div className="rounded-[28px] bg-gradient-to-br from-blue-600 to-purple-600 p-7 text-white shadow-xl">

                    <div className="w-16 h-16 rounded-3xl bg-white/20 flex items-center justify-center mb-6">

                      <Video className="w-8 h-8" />

                    </div>

                    <p className="text-white/70 text-sm">
                      Live Session
                    </p>

                    <h4 className="text-3xl font-black mt-2 break-words">
                      {formData.title ||
                        'Meeting Title'}
                    </h4>

                    <div className="mt-6 inline-flex items-center px-4 py-2 rounded-2xl bg-white/20 text-sm font-semibold">

                      Level{' '}
                      {selectedLevel ||
                        'A1'}

                    </div>

                  </div>
                </div>
              </div>

              {/* TIPS */}
              <div className="bg-white rounded-[32px] border shadow-xl p-7">

                <h3 className="text-2xl font-black mb-6">
                  Tips
                </h3>

                <div className="space-y-4">

                  <TipCard
                    title="Choose the right level"
                    text="Sessions should match student abilities."
                  />

                  <TipCard
                    title="Keep sessions interactive"
                    text="Encourage students to speak during meetings."
                  />

                  <TipCard
                    title="Send clear meeting links"
                    text="Google Meet works best for language practice."
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