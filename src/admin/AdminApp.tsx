import { useEffect } from 'react'
import { LoginForm } from '@/admin/LoginForm'
import { Dashboard } from '@/admin/Dashboard'
import { useAdminSession } from '@/admin/useAdminSession'

export function AdminApp() {
  const { token, login, logout } = useAdminSession()

  // Keep this route out of search engines — the real protection is the
  // password + JWT backend, this just avoids it showing up in results.
  useEffect(() => {
    const meta = document.createElement('meta')
    meta.name = 'robots'
    meta.content = 'noindex, nofollow'
    document.head.appendChild(meta)
    const previousTitle = document.title
    document.title = 'Admin — Jardel Maciel'
    return () => {
      document.head.removeChild(meta)
      document.title = previousTitle
    }
  }, [])

  if (!token) return <LoginForm onLogin={login} />
  return <Dashboard token={token} onLogout={logout} />
}
