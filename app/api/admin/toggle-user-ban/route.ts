import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const adminSupabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(req: Request) {
  try {
    const { userId, banned } = await req.json()

    if (!userId) {
      return NextResponse.json(
        { error: 'Missing userId' },
        { status: 400 }
      )
    }

    const banUntil = banned
      ? new Date('2099-01-01').toISOString()
      : null

    const { error } =
      await adminSupabase.auth.admin.updateUserById(
        userId,
        {
          ban_duration: banned
            ? '876000h'
            : 'none',
        }
      )

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
    })
  } catch (err) {
    console.error(err)

    return NextResponse.json(
      { error: 'Server error' },
      { status: 500 }
    )
  }
}