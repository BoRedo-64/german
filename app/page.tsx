'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Navbar } from '@/components/Navbar'
import { Button } from '@/components/ui/button'
import { t } from '@/lib/i18n'

type Language = 'en' | 'fr' | 'ar'

export default function Home() {
  const [language, setLanguage] = useState<Language>('en')
  const isRTL = language === 'ar'

  return (
    <div dir={isRTL ? 'rtl' : 'ltr'} className="min-h-screen bg-background">
      <Navbar language={language} onLanguageChange={setLanguage} />

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-[center_left] md:bg-center"
          style={{
            backgroundImage: `url(${language === "ar" ? "/hero-inv.jpg" : "/hero.jpg"})`,
          }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-1 py-16 sm:py-24">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl sm:text-5xl font-bold text-white leading-tight">
                {t('hero.title', language)}
              </h1>
              <p className="text-lg text-white leading-relaxed">
                {t('hero.subtitle', language)}
              </p>
              <Link href="/dashboard">
                <Button className="bg-accent hover:bg-accent/90 text-accent-foreground px-8 py-6 text-lg rounded-xl font-semibold">
                  {t('hero.cta', language)} →
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Why Section */}
      <section className="py-20 px-4 md:px-6 bg-muted/30">
        <div className="max-w-6xl mx-auto space-y-12">

          {/* Title */}
          <div className="text-center space-y-2">
            <h2 className="text-3xl sm:text-4xl font-bold">
              {t('why.title', language)}
            </h2>
            <p className="text-muted-foreground">
              {t('why.subtitle', language)}
            </p>
          </div>

          {/* TOP 3 */}
          <div className="grid md:grid-cols-3 gap-6">
            <Card
              img="/book-icon.jpg"
              title={t('why.card1.title', language)}
              desc={t('why.card1.desc', language)}
              tag={t('why.card1.tag', language)}
            />
            <Card
              img="/list.jpg"
              title={t('why.card2.title', language)}
              desc={t('why.card2.desc', language)}
              tag={t('why.card2.tag', language)}
            />
            <Card
              img="/sound.jpg"
              title={t('why.card3.title', language)}
              desc={t('why.card3.desc', language)}
              tag={t('why.card3.tag', language)}
            />
          </div>

          {/* BOTTOM */}
          <div className="grid md:grid-cols-2 gap-6">
            <WideCard
              img="/cards.jpg"
              title={t('why.flashcards.title', language)}
              desc={t('why.flashcards.desc', language)}
              tag={t('why.flashcards.tag', language)}
            />
            <WideCard
              img="/book.jpg"
              title={t('why.grammar.title', language)}
              desc={t('why.grammar.desc', language)}
              tag={t('why.grammar.tag', language)}
            />
          </div>

        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden py-10 sm:py-12">
        <div className="absolute inset-0 bg-gray-100" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8 items-center">

            <div className="space-y-6 text-left">
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
                {t('cta.title', language)}
              </h2>

              <p className="text-lg text-muted-foreground">
                {t('cta.desc', language)}
              </p>

              <Link href="/dashboard/exercises">
                <Button className="bg-primary hover:bg-primary/90 text-white px-8 py-6 text-lg rounded-xl font-semibold">
                  {t('cta.button', language)} →
                </Button>
              </Link>
            </div>

            <div className="flex justify-center md:justify-end">
              <img
                src="/pretsel.png"
                alt="practice"
                className="w-full max-w-md"
              />
            </div>

          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 mb-8">

            <FooterCol
              title={t('footer.courses', language)}
              links={[
                t('footer.basics', language),
                t('footer.advanced', language),
              ]}
            />

            <FooterCol
              title={t('footer.exercises', language)}
              links={[
                t('footer.quiz', language),
                t('footer.practice', language),
              ]}
            />

            <FooterCol
              title={t('footer.resources', language)}
              links={[
                t('footer.blog', language),
                t('footer.help', language),
              ]}
            />

            <FooterCol
              title={t('footer.community', language)}
              links={[
                t('footer.forum', language),
                t('footer.events', language),
              ]}
            />

          </div>

          <div className="border-t border-border pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2026 Deutschly. {t('footer.tagline', language)}</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

/* COMPONENTS */

function Card({ img, title, desc, tag }: any) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border overflow-hidden text-center">
      <img src={img} className="w-full h-40 object-cover" />
      <div className="p-6 space-y-4">
        <h3 className="font-semibold text-lg">{title}</h3>
        <p className="text-sm text-muted-foreground">{desc}</p>
        <span className="text-xs bg-blue-100 text-blue-600 px-3 py-1 rounded-full">
          {tag}
        </span>
      </div>
    </div>
  )
}

function WideCard({ img, title, desc, tag }: any) {
  return (
    <div className="bg-white rounded-2xl overflow-hidden flex items-center">
      <img src={img} className="w-40 h-full object-cover" />
      <div className="p-6">
        <h3 className="font-semibold text-lg">{title}</h3>
        <p className="text-sm text-muted-foreground">{desc}</p>
        <span className="text-xs text-blue-600">{tag}</span>
      </div>
    </div>
  )
}

function FooterCol({ title, links }: any) {
  return (
    <div>
      <h4 className="font-bold text-foreground mb-4">{title}</h4>
      <ul className="space-y-2 text-sm text-muted-foreground">
        {links.map((l: string, i: number) => (
          <li key={i}>
            <Link href="#" className="hover:text-foreground transition">
              {l}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}