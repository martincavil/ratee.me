-- Fix RLS policies pour waitlist
-- À exécuter dans le SQL Editor de Supabase
-- Cette migration corrige les policies pour permettre l'accès aux admins (martin@ratee.me et martincavil.dev@gmail.com)

-- 1. Supprimer les anciennes policies
DROP POLICY IF EXISTS "Anyone can join waitlist" ON waitlist;
DROP POLICY IF EXISTS "Admin can view waitlist" ON waitlist;
DROP POLICY IF EXISTS "Admin can update waitlist" ON waitlist;
DROP POLICY IF EXISTS "Admin can delete waitlist" ON waitlist;

-- 2. La fonction is_admin() existe déjà (créée par fix-beta-invites-rls.sql)
-- Si elle n'existe pas, la créer :
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

-- Anyone can join waitlist (public insert)
CREATE POLICY "Anyone can join waitlist"
ON waitlist FOR INSERT
WITH CHECK (true);

-- Only admin can view waitlist
CREATE POLICY "Admin can view waitlist"
ON waitlist FOR SELECT
USING (is_admin());

-- Only admin can update waitlist
CREATE POLICY "Admin can update waitlist"
ON waitlist FOR UPDATE
USING (is_admin());

-- Only admin can delete waitlist
CREATE POLICY "Admin can delete waitlist"
ON waitlist FOR DELETE
USING (is_admin());
