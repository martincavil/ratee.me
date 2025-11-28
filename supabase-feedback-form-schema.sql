-- Migration: Ajouter les colonnes pour le nouveau formulaire de feedback
-- Date: 2025-11-27
-- Description: Ajoute des colonnes pour le formulaire de feedback détaillé

-- Ajouter les colonnes pour le feedback détaillé
ALTER TABLE feedbacks ADD COLUMN IF NOT EXISTS what_went_well TEXT;
ALTER TABLE feedbacks ADD COLUMN IF NOT EXISTS to_improve TEXT;
ALTER TABLE feedbacks ADD COLUMN IF NOT EXISTS will_return TEXT CHECK (will_return IN ('yes', 'maybe', 'no'));
ALTER TABLE feedbacks ADD COLUMN IF NOT EXISTS testimonial TEXT;
ALTER TABLE feedbacks ADD COLUMN IF NOT EXISTS allow_publish BOOLEAN DEFAULT false;
ALTER TABLE feedbacks ADD COLUMN IF NOT EXISTS publish_option TEXT CHECK (publish_option IN ('name', 'anon', 'no'));
ALTER TABLE feedbacks ADD COLUMN IF NOT EXISTS respondent_email TEXT;
ALTER TABLE feedbacks ADD COLUMN IF NOT EXISTS want_newsletter BOOLEAN DEFAULT false;
ALTER TABLE feedbacks ADD COLUMN IF NOT EXISTS feedback_token TEXT;

-- Créer un index pour le token de feedback
CREATE INDEX IF NOT EXISTS idx_feedbacks_token ON feedbacks(feedback_token);

-- Vérification
SELECT
  column_name,
  data_type,
  is_nullable
FROM information_schema.columns
WHERE table_name = 'feedbacks'
  AND column_name IN ('what_went_well', 'to_improve', 'will_return', 'testimonial', 'allow_publish', 'publish_option', 'respondent_email', 'want_newsletter', 'feedback_token')
ORDER BY column_name;
