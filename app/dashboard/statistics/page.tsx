'use client'

import { useEffect, useState } from 'react'
import { DashboardSidebar } from '@/components/DashboardSidebar'
import { StatCard, ProgressCard } from '@/components/StatsCard'
import { supabase } from '@/lib/supabaseClient'
import { t } from '@/lib/i18n'
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

export default function StatisticsPage() {
  const [language, setLanguage] = useState<Language>('en')

  const [loading, setLoading] = useState(true)
  const [progress, setProgress] = useState<any>(null)
  const [chartData, setChartData] = useState<any[]>([])
  const [streak, setStreak] = useState(0)
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const fetchStats = async () => {
      const { data: userData } = await supabase.auth.getUser()
      const user = userData.user
      if (!user) return

      // 🔥 GET GLOBAL STATS
      const { data: progressData } = await supabase
        .from('user_progress')
        .select('*')
        .eq('user_id', user.id)
        .single()

      setProgress(progressData)

      // 🔥 GET ALL ACTIVITY (needed for streak)
      const { data: activity } = await supabase
        .from('user_activity')
        .select('*')
        .eq('user_id', user.id)
        .order('date', { ascending: false })

      // 🧠 CALCULATE STREAK
      let currentStreak = 0
      if (activity && activity.length > 0) {
        const today = new Date()
        today.setHours(0, 0, 0, 0)

        for (let i = 0; i < activity.length; i++) {
          const activityDate = new Date(activity[i].date)
          activityDate.setHours(0, 0, 0, 0)

          const expectedDate = new Date(today)
          expectedDate.setDate(today.getDate() - i)

          if (activityDate.getTime() === expectedDate.getTime()) {
            currentStreak++
          } else {
            break
          }
        }
      }

      setStreak(currentStreak)

      // 🔥 LAST 7 DAYS FOR CHART
      const last7 = activity?.slice(0, 7).reverse() || []

      const formatted = last7.map((day: any) => ({
        day: new Date(day.date).toLocaleDateString('en', {
          weekday: 'short',
        }),
        correct: day.correct_answers,
        lessons: day.correct_answers + day.wrong_answers,
      }))

      setChartData(formatted)

      setLoading(false)
    }

    fetchStats()
  }, [])

  if (loading) {
    return <div className="p-10">Loading...</div>
  }

  const totalCorrect = progress?.total_correct || 0
  const totalWrong = progress?.total_wrong || 0
  const total = totalCorrect + totalWrong

  const progressPercent =
    total > 0 ? Math.round((totalCorrect / total) * 100) : 0

  return (
    <div className="flex h-screen bg-background">
      <DashboardSidebar language={language} open={sidebarOpen} setOpen={setSidebarOpen}/>

      <main className="flex-1 overflow-y-auto">
        {/* Header */}
        <div className="bg-white border-b border-border sticky top-0 z-10">
          <div className="max-w-6xl mx-auto px-6 py-6 flex items-center justify-between">

            {/* LEFT SIDE (button + title) */}
            <div className="flex items-center gap-4">
              
              {/* 🔥 MOBILE SIDEBAR BUTTON */}
              <button
                onClick={() => setSidebarOpen(true)}
                className="md:hidden text-2xl"
              >
                ☰
              </button>

              <h1 className="text-3xl font-bold text-foreground">
                {t('statistics', language)}
              </h1>
            </div>

            {/* RIGHT SIDE */}
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value as Language)}
              className="px-3 py-2 rounded-lg border border-border bg-background"
            >
              <option value="en">English</option>
              <option value="fr">Français</option>
              <option value="ar">العربية</option>
            </select>

          </div>
        </div>

        <div className="max-w-6xl mx-auto px-6 py-8 space-y-8">

          {/* 🔥 Progress */}
          <ProgressCard
            level="A1"
            progress={progressPercent}
            streakDays={streak}
          />

          {/* 🔥 Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">

            <StatCard
              icon="✅"
              title={t('correctAnswers', language)}
              value={totalCorrect}
              bgColor="bg-gradient-to-br from-green-50 to-green-100"
            />

            <StatCard
              icon="📚"
              title="Total Attempts"
              value={total}
              bgColor="bg-gradient-to-br from-purple-50 to-purple-100"
            />
          </div>

          {/* 🔥 Charts */}
          <div className="space-y-8">

            {/* Line */}
            <div className="bg-card rounded-xl p-6 shadow-soft border border-border">
              <h3 className="text-lg font-bold mb-4">
                Weekly Progress
              </h3>

              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Legend />

                  <Line
                    type="monotone"
                    dataKey="lessons"
                    stroke="#3b82f6"
                    name="Lessons"
                  />

                  <Line
                    type="monotone"
                    dataKey="correct"
                    stroke="#10b981"
                    name="Correct"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Bar */}
            <div className="bg-card rounded-xl p-6 shadow-soft border border-border">
              <h3 className="text-lg font-bold mb-4">
                Daily Activity
              </h3>

              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Legend />

                  <Bar
                    dataKey="lessons"
                    fill="#f59e0b"
                    name="Lessons"
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