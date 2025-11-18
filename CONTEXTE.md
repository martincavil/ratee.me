# CONTEXTE.md - ratee.me MVP

> **Version**: 1.0
> **Last Updated**: 2025-11-18
> **Status**: Production Ready
> **Target**: MVP Launch (Day 1-30)

---

## SECTION 1: EXECUTIVE SUMMARY

**ratee.me** est un SaaS d'automatisation de feedback clients pour freelances et petites agences.

**Pain Point**: Les freelances et agences perdent du temps à solliciter manuellement des témoignages clients, les oublient souvent, et n'ont aucun système centralisé pour mesurer et afficher leur réputation professionnelle. Résultat: opportunités manquées de social proof et aucune data sur la satisfaction client.

**Solution**: ratee.me automatise la collecte de feedback via NPS (Net Promoter Score), centralise tous les témoignages dans un dashboard, et génère un badge de réputation embeddable sur n'importe quel site web (portfolio, site agence, profils).

**Target User**: Freelance web/design/dev (solo), ou petite agence (2-10 personnes) qui gère 5-50 projets/an et veut professionnaliser sa gestion de réputation.

**Valeur Clé**:
- Zéro friction: 1 clic pour demander feedback
- Data-driven: Voir sa vraie performance (NPS) en temps réel
- Social proof: Badge public avec stats pour convertir prospects
- Time saved: 10h/mois gagnées vs emails manuels

---

## SECTION 2: STRATÉGIE PRODUIT

### 2.1 Vision Long-term

**"Dans 12 mois, ratee.me sera le standard pour freelances/agences qui veulent centraliser et automatiser leur feedback clients. Zéro manuel, 100% data-driven."**

Positionnement: Le "Stripe" du feedback client pour indépendants - simple, élégant, puissant.

### 2.2 MVP Scope (Jour 1-30)

**Ce qu'on fait MAINTENANT** (et pourquoi):

✅ **Dashboard freelance** (espace privé)
- Login/signup email + password
- Page projets: CRUD complet (name, client, date, status)
- Page feedbacks: Liste des feedbacks mockés (pour démo)
- Page badge: Preview du badge avec stats mockées
- Navbar responsive + settings basiques

**Pourquoi?** Créer le workflow complet côté freelance = démo prête pour early adopters

✅ **Data model complet** (Supabase)
- Tables: users, projects, feedbacks, badge_stats
- RLS policies configurées
- Seed data pour démo instantanée

**Pourquoi?** Architecture scalable dès jour 1, pas de refactoring brutal post-MVP

✅ **API Routes** (Next.js)
- Auth (signup/login/logout/me)
- Projects CRUD
- Feedbacks GET (read-only pour MVP)
- Badge stats GET

**Pourquoi?** Backend type-safe, prêt pour client public (phase 2)

❌ **Ce qu'on NE fait PAS (MVP)**
- Formulaire public client (lien feedback) → Post-MVP mois 1
- Envoi d'emails automatiques → Post-MVP mois 1
- Badge personnalisable (branding) → Post-MVP mois 2
- Integrations (Slack, Zapier) → Post-MVP mois 3
- Team accounts → Post-MVP mois 3

**Rationale**: MVP = validation concept avec early adopters. Le dashboard seul suffit pour tester product-market fit.

### 2.3 Post-MVP Roadmap (Mois 2-12)

**Mois 1 (Post-launch)**:
- Formulaire public client (unique link per project)
- Email automation (Resend: demande feedback auto après delivery_date)
- Badge customization (colors, position, style)

**Mois 2-3**:
- Analytics dashboard (NPS trends, feedback timeline)
- Integrations tier 1 (Slack notifications, Zapier webhook)
- Team accounts (multiple users, shared projects)

**Mois 4-6**:
- Advanced workflows (multi-step feedback, custom questions)
- Mobile app (React Native, push notifications)
- AI-powered insights (sentiment analysis sur comments)

**Mois 7-12**:
- Marketplace (badge templates premium)
- White-label solution (agencies rebrand ratee.me)
- Enterprise features (SSO, advanced analytics, API access)

---

## SECTION 3: ARCHITECTURE PRODUIT

### 3.1 User Flows (Diagramme texte)

```
┌─────────────────────────────────────────────────────────────┐
│ FREELANCE (DASHBOARD - MVP Scope)                           │
└─────────────────────────────────────────────────────────────┘

1. ONBOARDING
   ├── Visit ratee.me
   ├── Click "Sign Up"
   ├── Enter email + password + name + company_name (optional)
   ├── Verify email (Supabase auto)
   └── Redirect to /dashboard

2. DASHBOARD HOME
   ├── See welcome message
   ├── Quick stats (mockées pour MVP):
   │   ├── Total projects: 12
   │   ├── Total feedbacks: 8
   │   ├── Avg NPS: 8.4
   │   └── Last feedback: "2 days ago"
   └── CTA: "Create your first project"

3. PROJECTS MANAGEMENT
   ├── View /dashboard/projects
   │   ├── Table: Name | Client | Date | Status | Actions
   │   └── Filter by status (all, in_progress, delivered, archived)
   ├── Create new project
   │   ├── Click "New Project"
   │   ├── Fill form: name, client_name, client_email, description, delivery_date
   │   ├── Submit → POST /api/projects
   │   └── Success toast + redirect to projects list
   ├── Edit project
   │   ├── Click "Edit" on project row
   │   ├── Modal opens with pre-filled form
   │   ├── Update fields
   │   ├── Submit → PUT /api/projects/[id]
   │   └── Success toast + refresh list
   └── Delete project
       ├── Click "Delete" on project row
       ├── Confirm modal "Are you sure?"
       ├── Confirm → DELETE /api/projects/[id]
       └── Success toast + remove from list

4. FEEDBACKS VIEW (Read-Only MVP)
   ├── View /dashboard/feedbacks
   ├── See list of feedbacks (mockées):
   │   ├── Card per feedback: Client name, NPS score (colored), comment, date
   │   └── Filter by project (dropdown)
   └── Stats sidebar:
       ├── Avg NPS (big number)
       ├── Distribution (Detractors/Passives/Promoters)
       └── Total feedbacks

5. BADGE PREVIEW
   ├── View /dashboard/badge
   ├── See preview of badge (iframe simulation)
   ├── Stats displayed: Avg NPS, Total feedbacks
   ├── Copy code snippet (HTML + CSS)
   └── Instructions: "Paste this on your site"

6. SETTINGS
   ├── View /dashboard/settings
   ├── Edit profile: name, company_name, avatar_url
   ├── Change password
   └── Delete account (destructive)

7. LOGOUT
   ├── Click "Logout" in navbar
   ├── POST /api/auth/logout
   └── Redirect to /login

┌─────────────────────────────────────────────────────────────┐
│ CLIENT (PUBLIC - Post-MVP)                                  │
└─────────────────────────────────────────────────────────────┘

1. RECEIVE EMAIL
   ├── Freelance marks project as "delivered"
   ├── System sends email to client_email
   └── Email contains: "Rate your experience with [freelance_name]" + unique link

2. FILL FEEDBACK FORM
   ├── Click link → /feedback/[project_token]
   ├── Public page (no auth)
   ├── See: Freelance name, Project name, Logo
   ├── Question 1: "On a scale 0-10, how likely are you to recommend [name]?"
   │   └── Slider 0-10
   ├── Question 2: "Any additional feedback?" (optional)
   │   └── Textarea
   ├── Submit → POST /api/webhook/feedback (public endpoint)
   └── Success page: "Thank you! Your feedback helps [freelance_name] improve."

3. BADGE VIEW (Public)
   ├── Visit /badge/[user_id] (iframe embedded on freelance site)
   ├── See: Avg NPS, Total feedbacks, "Verified by ratee.me"
   └── Click badge → Redirect to public profile (future)
```

### 3.2 Data Model (Entités)

#### Table: `users`

**Purpose**: Stocker le profil du freelance/agence qui utilise ratee.me

**Fields**:
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  company_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| `id` | UUID | PK, AUTO | Lié à auth.users (Supabase Auth) |
| `email` | TEXT | UNIQUE, NOT NULL | Email de connexion (synced avec auth.users) |
| `name` | TEXT | NOT NULL | Prénom + nom (ex: "Martin Cavil") |
| `company_name` | TEXT | NULLABLE | Nom agence si applicable (ex: "Cavil Studio") |
| `avatar_url` | TEXT | NULLABLE | URL image profil (Supabase Storage future) |
| `created_at` | TIMESTAMPTZ | AUTO NOW() | Date création compte |
| `updated_at` | TIMESTAMPTZ | AUTO NOW() | Dernière modification profil |

**Lifecycle**:
- Créé automatiquement lors du sign-up via Supabase Auth trigger
- Updatable par user via /api/auth/me (PUT)
- Soft delete possible (future: add `deleted_at` column)

**RLS Policies**:
```sql
-- SELECT: User peut voir seulement son propre profil
CREATE POLICY "Users can view own profile" ON users
  FOR SELECT USING (auth.uid() = id);

-- UPDATE: User peut modifier seulement son propre profil
CREATE POLICY "Users can update own profile" ON users
  FOR UPDATE USING (auth.uid() = id);

-- DELETE: User peut supprimer son propre compte
CREATE POLICY "Users can delete own account" ON users
  FOR DELETE USING (auth.uid() = id);

-- INSERT: Géré par trigger Supabase (pas d'INSERT direct par user)
CREATE POLICY "Prevent direct insert" ON users
  FOR INSERT WITH CHECK (false);
```

**Indexes**:
```sql
CREATE INDEX idx_users_email ON users(email); -- Fast lookup pour login
```

---

#### Table: `projects`

**Purpose**: Représente un projet/mission pour lequel le freelance collecte du feedback

