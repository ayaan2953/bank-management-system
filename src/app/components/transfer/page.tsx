'use client'

import { useState } from "react"

export default function TransferPage() {
  const [toId, setToId] = useState("")
  const [amount, setAmount] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Connect to transfer API
    alert(`Transferred $${amount} to account ID ${toId}`)
  }

  return (
    <div className="bg-white p-6 mt-10 rounded shadow max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Transfer Funds</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Recipient Account ID"
          className="w-full border p-2 rounded"
          value={toId}
          onChange={(e) => setToId(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Amount"
          className="w-full border p-2 rounded"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
        <button type="submit" className="w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700">
          Send
        </button>
      </form>
    </div>
  )
}
