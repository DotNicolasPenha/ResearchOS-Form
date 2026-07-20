import type { SurveyData } from '../types/survey'
import { RadioCards } from '../components/RadioCards'
import { FloatingInput } from '../components/FloatingInput'
import { NavigationButtons } from '../components/NavigationButtons'

interface InterviewScreenProps {
  data: SurveyData['contact']
  onUpdate: (field: keyof SurveyData['contact'], value: string) => void
  onNext: () => void
  onBack: () => void
  submitting?: boolean
}

export function InterviewScreen({ data, onUpdate, onNext, onBack, submitting }: InterviewScreenProps) {
  const isValid = data.willingToInterview

  return (
    <div className="px-6 py-4">
      <h2 className="text-xl font-bold text-text mb-1">Entrevista</h2>
      <p className="text-text-secondary text-sm mb-6">Gostaria de participar mais?</p>

      <div className="mb-6">
        <label className="block text-sm font-medium text-text mb-2">
          Gostaria de participar de uma conversa rápida quando tivermos um protótipo? <span className="text-red-500">*</span>
        </label>
        <RadioCards
          options={['Sim', 'Não']}
          value={data.willingToInterview}
          onChange={v => onUpdate('willingToInterview', v)}
        />
      </div>

      <FloatingInput
        label="Nome (opcional)"
        value={data.name}
        onChange={v => onUpdate('name', v)}
      />
      <FloatingInput
        label="E-mail (opcional)"
        value={data.email}
        onChange={v => onUpdate('email', v)}
        type="email"
      />
      <FloatingInput
        label="Instituição (opcional)"
        value={data.institution}
        onChange={v => onUpdate('institution', v)}
      />

      <NavigationButtons
        onBack={onBack}
        onNext={onNext}
        nextLabel="Enviar"
        nextDisabled={!isValid || submitting}
      />
    </div>
  )
}
