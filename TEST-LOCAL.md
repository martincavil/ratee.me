# 🧪 Guide de Test Local Complet - ratee.me

## Pré-requis

✅ Serveur de dev lancé : http://localhost:3000
✅ RESEND_API_KEY configuré dans .env.local
✅ Base de données Supabase configurée

---

## 🎯 Objectif du Test

Tester le **flow complet** de l'application :
1. Landing page
2. Inscription/Connexion
3. Création de projet
4. Envoi d'email de feedback
5. Soumission de feedback (côté client)
6. Vérification dashboard (côté freelance)

---

## 📋 TEST 1 : Landing Page

### Actions :
1. Ouvre http://localhost:3000
2. Tu devrais voir la landing page complète

### Points à vérifier :
- ✅ Section Hero avec texte "Plus jamais laisser un client de côté"
- ✅ Toggle langue FR/EN en haut à droite fonctionne
- ✅ Bouton "Commencer gratuitement" visible
- ✅ Toutes les sections s'affichent :
  - Problem
  - Solution
  - Features (4 features)
  - Results (statistiques)
  - Testimonials (3 témoignages)
  - How It Works (3 étapes)
  - Pricing (3 plans)
  - FAQ (6 questions)
  - Footer

### Test de la langue :
- Clique sur 🇺🇸 EN → Le texte doit passer en anglais
- Clique sur 🇫🇷 FR → Le texte revient en français

---

## 📋 TEST 2 : Inscription

### Actions :
1. Clique sur "Commencer gratuitement" OU va sur http://localhost:3000/signup
2. Remplis le formulaire :
   - **Email** : `ton-vrai-email@gmail.com` ⚠️ Utilise TON email pour recevoir les tests
   - **Password** : `Password123`
   - **Full Name** : `Test User`
   - **Company** : `Ma Boîte` (optionnel)
3. Clique sur "Sign Up"

### Résultat attendu :
- ✅ Redirection vers `/dashboard`
- ✅ Tu vois "Welcome back, Test User!" en haut
- ✅ Dashboard vide (0 projets, 0 feedbacks)

---

## 📋 TEST 3 : Navigation Dashboard

### Actions :
1. Explore la navbar :
   - Dashboard
   - Projects
   - Feedbacks
   - Badge
   - Settings

### Points à vérifier :
- ✅ Toutes les pages se chargent
- ✅ Avatar avec initiales "TU" en haut à droite
- ✅ Dropdown "Settings" et "Sign Out" fonctionnent

---

## 📋 TEST 4 : Création de Projet

### Actions :
1. Va sur "Projects" dans la navbar
2. Clique sur "+ New Project"
3. Remplis le formulaire :
   - **Project Name** : `Site Web Client Test`
   - **Client Name** : `Jean Dupont`
   - **Client Email** : `TON-EMAIL@gmail.com` ⚠️ IMPORTANT : Utilise TON email pour recevoir l'email de test
   - **Description** : `Création de site web vitrine`
   - **Delivery Date** : Une date dans le futur (ex: 2025-12-31)
   - **Status** : `In Progress`
4. Clique "Create Project"

### Résultat attendu :
- ✅ Modal se ferme
- ✅ Le projet apparaît dans la liste
- ✅ Status : "In Progress" (badge bleu)
- ✅ Feedback : "Not Sent" (badge gris)
- ✅ Bouton vert "Send Feedback" visible

**Screenshot attendu :**
```
┌─────────────────────────────────────────────────────────────┐
│ Project: Site Web Client Test                               │
│ Client: Jean Dupont (TON-EMAIL@gmail.com)                   │
│ Delivery: 2025-12-31                                        │
│ Status: In Progress (bleu)                                  │
│ Feedback: Not Sent (gris)                                   │
│ Actions: [Send Feedback] [Edit] [Delete]                   │
└─────────────────────────────────────────────────────────────┘
```

---

## 📋 TEST 5 : Envoi d'Email de Feedback (Côté Freelance)

### Actions :
1. Dans la liste des projets, clique sur le bouton vert **"Send Feedback"**
2. Confirme dans la popup "Send feedback request to client?"
3. Attends le message de succès

### Résultat attendu :
- ✅ Message : "Feedback request sent successfully!"
- ✅ Le bouton "Send Feedback" disparaît
- ✅ Le badge "Feedback" passe de "Not Sent" (gris) à "Sent" (jaune)

