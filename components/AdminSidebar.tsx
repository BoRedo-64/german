'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'

import {
  PlusCircle,
  Calendar,
  User,
  LogOut,
  Paperclip,
  ShieldCheck,
  Trash,
} from 'lucide-react'

interface AdminSidebarProps {
  open: boolean
  setOpen: (value: boolean) => void
}

export function AdminSidebar({
  open,
  setOpen,
}: AdminSidebarProps) {
  const pathname = usePathname()
  const router = useRouter()

  const [name, setName] =
    useState<string>('Loading...')

  const adminItems = [
    {
      key: 'Add File',
      href: '/admin/exercises',
      icon: Paperclip,
    },

    {
      key: 'Add Quiz',
      href: '/admin/quiz',
      icon: PlusCircle,
    },

    {
      key: 'Add Test Question',
      href: '/admin/placement',
      icon: PlusCircle,
    },

    {
      key: 'Delete Exercise',
      href: '/admin/delete-exercice',
      icon: Trash,
    },

    {
      key: 'Delete Test Question',
      href: '/admin/delete-test',
      icon: Trash,
    },

    {
      key: 'Add Meeting',
      href: '/admin/meetings',
      icon: Calendar,
    },

    {
      key: 'Profile',
      href: '/admin/profile',
      icon: ShieldCheck,
    },
  ]

  const isActive = (href: string) =>
    pathname === href

  useEffect(() => {
    const fetchProfile = async () => {
      const { data } =
        await supabase.auth.getUser()

      const user = data.user

      if (!user) return

      const { data: profile } =
        await supabase
          .from('profiles')
          .select(
            'first_name, last_name'
          )
          .eq('id', user.id)
          .single()

      if (profile) {
        setName(
          `${profile.first_name} ${profile.last_name}`
        )
      }
    }

    fetchProfile()
  }, [])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.replace('/login')
  }

  return (
    <>
      {/* OVERLAY */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden backdrop-blur-sm"
          onClick={() => setOpen(false)}
        />
      )}

      {/* SIDEBAR */}
      <aside
        className={`
          fixed md:static top-0 left-0 z-50
          h-dvh w-72 bg-white border-r border-border
          flex flex-col transition-transform duration-300
          shadow-xl md:shadow-none
          ${open
            ? 'translate-x-0'
            : '-translate-x-full'}
          md:translate-x-0
        `}
      >

        {/* LOGO */}
        <Link
          href="/"
          className="h-24 flex items-center justify-center border-b border-border hover:bg-secondary/40 transition"
        >
          <img
            src="/german.png"
            className="h-16 w-auto"
          />
        </Link>

        {/* NAVIGATION */}
        <nav className="flex-1 overflow-y-auto p-4 space-y-2">

          <div className="px-4 pb-2">
            <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Admin Panel
            </p>
          </div>

          {adminItems.map((item) => {
            const Icon = item.icon
            const active = isActive(
              item.href
            )

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() =>
                  setOpen(false)
                }
                className={`
                  group flex items-center gap-3
                  px-4 py-3 rounded-2xl
                  transition-all duration-200
                  ${
                    active
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                      : 'hover:bg-secondary text-foreground'
                  }
                `}
              >
                <div
                  className={`
                    flex items-center justify-center
                    w-10 h-10 rounded-xl
                    ${
                      active
                        ? 'bg-white/20'
                        : 'bg-secondary'
                    }
                  `}
                >
                  <Icon
                    className={`w-5 h-5 ${
                      active
                        ? 'text-white'
                        : 'text-muted-foreground'
                    }`}
                  />
                </div>

                <span className="font-medium text-sm">
                  {item.key}
                </span>
              </Link>
            )
          })}
        </nav>

        {/* PROFILE CARD */}
        <div className="p-4 border-t border-border">

          <Link
            href="/admin/profile"
            onClick={() =>
              setOpen(false)
            }
            className="block"
          >
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 border border-blue-100 rounded-2xl p-4 flex items-center gap-3 hover:scale-[1.02] transition-all">

              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center shadow-md">
                <User className="w-6 h-6 text-white" />
              </div>

              <div className="flex flex-col overflow-hidden">
                <p className="text-sm font-semibold text-foreground truncate">
                  {name}
                </p>

                <p className="text-xs text-muted-foreground">
                  Administrator
                </p>
              </div>
            </div>
          </Link>

          {/* LOGOUT */}
          <button
            onClick={handleLogout}
            className="
              mt-4 w-full flex items-center gap-3
              px-4 py-3 rounded-2xl
              bg-red-500/10 hover:bg-red-500/20
              transition-all
              text-red-500 font-medium text-sm
            "
          >
            <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center">
              <LogOut className="w-5 h-5" />
            </div>

            <span>
              Logout
            </span>
          </button>
        </div>
      </aside>
    </>
  )
}