'use client'

import { useState } from 'react'

interface DepositFormProps {
  onSuccess: () => void // Callback function to trigger after successful deposit
}

export default function DepositForm({ onSuccess }: DepositFormProps) {
  const [amount, setAmount] = useState('')
  const [message, setMessage] = useState('')

  const handleDeposit = async () => {
    const res = await fetch('/api/deposit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount: parseFloat(amount) }),
    })

    const data = await res.json()
    if (res.ok) {
      setMessage(`✅ Deposit successful! New balance: ₹${data.balance} Redirecting to dashboard in 5 seconds...`)
      onSuccess() // Trigger the callback to refresh the data
    } else {
      setMessage(`❌ Error: ${data.error}`)
    }
  }

  return (
    <div className="p-4 border rounded shadow mt-4 max-w-md">
      <h2 className="text-lg font-semibold mb-2">Deposit Money</h2>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Enter amount"
        className="p-2 border rounded w-full"
      />
      <button
        onClick={handleDeposit}
        className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
      >
        Deposit
      </button>
      {message && <p className="mt-2 text-sm">{message}</p>}
    </div>
  )
}
