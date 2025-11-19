# 🧪 ratee.me - Guide de Test End-to-End

Ce guide vous permet de tester le flow complet de l'application avant de déployer en production.

---

## 📋 Pré-requis

### 1. **Setup Supabase**

Si ce n'est pas déjà fait, suivez le guide `SUPABASE-SETUP.md` pour:
- ✅ Créer un projet Supabase
- ✅ Exécuter le schema SQL
- ✅ Configurer les variables d'environnement

### 2. **Setup Resend (Email Provider)**

1. Créez un compte sur [Resend.com](https://resend.com)
2. Vérifiez votre domaine (ou utilisez le domaine de test)
3. Créez une API Key
4. Ajoutez dans `.env.local`:

```bash
RESEND_API_KEY=re_xxxxxxxxxxxxx
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

**Note:** Pour les tests, Resend permet d'envoyer des emails à votre propre adresse sans domaine vérifié!

---

## 🚀 Test Flow Complet

### **Étape 1: Démarrer l'Application**

```bash
npm run dev
```

Ouvrez http://localhost:3000

---

### **Étape 2: Créer un Compte**

1. Allez sur `/signup`
2. Créez un compte avec:
   - Email: `votre-email@example.com`
   - Password: `Password123`
   - Name: `Test User`
   - Company: `Test Company` (optionnel)
3. ✅ Vous devriez être redirigé vers `/dashboard`

---

### **Étape 3: Créer un Projet**

1. Cliquez sur "New Project"
2. Remplissez le formulaire:
   - **Project Name**: `Site Web Client Test`
   - **Client Name**: `Jean Dupont`
   - **Client Email**: `VOTRE-VRAI-EMAIL@example.com` ⚠️ Utilisez VOTRE email pour recevoir le test!
   - **Description**: `Création de site web vitrine`
   - **Delivery Date**: Une date dans le futur
3. Cliquez "Create Project"
4. ✅ Le projet apparaît dans la liste

**Screenshot de référence:**
```
Project Name: Site Web Client Test
Client: Jean Dupont
Delivery Date: 2024-12-31
Status: In Progress
Feedback: Not Sent
```

---

### **Étape 4: Envoyer une Demande de Feedback**

1. Dans la liste des projets, trouvez le bouton **"Send Feedback"** (vert)
2. Cliquez dessus
3. Confirmez dans la popup
4. ✅ Vous devriez voir "Feedback request sent successfully!"
5. ✅ Le status "Feedback" passe de "not sent" à "sent" (jaune)

**⚠️ Important:** Si vous voyez une erreur:
- Vérifiez que `RESEND_API_KEY` est dans `.env.local`
- Vérifiez que le client email est rempli
- Regardez les logs dans le terminal

---

### **Étape 5: Recevoir l'Email de Feedback**

1. Ouvrez votre boîte mail (celle que vous avez mise en "Client Email")
2. ✅ Vous devriez recevoir un email de `noreply@ratee.me`
3. ✅ Subject: "We'd love your feedback on Site Web Client Test"
4. ✅ L'email contient:
   - Greeting personnalisé ("Hi Jean Dupont!")
   - Nom du projet
   - Bouton bleu "Share Your Feedback"
   - Link de feedback

**Screenshot email attendu:**
```
┌─────────────────────────────────────┐
│         ratee.me                    │
├─────────────────────────────────────┤
│ Hi Jean Dupont! 👋                  │
│                                     │
│ We hope you're happy with           │
│ Site Web Client Test                │
│                                     │
│   [Share Your Feedback]  (bouton)   │
│                                     │
│ Or copy this link:                  │
│ http://localhost:3000/feedback/xxx  │
└─────────────────────────────────────┘
```

---

### **Étape 6: Soumettre le Feedback (Côté Client)**

1. Cliquez sur le bouton dans l'email OU copiez le lien
2. ✅ La page `/feedback/[token]` s'affiche avec:
   - Titre: "We'd love your feedback!"
   - Nom du projet affiché
   - Formulaire NPS

3. **Remplissez le formulaire:**
   - Sélectionnez un score (ex: 9/10 - bouton vert)
   - Name: `Jean Dupont`
   - Email: `jean@example.com` (optionnel)
   - Comment: `Super travail, très satisfait!` (optionnel)

4. Cliquez "Submit Feedback"
5. ✅ Vous êtes redirigé vers `/feedback/[token]/thank-you`
6. ✅ Message "Thank You!" avec icône verte

---

### **Étape 7: Vérifier le Feedback dans le Dashboard**

1. Retournez sur le dashboard (connecté avec votre compte)
2. Allez sur "Feedbacks" dans la navbar
3. ✅ Vous devriez voir le feedback:
   - Client: Jean Dupont
   - Score: 9/10 (badge vert)
   - Comment: "Super travail, très satisfait!"
   - Date: Aujourd'hui

4. Retournez sur "Projects"
5. ✅ Le status "Feedback" est maintenant "received" (badge vert)

---

### **Étape 8: Vérifier la Badge Page**

1. Allez sur "Badge" dans la navbar
2. ✅ Vous devriez voir:
   - Badge preview avec votre NPS (9.0 si c'est votre seul feedback)
   - Total feedbacks: 1
   - Stats breakdown (1 promoter, 0 passive, 0 detractor)

3. ✅ Le code d'embed est mis à jour avec votre NPS

---

## ✅ Checklist de Test Complet

Cochez chaque étape une fois validée:

### Authentification
- [ ] Signup fonctionne
- [ ] Login fonctionne
- [ ] Logout fonctionne
- [ ] Dashboard protégé (redirect si non connecté)

### Projects CRUD
- [ ] Créer un projet
- [ ] Voir la liste des projets
- [ ] Éditer un projet
- [ ] Supprimer un projet
- [ ] Filtres (All, In Progress, Delivered, Archived)

### Feedback Request
- [ ] Bouton "Send Feedback" visible si `feedback_status = not_sent`
- [ ] Email envoyé avec succès
- [ ] Email reçu dans la boîte mail
- [ ] Email bien formaté (HTML + texte)
- [ ] Lien de feedback fonctionne
- [ ] Status passe à "sent" après envoi

### Feedback Submission (Public)
- [ ] Page `/feedback/[token]` s'affiche
- [ ] Token invalide → page 404 personnalisée
- [ ] Formulaire NPS fonctionne
  - [ ] Sélection score 0-10
  - [ ] Couleurs correctes (rouge/jaune/vert)
  - [ ] Validation côté client
  - [ ] Nom requis
  - [ ] Email optionnel
  - [ ] Commentaire optionnel
- [ ] Soumission réussie
- [ ] Redirect vers Thank You page
- [ ] Feedback visible dans dashboard
- [ ] Project status passe à "received"

### Dashboard Stats
- [ ] Dashboard home affiche stats correctes
- [ ] Feedbacks page affiche liste
- [ ] NPS distribution correcte
- [ ] Badge page affiche bon NPS
- [ ] Badge preview fonctionne

### Settings
- [ ] Modifier profil (nom, company, avatar)
- [ ] Sign out fonctionne

---

## 🐛 Debugging - Problèmes Courants

### Email ne part pas

**Erreur:** `RESEND_API_KEY is not set`

**Solution:**
```bash
# Vérifiez .env.local
cat .env.local | grep RESEND

# Si vide, ajoutez:
echo "RESEND_API_KEY=re_xxxxx" >> .env.local

# Redémarrez le serveur
npm run dev
```

---

### Email reçu mais lien ne fonctionne pas

**Erreur:** `Invalid feedback link`

**Cause:** Token généré par Supabase trigger manquant

**Solution:**
1. Vérifiez que le trigger Supabase est créé:
```sql
-- Dans Supabase SQL Editor
SELECT * FROM projects WHERE id = 'votre-project-id';
-- Vérifiez que feedback_token n'est pas NULL
```

2. Si NULL, le trigger n'a pas fonctionné. Re-créez le trigger depuis `SUPABASE-SETUP.md`

---

### Feedback ne s'enregistre pas

**Erreur:** `Failed to create feedback`

**Solution:**
1. Vérifiez les logs du terminal
2. Vérifiez que la table `feedbacks` existe dans Supabase
3. Vérifiez les RLS policies:
```sql
-- Dans Supabase
SELECT * FROM feedbacks; -- Devrait fonctionner sans auth
```

---

### Dashboard vide après création projet

**Cause:** RLS policies bloquent la lecture

**Solution:**
```sql
-- Dans Supabase SQL Editor
SELECT * FROM projects WHERE user_id = auth.uid();

-- Si vide alors que vous avez créé des projets:
-- Re-créez les RLS policies depuis SUPABASE-SETUP.md
```

---

## 📊 Test avec Données Multiples

Pour tester avec plus de données:

### Créer 5+ Projets

```
Projet 1: Site Web - delivered - feedback received (NPS 9)
Projet 2: App Mobile - in_progress - feedback sent
Projet 3: Branding - in_progress - feedback not sent
Projet 4: SEO - archived - feedback received (NPS 7)
Projet 5: Logo - delivered - feedback received (NPS 10)
```

### Soumettre Feedbacks Variés

- Détracteur (0-6): Score 5, "Pas terrible"
- Passif (7-8): Score 7, "Correct mais peut mieux faire"
- Promoteur (9-10): Score 10, "Parfait, je recommande!"

### Vérifier Calculs NPS

NPS moyen attendu avec les scores ci-dessus:
```
(9 + 7 + 10 + 5) / 4 = 7.75 ≈ 7.8
```

✅ Le dashboard devrait afficher `7.8` en Average NPS

---

## 🚀 Prochaines Étapes

Une fois tous les tests validés:

1. **Déploiement Vercel**
   - Push le code sur GitHub
   - Connecter à Vercel
   - Ajouter les env vars

2. **Setup Domaine Email**
   - Vérifier votre domaine sur Resend
   - Changer `from: 'noreply@ratee.me'` → `from: 'noreply@votre-domaine.com'`

3. **Production Testing**
   - Re-test complet en prod
   - Vérifier les emails arrivent bien

---

## 💡 Tips

- **Utilisez votre vrai email** pour tester l'envoi d'emails
- **Testez sur mobile** - la page feedback doit être responsive
- **Vérifiez les couleurs NPS** - Rouge/Jaune/Vert doivent être clairs
- **Testez les edge cases:**
  - Token invalide
  - Projet sans email client
  - Feedback déjà reçu (pas de re-send)

---

Bon test! 🎉