### En cas d'erreur :
Si tu vois "Failed to send email":
1. Vérifie que RESEND_API_KEY est bien dans .env.local
2. Regarde les logs dans le terminal
3. Vérifie que le client email est bien rempli

---

## 📋 TEST 6 : Réception de l'Email

### Actions :
1. Ouvre ta boîte mail (celle que tu as mise en "Client Email")
2. Cherche un email de `noreply@ratee.me`

### Email attendu :
- ✅ **Subject** : "We'd love your feedback on Site Web Client Test"
- ✅ **From** : Ratee.me <noreply@ratee.me>
- ✅ **Contenu** :
  - "Hi Jean Dupont! 👋"
  - "We hope you're happy with **Site Web Client Test**"
  - Bouton bleu "Share Your Feedback"
  - Lien de feedback : `http://localhost:3000/feedback/[token]`

### Si l'email n'arrive pas :
1. Vérifie tes spams/promotions
2. Attends 1-2 minutes (Resend peut être lent en dev)
3. Vérifie les logs du terminal pour voir si l'email est bien parti

---

## 📋 TEST 7 : Soumission de Feedback (Côté Client)

### Actions :
1. Dans l'email, clique sur le bouton "Share Your Feedback" OU copie le lien
2. La page de feedback s'ouvre : `/feedback/[token]`

### Page de feedback - Points à vérifier :
- ✅ Titre : "We'd love your feedback!"
- ✅ Nom du projet affiché : "Site Web Client Test"
- ✅ 11 boutons de score (0 à 10)
- ✅ Couleurs des boutons :
  - 0-6 : Gris (deviennent rouge au hover)
  - 7-8 : Gris (deviennent jaune au hover)
  - 9-10 : Gris (deviennent vert au hover)

### Remplir le formulaire :
1. Clique sur le score **9** (devrait devenir vert avec ring bleu)
2. Remplis :
   - **Name** : `Jean Dupont`
   - **Email** : `jean@example.com` (optionnel)
   - **Comment** : `Super travail, très satisfait du résultat!` (optionnel)
3. Clique "Submit Feedback"

### Résultat attendu :
- ✅ Redirection vers `/feedback/[token]/thank-you`
- ✅ Page "Thank You!" avec icône verte ✓
- ✅ Message : "Your feedback has been submitted successfully!"

---

## 📋 TEST 8 : Vérification Dashboard Freelance

### Actions :
1. Retourne sur le dashboard (connecté avec ton compte freelance)
2. Va sur "Feedbacks" dans la navbar

### Page Feedbacks - Points à vérifier :
- ✅ Le feedback apparaît dans la liste :
  - **Client** : Jean Dupont
  - **Project** : Site Web Client Test
  - **Score** : 9/10 (badge vert)
  - **Comment** : "Super travail, très satisfait du résultat!"
  - **Date** : Aujourd'hui

### Retour sur Projects :
1. Va sur "Projects"
2. Vérifie le projet "Site Web Client Test"

**État attendu :**
- ✅ Feedback Status : "Received" (badge vert)
- ✅ Le bouton "Send Feedback" a disparu (car déjà reçu)

---

## 📋 TEST 9 : Dashboard Stats

### Actions :
1. Va sur "Dashboard" (page home)

### Stats attendues :
- ✅ **Total Projects** : 1
- ✅ **Total Feedbacks** : 1
- ✅ **Average NPS** : 9.0
- ✅ **Response Rate** : 100%

### Distribution NPS :
- ✅ Promoters (9-10) : 1 (badge vert)
- ✅ Passives (7-8) : 0
- ✅ Detractors (0-6) : 0

---

## 📋 TEST 10 : Badge Page

### Actions :
1. Va sur "Badge" dans la navbar

### Points à vérifier :
- ✅ Preview du badge avec NPS 9.0 affiché
- ✅ Stats :
  - Total feedbacks : 1
  - Promoters : 1
  - Passives : 0
  - Detractors : 0
- ✅ Code d'embed affiché (HTML snippet)
- ✅ Bouton "Copy Code" fonctionne

---

## 📋 TEST 11 : Settings

### Actions :
1. Va sur "Settings"
2. Modifie ton profil :
   - Change "Full Name" → `Martin Test`
   - Change "Company" → `Test Company`
3. Clique "Save Changes"

