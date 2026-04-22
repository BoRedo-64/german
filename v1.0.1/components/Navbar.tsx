'use client'

import Link from 'next/link'
import { useState } from 'react'
import { t } from '@/lib/i18n'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

type Language = 'en' | 'fr' | 'ar'

interface NavbarProps {
  language?: Language
  onLanguageChange?: (lang: Language) => void
}

export function Navbar({ language = 'en', onLanguageChange }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false)

  const navItems = [
    { key: 'courses', href: '/courses' },
    { key: 'exercises', href: '/exercises' },
    { key: 'videos', href: '/videos' },
    { key: 'profile', href: '/profile' },
  ]

  const languages: { code: Language; name: string; flag: string }[] = [
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'ar', name: 'العربية', flag: '🇸🇦' },
  ]

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-base border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent group-hover:scale-110 transition-transform">
              📚
            </div>
            <span className="font-bold text-lg hidden sm:inline text-foreground">
              {t('appName', language)}
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="px-4 py-2 rounded-lg text-foreground hover:bg-secondary transition-colors text-sm font-medium"
              >
                {t(item.key as any, language)}
              </Link>
            ))}
          </div>

          {/* Right section: Language selector and Login */}
          <div className="flex items-center gap-3">
            {/* Language Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="gap-2">
                  <span>{languages.find((l) => l.code === language)?.flag}</span>
                  <span className="hidden sm:inline">
                    {languages.find((l) => l.code === language)?.name}
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {languages.map((lang) => (
                  <DropdownMenuItem
                    key={lang.code}
                    onClick={() => onLanguageChange?.(lang.code)}
                    className="cursor-pointer"
                  >
                    <span className="mr-2">{lang.flag}</span>
                    {lang.name}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Login Button */}
            <Link href="/login">
              <Button className="bg-primary hover:bg-primary/90 text-white hidden sm:inline-flex">
                {t('login', language)}
              </Button>
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-secondary transition-colors"
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
                  d={isOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-4 space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block px-4 py-2 rounded-lg text-foreground hover:bg-secondary transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {t(item.key as any, language)}
              </Link>
            ))}
            <div className="pt-2">
              <Link href="/login" className="block">
                <Button className="w-full bg-primary hover:bg-primary/90 text-white">
                  {t('login', language)}
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
