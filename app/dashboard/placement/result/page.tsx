'use client'

import { useEffect, useState } from 'react'

export default function PlacementResultPage() {
  const [score, setScore] = useState(0)
  const [level, setLevel] = useState('A1')

  useEffect(() => {
    const saved = Number(localStorage.getItem('placementScore') || 0)

    setScore(saved)

    let detected = 'A1'

    if (saved >= 5) detected = 'A2'
    if (saved >= 10) detected = 'B1'
    if (saved >= 16) detected = 'B2'
    if (saved >= 22) detected = 'C1'
    if (saved >= 27) detected = 'C2'

    setLevel(detected)
  }, [])

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-6">

      <div className="max-w-2xl w-full bg-gradient-to-br from-blue-100 to-purple-100 rounded-3xl p-10 text-center">

        <div className="text-7xl mb-6">
          🏆
        </div>

        <h1 className="text-5xl font-bold mb-4">
          Your Level: {level}
        </h1>

        <p className="text-xl text-muted-foreground mb-8">
          You scored {score} / 30
        </p>

        <div className="bg-white rounded-2xl p-6 text-left">

          <h2 className="font-bold text-xl mb-4">
            What this means
          </h2>

          <p className="text-muted-foreground leading-relaxed">
            Your placement level indicates your current German understanding in grammar, vocabulary, listening and reading.
          </p>

        </div>
      </div>
    </div>
  )
}