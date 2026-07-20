package config

import (
	"os"
	"strconv"
	"time"
)

type Config struct {
	Port            string
	DatabaseURL     string
	CORSOrigin      string
	SurveysAPIKey   string
	RateLimitReq    int
	RateLimitWindow time.Duration
	BodyLimit       int64
	ShutdownTimeout time.Duration
	ReadTimeout     time.Duration
	WriteTimeout    time.Duration
	IdleTimeout     time.Duration
}

func Load() (*Config, error) {
	port := getEnv("PORT", "8080")
	rateLimitReqs, err := strconv.Atoi(getEnv("RATE_LIMIT_REQUESTS", "20"))
	if err != nil {
		return nil, err
	}
	rateLimitWindow, err := time.ParseDuration(getEnv("RATE_LIMIT_WINDOW", "1m"))
	if err != nil {
		return nil, err
	}
	bodyLimitMB, err := strconv.ParseInt(getEnv("BODY_LIMIT", "2"), 10, 64)
	if err != nil {
		return nil, err
	}

	return &Config{
		Port:            ":" + port,
		DatabaseURL:     getEnv("DATABASE_URL", "postgres://postgres:postgres@localhost:5432/surveys?sslmode=disable"),
		CORSOrigin:      getEnv("CORS_ORIGIN", "http://localhost:4321"),
		SurveysAPIKey:   getEnv("SURVEYS_API_KEY", ""),
		RateLimitReq:    rateLimitReqs,
		RateLimitWindow: rateLimitWindow,
		BodyLimit:       bodyLimitMB * 1024 * 1024,
		ShutdownTimeout: 10 * time.Second,
		ReadTimeout:     10 * time.Second,
		WriteTimeout:    15 * time.Second,
		IdleTimeout:     60 * time.Second,
	}, nil
}

func getEnv(key, fallback string) string {
	if v := os.Getenv(key); v != "" {
		return v
	}
	return fallback
}
