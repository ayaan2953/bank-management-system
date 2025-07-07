/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextRequest, NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key' // use .env for safety

export function withAuth(handler: (req: NextRequest, userId: string) => Promise<NextResponse>) {
  return async function (req: NextRequest) {
    try {
      const token = req.cookies.get('token')?.value

      if (!token) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
      }

      const payload = jwt.verify(token, JWT_SECRET) as { userId: string }

      return handler(req, payload.userId)
    } catch (err) {
      return NextResponse.json({ error: 'Invalid or missing token' }, { status: 401 })
    }
  }
}
