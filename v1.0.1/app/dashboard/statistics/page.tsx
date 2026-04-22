'use client'

import { useState } from 'react'
import { DashboardSidebar } from '@/components/DashboardSidebar'
import { StatCard, ProgressCard } from '@/components/StatsCard'
import { t } from '@/lib/i18n'
import { currentUser } from '@/lib/mockData'
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'

type Language = 'en' | 'fr' | 'ar'

const chartData = [
  { day: 'Mon', lessons: 4, correct: 8 },
  { day: 'Tue', lessons: 3, correct: 7 },
  { day: 'Wed', lessons: 5, correct: 12 },
  { day: 'Thu', lessons: 4, correct: 9 },
  { day: 'Fri', lessons: 6, correct: 15 },
  { day: 'Sat', lessons: 3, correct: 6 },
  { day: 'Sun', lessons: 2, correct: 5 },
]

export default function StatisticsPage() {
  const [language, setLanguage] = useState<Language>('en')

  return (
    <div className="flex h-screen bg-background">
      <DashboardSidebar language={language} />

      <main className="flex-1 overflow-y-auto">
        {/* Header */}
        <div className="bg-white border-b border-border sticky top-0 z-10">
          <div className="max-w-6xl mx-auto px-6 py-6 flex items-center justify-between">
            <h1 className="text-3xl font-bold text-foreground">
              {t('statistics', language)}
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

        <div className="max-w-6xl mx-auto px-6 py-8 space-y-8">
          {/* Progress Overview */}
          <ProgressCard
            level={currentUser.level}
            progress={65}
            streakDays={currentUser.streakDays}
          />

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <StatCard
              icon="🔥"
              title="Current Streak"
              value={`${currentUser.streakDays} days`}
              bgColor="bg-gradient-to-br from-orange-50 to-orange-100"
            />
            <StatCard
              icon="✅"
              title={t('correctAnswers', language)}
              value={currentUser.correctAnswers}
              bgColor="bg-gradient-to-br from-green-50 to-green-100"
            />
            <StatCard
              icon="📚"
              title="Lessons Done"
              value={currentUser.lessonsDone}
              bgColor="bg-gradient-to-br from-purple-50 to-purple-100"
            />
          </div>

          {/* Charts */}
          <div className="space-y-8">
            {/* Line Chart - Progress */}
            <div className="bg-card rounded-xl p-6 shadow-soft border border-border">
              <h3 className="text-lg font-bold text-foreground mb-4">
                Weekly Progress
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="day" stroke="#6b7280" />
                  <YAxis stroke="#6b7280" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#ffffff',
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px',
                    }}
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="lessons"
                    stroke="#3b82f6"
                    strokeWidth={2}
                    dot={{ fill: '#3b82f6' }}
                    name="Lessons"
                  />
                  <Line
                    type="monotone"
                    dataKey="correct"
                    stroke="#10b981"
                    strokeWidth={2}
                    dot={{ fill: '#10b981' }}
                    name="Correct Answers"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Bar Chart - Daily Activity */}
            <div className="bg-card rounded-xl p-6 shadow-soft border border-border">
              <h3 className="text-lg font-bold text-foreground mb-4">
                Daily Activity
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="day" stroke="#6b7280" />
                  <YAxis stroke="#6b7280" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#ffffff',
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px',
                    }}
                  />
                  <Legend />
                  <Bar
                    dataKey="lessons"
                    fill="#f59e0b"
                    radius={[8, 8, 0, 0]}
                    name="Lessons Completed"
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
