import prisma from '@/app/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const { userId } = await req.json()

  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: {
      account: {
        include: {
          sentTransactions: true,      // Include sent transactions
          receivedTransactions: true, // Include received transactions
        },
      },
    },
  })

  if (!user || !user.account) return NextResponse.json({ error: 'User not found' }, { status: 404 })

  return NextResponse.json({
    name: user.name,
    balance: user.account.balance,
    sentTransactions: user.account.sentTransactions,      // Sent transactions
    receivedTransactions: user.account.receivedTransactions, // Received transactions
  })
}
