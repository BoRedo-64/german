'use client'

import { useEffect, useState } from 'react'

import { DashboardSidebar } from '@/components/DashboardSidebar'
import { supabase } from '@/lib/supabaseClient'

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from 'recharts'

import {
  Menu,
  TrendingUp,
  Flame,
  CheckCircle2,
  BookOpen,
  Sparkles,
  Target,
  Activity,
} from 'lucide-react'

import { useLanguage } from '@/context/LanguageContext'

type Language = 'en' | 'fr' | 'ar'

export default function StatisticsPage() {
  const { language, setLanguage } =
    useLanguage()

  const [loading, setLoading] =
    useState(true)

  const [progress, setProgress] =
    useState<any>(null)

  const [chartData, setChartData] =
    useState<any[]>([])

  const [streak, setStreak] =
    useState(0)

  const [sidebarOpen, setSidebarOpen] =
    useState(false)

  useEffect(() => {
    const fetchStats = async () => {
      const { data: userData } =
        await supabase.auth.getUser()

      const user = userData.user

      if (!user) return

      // 🔥 PROGRESS
      const { data: progressData } =
        await supabase
          .from('user_progress')
          .select('*')
          .eq('user_id', user.id)
          .single()

      setProgress(progressData)

      // 🔥 ACTIVITY
      const { data: activity } =
        await supabase
          .from('user_activity')
          .select('*')
          .eq('user_id', user.id)
          .order('date', {
            ascending: false,
          })

      // 🔥 STREAK
      let currentStreak = 0

      if (
        activity &&
        activity.length > 0
      ) {
        const today = new Date()

        today.setHours(
          0,
          0,
          0,
          0
        )

        for (
          let i = 0;
          i < activity.length;
          i++
        ) {
          const activityDate =
            new Date(
              activity[i].date
            )

          activityDate.setHours(
            0,
            0,
            0,
            0
          )

          const expectedDate =
            new Date(today)

          expectedDate.setDate(
            today.getDate() - i
          )

          if (
            activityDate.getTime() ===
            expectedDate.getTime()
          ) {
            currentStreak++
          } else {
            break
          }
        }
      }

      setStreak(currentStreak)

      // 🔥 CHART
      const last7 =
        activity
          ?.slice(0, 7)
          .reverse() || []

      const formatted =
        last7.map((day: any) => ({
          day: new Date(
            day.date
          ).toLocaleDateString(
            'en',
            {
              weekday: 'short',
            }
          ),

          correct:
            day.correct_answers,

          lessons:
            day.correct_answers +
            day.wrong_answers,
        }))

      setChartData(formatted)

      setLoading(false)
    }

    fetchStats()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50">

        <div className="text-center space-y-4">

          <div className="w-16 h-16 rounded-3xl bg-gradient-to-r from-blue-600 to-purple-600 animate-pulse mx-auto" />

          <p className="text-muted-foreground font-medium">
            Loading statistics...
          </p>

        </div>
      </div>
    )
  }

  const totalCorrect =
    progress?.total_correct || 0

  const totalWrong =
    progress?.total_wrong || 0

  const total =
    totalCorrect + totalWrong

  const progressPercent =
    total > 0
      ? Math.round(
          (totalCorrect / total) *
            100
        )
      : 0

  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">

      <DashboardSidebar
        language={language}
        open={sidebarOpen}
        setOpen={setSidebarOpen}
      />

      <main className="flex-1 overflow-y-auto">

        {/* HEADER */}
        <div className="sticky top-0 z-20 backdrop-blur-xl bg-white/70 border-b border-white/30">

          <div className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">

            {/* LEFT */}
            <div className="flex items-center gap-4">

              {/* MOBILE BTN */}
              <button
                onClick={() =>
                  setSidebarOpen(true)
                }
                className="
                  md:hidden
                  w-12 h-12 rounded-2xl
                  bg-white shadow-md border
                  flex items-center justify-center
                "
              >
                <Menu className="w-6 h-6" />
              </button>

              <div className="flex items-center gap-4">

                <div>

                  <h1 className="text-4xl font-black tracking-tight">
                    Statistics
                  </h1>

                  <p className="text-muted-foreground mt-1">
                    Track your German learning progress
                  </p>

                </div>

              </div>
            </div>

            {/* RIGHT */}
            <select
              value={language}
              onChange={(e) =>
                setLanguage(
                  e.target.value as Language
                )
              }
              className="
                px-4 py-3 rounded-2xl
                border bg-white shadow-sm
              "
            >
              <option value="en">
                English
              </option>

              <option value="fr">
                Français
              </option>

              <option value="ar">
                العربية
              </option>
            </select>

          </div>
        </div>

        {/* HERO */}
        <div className="max-w-7xl mx-auto px-6 pt-8">

          <div className="relative overflow-hidden rounded-[36px] bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 p-10 text-white shadow-2xl">

            {/* BG */}
            <div className="absolute inset-0 opacity-20">

              <div className="absolute top-0 right-0 w-72 h-72 rounded-full bg-white blur-3xl" />

              <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-cyan-300 blur-3xl" />

            </div>

            <div className="relative z-10 max-w-2xl">

              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-2 rounded-2xl mb-5">

                <Sparkles className="w-4 h-4" />

                <span className="text-sm font-semibold">
                  Deutschly Analytics
                </span>

              </div>

              <h2 className="text-5xl font-black leading-tight">
                Your Learning Journey
              </h2>

              <p className="text-white/80 text-lg mt-4 leading-relaxed">
                Analyze your performance, streaks and weekly progress
                to improve faster every day.
              </p>

            </div>
          </div>
        </div>

        {/* CONTENT */}
        <div className="max-w-7xl mx-auto px-6 py-10 space-y-10">

          {/* TOP STATS */}
          <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">

            <StatCard
              icon={
                <CheckCircle2 className="w-7 h-7 text-green-600" />
              }
              title="Correct Answers"
              value={totalCorrect}
              gradient="from-green-50 to-green-100"
            />

            <StatCard
              icon={
                <BookOpen className="w-7 h-7 text-purple-600" />
              }
              title="Total Attempts"
              value={total}
              gradient="from-purple-50 to-purple-100"
            />

            <StatCard
              icon={
                <Flame className="w-7 h-7 text-orange-600" />
              }
              title="Current Streak"
              value={`${streak} days`}
              gradient="from-orange-50 to-orange-100"
            />

            <StatCard
              icon={
                <Target className="w-7 h-7 text-blue-600" />
              }
              title="Accuracy"
              value={`${progressPercent}%`}
              gradient="from-blue-50 to-blue-100"
            />

          </div>

          {/* MAIN GRID */}
          <div className="grid xl:grid-cols-[1fr_320px] gap-8">

            {/* CHARTS */}
            <div className="space-y-8">

              {/* LINE CHART */}
              <div className="bg-white rounded-[32px] border shadow-xl p-8">

                <div className="flex items-center justify-between mb-8">

                  <div>

                    <h3 className="text-3xl font-black">
                      Weekly Progress
                    </h3>

                    <p className="text-muted-foreground mt-2">
                      Lessons completed over the last 7 days
                    </p>

                  </div>

                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center shadow-lg">

                    <Activity className="w-7 h-7 text-white" />

                  </div>

                </div>

                <ResponsiveContainer
                  width="100%"
                  height={350}
                >
                  <AreaChart
                    data={chartData}
                  >

                    <defs>

                      <linearGradient
                        id="colorLessons"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >

                        <stop
                          offset="5%"
                          stopColor="#3b82f6"
                          stopOpacity={0.4}
                        />

                        <stop
                          offset="95%"
                          stopColor="#3b82f6"
                          stopOpacity={0}
                        />

                      </linearGradient>

                    </defs>

                    <CartesianGrid
                      strokeDasharray="3 3"
                      vertical={false}
                    />

                    <XAxis
                      dataKey="day"
                    />

                    <YAxis />

                    <Tooltip />

                    <Area
                      type="monotone"
                      dataKey="lessons"
                      stroke="#3b82f6"
                      fillOpacity={1}
                      fill="url(#colorLessons)"
                    />

                    <Line
                      type="monotone"
                      dataKey="correct"
                      stroke="#10b981"
                      strokeWidth={3}
                    />

                  </AreaChart>
                </ResponsiveContainer>

              </div>

            </div>

            {/* SIDE PANEL */}
            <div className="space-y-6">

              {/* PROGRESS CARD */}
              <div className="bg-white rounded-[32px] border shadow-xl p-7">

                <div className="flex items-center justify-between mb-6">

                  <div>

                    <p className="text-sm text-muted-foreground">
                      Accuracy
                    </p>

                    <h3 className="text-3xl font-black mt-1">
                      {progressPercent}%
                    </h3>

                  </div>

                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center shadow-lg">

                    <Target className="w-7 h-7 text-white" />

                  </div>

                </div>

                <div className="w-full h-4 rounded-full bg-secondary overflow-hidden">

                  <div
                    style={{
                      width: `${progressPercent}%`,
                    }}
                    className="h-full bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"
                  />

                </div>

                <p className="text-sm text-muted-foreground mt-4">
                  Keep practicing daily to improve your score.
                </p>

              </div>

              {/* STREAK CARD */}
              <div className="relative overflow-hidden bg-gradient-to-br from-orange-500 to-red-500 rounded-[32px] p-7 text-white shadow-xl">

                <div className="absolute top-0 right-0 w-40 h-40 rounded-full bg-white/20 blur-3xl" />

                <div className="relative z-10">

                  <div className="w-16 h-16 rounded-3xl bg-white/20 backdrop-blur-md flex items-center justify-center mb-6">

                    <Flame className="w-8 h-8" />

                  </div>

                  <p className="text-white/70">
                    Current Streak
                  </p>

                  <h3 className="text-5xl font-black mt-2">
                    {streak}
                  </h3>

                  <p className="mt-2 text-white/80">
                    days in a row 🔥
                  </p>

                </div>

              </div>

              {/* MOTIVATION */}
              <div className="bg-white rounded-[32px] border shadow-xl p-7">

                <h3 className="text-2xl font-black mb-5">
                  Motivation
                </h3>

                <div className="space-y-4">

                  <MotivationCard
                    text="Consistency beats intensity. Study a little every day."
                  />

                  <MotivationCard
                    text="Listening daily improves pronunciation naturally."
                  />

                  <MotivationCard
                    text="Mistakes are part of the learning process."
                  />

                </div>

              </div>

            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

function StatCard({
  icon,
  title,
  value,
  gradient,
}: any) {
  return (
    <div className={`bg-gradient-to-br ${gradient} rounded-[30px] p-6 shadow-lg border`}>

      <div className="flex items-start justify-between">

        <div>

          <p className="text-sm text-muted-foreground font-medium">
            {title}
          </p>

          <h3 className="text-4xl font-black mt-3">
            {value}
          </h3>

        </div>

        <div className="w-14 h-14 rounded-2xl bg-white shadow-md flex items-center justify-center">

          {icon}

        </div>

      </div>
    </div>
  )
}

function MotivationCard({
  text,
}: any) {
  return (
    <div className="rounded-2xl bg-secondary p-4 text-sm leading-relaxed text-muted-foreground">
      {text}
    </div>
  )
}