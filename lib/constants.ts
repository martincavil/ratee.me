export const APP_NAME = 'ratee.me';
export const APP_DESCRIPTION = 'Automate client feedback collection with NPS tracking';

export const API_URL = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

export const PROJECT_STATUS = {
  IN_PROGRESS: 'in_progress',
  DELIVERED: 'delivered',
  ARCHIVED: 'archived',
} as const;

export const FEEDBACK_STATUS = {
  NOT_SENT: 'not_sent',
  SENT: 'sent',
  RECEIVED: 'received',
} as const;

export const NPS_CATEGORIES = {
  DETRACTOR: 'detractor', // 0-6
  PASSIVE: 'passive', // 7-8
  PROMOTER: 'promoter', // 9-10
} as const;

export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  SIGNUP: '/signup',
  DASHBOARD: '/dashboard',
  PROJECTS: '/dashboard/projects',
  FEEDBACKS: '/dashboard/feedbacks',
  BADGE: '/dashboard/badge',
  SETTINGS: '/dashboard/settings',
} as const;
