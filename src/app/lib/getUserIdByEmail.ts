import prisma from '@/app/lib/prisma'

export async function getUserIdByEmail(email: string) {
  const user = await prisma.user.findUnique({
    where: { email },
    include: { account: true },
  })

  if (!user) return null
  return user.id
}
