# Security Guidelines

## Configuration des emails admin

Les emails admin sont définis dans `lib/constants.ts` :

```typescript
export const ADMIN_EMAILS = ["your-admin-email@example.com"] as const;
```

**Important** : Ne jamais commiter d'emails personnels dans le code public.

## Fichiers sensibles

Les fichiers suivants ne doivent **JAMAIS** être versionnés avec des données personnelles :

### Déjà exclus par .gitignore
- `.env.local` - Variables d'environnement locales
- `.env` - Variables d'environnement
- `upgrade-*.sql` - Scripts SQL de mise à jour personnels
- `*-personal.sql` - Scripts SQL personnels

### Fichiers templates (à personnaliser avant utilisation)
Les fichiers SQL suivants contiennent des placeholders `YOUR_ADMIN_EMAIL@example.com` :
- `fix-beta-invites-rls.sql`
- `fix-waitlist-rls.sql`
- `supabase-beta-schema.sql`
- `supabase-pricing-schema.sql`

**Avant de les exécuter dans Supabase**, remplacez `YOUR_ADMIN_EMAIL@example.com` par votre vrai email admin.

## Variables d'environnement requises

Créez un fichier `.env.local` avec les variables suivantes :

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Resend (Email)
RESEND_API_KEY=your_resend_api_key
RESEND_FROM_EMAIL=your_verified_email@yourdomain.com

# Stripe (Payments)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret

# Cron Jobs
CRON_SECRET=your_random_secret_for_cron_jobs
```

## Best Practices

1. **Ne jamais commiter de secrets** - Utilisez toujours `.env.local` pour les données sensibles
2. **Centraliser les admins** - Tous les emails admin sont dans `lib/constants.ts`
3. **RLS Supabase** - Toujours utiliser Row Level Security pour protéger les données
4. **Scripts SQL** - Utiliser des placeholders dans les templates, créer des versions `-personal.sql` pour usage local
5. **Audit régulier** - Vérifier régulièrement qu'aucune donnée sensible n'est commitée

## En cas de leak de secret

1. Révoquer immédiatement la clé/secret compromis
2. Générer une nouvelle clé
3. Mettre à jour `.env.local`
4. Si commité dans Git, utiliser `git filter-branch` ou BFG Repo-Cleaner pour nettoyer l'historique
5. Forcer un push après nettoyage
