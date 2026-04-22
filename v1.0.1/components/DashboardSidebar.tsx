'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { t } from '@/lib/i18n'

type Language = 'en' | 'fr' | 'ar'

interface DashboardSidebarProps {
  language?: Language
}

export function DashboardSidebar({ language = 'en' }: DashboardSidebarProps) {
  const pathname = usePathname()

  const menuItems = [
    {
      key: 'exercises',
      href: '/dashboard/exercises',
      icon: '📝',
    },
    {
      key: 'statistics',
      href: '/dashboard/statistics',
      icon: '📊',
    },
    {
      key: 'joinSession',
      href: '/dashboard/meetings',
      icon: '🎤',
    },
  ]

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

  return (
    <aside className="w-64 bg-card border-r border-border flex flex-col sticky top-0 h-screen">
      {/* Logo */}
      <Link href="/" className="flex items-center gap-2 p-6 border-b border-border hover:bg-secondary transition-colors">
        <div className="text-2xl">📚</div>
        <span className="font-bold text-lg text-foreground">{t('appName', language)}</span>
      </Link>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-4 space-y-2">
        <h3 className="text-xs font-bold text-muted-foreground uppercase px-4 py-2">
          Learning
        </h3>

        {menuItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
              isActive(item.href)
                ? 'bg-primary text-white shadow-md'
                : 'text-foreground hover:bg-secondary'
            }`}
          >
            <span className="text-xl">{item.icon}</span>
            <span className="font-medium text-sm">{t(item.key as any, language)}</span>
          </Link>
        ))}

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
            <span className="font-medium text-sm">{t(item.key as any, language)}</span>
          </Link>
        ))}
      </nav>

      {/* User Profile */}
      <div className="p-4 border-t border-border">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4 text-center">
          <div className="text-3xl mb-2">👤</div>
          <p className="text-sm font-semibold text-foreground">Sarah Johnson</p>
          <p className="text-xs text-muted-foreground">Level B1</p>
        </div>
      </div>
    </aside>
  )
}
