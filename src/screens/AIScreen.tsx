import type { SurveyData } from '../types/survey'
import { CheckboxCards } from '../components/CheckboxCards'
import { AutoResizeTextarea } from '../components/AutoResizeTextarea'
import { NavigationButtons } from '../components/NavigationButtons'

interface AIScreenProps {
  data: SurveyData['artificial_intelligence']
  onUpdate: (field: keyof SurveyData['artificial_intelligence'], value: string | string[]) => void
  onNext: () => void
  onBack: () => void
}

const AI_OPTIONS = [
  'Identificar espécies',
  'Organizar fotos',
  'Detectar erros',
  'Criar mapas',
  'Gerar gráficos',
  'Resumir pesquisas',
  'Encontrar padrões',
  'Outro',
]

export function AIScreen({ data, onUpdate, onNext, onBack }: AIScreenProps) {
  const isValid = data.aiUseCases.length > 0

  return (
    <div className="px-6 py-4">
      <h2 className="text-xl font-bold text-text mb-1">Inteligência Artificial</h2>
      <p className="text-text-secondary text-sm mb-6">Como a IA poderia ajudar sua pesquisa?</p>

      <div className="mb-6">
        <label className="block text-sm font-medium text-text mb-2">
          Você utilizaria IA para: <span className="text-red-500">*</span>
        </label>
        <CheckboxCards
          options={AI_OPTIONS}
          value={data.aiUseCases}
          onChange={v => onUpdate('aiUseCases', v)}
        />
      </div>

      <AutoResizeTextarea
        label="Existe alguma tarefa que você nunca confiaria para uma IA?"
        value={data.neverTrustAI}
        onChange={v => onUpdate('neverTrustAI', v)}
      />

      <NavigationButtons onBack={onBack} onNext={onNext} nextDisabled={!isValid} />
    </div>
  )
}
