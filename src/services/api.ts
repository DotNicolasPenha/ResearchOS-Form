import type { SurveyData } from '../types/survey'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080'

export async function submitSurvey(data: SurveyData): Promise<void> {
  const res = await fetch(`${API_URL}/send-form`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })

  if (!res.ok) {
    const body = await res.json().catch(() => null)
    throw new Error(body?.error || `HTTP ${res.status}`)
  }
}
