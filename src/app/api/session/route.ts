/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from 'next/server'
import { getUserIdFromRequest } from '@/app/lib/auth'
import prisma from '@/app/lib/prisma'

export async function GET(req: Request) {
  const userId = getUserIdFromRequest(req as any)
  if (!userId) return NextResponse.json({ user: null })

  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: { account: true },
  })

  if (!user) return NextResponse.json({ user: null })

  return NextResponse.json({
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
      balance: user.account?.balance,
    },
  })
}
