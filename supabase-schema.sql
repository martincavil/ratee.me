-- ratee.me Database Schema
-- Run this SQL in your Supabase SQL Editor
-- Reference: CONTEXTE.md Section 3.2

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- TABLE: users
-- Purpose: Store freelance/agency profiles
-- ============================================
CREATE TABLE users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  company_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- RLS Policies for users
CREATE POLICY "Users can view own profile" ON users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON users
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can delete own account" ON users
  FOR DELETE USING (auth.uid() = id);

CREATE POLICY "Prevent direct insert" ON users
  FOR INSERT WITH CHECK (false);

-- Index for fast email lookup
CREATE INDEX idx_users_email ON users(email);

-- ============================================
-- TABLE: projects
-- Purpose: Represent client projects/missions
-- ============================================
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

-- Enable Row Level Security
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

-- RLS Policies for projects
CREATE POLICY "Users can view own projects" ON projects
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create own projects" ON projects
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own projects" ON projects
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own projects" ON projects
  FOR DELETE USING (auth.uid() = user_id);

-- Indexes for performance
CREATE INDEX idx_projects_user_id ON projects(user_id);
CREATE INDEX idx_projects_created_at ON projects(created_at DESC);
CREATE INDEX idx_projects_status ON projects(status);

-- ============================================
-- TABLE: feedbacks
-- Purpose: Store client NPS feedback
-- ============================================
CREATE TABLE feedbacks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  client_name TEXT NOT NULL,
  nps_score INT NOT NULL CHECK (nps_score >= 0 AND nps_score <= 10),
  comment TEXT,
  email TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE feedbacks ENABLE ROW LEVEL SECURITY;

-- RLS Policies for feedbacks
CREATE POLICY "Users can view feedbacks for own projects" ON feedbacks
  FOR SELECT USING (
    project_id IN (
      SELECT id FROM projects WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Public can insert via webhook" ON feedbacks
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Prevent feedback updates" ON feedbacks
  FOR UPDATE WITH CHECK (false);

CREATE POLICY "Prevent feedback deletes" ON feedbacks
  FOR DELETE USING (false);

-- Indexes for performance
CREATE INDEX idx_feedbacks_project_id ON feedbacks(project_id);
CREATE INDEX idx_feedbacks_created_at ON feedbacks(created_at DESC);
CREATE INDEX idx_feedbacks_nps_score ON feedbacks(nps_score);

-- ============================================
-- TABLE: badge_stats
-- Purpose: Denormalized cache for badge stats
-- ============================================
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

-- Enable Row Level Security
ALTER TABLE badge_stats ENABLE ROW LEVEL SECURITY;

-- RLS Policies for badge_stats
CREATE POLICY "Badge stats are publicly readable" ON badge_stats
  FOR SELECT USING (true);

CREATE POLICY "Users can update own badge stats" ON badge_stats
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Auto insert on first project" ON badge_stats
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Index for fast lookup
CREATE INDEX idx_badge_stats_user_id ON badge_stats(user_id);

-- ============================================
-- TRIGGERS
-- ============================================

-- Trigger: Auto-update updated_at column
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_users_updated_at
  BEFORE UPDATE ON users
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_projects_updated_at
  BEFORE UPDATE ON projects
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Trigger: Auto-create user profile on signup
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users (id, email, name)
  VALUES (NEW.id, NEW.email, COALESCE(NEW.raw_user_meta_data->>'name', 'User'));
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- Trigger: Update badge_stats when new feedback is added
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
  INSERT INTO badge_stats (
    user_id,
    avg_nps,
    total_feedbacks,
    last_feedback_date,
    total_detractors,
    total_passives,
    total_promoters,
    updated_at
  )
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

-- ============================================
-- SEED DATA (Mock for MVP Demo)
-- ============================================

-- Note: Run this AFTER creating a test user via Supabase Auth
-- Replace 'YOUR_USER_ID' with actual user ID from auth.users

-- Example mock data (commented out - replace with actual user_id):
/*
-- Mock projects
INSERT INTO projects (user_id, name, client_name, client_email, description, delivery_date, status, feedback_status) VALUES
('YOUR_USER_ID', 'Website Redesign', 'Acme Corp', 'john@acme.com', 'Complete website overhaul with modern design', '2024-12-15', 'delivered', 'received'),
('YOUR_USER_ID', 'Mobile App Development', 'TechStart', 'sarah@techstart.io', 'iOS and Android app for inventory management', '2025-01-20', 'in_progress', 'not_sent'),
('YOUR_USER_ID', 'Brand Identity', 'GreenLeaf Co', 'contact@greenleaf.com', 'Logo, brand guidelines, and marketing materials', '2024-11-30', 'delivered', 'received');

-- Mock feedbacks (use actual project IDs after inserting projects)
INSERT INTO feedbacks (project_id, client_name, nps_score, comment, email) VALUES
('PROJECT_ID_1', 'John Doe', 9, 'Outstanding work! Exceeded our expectations.', 'john@acme.com'),
('PROJECT_ID_3', 'Jane Smith', 10, 'Absolutely professional, will definitely hire again!', 'contact@greenleaf.com');
*/

-- ============================================
-- VERIFICATION QUERIES
-- ============================================

-- Check all tables created
SELECT table_name FROM information_schema.tables
WHERE table_schema = 'public'
ORDER BY table_name;

-- Check RLS is enabled
SELECT tablename, rowsecurity
FROM pg_tables
WHERE schemaname = 'public';

-- Check policies
SELECT schemaname, tablename, policyname
FROM pg_policies
WHERE schemaname = 'public';
