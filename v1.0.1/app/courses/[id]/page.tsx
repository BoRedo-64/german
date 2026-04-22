'use client'

import Link from 'next/link'
import { Navbar } from '@/components/Navbar'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { mockCourses } from '@/lib/mockData'

export default function CourseDetailPage({
  params,
}: {
  params: { id: string }
}) {
  const course = mockCourses.find((c) => c.id === params.id) || mockCourses[0]

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Header */}
      <section className={`${course.color} border-b border-border`}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-start gap-6 mb-8">
            <div className="text-6xl">{course.icon}</div>
            <div className="flex-1">
              <div className="inline-block px-4 py-1 bg-white/70 rounded-full text-sm font-semibold text-primary mb-4">
                {course.level}
              </div>
              <h1 className="text-4xl font-bold text-foreground mb-2">
                {course.title}
              </h1>
              <p className="text-lg text-foreground/80">
                {course.lessonsCount} lessons • {course.description}
              </p>
            </div>
          </div>

          {/* Progress */}
          <div className="max-w-md">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-semibold">Your Progress</span>
              <span className="text-sm font-bold text-primary">{course.progress}%</span>
            </div>
            <Progress value={course.progress} className="h-3" />
          </div>
        </div>
      </section>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="md:col-span-2 space-y-8">
            {/* Overview */}
            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">
                Course Overview
              </h2>
              <p className="text-foreground/80 leading-relaxed mb-4">
                {course.description}
              </p>
              <p className="text-foreground/80 leading-relaxed">
                This comprehensive course covers all the essential skills you need to master at the {course.level} level. Through interactive lessons, quizzes, and real-world practice scenarios, you'll build confidence in reading, writing, listening, and speaking German.
              </p>
            </section>

            {/* Lessons */}
            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">
                Lessons
              </h2>
              <div className="space-y-3">
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-4 p-4 bg-card rounded-lg border border-border hover:shadow-md transition-all cursor-pointer"
                  >
                    <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm">
                      {i + 1}
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-foreground">
                        Lesson {i + 1}: {['Introduction', 'Grammar Basics', 'Vocabulary', 'Dialogue Practice', 'Quiz Review', 'Final Assessment'][i]}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {[20, 25, 30, 25, 20, 40][i]} minutes
                      </p>
                    </div>
                    <div className="text-2xl">▶️</div>
                  </div>
                ))}
              </div>
            </section>

            {/* Skills You'll Learn */}
            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">
                Skills You'll Learn
              </h2>
              <div className="grid grid-cols-2 gap-4">
                {[
                  '📝 Writing',
                  '🗣️ Speaking',
                  '👂 Listening',
                  '📖 Reading',
                  '💬 Conversation',
                  '📚 Grammar',
                ].map((skill) => (
                  <div key={skill} className="flex items-center gap-2 p-3 bg-secondary rounded-lg">
                    <span>{skill.split(' ')[0]}</span>
                    <span className="text-foreground font-medium">{skill.split(' ')[1]}</span>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* CTA Card */}
            <div className="bg-gradient-to-br from-blue-100 to-blue-50 rounded-xl p-6 border border-border sticky top-24">
              <p className="text-sm text-muted-foreground mb-2">Course Level</p>
              <p className="text-3xl font-bold text-primary mb-6">{course.level}</p>

              <Button className="w-full bg-primary hover:bg-primary/90 text-white py-6 rounded-lg font-semibold mb-3">
                Continue Learning →
              </Button>

              <p className="text-xs text-center text-muted-foreground">
                You&apos;ve completed {course.progress}% of this course
              </p>
            </div>

            {/* Course Stats */}
            <div className="bg-card rounded-xl p-6 border border-border space-y-4">
              <h3 className="font-bold text-foreground">Course Stats</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Total Lessons</span>
                  <span className="font-semibold text-foreground">{course.lessonsCount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Duration</span>
                  <span className="font-semibold text-foreground">{Math.round(course.lessonsCount * 25 / 60)} hours</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Difficulty</span>
                  <span className="font-semibold text-foreground">{course.level}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer CTA */}
      <section className="py-12 bg-card border-t border-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Link href="/dashboard/exercises">
            <Button className="bg-primary hover:bg-primary/90 text-white px-8 py-6 text-lg rounded-xl font-semibold">
              Start This Course →
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}
