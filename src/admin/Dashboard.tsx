import { useCallback, useEffect, useState } from 'react'
import { FiEdit2, FiLogOut, FiPlus, FiTrash2 } from 'react-icons/fi'
import {
  ApiError,
  adminListProjects,
  createProject,
  deleteProject,
  updateProject,
  type ApiProject,
  type ProjectInput,
} from '@/lib/api'
import { ProjectForm } from '@/admin/ProjectForm'

function toFormInput(project: ApiProject): ProjectInput {
  return {
    title: project.title,
    tag: project.tag,
    description: project.description,
    stack: project.stack,
    liveUrl: project.liveUrl ?? '',
    githubUrl: project.githubUrl ?? '',
    featured: project.featured ?? false,
    position: project.position,
  }
}

export function Dashboard({ token, onLogout }: { token: string; onLogout: () => void }) {
  const [projects, setProjects] = useState<ApiProject[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [editingId, setEditingId] = useState<number | 'new' | null>(null)

  const load = useCallback(async () => {
    setIsLoading(true)
    setError(null)
    try {
      setProjects(await adminListProjects(token))
    } catch (err) {
      if (err instanceof ApiError && err.status === 401) return onLogout()
      setError(err instanceof Error ? err.message : 'Erro ao carregar projetos.')
    } finally {
      setIsLoading(false)
    }
  }, [token, onLogout])

  useEffect(() => {
    load()
  }, [load])

  const handleCreate = async (data: ProjectInput) => {
    await createProject(token, data)
    setEditingId(null)
    await load()
  }

  const handleUpdate = async (id: number, data: ProjectInput) => {
    await updateProject(token, id, data)
    setEditingId(null)
    await load()
  }

  const handleDelete = async (id: number, title: string) => {
    if (!window.confirm(`Excluir "${title}"? Essa ação não pode ser desfeita.`)) return
    await deleteProject(token, id)
    await load()
  }

  return (
    <div className="mx-auto min-h-screen max-w-4xl px-6 py-12">
      <div className="flex items-center justify-between">
        <div>
          <p className="font-mono text-sm text-accent-blue">Jardel.Maciel</p>
          <h1 className="mt-1 text-xl font-semibold text-ink-light dark:text-ink-dark">
            Projetos do portfólio
          </h1>
        </div>
        <button
          type="button"
          onClick={onLogout}
          className="flex items-center gap-2 rounded-full border border-border-light px-4 py-2 text-sm text-ink-light dark:border-border-dark dark:text-ink-dark"
        >
          <FiLogOut className="h-4 w-4" />
          Sair
        </button>
      </div>

      {error && <p className="mt-6 text-sm text-accent-red">{error}</p>}

      {editingId === 'new' && (
        <div className="mt-8">
          <ProjectForm onSubmit={handleCreate} onCancel={() => setEditingId(null)} />
        </div>
      )}

      <div className="mt-8 flex flex-col gap-4">
        {isLoading && <p className="text-sm text-ink-light-muted dark:text-ink-dark-muted">Carregando…</p>}

        {!isLoading &&
          projects.map((project) =>
            editingId === project.id ? (
              <ProjectForm
                key={project.id}
                initial={toFormInput(project)}
                onSubmit={(data) => handleUpdate(project.id, data)}
                onCancel={() => setEditingId(null)}
              />
            ) : (
              <div
                key={project.id}
                className="flex items-start justify-between gap-4 rounded-2xl border border-border-light p-5 dark:border-border-dark"
              >
                <div>
                  <p className="font-mono text-xs uppercase tracking-wide text-accent-blue">
                    {project.tag || 'sem tag'}
                  </p>
                  <h3 className="mt-1 font-medium text-ink-light dark:text-ink-dark">
                    {project.title}
                    {project.featured && (
                      <span className="ml-2 rounded-full bg-surface-light-raised px-2 py-0.5 text-xs font-normal text-ink-light-muted dark:bg-surface-dark-raised dark:text-ink-dark-muted">
                        destaque
                      </span>
                    )}
                  </h3>
                  <p className="mt-1 text-sm text-ink-light-muted dark:text-ink-dark-muted">
                    {project.description}
                  </p>
                </div>
                <div className="flex shrink-0 gap-2">
                  <button
                    type="button"
                    aria-label={`Editar ${project.title}`}
                    onClick={() => setEditingId(project.id)}
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-border-light text-ink-light-muted hover:text-accent-blue dark:border-border-dark dark:text-ink-dark-muted"
                  >
                    <FiEdit2 className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    aria-label={`Excluir ${project.title}`}
                    onClick={() => handleDelete(project.id, project.title)}
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-border-light text-ink-light-muted hover:text-accent-red dark:border-border-dark dark:text-ink-dark-muted"
                  >
                    <FiTrash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ),
          )}
      </div>

      {editingId === null && (
        <button
          type="button"
          onClick={() => setEditingId('new')}
          className="mt-6 flex items-center gap-2 rounded-full bg-ink-light px-5 py-2.5 text-sm font-medium text-surface-light transition-transform hover:scale-[1.02] dark:bg-ink-dark dark:text-surface-dark"
        >
          <FiPlus className="h-4 w-4" />
          Adicionar projeto
        </button>
      )}
    </div>
  )
}
