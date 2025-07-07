import { withAuth } from '@/app/lib/withAuth'
import prisma from '@/app/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

export const GET = withAuth(async (req: NextRequest, userId: string) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { email: true },
  })

  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 })
  }

  return NextResponse.json({ email: user.email })
})
