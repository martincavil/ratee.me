-- Script pour mettre martincavil.dev@gmail.com en abonnement PRO
-- À exécuter dans le SQL Editor de Supabase

-- Étape 1: Trouver l'UUID de l'utilisateur
-- (Cette requête affiche l'UUID - copiez-le pour l'étape 2)
SELECT
  au.id,
  au.email,
  u.name
FROM auth.users au
LEFT JOIN public.users u ON u.id = au.id
WHERE au.email = 'martincavil.dev@gmail.com';

-- Étape 2: Créer ou mettre à jour l'abonnement PRO
-- OPTION A: Abonnement PRO sans limite de temps (recommandé pour votre compte)
INSERT INTO subscriptions (
  user_id,
  plan,
  status,
  trial_until,
  current_period_start,
  current_period_end,
  created_at,
  updated_at
)
SELECT
  id,
  'pro',
  'active',
  NULL, -- Pas de limite, abonnement permanent
  NOW(),
  NOW() + INTERVAL '1 year',
  NOW(),
  NOW()
FROM auth.users
WHERE email = 'martincavil.dev@gmail.com'
ON CONFLICT (user_id)
DO UPDATE SET
  plan = 'pro',
  status = 'active',
  trial_until = NULL,
  current_period_start = NOW(),
  current_period_end = NOW() + INTERVAL '1 year',
  updated_at = NOW();

-- OPTION B: Abonnement PRO avec période d'essai de 30 jours
-- (Décommentez si vous préférez avoir une période d'essai)
/*
INSERT INTO subscriptions (
  user_id,
  plan,
  status,
  trial_until,
  current_period_start,
  current_period_end,
  created_at,
  updated_at
)
SELECT
  id,
  'pro',
  'active',
  NOW() + INTERVAL '30 days',
  NOW(),
  NOW() + INTERVAL '1 year',
  NOW(),
  NOW()
FROM auth.users
WHERE email = 'martincavil.dev@gmail.com'
ON CONFLICT (user_id)
DO UPDATE SET
  plan = 'pro',
  status = 'active',
  trial_until = NOW() + INTERVAL '30 days',
  current_period_start = NOW(),
  current_period_end = NOW() + INTERVAL '1 year',
  updated_at = NOW();
*/

-- Étape 3: Vérifier que l'abonnement a été créé
SELECT
  s.*,
  au.email,
  u.name
FROM subscriptions s
JOIN auth.users au ON s.user_id = au.id
LEFT JOIN public.users u ON u.id = au.id
WHERE au.email = 'martincavil.dev@gmail.com';
