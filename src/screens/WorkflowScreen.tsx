import type { SurveyData } from '../types/survey'
import { RadioCards } from '../components/RadioCards'
import { FloatingInput } from '../components/FloatingInput'
import { NavigationButtons } from '../components/NavigationButtons'

interface WorkflowScreenProps {
  data: SurveyData['workflow']
  onUpdate: (field: keyof SurveyData['workflow'], value: string) => void
  onNext: () => void
  onBack: () => void
}

const STAGE_OPTIONS = [
  'Planejamento',
  'Campo',
  'Organização',
  'Limpeza dos dados',
  'Estatística',
  'Mapas',
  'Escrita do artigo',
]

export function WorkflowScreen({ data, onUpdate, onNext, onBack }: WorkflowScreenProps) {
  const isValid = data.timeConsumingStage

  return (
    <div className="px-6 py-4">
      <h2 className="text-xl font-bold text-text mb-1">Fluxo de Trabalho</h2>
      <p className="text-text-secondary text-sm mb-2">Pense na sua pesquisa mais recente.</p>
      <p className="text-text-secondary text-xs mb-6 italic">Obrigado por dedicar seu tempo. Campos opcionais são um agradecimento — responda só o que quiser.</p>

      <div className="mb-6">
        <label className="block text-sm font-medium text-text mb-2">
          Qual etapa consumiu mais tempo? <span className="text-red-500">*</span>
        </label>
        <RadioCards
          options={STAGE_OPTIONS}
          value={data.timeConsumingStage}
          onChange={v => onUpdate('timeConsumingStage', v)}
        />
      </div>

      <FloatingInput
        label="Horas aproximadas organizando dados após a coleta (opcional)"
        value={data.hoursOrganizingData}
        onChange={v => onUpdate('hoursOrganizingData', v)}
        type="number"
      />

      <NavigationButtons onBack={onBack} onNext={onNext} nextDisabled={!isValid} />
    </div>
  )
}
