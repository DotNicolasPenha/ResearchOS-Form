export interface SurveyData {
  metadata: {
    startedAt: string
    completedAt: string | null
  }
  respondent: {
    researchArea: string
    institution: string
    role: string
    country: string
    experience: string
  }
  fieldwork: {
    expeditionsPerYear: string
    dataRecordingMethod: string[]
    internetAvailability: string
    equipment: string[]
  }
  workflow: {
    timeConsumingStage: string
    hoursOrganizingData: string
  }
  data_management: {
    tools: string[]
    fileOrganization: string
  }
  pain_points: {
    timeConsumingTasks: string
    lastDifficulty: string
    wishedExistence: string
    automateTask: string
  }
  collaboration: {
    teamSize: string
    dataSharing: string
    lostFiles: string
    backupMethod: string
  }
  artificial_intelligence: {
    aiUseCases: string[]
    neverTrustAI: string
  }
  contact: {
    willingToInterview: string
    name: string
    email: string
    institution: string
  }
}

export function createInitialData(): SurveyData {
  return {
    metadata: {
      startedAt: new Date().toISOString(),
      completedAt: null,
    },
  respondent: {
    researchArea: '',
    institution: '',
    role: '',
    country: '',
    experience: '',
  },
  fieldwork: {
    expeditionsPerYear: '',
    dataRecordingMethod: [],
    internetAvailability: '',
    equipment: [],
  },
  workflow: {
    timeConsumingStage: '',
    hoursOrganizingData: '',
  },
  data_management: {
    tools: [],
    fileOrganization: '',
  },
  pain_points: {
    timeConsumingTasks: '',
    lastDifficulty: '',
    wishedExistence: '',
    automateTask: '',
  },
  collaboration: {
    teamSize: '',
    dataSharing: '',
    lostFiles: '',
    backupMethod: '',
  },
  artificial_intelligence: {
    aiUseCases: [],
    neverTrustAI: '',
  },
  contact: {
    willingToInterview: '',
    name: '',
    email: '',
    institution: '',
  },
}
}
