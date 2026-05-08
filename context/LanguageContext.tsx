'use client'

import { createContext, useContext, useEffect, useState } from 'react'

type Language = 'en' | 'fr' | 'ar'

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('en')

  // 🔥 load from localStorage
  useEffect(() => {
    const stored = localStorage.getItem('lang') as Language
    if (stored) setLanguage(stored)
  }, [])

  // 🔥 save to localStorage
  useEffect(() => {
    localStorage.setItem('lang', language)
  }, [language])

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  )
}

// 🔥 hook
export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used inside LanguageProvider')
  }
  return context
}