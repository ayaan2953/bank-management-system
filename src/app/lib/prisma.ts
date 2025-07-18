/* eslint-disable no-var */
// lib/prisma.ts
import { PrismaClient } from '@prisma/client'

declare global {
  var prisma: PrismaClient | undefined
}

const prisma = global.prisma || new PrismaClient({
  log: ['query'], // Optional: logs every SQL query in console
})

if (process.env.NODE_ENV !== 'production') global.prisma = prisma

export default prisma
