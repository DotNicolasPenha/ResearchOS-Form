import { useState, useCallback } from 'react'
import { AnimatePresence } from 'framer-motion'
import { useSurveyStore } from '../store/useSurveyStore'
import { submitSurvey, ApiError } from '../services/api'
import { ProgressBar } from './ProgressBar'
import { Stepper } from './Stepper'
import { WelcomeScreen } from '../screens/WelcomeScreen'
import { OptionalFieldsNoticeScreen } from '../screens/OptionalFieldsNoticeScreen'
import { ProfileScreen } from '../screens/ProfileScreen'
import { FieldworkScreen } from '../screens/FieldworkScreen'
import { WorkflowScreen } from '../screens/WorkflowScreen'
import { DataManagementScreen } from '../screens/DataManagementScreen'
import { PainPointsScreen } from '../screens/PainPointsScreen'
import { CollaborationScreen } from '../screens/CollaborationScreen'
import { AIScreen } from '../screens/AIScreen'
import { InterviewScreen } from '../screens/InterviewScreen'
import { ThankYouScreen } from '../screens/ThankYouScreen'

const STEP_LABELS = [
  'Welcome', 'Notice', 'Profile', 'Fieldwork', 'Workflow',
  'Data', 'Problems', 'Collab', 'AI', 'Interview', 'Done',
]

const TOTAL_SURVEY_STEPS = 10

export function Wizard() {
  const { data, currentStep, updateField, nextStep, prevStep, goToStep } = useSurveyStore()
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  const updateRespondent = (field: keyof typeof data.respondent, value: string) =>
    updateField('respondent', field, value)

  const updateFieldwork = (field: keyof typeof data.fieldwork, value: string | string[]) =>
    updateField('fieldwork', field, value)

  const updateWorkflow = (field: keyof typeof data.workflow, value: string) =>
    updateField('workflow', field, value)

  const updateDataManagement = (field: keyof typeof data.data_management, value: string | string[]) =>
    updateField('data_management', field, value)

  const updatePainPoints = (field: keyof typeof data.pain_points, value: string) =>
    updateField('pain_points', field, value)

  const updateCollaboration = (field: keyof typeof data.collaboration, value: string) =>
    updateField('collaboration', field, value)

  const updateAI = (field: keyof typeof data.artificial_intelligence, value: string | string[]) =>
    updateField('artificial_intelligence', field, value)

  const updateContact = (field: keyof typeof data.contact, value: string) =>
    updateField('contact', field, value)

  const handleSubmit = useCallback(async () => {
    setSubmitting(true)
    setSubmitError(null)
    const completed = {
      ...data,
      metadata: { ...data.metadata, completedAt: new Date().toISOString() },
    }
    try {
      await submitSurvey(completed)
      nextStep()
    } catch (err) {
      if (err instanceof ApiError && err.status === 422) {
        setSubmitError(err.message)
      } else if (err instanceof DOMException && err.name === 'AbortError') {
        setSubmitError('O servidor demorou muito para responder. Tente novamente.')
      } else if (err instanceof TypeError && err.message === 'Failed to fetch') {
        setSubmitError('Não foi possível conectar ao servidor. Verifique sua internet.')
      } else {
        setSubmitError(err instanceof Error ? err.message : 'Erro ao enviar')
      }
    } finally {
      setSubmitting(false)
    }
  }, [data, nextStep])

  const isWelcome = currentStep === 0
  const isComplete = currentStep >= STEP_LABELS.length - 1

  return (
    <div className="min-h-screen bg-bg">
      <div className="max-w-lg mx-auto">
        {!isWelcome && !isComplete && (
          <div className="px-6 pt-4">
            <ProgressBar current={currentStep} total={TOTAL_SURVEY_STEPS} />
            <Stepper steps={STEP_LABELS} current={currentStep} onStepClick={goToStep} />
          </div>
        )}

        {submitError && (
          <div className="px-6 pt-2">
            <p className="text-red-500 text-sm text-center">{submitError}</p>
          </div>
        )}

        <AnimatePresence mode="wait">
          {isComplete ? (
            <ThankYouScreen key="done" />
          ) : (
            <>
              {currentStep === 0 && <WelcomeScreen key="welcome" onNext={nextStep} />}
              {currentStep === 1 && (
                <OptionalFieldsNoticeScreen
                  key="notice"
                  onNext={nextStep}
                  onBack={prevStep}
                />
              )}
              {currentStep === 2 && (
                <ProfileScreen
                  key="profile"
                  data={data.respondent}
                  onUpdate={updateRespondent}
                  onNext={nextStep}
                  onBack={prevStep}
                />
              )}
              {currentStep === 3 && (
                <FieldworkScreen
                  key="fieldwork"
                  data={data.fieldwork}
                  onUpdate={updateFieldwork}
                  onNext={nextStep}
                  onBack={prevStep}
                />
              )}
              {currentStep === 4 && (
                <WorkflowScreen
                  key="workflow"
                  data={data.workflow}
                  onUpdate={updateWorkflow}
                  onNext={nextStep}
                  onBack={prevStep}
                />
              )}
              {currentStep === 5 && (
                <DataManagementScreen
                  key="data"
                  data={data.data_management}
                  onUpdate={updateDataManagement}
                  onNext={nextStep}
                  onBack={prevStep}
                />
              )}
              {currentStep === 6 && (
                <PainPointsScreen
                  key="pain"
                  data={data.pain_points}
                  onUpdate={updatePainPoints}
                  onNext={nextStep}
                  onBack={prevStep}
                />
              )}
              {currentStep === 7 && (
                <CollaborationScreen
                  key="collab"
                  data={data.collaboration}
                  onUpdate={updateCollaboration}
                  onNext={nextStep}
                  onBack={prevStep}
                />
              )}
              {currentStep === 8 && (
                <AIScreen
                  key="ai"
                  data={data.artificial_intelligence}
                  onUpdate={updateAI}
                  onNext={nextStep}
                  onBack={prevStep}
                />
              )}
              {currentStep === 9 && (
                <InterviewScreen
                  key="interview"
                  data={data.contact}
                  onUpdate={updateContact}
                  onNext={handleSubmit}
                  onBack={prevStep}
                  submitting={submitting}
                />
              )}
            </>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
