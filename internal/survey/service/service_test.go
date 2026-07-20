package service

import (
	"context"
	"errors"
	"testing"

	"github.com/researchos/survey-api/internal/survey/dto"
	"github.com/researchos/survey-api/internal/survey/domain"
)

type mockRepo struct {
	err      error
	surveys  []domain.Survey
}

func (m *mockRepo) Save(ctx context.Context, survey *domain.Survey) error {
	return m.err
}

func (m *mockRepo) FindAll(ctx context.Context) ([]domain.Survey, error) {
	return m.surveys, m.err
}

func validRequest() *dto.SurveyRequest {
	return &dto.SurveyRequest{
		Metadata: dto.MetadataDTO{StartedAt: "2025-01-01T10:00:00Z"},
		Respondent: dto.RespondentDTO{
			ResearchArea: "Botânica", Institution: "USP",
			Role: "Pesquisador", Country: "Brasil", Experience: "5-10 anos",
		},
		Fieldwork: dto.FieldworkDTO{ExpeditionsPerYear: "2-5"},
		Workflow: dto.WorkflowDTO{
			TimeConsumingStage: "Identificação", HoursOrganizingData: "5-10h",
		},
		DataManagement: dto.DataManagementDTO{FileOrganization: "Pastas"},
		PainPoints: dto.PainPointsDTO{
			TimeConsumingTasks: "Org", LastDifficulty: "Perda",
			WishedExistence: "Ferramenta", AutomateTask: "Identificação",
		},
		Collaboration: dto.CollaborationDTO{
			TeamSize: "2-5", DataSharing: "Email",
			LostFiles: "Sim", BackupMethod: "Google Drive",
		},
		AI: dto.AIDTO{NeverTrustAI: "Sim"},
		Contact: dto.ContactDTO{WillingToInterview: "nao"},
	}
}

func TestCreate_ValidRequest_Success(t *testing.T) {
	svc := NewSurveyService(&mockRepo{})
	err := svc.Create(context.Background(), validRequest())
	if err != nil {
		t.Fatalf("expected nil, got %v", err)
	}
}

func TestCreate_MissingStartedAt(t *testing.T) {
	req := validRequest()
	req.Metadata.StartedAt = ""
	svc := NewSurveyService(&mockRepo{})
	err := svc.Create(context.Background(), req)
	if !errors.Is(err, ErrValidation) {
		t.Fatalf("expected ErrValidation, got %v", err)
	}
}

func TestCreate_MissingRespondentField(t *testing.T) {
	req := validRequest()
	req.Respondent.ResearchArea = ""
	svc := NewSurveyService(&mockRepo{})
	err := svc.Create(context.Background(), req)
	if !errors.Is(err, ErrValidation) {
		t.Fatalf("expected ErrValidation, got %v", err)
	}
}

func TestCreate_WillingToInterview_RequiresEmail(t *testing.T) {
	req := validRequest()
	req.Contact.WillingToInterview = "yes"
	req.Contact.Name = "João"
	svc := NewSurveyService(&mockRepo{})
	err := svc.Create(context.Background(), req)
	if !errors.Is(err, ErrValidation) {
		t.Fatalf("expected ErrValidation, got %v", err)
	}
}

func TestCreate_InvalidEmail(t *testing.T) {
	req := validRequest()
	req.Contact.WillingToInterview = "yes"
	req.Contact.Name = "João"
	req.Contact.Email = "invalido"
	svc := NewSurveyService(&mockRepo{})
	err := svc.Create(context.Background(), req)
	if !errors.Is(err, ErrValidation) {
		t.Fatalf("expected ErrValidation, got %v", err)
	}
}

func TestCreate_ValidEmail(t *testing.T) {
	req := validRequest()
	req.Contact.WillingToInterview = "yes"
	req.Contact.Name = "João"
	req.Contact.Email = "joao@usp.br"
	svc := NewSurveyService(&mockRepo{})
	err := svc.Create(context.Background(), req)
	if err != nil {
		t.Fatalf("expected nil, got %v", err)
	}
}

func TestCreate_RepoError(t *testing.T) {
	svc := NewSurveyService(&mockRepo{err: errors.New("db down")})
	err := svc.Create(context.Background(), validRequest())
	if err == nil || errors.Is(err, ErrValidation) {
		t.Fatal("expected non-validation error")
	}
}
