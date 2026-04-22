'use client';

import { useEffect } from 'react';
import i18n from './config';
import { I18nextProvider } from 'react-i18next';

export default function I18nProvider({ children }: { children: React.ReactNode }) {

  const applyLang = (lang: string) => {
    const dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.dir = dir;
    document.documentElement.lang = lang;
  };

  useEffect(() => {
    // Apply saved language from localStorage on mount
    const savedLang = localStorage.getItem('lang') || 'ar';
    i18n.changeLanguage(savedLang);
    applyLang(savedLang);

    // Listen for future language changes
    i18n.on('languageChanged', applyLang);
    return () => {
      i18n.off('languageChanged', applyLang);
    };
  }, []);

  return (
    <I18nextProvider i18n={i18n}>
      {children}
    </I18nextProvider>
  );
}