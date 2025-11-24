# 🔄 Flow Complet ratee.me - De la Connexion à J+60

Ce document décrit le parcours complet d'un utilisateur de ratee.me, depuis la première connexion jusqu'à l'automation d'emails à J+60 après la fin d'une mission.

---

## 📋 Table des Matières

1. [Inscription & Onboarding](#1-inscription--onboarding)
2. [Connexion](#2-connexion)
3. [Découverte du Dashboard](#3-découverte-du-dashboard)
4. [Création d'un Projet](#4-création-dun-projet)
5. [Gestion du Projet](#5-gestion-du-projet)
6. [Livraison du Projet](#6-livraison-du-projet)
7. [Email Automation J+0 (Onboarding)](#7-email-automation-j0-onboarding)
8. [Client Soumet son Feedback](#8-client-soumet-son-feedback)
9. [Réception du Feedback](#9-réception-du-feedback)
10. [Email Automation J+30](#10-email-automation-j30)
11. [Email Automation J+90](#11-email-automation-j90)
12. [Badge NPS](#12-badge-nps)

---

## 1. Inscription & Onboarding

### 1.1 Accès à la Landing Page
```
URL: https://ratee.me/
```

**User voit :**
- Hero section avec proposition de valeur
- Section "Comment ça marche"
- Pricing (Free, Pro, Business)
- FAQ
- CTA "Commencer gratuitement"

### 1.2 Clic sur "Commencer gratuitement"
```
Redirection: /auth/signup
```

### 1.3 Formulaire d'inscription
**Champs requis :**
- Email
- Mot de passe (min 6 caractères)
- Nom complet
- Nom de l'entreprise (optionnel)

**Action :**
```typescript
POST /api/auth/signup
Body: {
  email: "user@example.com",
  password: "password123",
  name: "Jean Dupont",
  company_name: "Dupont Agency"
}
```

### 1.4 Création du compte

**Côté Backend (API) :**
1. Validation des données (Zod schema)
2. Création du user dans `auth.users` (Supabase Auth)
3. Trigger automatique : création du profil dans `public.users`
4. Création d'une subscription FREE par défaut
5. Session créée automatiquement

**Response :**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "uuid",
      "email": "user@example.com",
      "name": "Jean Dupont"
    },
    "session": { ... }
  }
}
```

### 1.5 Redirection automatique
```
→ /dashboard
```

---

## 2. Connexion

### 2.1 Utilisateur revient sur le site
```
URL: /auth/login
```

### 2.2 Formulaire de connexion
**Champs :**
- Email
- Mot de passe

**Action :**
```typescript
POST /api/auth/login
Body: {
  email: "user@example.com",
  password: "password123"
}
```

### 2.3 Authentification

**Côté Backend :**
1. Validation avec Supabase Auth
2. Création de session (cookie httpOnly)
3. Récupération du profil user

**Response :**
```json
{
  "success": true,
  "data": {
    "user": { ... },
    "session": { ... }
  }
}
```

### 2.4 Redirection
```
→ /dashboard
```

---

## 3. Découverte du Dashboard

### 3.1 Page Dashboard chargée
```
URL: /dashboard
Layout: DashboardLayout (avec Navbar)
```

### 3.2 Appels API automatiques
```typescript
// Récupération des données en parallèle
Promise.all([
  fetch("/api/auth/me"),          // Info utilisateur
  fetch("/api/projects?limit=5"), // 5 derniers projets
  fetch("/api/feedbacks?limit=5"),// 5 derniers feedbacks
  fetch("/api/badge/stats"),      // Stats NPS
  fetch("/api/subscriptions"),    // Abonnement actuel
])
```

### 3.3 Dashboard affiche

**Banner du plan :**
- **Plan FREE** : "Vous êtes en plan FREE (1 projet/mois)"
  - CTA "Upgrade"
- **Plan PRO (trial)** : "Vous êtes en PRO (30j gratuit) - X jours restants"
- **Plan PRO (actif)** : "Vous êtes en plan PRO - Automations activées"

**Stats Cards :**
- Total Projets : `0`
- Total Feedbacks : `0`
- Score NPS Moyen : `0.0`
- Dernier Feedback : `Pas encore`

**Sections :**
- Projets Récents (vide)
  - CTA : "Créer votre premier projet"
- Feedbacks Récents (vide)
  - Message : "Les feedbacks apparaîtront ici une fois que vos clients répondront"

---

## 4. Création d'un Projet

### 4.1 Clic sur "+ Nouveau Projet"
```
Action: Ouvre une modale (NewProjectModal)
```

### 4.2 Formulaire de création
**Champs requis :**
- Nom du projet : "Refonte site web Acme"
- Nom du client : "John Doe"
- Email du client : "john@acme.com" (optionnel mais recommandé pour automation)
- Description : "Refonte complète du site web corporate"
- Date de livraison : "2024-12-15"

### 4.3 Soumission du formulaire
```typescript
POST /api/projects
Body: {
  name: "Refonte site web Acme",
  client_name: "John Doe",
  client_email: "john@acme.com",
  description: "Refonte complète du site web corporate",
  delivery_date: "2024-12-15"
}
```

### 4.4 Création en base

**Table `projects` :**
```sql
INSERT INTO projects (
  user_id,
  name,
  client_name,
  client_email,
  description,
  delivery_date,
  status,                    -- 'in_progress' par défaut
  feedback_status,           -- 'not_sent' par défaut
  feedback_token,            -- UUID généré automatiquement
  automation_onboarding_sent -- false par défaut
)
```

### 4.5 Projet créé
**Response :**
```json
{
  "success": true,
  "data": {
    "project": {
      "id": "project-uuid",
      "name": "Refonte site web Acme",
      "status": "in_progress",
      "feedback_status": "not_sent",
      "feedback_token": "token-uuid"
    }
  }
}
```

### 4.6 Dashboard mis à jour
- Projet apparaît dans "Projets Récents"
- Badge : `En cours`
- Total Projets : `1`

---

## 5. Gestion du Projet

### 5.1 Navigation vers la page Projets
```
URL: /dashboard/projects
```

### 5.2 Vue liste des projets
**Colonnes du tableau :**
- Projet : Nom + Description
- Client : Nom + Email
- Date de Livraison : 15/12/2024
- Statut : Badge "En cours"
- Feedback : Badge "Non envoyé"
- Actions : [Modifier] [Supprimer]

### 5.3 Actions disponibles
- **Modifier** : Éditer les infos du projet
- **Supprimer** : Supprimer le projet (avec confirmation)
- **Envoyer** : Apparaît quand le projet est livré (voir section suivante)

---

## 6. Livraison du Projet

### 6.1 Projet terminé
User marque le projet comme "Livré" via le bouton "Modifier"

### 6.2 Changement de statut
```typescript
PUT /api/projects/{id}
Body: {
  status: "delivered",
  completed_at: "2024-12-15T10:00:00Z" // Important pour automation
}
```

### 6.3 Mise à jour en base
```sql
UPDATE projects
SET
  status = 'delivered',
  completed_at = NOW(),
  updated_at = NOW()
WHERE id = 'project-uuid';
```

### 6.4 Apparition du bouton "Envoyer"
Dans la colonne Actions du tableau, si :
- `status = 'delivered'`
- `feedback_status = 'not_sent'`
- `client_email` existe

→ Bouton **"Envoyer"** apparaît

---

## 7. Email Automation J+0 (Onboarding)

### 7.1 Clic sur "Envoyer"
```
Action: Ouvre SendFeedbackModal
```

### 7.2 Modale d'envoi
**Affiche :**
- Email du client : john@acme.com
- Nom du projet : Refonte site web Acme
- Aperçu de l'email qui sera envoyé

### 7.3 Confirmation d'envoi
```typescript
POST /api/projects/{id}/send-feedback
```

### 7.4 Côté Backend - Envoi de l'email

**API Route :**
```typescript
// 1. Récupération du projet
const project = await getProjectById(id);

// 2. Génération du lien de feedback
const feedbackUrl = `${process.env.NEXT_PUBLIC_URL}/feedback/${project.feedback_token}`;

// 3. Envoi de l'email (via Resend ou autre)
await sendEmail({
  to: project.client_email,
  subject: `🎯 Votre avis sur ${project.name}`,
  template: 'feedback-request',
  data: {
    clientName: project.client_name,
    projectName: project.name,
    freelancerName: user.name,
    feedbackUrl: feedbackUrl
  }
});

// 4. Mise à jour du statut
await updateProject(id, {
  feedback_status: 'sent'
});

// 5. Enregistrement dans email_automations
await insertEmailAutomation({
  project_id: id,
  user_id: user.id,
  email_type: 'onboarding',
  client_email: project.client_email,
  client_name: project.client_name,
  sent_at: new Date(),
  status: 'sent'
});
```

### 7.5 Email reçu par le client

**Objet :** `🎯 Votre avis sur Refonte site web Acme`

**Contenu :**
```
Bonjour John,

J'espère que vous êtes satisfait du travail réalisé sur "Refonte site web Acme".

Votre avis est très important pour moi et m'aide à améliorer continuellement mes services.

Pourriez-vous prendre 30 secondes pour me donner votre feedback ?

[Donner mon avis] → Lien vers /feedback/{token}

Merci beaucoup !

Jean Dupont
Dupont Agency
```

### 7.6 Dashboard mis à jour
- Badge Feedback : `Non envoyé` → `Envoyé`
- Bouton "Envoyer" disparaît

---

## 8. Client Soumet son Feedback

### 8.1 Client clique sur le lien
```
URL: /feedback/{token}
```

### 8.2 Validation du token

**API :**
```typescript
GET /api/feedback/validate?token={token}

// Backend vérifie que le token existe
const project = await getProjectByToken(token);

if (!project) {
  → Redirect vers /feedback/not-found
}
```

### 8.3 Page de feedback affichée

**Contenu :**
- Logo ratee.me
- "Merci de donner votre avis sur le projet : Refonte site web Acme"
- Nom du client pré-rempli : John Doe

**Formulaire :**
1. **Score NPS (obligatoire) :**
   - Question : "Sur une échelle de 0 à 10, recommanderiez-vous Jean Dupont ?"
   - Boutons : [0] [1] [2] [3] [4] [5] [6] [7] [8] [9] [10]
   - Couleurs :
     - 0-6 : Rouge (Détracteur)
     - 7-8 : Orange (Passif)
     - 9-10 : Vert (Promoteur)

2. **Commentaire (optionnel) :**
   - Textarea : "Partagez votre expérience (optionnel)"

3. **Email (optionnel) :**
   - Input : "Votre email (pour être recontacté si besoin)"

### 8.4 Soumission du feedback
```typescript
POST /api/feedback/submit
Body: {
  token: "token-uuid",
  nps_score: 9,
  comment: "Excellent travail, très professionnel et à l'écoute !",
  email: "john@acme.com"
}
```

### 8.5 Enregistrement en base

**1. Récupération du projet :**
```sql
SELECT * FROM projects WHERE feedback_token = 'token-uuid';
```

**2. Insertion du feedback :**
```sql
INSERT INTO feedbacks (
  project_id,
  client_name,
  nps_score,
  comment,
  email,
  created_at
) VALUES (
  'project-uuid',
  'John Doe',
  9,
  'Excellent travail, très professionnel et à l\'écoute !',
  'john@acme.com',
  NOW()
);
```

**3. Mise à jour du projet :**
```sql
UPDATE projects
SET feedback_status = 'received'
WHERE id = 'project-uuid';
```

**4. Trigger automatique : Mise à jour badge_stats :**
```sql
-- Recalcule automatiquement les stats de l'utilisateur
INSERT INTO badge_stats (...)
-- ou UPDATE si existe déjà
```

### 8.6 Page de confirmation
```
Message: "Merci pour votre retour ! Votre avis a bien été enregistré."
Footer: "Propulsé par ratee.me"
```

---

## 9. Réception du Feedback

### 9.1 Dashboard actualisé automatiquement

**Nouvelle visite du dashboard :**

**Stats Cards :**
- Total Projets : `1`
- Total Feedbacks : `1` ← Incrémenté
- Score NPS Moyen : `9.0` ← Calculé
- Dernier Feedback : `Il y a quelques instants`

**Feedbacks Récents :**
```
┌─────────────────────────────────────────┐
│ John Doe                        [9/10]  │
│ "Excellent travail, très..."            │
│ Il y a quelques instants                │
└─────────────────────────────────────────┘
```

**Badge du projet :**
- Feedback : `Envoyé` → `Reçu`

### 9.2 Navigation vers page Feedbacks
```
URL: /dashboard/feedbacks
```

### 9.3 Stats détaillées affichées

**4 cartes de stats :**
- Score NPS Moyen : `9.0`
- Promoteurs (9-10) : `1`
- Passifs (7-8) : `0`
- Détracteurs (0-6) : `0`

**Liste de tous les feedbacks :**
```
┌───────────────────────────────────────────────┐
│ John Doe                            [9/10]    │
│ "Excellent travail, très professionnel et à   │
│  l'écoute !"                                  │
│ 15 décembre 2024                              │
└───────────────────────────────────────────────┘
```

---

## 10. Email Automation J+30

### 10.1 Cron Job automatique (Edge Function)

**Déclenchement :** Tous les jours à 9h (UTC)

**Requête :**
```sql
SELECT p.*, u.email as user_email, u.name as user_name
FROM projects p
JOIN users u ON p.user_id = u.id
JOIN subscriptions s ON s.user_id = u.id
WHERE
  p.status = 'delivered'
  AND p.completed_at IS NOT NULL
  AND p.completed_at <= NOW() - INTERVAL '30 days'
  AND p.completed_at > NOW() - INTERVAL '31 days'
  AND p.automation_30days_sent = false
  AND s.plan = 'pro'  -- Seulement pour les PRO
  AND p.client_email IS NOT NULL;
```

### 10.2 Email envoyé au client

**Objet :** `👋 30 jours après ${project.name} - Encore satisfait ?`

**Contenu :**
```
Bonjour John,

Cela fait maintenant 30 jours que nous avons finalisé "Refonte site web Acme".

J'espère que tout se passe bien et que vous en êtes toujours satisfait !

Si vous avez des retours supplémentaires ou des ajustements à faire,
n'hésitez pas à me recontacter.

[Donner un nouveau feedback] → Même lien /feedback/{token}

Merci encore pour votre confiance !

Jean Dupont
Dupont Agency
```

### 10.3 Mise à jour du flag
```sql
UPDATE projects
SET automation_30days_sent = true
WHERE id = 'project-uuid';
```

### 10.4 Enregistrement dans email_automations
```sql
INSERT INTO email_automations (
  project_id,
  user_id,
  email_type,        -- '30_days_followup'
  client_email,
  client_name,
  sent_at,
  status
) VALUES (...);
```

### 10.5 Si le client soumet un nouveau feedback

**Comportement :**
- Un nouveau feedback est créé dans la table `feedbacks`
- Les stats NPS sont recalculées (moyenne, promoteurs, etc.)
- Le `feedback_status` du projet reste `received`

---

## 11. Email Automation J+90

### 11.1 Cron Job automatique

**Requête similaire à J+30 :**
```sql
SELECT ...
WHERE
  p.completed_at <= NOW() - INTERVAL '90 days'
  AND p.completed_at > NOW() - INTERVAL '91 days'
  AND p.automation_90days_sent = false
  AND s.plan = 'pro';
```

### 11.2 Email envoyé au client

**Objet :** `🎯 3 mois après ${project.name} - Dernier retour`

**Contenu :**
```
Bonjour John,

Cela fait maintenant 3 mois que nous avons finalisé "Refonte site web Acme".

J'espère que vous en êtes toujours pleinement satisfait !

Si vous avez des projets futurs ou souhaitez recommander mes services,
je serais ravi de retravailler avec vous.

[Partager mon dernier avis] → Même lien /feedback/{token}

Au plaisir de collaborer de nouveau !

Jean Dupont
Dupont Agency
```

### 11.3 Mise à jour du flag
```sql
UPDATE projects
SET automation_90days_sent = true
WHERE id = 'project-uuid';
```

---

## 12. Badge NPS

### 12.1 Activation du Badge
```
URL: /dashboard/badge
```

### 12.2 Page Badge affiche

**Stats :**
- Score NPS Moyen : `9.0`
- Promoteurs : `1`
- Passifs : `0`
- Détracteurs : `0`

**Aperçu du Badge :**
```
┌─────────────────────────┐
│  Satisfaction Client    │
│         9.0             │
│   Score NPS Moyen       │
│  1 feedback au total    │
│  Certifié par ratee.me  │
└─────────────────────────┘
```

**Code d'intégration :**
```html
<div style="...">
  <div>Satisfaction Client</div>
  <div>9.0</div>
  <div>Score NPS Moyen</div>
  <div>1 feedbacks au total</div>
  <div>Certifié par ratee.me</div>
</div>
```

**Bouton [Copier]** → Copie le code HTML

### 12.3 Intégration sur le site

User colle le code sur son site web :
- Homepage
- Page À propos
- Portfolio

**Badge mis à jour automatiquement :**
- À chaque nouveau feedback reçu
- Les stats se mettent à jour en temps réel (via l'API publique)

---

## 📊 Récapitulatif Timeline

```
J-X     : Inscription
J-1     : Création du projet "Refonte site web Acme"
J+0     : Livraison + Email onboarding envoyé
J+0     : Client soumet son feedback (NPS 9/10)
J+30    : Email automatique "30 jours après"
J+90    : Email automatique "3 mois après"
```

---

## 🔑 Points Clés Techniques

### Tables principales utilisées :
1. **auth.users** : Authentification Supabase
2. **public.users** : Profils utilisateurs
3. **subscriptions** : Plans (free/pro)
4. **projects** : Projets avec tokens et flags automation
5. **feedbacks** : Feedbacks NPS des clients
6. **badge_stats** : Cache dénormalisé pour les stats
7. **email_automations** : Tracking des emails envoyés

### APIs principales :
- `POST /api/auth/signup`
- `POST /api/auth/login`
- `GET /api/auth/me`
- `POST /api/projects`
- `PUT /api/projects/{id}`
- `POST /api/projects/{id}/send-feedback`
- `POST /api/feedback/submit`
- `GET /api/badge/stats`

### Cron Jobs (Edge Functions) :
- **Daily 9am UTC** : Check projets J+30
- **Daily 9am UTC** : Check projets J+90

### RLS (Row Level Security) :
- Users peuvent voir/éditer uniquement leurs données
- Feedbacks lisibles uniquement par le owner du projet
- Badge stats publiquement lisibles

---

## ✅ Fonctionnalités par Plan

### FREE :
- ✅ 1 projet actif max
- ✅ Feedbacks illimités
- ✅ Badge NPS
- ❌ Email automation (J+30, J+90)

### PRO :
- ✅ Projets illimités
- ✅ Feedbacks illimités
- ✅ Badge NPS personnalisable
- ✅ Email automation (J+0, J+30, J+90)
- ✅ Analytics avancées
- ✅ Export données

---

## 🚀 Prochaines Étapes

1. **Stripe Integration** : Paiement PRO automatique
2. **Email Templates** : Design emails avec Resend
3. **Analytics** : Graphiques d'évolution NPS
4. **Multi-langues** : Support EN/FR pour les emails clients
5. **White-label** : Badge personnalisable avec couleurs brand

---

**Document créé le 24 janvier 2025**
**Version 1.0**
