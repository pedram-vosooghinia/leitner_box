"use client"
import { SWRConfig } from 'swr'
import { api } from '@/services/api'
interface SwrProviderProps {
  children: React.ReactNode;
}


export default function SwrProvider({ children }:SwrProviderProps) {
  const fetcher = (url:string) => api.get(url).then((res: {data:unknown}) => res.data)

  return (
      <>
        <SWRConfig
          value={{
            fetcher,
            revalidateOnFocus: false, 
            errorRetryCount: 3,
            refreshWhenOffline:true
          }}
        >
          {children}
        </SWRConfig>
      </>
  )
}
