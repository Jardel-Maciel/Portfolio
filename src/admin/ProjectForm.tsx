import { useState, type FormEvent, type ReactNode } from 'react'
import type { ProjectInput } from '@/lib/api'

const emptyForm: ProjectInput = {
  title: '',
  tag: '',
  description: '',
  stack: [],
  liveUrl: '',
  githubUrl: '',
  featured: false,
  position: 0,
}

interface ProjectFormProps {
  initial?: ProjectInput
  onSubmit: (data: ProjectInput) => Promise<void>
  onCancel: () => void
}

export function ProjectForm({ initial, onSubmit, onCancel }: ProjectFormProps) {
  const [form, setForm] = useState<ProjectInput>(initial ?? emptyForm)
  const [stackText, setStackText] = useState((initial?.stack ?? []).join(', '))
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError(null)
    setIsSubmitting(true)
    try {
      await onSubmit({
        ...form,
        stack: stackText
          .split(',')
          .map((item) => item.trim())
          .filter(Boolean),
      })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Não foi possível salvar.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 rounded-2xl border border-border-light p-6 dark:border-border-dark"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Título">
          <input
            required
            value={form.title}
            onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
            className={inputClass}
          />
        </Field>
        <Field label="Tag (subtítulo)">
          <input
            value={form.tag}
            onChange={(e) => setForm((f) => ({ ...f, tag: e.target.value }))}
            className={inputClass}
          />
        </Field>
      </div>

      <Field label="Descrição">
        <textarea
          rows={3}
          value={form.description}
          onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
          className={`${inputClass} resize-none`}
        />
      </Field>

      <Field label="Tecnologias (separadas por vírgula)">
        <input
          value={stackText}
          onChange={(e) => setStackText(e.target.value)}
          placeholder="React, TypeScript, Flask"
          className={inputClass}
        />
      </Field>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="URL do projeto (opcional)">
          <input
            type="url"
            value={form.liveUrl}
            onChange={(e) => setForm((f) => ({ ...f, liveUrl: e.target.value }))}
            className={inputClass}
          />
        </Field>
        <Field label="URL do GitHub (opcional)">
          <input
            type="url"
            value={form.githubUrl}
            onChange={(e) => setForm((f) => ({ ...f, githubUrl: e.target.value }))}
            className={inputClass}
          />
        </Field>
      </div>

      <div className="flex flex-wrap items-center gap-6">
        <label className="flex items-center gap-2 text-sm text-ink-light dark:text-ink-dark">
          <input
            type="checkbox"
            checked={form.featured}
            onChange={(e) => setForm((f) => ({ ...f, featured: e.target.checked }))}
            className="h-4 w-4 accent-accent-blue"
          />
          Destacar (card ocupa 2 colunas)
        </label>

        <label className="flex items-center gap-2 text-sm text-ink-light dark:text-ink-dark">
          Ordem
          <input
            type="number"
            value={form.position}
            onChange={(e) => setForm((f) => ({ ...f, position: Number(e.target.value) }))}
            className="w-20 rounded-lg border border-border-light bg-surface-light px-2 py-1 text-sm text-ink-light outline-none focus:border-accent-blue dark:border-border-dark dark:bg-surface-dark dark:text-ink-dark"
          />
        </label>
      </div>

      {error && <p className="text-sm text-accent-red">{error}</p>}

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded-full bg-ink-light px-5 py-2.5 text-sm font-medium text-surface-light transition-transform hover:scale-[1.02] disabled:opacity-60 dark:bg-ink-dark dark:text-surface-dark"
        >
          {isSubmitting ? 'Salvando…' : 'Salvar'}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="rounded-full border border-border-light px-5 py-2.5 text-sm font-medium text-ink-light dark:border-border-dark dark:text-ink-dark"
        >
          Cancelar
        </button>
      </div>
    </form>
  )
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="flex flex-col gap-1.5 text-sm">
      <span className="text-xs font-medium text-ink-light-muted dark:text-ink-dark-muted">
        {label}
      </span>
      {children}
    </label>
  )
}

const inputClass =
  'rounded-lg border border-border-light bg-surface-light px-3.5 py-2.5 text-sm text-ink-light outline-none transition-colors focus:border-accent-blue dark:border-border-dark dark:bg-surface-dark dark:text-ink-dark'
