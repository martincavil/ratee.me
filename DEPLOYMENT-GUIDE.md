# 🚀 Guide de déploiement - ratee.me

## 📋 Checklist complète avant lancement Beta

### 1. Configuration Resend Email ✉️

#### **Local/Dev (tests)**

- [x] RESEND_API_KEY configuré
- [x] RESEND_FROM_EMAIL = `onboarding@resend.dev`
- [ ] **Vérifier ton adresse email de test dans Resend** :
  1. Va sur https://resend.com/settings
  2. Section "Email Addresses"
  3. Ajoute ton email de test
  4. Confirme l'email de vérification
  5. Réessaye d'envoyer un feedback

#### **Production (lancement beta)**

- [ ] Ajouter le domaine `ratee.me` dans Resend :
  1. https://resend.com/domains → "Add Domain"
  2. Entre `ratee.me`
  3. Copie les enregistrements DNS (SPF, DKIM, DMARC)
- [ ] Configurer les DNS chez ton registrar :

  ```
  Type: TXT
  Name: @ (ou ratee.me)
  Value: [SPF de Resend]

  Type: TXT
  Name: resend._domainkey
  Value: [DKIM de Resend]

  Type: TXT
  Name: _dmarc
  Value: [DMARC de Resend]
  ```

- [ ] Attendre 5-30 min (propagation DNS)
- [ ] Vérifier le domaine dans Resend (bouton "Verify")
- [ ] Mettre à jour `.env` prod :
  ```bash
  RESEND_FROM_EMAIL="feedback@ratee.me"
  ```

---

### 2. Configuration Stripe 💳

#### **Local/Dev**

- [x] Clés API test configurées
- [x] Price IDs configurés (19€/mois, 190€/an)
- [x] Stripe CLI installé et webhook local fonctionnel

#### **Production**

