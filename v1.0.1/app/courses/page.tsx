'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Navbar } from '@/components/Navbar'
import { CourseCard } from '@/components/CourseCard'
import { Button } from '@/components/ui/button'
import { t } from '@/lib/i18n'
import { mockCourses } from '@/lib/mockData'

type Language = 'en' | 'fr' | 'ar'

export default function CoursesPage() {
  const [language, setLanguage] = useState<Language>('en')

  return (
    <div className="min-h-screen bg-background">
      <Navbar language={language} onLanguageChange={setLanguage} />

      {/* Header */}
      <section className="bg-gradient-to-r from-blue-50 to-blue-100 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            {t('courses', language)}
          </h1>
          <p className="text-lg text-muted-foreground">
            Choose from our comprehensive German learning courses
          </p>
        </div>
      </section>

      {/* Courses Grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockCourses.map((course) => (
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
      </main>

      {/* CTA Section */}
      <section className="py-16 bg-card border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Ready to start learning?
          </h2>
          <Link href="/dashboard/exercises">
            <Button className="bg-primary hover:bg-primary/90 text-white px-8 py-6 text-lg rounded-xl">
              Go to Dashboard →
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}
