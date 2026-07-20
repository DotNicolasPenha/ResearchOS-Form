package handler

import (
	"context"
	"encoding/json"
	"errors"
	"log/slog"
	"net/http"

	"github.com/researchos/survey-api/internal/survey/domain"
	"github.com/researchos/survey-api/internal/survey/dto"
	"github.com/researchos/survey-api/internal/survey/service"
)

type SurveyService interface {
	Create(ctx context.Context, req *dto.SurveyRequest) error
	List(ctx context.Context) ([]domain.Survey, error)
}

type SurveyHandler struct {
	service SurveyService
	logger  *slog.Logger
}

func NewSurveyHandler(service SurveyService, logger *slog.Logger) *SurveyHandler {
	return &SurveyHandler{service: service, logger: logger}
}

func (h *SurveyHandler) ListSurveys(w http.ResponseWriter, r *http.Request) {
	surveys, err := h.service.List(r.Context())
	if err != nil {
		h.logger.Error("list surveys", "error", err)
		writeJSON(w, http.StatusInternalServerError, dto.ErrorResponse{Error: "internal server error"})
		return
	}
	if surveys == nil {
		surveys = []domain.Survey{}
	}
	writeJSON(w, http.StatusOK, surveys)
}

func (h *SurveyHandler) SendForm(w http.ResponseWriter, r *http.Request) {
	var req dto.SurveyRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		writeJSON(w, http.StatusBadRequest, dto.ErrorResponse{Error: "invalid JSON"})
		return
	}

	if err := h.service.Create(r.Context(), &req); err != nil {
		if errors.Is(err, service.ErrValidation) {
			writeJSON(w, http.StatusUnprocessableEntity, dto.ErrorResponse{Error: err.Error()})
		} else {
			h.logger.Error("create survey", "error", err)
			writeJSON(w, http.StatusInternalServerError, dto.ErrorResponse{Error: "internal server error"})
		}
		return
	}

	writeJSON(w, http.StatusCreated, dto.SuccessResponse{Message: "Survey submitted successfully."})
}

func writeJSON(w http.ResponseWriter, status int, v any) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(status)
	json.NewEncoder(w).Encode(v)
}
