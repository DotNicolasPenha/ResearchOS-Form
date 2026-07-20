package dto

import (
	"regexp"

	"github.com/researchos/survey-api/internal/survey/domain"
)

var emailRegex = regexp.MustCompile(`^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$`)

type SurveyRequest struct {
	Metadata       MetadataDTO       `json:"metadata"`
	Respondent     RespondentDTO     `json:"respondent"`
	Fieldwork      FieldworkDTO      `json:"fieldwork"`
	Workflow       WorkflowDTO       `json:"workflow"`
	DataManagement DataManagementDTO `json:"data_management"`
	PainPoints     PainPointsDTO     `json:"pain_points"`
	Collaboration  CollaborationDTO  `json:"collaboration"`
	AI             AIDTO             `json:"artificial_intelligence"`
	Contact        ContactDTO        `json:"contact"`
}

type MetadataDTO struct {
	StartedAt   string `json:"startedAt"`
	CompletedAt string `json:"completedAt"`
}

type RespondentDTO struct {
	ResearchArea string `json:"researchArea"`
	Institution  string `json:"institution"`
	Role         string `json:"role"`
	Country      string `json:"country"`
	Experience   string `json:"experience"`
}

type FieldworkDTO struct {
	ExpeditionsPerYear   string   `json:"expeditionsPerYear"`
	DataRecordingMethod  []string `json:"dataRecordingMethod"`
	InternetAvailability string   `json:"internetAvailability"`
	Equipment            []string `json:"equipment"`
}

type WorkflowDTO struct {
	TimeConsumingStage  string `json:"timeConsumingStage"`
	HoursOrganizingData string `json:"hoursOrganizingData"`
}

type DataManagementDTO struct {
	Tools            []string `json:"tools"`
	FileOrganization string   `json:"fileOrganization"`
}

type PainPointsDTO struct {
	TimeConsumingTasks string `json:"timeConsumingTasks"`
	LastDifficulty     string `json:"lastDifficulty"`
	WishedExistence    string `json:"wishedExistence"`
	AutomateTask       string `json:"automateTask"`
}

type CollaborationDTO struct {
	TeamSize     string `json:"teamSize"`
	DataSharing  string `json:"dataSharing"`
	LostFiles    string `json:"lostFiles"`
	BackupMethod string `json:"backupMethod"`
}

type AIDTO struct {
	AIUseCases   []string `json:"aiUseCases"`
	NeverTrustAI string   `json:"neverTrustAI"`
}

type ContactDTO struct {
	WillingToInterview string `json:"willingToInterview"`
	Name               string `json:"name"`
	Email              string `json:"email"`
	Institution        string `json:"institution"`
}

func (r *SurveyRequest) Validate() string {
	if r.Metadata.StartedAt == "" {
		return "metadata.startedAt is required"
	}
	if r.Respondent.ResearchArea == "" {
		return "respondent.researchArea is required"
	}
	if r.Respondent.Experience == "" {
		return "respondent.experience is required"
	}
	if r.Fieldwork.ExpeditionsPerYear == "" {
		return "fieldwork.expeditionsPerYear is required"
	}
	if r.Workflow.TimeConsumingStage == "" {
		return "workflow.timeConsumingStage is required"
	}
	if r.Collaboration.TeamSize == "" {
		return "collaboration.teamSize is required"
	}
	if r.Contact.WillingToInterview == "" {
		return "contact.willingToInterview is required"
	}
	if r.Contact.WillingToInterview == "yes" {
		if r.Contact.Name == "" {
			return "contact.name is required when willing to interview"
		}
		if r.Contact.Email == "" {
			return "contact.email is required when willing to interview"
		}
		if !emailRegex.MatchString(r.Contact.Email) {
			return "invalid email"
		}
	}
	return ""
}

func (r *SurveyRequest) ToDomain() domain.SurveyData {
	return domain.SurveyData{
		Metadata: domain.Metadata{
			StartedAt:   r.Metadata.StartedAt,
			CompletedAt: r.Metadata.CompletedAt,
		},
		Respondent: domain.Respondent{
			ResearchArea: r.Respondent.ResearchArea,
			Institution:  r.Respondent.Institution,
			Role:         r.Respondent.Role,
			Country:      r.Respondent.Country,
			Experience:   r.Respondent.Experience,
		},
		Fieldwork: domain.Fieldwork{
			ExpeditionsPerYear:   r.Fieldwork.ExpeditionsPerYear,
			DataRecordingMethod:  r.Fieldwork.DataRecordingMethod,
			InternetAvailability: r.Fieldwork.InternetAvailability,
			Equipment:            r.Fieldwork.Equipment,
		},
		Workflow: domain.Workflow{
			TimeConsumingStage:  r.Workflow.TimeConsumingStage,
			HoursOrganizingData: r.Workflow.HoursOrganizingData,
		},
		DataManagement: domain.DataManagement{
			Tools:            r.DataManagement.Tools,
			FileOrganization: r.DataManagement.FileOrganization,
		},
		PainPoints: domain.PainPoints{
			TimeConsumingTasks: r.PainPoints.TimeConsumingTasks,
			LastDifficulty:     r.PainPoints.LastDifficulty,
			WishedExistence:    r.PainPoints.WishedExistence,
			AutomateTask:       r.PainPoints.AutomateTask,
		},
		Collaboration: domain.Collaboration{
			TeamSize:     r.Collaboration.TeamSize,
			DataSharing:  r.Collaboration.DataSharing,
			LostFiles:    r.Collaboration.LostFiles,
			BackupMethod: r.Collaboration.BackupMethod,
		},
		AI: domain.AI{
			AIUseCases:   r.AI.AIUseCases,
			NeverTrustAI: r.AI.NeverTrustAI,
		},
		Contact: domain.Contact{
			WillingToInterview: r.Contact.WillingToInterview,
			Name:               r.Contact.Name,
			Email:              r.Contact.Email,
			Institution:        r.Contact.Institution,
		},
	}
}
