# ⚡ Quick Start Guide

Get ratee.me running in **10 minutes**!

## Prerequisites

- ✅ Node.js 18+ installed
- ✅ Code editor (VS Code recommended)
- ✅ Terminal access

## Setup Steps

### 1️⃣ Dependencies (Already Done! ✅)

```bash
# All dependencies installed
npm install
```

### 2️⃣ Create Supabase Project (5 min)

1. Go to **https://supabase.com/dashboard**
2. Click **"New Project"**
3. Fill in:
   - Name: `ratee-me`
   - Database Password: (choose strong password)
   - Region: (closest to you)
4. Click **"Create"**
5. Wait 2-3 minutes ⏳

### 3️⃣ Get API Keys (1 min)

1. In Supabase dashboard: **Settings** → **API**
2. Copy these values:
   - **Project URL**: `https://xxx.supabase.co`
   - **anon public**: `eyJxxx...`
   - **service_role**: `eyJxxx...` ⚠️ Keep secret!

### 4️⃣ Configure Environment (1 min)

```bash
# Create .env.local
cp .env.local.example .env.local
```

Edit `.env.local`:
```env
NEXT_PUBLIC_SUPABASE_URL=https://YOUR-PROJECT.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 5️⃣ Setup Database (2 min)

1. In Supabase: **SQL Editor** (left sidebar)
2. Click **"New Query"**
3. Open `supabase-schema.sql` in your code editor
4. Copy **all content** and paste into SQL Editor
5. Click **"Run"** (or Ctrl/Cmd + Enter)
6. Should see: ✅ `Success. No rows returned`

### 6️⃣ Start Dev Server (1 min)

```bash
npm run dev
```

Open **http://localhost:3000** 🎉

## Verify Setup

Run these checks:

```bash
# Check TypeScript (should show no errors)
npm run type-check

# Check build (should compile successfully)
npm run build

# Check linting
npm run lint
```

All passing? ✅ **You're ready!**

## Project Structure Quick Tour

```
ratee.me/
├── app/                     # Next.js pages & API routes
│   ├── (auth)/             # Login/Signup (to build)
│   ├── (dashboard)/        # Dashboard pages (to build)
│   └── api/                # API routes (to build)
│
├── components/             # React components
│   ├── ui/                 # shadcn/ui components (to add)
│   ├── shared/             # Navbar, etc (to build)
│   ├── projects/           # Project components (to build)
│   ├── feedbacks/          # Feedback components (to build)
│   └── auth/               # Auth forms (to build)
│
├── lib/
│   ├── supabase/          # ✅ Supabase clients & queries
│   ├── validators.ts      # ✅ Zod schemas
│   ├── utils.ts           # ✅ Helper functions
│   └── constants.ts       # ✅ App constants
│
├── types/                  # ✅ TypeScript types
│
├── CONTEXTE.md            # 📖 Full project documentation
├── SUPABASE-SETUP.md      # 📖 Detailed Supabase guide
└── supabase-schema.sql    # 📖 Database schema
```

## What's Next?

### ✅ Completed
- Project foundation (Next.js + TypeScript + Tailwind)
- Supabase configuration (clients, queries, types)
- Validation schemas (Zod)
- Database schema ready

### ⏳ To Build (Day 2-7)

**Day 2: Authentication** (4-6h)
- [ ] Auth API routes (signup, login, logout)
- [ ] Login/Signup pages
- [ ] Auth forms with validation

**Day 3: Dashboard Layout** (4-6h)
- [ ] Navbar component
- [ ] Dashboard home page
- [ ] Protected routes

**Day 4: Projects CRUD** (6-8h)
- [ ] Projects list page
- [ ] Create/Edit/Delete modals
- [ ] Projects API routes

**Day 5: Feedbacks & Badge** (4-6h)
- [ ] Feedbacks list page
- [ ] Badge preview page
- [ ] Mock data integration

**Day 6: Polish** (4-6h)
- [ ] Responsive design
- [ ] Loading states
- [ ] Error handling

**Day 7: Deploy** (2-4h)
- [ ] Deploy to Vercel
- [ ] Production testing

## Common Commands

```bash
# Development
npm run dev              # Start dev server (port 3000)

# Quality checks
npm run type-check       # TypeScript validation
npm run lint             # Code linting
npm run lint:fix         # Auto-fix linting issues
npm run build            # Production build

# Deployment
npm run start            # Start production server
```

## Troubleshooting

### "Invalid API key"
- Check `.env.local` has correct Supabase keys
- Restart dev server: `Ctrl+C` → `npm run dev`

### "Failed to fetch"
- Verify Supabase project URL is correct
- Check project isn't paused (free tier auto-pauses after 7 days inactivity)

### Build errors
- Run `npm run type-check` to see TypeScript errors
- Check all `.env.local` variables are set

### Port 3000 already in use
```bash
# Kill process on port 3000 (macOS/Linux)
lsof -ti:3000 | xargs kill -9

# Or use different port
npm run dev -- -p 3001
```

## Need Help?

📖 **Documentation:**
- `CONTEXTE.md` - Full project architecture
- `SUPABASE-SETUP.md` - Detailed Supabase guide
- `README.md` - Project overview

🔗 **External Resources:**
- [Next.js Docs](https://nextjs.org/docs)
- [Supabase Docs](https://supabase.com/docs)
- [Tailwind Docs](https://tailwindcss.com/docs)

---

**Ready to build?** Start with Day 2: Authentication! 🚀

See `CONTEXTE.md Section 2.2` for detailed Day 2 plan.
