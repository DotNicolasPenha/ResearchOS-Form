import type { SurveyData } from '../types/survey'

const API_URL = import.meta.env.VITE_API_URL || ''
const TIMEOUT = 15_000

export class ApiError extends Error {
  status: number
  constructor(message: string, status: number) {
    super(message)
    this.name = 'ApiError'
    this.status = status
  }
}

export async function submitSurvey(data: SurveyData): Promise<void> {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), TIMEOUT)

  try {
    const url = API_URL ? `${API_URL}/send-form` : '/send-form'
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
      signal: controller.signal,
    })

    if (!res.ok) {
      const body = await res.json().catch(() => null)
      throw new ApiError(body?.error || `Erro ${res.status}`, res.status)
    }
  } finally {
    clearTimeout(timer)
  }
}
