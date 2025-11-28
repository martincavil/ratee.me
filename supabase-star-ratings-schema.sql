-- Migration: Ajouter les colonnes star ratings à la table feedbacks
-- Date: 2025-11-27
-- Description: Ajoute 5 colonnes pour les évaluations par étoiles (1-5)

-- Ajouter les colonnes star rating
ALTER TABLE feedbacks ADD COLUMN IF NOT EXISTS star_rating_communication INTEGER CHECK (star_rating_communication IS NULL OR (star_rating_communication >= 1 AND star_rating_communication <= 5));
ALTER TABLE feedbacks ADD COLUMN IF NOT EXISTS star_rating_deadlines INTEGER CHECK (star_rating_deadlines IS NULL OR (star_rating_deadlines >= 1 AND star_rating_deadlines <= 5));
ALTER TABLE feedbacks ADD COLUMN IF NOT EXISTS star_rating_quality INTEGER CHECK (star_rating_quality IS NULL OR (star_rating_quality >= 1 AND star_rating_quality <= 5));
ALTER TABLE feedbacks ADD COLUMN IF NOT EXISTS star_rating_professionalism INTEGER CHECK (star_rating_professionalism IS NULL OR (star_rating_professionalism >= 1 AND star_rating_professionalism <= 5));
ALTER TABLE feedbacks ADD COLUMN IF NOT EXISTS star_rating_recommendation INTEGER CHECK (star_rating_recommendation IS NULL OR (star_rating_recommendation >= 1 AND star_rating_recommendation <= 5));

-- Créer un index pour faciliter les requêtes de moyennes
CREATE INDEX IF NOT EXISTS idx_feedbacks_star_ratings ON feedbacks(
  star_rating_communication,
  star_rating_deadlines,
  star_rating_quality,
  star_rating_professionalism,
  star_rating_recommendation
);

-- Vérification
SELECT
  column_name,
  data_type,
  is_nullable
FROM information_schema.columns
WHERE table_name = 'feedbacks'
  AND column_name LIKE 'star_rating_%'
ORDER BY column_name;