**Fields**:
```sql
CREATE TABLE projects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  client_name TEXT NOT NULL,
  client_email TEXT,
  description TEXT,
  delivery_date DATE NOT NULL,
  status TEXT DEFAULT 'in_progress' CHECK (status IN ('in_progress', 'delivered', 'archived')),
  feedback_status TEXT DEFAULT 'not_sent' CHECK (feedback_status IN ('not_sent', 'sent', 'received')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| `id` | UUID | PK, AUTO | Identifiant unique du projet |
| `user_id` | UUID | FK → users.id, NOT NULL, ON DELETE CASCADE | Propriétaire du projet |
| `name` | TEXT | NOT NULL | Nom du projet (ex: "Site Web Acme Corp") |
| `client_name` | TEXT | NOT NULL | Nom du client (ex: "Jean Dupont") |
| `client_email` | TEXT | NULLABLE | Email du client (pour envoi auto, post-MVP) |
| `description` | TEXT | NULLABLE | Description courte du projet |
| `delivery_date` | DATE | NOT NULL | Date de livraison prévue/réelle |
| `status` | TEXT | DEFAULT 'in_progress', CHECK | Statut projet: 'in_progress', 'delivered', 'archived' |
| `feedback_status` | TEXT | DEFAULT 'not_sent', CHECK | Statut feedback: 'not_sent', 'sent', 'received' |
| `created_at` | TIMESTAMPTZ | AUTO NOW() | Date création projet |
| `updated_at` | TIMESTAMPTZ | AUTO NOW() | Dernière modification |

**Lifecycle**:
- Créé par freelance via /api/projects (POST)
- Updatable via /api/projects/[id] (PUT)
- Soft deletable (future: add `deleted_at` column)
- ON DELETE CASCADE: Si user supprimé, ses projets aussi

**RLS Policies**:
```sql
-- SELECT: User voit seulement ses propres projets
CREATE POLICY "Users can view own projects" ON projects
  FOR SELECT USING (auth.uid() = user_id);

-- INSERT: User crée projet pour lui-même uniquement
CREATE POLICY "Users can create own projects" ON projects
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- UPDATE: User modifie seulement ses projets
CREATE POLICY "Users can update own projects" ON projects
  FOR UPDATE USING (auth.uid() = user_id);

-- DELETE: User supprime seulement ses projets
CREATE POLICY "Users can delete own projects" ON projects
  FOR DELETE USING (auth.uid() = user_id);
```

**Indexes**:
```sql
CREATE INDEX idx_projects_user_id ON projects(user_id); -- Fast filtering
CREATE INDEX idx_projects_created_at ON projects(created_at DESC); -- Sorting
CREATE INDEX idx_projects_status ON projects(status); -- Status filtering
```

**Triggers**:
```sql
-- Auto-update updated_at
CREATE TRIGGER update_projects_updated_at
  BEFORE UPDATE ON projects
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
```

---

#### Table: `feedbacks`

**Purpose**: Stocke la réponse NPS du client pour un projet donné

**Fields**:
```sql
CREATE TABLE feedbacks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  client_name TEXT NOT NULL,
  nps_score INT NOT NULL CHECK (nps_score >= 0 AND nps_score <= 10),
  comment TEXT,
  email TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| `id` | UUID | PK, AUTO | Identifiant unique du feedback |
| `project_id` | UUID | FK → projects.id, NOT NULL, ON DELETE CASCADE | Projet concerné |
| `client_name` | TEXT | NOT NULL | Nom du client (répété pour affichage même si project deleted) |
| `nps_score` | INT | NOT NULL, CHECK 0-10 | Score Net Promoter Score (0 = worst, 10 = best) |
| `comment` | TEXT | NULLABLE | Commentaire libre du client (testimonial) |
| `email` | TEXT | NULLABLE | Email du client (pour futur suivi) |
| `created_at` | TIMESTAMPTZ | AUTO NOW() | Date de soumission du feedback |

**Lifecycle**:
- Créé via webhook public /api/webhook/feedback (POST) (post-MVP)
- MVP: Seeded avec mock data
- Read-only pour freelance (pas d'UPDATE/DELETE)
- ON DELETE CASCADE: Si project supprimé, feedbacks aussi

**RLS Policies**:
```sql
-- SELECT: User voit feedbacks de ses propres projets uniquement
CREATE POLICY "Users can view feedbacks for own projects" ON feedbacks
  FOR SELECT USING (
    project_id IN (
      SELECT id FROM projects WHERE user_id = auth.uid()
    )
  );

-- INSERT: Public via webhook (token-based, pas auth.uid())
-- Géré via service role key dans API route
CREATE POLICY "Public can insert via webhook" ON feedbacks
  FOR INSERT WITH CHECK (true); -- Sécurisé par token validation côté API

-- UPDATE/DELETE: Interdit (feedbacks are immutable)
CREATE POLICY "Prevent feedback updates" ON feedbacks
  FOR UPDATE WITH CHECK (false);

CREATE POLICY "Prevent feedback deletes" ON feedbacks
  FOR DELETE USING (false);
```

**Indexes**:
```sql
CREATE INDEX idx_feedbacks_project_id ON feedbacks(project_id); -- Fast filtering
CREATE INDEX idx_feedbacks_created_at ON feedbacks(created_at DESC); -- Sorting
CREATE INDEX idx_feedbacks_nps_score ON feedbacks(nps_score); -- Stats calculations
```

**NPS Category Calculation**:
```sql
-- Helper view (optional)
CREATE VIEW feedbacks_categorized AS
SELECT
  *,
  CASE
    WHEN nps_score <= 6 THEN 'detractor'
    WHEN nps_score <= 8 THEN 'passive'
    ELSE 'promoter'
  END AS nps_category
FROM feedbacks;
```

---

#### Table: `badge_stats`

**Purpose**: Cache dénormalisé des stats du badge (NPS moyen, total feedbacks) pour performance

**Fields**:
```sql
CREATE TABLE badge_stats (
  user_id UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
  avg_nps FLOAT DEFAULT 0,
  total_feedbacks INT DEFAULT 0,
  last_feedback_date TIMESTAMPTZ,
  total_detractors INT DEFAULT 0,
  total_passives INT DEFAULT 0,
  total_promoters INT DEFAULT 0,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| `user_id` | UUID | PK, FK → users.id, ON DELETE CASCADE | Utilisateur concerné |
| `avg_nps` | FLOAT | DEFAULT 0 | Moyenne NPS (recalculée à chaque nouveau feedback) |
| `total_feedbacks` | INT | DEFAULT 0 | Nombre total de feedbacks reçus |
| `last_feedback_date` | TIMESTAMPTZ | NULLABLE | Date du dernier feedback reçu |
| `total_detractors` | INT | DEFAULT 0 | Nombre de detractors (NPS 0-6) |
| `total_passives` | INT | DEFAULT 0 | Nombre de passives (NPS 7-8) |
| `total_promoters` | INT | DEFAULT 0 | Nombre de promoters (NPS 9-10) |
| `updated_at` | TIMESTAMPTZ | AUTO NOW() | Dernière recalculation |

**Lifecycle**:
- Créé automatiquement lors du premier projet créé pour l'user
- Updatable via trigger (quand nouveau feedback ajouté)
- Lecture publique via /api/badge/stats (pour affichage badge)

**RLS Policies**:
```sql
-- SELECT: Public read (pour badge embeddable)
CREATE POLICY "Badge stats are publicly readable" ON badge_stats
  FOR SELECT USING (true);

-- UPDATE: User peut trigger update via API, mais géré par trigger mostly
CREATE POLICY "Users can update own badge stats" ON badge_stats
  FOR UPDATE USING (auth.uid() = user_id);

-- INSERT: Auto via trigger
CREATE POLICY "Auto insert on first project" ON badge_stats
  FOR INSERT WITH CHECK (auth.uid() = user_id);
```

**Triggers**:
```sql
-- Recalcule stats quand nouveau feedback ajouté
CREATE OR REPLACE FUNCTION update_badge_stats()
RETURNS TRIGGER AS $$
DECLARE
  v_user_id UUID;
BEGIN
  -- Get user_id from project
  SELECT user_id INTO v_user_id
  FROM projects
  WHERE id = NEW.project_id;

  -- Upsert badge_stats
  INSERT INTO badge_stats (user_id, avg_nps, total_feedbacks, last_feedback_date, total_detractors, total_passives, total_promoters, updated_at)
  SELECT
    v_user_id,
    AVG(f.nps_score),
    COUNT(f.id),
    MAX(f.created_at),
    COUNT(CASE WHEN f.nps_score <= 6 THEN 1 END),
    COUNT(CASE WHEN f.nps_score BETWEEN 7 AND 8 THEN 1 END),
    COUNT(CASE WHEN f.nps_score >= 9 THEN 1 END),
    NOW()
  FROM feedbacks f
  JOIN projects p ON f.project_id = p.id
  WHERE p.user_id = v_user_id
  ON CONFLICT (user_id) DO UPDATE SET
    avg_nps = EXCLUDED.avg_nps,
    total_feedbacks = EXCLUDED.total_feedbacks,
    last_feedback_date = EXCLUDED.last_feedback_date,
    total_detractors = EXCLUDED.total_detractors,
    total_passives = EXCLUDED.total_passives,
    total_promoters = EXCLUDED.total_promoters,
    updated_at = NOW();

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_badge_stats
  AFTER INSERT ON feedbacks
  FOR EACH ROW EXECUTE FUNCTION update_badge_stats();
```

**Indexes**:
```sql
CREATE INDEX idx_badge_stats_user_id ON badge_stats(user_id); -- Fast lookup
```

---

### 3.3 API Contract (Endpoints)

#### Auth Endpoints

**POST /api/auth/signup**

Purpose: Créer un nouveau compte utilisateur

**Request**:
```json
{
  "email": "john@example.com",
  "password": "SecurePassword123",
  "name": "John Doe",
  "company_name": "John Creative" // optional
}
```

**Response (201 Created)**:
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "uuid-here",
      "email": "john@example.com",
      "name": "John Doe",
      "company_name": "John Creative",
      "created_at": "2025-11-18T10:00:00Z"
    },
    "session": {
      "access_token": "jwt-token-here",
      "expires_in": 3600
    }
  }
}
```

**Response (400 Bad Request)**:
```json
{
  "success": false,
  "error": "Email already exists" // ou "Password too weak" / "Invalid email format"
}
```

**Validation**:
- Email: Valid email format (Zod: `z.string().email()`)
- Password: Min 8 chars, 1 uppercase, 1 number (Zod custom)
- Name: Min 2 chars
- Company_name: Optional, max 100 chars

**Auth**: None (signup is public)

---

**POST /api/auth/login**

Purpose: Authentifier un utilisateur existant

**Request**:
```json
{
  "email": "john@example.com",
  "password": "SecurePassword123"
}
```

**Response (200 OK)**:
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "uuid-here",
      "email": "john@example.com",
      "name": "John Doe"
    },
    "session": {
      "access_token": "jwt-token-here",
      "expires_in": 3600
    }
  }
}
```

**Response (401 Unauthorized)**:
```json
{
  "success": false,
  "error": "Invalid credentials"
}
```

**Auth**: None

---

**POST /api/auth/logout**

Purpose: Déconnecter l'utilisateur

**Request**: None (session from cookie)

**Response (200 OK)**:
```json
{
  "success": true,
  "message": "Logged out successfully"
}
```

**Auth**: Required (user must be logged in)

---

**GET /api/auth/me**

Purpose: Récupérer le profil de l'utilisateur actuel

**Response (200 OK)**:
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "uuid-here",
      "email": "john@example.com",
      "name": "John Doe",
      "company_name": "John Creative",
      "avatar_url": "https://storage.supabase.co/...",
      "created_at": "2025-11-18T10:00:00Z"
    }
  }
}
```

