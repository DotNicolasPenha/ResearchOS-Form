import type { SurveyData } from '../types/survey'
import { FloatingInput } from '../components/FloatingInput'
import { RadioCards } from '../components/RadioCards'
import { NavigationButtons } from '../components/NavigationButtons'

interface ProfileScreenProps {
  data: SurveyData['respondent']
  onUpdate: (field: keyof SurveyData['respondent'], value: string) => void
  onNext: () => void
  onBack: () => void
}

const EXPERIENCE_OPTIONS = ['< 1 ano', '1-3 anos', '3-5 anos', '5-10 anos', '10+ anos']

export function ProfileScreen({ data, onUpdate, onNext, onBack }: ProfileScreenProps) {
  const isValid = data.researchArea && data.experience

  return (
    <div className="px-6 py-4">
      <h2 className="text-xl font-bold text-text mb-1">Seu Perfil</h2>
      <p className="text-text-secondary text-sm mb-6">Conte-nos sobre sua trajetória na pesquisa</p>

      <FloatingInput
        label="Área de pesquisa"
        value={data.researchArea}
        onChange={v => onUpdate('researchArea', v)}
        required
      />
      <FloatingInput
        label="Instituição (opcional)"
        value={data.institution}
        onChange={v => onUpdate('institution', v)}
      />
      <FloatingInput
        label="Cargo / Função (opcional)"
        value={data.role}
        onChange={v => onUpdate('role', v)}
      />
      <FloatingInput
        label="País (opcional)"
        value={data.country}
        onChange={v => onUpdate('country', v)}
      />

      <div className="mb-4">
        <label className="block text-sm font-medium text-text mb-2">
          Tempo de experiência <span className="text-red-500">*</span>
        </label>
        <RadioCards
          options={EXPERIENCE_OPTIONS}
          value={data.experience}
          onChange={v => onUpdate('experience', v)}
        />
      </div>

      <NavigationButtons onBack={onBack} onNext={onNext} nextDisabled={!isValid} />
    </div>
  )
}
