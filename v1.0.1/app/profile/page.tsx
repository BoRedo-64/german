'use client'

import { useState } from 'react'
import { Navbar } from '@/components/Navbar'
import { Button } from '@/components/ui/button'
import { StatCard } from '@/components/StatsCard'
import { currentUser } from '@/lib/mockData'

type Language = 'en' | 'fr' | 'ar'

export default function ProfilePage() {
  const [language, setLanguage] = useState<Language>('en')

  return (
    <div className="min-h-screen bg-background">
      <Navbar language={language} onLanguageChange={setLanguage} />

      {/* Profile Header */}
      <section className="bg-gradient-to-r from-purple-50 to-purple-100 border-b border-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-center gap-6">
            <div className="text-8xl">👤</div>
            <div>
              <h1 className="text-4xl font-bold text-foreground mb-2">
                {currentUser.name}
              </h1>
              <p className="text-lg text-muted-foreground">
                Level {currentUser.level}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Profile Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="space-y-8">
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StatCard
              icon="🔥"
              title="Streak"
              value={`${currentUser.streakDays} days`}
              bgColor="bg-gradient-to-br from-orange-50 to-orange-100"
            />
            <StatCard
              icon="✅"
              title="Correct Answers"
              value={currentUser.correctAnswers}
              bgColor="bg-gradient-to-br from-green-50 to-green-100"
            />
            <StatCard
              icon="📚"
              title="Lessons Done"
              value={currentUser.lessonsDone}
              bgColor="bg-gradient-to-br from-blue-50 to-blue-100"
            />
          </div>

          {/* Profile Info */}
          <div className="bg-card rounded-xl p-8 border border-border">
            <h2 className="text-2xl font-bold text-foreground mb-6">
              Account Information
            </h2>
            <div className="space-y-4">
              <div>
                <label className="text-sm text-muted-foreground">Email</label>
                <p className="text-lg text-foreground">sarah@example.com</p>
              </div>
              <div>
                <label className="text-sm text-muted-foreground">Member Since</label>
                <p className="text-lg text-foreground">January 15, 2024</p>
              </div>
              <div>
                <label className="text-sm text-muted-foreground">Current Level</label>
                <p className="text-lg text-foreground">B1 - Intermediate</p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-4">
            <Button className="bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded-lg">
              Edit Profile
            </Button>
            <Button variant="outline" className="px-8 py-3 rounded-lg">
              Change Password
            </Button>
            <Button variant="outline" className="px-8 py-3 rounded-lg text-destructive">
              Logout
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
}
