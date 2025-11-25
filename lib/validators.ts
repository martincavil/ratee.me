import { z } from 'zod';

/**
 * Zod validation schemas
 * Used for both client-side and server-side validation
 */

// ============================================
// AUTH VALIDATORS
// ============================================

export const signupSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number'),
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be less than 100 characters'),
  company_name: z
    .string()
    .max(100, 'Company name must be less than 100 characters')
    .optional(),
});

export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

// ============================================
// PROJECT VALIDATORS
// ============================================

export const createProjectSchema = z.object({
  name: z
    .string()
    .min(2, 'Project name must be at least 2 characters')
    .max(200, 'Project name must be less than 200 characters'),
  client_name: z
    .string()
    .min(2, 'Client name must be at least 2 characters')
    .max(100, 'Client name must be less than 100 characters'),
  client_email: z
    .string()
    .email('Invalid email address')
    .optional()
    .or(z.literal('')),
  description: z
    .string()
    .max(500, 'Description must be less than 500 characters')
    .optional()
    .or(z.literal('')),
  delivery_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Invalid date format (YYYY-MM-DD)'),
});

export const updateProjectSchema = z.object({
  name: z
    .string()
    .min(2, 'Project name must be at least 2 characters')
    .max(200, 'Project name must be less than 200 characters')
    .optional(),
  client_name: z
    .string()
    .min(2, 'Client name must be at least 2 characters')
    .max(100, 'Client name must be less than 100 characters')
    .optional(),
  client_email: z
    .string()
    .email('Invalid email address')
    .optional()
    .or(z.literal('')),
  description: z
    .string()
    .max(500, 'Description must be less than 500 characters')
    .optional()
    .or(z.literal('')),
  delivery_date: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, 'Invalid date format (YYYY-MM-DD)')
    .optional(),
  status: z
    .enum(['in_progress', 'delivered', 'archived'])
    .optional(),
  feedback_status: z
    .enum(['not_sent', 'sent', 'received'])
    .optional(),
});

// ============================================
// FEEDBACK VALIDATORS
// ============================================

export const submitFeedbackSchema = z.object({
  project_token: z.string().uuid('Invalid project token'),
  nps_score: z
    .number()
    .int('Score must be an integer')
    .min(0, 'Score must be at least 0')
    .max(10, 'Score must be at most 10'),
  rating_communication: z.union([
    z.number().int().min(1).max(5),
    z.null()
  ]),
  rating_quality: z.union([
    z.number().int().min(1).max(5),
    z.null()
  ]),
  rating_deadlines: z.union([
    z.number().int().min(1).max(5),
    z.null()
  ]),
  rating_value: z.union([
    z.number().int().min(1).max(5),
    z.null()
  ]),
  rating_overall: z.union([
    z.number().int().min(1).max(5),
    z.null()
  ]),
  comment: z
    .string()
    .max(1000, 'Comment must be less than 1000 characters')
    .optional()
    .or(z.literal('')),
  client_name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be less than 100 characters'),
  client_email: z
    .string()
    .email('Invalid email address')
    .optional()
    .or(z.literal('')),
});

// ============================================
// USER PROFILE VALIDATORS
// ============================================

export const updateProfileSchema = z.object({
  full_name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be less than 100 characters')
    .optional(),
  company_name: z
    .string()
    .max(100, 'Company name must be less than 100 characters')
    .optional()
    .or(z.literal('')),
  avatar_url: z
    .string()
    .url('Invalid URL')
    .optional()
    .or(z.literal('')),
});

// ============================================
// QUERY PARAMS VALIDATORS
// ============================================

export const getProjectsParamsSchema = z.object({
  limit: z.number().int().min(1).max(100).optional(),
  offset: z.number().int().min(0).optional(),
  status: z.enum(['in_progress', 'delivered', 'archived']).optional(),
  sort: z.enum(['created_at', 'delivery_date', 'name']).optional(),
  order: z.enum(['asc', 'desc']).optional(),
});

export const getFeedbacksParamsSchema = z.object({
  project_id: z.string().uuid().optional(),
  limit: z.number().int().min(1).max(100).optional(),
  offset: z.number().int().min(0).optional(),
  sort: z.enum(['created_at', 'nps_score']).optional(),
  order: z.enum(['asc', 'desc']).optional(),
});

// ============================================
// TYPE INFERENCE (for TypeScript)
// ============================================

export type SignupInput = z.infer<typeof signupSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type CreateProjectInput = z.infer<typeof createProjectSchema>;
export type UpdateProjectInput = z.infer<typeof updateProjectSchema>;
export type SubmitFeedbackInput = z.infer<typeof submitFeedbackSchema>;
export type UpdateProfileInput = z.infer<typeof updateProfileSchema>;
export type GetProjectsParams = z.infer<typeof getProjectsParamsSchema>;
export type GetFeedbacksParams = z.infer<typeof getFeedbacksParamsSchema>;
