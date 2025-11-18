import { createClient } from '@/lib/supabase/server';

/**
 * Database query functions
 * All queries respect RLS policies automatically
 */

// ============================================
// PROJECTS QUERIES
// ============================================

export async function getProjects(params?: {
  limit?: number;
  offset?: number;
  status?: string;
  sortBy?: 'created_at' | 'delivery_date' | 'name';
  order?: 'asc' | 'desc';
}) {
  const supabase = await createClient();
  const {
    limit = 20,
    offset = 0,
    status,
    sortBy = 'created_at',
    order = 'desc',
  } = params || {};

  let query = supabase.from('projects').select('*', { count: 'exact' });

  // Filter by status if provided
  if (status) {
    query = query.eq('status', status);
  }

  // Sort
  query = query.order(sortBy, { ascending: order === 'asc' });

  // Pagination
  query = query.range(offset, offset + limit - 1);

  const { data, error, count } = await query;

  if (error) {
    throw new Error(`Failed to fetch projects: ${error.message}`);
  }

  return {
    projects: data || [],
    total: count || 0,
    limit,
    offset,
  };
}

export async function getProjectById(id: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    throw new Error(`Failed to fetch project: ${error.message}`);
  }

  return data;
}

export async function createProject(project: {
  name: string;
  client_name: string;
  client_email?: string;
  description?: string;
  delivery_date: string;
}) {
  const supabase = await createClient();

  // Get current user
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error('Unauthorized');

  const { data, error } = await supabase
    .from('projects')
    .insert({
      ...project,
      user_id: user.id,
    })
    .select()
    .single();

  if (error) {
    throw new Error(`Failed to create project: ${error.message}`);
  }

  return data;
}

export async function updateProject(
  id: string,
  updates: {
    name?: string;
    client_name?: string;
    client_email?: string;
    description?: string;
    delivery_date?: string;
    status?: string;
    feedback_status?: string;
  }
) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('projects')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    throw new Error(`Failed to update project: ${error.message}`);
  }

  return data;
}

export async function deleteProject(id: string) {
  const supabase = await createClient();

  const { error } = await supabase.from('projects').delete().eq('id', id);

  if (error) {
    throw new Error(`Failed to delete project: ${error.message}`);
  }

  return { success: true };
}

// ============================================
// FEEDBACKS QUERIES
// ============================================

export async function getFeedbacks(params?: {
  projectId?: string;
  limit?: number;
  offset?: number;
  sortBy?: 'created_at' | 'nps_score';
  order?: 'asc' | 'desc';
}) {
  const supabase = await createClient();
  const {
    projectId,
    limit = 20,
    offset = 0,
    sortBy = 'created_at',
    order = 'desc',
  } = params || {};

  let query = supabase
    .from('feedbacks')
    .select('*, projects!inner(*)', { count: 'exact' });

  // Filter by project if provided
  if (projectId) {
    query = query.eq('project_id', projectId);
  }

  // Sort
  query = query.order(sortBy, { ascending: order === 'asc' });

  // Pagination
  query = query.range(offset, offset + limit - 1);

  const { data, error, count } = await query;

  if (error) {
    throw new Error(`Failed to fetch feedbacks: ${error.message}`);
  }

  // Calculate stats
  const feedbacks = data || [];
  const scores = feedbacks.map((f) => f.nps_score);
  const avgNps =
    scores.length > 0
      ? Math.round((scores.reduce((a, b) => a + b, 0) / scores.length) * 10) /
        10
      : 0;

  const npsDistribution = {
    detractors: scores.filter((s) => s <= 6).length,
    passives: scores.filter((s) => s >= 7 && s <= 8).length,
    promoters: scores.filter((s) => s >= 9).length,
  };

  return {
    feedbacks,
    total: count || 0,
    stats: {
      avg_nps: avgNps,
      total_feedbacks: feedbacks.length,
      nps_distribution: npsDistribution,
    },
  };
}

export async function getFeedbacksByProjectId(projectId: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('feedbacks')
    .select('*')
    .eq('project_id', projectId)
    .order('created_at', { ascending: false });

  if (error) {
    throw new Error(`Failed to fetch feedbacks: ${error.message}`);
  }

  return data || [];
}

// ============================================
// BADGE STATS QUERIES
// ============================================

export async function getBadgeStats(userId?: string) {
  const supabase = await createClient();

  // If no userId provided, get current user
  let targetUserId = userId;
  if (!targetUserId) {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) throw new Error('Unauthorized');
    targetUserId = user.id;
  }

  const { data, error } = await supabase
    .from('badge_stats')
    .select('*')
    .eq('user_id', targetUserId)
    .single();

  if (error) {
    // If no badge stats exist yet, return empty stats
    return {
      avg_nps: 0,
      total_feedbacks: 0,
      last_feedback_date: null,
      total_detractors: 0,
      total_passives: 0,
      total_promoters: 0,
    };
  }

  return data;
}

// ============================================
// USER QUERIES
// ============================================

export async function getUserById(id: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    throw new Error(`Failed to fetch user: ${error.message}`);
  }

  return data;
}

export async function updateUserProfile(updates: {
  name?: string;
  company_name?: string;
  avatar_url?: string;
}) {
  const supabase = await createClient();

  // Get current user
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error('Unauthorized');

  const { data, error } = await supabase
    .from('users')
    .update(updates)
    .eq('id', user.id)
    .select()
    .single();

  if (error) {
    throw new Error(`Failed to update profile: ${error.message}`);
  }

  return data;
}
