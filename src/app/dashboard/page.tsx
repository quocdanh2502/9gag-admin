'use client'

import React, { useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { signOut } from 'next-auth/react'

import DefaultLayout from '@/layout'
import { deleteCookie } from '@/utils'
import { useCheckAuth, useSignOut } from '@/hooks/useAuth'

const Dashboard: React.FC = () => {
  useCheckAuth()
  const signOut = useSignOut()
  return (
    <DefaultLayout>
      <div>Hello</div>
      <button onClick={signOut}>logout</button>
    </DefaultLayout>
  )
}

export default Dashboard