**Response (401 Unauthorized)**:
```json
{
  "success": false,
  "error": "Unauthorized"
}
```

**Auth**: Required

---

#### Projects Endpoints

**GET /api/projects**

Purpose: Lister tous les projets de l'utilisateur authentifié

**Query Params**:
- `limit` (optional, default 20, max 100): Nombre de résultats
- `offset` (optional, default 0): Offset pour pagination
- `status` (optional): Filter par status ('in_progress', 'delivered', 'archived')
- `sort` (optional, default 'created_at'): Champ de tri ('created_at', 'delivery_date', 'name')
- `order` (optional, default 'desc'): Ordre ('asc', 'desc')

**Request Example**:
```
GET /api/projects?limit=10&offset=0&status=delivered&sort=created_at&order=desc
```

**Response (200 OK)**:
```json
{
  "success": true,
  "data": {
    "projects": [
      {
        "id": "uuid-1",
        "name": "Site Web Acme",
        "client_name": "Jean Dupont",
        "client_email": "jean@acme.com",
        "description": "Refonte site existant",
        "delivery_date": "2024-12-15",
        "status": "delivered",
        "feedback_status": "received",
        "created_at": "2024-11-01T10:00:00Z",
        "updated_at": "2024-12-15T14:30:00Z"
      }
      // ...
    ],
    "total": 42,
    "limit": 10,
    "offset": 0
  }
}
```

**Response (401 Unauthorized)**:
```json
{
  "success": false,
  "error": "Unauthorized"
}
```

**Auth**: Required

---

**POST /api/projects**

Purpose: Créer un nouveau projet

**Request**:
```json
{
  "name": "Site Web Acme",
  "client_name": "Jean Dupont",
  "client_email": "jean@acme.com", // optional
  "description": "Refonte site existant", // optional
  "delivery_date": "2024-12-15" // YYYY-MM-DD
}
```

**Response (201 Created)**:
```json
{
  "success": true,
  "data": {
    "id": "uuid-here",
    "name": "Site Web Acme",
    "client_name": "Jean Dupont",
    "client_email": "jean@acme.com",
    "description": "Refonte site existant",
    "delivery_date": "2024-12-15",
    "status": "in_progress",
    "feedback_status": "not_sent",
    "created_at": "2025-11-18T10:00:00Z",
    "updated_at": "2025-11-18T10:00:00Z"
  }
}
```

**Response (400 Bad Request)**:
```json
{
  "success": false,
  "error": "Validation error: delivery_date must be a valid date"
}
```

**Validation**:
- Name: Required, min 2 chars, max 200 chars
- Client_name: Required, min 2 chars, max 100 chars
- Client_email: Optional, valid email format
- Description: Optional, max 500 chars
- Delivery_date: Required, valid date (ISO 8601)

**Auth**: Required

---

**GET /api/projects/[id]**

Purpose: Récupérer les détails d'un projet spécifique

**Response (200 OK)**:
```json
{
  "success": true,
  "data": {
    "project": {
      "id": "uuid-here",
      "name": "Site Web Acme",
      // ... all fields
    },
    "feedbacks_count": 5,
    "avg_nps": 8.4
  }
}
```

**Response (404 Not Found)**:
```json
{
  "success": false,
  "error": "Project not found"
}
```

**Auth**: Required (must be owner)

---

**PUT /api/projects/[id]**

Purpose: Modifier un projet existant

**Request** (tous les champs optionnels):
```json
{
  "name": "New Name",
  "client_name": "New Client",
  "status": "delivered",
  "feedback_status": "sent"
}
```

**Response (200 OK)**:
```json
{
  "success": true,
  "data": {
    // Updated project
  }
}
```

**Response (404 Not Found)**:
```json
{
  "success": false,
  "error": "Project not found"
}
```

**Response (403 Forbidden)**:
```json
{
  "success": false,
  "error": "You don't have permission to update this project"
}
```

**Auth**: Required (must be owner)

---

**DELETE /api/projects/[id]**

Purpose: Supprimer un projet

**Response (200 OK)**:
```json
{
  "success": true,
  "message": "Project deleted successfully"
}
```

**Response (404 Not Found)**:
```json
{
  "success": false,
  "error": "Project not found"
}
```

**Auth**: Required (must be owner)

---

#### Feedbacks Endpoints

**GET /api/feedbacks**

Purpose: Lister les feedbacks de l'utilisateur

**Query Params**:
- `project_id` (optional): Filter par projet spécifique
- `limit` (optional, default 20, max 100)
- `offset` (optional, default 0)
- `sort` (optional, default 'created_at')
- `order` (optional, default 'desc')

**Request Example**:
```
GET /api/feedbacks?project_id=uuid-123&limit=10&offset=0
```

**Response (200 OK)**:
```json
{
  "success": true,
  "data": {
    "feedbacks": [
      {
        "id": "uuid-1",
        "project_id": "uuid-123",
        "client_name": "Jean Dupont",
        "nps_score": 9,
        "comment": "Excellent travail, très professionnel!",
        "email": "jean@acme.com",
        "created_at": "2024-12-10T15:30:00Z"
      }
      // ...
    ],
    "total": 12,
    "stats": {
      "avg_nps": 8.2,
      "total_feedbacks": 12,
      "nps_distribution": {
        "detractors": 2,   // 0-6
        "passives": 3,     // 7-8
        "promoters": 7     // 9-10
      }
    }
  }
}
```

**Auth**: Required (only sees own feedbacks)

---

#### Badge Endpoints

**GET /api/badge/stats**

Purpose: Récupérer les statistiques du badge pour l'utilisateur authentifié

**Response (200 OK)**:
```json
{
  "success": true,
  "data": {
    "avg_nps": 8.4,
    "total_feedbacks": 15,
    "last_feedback_date": "2024-12-10T15:30:00Z",
    "nps_by_category": {
      "detractors": 2,
      "passives": 3,
      "promoters": 10
    }
  }
}
```

**Response (404 Not Found)** (si aucun feedback):
```json
{
  "success": true,
  "data": {
    "avg_nps": 0,
    "total_feedbacks": 0,
    "last_feedback_date": null,
    "nps_by_category": {
      "detractors": 0,
      "passives": 0,
      "promoters": 0
    }
  }
}
```

**Auth**: Required

---

**GET /api/badge/code**

Purpose: Récupérer le code HTML à embedder sur le site du freelance

**Response (200 OK)**:
```json
{
  "success": true,
  "data": {
    "html": "<iframe src='https://ratee.me/badge/uuid-user-id' width='300' height='150' frameborder='0'></iframe>",
    "css": "<link rel='stylesheet' href='https://ratee.me/badge.css'>"
  }
}
```

**Auth**: Required

---

#### Public Webhook (Post-MVP)

**POST /api/webhook/feedback**

Purpose: Endpoint public pour que le client soumette son feedback (sans auth)

**Request**:
```json
{
  "project_token": "unique-token-per-project",
  "nps_score": 9,
  "comment": "Great work!",
  "client_name": "Jane Doe",
  "client_email": "jane@client.com"
}
```

**Response (201 Created)**:
```json
{
  "success": true,
  "message": "Feedback received. Thank you!"
}
```

**Response (400 Bad Request)**:
```json
{
  "success": false,
  "error": "Invalid project token"
}
```

**Security**:
- Token validation via database lookup
- Rate limiting par IP (max 5 feedbacks/hour per IP)
- Honeypot field pour spam protection

**Auth**: None (public endpoint, token-based security)

---

## SECTION 4: TECH STACK DECISION MATRIX

### Next.js 15 (App Router)

**Pourquoi**:
- Full-stack framework: SSR + SSG + API routes en un seul package
- App Router (latest): Server Components par défaut = performance optimale
- Déploiement zero-config sur Vercel
- Excellent DX (hot reload, TypeScript intégré)

**Alternatives Considered**:
- Express + React separate: Trop de setup, double déploiement
- Remix: Overkill pour MVP, communauté plus petite
- SvelteKit: Excellente perf mais écosystème moins mature

**Pros**:
- Full-stack JS (un langage pour tout)
- Great DX (fast iteration)
- Énorme communauté + docs
- SEO-friendly out of the box

**Cons**:
- Vendor lock-in Vercel (acceptable pour MVP)
- App Router encore nouveau (quelques edge cases)

**Decision**: ✅ GO

---

### Supabase (PostgreSQL)

**Pourquoi**:
- Managed PostgreSQL (pas de server à gérer)
- RLS (Row Level Security) built-in = sécurité au niveau DB
- Auth intégré (email/password + OAuth ready)
- Real-time subscriptions ready (future features)
- Storage intégré (avatars, future files)

**Alternatives Considered**:
- Firebase: NoSQL = moins flexible, vendor lock-in Google
- MongoDB: Overkill, relations SQL plus naturelles ici
- Raw PostgreSQL (AWS RDS): Trop de setup/ops pour MVP

**Pros**:
- Full-featured (DB + Auth + Storage)
- Excellent free tier (50k users, 500MB DB)
- Type-safe client avec codegen
- Open-source (peut self-host later)

**Cons**:
- Moins mature que Firebase (mais acceptable)
- Vendor lock-in (mitigé par open-source)

**Decision**: ✅ GO

---

### TypeScript

**Pourquoi**:
- Type safety = moins de bugs en prod
- IntelliSense = DX excellent
- Refactoring safe
- Standard dans l'écosystème React/Next.js

