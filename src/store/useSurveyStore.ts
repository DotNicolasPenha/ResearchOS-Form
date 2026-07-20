import { useState, useCallback, useEffect } from 'react'
import type { SurveyData } from '../types/survey'
import { createInitialData } from '../types/survey'

const STORAGE_KEY = 'researchos-survey'

function loadSaved(): SurveyData {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) return JSON.parse(saved)
  } catch {}
  return createInitialData()
}

export function useSurveyStore() {
  const [data, setData] = useState<SurveyData>(loadSaved)
  const [currentStep, setCurrentStep] = useState(0)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  }, [data])

  const updateField = useCallback(<K extends keyof SurveyData>(
    section: K,
    field: keyof SurveyData[K],
    value: SurveyData[K][keyof SurveyData[K]]
  ) => {
    setData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }))
  }, [])

  const nextStep = useCallback(() => setCurrentStep(s => s + 1), [])
  const prevStep = useCallback(() => setCurrentStep(s => Math.max(0, s - 1)), [])
  const goToStep = useCallback((step: number) => setCurrentStep(step), [])

  const reset = useCallback(() => {
    setData(createInitialData())
    setCurrentStep(0)
    localStorage.removeItem(STORAGE_KEY)
  }, [])

  return { data, currentStep, updateField, nextStep, prevStep, goToStep, reset }
}
