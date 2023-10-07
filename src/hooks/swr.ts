import { use } from 'react'
import useSWR, { SWRConfig } from 'swr'
import useSWRMutation from 'swr/mutation'

export const useQuery = useSWR
export const useMutation = useSWRMutation
