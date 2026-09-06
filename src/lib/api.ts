import type { Project } from '@/data/projects'

/**
 * Base URL of the portfolio's admin backend. Configure it via the
 * VITE_API_URL env var (see .env.example). When it's not set, the public
 * site quietly falls back to the static project list in src/data/projects.ts
 * instead of breaking — see useProjects().
 */
export const API_URL = import.meta.env.VITE_API_URL

export interface ApiProject extends Project {
  id: number
  position: number
}

export class ApiError extends Error {
  status?: number

  constructor(message: string, status?: number) {
    super(message)
    this.status = status
  }
}

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  if (!API_URL) {
    throw new ApiError('VITE_API_URL não configurada')
  }

  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  })

  if (!response.ok) {
    const body = await response.json().catch(() => null)
    throw new ApiError(body?.error ?? `Erro ${response.status}`, response.status)
  }

  if (response.status === 204) return undefined as T
  return response.json() as Promise<T>
}

export function fetchProjects(): Promise<ApiProject[]> {
  return request('/api/projects')
}

export function login(password: string): Promise<{ token: string }> {
  return request('/api/admin/login', {
    method: 'POST',
    body: JSON.stringify({ password }),
  })
}

function authHeaders(token: string): HeadersInit {
  return { Authorization: `Bearer ${token}` }
}

export function adminListProjects(token: string): Promise<ApiProject[]> {
  return request('/api/admin/projects', { headers: authHeaders(token) })
}

export interface ProjectInput {
  title: string
  tag: string
  description: string
  stack: string[]
  images: string[]
  liveUrl: string
  githubUrl: string
  featured: boolean
  position: number
}

export const MAX_PROJECT_IMAGES = 5

/**
 * Uploads one image file to the backend (which forwards it to Cloudinary)
 * and returns its public URL. Bypasses request() because this is the one
 * call that sends multipart/form-data instead of JSON.
 */
export async function uploadImage(token: string, file: File): Promise<{ url: string }> {
  if (!API_URL) throw new ApiError('VITE_API_URL não configurada')

  const formData = new FormData()
  formData.append('file', file)

  const response = await fetch(`${API_URL}/api/admin/upload`, {
    method: 'POST',
    headers: authHeaders(token),
    body: formData,
  })

  if (!response.ok) {
    const body = await response.json().catch(() => null)
    throw new ApiError(body?.error ?? `Erro ${response.status}`, response.status)
  }

  return response.json()
}

export function createProject(token: string, data: ProjectInput): Promise<ApiProject> {
  return request('/api/admin/projects', {
    method: 'POST',
    headers: authHeaders(token),
    body: JSON.stringify(data),
  })
}

export function updateProject(
  token: string,
  id: number,
  data: ProjectInput,
): Promise<ApiProject> {
  return request(`/api/admin/projects/${id}`, {
    method: 'PUT',
    headers: authHeaders(token),
    body: JSON.stringify(data),
  })
}

export function deleteProject(token: string, id: number): Promise<void> {
  return request(`/api/admin/projects/${id}`, {
    method: 'DELETE',
    headers: authHeaders(token),
  })
}
