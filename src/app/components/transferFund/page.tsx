'use client';

import React from 'react'
import TransferForm from '../TransferForm'
import { useRouter } from 'next/navigation'

const TransferFund = () => {
  const router = useRouter()

  const handleSuccess = () => {
    setTimeout(() => {
      router.push('/components/dashboard')
    }, 2000) // 2 second wait before redirecting
  }

  return (
    <div>
      <TransferForm onSuccess={handleSuccess} />
    </div>
  )
}

export default TransferFund
