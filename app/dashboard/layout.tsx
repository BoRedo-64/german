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

  const [loading, setLoading] =
    useState(true)

  useEffect(() => {
    const checkUser =
      async () => {
        const { data } =
          await supabase.auth.getUser()

        const user =
          data.user

        // ❌ NOT LOGGED IN
        if (!user) {
          router.replace(
            '/login'
          )

          return
        }

        // 🔐 GET PROFILE
        const {
          data: profile,
        } = await supabase
          .from('profiles')
          .select(
            'is_admin, is_active'
          )
          .eq(
            'id',
            user.id
          )
          .single()

        // ❌ NO PROFILE
        if (!profile) {
          await supabase.auth.signOut()

          router.replace(
            '/login'
          )

          return
        }

        // ❌ INACTIVE USER
        if (
          !profile.is_active
        ) {
          await supabase.auth.signOut()

          router.replace(
            '/login'
          )

          return
        }

        // 👑 ADMIN
        if (
          profile.is_admin
        ) {
          router.replace(
            '/admin/exercises'
          )

          return
        }

        // ✅ NORMAL USER
        setLoading(false)
      }

    checkUser()
  }, [router])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">

        <div className="text-center">

          <div className="text-4xl mb-4">
            ⏳
          </div>

          <p className="text-foreground">
            Loading...
          </p>

        </div>

      </div>
    )
  }

  return <>{children}</>
}