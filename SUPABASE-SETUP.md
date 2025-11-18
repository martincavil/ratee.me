# 🔧 Supabase Setup Guide

This guide will walk you through setting up Supabase for ratee.me.

## Step 1: Create Supabase Project

1. Go to [https://supabase.com/dashboard](https://supabase.com/dashboard)
2. Click **"New Project"**
3. Fill in the details:
   - **Name**: `ratee-me` (or any name you prefer)
   - **Database Password**: Choose a strong password (save it somewhere safe!)
   - **Region**: Choose closest to your users
   - **Pricing Plan**: Free tier is perfect for MVP
4. Click **"Create new project"**
5. Wait 2-3 minutes for project to be ready

## Step 2: Get API Keys

1. In your Supabase project dashboard, go to **Settings** (gear icon) → **API**
2. You'll see two sections:

### Project URL
Copy the **URL** (looks like: `https://abcdefghijk.supabase.co`)

### API Keys
- **anon public**: Copy this key (safe to use in browser)
- **service_role**: Copy this key ⚠️ **KEEP SECRET!** (server-only, bypasses RLS)

## Step 3: Configure Environment Variables

1. In your project root, create `.env.local`:
   ```bash
   cp .env.local.example .env.local
   ```

2. Edit `.env.local` and paste your keys:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://YOUR-PROJECT-ID.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-public-key-here
   SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   ```

3. Save the file

⚠️ **IMPORTANT**: Never commit `.env.local` to Git! It's already in `.gitignore`.

## Step 4: Run Database Schema

1. In Supabase dashboard, go to **SQL Editor** (left sidebar)
2. Click **"New Query"**
3. Open `supabase-schema.sql` from your project root
4. Copy the **entire contents** and paste into the SQL Editor
5. Click **"Run"** (or press Ctrl/Cmd + Enter)
6. You should see: `Success. No rows returned`

### Verify Tables Created

Run this query in SQL Editor:
```sql
SELECT table_name FROM information_schema.tables
WHERE table_schema = 'public'
ORDER BY table_name;
```

You should see:
- `badge_stats`
- `feedbacks`
- `projects`
- `users`

### Verify RLS Enabled

Run this query:
```sql
SELECT tablename, rowsecurity
FROM pg_tables
WHERE schemaname = 'public';
```

All tables should have `rowsecurity = true`.

## Step 5: Test Connection

1. Start your dev server:
   ```bash
   npm run dev
   ```

2. Open [http://localhost:3000](http://localhost:3000)

3. You should see the app redirect to `/dashboard` (will show error until we build auth pages)

4. Check terminal for errors - if no errors, connection is working! ✅

## Step 6: (Optional) Seed Mock Data

After creating a test user via signup (we'll build this next), you can add mock data:

1. Sign up for an account in the app
2. In Supabase dashboard, go to **Authentication** → **Users**
3. Copy your User ID (UUID)
4. Go to **SQL Editor** and run:

```sql
-- Replace YOUR_USER_ID with actual user ID
INSERT INTO projects (user_id, name, client_name, client_email, description, delivery_date, status, feedback_status) VALUES
('YOUR_USER_ID', 'Website Redesign', 'Acme Corp', 'john@acme.com', 'Complete website overhaul with modern design', '2024-12-15', 'delivered', 'received'),
('YOUR_USER_ID', 'Mobile App Development', 'TechStart', 'sarah@techstart.io', 'iOS and Android app for inventory management', '2025-01-20', 'in_progress', 'not_sent'),
('YOUR_USER_ID', 'Brand Identity', 'GreenLeaf Co', 'contact@greenleaf.com', 'Logo, brand guidelines, and marketing materials', '2024-11-30', 'delivered', 'received');

-- Get project IDs after inserting:
SELECT id, name FROM projects WHERE user_id = 'YOUR_USER_ID';

-- Then insert mock feedbacks (replace PROJECT_ID_1, PROJECT_ID_2 with actual IDs):
INSERT INTO feedbacks (project_id, client_name, nps_score, comment, email) VALUES
('PROJECT_ID_1', 'John Doe', 9, 'Outstanding work! Exceeded our expectations.', 'john@acme.com'),
('PROJECT_ID_2', 'Jane Smith', 10, 'Absolutely professional, will definitely hire again!', 'contact@greenleaf.com');
```

## Troubleshooting

### Error: "Invalid API key"
- Double-check `.env.local` has correct keys
- Restart dev server (`Ctrl+C` then `npm run dev`)
- Make sure no trailing spaces in keys

### Error: "Failed to fetch"
- Check Project URL is correct (includes `https://`)
- Check Supabase project is running (not paused)
- Check internet connection

### RLS Policy Errors
- Make sure all tables have RLS enabled
- Check policies were created (run verification queries above)
- If needed, re-run `supabase-schema.sql`

### "User already exists" when running schema
- This is normal if you've already run the schema
- The trigger creates users automatically on signup

## Next Steps

Now that Supabase is configured:

1. ✅ **Supabase Setup** - COMPLETE
2. ⏳ **Build Auth Pages** - Login/Signup forms
3. ⏳ **Build Dashboard** - Protected routes
4. ⏳ **Build Projects CRUD** - Full project management

Continue with Day 2: Authentication implementation!

## Useful Supabase Dashboard Links

- **Table Editor**: View/edit data directly
- **Authentication**: Manage users
- **SQL Editor**: Run custom queries
- **API Docs**: Auto-generated API documentation
- **Logs**: View real-time logs for debugging

---

**Need Help?**
- [Supabase Docs](https://supabase.com/docs)
- [Next.js + Supabase Guide](https://supabase.com/docs/guides/getting-started/quickstarts/nextjs)