**Alternatives Considered**:
- JavaScript: Trop risqué pour production (aucun type safety)

**Pros**:
- Catch errors at compile time
- Self-documenting code
- Meilleure collaboration

**Cons**:
- Slightly more verbose
- Learning curve (minimal)

**Decision**: ✅ GO

---

### Tailwind CSS

**Pourquoi**:
- Utility-first = pas de CSS custom à maintenir
- Responsive design trivial (sm:, md:, lg:)
- Tree-shaking automatique = bundle size minimal
- Great DX avec IntelliSense

**Alternatives Considered**:
- CSS-in-JS (Styled Components): Overkill, runtime overhead
- Bootstrap: Pas assez moderne, trop opinionated
- CSS Modules: Plus verbeux, moins flexible

**Pros**:
- Fast iteration (pas de CSS files séparés)
- Design system built-in (colors, spacing)
- Purge automatique = prod bundle tiny

**Cons**:
- HTML peut sembler verbeux (acceptable)
- Courbe d'apprentissage (minimal)

**Decision**: ✅ GO

---

### shadcn/ui

**Pourquoi**:
- Headless components (Radix UI) = accessible + customizable
- Copy-paste workflow (pas de npm dependency bloat)
- Tailwind-based (cohérent avec notre stack)
- Beautiful defaults, easy to customize

**Alternatives Considered**:
- Material-UI: Trop heavy, style très Google
- Ant Design: Trop opinionated, moins moderne
- Chakra UI: Bon mais plus de deps

