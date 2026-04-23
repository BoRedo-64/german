'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'

export interface QuizQuestion {
  id: string
  question: string
  icon: string
  answers: {
    id: string
    text: string
    isCorrect: boolean
  }[]
  explanation?: string
}

interface QuizCardProps {
  questions: QuizQuestion[]
  onComplete: (stats: { correct: number; total: number }) => void
}

export function QuizCard({ questions, onComplete }: QuizCardProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [correctCount, setCorrectCount] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [answeredQuestions, setAnsweredQuestions] = useState<Set<string>>(
    new Set()
  )

  const currentQuestion = questions[currentIndex]
  const progress = ((currentIndex + 1) / questions.length) * 100
  const isAnswered = answeredQuestions.has(currentQuestion.id)

  const handleAnswerClick = (answerId: string) => {
    if (isAnswered || showResult) return

    setSelectedAnswer(answerId)
    setShowResult(true)
    setIsAnimating(true)

    const isCorrect = currentQuestion.answers.find(
      (a) => a.id === answerId
    )?.isCorrect

    if (isCorrect) {
      setCorrectCount((prev) => prev + 1)
    }

    setAnsweredQuestions((prev) => new Set([...prev, currentQuestion.id]))
  }

  const handleNextQuestion = () => {
    if (currentIndex < questions.length - 1) {
      setIsAnimating(false)
      setSelectedAnswer(null)
      setShowResult(false)
      setCurrentIndex((prev) => prev + 1)
    } else {
      onComplete({ correct: correctCount, total: questions.length })
    }
  }

  const selectedAnswerData = currentQuestion.answers.find(
    (a) => a.id === selectedAnswer
  )
  const isSelectedCorrect = selectedAnswerData?.isCorrect || false

  return (
    <div className="w-full max-w-2xl mx-auto p-6 space-y-6">
      {/* Progress Bar */}
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium text-foreground/60">
            Question {currentIndex + 1} of {questions.length}
          </span>
          <span className="text-sm font-semibold text-primary">
            {correctCount} correct
          </span>
        </div>
        <Progress value={progress} className="h-2 rounded-full" />
      </div>

      {/* Question Card */}
      <div
        className={`bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900 rounded-2xl p-8 transition-all duration-300 ${
          isAnimating ? 'scale-100 opacity-100' : 'scale-95 opacity-100'
        }`}
      >
        <div className="space-y-4">
          {/* Icon and Question */}
          <div className="space-y-3">
            <div className="text-6xl">{currentQuestion.icon}</div>
            <h2 className="text-3xl font-bold text-foreground leading-tight">
              {currentQuestion.question}
            </h2>
          </div>
        </div>
      </div>

      {/* Answer Options */}
      <div className="space-y-3">
        {currentQuestion.answers.map((answer, index) => {
          const isSelected = selectedAnswer === answer.id
          const showCorrect = showResult && answer.isCorrect
          const showIncorrect = showResult && isSelected && !answer.isCorrect

          return (
            <button
              key={answer.id}
              onClick={() => handleAnswerClick(answer.id)}
              disabled={isAnswered}
              className={`w-full p-4 rounded-xl text-left font-medium transition-all duration-300 transform hover:scale-105 active:scale-95 disabled:cursor-not-allowed ${
                showCorrect
                  ? 'bg-emerald-100 dark:bg-emerald-900/30 border-2 border-emerald-500 text-emerald-900 dark:text-emerald-100 scale-105'
                  : showIncorrect
                    ? 'bg-red-100 dark:bg-red-900/30 border-2 border-red-500 text-red-900 dark:text-red-100 scale-95'
                    : isSelected && !showResult
                      ? 'bg-primary text-primary-foreground border-2 border-primary'
                      : 'bg-card border-2 border-border hover:border-primary dark:hover:border-primary hover:shadow-md'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="flex-1">{answer.text}</span>
                {showCorrect && <span className="text-2xl ml-2">✓</span>}
                {showIncorrect && <span className="text-2xl ml-2">✕</span>}
                {!showResult && (
                  <div className="w-6 h-6 rounded-full border-2 border-foreground/30 ml-2" />
                )}
              </div>
            </button>
          )
        })}
      </div>

      {/* Explanation (shown after answer) */}
      {showResult && currentQuestion.explanation && (
        <div className="bg-amber-50 dark:bg-amber-900/20 border-l-4 border-amber-500 p-4 rounded-lg">
          <p className="text-sm text-foreground/70 dark:text-foreground/80">
            <span className="font-semibold">💡 Explanation:</span>{' '}
            {currentQuestion.explanation}
          </p>
        </div>
      )}

      {/* Continue Button */}
      {showResult && (
        <Button
          onClick={handleNextQuestion}
          className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-6 rounded-xl text-lg"
        >
          {currentIndex < questions.length - 1
            ? 'Next Question →'
            : 'See Results 🎉'}
        </Button>
      )}
    </div>
  )
}
