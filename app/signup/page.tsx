'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

import { supabase } from '@/lib/supabaseClient'

import { t } from '@/lib/translations'

import {
  useLanguage,
} from '@/context/LanguageContext'

import {
  Sparkles,
  Mail,
  Lock,
  CheckCircle2,
  ArrowRight,
} from 'lucide-react'

export default function SignupPage() {
  const router = useRouter()

  const { language } =
    useLanguage()

  const isRTL =
    language === 'ar'

  const [email, setEmail] =
    useState('')

  const [password, setPassword] =
    useState('')

  const [confirmPassword, setConfirmPassword] =
    useState('')

  const [loading, setLoading] =
    useState(false)

  const [error, setError] =
    useState<string | null>(null)

  const [success, setSuccess] =
    useState(false)

  // 🔥 SIGNUP
  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault()

    setError(null)

    // VALIDATION
    if (
      password !==
      confirmPassword
    ) {
      setError(
        t(
          'signup.error.match',
          language
        )
      )

      return
    }

    if (
      password.length < 6
    ) {
      setError(
        t(
          'signup.error.length',
          language
        )
      )

      return
    }

    setLoading(true)

    // 🔥 CREATE ACCOUNT
    const {
      data,
      error,
    } =
      await supabase.auth.signUp({
        email,
        password,
      })

    if (error) {
      setError(error.message)

      setLoading(false)

      return
    }

    // 🔥 CREATE PROFILE
    if (data.user) {
      const {
        error: profileError,
      } = await supabase
        .from('profiles')
        .insert([
          {
            id: data.user.id,
            is_admin: false,
          },
        ])

      if (profileError) {
        console.error(
          profileError
        )
      }

      // 🔥 FORCE LOGOUT
      await supabase.auth.signOut()
    }

    setLoading(false)

    setSuccess(true)

    // REDIRECT
    setTimeout(() => {
      router.push('/login')
    }, 3000)
  }

  // 🔥 SUCCESS
  if (success) {
    return (
      <div
        dir={
          isRTL
            ? 'rtl'
            : 'ltr'
        }
        className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-yellow-50 flex items-center justify-center px-4"
      >

        <div className="w-full max-w-lg">

          <div className="bg-white rounded-[36px] shadow-2xl border border-border overflow-hidden">

            {/* TOP */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-10 text-white text-center relative overflow-hidden">

              {/* BG */}
              <div className="absolute top-0 right-0 w-72 h-72 rounded-full bg-white/20 blur-3xl" />

              <div className="relative z-10">

                <div className="w-28 h-28 rounded-[32px] bg-white/20 backdrop-blur-md flex items-center justify-center mx-auto shadow-2xl mb-8">

                  <CheckCircle2 className="w-14 h-14 text-white" />

                </div>

                <h1 className="text-5xl font-black">

                  {t(
                    'signup.success.title',
                    language
                  )}

                </h1>

                <p className="text-white/80 text-lg mt-5 leading-relaxed max-w-md mx-auto">

                  {t(
                    'signup.success.desc',
                    language
                  )}

                </p>

              </div>

            </div>

            {/* BOTTOM */}
            <div className="p-10 text-center">

              <div className="inline-flex items-center gap-3 bg-yellow-100 text-yellow-700 px-5 py-3 rounded-2xl font-semibold">

                <Sparkles className="w-5 h-5" />

                {t(
                  'signup.success.waiting',
                  language
                )}

              </div>

            </div>

          </div>

        </div>
      </div>
    )
  }

  return (
    <div
      dir={
        isRTL
          ? 'rtl'
          : 'ltr'
      }
      className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-yellow-50 flex items-center justify-center px-4 py-10 overflow-hidden"
    >

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
                  'signup.create',
                  language
                )}

              </h1>

              <p className="text-white/80 text-lg mt-5 leading-relaxed">

                {t(
                  'signup.subtitle',
                  language
                )}

              </p>

            </div>

          </div>

          {/* FORM */}
          <div className="p-8 md:p-10">

            <form
              onSubmit={handleSubmit}
              className="space-y-6"
            >

              {/* EMAIL */}
              <div className="space-y-3">

                <label className="text-sm font-bold uppercase tracking-wide text-muted-foreground">

                  {t(
                    'signup.email',
                    language
                  )}

                </label>

                <div className="relative">

                  <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />

                  <Input
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) =>
                      setEmail(
                        e.target.value
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
                    'signup.password',
                    language
                  )}

                </label>

                <div className="relative">

                  <Lock className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />

                  <Input
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) =>
                      setPassword(
                        e.target.value
                      )
                    }
                    required
                    className="h-14 rounded-2xl border-2 pl-14"
                  />

                </div>

              </div>

              {/* CONFIRM */}
              <div className="space-y-3">

                <label className="text-sm font-bold uppercase tracking-wide text-muted-foreground">

                  {t(
                    'signup.confirm',
                    language
                  )}

                </label>

                <div className="relative">

                  <Lock className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />

                  <Input
                    type="password"
                    placeholder="••••••••"
                    value={
                      confirmPassword
                    }
                    onChange={(e) =>
                      setConfirmPassword(
                        e.target.value
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
                disabled={loading}
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
                        'signup.creating',
                        language
                      )
                    : t(
                        'signup.submit',
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
                  'signup.already',
                  language
                )}{' '}

                <Link
                  href="/login"
                  className="font-bold text-primary hover:underline"
                >

                  {t(
                    'signup.signin',
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