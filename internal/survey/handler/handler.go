package handler

import (
	"context"
	"encoding/json"
	"errors"
	"net/http"

	"github.com/researchos/survey-api/internal/survey/dto"
	"github.com/researchos/survey-api/internal/survey/service"
)

type SurveyService interface {
	Create(ctx context.Context, req *dto.SurveyRequest) error
}

type SurveyHandler struct {
	service SurveyService
}

func NewSurveyHandler(service SurveyService) *SurveyHandler {
	return &SurveyHandler{service: service}
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
