'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { t } from '@/lib/i18n'

// 👉 ADD THIS
import { FileText, BarChart3, Video, User, LogOut } from 'lucide-react'

type Language = 'en' | 'fr' | 'ar'

interface DashboardSidebarProps {
  language?: Language
  open: boolean
  setOpen: (value: boolean) => void
}

export function DashboardSidebar({
  language = 'en',
  open,
  setOpen,
}: DashboardSidebarProps) {
  const pathname = usePathname()
  const router = useRouter()

  const [name, setName] = useState<string>('Loading...')
  const [level, setLevel] = useState<string>('')

  // 👉 replace emoji with icon components
  const menuItems = [
    { key: 'exercises', href: '/dashboard/exercises', icon: FileText },
    { key: 'statistics', href: '/dashboard/statistics', icon: BarChart3 },
    { key: 'joinSession', href: '/dashboard/meetings', icon: Video },
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
      {/* OVERLAY */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* SIDEBAR */}
      <aside
        className={`
          fixed md:static top-0 left-0 z-50 h-dvh w-64 bg-card border-r border-border flex flex-col transition-transform
          ${open ? 'translate-x-0' : '-translate-x-full'}
          md:translate-x-0
        `}
      >
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 p-3 border-b border-border hover:bg-secondary transition-colors"
        >
          <img src="/german.png" alt="German Logo" className="h-15 w-auto ml-12" />
        </Link>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-4 space-y-2">
          <h3 className="text-xs font-bold text-muted-foreground uppercase px-4 py-2">
            Learning
          </h3>

          {menuItems.map((item) => {
            const Icon = item.icon
            const active = isActive(item.href)

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                  active
                    ? 'bg-primary text-white shadow-md'
                    : 'text-foreground hover:bg-secondary'
                }`}
              >
                {/* ICON */}
                <Icon
                  className={`w-5 h-5 ${
                    active ? 'text-white' : 'text-muted-foreground'
                  }`}
                />

                {/* TEXT */}
                <span className="font-medium text-sm">
                  {t(item.key as any, language)}
                </span>
              </Link>
            )
          })}
        </nav>

        {/* Profile */}
        <Link href="/dashboard/profile" className="p-4 border-t border-border block">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4 flex items-center gap-3 hover:opacity-90 transition">
            
            {/* ICON */}
            <div className="p-2 rounded-lg">
              <User className="w-6 h-6 text-blue-600" />
            </div>

            {/* TEXT */}
            <div className="flex flex-col">
              <p className="text-sm font-semibold text-foreground">
                {name}
              </p>

              {level && (
                <p className="text-xs text-muted-foreground">
                  Level {level}
                </p>
              )}
            </div>

          </div>
        </Link>

        {/* Logout */}
        <div className="p-4 border-t border-border">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-start gap-2 px-4 py-3 rounded-lg bg-red-500/10 text-red-500 hover:bg-red-500/20 transition font-medium text-sm"
          >
            <div className="p-2 rounded-lg">
              <LogOut className="w-5 h-5 text-red-500" />
            </div>
            {t('Logout', language) || 'Logout'}
          </button>
        </div>
      </aside>
    </>
  )
}