import type { SurveyData } from '../types/survey'
import { CheckboxCards } from '../components/CheckboxCards'
import { AutoResizeTextarea } from '../components/AutoResizeTextarea'
import { NavigationButtons } from '../components/NavigationButtons'

interface DataManagementScreenProps {
  data: SurveyData['data_management']
  onUpdate: (field: keyof SurveyData['data_management'], value: string | string[]) => void
  onNext: () => void
  onBack: () => void
}

const TOOL_OPTIONS = [
  'Excel', 'Google Sheets', 'QGIS', 'ArcGIS', 'R', 'Python',
  'Zotero', 'Google Drive', 'Dropbox', 'Outro',
]

export function DataManagementScreen({ data, onUpdate, onNext, onBack }: DataManagementScreenProps) {
  const isValid = data.tools.length > 0

  return (
    <div className="px-6 py-4">
      <h2 className="text-xl font-bold text-text mb-1">Organização dos Dados</h2>
      <p className="text-text-secondary text-sm mb-6">Como você organiza seus dados de pesquisa?</p>

      <div className="mb-6">
        <label className="block text-sm font-medium text-text mb-2">
          Quais ferramentas utiliza? <span className="text-red-500">*</span>
        </label>
        <CheckboxCards
          options={TOOL_OPTIONS}
          value={data.tools}
          onChange={v => onUpdate('tools', v)}
        />
      </div>

      <AutoResizeTextarea
        label="Como organiza fotos e arquivos da pesquisa?"
        value={data.fileOrganization}
        onChange={v => onUpdate('fileOrganization', v)}
      />

      <NavigationButtons onBack={onBack} onNext={onNext} nextDisabled={!isValid} />
    </div>
  )
}
