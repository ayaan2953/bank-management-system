'use client'

import { useEffect, useState } from 'react'

interface Transaction {
  id: string
  amount: number
  createdAt: string
  from: { user: { email: string } }
  to: { user: { email: string } }
}

export default function TransactionHistory() {
  const [transactions, setTransactions] = useState<Transaction[]>([])

  useEffect(() => {
    const fetchTransactions = async () => {
      const res = await fetch('/api/transactions')
      const data = await res.json()
      if (res.ok) {
        setTransactions(data.transactions)
      }
    }

    fetchTransactions()
  }, [])

  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">Transaction History</h2>
      <ul className="space-y-2">
        {transactions.map((tx) => (
          <li key={tx.id} className="border rounded p-2">
            <div>
              <span className="font-medium">From:</span> {tx.from.user.email}
            </div>
            <div>
              <span className="font-medium">To:</span> {tx.to.user.email}
            </div>
            <div>
              <span className="font-medium">Amount:</span> ₹{tx.amount}
            </div>
            <div className="text-sm text-gray-500">
              {new Date(tx.createdAt).toLocaleString()}
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
