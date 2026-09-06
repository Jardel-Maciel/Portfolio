import { useCallback, useState } from 'react'
import { login as apiLogin } from '@/lib/api'

const STORAGE_KEY = 'jm-admin-token'

export function useAdminSession() {
  const [token, setToken] = useState<string | null>(() =>
    window.localStorage.getItem(STORAGE_KEY),
  )

  const login = useCallback(async (password: string) => {
    const { token } = await apiLogin(password)
    window.localStorage.setItem(STORAGE_KEY, token)
    setToken(token)
  }, [])

  const logout = useCallback(() => {
    window.localStorage.removeItem(STORAGE_KEY)
    setToken(null)
  }, [])

  return { token, login, logout }
}
