'use client'

import React from 'react'
import DepositForm from '../DepositForm'
import { useRouter } from 'next/navigation'

const DepositPage = () => {
  const router = useRouter()

  const handleSuccess = () => {
    setTimeout(() => {
      router.push('/components/dashboard')
    }, 5000)
  }

  return (
    <div>
      <DepositForm onSuccess={handleSuccess} />
    </div>
  )
}

export default DepositPage
