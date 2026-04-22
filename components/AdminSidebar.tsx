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

export function AdminSidebar({ language = 'en' }: DashboardSidebarProps) {
  const pathname = usePathname()
  const router = useRouter()

  const [name, setName] = useState<string>('Loading...')

  const adminItems = [
    {
      key: 'addExercise',
      href: '/admin/exercises',
      icon: '➕',
    },
    {
      key: 'addMeeting',
      href: '/admin/meetings',
      icon: '📅',
    },
  ]

  const isActive = (href: string) => pathname === href

  // 🔥 FETCH ADMIN NAME
  useEffect(() => {
    const fetchProfile = async () => {
      const { data } = await supabase.auth.getUser()
      const user = data.user

      if (!user) return

      const { data: profile } = await supabase
        .from('profiles')
        .select('first_name, last_name')
        .eq('id', user.id)
        .single()

      if (profile) {
        setName(`${profile.first_name} ${profile.last_name}`)
      }
    }

    fetchProfile()
  }, [])

  // 🔐 LOGOUT
  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.replace('/login')
  }

  return (
    <aside className="w-64 bg-card border-r border-border flex flex-col sticky top-0 h-screen">

      {/* Logo */}
      <Link href="/" className="flex items-center gap-2 p-3 border-b border-border hover:bg-secondary transition-colors">
        <img src="/german.png" alt="German Logo" className="h-15 w-auto ml-12" />
      </Link>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-4 space-y-2">

        <h3 className="text-xs font-bold text-muted-foreground uppercase px-4 py-2 mt-6">
          Admin
        </h3>

        {adminItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
              isActive(item.href)
                ? 'bg-accent text-accent-foreground shadow-md'
                : 'text-foreground hover:bg-secondary'
            }`}
          >
            <span className="text-xl">{item.icon}</span>
            <span className="font-medium text-sm">
              {t(item.key as any, language)}
            </span>
          </Link>
        ))}
      </nav>

      {/* 👤 Admin Profile */}
      <Link href="/dashboard/profile" className="p-4 border-t border-border block">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4 text-center hover:opacity-90 transition">
          <div className="text-3xl mb-2">👤</div>

          <p className="text-sm font-semibold text-foreground">
            {name}
          </p>

          <p className="text-xs text-muted-foreground">
            Admin
          </p>
        </div>
      </Link>

      {/* 🔴 LOGOUT BUTTON */}
      <div className="p-4 border-t border-border">
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-red-500/10 text-red-500 hover:bg-red-500/20 transition font-medium text-sm"
        >
          {t('Logout', language) || 'Logout'}
        </button>
      </div>

    </aside>
  )
}