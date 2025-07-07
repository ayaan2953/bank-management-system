import bcrypt from 'bcrypt'
import prisma from '@/app/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

// Helper function to generate a unique account number
const generateAccountNumber = () => {
  // You can change this logic as needed. Here we are just using a random number generator.
  return 'AC' + Math.floor(100000 + Math.random() * 900000) // Generates account numbers like AC123456
}

export const POST = async (req: NextRequest) => {
  try {
    const { name, email, password } = await req.json()

    // Check if the email already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    })
    if (existingUser) {
      return NextResponse.json({ error: 'Email already in use' }, { status: 400 })
    }

    // Hash the password before storing it
    const hashedPassword = await bcrypt.hash(password, 10)

    // Create the user and associated account
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        account: {
          create: {
            accountNumber: generateAccountNumber(), // Generate a unique account number
          }
        }
      },
    })

    return NextResponse.json({ message: 'User created successfully', user }, { status: 201 })
  } catch (err) {
    console.error('Error creating user:', err)
    return NextResponse.json({ error: 'Failed to create user' }, { status: 500 })
  }
}
