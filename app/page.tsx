'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Navbar } from '@/components/Navbar'
import { CourseCard } from '@/components/CourseCard'
import { ProgressCard, StatCard, ExerciseCard } from '@/components/StatsCard'
import { Button } from '@/components/ui/button'
import { t } from '@/lib/i18n'
import { mockCourses, mockExercises, currentUser } from '@/lib/mockData'

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
            {/* Text Content */}
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

      {/* Why Us / Value Section */}
      <section className="py-20 px-4 md:px-6 bg-muted/30">
        <div className="max-w-6xl mx-auto space-y-12">

          {/* Title */}
          <div className="text-center space-y-2">
            <h2 className="text-3xl sm:text-4xl font-bold">
              Why choose Deutschly?
            </h2>
            <p className="text-muted-foreground">
              Everything you need to go from Hallo to fluency
            </p>
          </div>

          {/* TOP 3 CARDS */}
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-2xl shadow-sm border overflow-hidden text-center">
              <img
                src="/book-icon.jpg"
                className="w-full h-40 object-cover"
              />
              <div className="p-6 space-y-4">
                <h3 className="font-semibold text-lg">Interactive lessons</h3>
                <p className="text-sm text-muted-foreground">
                  Smart exercises adapted to your pace every day
                </p>
                <span className="text-xs bg-blue-100 text-blue-600 px-3 py-1 rounded-full">
                  No boredom
                </span>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border overflow-hidden text-center">
              <img
                src="/list.jpg"
                className="w-full h-40 object-cover"
              />
              <div className="p-6 space-y-4">
                <h3 className="font-semibold text-lg">Real-time progress</h3>
                <p className="text-sm text-muted-foreground">
                  Monitor streaks, correct answers and your level
                </p>
                <span className="text-xs bg-blue-100 text-blue-600 px-3 py-1 rounded-full">
                  Daily streaks 🔥
                </span>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border overflow-hidden text-center">
              <img
                src="/sound.jpg"
                className="w-full h-40 object-cover"
              />
              <div className="p-6 space-y-4">
                <h3 className="font-semibold text-lg">Listen & speak</h3>
                <p className="text-sm text-muted-foreground">
                  Audio lessons with real German conversations
                </p>
                <span className="text-xs bg-blue-100 text-blue-600 px-3 py-1 rounded-full">
                  Native audio
                </span>
              </div>
            </div>

          </div>

          {/* BOTTOM 2 CARDS */}
          <div className="grid md:grid-cols-2 gap-6">

            {/* Flashcards */}
            <div className="bg-white rounded-2xl overflow-hidden flex items-center">
              <img
                src="/cards.jpg"
                className="w-40 h-full object-cover"
              />
              <div className="p-6">
                <h3 className="font-semibold text-lg">Smart flashcards</h3>
                <p className="text-sm text-muted-foreground">
                  Spaced-repetition vocab so words actually stick
                </p>
                <span className="text-xs text-blue-600">
                  500+ word sets
                </span>
              </div>
            </div>

            {/* Grammar */}
            <div className="bg-white rounded-2xl overflow-hidden flex items-center">
              <img
                src="/book.jpg"
                className="w-40 h-full object-cover"
              />
              <div className="p-6">
                <h3 className="font-semibold text-lg">Clear grammar rules</h3>
                <p className="text-sm text-muted-foreground">
                  Visual breakdowns of German structure & cases
                </p>
                <span className="text-xs text-blue-600">
                  A1 → B2 levels
                </span>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* CTA Section */}
      <section className="relative overflow-hidden py-10 sm:py-12">
        <div className="absolute inset-0 bg-gray-100" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            
            {/* TEXT (LEFT) */}
            <div className="space-y-6 text-left">
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
                {t('readyToPractice', language)}
              </h2>

              <p className="text-lg text-muted-foreground">
                Challenge yourself with our interactive quizzes and exercises
              </p>

              <Link href="/dashboard/exercises">
                <Button className="bg-primary hover:bg-primary/90 text-white px-8 py-6 text-lg rounded-xl font-semibold">
                  {t('launchQuiz', language)} →
                </Button>
              </Link>
            </div>

            {/* IMAGE (RIGHT) */}
            <div className="flex justify-center md:justify-end">
              <img
                src="/pretsel.png"
                alt="Practice Illustration"
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
            <div>
              <h4 className="font-bold text-foreground mb-4">{t('courses', language)}</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="#" className="hover:text-foreground transition">Basics</Link></li>
                <li><Link href="#" className="hover:text-foreground transition">Advanced</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-foreground mb-4">{t('exercises', language)}</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="#" className="hover:text-foreground transition">Quiz</Link></li>
                <li><Link href="#" className="hover:text-foreground transition">Practice</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-foreground mb-4">Resources</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="#" className="hover:text-foreground transition">Blog</Link></li>
                <li><Link href="#" className="hover:text-foreground transition">Help</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-foreground mb-4">Community</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="#" className="hover:text-foreground transition">Forum</Link></li>
                <li><Link href="#" className="hover:text-foreground transition">Events</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2024 Deutschly. {t('tagline', language)}</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
