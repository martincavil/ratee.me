-- Migration: Ajouter des critères de notation supplémentaires
-- Date: 2025-11-25
-- Description: Ajoute des colonnes pour noter différents critères en fin de mission

-- Ajouter les colonnes de notation (scale 1-5)
ALTER TABLE feedbacks ADD COLUMN IF NOT EXISTS rating_communication INTEGER CHECK (rating_communication >= 1 AND rating_communication <= 5);
ALTER TABLE feedbacks ADD COLUMN IF NOT EXISTS rating_quality INTEGER CHECK (rating_quality >= 1 AND rating_quality <= 5);
ALTER TABLE feedbacks ADD COLUMN IF NOT EXISTS rating_deadlines INTEGER CHECK (rating_deadlines >= 1 AND rating_deadlines <= 5);
ALTER TABLE feedbacks ADD COLUMN IF NOT EXISTS rating_value INTEGER CHECK (rating_value >= 1 AND rating_value <= 5);
ALTER TABLE feedbacks ADD COLUMN IF NOT EXISTS rating_overall INTEGER CHECK (rating_overall >= 1 AND rating_overall <= 5);

-- Ajouter une colonne pour savoir si le client recommanderait (Yes/No)
ALTER TABLE feedbacks ADD COLUMN IF NOT EXISTS would_recommend BOOLEAN;

-- Créer un index pour faciliter les requêtes
CREATE INDEX IF NOT EXISTS idx_feedbacks_ratings ON feedbacks(rating_communication, rating_quality, rating_deadlines, rating_value, rating_overall);

-- Vérification
SELECT
  column_name,
  data_type,
  is_nullable
FROM information_schema.columns
WHERE table_name = 'feedbacks'
  AND column_name LIKE 'rating_%'
ORDER BY column_name;