**Pros**:
- Zero bundle size impact (copy ce qu'on utilise)
- Accessible par défaut (Radix UI)
- Beautiful + moderne

**Cons**:
- Manual updates (copier nouveaux components)
- Pas de "theme" centralisé (acceptable)

**Decision**: ✅ GO

---

### Zod (Validation)

**Pourquoi**:
- Type-safe validation (infer types de schemas)
- Élégant, composable
- Excellent error messages
- Integration parfaite avec react-hook-form

**Alternatives Considered**:
- Yup: Plus ancien, moins type-safe
- Joi: Backend-focused, moins bien avec React

**Pros**:
- Type inference automatique
- Single source of truth (schema = types)
- Great DX

**Cons**:
- Bundle size un peu plus gros que Yup (acceptable)

**Decision**: ✅ GO

---

### Vercel (Deployment)

**Pourquoi**:
- Native Next.js support (créateurs de Next.js)
- Zero-config deployment (git push = deploy)
- Edge Functions (API routes at the edge)
- Analytics + Monitoring built-in
- Preview deployments per PR

**Alternatives Considered**:
- AWS Amplify: Plus complexe, moins DX
- DigitalOcean App Platform: Moins features
- Render: Bon mais moins mature

**Pros**:
- Fastest deployment experience
- Excellent free tier
- Built-in CDN + Edge
- Analytics inclus

**Cons**:
- Vendor lock-in (acceptable pour MVP)
- Pricing peut scaler vite (on watch)

**Decision**: ✅ GO

---

## SECTION 5: ARCHITECTURE LOGICIELLE

### 5.1 Folder Structure (Rationale)

```
ratee-dashboard/
├── app/                          # Next.js App Router (routing + pages)
│   ├── (auth)/                   # Route group: auth pages (pas dans navbar)
│   │   ├── login/
│   │   │   └── page.tsx          # /login
│   │   ├── signup/
│   │   │   └── page.tsx          # /signup
│   │   └── layout.tsx            # Layout spécial sans navbar
│   │
│   ├── (dashboard)/              # Route group: dashboard pages (avec navbar)
│   │   ├── layout.tsx            # Layout avec navbar + sidebar future
│   │   ├── page.tsx              # /dashboard (home)
│   │   ├── projects/
│   │   │   └── page.tsx          # /dashboard/projects
│   │   ├── feedbacks/
│   │   │   └── page.tsx          # /dashboard/feedbacks
│   │   ├── badge/
│   │   │   └── page.tsx          # /dashboard/badge
│   │   └── settings/
│   │       └── page.tsx          # /dashboard/settings
│   │
│   ├── api/                      # API Routes (backend)
│   │   ├── auth/
│   │   │   ├── signup/route.ts   # POST /api/auth/signup
│   │   │   ├── login/route.ts    # POST /api/auth/login
│   │   │   ├── logout/route.ts   # POST /api/auth/logout
│   │   │   └── me/route.ts       # GET /api/auth/me
│   │   ├── projects/
│   │   │   ├── route.ts          # GET /api/projects, POST /api/projects
│   │   │   └── [id]/route.ts     # GET/PUT/DELETE /api/projects/:id
│   │   ├── feedbacks/
│   │   │   └── route.ts          # GET /api/feedbacks
│   │   ├── badge/
│   │   │   ├── stats/route.ts    # GET /api/badge/stats
│   │   │   └── code/route.ts     # GET /api/badge/code
│   │   └── webhook/              # Future: public endpoints
│   │       └── feedback/route.ts # POST /api/webhook/feedback
│   │
│   ├── layout.tsx                # Root layout (fonts, metadata)
│   ├── page.tsx                  # / (redirect to /dashboard)
│   ├── globals.css               # Tailwind + custom CSS
│   └── error.tsx                 # Error boundary
│
├── components/                   # Reusable UI components
│   ├── ui/                       # shadcn/ui components (copy-pasted)
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── dialog.tsx
│   │   ├── input.tsx
│   │   ├── label.tsx
│   │   ├── table.tsx
│   │   ├── avatar.tsx
│   │   ├── badge.tsx
│   │   ├── select.tsx
│   │   ├── form.tsx
│   │   ├── toast.tsx
│   │   └── dropdown-menu.tsx
│   │
│   ├── shared/                   # Shared across all pages
│   │   ├── navbar.tsx            # Top navbar (logo, user menu, logout)
│   │   ├── footer.tsx            # Footer (future)
│   │   └── sidebar.tsx           # Sidebar navigation (future mobile)
│   │
│   ├── projects/                 # Feature-specific: Projects
│   │   ├── projects-table.tsx    # Table listing all projects
│   │   ├── project-row.tsx       # Single row in table
│   │   ├── new-project-modal.tsx # Modal to create new project
│   │   ├── edit-project-modal.tsx# Modal to edit existing project
│   │   └── delete-project-dialog.tsx # Confirmation dialog
│   │
│   ├── feedbacks/                # Feature-specific: Feedbacks
│   │   ├── feedbacks-list.tsx    # List of all feedbacks
│   │   ├── feedback-card.tsx     # Single feedback card
│   │   ├── nps-score-badge.tsx   # NPS score with color (0-10)
│   │   └── feedbacks-stats.tsx   # Stats sidebar (avg NPS, distribution)
│   │
│   ├── badge/                    # Feature-specific: Badge
│   │   ├── badge-preview.tsx     # Preview of badge (iframe simulation)
│   │   ├── badge-code-snippet.tsx# Code snippet to copy
│   │   └── badge-stats.tsx       # Stats displayed on badge
│   │
│   └── auth/                     # Feature-specific: Auth
│       ├── login-form.tsx        # Login form component
│       ├── signup-form.tsx       # Signup form component
│       └── auth-guard.tsx        # HOC to protect routes (future)
│
├── lib/                          # Business logic, utilities, helpers
│   ├── supabase/
│   │   ├── client.ts             # Browser Supabase client (client components)
│   │   ├── server.ts             # Server Supabase client (RSC, SSR)
│   │   ├── admin.ts              # Admin client (service role key, API routes)
│   │   ├── auth.ts               # Auth helpers (signup, login, logout, getUser)
│   │   └── queries.ts            # Database query functions (getProjects, getFeedbacks, etc.)
│   │
│   ├── hooks/                    # Custom React hooks
│   │   ├── use-auth.ts           # useAuth hook (current user + session)
│   │   ├── use-user.ts           # useUser hook (current user profile)
│   │   ├── use-projects.ts       # useProjects hook (data + mutations)
│   │   └── use-feedbacks.ts      # useFeedbacks hook (data)
│   │
│   ├── api-client.ts             # Fetch wrapper avec error handling
│   ├── validators.ts             # Zod schemas pour validation
│   ├── utils.ts                  # Utility functions (date formatting, NPS calc, etc.)
│   ├── constants.ts              # App constants (API URLs, config)
│   └── types.ts                  # Global types (non-DB)
│
├── types/
│   ├── database.ts               # Database types (générés via Supabase CLI)
│   ├── api.ts                    # API request/response types
│   └── app.ts                    # App-specific types (UI states, etc.)
│
├── public/
│   ├── logo.svg
│   ├── favicon.ico
│   └── og-image.png              # Open Graph image for social sharing
│
├── .env.local.example            # Example env vars (pour devs)
├── .env.example                  # Same (legacy support)
├── .gitignore
├── tsconfig.json                 # TypeScript config
├── next.config.ts                # Next.js config
├── tailwind.config.ts            # Tailwind config
├── components.json               # shadcn/ui config
├── package.json
├── README.md                     # Setup instructions
└── CONTEXTE.md                   # CE FICHIER (guidelines devs)
```

**Rationale**:

1. **Route Groups `(auth)` et `(dashboard)`**:
   - Organization only (pas dans l'URL)
   - `(auth)` = layout sans navbar (clean login/signup)
   - `(dashboard)` = layout avec navbar (toutes les pages privées)

2. **`lib/supabase/`**:
   - Tout ce qui touche à Supabase centralisé
   - `client.ts` = Browser client (client components, hooks)
   - `server.ts` = Server client (Server Components, SSR)
   - `admin.ts` = Service role client (API routes, bypasse RLS)
   - DRY: Single source of truth pour config Supabase

3. **`lib/hooks/`**:
   - Custom hooks avec business logic
   - `useProjects` = fetch + create + update + delete projects
   - `useFeedbacks` = fetch feedbacks avec stats
   - Separation of concerns: components = UI, hooks = logic

4. **`components/`**:
   - Divisé par feature (`projects/`, `feedbacks/`, `badge/`)
   - `ui/` = shadcn/ui components (headless, copy-pasted)
   - `shared/` = Components utilisés partout (navbar, footer)

5. **`types/`**:
   - `database.ts` = Generated via `supabase gen types typescript`
   - `api.ts` = Request/response types pour API routes
   - `app.ts` = Types UI (form states, etc.)
   - Separation pour éviter circular dependencies

6. **`app/api/`**:
   - Next.js API routes (backend)
   - Structure miroir des endpoints (/api/auth/login, etc.)
   - Chaque route.ts = handler avec GET/POST/PUT/DELETE

---

### 5.2 Key Architectural Patterns

#### 1. Server Components by Default (Next.js 15 App Router)

**Principe**:
- Tous les components sont Server Components par défaut
- Client Components uniquement si nécessaire (useState, useEffect, event handlers)

**Exemple**:
```tsx
// app/(dashboard)/projects/page.tsx (Server Component)
import { getProjects } from '@/lib/supabase/queries';

export default async function ProjectsPage() {
  const projects = await getProjects(); // Direct DB query, no API call

  return (
    <div>
      <ProjectsTable projects={projects} /> {/* Client Component */}
    </div>
  );
}
```

**Benefits**:
- Moins de JS envoyé au client
- Fetch data au plus près du backend (no API roundtrip)
- SEO-friendly (content rendered server-side)

---

#### 2. API Routes pour Mutations Only

**Principe**:
- Lectures (GET) = Direct query dans Server Components
- Mutations (POST/PUT/DELETE) = API routes avec revalidation

**Exemple**:
```tsx
// components/projects/new-project-modal.tsx (Client Component)
'use client';

async function createProject(data) {
  const res = await fetch('/api/projects', {
    method: 'POST',
    body: JSON.stringify(data),
  });

  if (res.ok) {
    router.refresh(); // Revalidate server components
  }
}
```

**Benefits**:
- No overfetching (pas de wrapper API pour tout)
- Type-safe mutations avec Zod validation

---

#### 3. RLS-First Security

**Principe**:
- Toute sécurité au niveau DB (RLS policies)
- API routes = validation + orchestration, pas de checks manuels

**Exemple**:
```sql
-- User peut seulement voir ses projets
CREATE POLICY "Users can view own projects" ON projects
  FOR SELECT USING (auth.uid() = user_id);
```

**Benefits**:
- Security by default (impossible de bypass)
- Pas de if (user.id === project.user_id) dans le code

---

#### 4. Colocation des Components

**Principe**:
- Components près de leur utilisation
- `projects/` folder contient TOUT ce qui touche aux projects

**Benefits**:
- Easy to find (pas de hunt dans folders)
- Easy to refactor (delete folder = delete feature)

---

## SECTION 6: AUTHENTIFICATION & SÉCURITÉ

### Auth Flow (Supabase Auth)

```
1. USER SIGNUP
   ├── User remplit form /signup (email, password, name, company_name)
   ├── Frontend POST /api/auth/signup
   ├── API route valide data (Zod)
   ├── API route call supabase.auth.signUp()
   ├── Supabase crée entry dans auth.users (table système)
   ├── Trigger DB crée entry dans public.users (notre table)
   ├── Supabase retourne session (access_token + refresh_token)
   ├── API route set cookie (httpOnly, secure, sameSite)
   └── Redirect to /dashboard

2. USER LOGIN
   ├── User remplit form /login (email, password)
   ├── Frontend POST /api/auth/login
   ├── API route call supabase.auth.signInWithPassword()
   ├── Supabase vérifie credentials
   ├── Si OK: Retourne session
   ├── API route set cookie
   └── Redirect to /dashboard

3. USER ACCESS PROTECTED PAGE
   ├── User visite /dashboard/projects
   ├── Server Component lit cookie (getUser() helper)
   ├── Si session valide: Render page
   ├── Si session invalide: Redirect to /login
   └── RLS policies vérifient que user accède SES données uniquement

4. USER LOGOUT
   ├── User click "Logout" dans navbar
   ├── Frontend POST /api/auth/logout
   ├── API route call supabase.auth.signOut()
   ├── API route clear cookie
   └── Redirect to /login
```

### Security Checklist

#### ✅ Passwords

- **Hashing**: Géré par Supabase (bcrypt)
- **Complexity**: Min 8 chars, 1 uppercase, 1 number (Zod validation)
- **No plaintext storage**: Jamais dans DB (Supabase auth.users hashé)

#### ✅ HTTPS Only

- **Dev**: http://localhost (acceptable)
- **Prod**: HTTPS enforced (Vercel automatique)
- **Cookies**: `secure: true` en prod

#### ✅ Cookies Security

- **httpOnly**: Oui (pas accessible via JavaScript)
- **secure**: Oui en prod (HTTPS only)
- **sameSite**: `lax` (protection CSRF)
- **maxAge**: 7 jours (refresh token rotation)

#### ✅ CSRF Protection

- **Next.js**: Built-in CSRF tokens
- **Supabase**: Session-based auth (no cookies sent cross-origin)

#### ✅ Rate Limiting (Future)

- **API routes**: Max 100 req/min per IP (middleware)
- **Login**: Max 5 attempts per 15min per email
- **Webhook**: Max 5 feedbacks/hour per IP

#### ✅ RLS Policies

- **Every table**: Has SELECT/INSERT/UPDATE/DELETE policies
- **users**: User accède seulement son profil
- **projects**: User accède seulement ses projets
- **feedbacks**: User accède feedbacks de SES projets uniquement
- **badge_stats**: Public read (pour badge embeddable)

#### ✅ Input Validation

- **Client-side**: Zod schemas (UX, fast feedback)
- **Server-side**: Zod schemas (security, can't bypass)
- **All API routes**: Validate avant DB insert

#### ✅ SQL Injection

- **Risk**: Zero (Supabase PostgREST API = parameterized queries)
- **No raw SQL**: All queries via Supabase client

#### ✅ XSS Protection

- **React**: Auto-escapes (dangerouslySetInnerHTML jamais utilisé)
- **User input**: Sanitized via Zod (trim, max length)

#### ✅ Environment Variables

- **Secrets**: Jamais dans .env.local committé
- **.gitignore**: .env.local ignored
- **.env.local.example**: Template pour devs
- **Vercel**: Env vars configurées dans dashboard

---

### Authentication Helpers

#### `lib/supabase/auth.ts`

```typescript
import { createServerClient } from '@/lib/supabase/server';

/**
 * Get current authenticated user (Server Components)
 */
export async function getUser() {
  const supabase = createServerClient();
  const { data: { user }, error } = await supabase.auth.getUser();

  if (error || !user) {
    return null;
  }

  return user;
}

/**
 * Require authentication (throw if not logged in)
 */
export async function requireAuth() {
  const user = await getUser();

  if (!user) {
    redirect('/login');
  }

  return user;
}

/**
 * Get current session (with tokens)
 */
export async function getSession() {
  const supabase = createServerClient();
  const { data: { session }, error } = await supabase.auth.getSession();

  if (error || !session) {
    return null;
  }

  return session;
}
```

**Usage**:
```tsx
// app/(dashboard)/projects/page.tsx
import { requireAuth } from '@/lib/supabase/auth';

export default async function ProjectsPage() {
  await requireAuth(); // Throws + redirects si pas auth

  // ... render page
}
```

---

## SECTION 7: DESIGN SYSTEM

### 7.1 Color Palette

```css
/* Primary (Bleu confiance, CTA, links) */
--primary: #0052FF;
--primary-light: #E6F0FF;
--primary-dark: #003FBF;

/* Secondary (Gris, backgrounds, borders) */
--secondary: #F5F5F5;
--secondary-dark: #E5E7EB;

/* Success (Vert, succès, badges, high NPS) */
--success: #00AA55;
--success-light: #E6F7EE;

/* Warning (Orange, attention, medium NPS) */
--warning: #FFB84D;
--warning-light: #FFF5E6;

/* Error (Rouge, erreur, low NPS) */
--error: #FF4444;
--error-light: #FFE6E6;

/* Text */
--text-primary: #1F1F1F;    /* Charcoal, body text */
--text-secondary: #6B7280;  /* Gris, labels, meta */
--text-muted: #9CA3AF;      /* Gris clair, disabled */

/* Borders */
--border: #E5E7EB;          /* Gris ultra-light */

/* Backgrounds */
--bg-primary: #FFFFFF;      /* Blanc, cards, modals */
--bg-secondary: #F9FAFB;    /* Gris ultra-light, page bg */
```

### 7.2 Typography

**Font Family**:
- **Headers**: Inter Bold
- **Body**: Inter Regular
- **Mono**: IBM Plex Mono (code snippets)

**Font Sizes**:
```css
/* Headers */
--text-5xl: 48px;  /* Hero titles (desktop) */
--text-4xl: 36px;  /* Page titles */
--text-3xl: 30px;  /* Section titles */
--text-2xl: 24px;  /* Card titles */
--text-xl: 20px;   /* Subheadings */

/* Body */
--text-base: 16px; /* Default body text */
--text-sm: 14px;   /* Small text, labels */
--text-xs: 12px;   /* Meta, timestamps */

/* Line Heights */
--leading-tight: 1.25;   /* Headers */
--leading-normal: 1.5;   /* Body */
--leading-relaxed: 1.75; /* Long-form text */
```

**Responsive Typography**:
```css
/* Mobile (< 640px) */
h1 { font-size: 24px; }
h2 { font-size: 20px; }
body { font-size: 14px; }

/* Tablet (640-1024px) */
h1 { font-size: 32px; }
h2 { font-size: 24px; }
body { font-size: 16px; }

/* Desktop (> 1024px) */
h1 { font-size: 48px; }
h2 { font-size: 36px; }
body { font-size: 16px; }
```

### 7.3 Spacing (8px Grid)

```css
--spacing-1: 4px;   /* Tiny (icon padding) */
--spacing-2: 8px;   /* XS (button padding) */
--spacing-3: 12px;  /* SM (input padding) */
--spacing-4: 16px;  /* MD (card padding mobile) */
--spacing-5: 20px;  /* LG (card padding) */
--spacing-6: 24px;  /* XL (section spacing) */
--spacing-8: 32px;  /* 2XL (page padding desktop) */
--spacing-12: 48px; /* 3XL (hero spacing) */
```

**Usage**:
- Card padding: `20px` (spacing-5)
- Page padding mobile: `16px` (spacing-4)
- Page padding desktop: `32px` (spacing-8)
- Section gaps: `24px` (spacing-6)

### 7.4 Border Radius

```css
--radius-sm: 4px;   /* Buttons, inputs */
--radius-md: 8px;   /* Cards, modals */
--radius-lg: 12px;  /* Hero sections */
--radius-full: 9999px; /* Pills, badges */
```

### 7.5 Shadows

```css
--shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
--shadow-md: 0 4px 6px rgba(0, 0, 0, 0.1);
--shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.1);
--shadow-xl: 0 20px 25px rgba(0, 0, 0, 0.15);
```

**Usage**:
- Cards: `shadow-sm`
- Modals: `shadow-lg`
- Dropdowns: `shadow-md`

### 7.6 Components (shadcn/ui)

**Required** (MVP):
```bash
npx shadcn-ui@latest add button
npx shadcn-ui@latest add card
npx shadcn-ui@latest add table
npx shadcn-ui@latest add dialog
npx shadcn-ui@latest add input
npx shadcn-ui@latest add label
npx shadcn-ui@latest add avatar
npx shadcn-ui@latest add badge
npx shadcn-ui@latest add select
npx shadcn-ui@latest add form
npx shadcn-ui@latest add toast
npx shadcn-ui@latest add dropdown-menu
```

**Optional** (Post-MVP):
```bash
npx shadcn-ui@latest add tabs
npx shadcn-ui@latest add sidebar
npx shadcn-ui@latest add sheet
npx shadcn-ui@latest add tooltip
```

### 7.7 Layout Patterns

#### Navbar

```tsx
/* Fixed top, full width */
height: 64px;
background: white;
border-bottom: 1px solid var(--border);
box-shadow: var(--shadow-sm);
position: sticky;
top: 0;
z-index: 50;

/* Content */
max-width: 1200px;
margin: 0 auto;
padding: 0 32px; /* Desktop */
padding: 0 16px; /* Mobile */
```

#### Main Content

```tsx
/* Max width container */
max-width: 1200px;
margin: 0 auto;
padding: 32px; /* Desktop */
padding: 16px; /* Mobile */
```

#### Cards

```tsx
background: white;
border: 1px solid var(--border);
border-radius: 8px;
padding: 20px;
box-shadow: var(--shadow-sm);
```

### 7.8 Responsive Breakpoints

```css
/* Tailwind default (customizable dans tailwind.config.ts) */
sm: 640px;   /* Mobile landscape, small tablets */
md: 768px;   /* Tablets */
lg: 1024px;  /* Desktop */
xl: 1280px;  /* Large desktop */
2xl: 1536px; /* XL desktop */
```

**Usage**:
```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {/* 1 col mobile, 2 cols tablet, 3 cols desktop */}
</div>
```

### 7.9 NPS Score Colors

```tsx
// NPS 0-6 (Detractors) = Error (Rouge)
nps <= 6: {
  background: var(--error-light);
  color: var(--error);
  border: 1px solid var(--error);
}

// NPS 7-8 (Passives) = Warning (Orange)
nps >= 7 && nps <= 8: {
  background: var(--warning-light);
  color: var(--warning);
  border: 1px solid var(--warning);
}

// NPS 9-10 (Promoters) = Success (Vert)
nps >= 9: {
  background: var(--success-light);
  color: var(--success);
  border: 1px solid var(--success);
}
```

**Example Component**:
```tsx
function NPSBadge({ score }: { score: number }) {
  const variant =
    score <= 6 ? 'destructive' :
    score <= 8 ? 'warning' :
    'success';

  return (
    <Badge variant={variant}>
      {score}/10
    </Badge>
  );
}
```

---

## SECTION 8: DEVELOPMENT WORKFLOW

### 8.1 Setup Local Environment

```bash
# 1. Clone repo (future)
git clone https://github.com/your-username/ratee-dashboard.git
cd ratee-dashboard

# 2. Install dependencies
npm install

# 3. Setup environment variables
cp .env.local.example .env.local
# Edit .env.local avec vos clés Supabase:
# NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
# NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
# SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# 4. Setup Supabase (local dev, optional)
npx supabase start
npx supabase db push

# 5. Seed database avec mock data (future script)
npm run db:seed

# 6. Start dev server
npm run dev
# Open http://localhost:3000
```

### 8.2 Environment Variables

**.env.local** (jamais committé):
```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9... (secret!)

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000 (dev) | https://ratee.me (prod)
```

**.env.local.example** (committé, template):
```bash
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 8.3 Development Best Practices

#### Branch Naming

```bash
feature/dashboard-projects   # New feature
fix/auth-logout-bug          # Bug fix
refactor/projects-table      # Refactoring
docs/readme-update           # Documentation
```

#### Commit Messages

```bash
# Good
git commit -m "Add project CRUD endpoints"
git commit -m "Fix logout redirect loop"
git commit -m "Refactor projects table component"

# Bad
git commit -m "Update stuff"
git commit -m "WIP"
git commit -m "asdf"
```

**Format**: `<type>: <subject>` (type optionnel)
- Types: `feat`, `fix`, `refactor`, `docs`, `style`, `test`, `chore`

#### Code Style

```bash
# ESLint + Prettier configurés
npm run lint      # Check linting
npm run lint:fix  # Auto-fix issues
npm run format    # Format avec Prettier
```

**Pre-commit Hook** (future):
```bash
# Husky + lint-staged
# Auto-run lint + format avant chaque commit
```

#### Type Safety

```bash
# Check TypeScript errors
npm run type-check

# No "any" types (strict mode)
# tsconfig.json:
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true
  }
}
```

### 8.4 Testing Strategy

#### MVP Testing (Manual)

**Auth Flow**:
1. Sign up with new email → Redirected to /dashboard
2. Logout → Redirected to /login
3. Login with credentials → Redirected to /dashboard
4. Refresh page → Still logged in (session persists)
5. Try invalid credentials → Error message shown
6. Try weak password → Validation error

**Projects CRUD**:
1. Create project → Appears in table
2. Edit project → Changes reflected
3. Delete project → Removed from list
4. Filter by status → Shows correct projects
5. Sort by date → Ordered correctly

**Feedbacks**:
1. View feedbacks page → Mockées appear
2. Filter by project → Shows correct feedbacks
3. NPS score coloré → Rouge < 6, Orange 6-8, Vert > 8

**Badge**:
1. View badge page → Stats mockées shown
2. Copy code snippet → Copies to clipboard
3. Preview badge → Iframe simulation works

**Responsive**:
1. Desktop (1920px) → Full layout
2. Tablet (768px) → Adjusted spacing, stacked
3. Mobile (375px) → Single column, touch-friendly

#### Post-MVP Testing

**Unit Tests** (Jest):
```bash
npm run test
# Test utility functions, helpers
```

**E2E Tests** (Playwright):
```bash
npm run test:e2e
# Test complete user flows
```

**Performance Tests** (Lighthouse CI):
```bash
npm run lighthouse
# Check FCP, LCP, CLS, TTI
```

### 8.5 CI/CD (Vercel)

**Auto Deployments**:
- `main` branch → Production (ratee.me)
- Feature branches → Preview deployments (pr-123.ratee.vercel.app)

**Vercel Configuration**:
```json
{
  "buildCommand": "npm run build",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "framework": "nextjs",
  "env": {
    "NEXT_PUBLIC_SUPABASE_URL": "@supabase-url",
    "NEXT_PUBLIC_SUPABASE_ANON_KEY": "@supabase-anon-key",
    "SUPABASE_SERVICE_ROLE_KEY": "@supabase-service-role-key"
  }
}
```

**GitHub Actions** (future):
```yaml
# .github/workflows/ci.yml
name: CI
on: [push, pull_request]
jobs:
  lint:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - run: npm install
      - run: npm run lint
      - run: npm run type-check
```

---

## SECTION 9: PERFORMANCE & SCALABILITY

### 9.1 Frontend Optimization

#### Code Splitting (Automatic)

Next.js 15 splits code automatically:
- Each page = separate bundle
- Shared components = chunked intelligently
- Dynamic imports for heavy components

```tsx
// Heavy component (charts, maps)
const HeavyChart = dynamic(() => import('@/components/heavy-chart'), {
  loading: () => <Spinner />,
  ssr: false, // Client-only si needed
});
```

#### Image Optimization

```tsx
import Image from 'next/image';

// Auto-optimized (WebP, lazy load, responsive)
<Image
  src="/logo.svg"
  alt="ratee.me"
  width={200}
  height={50}
  priority={false} // Lazy load par défaut
/>
```

#### Font Optimization

```tsx
// app/layout.tsx
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.className}>
      <body>{children}</body>
    </html>
  );
}
```

#### Bundle Size Monitoring

```bash
# Analyze bundle size
npm run build
# Output: .next/analyze/client.html

