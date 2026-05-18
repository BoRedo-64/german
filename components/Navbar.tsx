'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

import { t } from '@/lib/translations'
import { Button } from '@/components/ui/button'
import { supabase } from '@/lib/supabaseClient'

import {
  useLanguage,
  type Language,
} from '@/context/LanguageContext'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

export function Navbar() {
  const {
    language,
    setLanguage,
  } = useLanguage()

  const [isOpen, setIsOpen] =
    useState(false)

  const [isLoggedIn, setIsLoggedIn] =
    useState(false)

  const [dashboardPath, setDashboardPath] =
    useState('/dashboard')

  const languages: {
    code: Language
    name: string
    flag: string
  }[] = [
    {
      code: 'en',
      name: 'English',
      flag: '🇬🇧',
    },

    {
      code: 'fr',
      name: 'Français',
      flag: '🇫🇷',
    },

    {
      code: 'ar',
      name: 'العربية',
      flag: '🇸🇦',
    },
  ]

  // 🔥 CHECK USER
  useEffect(() => {
    const checkUser =
      async () => {
        const { data } =
          await supabase.auth.getUser()

        const user =
          data.user

        if (!user) {
          setIsLoggedIn(false)
          return
        }

        setIsLoggedIn(true)

        // 🔥 CHECK ROLE
        const {
          data: profile,
        } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', user.id)
          .single()

        if (
          profile?.role ===
          'admin'
        ) {
          setDashboardPath(
            '/admin/exercises'
          )
        } else {
          setDashboardPath(
            '/dashboard/exercises'
          )
        }
      }

    checkUser()
  }, [])

  return (
    <nav
  dir={language === 'ar' ? 'rtl' : 'ltr'}
  className="sticky top-0 z-50 bg-white shadow-base border-b border-border"
>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="flex items-center justify-between h-20">

          {/* LOGO */}
          <Link
            href="/"
            className="flex items-center gap-2"
          >
            <img
              src="/german.png"
              alt="German Logo"
              className="h-15 w-auto"
            />
          </Link>

          {/* DESKTOP */}
          <div className="hidden md:flex items-center gap-3">

            {/* LANGUAGE */}
            <DropdownMenu>

              <DropdownMenuTrigger asChild>

                <Button
                  variant="outline"
                  size="lg"
                  className="gap-2"
                >

                  <span>
                    {
                      languages.find(
                        (l) =>
                          l.code ===
                          language
                      )?.flag
                    }
                  </span>

                  <span>
                    {
                      languages.find(
                        (l) =>
                          l.code ===
                          language
                      )?.name
                    }
                  </span>

                </Button>

              </DropdownMenuTrigger>

              <DropdownMenuContent align="end">

                {languages.map(
                  (lang) => (
                    <DropdownMenuItem
                      key={
                        lang.code
                      }
                      onClick={() =>
                        setLanguage(
                          lang.code
                        )
                      }
                      className="cursor-pointer"
                    >

                      <span className="mr-2">
                        {
                          lang.flag
                        }
                      </span>

                      {lang.name}

                    </DropdownMenuItem>
                  )
                )}

              </DropdownMenuContent>

            </DropdownMenu>

            {/* LOGIN / DASHBOARD */}
            <Link
              href={
                isLoggedIn
                  ? dashboardPath
                  : '/login'
              }
            >

              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-white"
              >

                {isLoggedIn
                  ? 'Dashboard'
                  : t(
                      'login',
                      language
                    )}

              </Button>

            </Link>

          </div>

          {/* MOBILE BUTTON */}
          <button
            onClick={() =>
              setIsOpen(
                !isOpen
              )
            }
            className="md:hidden p-2 rounded-lg hover:bg-secondary transition"
          >

            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >

              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={
                  isOpen
                    ? 'M6 18L18 6M6 6l12 12'
                    : 'M4 6h16M4 12h16M4 18h16'
                }
              />

            </svg>

          </button>

        </div>

        {/* MOBILE MENU */}
        {isOpen && (
          <div className="md:hidden pb-6 space-y-4">

            {/* LANGUAGE */}
            <div className="flex flex-col gap-2">

              {languages.map(
                (lang) => (
                  <button
                    key={
                      lang.code
                    }
                    onClick={() => {
                      setLanguage(
                        lang.code
                      )

                      setIsOpen(
                        false
                      )
                    }}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg border ${
                      language ===
                      lang.code
                        ? 'bg-primary text-white'
                        : 'bg-background'
                    }`}
                  >

                    <span>
                      {
                        lang.flag
                      }
                    </span>

                    {lang.name}

                  </button>
                )
              )}

            </div>

            {/* LOGIN / DASHBOARD */}
            <Link
              href={
                isLoggedIn
                  ? dashboardPath
                  : '/login'
              }
              onClick={() =>
                setIsOpen(
                  false
                )
              }
            >

              <Button className="w-full bg-primary text-white">

                {isLoggedIn
                  ? 'Dashboard'
                  : t(
                      'login',
                      language
                    )}

              </Button>

            </Link>

          </div>
        )}

      </div>
    </nav>
  )
}