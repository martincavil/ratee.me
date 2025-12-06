-- ratee.me Pricing & Email Automation Schema
-- Run this SQL in your Supabase SQL Editor
-- This adds: email_automations table + projects alterations

-- ============================================
-- ALTER TABLE: projects
-- Add fields for email automation
-- ============================================
ALTER TABLE projects ADD COLUMN IF NOT EXISTS completed_at TIMESTAMPTZ;
ALTER TABLE projects ADD COLUMN IF NOT EXISTS automation_onboarding_sent BOOLEAN DEFAULT false;
ALTER TABLE projects ADD COLUMN IF NOT EXISTS automation_30days_sent BOOLEAN DEFAULT false;
ALTER TABLE projects ADD COLUMN IF NOT EXISTS automation_90days_sent BOOLEAN DEFAULT false;

-- ============================================
-- ALTER TABLE: subscriptions
-- Add Stripe fields if not exists
-- ============================================
ALTER TABLE subscriptions ADD COLUMN IF NOT EXISTS stripe_customer_id TEXT;
ALTER TABLE subscriptions ADD COLUMN IF NOT EXISTS stripe_subscription_id TEXT;
ALTER TABLE subscriptions ADD COLUMN IF NOT EXISTS cancelled_at TIMESTAMPTZ;

-- ============================================
-- TABLE: email_automations
-- Purpose: Track all automated emails sent
-- ============================================
CREATE TABLE IF NOT EXISTS email_automations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,

  -- Email types
  email_type TEXT CHECK (email_type IN (
    'onboarding',
    '30_days_followup',
    '90_days_reminder'
  )),

  -- Tracking
  sent_at TIMESTAMPTZ,
  opened_at TIMESTAMPTZ,
  clicked_at TIMESTAMPTZ,

  -- Client info
  client_email TEXT,
  client_name TEXT,

  -- Meta
  status TEXT DEFAULT 'sent' CHECK (status IN ('pending', 'sent', 'failed', 'bounced')),
  error_message TEXT,

  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE email_automations ENABLE ROW LEVEL SECURITY;

-- Users can see their own email automations
CREATE POLICY "Users see own automations"
ON email_automations FOR SELECT
USING (auth.uid() = user_id);

-- Admin can see all
-- IMPORTANT: Remplacez 'YOUR_ADMIN_EMAIL@example.com' par votre vrai email admin
CREATE POLICY "Admin sees all automations"
ON email_automations FOR SELECT
USING (auth.uid() IN (SELECT id FROM auth.users WHERE email = 'YOUR_ADMIN_EMAIL@example.com'));

-- System can insert (for automation)
CREATE POLICY "System can insert automations"
ON email_automations FOR INSERT
WITH CHECK (true);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_email_automations_user_id ON email_automations(user_id);
CREATE INDEX IF NOT EXISTS idx_email_automations_project_id ON email_automations(project_id);
CREATE INDEX IF NOT EXISTS idx_email_automations_sent_at ON email_automations(sent_at DESC);
CREATE INDEX IF NOT EXISTS idx_email_automations_email_type ON email_automations(email_type);

-- Index for projects completed_at (for cron queries)
CREATE INDEX IF NOT EXISTS idx_projects_completed_at ON projects(completed_at);
