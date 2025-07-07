import { NextResponse } from 'next/server'
import { getUserIdByEmail } from '@/app/lib/getUserIdByEmail'

export async function POST(req: Request) {
  const { email } = await req.json()

  if (!email) {
    return NextResponse.json({ error: 'Email is required' }, { status: 400 })
  }

  const userId = await getUserIdByEmail(email)

  if (!userId) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 })
  }

  return NextResponse.json({ userId })
}
