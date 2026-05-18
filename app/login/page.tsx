'use client'

import {
  useEffect,
  useState,
} from 'react'

import Link from 'next/link'

import { useRouter } from 'next/navigation'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

import { supabase } from '@/lib/supabaseClient'
import { t } from '@/lib/translations'
import { useLanguage } from '@/context/LanguageContext'

import {
  Mail,
  Lock,
  ArrowRight,
} from 'lucide-react'

export default function LoginPage() {
  const router = useRouter()

  const { language } =
    useLanguage()

  const [email, setEmail] =
    useState('')

  const [password, setPassword] =
    useState('')

  const [loading, setLoading] =
    useState(false)

  const [checkingAuth, setCheckingAuth] =
    useState(true)

  const [error, setError] =
    useState<string | null>(
      null
    )

  // 🔥 AUTO REDIRECT IF LOGGED IN
  useEffect(() => {
    const checkUser =
      async () => {
        const {
          data: { user },
        } =
          await supabase.auth.getUser()

        if (!user) {
          setCheckingAuth(false)
          return
        }

        // 🔐 CHECK PROFILE
        const {
          data: profile,
        } = await supabase
          .from('profiles')
          .select(
            'is_admin, is_active'
          )
          .eq(
            'id',
            user.id
          )
          .single()

        // 🔥 NOT ACTIVE
        if (
          !profile?.is_active
        ) {
          await supabase.auth.signOut()

          setCheckingAuth(false)

          return
        }

        // 🔥 REDIRECT
        if (
          profile?.is_admin
        ) {
          router.replace(
            '/admin/exercises'
          )
        } else {
          router.replace(
            '/dashboard/exercises'
          )
        }
      }

    checkUser()
  }, [router])

  // 🔥 LOGIN
  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault()

    setLoading(true)

    setError(null)

    const {
      data,
      error,
    } =
      await supabase.auth.signInWithPassword(
        {
          email,
          password,
        }
      )

    if (error) {
      setError(
        error.message
      )

      setLoading(false)

      return
    }

    const user =
      data.user

    // 🔐 CHECK PROFILE
    const {
      data: profile,
    } = await supabase
      .from('profiles')
      .select(
        'is_admin, is_active'
      )
      .eq(
        'id',
        user?.id
      )
      .single()

    // 🔥 ACCOUNT NOT ACTIVE
    if (
      !profile?.is_active
    ) {
      await supabase.auth.signOut()

      setError(
        t(
          'login.wait',
          language
        )
      )

      setLoading(false)

      return
    }

    // 🔥 REDIRECT
    if (
      profile?.is_admin
    ) {
      router.replace(
        '/admin/exercises'
      )
    } else {
      router.replace(
        '/dashboard/exercises'
      )
    }
  }

  // 🔥 LOADING SCREEN
  if (checkingAuth) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-yellow-50 flex items-center justify-center">

        <div className="bg-white rounded-[32px] shadow-2xl border p-10">

          <div className="flex flex-col items-center gap-5">

            <div className="w-14 h-14 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />

            <p className="text-lg font-semibold text-muted-foreground">
              {t(
                'login.loading',
                language
              )}
            </p>

          </div>

        </div>

      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-yellow-50 flex items-center justify-center px-4 py-10 overflow-hidden">

      <div className="w-full max-w-lg">

        {/* LOGO */}
        <Link
          href="/"
          className="flex items-center justify-center mb-8"
        >

          <img
            src="/german.png"
            alt="German Logo"
            className="h-24 w-auto"
          />

        </Link>

        {/* CARD */}
        <div className="bg-white rounded-[36px] shadow-2xl border border-border overflow-hidden">

          {/* TOP */}
          <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 p-10 text-white">

            {/* BG */}
            <div className="absolute inset-0 opacity-20">

              <div className="absolute top-0 right-0 w-72 h-72 rounded-full bg-white blur-3xl" />

              <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-cyan-300 blur-3xl" />

            </div>

            <div className="relative z-10 text-center">

              <h1 className="text-5xl font-black leading-tight">
                {t(
                  'login.welcome',
                  language
                )}
              </h1>

              <p className="text-white/80 text-lg mt-5 leading-relaxed">
                {t(
                  'login.subtitle',
                  language
                )}
              </p>

            </div>

          </div>

          {/* FORM */}
          <div className="p-8 md:p-10">

            <form
              onSubmit={
                handleSubmit
              }
              className="space-y-6"
            >

              {/* EMAIL */}
              <div className="space-y-3">

                <label className="text-sm font-bold uppercase tracking-wide text-muted-foreground">
                  {t(
                    'login.email',
                    language
                  )}
                </label>

                <div className="relative">

                  <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />

                  <Input
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(
                      e
                    ) =>
                      setEmail(
                        e.target
                          .value
                      )
                    }
                    required
                    className="h-14 rounded-2xl border-2 pl-14"
                  />

                </div>

              </div>

              {/* PASSWORD */}
              <div className="space-y-3">

                <label className="text-sm font-bold uppercase tracking-wide text-muted-foreground">
                  {t(
                    'login.password',
                    language
                  )}
                </label>

                <div className="relative">

                  <Lock className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />

                  <Input
                    type="password"
                    placeholder="••••••••"
                    value={
                      password
                    }
                    onChange={(
                      e
                    ) =>
                      setPassword(
                        e.target
                          .value
                      )
                    }
                    required
                    className="h-14 rounded-2xl border-2 pl-14"
                  />

                </div>

              </div>

              {/* ERROR */}
              {error && (
                <div className="rounded-2xl bg-red-100 border border-red-200 text-red-700 p-4 font-medium">

                  {error}

                </div>
              )}

              {/* SUBMIT */}
              <Button
                type="submit"
                disabled={
                  loading
                }
                className="
                  w-full h-14 rounded-2xl
                  bg-gradient-to-r from-blue-600 to-purple-600
                  hover:opacity-90
                  text-white font-bold text-lg
                  shadow-xl
                "
              >

                <div className="flex items-center gap-3">

                  {loading
                    ? t(
                        'login.signing',
                        language
                      )
                    : t(
                        'login.signin',
                        language
                      )}

                  {!loading && (
                    <ArrowRight className="w-5 h-5" />
                  )}

                </div>

              </Button>

            </form>

            {/* FOOTER */}
            <div className="mt-8 pt-8 border-t border-border text-center">

              <p className="text-muted-foreground">

                {t(
                  'login.noaccount',
                  language
                )}{' '}

                <Link
                  href="/signup"
                  className="font-bold text-primary hover:underline"
                >

                  {t(
                    'login.create',
                    language
                  )}

                </Link>

              </p>

            </div>

          </div>
        </div>
      </div>
    </div>
  )
}