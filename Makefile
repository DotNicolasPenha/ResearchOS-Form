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

stats-server:
	node dev/server.js

stats:
	open http://localhost:3000

.PHONY: up down build run lint stats-server stats
