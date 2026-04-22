'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Navbar } from '@/components/Navbar'
import { ExerciseCard } from '@/components/StatsCard'
import { Button } from '@/components/ui/button'
import { t } from '@/lib/i18n'
import { mockExercises, mockLevels } from '@/lib/mockData'

type Language = 'en' | 'fr' | 'ar'

export default function ExercisesPage() {
  const [language, setLanguage] = useState<Language>('en')

  return (
    <div className="min-h-screen bg-background">
      <Navbar language={language} onLanguageChange={setLanguage} />

      {/* Header */}
      <section className="bg-gradient-to-r from-yellow-50 to-yellow-100 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            {t('exercises', language)}
          </h1>
          <p className="text-lg text-muted-foreground">
            Practice your German skills with interactive exercises
          </p>
        </div>
      </section>

      {/* Levels */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="space-y-12">
          {mockLevels.map((level) => (
            <div key={level.code}>
              <h2 className="text-2xl font-bold text-foreground mb-4">
                {level.code} - {level.title}
              </h2>
              <p className="text-muted-foreground mb-6">{level.description}</p>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {mockExercises.map((exercise) => (
                  <ExerciseCard
                    key={exercise.id}
                    title={exercise.title}
                    icon={exercise.icon}
                    level={exercise.level}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* CTA */}
      <section className="py-16 bg-card border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Track your progress
          </h2>
          <Link href="/dashboard/statistics">
            <Button className="bg-primary hover:bg-primary/90 text-white px-8 py-6 text-lg rounded-xl">
              View Statistics →
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}