# Target:
# Total JS: < 200KB (gzipped)
# FCP: < 1.8s
# LCP: < 2.5s
```

### 9.2 Database Optimization

#### Indexes

```sql
-- Projects table
CREATE INDEX idx_projects_user_id ON projects(user_id);
CREATE INDEX idx_projects_created_at ON projects(created_at DESC);
CREATE INDEX idx_projects_status ON projects(status);

-- Feedbacks table
CREATE INDEX idx_feedbacks_project_id ON feedbacks(project_id);
CREATE INDEX idx_feedbacks_created_at ON feedbacks(created_at DESC);
CREATE INDEX idx_feedbacks_nps_score ON feedbacks(nps_score);

-- Badge stats
CREATE INDEX idx_badge_stats_user_id ON badge_stats(user_id);
```

#### Denormalization

`badge_stats` table = cache calculé:
- Évite re-calculation à chaque request
- Updated via trigger (async)
- Trade-off: Slight data staleness acceptable (< 1s)

#### Pagination

```tsx
// Default limit: 20
// Max limit: 100
// Always use offset + limit

const { data, total } = await getProjects({
  limit: 20,
  offset: 0,
});
```

#### Query Optimization

```sql
-- Good: Use indexes
SELECT * FROM projects WHERE user_id = $1 ORDER BY created_at DESC LIMIT 20;

-- Bad: No index, slow
SELECT * FROM projects WHERE LOWER(name) LIKE '%search%';

-- Future: Full-text search
CREATE INDEX idx_projects_name_fts ON projects USING GIN(to_tsvector('english', name));
```

### 9.3 API Optimization

#### Rate Limiting (Future)

```typescript
// middleware.ts
import { rateLimit } from '@/lib/rate-limit';

