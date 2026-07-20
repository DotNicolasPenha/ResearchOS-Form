package domain

import (
	"time"

	"github.com/google/uuid"
)

type Survey struct {
	ID        uuid.UUID  `json:"id"`
	CreatedAt time.Time  `json:"created_at"`
	Payload   SurveyData `json:"payload"`
}

type Metadata struct {
	StartedAt   string `json:"startedAt"`
	CompletedAt string `json:"completedAt"`
}

type Respondent struct {
	ResearchArea string `json:"researchArea"`
	Institution  string `json:"institution"`
	Role         string `json:"role"`
	Country      string `json:"country"`
	Experience   string `json:"experience"`
}

type Fieldwork struct {
	ExpeditionsPerYear   string   `json:"expeditionsPerYear"`
	DataRecordingMethod  []string `json:"dataRecordingMethod"`
	InternetAvailability string   `json:"internetAvailability"`
	Equipment            []string `json:"equipment"`
}

type Workflow struct {
	TimeConsumingStage  string `json:"timeConsumingStage"`
	HoursOrganizingData string `json:"hoursOrganizingData"`
}

type DataManagement struct {
	Tools            []string `json:"tools"`
	FileOrganization string   `json:"fileOrganization"`
}

type PainPoints struct {
	TimeConsumingTasks string `json:"timeConsumingTasks"`
	LastDifficulty     string `json:"lastDifficulty"`
	WishedExistence    string `json:"wishedExistence"`
	AutomateTask       string `json:"automateTask"`
}

type Collaboration struct {
	TeamSize     string `json:"teamSize"`
	DataSharing  string `json:"dataSharing"`
	LostFiles    string `json:"lostFiles"`
	BackupMethod string `json:"backupMethod"`
}

type AI struct {
	AIUseCases   []string `json:"aiUseCases"`
	NeverTrustAI string   `json:"neverTrustAI"`
}

type Contact struct {
	WillingToInterview string `json:"willingToInterview"`
	Name               string `json:"name"`
	Email              string `json:"email"`
	Institution        string `json:"institution"`
}

type SurveyData struct {
	Metadata       Metadata       `json:"metadata"`
	Respondent     Respondent     `json:"respondent"`
	Fieldwork      Fieldwork      `json:"fieldwork"`
	Workflow       Workflow       `json:"workflow"`
	DataManagement DataManagement `json:"data_management"`
	PainPoints     PainPoints     `json:"pain_points"`
	Collaboration  Collaboration  `json:"collaboration"`
	AI             AI             `json:"artificial_intelligence"`
	Contact        Contact        `json:"contact"`
}
