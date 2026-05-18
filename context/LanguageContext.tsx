'use client'

import {
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react'

export type Language =
  | 'en'
  | 'fr'
  | 'ar'

interface LanguageContextType {
  language: Language

  setLanguage: (
    lang: Language
  ) => void
}

const LanguageContext =
  createContext<
    LanguageContextType
  >({
    language: 'en',

    setLanguage: () => {},
  })

export function LanguageProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [language, setLanguageState] =
    useState<Language>('en')

  // 🔥 LOAD SAVED LANGUAGE
  useEffect(() => {
    const saved =
      localStorage.getItem(
        'language'
      ) as Language | null

    if (saved) {
      setLanguageState(saved)
    }
  }, [])

  // 🔥 CHANGE LANGUAGE
  const setLanguage = (
    lang: Language
  ) => {
    setLanguageState(lang)

    localStorage.setItem(
      'language',
      lang
    )
  }

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
      }}
    >
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  return useContext(
    LanguageContext
  )
}