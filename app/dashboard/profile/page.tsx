'use client'

import { useEffect, useState } from 'react'
import { DashboardSidebar } from '@/components/DashboardSidebar'
import { supabase } from '@/lib/supabaseClient'
import { Button } from '@/components/ui/button'
import { User } from 'lucide-react'
import { useLanguage } from '@/context/LanguageContext'

type Language = 'en' | 'fr' | 'ar'

export default function ProfilePage() {
  const { language, setLanguage } = useLanguage()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const [user, setUser] = useState<any>(null)

  // 🔐 PASSWORD STATES
  const [showPasswordForm, setShowPasswordForm] = useState(false)
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)

  // 🔥 FETCH USER
  useEffect(() => {
    const fetchData = async () => {
      const { data: userData } = await supabase.auth.getUser()
      const currentUser = userData.user

      if (!currentUser) return

      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', currentUser.id)
        .single()

      setUser({
        ...profile,
        email: currentUser.email,
      })
    }

    fetchData()
  }, [])

  // 🔐 CHANGE PASSWORD
  const handleChangePassword = async () => {
    if (!password || password.length < 6) {
      return alert('Password must be at least 6 characters')
    }

    if (password !== confirmPassword) {
      return alert('Passwords do not match')
    }

    setLoading(true)

    const { error } = await supabase.auth.updateUser({
      password: password,
    })

    setLoading(false)

    if (error) {
      console.error(error)
      alert('Error updating password ❌')
    } else {
      alert('Password updated successfully ✅')
      setPassword('')
      setConfirmPassword('')
      setShowPasswordForm(false)
    }
  }

  return (
    <div className="flex min-h-screen bg-background">

      {/* SIDEBAR */}
      <DashboardSidebar
        language={language}
        open={sidebarOpen}
        setOpen={setSidebarOpen}
      />

      {/* MAIN */}
      <main className="flex-1 overflow-y-auto">

        {/* HEADER */}
        <div className="bg-white border-b border-border sticky top-0 z-10">
          <div className="max-w-4xl mx-auto px-6 py-6 flex items-center justify-between">

            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(true)}
                className="md:hidden text-2xl"
              >
                ☰
              </button>

              <h1 className="text-3xl font-bold">
                Profile
              </h1>
            </div>

            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value as Language)}
              className="px-3 py-2 rounded-lg border"
            >
              <option value="en">EN</option>
              <option value="fr">FR</option>
              <option value="ar">AR</option>
            </select>
          </div>
        </div>

        {/* CONTENT */}
        <div className="max-w-4xl mx-auto px-6 py-10 space-y-8">

          {/* PROFILE HEADER */}
          <div className="flex items-center gap-6">
            <div className="bg-blue-100 p-3 rounded-full flex items-center justify-center">
              <User className="w-12 h-12 text-blue-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">
                {user?.first_name} {user?.last_name}
              </h1>
              <p className="text-muted-foreground">
                Level {user?.level || 'A1'}
              </p>
            </div>
          </div>

          {/* INFO */}
          <div className="bg-card rounded-xl p-6 border">
            <h2 className="text-xl font-bold mb-4">
              Account Information
            </h2>

            <div className="space-y-3">
              <div>
                <p className="text-sm text-muted-foreground">Email</p>
                <p>{user?.email || '—'}</p>
              </div>

              <div>
                <p className="text-sm text-muted-foreground">Level</p>
                <p>{user?.level}</p>
              </div>
            </div>
          </div>

          {/* ACTIONS */}
          <div className="space-y-4">

            <div className="flex gap-4 flex-wrap">
              <Button
                variant="outline"
                onClick={() => setShowPasswordForm(!showPasswordForm)}
              >
                Change Password
              </Button>
            </div>

            {/* 🔐 PASSWORD FORM */}
            {showPasswordForm && (
              <div className="bg-card border rounded-xl p-6 space-y-4 max-w-md">

                <h3 className="font-semibold text-lg">
                  Update Password
                </h3>

                <input
                  type="password"
                  placeholder="New password"
                  className="w-full border p-3 rounded-lg"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />

                <input
                  type="password"
                  placeholder="Confirm password"
                  className="w-full border p-3 rounded-lg"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />

                <div className="flex gap-3">
                  <Button
                    onClick={handleChangePassword}
                    disabled={loading}
                    className="bg-primary text-white"
                  >
                    {loading ? 'Updating...' : 'Save'}
                  </Button>

                  <Button
                    variant="outline"
                    onClick={() => setShowPasswordForm(false)}
                  >
                    Cancel
                  </Button>
                </div>

              </div>
            )}
          </div>

        </div>
      </main>
    </div>
  )
}