package service

import (
	"context"
	"errors"
	"fmt"
	"time"

	"github.com/google/uuid"
	"github.com/researchos/survey-api/internal/survey/domain"
	"github.com/researchos/survey-api/internal/survey/dto"
)

type SurveyRepository interface {
	Save(ctx context.Context, survey *domain.Survey) error
	FindAll(ctx context.Context) ([]domain.Survey, error)
	Delete(ctx context.Context, id uuid.UUID) error
}

type SurveyService struct {
	repo SurveyRepository
}

var ErrValidation = errors.New("validation error")

func NewSurveyService(repo SurveyRepository) *SurveyService {
	return &SurveyService{repo: repo}
}

func (s *SurveyService) List(ctx context.Context) ([]domain.Survey, error) {
	return s.repo.FindAll(ctx)
}

func (s *SurveyService) Delete(ctx context.Context, idStr string) error {
	id, err := uuid.Parse(idStr)
	if err != nil {
		return fmt.Errorf("invalid id: %w", err)
	}
	return s.repo.Delete(ctx, id)
}

func (s *SurveyService) Create(ctx context.Context, req *dto.SurveyRequest) error {
	if msg := req.Validate(); msg != "" {
		return fmt.Errorf("%w: %s", ErrValidation, msg)
	}

	survey := &domain.Survey{
		ID:        uuid.New(),
		CreatedAt: time.Now().UTC(),
		Payload:   req.ToDomain(),
	}

	if err := s.repo.Save(ctx, survey); err != nil {
		return fmt.Errorf("save survey: %w", err)
	}

	return nil
}
