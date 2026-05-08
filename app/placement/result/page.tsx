'use client'

import {
  useEffect,
  useState,
} from 'react'

import Link from 'next/link'

import {
  Trophy,
  Sparkles,
  GraduationCap,
  ArrowRight,
  Brain,
  CheckCircle2,
  Target,
  RotateCcw,
} from 'lucide-react'

export default function PlacementResultPage() {
  const [score, setScore] =
    useState(0)

  const [level, setLevel] =
    useState('A1')

  const [loading, setLoading] =
    useState(true)

  // 🔥 LOAD SCORE
  useEffect(() => {
    const saved = Number(
      localStorage.getItem(
        'placementScore'
      ) || 0
    )

    setScore(saved)

    let detected = 'A1'

    if (saved >= 5)
      detected = 'A2'

    if (saved >= 10)
      detected = 'B1'

    if (saved >= 16)
      detected = 'B2'

    if (saved >= 22)
      detected = 'C1'

    if (saved >= 27)
      detected = 'C2'

    setLevel(detected)

    setLoading(false)
  }, [])

  // 🔥 LOADING
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">

        <div className="text-center space-y-5">

          <div className="w-20 h-20 rounded-[28px] bg-gradient-to-r from-blue-600 to-purple-600 animate-pulse mx-auto shadow-xl" />

          <div>

            <h2 className="text-2xl font-black">
              Calculating Results
            </h2>

            <p className="text-muted-foreground mt-2">
              Analyzing your German level...
            </p>

          </div>

        </div>
      </div>
    )
  }

  const percentage = Math.round(
    (score / 30) * 100
  )

  // 🔥 LEVEL COLORS
  const levelColors: any = {
    A1: 'from-green-500 to-emerald-500',
    A2: 'from-blue-500 to-cyan-500',
    B1: 'from-indigo-500 to-blue-500',
    B2: 'from-purple-500 to-pink-500',
    C1: 'from-orange-500 to-red-500',
    C2: 'from-red-500 to-rose-500',
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center px-6 py-10 overflow-hidden">

      <div className="max-w-5xl w-full">

        {/* HERO */}
        <div className="relative overflow-hidden rounded-[42px] bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 p-10 md:p-14 text-white shadow-2xl">

          {/* BG EFFECTS */}
          <div className="absolute inset-0 opacity-20">

            <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-white blur-3xl" />

            <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full bg-cyan-300 blur-3xl" />

          </div>

          <div className="relative z-10 text-center">

            {/* ICON */}
            <div className="w-32 h-32 rounded-[36px] bg-white/20 backdrop-blur-md flex items-center justify-center mx-auto shadow-2xl mb-8">

              <Trophy className="w-16 h-16 text-white" />

            </div>

            {/* BADGE */}
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-5 py-2 rounded-2xl mb-6">

              <Sparkles className="w-4 h-4" />

              <span className="font-semibold text-sm">
                Placement Test Complete
              </span>

            </div>

            {/* TITLE */}
            <h1 className="text-5xl md:text-7xl font-black leading-tight">
              Your Level
            </h1>

            {/* LEVEL CARD */}
            <div
              className={`
                mt-8 inline-flex items-center gap-5
                bg-gradient-to-r ${levelColors[level]}
                px-10 py-6 rounded-[32px]
                shadow-2xl
              `}
            >

              <GraduationCap className="w-12 h-12 text-white" />

              <div className="text-left">

                <p className="text-white/80 text-sm">
                  Detected Level
                </p>

                <h2 className="text-6xl font-black">
                  {level}
                </h2>

              </div>

            </div>

            {/* SCORE */}
            <p className="text-white/80 text-2xl mt-8">
              You scored{' '}
              <span className="font-black text-white">
                {score} / 30
              </span>
            </p>

            {/* PROGRESS */}
            <div className="max-w-2xl mx-auto mt-8">

              <div className="flex items-center justify-between mb-3">

                <p className="font-semibold">
                  Performance
                </p>

                <p className="text-white/80">
                  {percentage}%
                </p>

              </div>

              <div className="w-full h-5 rounded-full bg-white/20 overflow-hidden">

                <div
                  className="h-full bg-white rounded-full transition-all duration-1000"
                  style={{
                    width: `${percentage}%`,
                  }}
                />

              </div>

            </div>

          </div>
        </div>

        {/* CONTENT */}
        <div className="grid lg:grid-cols-3 gap-6 mt-8">

          {/* INFO */}
          <div className="lg:col-span-2 bg-white rounded-[36px] border shadow-2xl p-8">

            <div className="flex items-center gap-4 mb-8">

              <div className="w-16 h-16 rounded-3xl bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center shadow-lg">

                <Brain className="w-8 h-8 text-white" />

              </div>

              <div>

                <h3 className="text-3xl font-black">
                  What This Means
                </h3>

                <p className="text-muted-foreground mt-1">
                  Your German proficiency assessment
                </p>

              </div>

            </div>

            <p className="text-lg leading-relaxed text-muted-foreground">

              Your placement level reflects your current
              understanding of German grammar, vocabulary,
              listening and reading comprehension.

              <br />
              <br />

              This result helps personalize your learning
              journey and ensures you receive lessons adapted
              to your actual level.

            </p>

            {/* FEATURES */}
            <div className="grid md:grid-cols-3 gap-5 mt-10">

              <FeatureCard
                icon={
                  <CheckCircle2 className="w-7 h-7 text-green-600" />
                }
                title="Grammar"
                text="Sentence structure and grammar understanding"
              />

              <FeatureCard
                icon={
                  <Target className="w-7 h-7 text-blue-600" />
                }
                title="Vocabulary"
                text="Word recognition and language usage"
              />

              <FeatureCard
                icon={
                  <Brain className="w-7 h-7 text-purple-600" />
                }
                title="Listening"
                text="Audio comprehension and understanding"
              />

            </div>
          </div>

          {/* SIDE */}
          <div className="space-y-6">

            {/* SCORE CARD */}
            <div className="bg-white rounded-[36px] border shadow-2xl overflow-hidden">

              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-7 text-white">

                <h3 className="text-2xl font-black">
                  Result Summary
                </h3>

                <p className="text-white/80 mt-1">
                  Quick overview
                </p>

              </div>

              <div className="p-7 space-y-5">

                <SummaryCard
                  label="Detected Level"
                  value={level}
                />

                <SummaryCard
                  label="Correct Answers"
                  value={`${score} / 30`}
                />

                <SummaryCard
                  label="Accuracy"
                  value={`${percentage}%`}
                />

              </div>
            </div>

            {/* BUTTONS */}
            <div className="space-y-4">

              <Link
                href="/login"
                className="block"
              >

                <button
                  className="
                    w-full h-16 rounded-3xl
                    bg-gradient-to-r from-blue-600 to-purple-600
                    hover:opacity-90
                    transition-all
                    text-white font-black text-lg
                    shadow-2xl
                    flex items-center justify-center gap-3
                  "
                >

                  Continue Learning

                  <ArrowRight className="w-5 h-5" />

                </button>

              </Link>

              <Link
                href="/placement/test"
                className="block"
              >

                <button
                  className="
                    w-full h-14 rounded-2xl
                    bg-white border-2
                    hover:bg-secondary
                    transition-all
                    font-bold
                    flex items-center justify-center gap-3
                  "
                >

                  <RotateCcw className="w-5 h-5" />

                  Retry Test

                </button>

              </Link>

            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

function FeatureCard({
  icon,
  title,
  text,
}: any) {
  return (
    <div className="rounded-[28px] bg-secondary p-6">

      <div className="w-14 h-14 rounded-2xl bg-white shadow-sm flex items-center justify-center mb-5">

        {icon}

      </div>

      <h4 className="text-xl font-black">
        {title}
      </h4>

      <p className="text-sm text-muted-foreground mt-3 leading-relaxed">
        {text}
      </p>

    </div>
  )
}

function SummaryCard({
  label,
  value,
}: any) {
  return (
    <div className="rounded-2xl bg-secondary p-5">

      <p className="text-sm text-muted-foreground">
        {label}
      </p>

      <p className="text-2xl font-black mt-2">
        {value}
      </p>

    </div>
  )
}