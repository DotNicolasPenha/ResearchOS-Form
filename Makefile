up:
	docker compose up -d

down:
	docker compose down

build:
	go build -o bin/api ./cmd/api

run:
	go run ./cmd/api

lint:
	gofmt -s -w .

.PHONY: up down build run lint
