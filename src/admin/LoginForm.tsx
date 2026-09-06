import { useState, type FormEvent } from 'react'
import { ApiError } from '@/lib/api'

export function LoginForm({ onLogin }: { onLogin: (password: string) => Promise<void> }) {
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError(null)
    setIsSubmitting(true)
    try {
      await onLogin(password)
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Não foi possível entrar.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-surface-light px-6 dark:bg-surface-dark">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm rounded-2xl border border-border-light p-8 dark:border-border-dark"
      >
        <p className="font-mono text-sm text-accent-blue">Jardel.Maciel</p>
        <h1 className="mt-2 text-xl font-semibold text-ink-light dark:text-ink-dark">
          Área administrativa
        </h1>
        <p className="mt-1 text-sm text-ink-light-muted dark:text-ink-dark-muted">
          Entre com a senha para gerenciar os projetos exibidos no site.
        </p>

        <label htmlFor="password" className="sr-only">
          Senha
        </label>
        <input
          id="password"
          type="password"
          autoFocus
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mt-6 w-full rounded-lg border border-border-light bg-surface-light px-3.5 py-2.5 text-sm text-ink-light outline-none transition-colors focus:border-accent-blue dark:border-border-dark dark:bg-surface-dark dark:text-ink-dark"
        />

        {error && <p className="mt-3 text-sm text-accent-red">{error}</p>}

        <button
          type="submit"
          disabled={isSubmitting}
          className="mt-6 w-full rounded-full bg-ink-light px-6 py-3 text-sm font-medium text-surface-light transition-transform hover:scale-[1.02] disabled:opacity-60 dark:bg-ink-dark dark:text-surface-dark"
        >
          {isSubmitting ? 'Entrando…' : 'Entrar'}
        </button>
      </form>
    </div>
  )
}
