/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import LogoutButton from '../LogoutButton'


export default function Dashboard() {
  const router = useRouter()
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  // Fetch account information
  const fetchData = async () => {
    try {
      const res = await fetch('/api/account') // Fetch account data from the API
      const json = await res.json()

      if (res.ok) {
        setData(json) // If the API is successful, store the data
      } else {
        console.error('Error fetching account:', json.error) // Log any errors
      }
    } catch (err) {
      console.error('Failed to fetch account data:', err) // Handle network or other errors
    } finally {
      setLoading(false) // End loading after data is fetched
    }
  }

  // Effect to fetch data when component mounts
  useEffect(() => {
    fetchData()
  }, [])

  // Callback function to be passed to TransferForm and DepositForm to trigger a re-fetch
  const handleTransactionSuccess = () => {
    fetchData() // Fetch updated data after transaction or deposit
  }

  // If still loading, show a loading message
  if (loading) return <div>Loading...</div>

  // If there's an error fetching account data
  if (data?.error) return <div>Error: {data.error}</div>

  // If account data is successfully fetched, render it
  return (
    <div className="p-4">
      <div>
      <h1 className="text-3xl m-2 font-semibold">Welcome back, <span className='text-gray-400'>{data?.user?.name || 'User'}</span></h1>
      <p className="text-xl m-2">Email: <span className='text-gray-400'>{data?.user.email}</span></p>
      <p className="text-xl m-2">Account Number: <span className='text-gray-400'>{data?.accountNumber}</span></p>
      <p className="text-xl m-2">Balance: <span className='text-gray-400'>₹{data?.balance?.toFixed(2)}</span></p>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-4">
      <button className="mt-2 bg-blue-500 text-white text-xl px-4 py-2 rounded" type="button" onClick={() => router.push('/components/depositFund')}>
      Deposit Funds
    </button>

      <button className="mt-2 bg-blue-500 text-white text-xl px-4 py-2 rounded" type="button" onClick={() => router.push('/components/transferFund')}>
      Transfer Funds
    </button>
      </div>

      <div className="mt-4">
        <h2 className="text-lg font-medium">Transaction History</h2>
        <ul className="mt-2 space-y-2">
          {data?.transactions?.length > 0 ? (
            data.transactions.map((transaction: any) => (
              <li key={transaction.id} className="border p-2">
                <div>
                  {transaction.from ? (
                    <>
                      <strong>{transaction.from.user?.name}</strong> sent{' '}
                      <span className="text-green-600">₹{transaction.amount}</span> to{' '}
                      <strong>{transaction.to.user?.name}</strong>
                    </>
                  ) : (
                    <>
                      <strong>Deposit</strong> of{' '}
                      <span className="text-green-600">₹{transaction.amount}</span>
                    </>
                  )}
                </div>
                <div className="text-sm text-gray-500">
                  {new Date(transaction.createdAt).toLocaleDateString()}
                </div>
              </li>
            ))
          ) : (
            <li>No transactions yet</li>
          )}
        </ul>
        <div className='mt-3'>
        <LogoutButton />
        </div>
      </div>
    </div>
  )
}
