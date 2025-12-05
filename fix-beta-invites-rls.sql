-- Fix RLS policies pour beta_invites
-- À exécuter dans le SQL Editor de Supabase
-- Cette migration supprime les policies problématiques et les remplace par des policies simples

-- 1. Supprimer les anciennes policies qui causent l'erreur
DROP POLICY IF EXISTS "Admin can view invites" ON beta_invites;
DROP POLICY IF EXISTS "Admin can create invites" ON beta_invites;
DROP POLICY IF EXISTS "Admin can update invites" ON beta_invites;
DROP POLICY IF EXISTS "Admin can delete invites" ON beta_invites;
DROP POLICY IF EXISTS "Public can validate token" ON beta_invites;

-- 2. Créer une fonction helper sécurisée pour vérifier si un utilisateur est admin
CREATE OR REPLACE FUNCTION is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN (
    SELECT email IN ('martin@ratee.me', 'martincavil.dev@gmail.com')
    FROM auth.users
    WHERE id = auth.uid()
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 3. Créer de nouvelles policies utilisant la fonction sécurisée
CREATE POLICY "Admin can view invites"
ON beta_invites FOR SELECT
USING (is_admin());

CREATE POLICY "Admin can create invites"
ON beta_invites FOR INSERT
WITH CHECK (is_admin());

CREATE POLICY "Admin can update invites"
ON beta_invites FOR UPDATE
USING (is_admin());

CREATE POLICY "Admin can delete invites"
ON beta_invites FOR DELETE
USING (is_admin());

-- 4. Public peut toujours valider un token (pour l'inscription)
CREATE POLICY "Public can validate token"
ON beta_invites FOR SELECT
USING (true);
