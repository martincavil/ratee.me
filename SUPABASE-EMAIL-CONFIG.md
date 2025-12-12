# Configuration des Emails Supabase pour ratee.me

## 1. Configuration des URLs de redirection

### Dans Supabase Dashboard :

1. Va dans ton projet Supabase
2. `Authentication` → `URL Configuration`
3. Configure les URLs suivantes :

```
Site URL: https://ratee.me
```

**Redirect URLs (ajoute les deux) :**
```
https://ratee.me/**
https://ratee.me/auth/callback
```

### Variables d'environnement (Production)

Dans Vercel ou ton hébergeur, assure-toi que cette variable est bien configurée :

```env
NEXT_PUBLIC_APP_URL=https://ratee.me
```

---

## 2. Personnalisation des Templates d'Emails

### Dans Supabase Dashboard :

1. Va dans `Authentication` → `Email Templates`
2. Modifie chaque template ci-dessous

---

### 📧 Template: **Confirm signup** (Confirmation d'inscription)

**Subject:**
```
Confirme ton inscription à ratee.me
```

**Message Body (HTML):**
```html
<h2>Bienvenue sur ratee.me ! 🎉</h2>

<p>Salut {{ .Name }},</p>

<p>Merci de t'être inscrit sur <strong>ratee.me</strong>, la plateforme qui automatise la collecte de feedbacks clients pour les freelances et agences.</p>

<p>Clique sur le bouton ci-dessous pour confirmer ton adresse email et commencer à utiliser ratee.me :</p>

<p style="text-align: center; margin: 30px 0;">
  <a href="{{ .ConfirmationURL }}"
     style="background-color: #10B981;
            color: white;
            padding: 12px 24px;
            text-decoration: none;
            border-radius: 8px;
            font-weight: 600;
            display: inline-block;">
    Confirmer mon email
  </a>
</p>

<p style="color: #6B7280; font-size: 14px;">
  Si le bouton ne fonctionne pas, copie-colle ce lien dans ton navigateur :<br>
  <a href="{{ .ConfirmationURL }}" style="color: #10B981;">{{ .ConfirmationURL }}</a>
</p>

<hr style="border: none; border-top: 1px solid #E5E7EB; margin: 30px 0;">

<p style="color: #6B7280; font-size: 12px;">
  Tu n'as pas créé de compte sur ratee.me ? Ignore cet email.<br>
  Ce lien expire dans 24 heures.
</p>

<p style="color: #6B7280; font-size: 12px;">
  L'équipe ratee.me<br>
  <a href="https://ratee.me" style="color: #10B981;">ratee.me</a>
</p>
```

---

### 📧 Template: **Magic Link** (Connexion sans mot de passe - optionnel)

**Subject:**
```
Ton lien de connexion à ratee.me
```

**Message Body (HTML):**
```html
<h2>Connexion à ratee.me</h2>

<p>Salut,</p>

<p>Clique sur le bouton ci-dessous pour te connecter à ton compte <strong>ratee.me</strong> :</p>

<p style="text-align: center; margin: 30px 0;">
  <a href="{{ .ConfirmationURL }}"
     style="background-color: #10B981;
            color: white;
            padding: 12px 24px;
            text-decoration: none;
            border-radius: 8px;
            font-weight: 600;
            display: inline-block;">
    Se connecter
  </a>
</p>

<p style="color: #6B7280; font-size: 14px;">
  Si le bouton ne fonctionne pas, copie-colle ce lien dans ton navigateur :<br>
  <a href="{{ .ConfirmationURL }}" style="color: #10B981;">{{ .ConfirmationURL }}</a>
</p>

<hr style="border: none; border-top: 1px solid #E5E7EB; margin: 30px 0;">

<p style="color: #6B7280; font-size: 12px;">
  Tu n'as pas demandé ce lien ? Ignore cet email.<br>
  Ce lien expire dans 1 heure.
</p>

<p style="color: #6B7280; font-size: 12px;">
  L'équipe ratee.me<br>
  <a href="https://ratee.me" style="color: #10B981;">ratee.me</a>
</p>
```

---

### 📧 Template: **Reset Password** (Réinitialisation de mot de passe)

**Subject:**
```
Réinitialise ton mot de passe ratee.me
```

