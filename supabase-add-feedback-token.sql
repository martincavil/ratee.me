-- Migration: Ajouter feedback_token à la table projects
-- Date: 2025-11-25
-- Description: Ajoute une colonne feedback_token unique pour chaque projet

-- 1. Ajouter la colonne feedback_token
ALTER TABLE projects ADD COLUMN IF NOT EXISTS feedback_token TEXT UNIQUE;

-- 2. Créer une fonction pour générer un token unique
CREATE OR REPLACE FUNCTION generate_feedback_token()
RETURNS TEXT AS $$
DECLARE
  chars TEXT := 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  result TEXT := '';
  i INTEGER;
BEGIN
  FOR i IN 1..32 LOOP
    result := result || substr(chars, floor(random() * length(chars) + 1)::int, 1);
  END LOOP;
  RETURN result;
END;
$$ LANGUAGE plpgsql;

-- 3. Créer un trigger pour auto-générer le token lors de la création d'un projet
CREATE OR REPLACE FUNCTION set_feedback_token()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.feedback_token IS NULL THEN
    NEW.feedback_token := generate_feedback_token();
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 4. Appliquer le trigger
DROP TRIGGER IF EXISTS trigger_set_feedback_token ON projects;
CREATE TRIGGER trigger_set_feedback_token
  BEFORE INSERT ON projects
  FOR EACH ROW
  EXECUTE FUNCTION set_feedback_token();

-- 5. Mettre à jour les projets existants avec des tokens uniques
DO $$
DECLARE
  project_record RECORD;
BEGIN
  FOR project_record IN SELECT id FROM projects WHERE feedback_token IS NULL LOOP
    UPDATE projects
    SET feedback_token = generate_feedback_token()
    WHERE id = project_record.id;
  END LOOP;
END $$;

-- 6. Créer un index pour améliorer les performances
CREATE INDEX IF NOT EXISTS idx_projects_feedback_token ON projects(feedback_token);

-- Vérification
SELECT
  COUNT(*) as total_projects,
  COUNT(feedback_token) as projects_with_token
FROM projects;
