'use client'

import { useState } from 'react'
import { DashboardSidebar } from '@/components/DashboardSidebar'
import { CourseCard } from '@/components/CourseCard'
import { Button } from '@/components/ui/button'
import { t } from '@/lib/i18n'
import { mockCourses, mockLevels } from '@/lib/mockData'

type Language = 'en' | 'fr' | 'ar'

export default function ExercisesPage() {
  const [language, setLanguage] = useState<Language>('en')
  const [selectedLevel, setSelectedLevel] = useState<string>('A1')

  const filteredCourses = mockCourses.filter((course) =>
    course.level.includes(selectedLevel)
  )

  return (
    <div className="flex h-screen bg-background">
      <DashboardSidebar language={language} />

      <main className="flex-1 overflow-y-auto">
        {/* Header */}
        <div className="bg-white border-b border-border sticky top-0 z-10">
          <div className="max-w-6xl mx-auto px-6 py-6 flex items-center justify-between">
            <h1 className="text-3xl font-bold text-foreground">
              {t('exercises', language)}
            </h1>
            <div className="text-right">
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value as Language)}
                className="px-3 py-2 rounded-lg border border-border bg-background text-foreground"
              >
                <option value="en">English</option>
                <option value="fr">Français</option>
                <option value="ar">العربية</option>
              </select>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-6 py-8">
          {/* Level Filter */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-foreground mb-4">
              {t('levels', language)}
            </h2>
            <div className="flex flex-wrap gap-3">
              {mockLevels.map((level) => (
                <button
                  key={level.code}
                  onClick={() => setSelectedLevel(level.code)}
                  className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                    selectedLevel === level.code
                      ? 'bg-primary text-white shadow-md'
                      : 'bg-card text-foreground border border-border hover:border-primary'
                  }`}
                >
                  {level.code}
                </button>
              ))}
            </div>
          </div>

          {/* Courses Grid */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-foreground">
              {t('courses', language)} - {selectedLevel}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCourses.map((course) => (
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
        </div>
      </main>
    </div>
  )
}
