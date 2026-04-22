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
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-transparent to-yellow-50" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Text Content */}
            <div className="space-y-6">
              <h1 className="text-4xl sm:text-5xl font-bold text-foreground leading-tight">
                {t('hero.title', language)}
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {t('hero.subtitle', language)}
              </p>
              <Link href="/dashboard">
                <Button className="bg-accent hover:bg-accent/90 text-accent-foreground px-8 py-6 text-lg rounded-xl font-semibold">
                  {t('hero.cta', language)} →
                </Button>
              </Link>
            </div>

            {/* Illustration Placeholder */}
            <div className="hidden md:flex items-center justify-center">
              <div className="relative w-full aspect-square max-w-sm">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-blue-500 rounded-3xl opacity-20 blur-3xl" />
                <div className="relative bg-gradient-to-br from-blue-100 to-yellow-100 rounded-3xl p-12 flex items-center justify-center text-8xl">
                  😊
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Dashboard Preview Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="space-y-8">
          {/* Progress Section */}
          <div>
            <h2 className="text-3xl font-bold mb-6 text-foreground">
              {t('myDashboard', language)}
            </h2>
            <ProgressCard
              level={currentUser.level}
              progress={65}
              streakDays={currentUser.streakDays}
            />
          </div>

          {/* Popular Courses */}
          <div>
            <h2 className="text-3xl font-bold mb-6 text-foreground">
              {t('popularCourses', language)}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockCourses.slice(0, 3).map((course) => (
                <CourseCard
                  key={course.id}
                  id={course.id}
                  title={course.title}
                  icon={course.icon}
                  level={course.level}
                  lessonsCount={course.lessonsCount}
                  progress={course.progress}
                  color={course.color}
                />
              ))}
            </div>
          </div>

          {/* Daily Exercises */}
          <div>
            <h2 className="text-3xl font-bold mb-6 text-foreground">
              {t('dailyExercises', language)}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {mockExercises.slice(0, 2).map((exercise) => (
                <ExerciseCard
                  key={exercise.id}
                  title={exercise.title}
                  icon={exercise.icon}
                  level={exercise.level}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative overflow-hidden py-16 sm:py-24">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-6">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
              {t('readyToPractice', language)}
            </h2>
            <p className="text-lg text-muted-foreground">
              Challenge yourself with our interactive quizzes and exercises
            </p>
            <Link href="/exercises">
              <Button className="bg-primary hover:bg-primary/90 text-white px-8 py-6 text-lg rounded-xl font-semibold">
                {t('launchQuiz', language)} →
              </Button>
            </Link>
          </div>

          {/* Decorative Elements */}
          <div className="absolute top-10 left-10 text-6xl opacity-50">📖</div>
          <div className="absolute bottom-10 right-10 text-6xl opacity-50">✨</div>
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
