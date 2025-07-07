import { NextResponse } from 'next/server'
import prisma from '@/app/lib/prisma'
import bcrypt from 'bcryptjs'
import { signToken } from '@/app/lib/auth'

export async function POST(req: Request) {
  const { email, password } = await req.json()

  const user = await prisma.user.findUnique({ where: { email } })
  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 })
  }

  const passwordMatch = await bcrypt.compare(password, user.password)
  if (!passwordMatch) {
    return NextResponse.json({ error: 'Incorrect password' }, { status: 401 })
  }

  const token = signToken(user.id)

  const res = NextResponse.json({ message: 'Login successful', userId: user.id })
  res.cookies.set('token', token, {
    httpOnly: true,
    path: '/',
    maxAge: 60 * 60 * 24 * 7, // 1 week
  })

  return res
}
