'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Mock login - redirect to dashboard
    window.location.href = '/dashboard'
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-yellow-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <Link href="/" className="flex items-center justify-center gap-2 mb-8">
          <div className="text-4xl">📚</div>
          <span className="font-bold text-2xl bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Deutschly
          </span>
        </Link>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-lg p-8 border border-border">
          <h1 className="text-3xl font-bold text-foreground mb-2 text-center">
            Welcome Back
          </h1>
          <p className="text-center text-muted-foreground mb-8">
            Sign in to continue learning German
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">
                Email Address
              </label>
              <Input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">
                Password
              </label>
              <Input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full"
              />
            </div>

            {/* Remember Me */}
            <div className="flex items-center gap-2">
              <input type="checkbox" id="remember" className="rounded" />
              <label htmlFor="remember" className="text-sm text-muted-foreground">
                Remember me
              </label>
            </div>

            {/* Submit */}
            <Button
              type="submit"
              className="w-full bg-primary hover:bg-primary/90 text-white py-6 rounded-lg font-semibold text-lg mt-6"
            >
              Sign In
            </Button>
          </form>

          {/* Divider */}
          <div className="my-6 flex items-center gap-3">
            <div className="flex-1 h-px bg-border" />
            <span className="text-xs text-muted-foreground">OR</span>
            <div className="flex-1 h-px bg-border" />
          </div>

          {/* Social Login */}
          <div className="flex gap-3">
            <Button
              variant="outline"
              className="flex-1 py-2 rounded-lg flex items-center justify-center gap-2"
            >
              <span>🇩🇪</span>
              Google
            </Button>
            <Button
              variant="outline"
              className="flex-1 py-2 rounded-lg flex items-center justify-center gap-2"
            >
              <span>👤</span>
              Apple
            </Button>
          </div>

          {/* Sign Up Link */}
          <p className="text-center text-sm text-muted-foreground mt-6">
            Don&apos;t have an account?{' '}
            <Link href="/" className="text-primary hover:underline font-semibold">
              Sign up for free
            </Link>
          </p>

          {/* Forgot Password */}
          <p className="text-center text-sm mt-4">
            <Link href="#" className="text-primary hover:underline">
              Forgot your password?
            </Link>
          </p>
        </div>

        {/* Features */}
        <div className="mt-12 grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-2xl mb-2">🎯</div>
            <p className="text-xs text-muted-foreground">Personalized Lessons</p>
          </div>
          <div>
            <div className="text-2xl mb-2">📊</div>
            <p className="text-xs text-muted-foreground">Track Progress</p>
          </div>
          <div>
            <div className="text-2xl mb-2">👥</div>
            <p className="text-xs text-muted-foreground">Community</p>
          </div>
        </div>
      </div>
    </div>
  )
}
