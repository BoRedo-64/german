'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkAdmin = async () => {
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

      // ❌ not admin → kick to dashboard
      if (!profile?.is_admin) {
        router.replace('/dashboard')
        return
      }

      // ✅ admin
      setLoading(false)
    }

    checkAdmin()
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