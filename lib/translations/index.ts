import en from './en'
import fr from './fr'
import ar from './ar'

export type Language =
  | 'en'
  | 'fr'
  | 'ar'

const translations = {
  en,
  fr,
  ar,
}

export function t(
  key: string,
  language: Language = 'en'
) {
  return (
    translations[language]?.[
      key as keyof typeof en
    ] || key
  )
}