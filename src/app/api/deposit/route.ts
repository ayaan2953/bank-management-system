import { getUserIdFromRequest } from '@/app/lib/auth'
import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/app/lib/prisma'

export async function POST(req: NextRequest) {
  const userId = getUserIdFromRequest(req)
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { amount } = await req.json()

  if (!amount || amount <= 0) {
    return NextResponse.json({ error: 'Invalid amount' }, { status: 400 })
  }

  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: { account: true },
  })

  if (!user || !user.account) {
    return NextResponse.json({ error: 'Account not found' }, { status: 404 })
  }

  const updatedAccount = await prisma.account.update({
    where: { id: user.account.id },
    data: { balance: { increment: amount } },
  })

  // ✅ Record deposit in transactions table
  await prisma.transaction.create({
    data: {
      fromAccountId: null,
      toAccountId: user.account.id,
      amount,
    },
  })

  return NextResponse.json({ balance: updatedAccount.balance })
}
