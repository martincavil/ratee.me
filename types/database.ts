/**
 * Database types
 * These match the Supabase schema defined in supabase-schema.sql
 *
 * NOTE: In production, generate these automatically using:
 * npx supabase gen types typescript --project-id YOUR_PROJECT_ID > types/database.ts
 */

export interface User {
  id: string;
  email: string;
  name: string;
  company_name: string | null;
  avatar_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface Project {
  id: string;
  user_id: string;
  name: string;
  client_name: string;
  client_email: string | null;
  description: string | null;
  delivery_date: string; // ISO date string
  status: 'in_progress' | 'delivered' | 'archived';
  feedback_status: 'not_sent' | 'sent' | 'received';
  created_at: string;
  updated_at: string;
}

export interface Feedback {
  id: string;
  project_id: string;
  client_name: string;
  nps_score: number; // 0-10
  comment: string | null;
  email: string | null;
  created_at: string;
}

export interface BadgeStats {
  user_id: string;
  avg_nps: number;
  total_feedbacks: number;
  last_feedback_date: string | null;
  total_detractors: number;
  total_passives: number;
  total_promoters: number;
  updated_at: string;
}

// Utility types for inserts/updates (omit auto-generated fields)
export type ProjectInsert = Omit<
  Project,
  'id' | 'created_at' | 'updated_at' | 'user_id'
>;

export type ProjectUpdate = Partial<
  Omit<Project, 'id' | 'user_id' | 'created_at' | 'updated_at'>
>;

export type UserUpdate = Partial<
  Omit<User, 'id' | 'email' | 'created_at' | 'updated_at'>
>;

export type FeedbackInsert = Omit<Feedback, 'id' | 'created_at'>;
