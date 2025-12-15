import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format date to human-readable string
 */
export function formatDate(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

/**
 * Calculate time ago from date
 */
export function timeAgo(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  const seconds = Math.floor((new Date().getTime() - d.getTime()) / 1000);

  const intervals = {
    year: 31536000,
    month: 2592000,
    week: 604800,
    day: 86400,
    hour: 3600,
    minute: 60,
  };

  for (const [unit, secondsInUnit] of Object.entries(intervals)) {
    const interval = Math.floor(seconds / secondsInUnit);
    if (interval >= 1) {
      return `${interval} ${unit}${interval === 1 ? '' : 's'} ago`;
    }
  }

  return 'just now';
}

/**
 * Get NPS category from score
 * 0-5: Detractor
 * 6-7: Passive
 * 8-10: Promoter
 */
export function getNPSCategory(score: number): 'detractor' | 'passive' | 'promoter' {
  if (score <= 5) return 'detractor';
  if (score <= 7) return 'passive';
  return 'promoter';
}

/**
 * Get NPS badge variant
 * 0-5: Destructive (red)
 * 6-7: Default (gray/orange)
 * 8-10: Success (green)
 */
export function getNPSBadgeVariant(score: number): 'destructive' | 'default' | 'success' {
  if (score <= 5) return 'destructive';
  if (score <= 7) return 'default';
  return 'success';
}

/**
 * Calculate average NPS from scores
 */
export function calculateAverageNPS(scores: number[]): number {
  if (scores.length === 0) return 0;
  const sum = scores.reduce((acc, score) => acc + score, 0);
  return Math.round((sum / scores.length) * 10) / 10;
}
