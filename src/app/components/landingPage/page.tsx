'use client';

import Link from 'next/link'
import React from 'react'

const LandingPage = () => {
  return (
    <>
        <div className="flex flex-col text-center mt-20 w-full">
          <div className='justify-center items-center'>
      <h1 className="text-4xl font-[Verdana] mb-4"> Welcome to SimpleBank</h1>
      <p className="mb-6 font-[Verdana] text-gray-600">Secure and simple banking in one place.</p>
      <div className="flex justify-center gap-4">
        <Link href="/components/login" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Login
        </Link>
        <Link href="/components/register" className="bg-gray-300 text-gray-500 px-4 py-2 rounded hover:bg-gray-300">
          Register
        </Link>
      </div>
      </div>
    </div>
    </>
  )
}

export default LandingPage