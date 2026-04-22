'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import i18n from '@/lib/i18n/config';
import { useState, useEffect } from 'react';

export default function Home() {
  const { t } = useTranslation();
  const [currentLang, setCurrentLang] = useState(i18n.language);

  useEffect(() => {
    const handler = (lang: string) => setCurrentLang(lang);
    i18n.on('languageChanged', handler);
    return () => i18n.off('languageChanged', handler);
  }, []);

  const handleLanguageChange = (lang: string) => {
    i18n.changeLanguage(lang);
    localStorage.setItem('lang', lang);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">

      {/* Navbar */}
      <nav className="border-b border-border/40 bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 md:px-6 py-4 flex items-center justify-between">

          {/* Logo — will naturally go to the correct side via dir */}
          <img src="/german.png" alt="German Logo" className="h-15 w-auto" />

          {/* Actions */}
          <div className="flex items-center gap-4">
            <select
              value={currentLang}
              onChange={(e) => handleLanguageChange(e.target.value)}
              className="bg-transparent cursor-pointer text-foreground"
            >
              <option value="ar">🇸🇦 AR</option>
              <option value="en">🇬🇧 EN</option>
              <option value="fr">🇫🇷 FR</option>
            </select>

            <Link href="/login">
              <Button className="bg-accent text-accent-foreground hover:bg-accent/90">
                {t('login')}
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="flex-1 flex items-center justify-center px-4 md:px-6 py-20">
        <div className="max-w-3xl w-full text-center space-y-8">
          <h1 className="text-5xl md:text-7xl font-bold leading-tight">
            {t('hero_title')}
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed">
            {t('hero_description')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
            <Link href="/login">
              <Button size="lg" className="w-full sm:w-auto bg-accent text-accent-foreground hover:bg-accent/90 text-lg h-12">
                {t('start_learning')}
              </Button>
            </Link>
            <Button variant="outline" size="lg" className="w-full sm:w-auto text-lg h-12 border-accent/30 hover:bg-card">
              {t('learn_more')}
            </Button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-card/30 py-20 px-4 md:px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">{t('why_us')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: t('feature1_title'), description: t('feature1_desc') },
              { title: t('feature2_title'), description: t('feature2_desc') },
              { title: t('feature3_title'), description: t('feature3_desc') },
            ].map((feature, i) => (
              <div key={i} className="p-6 rounded-lg border border-border/40 bg-background/40 hover:bg-background/60 transition-colors">
                <h3 className="text-xl font-semibold mb-3 text-accent">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 md:px-6">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h2 className="text-4xl font-bold">{t('cta_title')}</h2>
          <p className="text-lg text-muted-foreground">{t('cta_description')}</p>
          <Link href="/login">
            <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 text-lg h-12">
              {t('start_now')}
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/40 bg-card/20 py-8 px-4 md:px-6 mt-auto">
        <div className="max-w-6xl mx-auto text-center text-muted-foreground text-sm">
          <p>{t('footer')}</p>
        </div>
      </footer>
    </div>
  );
}