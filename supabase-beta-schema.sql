-- ratee.me Beta System Schema
-- Run this SQL in your Supabase SQL Editor
-- This adds: waitlist, beta_invites, subscriptions tables

-- ============================================
-- TABLE: waitlist
-- Purpose: Store email waitlist signups
-- ============================================
CREATE TABLE waitlist (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT NOT NULL UNIQUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  status TEXT DEFAULT 'waiting' CHECK (status IN ('waiting', 'beta_invited', 'converted')),
  referrer TEXT,
  source TEXT,
  notes TEXT
);

-- Enable Row Level Security
ALTER TABLE waitlist ENABLE ROW LEVEL SECURITY;

-- Anyone can join waitlist (public insert)
CREATE POLICY "Anyone can join waitlist"
ON waitlist FOR INSERT
WITH CHECK (true);

-- Only admin can view/manage waitlist
CREATE POLICY "Admin can view waitlist"
ON waitlist FOR SELECT
USING (auth.uid() IN (SELECT id FROM auth.users WHERE email = 'martin@ratee.me'));

CREATE POLICY "Admin can update waitlist"
ON waitlist FOR UPDATE
USING (auth.uid() IN (SELECT id FROM auth.users WHERE email = 'martin@ratee.me'));

CREATE POLICY "Admin can delete waitlist"
ON waitlist FOR DELETE
USING (auth.uid() IN (SELECT id FROM auth.users WHERE email = 'martin@ratee.me'));

-- Index for fast email lookup
CREATE INDEX idx_waitlist_email ON waitlist(email);
CREATE INDEX idx_waitlist_created_at ON waitlist(created_at DESC);

-- ============================================
-- TABLE: beta_invites
-- Purpose: Store beta invitation tokens
-- ============================================
CREATE TABLE beta_invites (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT NOT NULL,
  token TEXT NOT NULL UNIQUE,
  invited_by TEXT DEFAULT 'martin@ratee.me',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  used_at TIMESTAMPTZ,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'used', 'expired')),
  expires_at TIMESTAMPTZ DEFAULT (NOW() + INTERVAL '30 days'),
  trial_duration_days INT DEFAULT 30,
  trial_started_at TIMESTAMPTZ
);

-- Enable Row Level Security
ALTER TABLE beta_invites ENABLE ROW LEVEL SECURITY;

-- Admin can manage invites
CREATE POLICY "Admin can view invites"
ON beta_invites FOR SELECT
USING (auth.uid() IN (SELECT id FROM auth.users WHERE email = 'martin@ratee.me'));

CREATE POLICY "Admin can create invites"
ON beta_invites FOR INSERT
WITH CHECK (auth.uid() IN (SELECT id FROM auth.users WHERE email = 'martin@ratee.me'));

CREATE POLICY "Admin can update invites"
ON beta_invites FOR UPDATE
USING (auth.uid() IN (SELECT id FROM auth.users WHERE email = 'martin@ratee.me'));

CREATE POLICY "Admin can delete invites"
ON beta_invites FOR DELETE
USING (auth.uid() IN (SELECT id FROM auth.users WHERE email = 'martin@ratee.me'));

-- Public can validate token (for redemption)
CREATE POLICY "Public can validate token"
ON beta_invites FOR SELECT
USING (true);

-- Indexes
CREATE INDEX idx_beta_invites_token ON beta_invites(token);
CREATE INDEX idx_beta_invites_email ON beta_invites(email);
CREATE INDEX idx_beta_invites_status ON beta_invites(status);

-- ============================================
-- TABLE: subscriptions
-- Purpose: Track user subscription plans and trials
-- ============================================
CREATE TABLE subscriptions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  plan TEXT DEFAULT 'free' CHECK (plan IN ('free', 'pro', 'enterprise')),
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'cancelled', 'past_due')),
  trial_until TIMESTAMPTZ,
  current_period_start TIMESTAMPTZ,
  current_period_end TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;

-- Users can view their own subscription
CREATE POLICY "Users can view own subscription"
ON subscriptions FOR SELECT
USING (auth.uid() = user_id);

-- Admin can view all subscriptions
CREATE POLICY "Admin can view all subscriptions"
ON subscriptions FOR SELECT
USING (auth.uid() IN (SELECT id FROM auth.users WHERE email = 'martin@ratee.me'));

-- System can insert subscriptions (for beta signup)
CREATE POLICY "System can insert subscriptions"
ON subscriptions FOR INSERT
WITH CHECK (true);

-- Users can update own subscription
CREATE POLICY "Users can update own subscription"
ON subscriptions FOR UPDATE
USING (auth.uid() = user_id);

-- Index
CREATE INDEX idx_subscriptions_user_id ON subscriptions(user_id);
CREATE INDEX idx_subscriptions_plan ON subscriptions(plan);

-- Trigger for updated_at
CREATE TRIGGER update_subscriptions_updated_at
  BEFORE UPDATE ON subscriptions
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- HELPER FUNCTION: Get waitlist count
-- ============================================
CREATE OR REPLACE FUNCTION get_waitlist_count()
RETURNS INTEGER AS $$
BEGIN
  RETURN (SELECT COUNT(*) FROM waitlist);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
