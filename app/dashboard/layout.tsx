'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkUser = async () => {
      const { data } = await supabase.auth.getUser()

      const user = data.user

      // ❌ not logged in
      if (!user) {
        router.replace('/login')
        return
      }

      // 🔐 get role
      const { data: profile } = await supabase
        .from('profiles')
        .select('is_admin')
        .eq('id', user.id)
        .single()

      // 👑 admin → redirect away
      if (profile?.is_admin) {
        router.replace('/admin/exercises')
        return
      }

      // ✅ normal user
      setLoading(false)
    }

    checkUser()
  }, [router])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="text-4xl mb-4">⏳</div>
          <p className="text-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  return <>{children}</>
}