import type { SurveyData } from '../types/survey'
import { AutoResizeTextarea } from '../components/AutoResizeTextarea'
import { NavigationButtons } from '../components/NavigationButtons'

interface PainPointsScreenProps {
  data: SurveyData['pain_points']
  onUpdate: (field: keyof SurveyData['pain_points'], value: string) => void
  onNext: () => void
  onBack: () => void
}

export function PainPointsScreen({ data, onUpdate, onNext, onBack }: PainPointsScreenProps) {
  return (
    <div className="px-6 py-4">
      <h2 className="text-xl font-bold text-text mb-1">Problemas</h2>
      <p className="text-text-secondary text-sm mb-2">Quais são suas maiores dificuldades?</p>
      <p className="text-text-secondary text-xs mb-6 italic">Obrigado por dedicar seu tempo. Campos opcionais são um agradecimento — responda só o que quiser.</p>

      <AutoResizeTextarea
        label="Quais tarefas mais consomem seu tempo?"
        value={data.timeConsumingTasks}
        onChange={v => onUpdate('timeConsumingTasks', v)}
      />

      <AutoResizeTextarea
        label="Qual foi a maior dificuldade na sua última pesquisa?"
        value={data.lastDifficulty}
        onChange={v => onUpdate('lastDifficulty', v)}
      />

      <AutoResizeTextarea
        label='Conte uma situação em que você pensou: "Isso deveria existir."'
        value={data.wishedExistence}
        onChange={v => onUpdate('wishedExistence', v)}
      />

      <AutoResizeTextarea
        label="Se pudesse automatizar apenas uma tarefa, qual seria?"
        value={data.automateTask}
        onChange={v => onUpdate('automateTask', v)}
      />

      <NavigationButtons onBack={onBack} onNext={onNext} />
    </div>
  )
}