export async function middleware(req: NextRequest) {
  // 100 requests per minute per IP
  const { success } = await rateLimit(req.ip, 100, 60);

  if (!success) {
    return new Response('Rate limit exceeded', { status: 429 });
  }
}
```

#### Caching Headers

```typescript
// API route
export async function GET() {
  const data = await fetchData();

  return new Response(JSON.stringify(data), {
    headers: {
      'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=30',
    },
  });
}
```

#### Compression (Automatic)

Vercel compresses responses automatically (Gzip/Brotli)

### 9.4 Monitoring

#### Vercel Analytics

- Real User Monitoring (RUM)
- Core Web Vitals (FCP, LCP, CLS, FID, TTFB)
- Geo distribution

**Target Metrics**:
- FCP (First Contentful Paint): < 1.8s
- LCP (Largest Contentful Paint): < 2.5s
- CLS (Cumulative Layout Shift): < 0.1
- FID (First Input Delay): < 100ms
- TTFB (Time to First Byte): < 600ms

#### Error Monitoring (Future: Sentry)

```typescript
// lib/sentry.ts
import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  tracesSampleRate: 0.1, // 10% des requests
  beforeSend(event) {
    // Filter sensitive data
    return event;
  },
});
```

#### Database Monitoring (Supabase Dashboard)

- Query performance
- Connection pooling
- Storage usage
- RLS policy performance

---

## SECTION 10: DEPLOYMENT CHECKLIST

### Pre-Launch Checklist

#### Code

- ✅ `npm run build` → 0 errors
- ✅ `npm run lint` → 0 warnings
- ✅ `npm run type-check` → 0 type errors
- ✅ All TODO comments resolved or tracked

#### Database

- ✅ Supabase project created (Production)
- ✅ All tables created (users, projects, feedbacks, badge_stats)
- ✅ RLS policies configured + tested
- ✅ Indexes created
- ✅ Triggers configured (badge_stats update)
- ✅ Auth trigger configured (user creation)
- ✅ Database seeded with mock data (for demo)

#### Environment Variables

- ✅ `.env.local.example` up to date
- ✅ Vercel env vars configured:
  - `NEXT_PUBLIC_SUPABASE_URL`
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
  - `SUPABASE_SERVICE_ROLE_KEY` (secret)
  - `NEXT_PUBLIC_APP_URL`

#### API Endpoints

- ✅ All endpoints tested (Postman/Insomnia)
  - POST /api/auth/signup
  - POST /api/auth/login
  - POST /api/auth/logout
  - GET /api/auth/me
  - GET /api/projects
  - POST /api/projects
  - GET /api/projects/[id]
  - PUT /api/projects/[id]
  - DELETE /api/projects/[id]
  - GET /api/feedbacks
  - GET /api/badge/stats
  - GET /api/badge/code

#### UI/UX

- ✅ Responsive design tested (mobile 375px, tablet 768px, desktop 1920px)
- ✅ All forms have validation + error messages
- ✅ All buttons have loading states
- ✅ All toasts configured (success, error)
- ✅ Error pages created (404, 500)
- ✅ Loading skeletons for async content

#### SEO

- ✅ Meta tags configured (title, description)
- ✅ Open Graph image (`/public/og-image.png`)
- ✅ Favicon configured
- ✅ robots.txt configured
- ✅ sitemap.xml configured (future)

#### Security

- ✅ All RLS policies tested
- ✅ All API routes validate input (Zod)
- ✅ No secrets in codebase (env vars only)
- ✅ HTTPS enforced (Vercel automatic)
- ✅ Cookies httpOnly + secure

#### Performance

- ✅ Lighthouse score > 90 (Performance, Accessibility, Best Practices, SEO)
- ✅ Bundle size < 200KB (gzipped)
- ✅ FCP < 1.8s
- ✅ LCP < 2.5s

### Launch

```bash
# 1. Merge to main branch
git checkout main
git merge feature/mvp
git push origin main

# 2. Vercel auto-deploys (wait 2-3 min)
# https://vercel.com/your-project/deployments

# 3. Smoke test production
# - Visit https://ratee.me
# - Sign up with test account
# - Create project
# - View feedbacks (mockées)
# - View badge
# - Logout + Login

# 4. Monitor errors
# - Vercel Dashboard → Errors tab
# - Supabase Dashboard → Logs

# 5. Announce launch 🚀
```

### Post-Launch

#### Week 1

- Monitor error logs daily
- Fix critical bugs ASAP
- Collect user feedback (Discord, email)
- Track analytics (signups, DAU)

#### Week 2-4

- Implement quick wins (low-hanging fruit)
- Plan Post-MVP features (email automation, public form)
- Optimize based on real usage data

---

## SECTION 11: FUTURE ROADMAP (Post-MVP)

### Month 1 (Post-Launch)

**Public Feedback Form**:
- Unique link per project (`/feedback/[project_token]`)
- Client-facing form (NPS + comment)
- POST /api/webhook/feedback (public endpoint)
- Email notification to freelance when feedback received

**Email Automation**:
- Resend integration (SMTP)
- Auto-send feedback request after `delivery_date`
- Email template customization (basic)
- Unsubscribe link

**Badge Customization**:
- Choose colors (primary, background)
- Choose position (corner, center)
- Choose style (minimal, detailed)
- Live preview

### Month 2-3

**Analytics Dashboard**:
- NPS trends over time (chart)
- Feedback timeline (calendar view)
- Top clients (most feedback)
- Best projects (highest NPS)

**Integrations Tier 1**:
- Slack notifications (new feedback)
- Zapier webhook (trigger workflows)
- Make.com integration

**Team Accounts**:
- Multiple users per account (owner, member roles)
- Shared projects
- Permissions (who can create/edit/delete)

### Month 4-6

**Advanced Workflows**:
- Multi-step feedback (NPS + custom questions)
- Conditional questions (if NPS < 7, ask "What can we improve?")
- Custom branding (logo, colors per client)

**Mobile App**:
- React Native (iOS + Android)
- Push notifications (new feedback)
- Offline mode (cache projects)

**AI-Powered Insights**:
- Sentiment analysis on comments
- Trend detection ("Your NPS is trending down")
- Suggestions ("Ask Client X for testimonial")

### Month 7-12

**Marketplace**:
- Badge templates (premium designs)
- Email templates (premium designs)
- Workflow templates (industry-specific)

**White-Label**:
- Agencies rebrand ratee.me as their own
- Custom domain (feedback.youragency.com)
- Custom branding (logo, colors, email sender)

**Enterprise**:
- SSO (Single Sign-On: Google, Microsoft)
- Advanced analytics (custom reports, exports)
- API access (public API for integrations)
- SLA (99.9% uptime guarantee)

---

## SECTION 12: KEY DECISIONS & RATIONALE

| **Decision** | **Choice** | **Why** | **Alternatives Considered** |
|--------------|------------|---------|------------------------------|
| **Framework** | Next.js 15 (App Router) | SSR + SSG + API routes in one, fast iteration, excellent DX | SvelteKit (less mature), Remix (overkill), Express + React (too complex) |
| **Database** | Supabase (PostgreSQL) | Managed, RLS built-in, auth integrated, real-time ready | Firebase (NoSQL, less flexible), MongoDB (overkill), Raw Postgres (too much ops) |
| **Auth** | Supabase Auth | Native integration with DB, email/password + OAuth ready, secure | NextAuth.js (more setup), Auth0 (cost), Clerk (vendor lock-in) |
| **UI Framework** | shadcn/ui | Headless (customizable), Tailwind-based, copy-paste (no bloat) | Material-UI (heavy, opinionated), Ant Design (less modern), Chakra (more deps) |
| **Styling** | TailwindCSS | Utility-first (fast), responsive trivial, tree-shaking automatic | CSS-in-JS (runtime overhead), Bootstrap (not modern), CSS Modules (verbose) |
| **Deployment** | Vercel | Native Next.js support, zero-config, edge functions, analytics | AWS Amplify (complex), DigitalOcean (less features), Render (less mature) |
| **Form Validation** | Zod | Type-safe, elegant, infer types from schemas, great DX | Yup (older, less type-safe), Joi (backend-focused), react-hook-form alone (no validation) |
| **Type Safety** | TypeScript | Catch errors at compile time, self-documenting, better collab | JavaScript (no safety, too risky for production) |

---

## SECTION 13: COMMON PITFALLS & HOW TO AVOID

### 1. Forgetting RLS Policies

**Pitfall**:
Créer une table sans RLS = n'importe qui peut accéder toutes les données

**Fix**:
Toujours penser "Qui peut accéder cette data?" AVANT de créer une table

**Checklist**:
```sql
-- Après CREATE TABLE, toujours:
ALTER TABLE my_table ENABLE ROW LEVEL SECURITY;

-- Puis créer policies:
CREATE POLICY "Users can view own data" ON my_table
  FOR SELECT USING (auth.uid() = user_id);
```

---

### 2. Mixing Server + Client Logic

**Pitfall**:
Essayer d'utiliser `useState` dans Server Component = error

**Fix**:
- Server Components = data fetching (no hooks, no event handlers)
- Client Components = interactivity (useState, useEffect, onClick)

**Example**:
```tsx
// ❌ BAD: Server Component avec useState
export default async function Page() {
  const [count, setCount] = useState(0); // ERROR!
  return <div>{count}</div>;
}

// ✅ GOOD: Split logic
// page.tsx (Server Component)
export default async function Page() {
  const data = await fetchData();
  return <ClientComponent data={data} />;
}

// client-component.tsx (Client Component)
'use client';
export default function ClientComponent({ data }) {
  const [count, setCount] = useState(0); // OK!
  return <div>{count}</div>;
}
```

---

### 3. N+1 Query Problems

**Pitfall**:
Fetch projects, puis pour chaque project fetch feedbacks = 1 + N queries

**Fix**:
Use JOIN ou Supabase relationships

**Example**:
```typescript
// ❌ BAD: N+1 queries
const projects = await supabase.from('projects').select('*');
for (const project of projects) {
  const feedbacks = await supabase
    .from('feedbacks')
    .select('*')
    .eq('project_id', project.id); // N queries!
}

// ✅ GOOD: Single query avec JOIN
const projects = await supabase
  .from('projects')
  .select(`
    *,
    feedbacks (*)
  `); // 1 query!
