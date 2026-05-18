'use client'

import { useEffect, useState } from 'react'

import { DashboardSidebar } from '@/components/DashboardSidebar'
import { supabase } from '@/lib/supabaseClient'
import { Button } from '@/components/ui/button'
import { useLanguage } from '@/context/LanguageContext'
import { t } from '@/lib/translations'

import {
  User,
  Lock,
  Mail,
  ShieldCheck,
  Sparkles,
  Menu,
  GraduationCap,
  CheckCircle2,
} from 'lucide-react'

type Language = 'en' | 'fr' | 'ar'

export default function ProfilePage() {
  const { language, setLanguage } =
    useLanguage()

    const isRTL = language === 'ar'
  const [sidebarOpen, setSidebarOpen] =
    useState(false)

  const [user, setUser] =
    useState<any>(null)

  // 🔐 PASSWORD STATES
  const [
    showPasswordForm,
    setShowPasswordForm,
  ] = useState(false)

  const [password, setPassword] =
    useState('')

  const [
    confirmPassword,
    setConfirmPassword,
  ] = useState('')

  const [loading, setLoading] =
    useState(false)

  const [success, setSuccess] =
    useState(false)

  // 🔥 FETCH USER
  useEffect(() => {
    const fetchData = async () => {
      const {
        data: userData,
      } =
        await supabase.auth.getUser()

      const currentUser =
        userData.user

      if (!currentUser) return

      const { data: profile } =
        await supabase
          .from('profiles')
          .select('*')
          .eq(
            'id',
            currentUser.id
          )
          .single()

      setUser({
        ...profile,
        email:
          currentUser.email,
      })
    }

    fetchData()
  }, [])

  // 🔐 CHANGE PASSWORD
  const handleChangePassword =
    async () => {
      if (
        !password ||
        password.length < 6
      ) {
        return alert(
          t(
            'profile.passwordShort',
            language
          )
        )
      }

      if (
        password !==
        confirmPassword
      ) {
        return alert(
          t(
            'profile.passwordMismatch',
            language
          )
        )
      }

      setLoading(true)

      const { error } =
        await supabase.auth.updateUser(
          {
            password,
          }
        )

      setLoading(false)

      if (error) {
        console.error(error)

        alert(
          t(
            'profile.passwordError',
            language
          )
        )
      } else {
        setSuccess(true)

        setPassword('')
        setConfirmPassword('')
        setShowPasswordForm(false)

        setTimeout(() => {
          setSuccess(false)
        }, 3000)
      }
    }

  return (
    <div
      dir={isRTL ? 'rtl' : 'ltr'}
      className="flex h-screen overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50"
    >

      {/* SIDEBAR */}
      <DashboardSidebar
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
            <div
              className={`flex items-center gap-4 ${
                isRTL ? 'flex-row-reverse' : ''
              }`}
            >

              {/* MOBILE BTN */}
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
                    {t(
                      'profile.title',
                      language
                    )}
                  </h1>

                  <p className="text-muted-foreground mt-1">
                    {t(
                      'profile.subtitle',
                      language
                    )}
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

            <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-8">

              {/* LEFT */}
              <div className="flex items-center gap-6">

                <div className="w-28 h-28 rounded-[32px] bg-white/20 backdrop-blur-md flex items-center justify-center shadow-2xl">

                  <User className="w-14 h-14 text-white" />

                </div>

                <div>

                  <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-2 rounded-2xl mb-5">

                    <Sparkles className="w-4 h-4" />

                    <span className="text-sm font-semibold">
                      {t(
                        'profile.student',
                        language
                      )}
                    </span>

                  </div>

                  <h2 className="text-5xl font-black leading-tight">
                    {user?.first_name}{' '}
                    {user?.last_name}
                  </h2>

                  <p className="text-white/80 text-lg mt-3">
                    {t(
                      'profile.hero.desc',
                      language
                    )}
                  </p>

                </div>

              </div>

              {/* LEVEL */}
              <div className="bg-white/20 backdrop-blur-md rounded-[28px] p-6 min-w-[220px] shadow-xl">

                <div className="flex items-center gap-4">

                  <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center">

                    <GraduationCap className="w-8 h-8 text-white" />

                  </div>

                  <div>

                    <p className="text-white/70 text-sm">
                      {t(
                        'profile.currentLevel',
                        language
                      )}
                    </p>

                    <h3 className="text-4xl font-black mt-1">
                      {user?.level ||
                        'A1'}
                    </h3>

                  </div>

                </div>
              </div>

            </div>
          </div>
        </div>

        {/* CONTENT */}
        <div className="max-w-6xl mx-auto px-6 py-10 space-y-8">

          {/* SUCCESS */}
          {success && (
            <div className="bg-green-100 border border-green-200 text-green-800 rounded-[28px] p-5 flex items-center gap-4 shadow-sm">

              <div className="w-14 h-14 rounded-2xl bg-green-500 flex items-center justify-center text-white shadow-lg">

                <CheckCircle2 className="w-7 h-7" />

              </div>

              <div>

                <p className="font-bold text-lg">
                  {t(
                    'profile.passwordUpdated',
                    language
                  )}
                </p>

                <p className="text-sm opacity-80">
                  {t(
                    'profile.passwordUpdatedDesc',
                    language
                  )}
                </p>

              </div>

            </div>
          )}

          <div className="grid xl:grid-cols-[1fr_360px] gap-8">

            {/* LEFT */}
            <div className="space-y-8">

              {/* ACCOUNT INFO */}
              <div className="bg-white rounded-[32px] border shadow-xl overflow-hidden">

                {/* TOP */}
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-7 text-white">

                  <div className="flex items-center gap-4">

                    <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center">

                      <ShieldCheck className="w-7 h-7" />

                    </div>

                    <div>

                      <h3 className="text-3xl font-black">
                        {t(
                          'profile.accountInfo',
                          language
                        )}
                      </h3>

                      <p className="text-white/80 mt-1">
                        {t(
                          'profile.accountInfoDesc',
                          language
                        )}
                      </p>

                    </div>

                  </div>
                </div>

                {/* CONTENT */}
                <div className="p-8 grid md:grid-cols-2 gap-6">

                  {/* EMAIL */}
                  <div className="rounded-2xl border bg-secondary/40 p-6">

                    <div className="flex items-center gap-3 mb-4">

                      <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center">

                        <Mail className="w-5 h-5 text-blue-600" />

                      </div>

                      <div>

                        <p className="text-sm text-muted-foreground">
                          {t(
                            'profile.email',
                            language
                          )}
                        </p>

                        <p className="font-semibold mt-1 break-all">
                          {user?.email ||
                            '—'}
                        </p>

                      </div>

                    </div>

                  </div>

                  {/* LEVEL */}
                  <div className="rounded-2xl border bg-secondary/40 p-6">

                    <div className="flex items-center gap-3 mb-4">

                      <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center">

                        <GraduationCap className="w-5 h-5 text-purple-600" />

                      </div>

                      <div>

                        <p className="text-sm text-muted-foreground">
                          {t(
                            'profile.germanLevel',
                            language
                          )}
                        </p>

                        <p className="font-semibold mt-1">
                          {user?.level ||
                            'A1'}
                        </p>

                      </div>

                    </div>

                  </div>

                </div>
              </div>

              {/* PASSWORD */}
              <div className="bg-white rounded-[32px] border shadow-xl overflow-hidden">

                {/* TOP */}
                <div className="bg-gradient-to-r from-orange-500 to-red-500 p-7 text-white">

                  <div className="flex items-center gap-4">

                    <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center">

                      <Lock className="w-7 h-7" />

                    </div>

                    <div>

                      <h3 className="text-3xl font-black">
                        {t(
                          'profile.security',
                          language
                        )}
                      </h3>

                      <p className="text-white/80 mt-1">
                        {t(
                          'profile.securityDesc',
                          language
                        )}
                      </p>

                    </div>

                  </div>
                </div>

                {/* CONTENT */}
                <div className="p-8 space-y-6">

                  {!showPasswordForm ? (
                    <Button
                      variant="outline"
                      onClick={() =>
                        setShowPasswordForm(
                          true
                        )
                      }
                      className="
                        h-14 px-8 rounded-2xl
                        border-2 font-semibold
                      "
                    >
                      {t(
                        'profile.changePassword',
                        language
                      )}
                    </Button>
                  ) : (
                    <div className="space-y-5 max-w-lg">

                      <div className="space-y-3">

                        <label className="text-sm font-bold uppercase tracking-wide text-muted-foreground">
                          {t(
                            'profile.newPassword',
                            language
                          )}
                        </label>

                        <input
                          type="password"
                          placeholder={t(
                            'profile.enterPassword',
                            language
                          )}
                          className="
                            w-full h-14 rounded-2xl
                            border-2 border-border
                            px-5 bg-white
                            focus:outline-none focus:ring-2 focus:ring-orange-500
                          "
                          value={password}
                          onChange={(e) =>
                            setPassword(
                              e.target
                                .value
                            )
                          }
                        />

                      </div>

                      <div className="space-y-3">

                        <label className="text-sm font-bold uppercase tracking-wide text-muted-foreground">
                          {t(
                            'profile.confirmPassword',
                            language
                          )}
                        </label>

                        <input
                          type="password"
                          placeholder={t(
                            'profile.confirmNewPassword',
                            language
                          )}
                          className="
                            w-full h-14 rounded-2xl
                            border-2 border-border
                            px-5 bg-white
                            focus:outline-none focus:ring-2 focus:ring-orange-500
                          "
                          value={
                            confirmPassword
                          }
                          onChange={(e) =>
                            setConfirmPassword(
                              e.target
                                .value
                            )
                          }
                        />

                      </div>

                      <div className="flex flex-wrap gap-4 pt-2">

                        <Button
                          onClick={
                            handleChangePassword
                          }
                          disabled={
                            loading
                          }
                          className="
                            h-14 px-8 rounded-2xl
                            bg-gradient-to-r from-orange-500 to-red-500
                            hover:opacity-90
                            text-white font-bold shadow-lg
                          "
                        >
                          {loading
                            ? t(
                                'profile.updating',
                                language
                              )
                            : t(
                                'profile.savePassword',
                                language
                              )}
                        </Button>

                        <Button
                          variant="outline"
                          onClick={() =>
                            setShowPasswordForm(
                              false
                            )
                          }
                          className="h-14 px-8 rounded-2xl border-2"
                        >
                          {t(
                            'profile.cancel',
                            language
                          )}
                        </Button>

                      </div>

                    </div>
                  )}

                </div>
              </div>

            </div>

            {/* RIGHT */}
            <div className="space-y-8">

              {/* PROFILE SUMMARY */}
              <div className="bg-white rounded-[32px] border shadow-xl overflow-hidden">

                <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-7 text-white">

                  <h3 className="text-2xl font-black">
                    {t(
                      'profile.summary',
                      language
                    )}
                  </h3>

                  <p className="text-white/80 mt-1">
                    {t(
                      'profile.summaryDesc',
                      language
                    )}
                  </p>

                </div>

                <div className="p-7 space-y-5">

                  <SummaryCard
                    title={t(
                      'profile.studentName',
                      language
                    )}
                    value={`${user?.first_name || ''} ${user?.last_name || ''}`}
                  />

                  <SummaryCard
                    title={t(
                      'profile.currentLevel',
                      language
                    )}
                    value={
                      user?.level ||
                      'A1'
                    }
                  />

                  <SummaryCard
                    title={t(
                      'profile.accountStatus',
                      language
                    )}
                    value={t(
                      'profile.active',
                      language
                    )}
                  />

                </div>
              </div>

              {/* MOTIVATION */}
              <div className="relative overflow-hidden rounded-[32px] bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 p-8 text-white shadow-2xl">

                <div className="absolute top-0 right-0 w-52 h-52 rounded-full bg-white/20 blur-3xl" />

                <div className="relative z-10">

                  <div className="w-16 h-16 rounded-3xl bg-white/20 backdrop-blur-md flex items-center justify-center mb-6">

                    <Sparkles className="w-8 h-8" />

                  </div>

                  <h3 className="text-3xl font-black leading-tight">
                    {t(
                      'profile.keepGoing',
                      language
                    )}
                  </h3>

                  <p className="text-white/80 mt-4 leading-relaxed">
                    {t(
                      'profile.keepGoingDesc',
                      language
                    )}
                  </p>

                </div>
              </div>

            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

function SummaryCard({
  title,
  value,
}: any) {
  return (
    <div className="rounded-2xl bg-secondary p-5">

      <p className="text-sm text-muted-foreground">
        {title}
      </p>

      <p className="font-bold text-lg mt-2 break-words">
        {value}
      </p>

    </div>
  )
}