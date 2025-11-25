# 🧪 Test de l'intégration Stripe

## Prérequis
- [ ] Compte Stripe créé (mode Test activé)
- [ ] Variables d'environnement configurées dans `.env.local`
- [ ] Produits et prix créés dans Stripe
- [ ] App Next.js lancée (`npm run dev`)

---

## ✅ Checklist de test

### 1. Test du checkout (Plan Pro)

1. Va sur http://localhost:3000/pricing
2. Clique sur "Essayer 14 jours gratuit" (plan Pro)
3. ✅ Vérifie que tu es redirigé vers Stripe Checkout
4. Utilise la carte de test : `4242 4242 4242 4242`
   - Date : N'importe quelle date future (ex: 12/25)
   - CVC : 123
   - Nom : Test User
5. ✅ Vérifie que tu es redirigé vers `/dashboard`

### 2. Test du webhook (Abonnement créé)

**Option A : Avec Stripe CLI (recommandé)**
```bash
# Dans un terminal séparé
stripe listen --forward-to localhost:3000/api/webhooks/stripe
```

Ensuite, complète un checkout et vérifie :
- ✅ Le terminal montre l'événement `customer.subscription.created`
- ✅ Dans Supabase, table `subscriptions`, le plan devient `pro`
- ✅ Le champ `trial_until` est rempli (+30 jours)

**Option B : Sans CLI**
1. Va sur https://dashboard.stripe.com/test/webhooks
2. Clique sur ton endpoint
3. Clique sur "Envoyer un événement de test"
4. Choisis `customer.subscription.created`
5. ✅ Vérifie que l'événement est reçu (200 OK)

### 3. Test du dashboard après upgrade

1. Va sur http://localhost:3000/dashboard
2. ✅ Vérifie que la bannière "Free Plan" a disparu
3. ✅ Vérifie que la bannière "Trial" apparaît avec le compte à rebours
4. ✅ Vérifie que tu peux créer des projets illimités

### 4. Test de l'annulation

1. Va sur https://dashboard.stripe.com/test/subscriptions
2. Trouve l'abonnement de test
3. Clique sur "Annuler l'abonnement"
4. ✅ Dans Supabase, vérifie que le plan redevient `free`
5. ✅ Sur le dashboard, vérifie que la bannière "Free" réapparaît

### 5. Test d'échec de paiement

1. Crée un nouvel abonnement avec la carte : `4000 0000 0000 0341`
2. ✅ Vérifie que le paiement échoue
3. ✅ Vérifie que le statut dans Supabase devient `past_due`

---

## 🐛 Problèmes courants

### Le checkout ne s'ouvre pas
- Vérifie `STRIPE_PRICE_PRO_MONTHLY` dans `.env.local`
- Vérifie que le prix existe dans Stripe Dashboard
- Check la console : `console.log(data)` dans checkout-button.tsx

### Les webhooks ne fonctionnent pas
- ✅ Vérifie que `STRIPE_WEBHOOK_SECRET` est correct
- ✅ Utilise Stripe CLI en local : `stripe listen --forward-to localhost:3000/api/webhooks/stripe`
- ✅ Vérifie les logs : `stripe logs tail`

### L'abonnement n'apparaît pas dans Supabase
- Vérifie que la table `subscriptions` existe
- Vérifie que le webhook a bien été reçu (logs Stripe)
- Vérifie les logs de l'API webhook : `app/api/webhooks/stripe/route.ts`

### Erreur "Price not configured"
- Va dans Stripe Dashboard > Produits
- Copie l'ID du prix (commence par `price_`)
- Mets-le dans `.env.local` : `STRIPE_PRICE_PRO_MONTHLY=price_xxxxx`
- Relance l'app : `npm run dev`

---

## 🎯 Test en production

Quand tu passes en prod :

1. ✅ Change les clés Stripe (enlève `_test_`)
2. ✅ Recrée les produits en mode LIVE
3. ✅ Configure le webhook en production :
   - URL : `https://ratee.me/api/webhooks/stripe`
   - Événements : subscription.created, updated, deleted, invoice.payment_failed
4. ✅ Teste avec une vraie carte (annule juste après)
5. ✅ Vérifie que tout fonctionne avant de lancer officiellement

---

## 📊 Suivi des abonnements

Dashboard Stripe : https://dashboard.stripe.com/test/subscriptions
- Abonnements actifs
- Paiements échoués
- MRR (Monthly Recurring Revenue)
- Churn rate

Supabase :
```sql
-- Compter les abonnements par plan
SELECT plan, COUNT(*) FROM subscriptions GROUP BY plan;

-- Abonnements en trial
SELECT * FROM subscriptions WHERE trial_until > NOW();

-- Abonnements expirés ce mois
SELECT * FROM subscriptions WHERE current_period_end < NOW()
  AND current_period_end > NOW() - INTERVAL '30 days';
```
