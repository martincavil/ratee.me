# 💳 Configuration Stripe pour ratee.me

## 🎯 Résumé

Tu as déjà tout le code nécessaire pour Stripe ! Il ne reste plus qu'à configurer ton compte.

**Ce qui est déjà fait :**

- ✅ Intégration Stripe complète (v20.0.0)
- ✅ API de checkout (`/api/payment/checkout`)
- ✅ Webhook handler (`/api/webhooks/stripe`)
- ✅ Composant CheckoutButton
- ✅ Gestion des abonnements dans Supabase
- ✅ Période d'essai de 30 jours

---

## 🚀 Quick Start (5 étapes)

### 1️⃣ Créer un compte Stripe

```
https://dashboard.stripe.com/register
```

✅ Active le mode Test pour commencer

### 2️⃣ Créer les produits dans Stripe

**Dashboard > Produits > Ajouter un produit**

- **Produit** : ratee.me Pro
- **Prix mensuel** : 19 EUR / mois → Copie le `price_xxxxx`
- **Prix annuel** : 190 EUR / an → Copie le `price_yyyyy`

### 3️⃣ Récupérer les clés API

**Dashboard > Développeurs > Clés API**

- Copie la clé publique : `pk_test_...`
- Copie la clé secrète : `sk_test_...`

### 4️⃣ Configurer `.env.local`

```bash
# Stripe
STRIPE_SECRET_KEY=sk_test_xxxxxxxxxxxxx
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_xxxxxxxxxxxxx
STRIPE_WEBHOOK_SECRET=whsec_xxxxxxxxxxxxx  # On le configure après
STRIPE_PRICE_PRO_MONTHLY=price_xxxxxxxxxxxxx
STRIPE_PRICE_PRO_YEARLY=price_yyyyyyyyyyyyy
```

### 5️⃣ Tester en local

```bash
# Vérifier la configuration
node scripts/check-stripe-config.js

# Lancer l'app
npm run dev

# Dans un autre terminal : écouter les webhooks
stripe listen --forward-to localhost:3000/api/webhooks/stripe

# Tester le checkout
open http://localhost:3000/pricing
```

**Carte de test** : `4242 4242 4242 4242`

---

## 📚 Guides détaillés

- **Setup complet** : `scripts/setup-stripe-products.md`
- **Tests** : `scripts/test-stripe-integration.md`
- **Vérification** : `node scripts/check-stripe-config.js`

---

## 🎨 Flux utilisateur

```
1. User clique sur "Essayer 14 jours gratuit" (/pricing)
   ↓
2. Redirigé vers Stripe Checkout (hosted)
   ↓
3. Entre ses informations de paiement
   ↓
4. Stripe crée l'abonnement avec trial de 30 jours
   ↓
5. Webhook envoyé vers /api/webhooks/stripe
   ↓
6. Supabase mis à jour : plan = "pro", trial_until = +30 jours
   ↓
7. User redirigé vers /dashboard
   ↓
8. Banner "Trial" s'affiche avec compte à rebours
```

---

## 🔧 Architecture technique

### Routes API

- `POST /api/payment/checkout` - Crée une session Stripe Checkout
- `POST /api/webhooks/stripe` - Reçoit les événements de Stripe

### Base de données (Supabase)

```sql
subscriptions
├── user_id
├── plan (free|pro|business)
├── status (active|cancelled|past_due)
├── stripe_customer_id
├── stripe_subscription_id
├── trial_until
├── current_period_start
└── current_period_end
```

### Webhooks gérés

- `customer.subscription.created` - Nouvel abonnement
- `customer.subscription.updated` - Mise à jour
- `customer.subscription.deleted` - Annulation
- `invoice.payment_failed` - Échec de paiement

---

## 💰 Plans configurés

| Plan     | Prix      | Trial       | Limits                     |
| -------- | --------- | ----------- | -------------------------- |
| Free     | 0€        | ❌          | 1 projet, 3 feedbacks/mois |
| Pro      | 19€/mois  | ✅ 30 jours | Illimité                   |
| Business | Sur devis | Custom      | Illimité + features        |

---

## 🐛 Troubleshooting

### Le checkout ne s'ouvre pas

```bash
# Vérifie la config
node scripts/check-stripe-config.js

# Vérifie les logs dans la console
# app/api/payment/checkout/route.ts ligne 79
```

### Les webhooks ne marchent pas

```bash
# En local, utilise Stripe CLI
stripe listen --forward-to localhost:3000/api/webhooks/stripe

# Copie le webhook secret qui s'affiche
# Mets-le dans .env.local : STRIPE_WEBHOOK_SECRET=whsec_...
```

### L'abonnement n'apparaît pas dans Supabase

```bash
# Vérifie que la table subscriptions existe
# Vérifie les logs du webhook dans Stripe Dashboard
# Vérifie que le webhook secret est correct
```

---

## 🚀 Passage en production

Quand tu es prêt :

1. ✅ Active ton compte Stripe (vérification d'identité)
2. ✅ Recrée les produits en mode LIVE
3. ✅ Récupère les nouvelles clés (sans `_test_`)
4. ✅ Configure le webhook en production :
   - URL : `https://ratee.me/api/webhooks/stripe`
   - Sélectionne les 4 événements
5. ✅ Mets à jour tes variables d'environnement de prod
6. ✅ Teste avec une vraie carte (annule juste après)

---

## 📊 Monitoring

### Dashboard Stripe

https://dashboard.stripe.com/subscriptions

- Abonnements actifs
- MRR (Monthly Recurring Revenue)
- Paiements échoués

### Requêtes Supabase utiles

```sql
-- Abonnements actifs Pro
SELECT COUNT(*) FROM subscriptions WHERE plan = 'pro' AND status = 'active';

-- MRR estimé
SELECT COUNT(*) * 19 as mrr FROM subscriptions WHERE plan = 'pro' AND status = 'active';

-- Trials qui expirent dans 7 jours
SELECT * FROM subscriptions
WHERE trial_until BETWEEN NOW() AND NOW() + INTERVAL '7 days';
```

---

## 🤝 Support

- **Stripe Docs** : https://stripe.com/docs
- **Stripe CLI** : https://stripe.com/docs/stripe-cli
- **Test Cards** : https://stripe.com/docs/testing

---

## ✅ Checklist finale

Avant de lancer en production :

- [ ] Compte Stripe vérifié
- [ ] Produits créés en mode LIVE
- [ ] Clés LIVE configurées
- [ ] Webhook configuré en production
- [ ] Test avec vraie carte effectué
- [ ] Emails de confirmation testés
- [ ] Dashboard Stripe configuré (logo, support, etc.)
- [ ] Conditions générales de vente à jour
- [ ] Politique de remboursement définie

---

**Besoin d'aide ?** Consulte les guides dans `scripts/` ou la doc Stripe 📚
