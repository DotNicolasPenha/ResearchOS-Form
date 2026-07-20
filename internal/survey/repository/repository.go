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

func (r *SurveyRepository) FindAll(ctx context.Context) ([]domain.Survey, error) {
	query := `SELECT id, created_at, payload FROM surveys ORDER BY created_at DESC`
	rows, err := r.pool.Query(ctx, query)
	if err != nil {
		return nil, fmt.Errorf("query surveys: %w", err)
	}
	defer rows.Close()

	var surveys []domain.Survey
	for rows.Next() {
		var s domain.Survey
		var payload []byte
		if err := rows.Scan(&s.ID, &s.CreatedAt, &payload); err != nil {
			return nil, fmt.Errorf("scan survey: %w", err)
		}
		if err := json.Unmarshal(payload, &s.Payload); err != nil {
			return nil, fmt.Errorf("unmarshal payload: %w", err)
		}
		surveys = append(surveys, s)
	}
	return surveys, nil
}