**Message Body (HTML):**
```html
<h2>Réinitialisation de mot de passe</h2>

<p>Salut,</p>

<p>Tu as demandé à réinitialiser ton mot de passe sur <strong>ratee.me</strong>.</p>

<p>Clique sur le bouton ci-dessous pour créer un nouveau mot de passe :</p>

<p style="text-align: center; margin: 30px 0;">
  <a href="{{ .ConfirmationURL }}"
     style="background-color: #10B981;
            color: white;
            padding: 12px 24px;
            text-decoration: none;
            border-radius: 8px;
            font-weight: 600;
            display: inline-block;">
    Réinitialiser mon mot de passe
  </a>
</p>

<p style="color: #6B7280; font-size: 14px;">
  Si le bouton ne fonctionne pas, copie-colle ce lien dans ton navigateur :<br>
  <a href="{{ .ConfirmationURL }}" style="color: #10B981;">{{ .ConfirmationURL }}</a>
</p>

<hr style="border: none; border-top: 1px solid #E5E7EB; margin: 30px 0;">

<p style="color: #6B7280; font-size: 12px;">
  Tu n'as pas demandé cette réinitialisation ? Ignore cet email et ton mot de passe ne changera pas.<br>
  Ce lien expire dans 1 heure.
</p>

<p style="color: #6B7280; font-size: 12px;">
  L'équipe ratee.me<br>
  <a href="https://ratee.me" style="color: #10B981;">ratee.me</a>
</p>
```

---

### 📧 Template: **Change Email Address** (Changement d'email)

**Subject:**
```
Confirme ta nouvelle adresse email
```

**Message Body (HTML):**
```html
<h2>Changement d'adresse email</h2>

<p>Salut,</p>

<p>Tu as demandé à changer ton adresse email sur <strong>ratee.me</strong>.</p>

<p>Clique sur le bouton ci-dessous pour confirmer ta nouvelle adresse email :</p>

<p style="text-align: center; margin: 30px 0;">
  <a href="{{ .ConfirmationURL }}"
     style="background-color: #10B981;
            color: white;
            padding: 12px 24px;
            text-decoration: none;
            border-radius: 8px;
            font-weight: 600;
            display: inline-block;">
    Confirmer ma nouvelle adresse
  </a>
</p>

<p style="color: #6B7280; font-size: 14px;">
  Si le bouton ne fonctionne pas, copie-colle ce lien dans ton navigateur :<br>
  <a href="{{ .ConfirmationURL }}" style="color: #10B981;">{{ .ConfirmationURL }}</a>
</p>

<hr style="border: none; border-top: 1px solid #E5E7EB; margin: 30px 0;">

<p style="color: #6B7280; font-size: 12px;">
  Tu n'as pas demandé ce changement ? Contacte-nous immédiatement à support@ratee.me<br>
  Ce lien expire dans 24 heures.
</p>

<p style="color: #6B7280; font-size: 12px;">
  L'équipe ratee.me<br>
  <a href="https://ratee.me" style="color: #10B981;">ratee.me</a>
</p>
```

---

## 3. Configuration SMTP (Optionnel mais recommandé)

Pour un meilleur taux de délivrabilité, configure un service SMTP :

### Dans Supabase Dashboard :
1. `Project Settings` → `Auth` → `SMTP Settings`
2. Active "Enable Custom SMTP"
3. Configure avec un service comme :
   - **Resend** (recommandé, gratuit jusqu'à 3000 emails/mois)
   - **SendGrid**
   - **Mailgun**
   - **Amazon SES**

### Exemple avec Resend :

```
SMTP Host: smtp.resend.com
SMTP Port: 587
SMTP Username: resend
SMTP Password: [ta clé API Resend]
Sender Email: noreply@ratee.me
Sender Name: ratee.me
```

---

## 4. Test en local

Pour tester en local avec les vraies URLs de production :

1. Dans `.env.local`, ajoute :
```env
NEXT_PUBLIC_SUPABASE_URL=https://ton-projet.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=ta-clé-anon
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

2. Dans Supabase, ajoute `http://localhost:3000/**` aux Redirect URLs (uniquement pour le dev)

---

## 5. Vérification

Après configuration :

1. ✅ Teste l'inscription sur https://ratee.me
2. ✅ Vérifie que l'email reçu est personnalisé
3. ✅ Vérifie que le lien de confirmation redirige vers https://ratee.me
4. ✅ Confirme ton email
5. ✅ Vérifie que tu es redirigé vers le dashboard

---

## Notes importantes

- Les templates utilisent la syntaxe Go Template de Supabase
- Variables disponibles : `{{ .ConfirmationURL }}`, `{{ .Token }}`, `{{ .Name }}`, etc.
- Le lien de confirmation expire après 24h par défaut
- Tu peux changer le délai d'expiration dans `Authentication` → `Settings` → `Email` → `Confirm email - expiry duration`

---

## Support

En cas de problème :
- [Documentation Supabase Email Templates](https://supabase.com/docs/guides/auth/auth-email-templates)
- [Guide SMTP Supabase](https://supabase.com/docs/guides/auth/auth-smtp)