### Résultat attendu :
- ✅ Message : "Profile updated successfully"
- ✅ Dans la navbar, le nom change → "Welcome back, Martin Test!"
- ✅ Avatar change → "MT"

---

## 📋 TEST 12 : Logout / Login

### Actions :
1. Clique sur l'avatar en haut à droite
2. Clique "Sign Out"
3. Tu es redirigé vers `/login`
4. Reconnecte-toi avec :
   - Email : `ton-email@gmail.com`
   - Password : `Password123`

### Résultat attendu :
- ✅ Redirection vers `/dashboard`
- ✅ Tes projets et feedbacks sont toujours là

---

## 🎨 TEST BONUS : Test avec Plusieurs Feedbacks

### Objectif :
Tester le calcul du NPS moyen avec plusieurs scores différents

### Actions :
1. Crée 2 autres projets avec des clients différents
2. Envoie des feedback requests
3. Soumets des feedbacks avec scores variés :
   - **Projet 2** : Score 5 (Détracteur - rouge)
   - **Projet 3** : Score 7 (Passif - jaune)

### Résultat attendu au Dashboard :
- ✅ Total Feedbacks : 3
- ✅ Average NPS : (9 + 5 + 7) / 3 = **7.0**
- ✅ Distribution :
  - Promoters : 1
  - Passives : 1
  - Detractors : 1

---

## ✅ Checklist Complète

Coche chaque test une fois validé :

### Landing Page
- [ ] Landing page s'affiche correctement
- [ ] Toggle FR/EN fonctionne
- [ ] Toutes les sections sont visibles

### Authentification
- [ ] Signup fonctionne
- [ ] Login fonctionne
- [ ] Logout fonctionne
- [ ] Dashboard protégé (redirect si non connecté)

### Projects
- [ ] Créer un projet
- [ ] Voir la liste des projets
- [ ] Éditer un projet
- [ ] Supprimer un projet
- [ ] Filtres (All, In Progress, Delivered, Archived)

### Feedback Request (Côté Freelance)
- [ ] Bouton "Send Feedback" visible si status = "not_sent"
- [ ] Email envoyé avec succès
- [ ] Email reçu dans la boîte mail
- [ ] Email bien formaté (HTML)
- [ ] Lien de feedback fonctionne
- [ ] Status passe à "sent" après envoi

### Feedback Submission (Côté Client)
- [ ] Page `/feedback/[token]` s'affiche
- [ ] Formulaire NPS fonctionne
- [ ] Sélection score 0-10
- [ ] Couleurs correctes (rouge/jaune/vert)
- [ ] Validation côté client (nom requis)
- [ ] Soumission réussie
- [ ] Redirect vers Thank You page
- [ ] Feedback visible dans dashboard freelance
- [ ] Project status passe à "received"

### Dashboard Stats
- [ ] Dashboard home affiche stats correctes
- [ ] Feedbacks page affiche liste
- [ ] NPS distribution correcte
- [ ] Badge page affiche bon NPS

### Settings
- [ ] Modifier profil (nom, company)
- [ ] Sign out fonctionne

---

## 🐛 Problèmes Courants

### Email ne part pas
**Erreur** : "Failed to send email"

**Solution** :
```bash
# Vérifie .env.local
cat .env.local | grep RESEND

# Si la clé est incorrecte, remplace-la
# Redémarre le serveur : Ctrl+C puis npm run dev
```

### Email reçu mais lien ne fonctionne pas
**Erreur** : "Invalid feedback link"

**Cause** : Token non généré par Supabase

**Solution** :
1. Va sur Supabase SQL Editor
2. Vérifie que le trigger existe (voir SUPABASE-SETUP.md)
3. Vérifie un projet :
```sql
SELECT id, name, feedback_token FROM projects LIMIT 1;
```
Si feedback_token est NULL → Re-créer le trigger

### Feedback ne s'enregistre pas
**Erreur** : "Failed to create feedback"

**Solution** :
1. Vérifie les logs du terminal
2. Va sur Supabase → Table Editor → feedbacks
3. Vérifie que la table existe et a les bonnes colonnes

---

## 🎉 Test Réussi !

Si tous les points sont validés, ton application est **100% fonctionnelle en local** !

Prochaines étapes :
1. Déployer sur Vercel
2. Acheter le domaine ratee.me
3. Vérifier le domaine sur Resend
4. Re-tester en production

---

Bon test ! 🚀
