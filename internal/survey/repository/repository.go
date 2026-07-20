package repository

import (
	"context"
	"encoding/json"
	"fmt"

	"github.com/jackc/pgx/v5/pgxpool"
	"github.com/researchos/survey-api/internal/survey/domain"
)

type SurveyRepository struct {
	pool *pgxpool.Pool
}

func NewSurveyRepository(pool *pgxpool.Pool) *SurveyRepository {
	return &SurveyRepository{pool: pool}
}

func (r *SurveyRepository) Save(ctx context.Context, survey *domain.Survey) error {
	payload, err := json.Marshal(survey.Payload)
	if err != nil {
		return fmt.Errorf("marshal payload: %w", err)
	}

	query := `INSERT INTO surveys (id, payload) VALUES ($1, $2)`
	_, err = r.pool.Exec(ctx, query, survey.ID, payload)
	if err != nil {
		return fmt.Errorf("insert survey: %w", err)
	}

	return nil
}
