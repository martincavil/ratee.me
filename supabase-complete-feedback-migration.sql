-- Migration complète: Feedback Form + Star Ratings
-- Date: 2025-11-27
-- Description: Ajoute toutes les colonnes nécessaires pour le nouveau système de feedback

-- ====================================================
-- PARTIE 1: Colonnes du formulaire de feedback
-- ====================================================

-- Ajouter les colonnes pour le feedback détaillé
ALTER TABLE feedbacks ADD COLUMN IF NOT EXISTS feedback_token VARCHAR(255);
ALTER TABLE feedbacks ADD COLUMN IF NOT EXISTS what_went_well TEXT;
ALTER TABLE feedbacks ADD COLUMN IF NOT EXISTS to_improve TEXT;
ALTER TABLE feedbacks ADD COLUMN IF NOT EXISTS will_return VARCHAR(10) CHECK (will_return IN ('yes', 'maybe', 'no'));
ALTER TABLE feedbacks ADD COLUMN IF NOT EXISTS testimonial TEXT;
ALTER TABLE feedbacks ADD COLUMN IF NOT EXISTS allow_publish BOOLEAN DEFAULT FALSE;
ALTER TABLE feedbacks ADD COLUMN IF NOT EXISTS publish_option VARCHAR(10) DEFAULT 'no' CHECK (publish_option IN ('name', 'anon', 'no'));
ALTER TABLE feedbacks ADD COLUMN IF NOT EXISTS respondent_email VARCHAR(255);
ALTER TABLE feedbacks ADD COLUMN IF NOT EXISTS want_newsletter BOOLEAN DEFAULT FALSE;

-- Index pour rechercher par token
CREATE INDEX IF NOT EXISTS idx_feedbacks_token ON feedbacks(feedback_token);

-- ====================================================
-- PARTIE 2: Colonnes star ratings (1-5 étoiles)
-- ====================================================

-- Ajouter les colonnes star rating avec contraintes de validation
ALTER TABLE feedbacks ADD COLUMN IF NOT EXISTS star_rating_communication INTEGER CHECK (star_rating_communication IS NULL OR (star_rating_communication >= 1 AND star_rating_communication <= 5));
ALTER TABLE feedbacks ADD COLUMN IF NOT EXISTS star_rating_deadlines INTEGER CHECK (star_rating_deadlines IS NULL OR (star_rating_deadlines >= 1 AND star_rating_deadlines <= 5));
ALTER TABLE feedbacks ADD COLUMN IF NOT EXISTS star_rating_quality INTEGER CHECK (star_rating_quality IS NULL OR (star_rating_quality >= 1 AND star_rating_quality <= 5));
ALTER TABLE feedbacks ADD COLUMN IF NOT EXISTS star_rating_professionalism INTEGER CHECK (star_rating_professionalism IS NULL OR (star_rating_professionalism >= 1 AND star_rating_professionalism <= 5));
ALTER TABLE feedbacks ADD COLUMN IF NOT EXISTS star_rating_recommendation INTEGER CHECK (star_rating_recommendation IS NULL OR (star_rating_recommendation >= 1 AND star_rating_recommendation <= 5));

-- Index composite pour les star ratings (optimise les calculs de moyennes)
CREATE INDEX IF NOT EXISTS idx_feedbacks_star_ratings ON feedbacks(
  star_rating_communication,
  star_rating_deadlines,
  star_rating_quality,
  star_rating_professionalism,
  star_rating_recommendation
);

-- ====================================================
-- VÉRIFICATION
-- ====================================================

-- Vérifier toutes les nouvelles colonnes
SELECT
  column_name,
  data_type,
  is_nullable,
  column_default
FROM information_schema.columns
WHERE table_name = 'feedbacks'
  AND (
    column_name LIKE 'star_rating_%' OR
    column_name IN (
      'feedback_token',
      'what_went_well',
      'to_improve',
      'will_return',
      'testimonial',
      'allow_publish',
      'publish_option',
      'respondent_email',
      'want_newsletter'
    )
  )
ORDER BY column_name;
