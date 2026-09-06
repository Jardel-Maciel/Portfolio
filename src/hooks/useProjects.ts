import { useEffect, useState } from 'react'
import { fetchProjects } from '@/lib/api'
import { projects as fallbackProjects, type Project } from '@/data/projects'

/**
 * Loads the project list from the admin backend so projects added via
 * /admin show up here without a redeploy. If the API isn't configured
 * (no VITE_API_URL) or is unreachable, the static list in
 * src/data/projects.ts is used instead — the section never renders empty.
 */
export function useProjects(): Project[] {
  const [projects, setProjects] = useState<Project[]>(fallbackProjects)

  useEffect(() => {
    let cancelled = false

    fetchProjects()
      .then((data) => {
        if (!cancelled && data.length > 0) setProjects(data)
      })
      .catch(() => {
        // No backend configured, or it's unreachable — keep the fallback.
      })

    return () => {
      cancelled = true
    }
  }, [])

  return projects
}
