import { withAuth } from '@/app/lib/withAuth'
import prisma from '@/app/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

export const GET = withAuth(async (req: NextRequest, userId: string) => {
  try {
    const account = await prisma.account.findUnique({
      where: { userId },
      include: {
        user: true,
        sentTransactions: {
          include: { to: { include: { user: true } }, from: { include: { user: true } } },
          orderBy: { createdAt: 'desc' },
        },
        receivedTransactions: {
          include: { to: { include: { user: true } }, from: { include: { user: true } } },
          orderBy: { createdAt: 'desc' },
        },
      },
    })

    if (!account) {
      return NextResponse.json({ error: 'Account not found' }, { status: 404 })
    }

    // Combine and sort both sent and received transactions
    const transactions = [...account.sentTransactions, ...account.receivedTransactions].sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )

    return NextResponse.json({
      user: account.user,
      accountNumber: account.accountNumber,
      balance: account.balance,
      transactions,
    })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'Failed to load account info' }, { status: 500 })
  }
})

