'use client'

import { useState } from 'react'
import { Navbar } from '@/components/Navbar'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

type Language = 'en' | 'fr' | 'ar'

export default function VideosPage() {
  const [language, setLanguage] = useState<Language>('en')

  const videos = [
    { id: 1, title: 'German Pronunciation Guide', level: 'A1', duration: '12:45' },
    { id: 2, title: 'Common German Phrases', level: 'A1', duration: '15:30' },
    { id: 3, title: 'Grammar Basics', level: 'A2', duration: '18:00' },
    { id: 4, title: 'Conversation Tips', level: 'B1', duration: '20:15' },
    { id: 5, title: 'German Culture & Traditions', level: 'B2', duration: '25:00' },
    { id: 6, title: 'Advanced Listening', level: 'C1', duration: '22:30' },
  ]

  return (
    <div className="min-h-screen bg-background">
      <Navbar language={language} onLanguageChange={setLanguage} />

      {/* Header */}
      <section className="bg-gradient-to-r from-green-50 to-green-100 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            📹 Learning Videos
          </h1>
          <p className="text-lg text-muted-foreground">
            Watch and learn from our curated video library
          </p>
        </div>
      </section>

      {/* Videos Grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.map((video) => (
            <div
              key={video.id}
              className="bg-card rounded-xl overflow-hidden border border-border hover:shadow-md hover:scale-105 transition-all cursor-pointer"
            >
              <div className="bg-gradient-to-br from-green-200 to-green-400 h-40 flex items-center justify-center text-5xl">
                ▶️
              </div>
              <div className="p-4">
                <h3 className="font-bold text-foreground mb-2">{video.title}</h3>
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>{video.level}</span>
                  <span>{video.duration}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* CTA */}
      <section className="py-16 bg-card border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Ready to learn?
          </h2>
          <Link href="/dashboard">
            <Button className="bg-primary hover:bg-primary/90 text-white px-8 py-6 text-lg rounded-xl">
              Go to Dashboard →
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}
