# Configuration des produits Stripe

## Étape 1 : Créer le produit Pro dans Stripe Dashboard

1. Va sur https://dashboard.stripe.com/test/products
2. Clique sur "Ajouter un produit"

### Produit : ratee.me Pro
- **Nom** : ratee.me Pro
- **Description** : Plan Pro avec projets et feedbacks illimités
- **Type de facturation** : Récurrent

### Prix mensuel
- **Prix** : 19 EUR / mois
- **Intervalle de facturation** : Mensuel
- **ID du prix** : Copie l'ID (format : `price_xxxxx`)

### Prix annuel
- **Prix** : 190 EUR / an
- **Intervalle de facturation** : Annuel
- **ID du prix** : Copie l'ID (format : `price_yyyyy`)

---

## Étape 2 : Récupérer les clés API

### Dashboard Stripe > Développeurs > Clés API
- **Clé publique** : `pk_test_...`
- **Clé secrète** : `sk_test_...`

---

## Étape 3 : Configurer le webhook

1. Va sur https://dashboard.stripe.com/test/webhooks
2. Clique sur "Ajouter un point de terminaison"
3. URL du endpoint : `https://ton-domaine.com/api/webhooks/stripe`
   - En local : utilise [Stripe CLI](https://stripe.com/docs/stripe-cli)

4. Sélectionne ces événements :
   - `customer.subscription.created`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
   - `invoice.payment_failed`

5. Copie le **secret de signature webhook** : `whsec_...`

---

## Étape 4 : Ajouter les variables d'environnement

Copie ces valeurs dans ton fichier `.env.local` :

```bash
# Stripe
STRIPE_SECRET_KEY=sk_test_xxxxxxxxxxxxx
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_xxxxxxxxxxxxx
STRIPE_WEBHOOK_SECRET=whsec_xxxxxxxxxxxxx
STRIPE_PRICE_PRO_MONTHLY=price_xxxxxxxxxxxxx
STRIPE_PRICE_PRO_YEARLY=price_yyyyyyyyyyyyy
```

---

## Étape 5 : Test en local avec Stripe CLI

```bash
# Installer Stripe CLI
brew install stripe/stripe-cli/stripe

# Se connecter
stripe login

# Écouter les webhooks en local
stripe listen --forward-to localhost:3000/api/webhooks/stripe

# Tester un paiement
stripe trigger checkout.session.completed
```

---

## Étape 6 : Vérifier la configuration

1. Lance ton app : `npm run dev`
2. Va sur `/pricing`
3. Clique sur "Essayer 14 jours gratuit"
4. Vérifie que le checkout Stripe s'ouvre
5. Utilise une carte de test : `4242 4242 4242 4242`
6. Vérifie que l'abonnement apparaît dans Supabase

---

## Cartes de test Stripe

- **Succès** : `4242 4242 4242 4242`
- **Échec** : `4000 0000 0000 0002`
- **3D Secure** : `4000 0025 0000 3155`
- Date : N'importe quelle date future
- CVC : N'importe quel 3 chiffres
- Code postal : N'importe lequel

---

## Passage en production

Quand tu es prêt pour la prod :

1. Active ton compte Stripe (vérification d'identité)
2. Recrée les produits en mode LIVE
3. Récupère les clés LIVE (sans `_test_`)
4. Mets à jour `.env.production` avec les clés LIVE
5. Configure le webhook en production
