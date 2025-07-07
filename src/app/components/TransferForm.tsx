
'use client'

import { useState } from 'react'

interface TransferFormProps {
  onSuccess?: () => void // ✅ Optional to avoid "function not implemented" error
}

export default function TransferForm({ onSuccess }: TransferFormProps) {
  
  const [toEmailOrAccountNumber, setToEmailOrAccountNumber] = useState('')
  const [amount, setAmount] = useState('')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const numericAmount = parseFloat(amount)

    const res = await fetch('/api/transfer', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ toEmailOrAccountNumber, amount: numericAmount }),
    })

    const data = await res.json()

    if (res.ok) {
      setMessage('✅ Transfer successful! Redirecting to dashboard...')
      onSuccess?.() // ✅ Safely call the callback
    } else {
      setMessage(`❌ ${data.error}`)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-xl font-semibold">Transfer Money</h2>
      <input
        type="text"
        placeholder="Recipient's Email or Account Number"
        className="w-full border p-2 rounded"
        value={toEmailOrAccountNumber}
        onChange={(e) => setToEmailOrAccountNumber(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Amount"
        className="w-full border p-2 rounded"
        value={amount}
        onChange={(e) => setAmount((e.target.value))}
        required
      />
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
        Send
      </button>
      {message && <p className="text-sm mt-2">{message}</p>}
    </form>
  )
}
