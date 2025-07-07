/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function RegisterPage() {
  const router = useRouter()
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [error, setError] = useState('')

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    setError('')

    const res = await fetch('/api/register', {
      method: 'POST',
      body: JSON.stringify(form),
      headers: { 'Content-Type': 'application/json' },
    })

    const data = await res.json()
    if (!res.ok) return setError(data.error)

    router.push('/components/login')
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-sm mx-auto mt-10">
      <input name="name" onChange={handleChange} placeholder="Name" className="w-full border p-2" />
      <input name="email" onChange={handleChange} placeholder="Email" className="w-full border p-2" />
      <input name="password" type="password" onChange={handleChange} placeholder="Password" className="w-full border p-2" />
      <button type="submit" className="bg-blue-600 text-white px-4 py-2">Register</button>
      {error && <p className="text-red-600">{error}</p>}
    </form>
  )
}
