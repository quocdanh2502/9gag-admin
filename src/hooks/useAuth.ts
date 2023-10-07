import axiosClient from '@/services/axiosClient'
import { deleteCookie } from '@/utils'
import { usePathname, useRouter } from 'next/navigation'
import { useCallback } from 'react'
import { useQuery } from './swr'

export const useSignOut = () => {
  const router = useRouter()
  return useCallback(() => {
    deleteCookie('token')
    router.push('/')
  }, [router])
}

export const useCheckAuth = () => {
  const path = usePathname()
  const router = useRouter()
  const { error } = useQuery(
    'auth',
    async () => {
      await axiosClient.get('user')
    },
    {
      onSuccess: () => {
        if (path === '/') {
          router.push('/dashboard')
        }
      },
      onError: () => {
        router.push('/')
      },
    }
  )

  return {
    isAuthenticated: !error,
  }
}
