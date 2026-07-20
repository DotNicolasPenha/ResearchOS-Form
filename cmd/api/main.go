package main

import (
	"context"
	"errors"
	"log/slog"
	"net/http"
	"os"
	"os/signal"
	"syscall"
	"time"

	"github.com/go-chi/chi/v5"
	"github.com/joho/godotenv"
	"github.com/researchos/survey-api/internal/migrator"
	"github.com/researchos/survey-api/internal/survey/handler"
	"github.com/researchos/survey-api/internal/survey/repository"
	"github.com/researchos/survey-api/internal/survey/service"
	"github.com/researchos/survey-api/pkg/config"
	"github.com/researchos/survey-api/pkg/database"
	"github.com/researchos/survey-api/pkg/logger"
	"github.com/researchos/survey-api/pkg/middleware"
)

func main() {
	godotenv.Load()

	cfg, err := config.Load()
	if err != nil {
		slog.Error("load config", "error", err)
		os.Exit(1)
	}

	log := logger.New()

	dbCtx, dbCancel := context.WithTimeout(context.Background(), 5*time.Second)
	pool, err := database.Connect(dbCtx, cfg.DatabaseURL)
	dbCancel()
	if err != nil {
		log.Error("connect database", "error", err)
		os.Exit(1)
	}
	defer pool.Close()

	if err := migrator.Run(cfg.DatabaseURL); err != nil {
		log.Error("run migrations", "error", err)
		os.Exit(1)
	}

	surveyRepo := repository.NewSurveyRepository(pool)
	surveySvc := service.NewSurveyService(surveyRepo)
	surveyHandler := handler.NewSurveyHandler(surveySvc, log)

	r := chi.NewRouter()

	r.Use(middleware.Recovery(log))
	r.Use(middleware.RequestID)
	r.Use(middleware.Logger(log))
	r.Use(middleware.CORS(cfg.CORSOrigin))
	r.Use(middleware.SecurityHeaders)
	r.Use(middleware.BodyLimit(cfg.BodyLimit))

	r.Get("/health", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusOK)
		w.Write([]byte(`{"status":"ok"}`))
	})

	r.With(middleware.RateLimit(cfg.RateLimitReq, cfg.RateLimitWindow)).
		Post("/send-form", surveyHandler.SendForm)

	srv := &http.Server{
		Addr:         cfg.Port,
		Handler:      r,
		ReadTimeout:  cfg.ReadTimeout,
		WriteTimeout: cfg.WriteTimeout,
		IdleTimeout:  cfg.IdleTimeout,
	}

	ctx, stop := signal.NotifyContext(context.Background(), syscall.SIGINT, syscall.SIGTERM)
	defer stop()

	go func() {
		log.Info("server starting", "port", cfg.Port)
		if err := srv.ListenAndServe(); err != nil && !errors.Is(err, http.ErrServerClosed) {
			log.Error("server error", "error", err)
			os.Exit(1)
		}
	}()

	<-ctx.Done()
	log.Info("shutting down gracefully")

	shutdownCtx, cancel := context.WithTimeout(context.Background(), cfg.ShutdownTimeout)
	defer cancel()

	if err := srv.Shutdown(shutdownCtx); err != nil {
		log.Error("server shutdown error", "error", err)
		os.Exit(1)
	}

	log.Info("server stopped")
}
