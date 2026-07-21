import type { SurveyData } from '../types/survey'
import { RadioCards } from '../components/RadioCards'
import { CheckboxCards } from '../components/CheckboxCards'
import { NavigationButtons } from '../components/NavigationButtons'

interface FieldworkScreenProps {
  data: SurveyData['fieldwork']
  onUpdate: (field: keyof SurveyData['fieldwork'], value: string | string[]) => void
  onNext: () => void
  onBack: () => void
}

const RECORDING_METHODS = ['Papel', 'Planilha', 'Aplicativo', 'Outro']
const INTERNET_OPTIONS = ['Nunca', 'Algumas horas', 'Dias', 'Semanas']
const EQUIPMENT_OPTIONS = ['GPS', 'Drone', 'Tablet', 'Celular', 'Notebook', 'Sensores', 'Câmera', 'Outro']

export function FieldworkScreen({ data, onUpdate, onNext, onBack }: FieldworkScreenProps) {
  const isValid = data.expeditionsPerYear && data.dataRecordingMethod.length > 0 && data.internetAvailability

  return (
    <div className="px-6 py-4">
      <h2 className="text-xl font-bold text-text mb-1">Pesquisa de Campo</h2>
      <p className="text-text-secondary text-sm mb-6">Conte-nos sobre suas expedições</p>

      <div className="mb-6">
        <label className="block text-sm font-medium text-text mb-2">
          Quantas expedições realiza por ano? <span className="text-red-500">*</span>
        </label>
        <RadioCards
          options={['1-2', '3-5', '6-10', '10+']}
          value={data.expeditionsPerYear}
          onChange={v => onUpdate('expeditionsPerYear', v)}
        />
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-text mb-2">
          Como registra os dados em campo? <span className="text-red-500">*</span>
        </label>
        <CheckboxCards
          options={RECORDING_METHODS}
          value={data.dataRecordingMethod}
          onChange={v => onUpdate('dataRecordingMethod', v)}
        />
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-text mb-2">
          Nas expedições, trabalha sem internet? <span className="text-red-500">*</span>
        </label>
        <RadioCards
          options={INTERNET_OPTIONS}
          value={data.internetAvailability}
          onChange={v => onUpdate('internetAvailability', v)}
        />
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-text mb-2">
          Quais equipamentos utiliza? <span className="text-text-secondary text-xs">(opcional)</span>
        </label>
        <CheckboxCards
          options={EQUIPMENT_OPTIONS}
          value={data.equipment}
          onChange={v => onUpdate('equipment', v)}
        />
      </div>

      <NavigationButtons onBack={onBack} onNext={onNext} nextDisabled={!isValid} />
    </div>
  )
}
