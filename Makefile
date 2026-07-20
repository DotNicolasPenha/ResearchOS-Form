.PHONY: up down migrate run build

up:
	docker compose up -d

down:
	docker compose down

build:
	go build -o bin/api ./cmd/api

run:
	go run ./cmd/api

migrate:
	@read -p "Migration name: " name; \
	migrate create -ext sql -dir migrations -seq $$name

migrate-up:
	migrate -path migrations -database "$(DATABASE_URL)" up

migrate-down:
	migrate -path migrations -database "$(DATABASE_URL)" down

lint:
	gofmt -s -w .

.PHONY: up down build run migrate migrate-up migrate-down lint
