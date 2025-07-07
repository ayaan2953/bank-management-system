import { withAuth } from '@/app/lib/withAuth'
import prisma from '@/app/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

export const POST = withAuth(async (req: NextRequest, userId: string) => {
  const { toEmailOrAccountNumber, amount } = await req.json()

  const sender = await prisma.account.findUnique({ where: { userId } })
  if (!sender || sender.balance < amount) {
    return NextResponse.json({ error: 'Insufficient balance or account not found' }, { status: 400 })
  }

  const recipientUser = await prisma.user.findFirst({
    where: {
      OR: [
        { email: toEmailOrAccountNumber },
        { account: { accountNumber: toEmailOrAccountNumber } },
      ],
    },
    include: { account: true },
  })

  if (!recipientUser?.account) {
    return NextResponse.json({ error: 'Recipient not found' }, { status: 404 })
  }

  await prisma.$transaction([
    prisma.account.update({
      where: { id: sender.id },
      data: { balance: { decrement: amount } },
    }),
    prisma.account.update({
      where: { id: recipientUser.account.id },
      data: { balance: { increment: amount } },
    }),
    prisma.transaction.create({
      data: {
        fromAccountId: sender.id,
        toAccountId: recipientUser.account.id,
        amount,
      },
    }),
  ])

  return NextResponse.json({ success: true })
})
