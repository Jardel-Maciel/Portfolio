import { useRef, useState, type ChangeEvent, type FormEvent, type ReactNode } from 'react'
import { FiX } from 'react-icons/fi'
import { ApiError, MAX_PROJECT_IMAGES, uploadImage, type ProjectInput } from '@/lib/api'

const emptyForm: ProjectInput = {
  title: '',
  tag: '',
  description: '',
  stack: [],
  images: [],
  liveUrl: '',
  githubUrl: '',
  featured: false,
  position: 0,
}

const MAX_IMAGE_BYTES = 8 * 1024 * 1024

interface ProjectFormProps {
  token: string
  initial?: ProjectInput
  onSubmit: (data: ProjectInput) => Promise<void>
  onCancel: () => void
}

export function ProjectForm({ token, initial, onSubmit, onCancel }: ProjectFormProps) {
  const [form, setForm] = useState<ProjectInput>(initial ?? emptyForm)
  const [stackText, setStackText] = useState((initial?.stack ?? []).join(', '))
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadError, setUploadError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const remainingSlots = MAX_PROJECT_IMAGES - form.images.length

  const handleFilesSelected = async (event: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files ?? [])
    event.target.value = ''
    if (files.length === 0) return

    const toUpload = files.slice(0, remainingSlots)
    setUploadError(null)
    setIsUploading(true)
    try {
      for (const file of toUpload) {
        if (!file.type.startsWith('image/')) {
          setUploadError(`"${file.name}" não é uma imagem.`)
          continue
        }
        if (file.size > MAX_IMAGE_BYTES) {
          setUploadError(`"${file.name}" passa de 8MB.`)
          continue
        }
        const { url } = await uploadImage(token, file)
        setForm((f) => ({ ...f, images: [...f.images, url] }))
      }
    } catch (err) {
      setUploadError(err instanceof ApiError ? err.message : 'Não foi possível enviar a imagem.')
    } finally {
      setIsUploading(false)
    }
  }

  const removeImage = (url: string) => {
    setForm((f) => ({ ...f, images: f.images.filter((img) => img !== url) }))
  }

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

      <Field label={`Imagens do projeto (até ${MAX_PROJECT_IMAGES}, opcional)`}>
        <div className="flex flex-wrap gap-3">
          {form.images.map((url) => (
            <div key={url} className="group relative h-20 w-32 overflow-hidden rounded-lg border border-border-light dark:border-border-dark">
              <img src={url} alt="" className="h-full w-full object-cover" />
              <button
                type="button"
                aria-label="Remover imagem"
                onClick={() => removeImage(url)}
                className="absolute right-1 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-surface-dark/80 text-surface-light opacity-0 transition-opacity group-hover:opacity-100"
              >
                <FiX className="h-3.5 w-3.5" />
              </button>
            </div>
          ))}

          {remainingSlots > 0 && (
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={isUploading}
              className="flex h-20 w-32 flex-col items-center justify-center gap-1 rounded-lg border border-dashed border-border-light text-xs text-ink-light-muted transition-colors hover:border-accent-blue hover:text-accent-blue disabled:opacity-60 dark:border-border-dark dark:text-ink-dark-muted"
            >
              {isUploading ? 'Enviando…' : 'Adicionar'}
            </button>
          )}
        </div>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/png,image/jpeg,image/webp,image/gif"
          multiple
          onChange={handleFilesSelected}
          className="hidden"
        />
        {uploadError && <p className="mt-1 text-xs text-accent-red">{uploadError}</p>}
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
