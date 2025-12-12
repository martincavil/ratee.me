/**
 * API Request/Response types
 * These define the contract between frontend and API routes
 */

// ============================================
// GENERIC API RESPONSE
// ============================================

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  emailConfirmationRequired?: boolean;
}

// ============================================
// AUTH API TYPES
// ============================================

export interface SignupRequest {
  email: string;
  password: string;
  name: string;
  company_name?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  user: {
    id: string;
    email: string;
    name: string;
    company_name?: string;
  };
  session: {
    access_token: string;
    expires_in: number;
  };
}

// ============================================
// PROJECTS API TYPES
// ============================================

export interface CreateProjectRequest {
  name: string;
  client_name: string;
  client_email?: string;
  description?: string;
  delivery_date: string; // ISO date string (YYYY-MM-DD)
}

export interface UpdateProjectRequest {
  name?: string;
  client_name?: string;
  client_email?: string;
  description?: string;
  delivery_date?: string;
  status?: 'in_progress' | 'delivered' | 'archived';
  feedback_status?: 'not_sent' | 'sent' | 'received';
}

export interface GetProjectsParams {
  limit?: number;
  offset?: number;
  status?: 'in_progress' | 'delivered' | 'archived';
  sort?: 'created_at' | 'delivery_date' | 'name';
  order?: 'asc' | 'desc';
}

// ============================================
// FEEDBACKS API TYPES
// ============================================

export interface GetFeedbacksParams {
  project_id?: string;
  limit?: number;
  offset?: number;
  sort?: 'created_at' | 'nps_score';
  order?: 'asc' | 'desc';
}

export interface FeedbacksResponse {
  feedbacks: Array<{
    id: string;
    project_id: string;
    client_name: string;
    nps_score: number;
    comment: string | null;
    email: string | null;
    created_at: string;
  }>;
  total: number;
  stats: {
    avg_nps: number;
    total_feedbacks: number;
    nps_distribution: {
      detractors: number;
      passives: number;
      promoters: number;
    };
  };
}

// ============================================
// BADGE API TYPES
// ============================================

export interface BadgeStatsResponse {
  avg_nps: number;
  total_feedbacks: number;
  last_feedback_date: string | null;
  nps_by_category: {
    detractors: number;
    passives: number;
    promoters: number;
  };
}

export interface BadgeCodeResponse {
  html: string;
  css: string;
}

// ============================================
// WEBHOOK API TYPES (Future)
// ============================================

export interface SubmitFeedbackRequest {
  project_token: string;
  nps_score: number;
  comment?: string;
  client_name: string;
  client_email?: string;
}
