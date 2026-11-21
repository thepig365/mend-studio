-- DRAFT: run only against the explicitly approved private MEND PostgreSQL store.
-- No existing schemas, roles, identities or grants are changed. The migration
-- owner must be the server-only application role; do not use an anonymous key.
BEGIN;
CREATE SCHEMA mend_feedback;
REVOKE ALL ON SCHEMA mend_feedback FROM PUBLIC;
CREATE TABLE mend_feedback.entries (
  submission_id uuid PRIMARY KEY,
  created_at timestamptz NOT NULL DEFAULT now(),
  rating smallint NOT NULL CHECK (rating BETWEEN 1 AND 5),
  provider_id text CHECK (provider_id IS NULL OR provider_id IN ('mejin-shick')),
  locale text NOT NULL CHECK (locale IN ('en', 'zh')),
  initials text NOT NULL DEFAULT '' CHECK (char_length(initials) <= 20),
  comment text NOT NULL DEFAULT '' CHECK (char_length(comment) <= 500),
  request_hash text NOT NULL CHECK (request_hash ~ '^[a-f0-9]{64}$')
);
CREATE INDEX ON mend_feedback.entries (provider_id, created_at DESC);
CREATE TABLE mend_feedback.rate_limits (
  subject text NOT NULL,
  bucket timestamptz NOT NULL,
  submissions integer NOT NULL CHECK (submissions > 0),
  PRIMARY KEY (subject, bucket)
);
CREATE INDEX ON mend_feedback.rate_limits (bucket);
REVOKE ALL ON ALL TABLES IN SCHEMA mend_feedback FROM PUBLIC;
-- Defense in depth: no policies = no non-owner access even if a table grant is
-- added accidentally. Only the private server connection's owner role is used.
ALTER TABLE mend_feedback.entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE mend_feedback.rate_limits ENABLE ROW LEVEL SECURITY;
COMMIT;
