# Guide de déploiement - ratee.me

## Variables d'environnement requises

Pour que l'application fonctionne correctement en production, vous devez configurer les variables d'environnement suivantes sur votre plateforme de déploiement (Vercel, Netlify, etc.).

### 1. Supabase (REQUIS)

```bash
NEXT_PUBLIC_SUPABASE_URL=https://votre-projet.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=votre-cle-anon
SUPABASE_SERVICE_ROLE_KEY=votre-cle-service-role
```

**Où les trouver :**
1. Allez sur https://supabase.com/dashboard
2. Sélectionnez votre projet
3. Allez dans Settings > API
4. Copiez l'URL et les clés

### 2. App Configuration (REQUIS)

```bash
NEXT_PUBLIC_APP_URL=https://ratee.me
NEXT_PUBLIC_SITE_URL=https://ratee.me
```

### 3. Resend (Email) (REQUIS)

```bash
RESEND_API_KEY=re_votre_cle
RESEND_FROM_EMAIL=feedback@ratee.me
```

**Où les trouver :**
1. Allez sur https://resend.com
2. API Keys > Create API Key

### 4. Stripe (REQUIS)

```bash
STRIPE_SECRET_KEY=sk_live_votre_cle
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_votre_cle
STRIPE_WEBHOOK_SECRET=whsec_votre_secret
STRIPE_PRICE_PRO_MONTHLY=price_votre_id
STRIPE_PRICE_PRO_YEARLY=price_votre_id
```

**Où les trouver :**
1. Allez sur https://dashboard.stripe.com
2. Pour les clés : Developers > API keys
3. Pour les webhooks : Developers > Webhooks
4. Pour les prix : Products > Votre produit > Pricing

## Déploiement sur Vercel

1. Connectez votre dépôt GitHub à Vercel
2. Allez dans Settings > Environment Variables
3. Ajoutez toutes les variables ci-dessus
4. Redéployez votre application

## Déploiement sur Netlify

1. Connectez votre dépôt GitHub à Netlify
2. Allez dans Site settings > Build & deploy > Environment
3. Ajoutez toutes les variables ci-dessus
4. Redéployez votre application

## Vérification

Après le déploiement, vérifiez que :
- [ ] La page d'accueil se charge correctement
- [ ] Vous pouvez vous connecter avec votre email
- [ ] Les feedbacks peuvent être envoyés
- [ ] Les paiements Stripe fonctionnent

## Erreur commune

Si vous voyez l'erreur :
```
Your project's URL and Key are required to create a Supabase client!
```

Cela signifie que les variables `NEXT_PUBLIC_SUPABASE_URL` et `NEXT_PUBLIC_SUPABASE_ANON_KEY` ne sont pas configurées sur votre plateforme de déploiement.

## Support

Pour toute question, consultez la documentation ou créez une issue sur GitHub.
