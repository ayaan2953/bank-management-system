import { NextResponse } from 'next/server'

export async function POST() {
  const res = NextResponse.json({ message: 'Logged out successfully' })
  res.cookies.set('token', '', { maxAge: 0, path: '/' }) // expire cookie
  return res
}
