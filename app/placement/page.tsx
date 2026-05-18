'use client'

import Link from 'next/link'

import {
  ArrowRight,
  Brain,
  Sparkles,
  Trophy,
  Headphones,
  ImageIcon,
} from 'lucide-react'

export default function PlacementStartPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center px-6 py-10 overflow-hidden">

      <div className="max-w-5xl w-full">

        {/* HERO CARD */}
        <div className="relative overflow-hidden rounded-[42px] bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 p-10 md:p-14 text-white shadow-2xl">

          {/* BG EFFECTS */}
          <div className="absolute inset-0 opacity-20">

            <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-white blur-3xl" />

            <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full bg-cyan-300 blur-3xl" />

          </div>

          <div className="relative z-10 text-center">

            {/* ICON */}
            <div className="w-32 h-32 rounded-[36px] bg-white/20 backdrop-blur-md flex items-center justify-center mx-auto shadow-2xl mb-8">

              <Brain className="w-16 h-16 text-white" />

            </div>

            {/* BADGE */}
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-5 py-2 rounded-2xl mb-6">

              <Sparkles className="w-4 h-4" />

              <span className="font-semibold text-sm">
                Deutschly Placement Test
              </span>

            </div>

            {/* TITLE */}
            <h1 className="text-5xl md:text-7xl font-black leading-tight">
              Ready to Start?
            </h1>

            {/* DESCRIPTION */}
            <p className="text-white/80 text-xl mt-6 leading-relaxed max-w-3xl mx-auto">
              This test will evaluate your German grammar,
              vocabulary, listening and comprehension skills to
              determine your level from A1 to B2.
            </p>

            {/* FEATURES */}
            <div className="grid md:grid-cols-3 gap-5 mt-12">

              {/* FEATURE */}
              <div className="bg-white/15 backdrop-blur-md rounded-[28px] p-6">

                <div className="w-16 h-16 rounded-3xl bg-white/20 flex items-center justify-center mx-auto mb-5">

                  <Brain className="w-8 h-8" />

                </div>

                <h3 className="text-3xl font-black">
                  40
                </h3>

                <p className="text-white/70 mt-2">
                  Smart Questions
                </p>

              </div>

              {/* FEATURE */}
              <div className="bg-white/15 backdrop-blur-md rounded-[28px] p-6">

                <div className="w-16 h-16 rounded-3xl bg-white/20 flex items-center justify-center mx-auto mb-5">

                  <Headphones className="w-8 h-8" />

                </div>

                <h3 className="text-3xl font-black">
                  Audio
                </h3>

                <p className="text-white/70 mt-2">
                  & Images Included
                </p>

              </div>

              {/* FEATURE */}
              <div className="bg-white/15 backdrop-blur-md rounded-[28px] p-6">

                <div className="w-16 h-16 rounded-3xl bg-white/20 flex items-center justify-center mx-auto mb-5">

                  <Trophy className="w-8 h-8" />

                </div>

                <h3 className="text-3xl font-black">
                  Instant
                </h3>

                <p className="text-white/70 mt-2">
                  Level Result
                </p>

              </div>

            </div>

            {/* EXTRA INFO */}
            <div className="mt-10 inline-flex flex-wrap items-center justify-center gap-3 bg-white/15 backdrop-blur-md px-6 py-4 rounded-3xl">

              <ImageIcon className="w-5 h-5" />

              <span className="font-medium">
                Find a quiet place and take your time before starting
              </span>

            </div>

            {/* BUTTON */}
            <Link href="/placement/test">

              <button
                className="
                  mt-12 h-16 px-12 rounded-3xl
                  bg-white text-blue-600
                  hover:bg-white/90
                  transition-all
                  font-black text-xl
                  shadow-2xl
                  flex items-center gap-3 mx-auto
                "
              >

                Start Test

                <ArrowRight className="w-6 h-6" />

              </button>

            </Link>

          </div>
        </div>
      </div>
    </div>
  )
}