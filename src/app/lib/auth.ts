import jwt from 'jsonwebtoken'
import { NextRequest } from 'next/server'

const JWT_SECRET = process.env.JWT_SECRET || 'supersecret'

export function signToken(userId: string) {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: '7d' })
}

export function verifyToken(token: string) {
  try {
    return jwt.verify(token, JWT_SECRET) as { userId: string }
  } catch {
    return null
  }
}

// ✅ Make sure this is exported
export function getUserIdFromRequest(req: NextRequest): string | null {
  const token = req.cookies.get('token')?.value
  if (!token) return null

  const payload = verifyToken(token)
  return payload?.userId || null
}
