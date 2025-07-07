import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/app/lib/prisma'
import { getUserIdFromRequest } from '@/app/lib/auth'

export async function GET(req: NextRequest) {
  const userId = getUserIdFromRequest(req)

  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  // Get user's account
  const account = await prisma.account.findUnique({ where: { userId } })

  if (!account) {
    return NextResponse.json({ error: 'Account not found' }, { status: 404 })
  }

  const transactions = await prisma.transaction.findMany({
    where: {
      OR: [
        { fromAccountId: account.id },
        { toAccountId: account.id },
      ],
    },
    orderBy: { createdAt: 'desc' },
    include: {
      from: { include: { user: true } },
      to: { include: { user: true } },
    },
  })

  return NextResponse.json({ transactions })
}
