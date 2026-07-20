# ResearchOS

Formulário de pesquisa científica — frontend React + backend Go.

## Stack

- **Frontend:** React 19 + Vite 8 + TypeScript 6 + Tailwind v4 + framer-motion
- **Backend:** Go 1.24 + chi + pgx/v5 + PostgreSQL 16
- **Infra:** Docker Compose

## Como executar localmente

### Backend (API + PostgreSQL)

```bash
cp .env.example .env
docker compose up -d
```

A API fica em `http://localhost:8080`. Verifique:

```bash
curl http://localhost:8080/health
# {"status":"ok"}
```

### Frontend

Instale as dependências e inicie o dev server:

```bash
npm install
npm run dev
```

Abra o endereço que aparecer (ex: `http://localhost:5173`).

> O frontend chama o backend via `VITE_API_URL`. No `.env` local, mantenha `VITE_API_URL=http://localhost:8080` (já incluso no `.env.example`).

## Variáveis .env

| Variável | Default | Descrição |
|---|---|---|
| `PORT` | 8080 | Porta do servidor Go |
| `DATABASE_URL` | postgres://... | URL do PostgreSQL |
| `CORS_ORIGIN` | http://localhost:4321 | Origem permitida no CORS |
| `RATE_LIMIT_REQUESTS` | 20 | Máx requisições por janela |
| `RATE_LIMIT_WINDOW` | 1m | Janela do rate limit |
| `BODY_LIMIT` | 2 | Tamanho máximo do body (MB) |
| `VITE_API_URL` | http://localhost:8080 | URL do backend (frontend) |

## Rotas da API

### `GET /health`

```bash
curl http://localhost:8080/health
```

### `POST /send-form`

```bash
curl -X POST http://localhost:8080/send-form \
  -H "Content-Type: application/json" \
  -d '{
    "metadata": {"startedAt": "2025-01-01T10:00:00Z", "completedAt": null},
    "respondent": {"researchArea": "Botânica", "institution": "USP", "role": "Pesquisador", "country": "Brasil", "experience": "5-10 anos"},
    "fieldwork": {"expeditionsPerYear": "2-5", "dataRecordingMethod": ["caderno"], "internetAvailability": "parcial", "equipment": ["camera"]},
    "workflow": {"timeConsumingStage": "Identificação", "hoursOrganizingData": "5-10h"},
    "data_management": {"tools": ["Excel"], "fileOrganization": "Pastas por data"},
    "pain_points": {"timeConsumingTasks": "Organização", "lastDifficulty": "Perda", "wishedExistence": "Ferramenta", "automateTask": "Identificação"},
    "collaboration": {"teamSize": "2-5", "dataSharing": "Email", "lostFiles": "Sim", "backupMethod": "Google Drive"},
    "artificial_intelligence": {"aiUseCases": ["Identificação"], "neverTrustAI": "Sim"},
    "contact": {"willingToInterview": "nao", "name": "", "email": "", "institution": ""}
  }'
```

Resposta esperada: `{"message":"Survey submitted successfully."}`

## Deploy

### Frontend → Netlify

A Netlify só hospeda sites estáticos. **O backend Go precisa de outro serviço** (Railway, Fly.io, Render, ou um VPS).

1. Faça deploy do backend em algum lugar e obtenha a URL (ex: `https://api.seusite.com`)
2. Conecte o repositório na Netlify
3. Em **Site settings → Environment variables**, adicione:
   - `VITE_API_URL` = URL do backend em produção
4. A Netlify detecta o `netlify.toml` e usa `npm run build` automaticamente

### Backend → Railway / Render / Fly.io

O backend é uma aplicação Go padrão com Dockerfile. Em qualquer plataforma que suporte Docker:

```bash
# Build da imagem
docker build -t survey-api .

# Rodar com PostgreSQL (ou usar o serviço gerenciado da plataforma)
docker run -p 8080:8080 --env-file .env survey-api
```

## Estrutura do projeto

```
├── cmd/api/main.go              # Entrypoint Go
├── internal/survey/
│   ├── domain/                  # Entidades
│   ├── dto/                     # Request/response + validação
│   ├── handler/                 # Handlers HTTP
│   ├── service/                 # Regras de negócio
│   └── repository/              # Acesso PostgreSQL
├── pkg/
│   ├── config/                  # Config via .env
│   ├── database/                # Conexão pgx
│   ├── logger/                  # Logger estruturado (slog)
│   └── middleware/              # CORS, rate limit, request ID etc.
├── migrations/                  # SQL migrations
├── src/                         # Frontend React
│   ├── components/              # Componentes reutilizáveis
│   ├── screens/                 # Telas do formulário
│   ├── services/                # API client
│   ├── store/                   # Estado (custom hook)
│   └── types/                   # Tipos TypeScript
├── Dockerfile
├── docker-compose.yml
├── netlify.toml
├── Makefile
└── .env.example
```

## Decisões de arquitetura

- **Clean Architecture leve**: handler → service → repository, cada camada com responsabilidade única
- **JSONB**: payload armazenado em coluna JSONB, sem dezenas de colunas
- **UUID gerado pela aplicação**: consistência independente do banco
- **DI por construtores**: sem singletons ou globais
- **Context propagation**: context.Context flui do handler ao repository
- **Wizard pattern**: orquestrador central (Wizard) + telas presentacionais + componentes reutilizáveis
- **Persistência local**: auto-save em localStorage com recuperação de sessão

## O que NÃO implementar

- JWT / Login / OAuth
- Redis / Cache
- Filas / RabbitMQ / Kafka
- WebSocket / GraphQL / gRPC
- Swagger / OpenAPI
- Kubernetes
- Event Sourcing / CQRS
- DDD completo
