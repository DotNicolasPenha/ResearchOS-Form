import type { SurveyData } from '../types/survey'
import { RadioCards } from '../components/RadioCards'
import { AutoResizeTextarea } from '../components/AutoResizeTextarea'
import { NavigationButtons } from '../components/NavigationButtons'

interface CollaborationScreenProps {
  data: SurveyData['collaboration']
  onUpdate: (field: keyof SurveyData['collaboration'], value: string) => void
  onNext: () => void
  onBack: () => void
}

const TEAM_SIZES = ['1 (solo)', '2-3', '4-6', '7-10', '10+']

export function CollaborationScreen({ data, onUpdate, onNext, onBack }: CollaborationScreenProps) {
  const isValid = data.teamSize

  return (
    <div className="px-6 py-4">
      <h2 className="text-xl font-bold text-text mb-1">Colaboração</h2>
      <p className="text-text-secondary text-sm mb-6">Como você trabalha em equipe?</p>

      <div className="mb-6">
        <label className="block text-sm font-medium text-text mb-2">
          Quantas pessoas trabalham no mesmo projeto? <span className="text-red-500">*</span>
        </label>
        <RadioCards
          options={TEAM_SIZES}
          value={data.teamSize}
          onChange={v => onUpdate('teamSize', v)}
        />
      </div>

      <AutoResizeTextarea
        label="Como compartilham dados? (opcional)"
        value={data.dataSharing}
        onChange={v => onUpdate('dataSharing', v)}
      />

      <div className="mb-6">
        <label className="block text-sm font-medium text-text mb-2">
          Já aconteceu de perder arquivos ou versões importantes? <span className="text-text-secondary text-xs">(opcional)</span>
        </label>
        <RadioCards
          options={['Sim', 'Não']}
          value={data.lostFiles}
          onChange={v => onUpdate('lostFiles', v)}
        />
      </div>

      <AutoResizeTextarea
        label="Como fazem backup dos dados? (opcional)"
        value={data.backupMethod}
        onChange={v => onUpdate('backupMethod', v)}
      />

      <NavigationButtons onBack={onBack} onNext={onNext} nextDisabled={!isValid} />
    </div>
  )
}
