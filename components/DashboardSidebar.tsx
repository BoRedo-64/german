'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { t } from '@/lib/i18n'

type Language = 'en' | 'fr' | 'ar'

interface DashboardSidebarProps {
  language?: Language
}

export function DashboardSidebar({ language = 'en' }: DashboardSidebarProps) {
  const pathname = usePathname()
  const router = useRouter()

  const [name, setName] = useState<string>('Loading...')
  const [level, setLevel] = useState<string>('')

  const [open, setOpen] = useState(false) // 🔥 mobile toggle

  const menuItems = [
    { key: 'exercises', href: '/dashboard/exercises', icon: '📝' },
    { key: 'statistics', href: '/dashboard/statistics', icon: '📊' },
    { key: 'joinSession', href: '/dashboard/meetings', icon: '🎤' },
  ]

  const isActive = (href: string) => pathname === href

  useEffect(() => {
    const fetchProfile = async () => {
      const { data } = await supabase.auth.getUser()
      const user = data.user

      if (!user) return

      const { data: profile } = await supabase
        .from('profiles')
        .select('first_name, last_name, level')
        .eq('id', user.id)
        .single()

      if (profile) {
        setName(`${profile.first_name} ${profile.last_name}`)
        setLevel(profile.level || '')
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
      {/* 🔥 MOBILE TOP BAR */}
      <div className="md:hidden flex items-center justify-between p-4 border-b">
        <button onClick={() => setOpen(true)}>☰</button>
        <span className="font-semibold">Dashboard</span>
      </div>

      {/* 🔥 OVERLAY */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-40"
          onClick={() => setOpen(false)}
        />
      )}

      {/* SIDEBAR */}
      <aside
        className={`
          fixed md:static z-50 top-0 left-0 h-screen w-64 bg-card border-r border-border flex flex-col transition-transform
          ${open ? 'translate-x-0' : '-translate-x-full'}
          md:translate-x-0
        `}
      >
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 p-3 border-b hover:bg-secondary"
          onClick={() => setOpen(false)}
        >
          <img src="/german.png" className="h-12 mx-auto" />
        </Link>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg ${
                isActive(item.href)
                  ? 'bg-primary text-white'
                  : 'hover:bg-secondary'
              }`}
            >
              <span>{item.icon}</span>
              <span>{t(item.key as any, language)}</span>
            </Link>
          ))}
        </nav>

        {/* Profile */}
        <Link
          href="/dashboard/profile"
          onClick={() => setOpen(false)}
          className="p-4 border-t"
        >
          <div className="text-center">
            <p className="font-semibold">{name}</p>
            <p className="text-sm text-muted-foreground">
              Level {level}
            </p>
          </div>
        </Link>

        {/* Logout */}
        <div className="p-4 border-t">
          <button
            onClick={handleLogout}
            className="w-full bg-red-500 text-white py-2 rounded-lg"
          >
            Logout
          </button>
        </div>
      </aside>
    </>
  )
}