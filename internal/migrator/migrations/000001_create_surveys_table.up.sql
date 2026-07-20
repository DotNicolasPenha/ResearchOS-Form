CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE surveys (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    payload JSONB NOT NULL
);

CREATE INDEX idx_surveys_created_at ON surveys (created_at DESC);