- [ ] Activer le compte Stripe (vérification d'identité)
- [ ] Créer les produits en mode **LIVE** :
  - Pro Monthly: 19€/mois
  - Pro Yearly: 190€/an
- [ ] Copier les nouveaux Price IDs (mode LIVE)
- [ ] Récupérer les clés API **LIVE** :
  - `STRIPE_SECRET_KEY` (sk*live*...)
  - `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` (pk*live*...)
- [ ] Configurer le webhook en production :
  - URL : `https://ratee.me/api/webhooks/stripe`
  - Événements :
    - `customer.subscription.created`
    - `customer.subscription.updated`
    - `customer.subscription.deleted`
    - `invoice.payment_failed`
  - Copier le Webhook Secret (`whsec_...`)
- [ ] Mettre à jour les variables d'environnement prod

---

### 3. Configuration Supabase 🗄️

#### **Tables à vérifier**

- [x] `users` (trigger auto-création OK)
- [x] `projects`
- [x] `feedbacks`
- [x] `badge_stats`
- [x] `subscriptions`
- [x] `waitlist`
- [x] `beta_invites`
- [x] `email_automations`

#### **Sécurité RLS (Row Level Security)**

- [x] Toutes les tables ont RLS activé
- [x] Policies configurées correctement
- [ ] Vérifier les permissions admin (email = martincavil.dev@gmail.com)

#### **Production**

- [ ] Passer de la tier gratuite à un plan payant (si nécessaire)
- [ ] Activer les backups automatiques
- [ ] Configurer les logs et monitoring

---

### 4. Déploiement sur Vercel ▲

#### **Prérequis**

- [ ] Compte Vercel créé
- [ ] Installer Vercel CLI : `npm i -g vercel`

#### **Première fois**

```bash
# Se connecter à Vercel
vercel login

# Déployer
vercel --prod
```

#### **Variables d'environnement Vercel**

Dans le dashboard Vercel > Settings > Environment Variables, ajouter :

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGc...

# Site URLs
NEXT_PUBLIC_APP_URL=https://ratee.me
NEXT_PUBLIC_SITE_URL=https://ratee.me

# Resend
RESEND_API_KEY=re_...
RESEND_FROM_EMAIL=feedback@ratee.me

# Stripe (LIVE)
STRIPE_SECRET_KEY=sk_live_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
STRIPE_PRICE_PRO_MONTHLY=price_...
STRIPE_PRICE_PRO_YEARLY=price_...
```

#### **Domaine personnalisé**

- [ ] Vercel > Settings > Domains → Ajouter `ratee.me`
- [ ] Configurer les DNS :

  ```
  Type: A
  Name: @
  Value: 76.76.21.21

  Type: CNAME
  Name: www
  Value: cname.vercel-dns.com
  ```

- [ ] Attendre propagation (5-30 min)
- [ ] Vérifier le SSL (automatique avec Vercel)

---

### 5. Tests avant lancement 🧪

#### **Flow complet à tester**

**1. Inscription Beta**

- [ ] Générer un token beta : `node scripts/generate-beta-token.js email@test.com`
- [ ] Cliquer sur le lien beta
- [ ] Vérifier la création du compte
- [ ] Vérifier que le plan Pro est activé
- [ ] Se connecter avec le mot de passe temporaire

**2. Création projet + Envoi feedback**

- [ ] Créer un nouveau projet
- [ ] Ajouter email client
- [ ] Envoyer une demande de feedback
- [ ] Vérifier la réception de l'email
- [ ] Cliquer sur le lien dans l'email
- [ ] Soumettre un feedback (NPS + commentaire)
- [ ] Vérifier que le feedback apparaît dans le dashboard

**3. Badge NPS**

- [ ] Aller sur `/dashboard/badge`
- [ ] Vérifier que le score NPS est correct
- [ ] Copier le code embed
- [ ] Tester le badge sur une page externe

**4. Abonnement Stripe**

- [ ] Aller sur `/pricing`
- [ ] Cliquer sur "Commencer" (Pro mensuel)
- [ ] Tester le checkout Stripe
- [ ] Vérifier la redirection dashboard
- [ ] Vérifier que le badge "PRO" s'affiche
- [ ] Vérifier dans Stripe dashboard que l'abonnement est actif

**5. Admin**

- [ ] Se connecter avec email admin
- [ ] Aller sur `/admin/waitlist`
- [ ] Vérifier les statistiques
- [ ] Générer des invites beta

---

### 6. Monitoring & Analytics 📊

#### **À mettre en place**

- [ ] Google Analytics ou Plausible
- [ ] Sentry pour le monitoring d'erreurs
- [ ] Uptime monitoring (UptimeRobot, etc.)
- [ ] Supabase logs monitoring

#### **KPIs à suivre**

- Nombre d'inscriptions beta
- Taux de conversion beta → payant
- Nombre de feedbacks collectés
- Score NPS moyen
- Taux d'abandon checkout Stripe
- Temps de réponse des emails

---

### 7. Légal & Communication 📄

- [ ] CGU/CGV mises à jour
- [ ] Politique de confidentialité (RGPD)
- [ ] Mentions légales
- [ ] Email de bienvenue beta testeurs
- [ ] Documentation/FAQ pour beta testeurs
- [ ] Support email configuré (martin@ratee.me)

---

### 8. Plan de lancement Beta 🎉

#### **Semaine -1**

- [ ] Tester TOUT le flow en local
- [ ] Déployer sur Vercel (env de staging)
- [ ] Tester en staging avec vraie carte Stripe
- [ ] Inviter 2-3 amis pour tester

#### **Jour J**

- [ ] Déployer en production
- [ ] Générer les premiers tokens beta
- [ ] Envoyer les emails d'invitation
- [ ] Poster sur Twitter/LinkedIn (optionnel)

#### **Semaine +1**

- [ ] Suivre les premiers utilisateurs
- [ ] Récolter les feedbacks beta
- [ ] Corriger les bugs critiques
- [ ] Préparer les améliorations

---

## 🆘 Troubleshooting

### Les emails n'arrivent pas

- Vérifier que le domaine est vérifié dans Resend
- Vérifier les logs Resend : https://resend.com/emails
- Vérifier les spams
- Tester avec `onboarding@resend.dev` en dev

### Le paiement Stripe ne fonctionne pas

- Vérifier que les clés LIVE sont configurées
- Vérifier le webhook en prod
- Vérifier les logs Stripe : https://dashboard.stripe.com/logs
- Tester avec la carte de test : 4242 4242 4242 4242

### Erreur "Database error"

- Vérifier que toutes les tables existent dans Supabase
- Vérifier les RLS policies
- Vérifier les logs Supabase
- Vérifier que la SERVICE_ROLE_KEY est correcte

---

## 📞 Support

Pour toute question pendant le déploiement, consulte :

- Documentation Vercel : https://vercel.com/docs
- Documentation Resend : https://resend.com/docs
- Documentation Stripe : https://stripe.com/docs
- Documentation Supabase : https://supabase.com/docs

---

**Bon lancement ! 🚀**
