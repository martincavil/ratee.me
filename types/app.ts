/**
 * App-specific types
 * UI states, component props, etc.
 */

// ============================================
// NPS TYPES
// ============================================

export type NPSCategory = 'detractor' | 'passive' | 'promoter';
export type NPSScore = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

// ============================================
// FORM STATES
// ============================================

export interface FormState {
  loading: boolean;
  error: string | null;
  success: boolean;
}

// ============================================
// MODAL STATES
// ============================================

export interface ModalState {
  isOpen: boolean;
  data: Record<string, unknown> | null;
}

// ============================================
// DASHBOARD STATS
// ============================================

export interface DashboardStats {
  total_projects: number;
  total_feedbacks: number;
  avg_nps: number;
  last_feedback_date: string | null;
}