```

---

### 4. Storing Secrets in .env.local (puis commit)

**Pitfall**:
.env.local avec `SUPABASE_SERVICE_ROLE_KEY` committé sur GitHub = breach

**Fix**:
- .env.local dans .gitignore (ALWAYS)
- Use .env.local.example pour template
- Vercel env vars pour production

---

### 5. No Error Handling on API Calls

**Pitfall**:
```tsx
const res = await fetch('/api/projects');
const data = await res.json(); // Si error = crash!
```

**Fix**:
Always wrap dans try/catch + show user-friendly error

```tsx
try {
  const res = await fetch('/api/projects');
  if (!res.ok) throw new Error('Failed to fetch');
  const data = await res.json();
} catch (error) {
  toast.error('Failed to load projects. Please try again.');
}
```

---

### 6. Hardcoding URLs

**Pitfall**:
```tsx
const res = await fetch('http://localhost:3000/api/projects'); // Breaks en prod!
```

**Fix**:
Use env variables

```tsx
const API_URL = process.env.NEXT_PUBLIC_APP_URL;
const res = await fetch(`${API_URL}/api/projects`);
```

---

### 7. Not Validating Input Server-Side

**Pitfall**:
Valider seulement côté client = bypassed via curl/Postman

**Fix**:
Always validate server-side (API routes) avec Zod

```typescript
// API route
import { z } from 'zod';

const schema = z.object({
  name: z.string().min(2).max(200),
  email: z.string().email(),
});

export async function POST(req: Request) {
  const body = await req.json();
  const validated = schema.parse(body); // Throws si invalid
  // ... insert into DB
}
```

---

### 8. Forgetting Loading States

**Pitfall**:
Button without loading state = user clicks 10 times = 10 API calls

**Fix**:
Always disable button pendant mutation

```tsx
const [loading, setLoading] = useState(false);

async function handleSubmit() {
  setLoading(true);
  try {
    await createProject(data);
  } finally {
    setLoading(false);
  }
}

return (
  <Button disabled={loading}>
    {loading ? 'Creating...' : 'Create Project'}
  </Button>
);
```

---

## SECTION 14: GLOSSARY & TERMS

| **Term** | **Definition** |
|----------|----------------|
| **SSR** | Server-Side Rendering: Render page on server for each request (good for SEO, dynamic data) |
| **SSG** | Static Site Generation: Pre-render pages at build time (fast, cacheable) |
| **RSC** | React Server Components: Components rendered on server (Next.js 13+ App Router) |
| **RLS** | Row Level Security: Postgres policies to restrict data access per row |
| **CRUD** | Create, Read, Update, Delete (basic DB operations) |
| **NPS** | Net Promoter Score: 0-10 rating scale ("How likely to recommend?") |
| **Detractors** | NPS score 0-6 (unhappy clients) |
| **Passives** | NPS score 7-8 (satisfied but not loyal) |
| **Promoters** | NPS score 9-10 (loyal, happy clients) |
| **Webhook** | HTTP POST sent when event happens (e.g., new feedback) |
| **Token** | Unique string for authentication/authorization (e.g., JWT) |
| **Session** | User's logged-in state (stored in cookie or token) |
| **RUM** | Real User Monitoring: Track real user performance metrics |
| **FCP** | First Contentful Paint: Time until first content rendered |
| **LCP** | Largest Contentful Paint: Time until largest content rendered |
| **CLS** | Cumulative Layout Shift: Visual stability (no jumping content) |
| **TTI** | Time to Interactive: Time until page fully interactive |
| **TTFB** | Time to First Byte: Server response time |
| **Edge Functions** | Functions running at CDN edge (closer to users, faster) |
| **Denormalization** | Store calculated data (e.g., avg_nps) for performance |
| **Colocation** | Keep related code together (components near usage) |

---

## SECTION 15: COMMENT UTILISER CE CONTEXTE.MD

### Pour Claude Code

1. **Lors de chaque tâche**:
   - Avant de coder, reference la section pertinente
   - Example: "Selon CONTEXTE.md Section 6 (Data Model), créer la table `projects` avec les champs spécifiés"

2. **Lors de doutes**:
   - "Checker CONTEXTE.md Section 7 (API Contract) pour le format de response"
   - "Référencer CONTEXTE.md Section 9 (Design System) pour les couleurs NPS"

3. **Cohérence**:
   - Toujours respecter les conventions (naming, structure)
   - Si modification needed, updater CONTEXTE.md FIRST

### Pour Dev Senior

1. **Onboarding** (Jour 1):
   - Lire CONTEXTE.md en entier (30-45 min)
   - Setup local environment (Section 10)
   - Tester manuellement l'app

2. **Daily Workflow**:
   - Référencer sections pertinentes (Data Model, API Contract, Design System)
   - Coder selon les specs
   - Si blocker: Check CONTEXTE.md → Search docs → Ask team

3. **Pull Requests**:
   - Vérifier que code respecte CONTEXTE.md (naming, structure, patterns)
   - Commenter si deviation detected

### Pour Founder (Toi)

1. **Product Decisions**:
   - Lire Section 2 (Stratégie Produit) + Section 13 (Roadmap)
   - Si nouvelle feature: Updater CONTEXTE.md → Share avec dev

2. **Validation**:
   - Section 1 (Executive Summary) = pitch deck
   - Section 16 (Deployment Checklist) = pre-launch review

3. **Communication**:
   - Share CONTEXTE.md avec investors, advisors, hires
   - Single source of truth

---

## SECTION 16: NEXT STEPS (MVP Development Timeline)

### Day 1: Foundation

**Morning** (4h):
- ✅ Init Next.js 15 project (`npx create-next-app@latest`)
- ✅ Install dependencies (Tailwind, shadcn/ui, Zod, Supabase)
- ✅ Setup folder structure (app/, components/, lib/)
- ✅ Configure TypeScript (strict mode)
- ✅ Setup Tailwind + shadcn/ui config

**Afternoon** (4h):
- ✅ Create Supabase project (Production)
- ✅ Create tables (users, projects, feedbacks, badge_stats)
- ✅ Configure RLS policies
- ✅ Create indexes + triggers
- ✅ Setup .env.local avec Supabase keys
- ✅ Test connection (simple query)

---

### Day 2: Authentication

**Morning** (4h):
- ✅ Setup Supabase clients (client.ts, server.ts, admin.ts)
- ✅ Create auth helpers (lib/supabase/auth.ts)
- ✅ Create API routes:
  - POST /api/auth/signup
  - POST /api/auth/login
  - POST /api/auth/logout
  - GET /api/auth/me
- ✅ Test API routes (Postman/Insomnia)

**Afternoon** (4h):
- ✅ Create auth pages:
  - /login
  - /signup
- ✅ Create auth components (login-form.tsx, signup-form.tsx)
- ✅ Implement form validation (Zod)
- ✅ Add loading states + error handling
- ✅ Test flow end-to-end (signup → login → logout)

---

### Day 3: Dashboard Layout

**Morning** (4h):
- ✅ Create dashboard layout (navbar + main content)
- ✅ Create navbar component (logo, user menu, logout)
- ✅ Create dashboard home page (stats mockées)
- ✅ Add route protection (redirect si pas auth)

**Afternoon** (4h):
- ✅ Install shadcn/ui components:
  - Button, Card, Table, Dialog, Input, Label, Avatar, Badge, Select, Form, Toast, DropdownMenu
- ✅ Create shared components (navbar.tsx)
- ✅ Add responsive design (mobile, tablet, desktop)

---

### Day 4: Projects CRUD

**Morning** (4h):
- ✅ Create API routes:
  - GET /api/projects
  - POST /api/projects
  - GET /api/projects/[id]
  - PUT /api/projects/[id]
  - DELETE /api/projects/[id]
- ✅ Test API routes (Postman)
- ✅ Add Zod validation

**Afternoon** (4h):
- ✅ Create /dashboard/projects page
- ✅ Create projects components:
  - projects-table.tsx
  - new-project-modal.tsx
  - edit-project-modal.tsx
  - delete-project-dialog.tsx
- ✅ Implement CRUD frontend (create, edit, delete)
- ✅ Add loading states + error handling
- ✅ Test end-to-end

---

### Day 5: Feedbacks & Badge

**Morning** (4h):
- ✅ Seed database avec mock feedbacks (SQL script)
- ✅ Create API routes:
  - GET /api/feedbacks
  - GET /api/badge/stats
  - GET /api/badge/code
- ✅ Test API routes

**Afternoon** (4h):
- ✅ Create /dashboard/feedbacks page
- ✅ Create feedbacks components:
  - feedbacks-list.tsx
  - feedback-card.tsx
  - nps-score-badge.tsx (color logic)
  - feedbacks-stats.tsx
- ✅ Create /dashboard/badge page
- ✅ Create badge components:
  - badge-preview.tsx
  - badge-code-snippet.tsx
- ✅ Test end-to-end

---

### Day 6: Polish & Testing

**Morning** (4h):
- ✅ Add error pages (404, 500)
- ✅ Add loading skeletons (Suspense)
- ✅ Improve responsive design (mobile touch targets)
- ✅ Add SEO meta tags (title, description, og:image)
- ✅ Configure favicon

**Afternoon** (4h):
- ✅ Manual testing (checklist Section 16)
- ✅ Fix bugs discovered
- ✅ Run Lighthouse audit (aim > 90)
- ✅ Optimize bundle size

---

### Day 7: Deployment

**Morning** (2h):
- ✅ Create Vercel project
- ✅ Configure env vars (Vercel dashboard)
- ✅ Deploy to production
- ✅ Smoke test prod (signup, create project, etc.)

**Afternoon** (2h):
- ✅ Monitor error logs (Vercel + Supabase)
- ✅ Fix critical bugs if any
- ✅ Update README.md (setup instructions)
- ✅ Announce launch 🚀

---

## FINAL NOTES

**This document is the single source of truth for ratee.me MVP.**

- **Update it** when architecture changes
- **Reference it** when coding
- **Share it** with team/investors

**Questions?** Check relevant section first:
- Data model → Section 3.2
- API contract → Section 3.3
- Design system → Section 7
- Deployment → Section 10

**Ready to build?**
→ Start with Day 1 (Next Steps)
→ Follow CONTEXTE.md religiously
→ Ship MVP in 7 days ✅

---

**Good luck. Let's build something amazing.** 🚀

---

_Generated with care by Claude Code_
_Version 1.0 | 2025-11-18_
