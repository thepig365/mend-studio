-- Add optional entered names without changing historical rows, IDs or hashes.
-- Apply once to the approved dedicated MEND database through its SQL editor.
DO $feedback_names$
BEGIN
ALTER TABLE mend_feedback.entries
  ADD COLUMN provider_name text CHECK (provider_name IS NULL OR char_length(provider_name) BETWEEN 1 AND 80),
  ADD COLUMN provider_key text CHECK (provider_key IS NULL OR char_length(provider_key) BETWEEN 1 AND 160),
  ADD CONSTRAINT feedback_provider_name_pair CHECK ((provider_name IS NULL) = (provider_key IS NULL));
CREATE INDEX entries_provider_name_group_created_idx ON mend_feedback.entries
  (md5(COALESCE(provider_key, CASE provider_id WHEN 'mejin-shick' THEN 'mejin shick' END)), created_at DESC);
END
$feedback_names$;
