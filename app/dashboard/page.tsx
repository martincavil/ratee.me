import Link from 'next/link';
import { getUserProfile, getUser } from '@/lib/supabase/auth';
import { getProjects, getFeedbacks, getBadgeStats } from '@/lib/supabase/queries';
import { ROUTES } from '@/lib/constants';
import { timeAgo } from '@/lib/utils';
import { createClient } from '@/lib/supabase/server';

export default async function DashboardPage() {
  const profile = await getUserProfile();
  const user = await getUser();

  // Fetch stats and subscription in parallel
  const supabase = await createClient();
  const [projectsData, feedbacksData, badgeStats, subscriptionData] = await Promise.all([
    getProjects({ limit: 5 }).catch(() => ({ projects: [], total: 0 })),
    getFeedbacks({ limit: 5 }).catch(() => ({ feedbacks: [], total: 0, stats: { avg_nps: 0, total_feedbacks: 0, nps_distribution: { detractors: 0, passives: 0, promoters: 0 } } })),
    getBadgeStats().catch(() => ({ avg_nps: 0, total_feedbacks: 0, last_feedback_date: null, total_detractors: 0, total_passives: 0, total_promoters: 0 })),
    user ? supabase.from('subscriptions').select('*').eq('user_id', user.id).single() : Promise.resolve({ data: null }),
  ]);

  const subscription = subscriptionData.data;
  const isOnTrial = subscription?.trial_until && new Date(subscription.trial_until) > new Date();
  const daysLeft = isOnTrial
    ? Math.ceil((new Date(subscription.trial_until).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))
    : 0;

  // Determine banner type
  const showFreeBanner = !subscription || subscription.plan === 'free';
  const showTrialBanner = isOnTrial;
  const showProBanner = subscription?.plan === 'pro' && !isOnTrial;

  return (
    <div>
      {/* Free Plan Banner */}
      {showFreeBanner && (
        <div className="bg-info-light border border-info/20 rounded-lg p-4 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-xl">📦</span>
              <div>
                <p className="font-inter text-info font-medium">
                  Vous êtes en plan <strong>FREE</strong> (1 projet/mois)
                </p>
                <p className="font-inter text-info/80 text-sm">
                  Upgrade pour projets illimités + email automation
                </p>
              </div>
            </div>
            <a
              href="/pricing"
              className="px-4 py-2 bg-accent text-white text-sm font-inter font-medium rounded-lg hover:bg-accent-dark"
            >
              Upgrade
            </a>
          </div>
        </div>
      )}

      {/* Trial Banner */}
      {showTrialBanner && (
        <div className="bg-accent-light border border-accent/20 rounded-lg p-4 mb-6">
          <div className="flex items-center gap-3">
            <span className="text-2xl">✨</span>
            <div>
              <p className="font-inter text-accent-dark font-medium">
                Vous êtes en <strong>PRO (30j gratuit)</strong> - {daysLeft} jours restants
              </p>
              <p className="font-inter text-accent-700 text-sm">
                Email automation activée - profitez-en!
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Active PRO Banner */}
      {showProBanner && (
        <div className="bg-accent-50 border border-accent/20 rounded-lg p-4 mb-6">
          <div className="flex items-center gap-3">
            <span className="text-xl">✅</span>
            <div>
              <p className="font-inter text-accent font-medium">
                Vous êtes en plan <strong>PRO</strong> - Automations activées
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Welcome Header */}
      <div className="mb-8">
        <h1 className="font-sora text-3xl font-bold text-content-primary">
          Welcome back, {profile?.name}! 👋
        </h1>
        <p className="font-inter text-content-secondary mt-2">
          Here's what's happening with your client feedback
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Total Projects */}
        <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Projects</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">
                {projectsData.total}
              </p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-blue-600" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
              </svg>
            </div>
          </div>
        </div>

        {/* Total Feedbacks */}
        <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Feedbacks</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">
                {badgeStats.total_feedbacks}
              </p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-green-600" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"></path>
              </svg>
            </div>
          </div>
        </div>

        {/* Average NPS */}
        <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Average NPS</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">
                {badgeStats.avg_nps.toFixed(1)}
              </p>
            </div>
            <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
              badgeStats.avg_nps >= 9 ? 'bg-green-100' :
              badgeStats.avg_nps >= 7 ? 'bg-yellow-100' : 'bg-red-100'
            }`}>
              <svg className={`w-6 h-6 ${
                badgeStats.avg_nps >= 9 ? 'text-green-600' :
                badgeStats.avg_nps >= 7 ? 'text-yellow-600' : 'text-red-600'
              }`} fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"></path>
              </svg>
            </div>
          </div>
        </div>

        {/* Last Feedback */}
        <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Last Feedback</p>
              <p className="text-lg font-semibold text-gray-900 mt-2">
                {badgeStats.last_feedback_date
                  ? timeAgo(badgeStats.last_feedback_date)
                  : 'No feedbacks yet'}
              </p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-purple-600" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Projects */}
        <div className="bg-white rounded-lg shadow border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">Recent Projects</h2>
            <Link
              href={ROUTES.PROJECTS}
              className="text-sm text-primary hover:text-primary/80 font-medium"
            >
              View all →
            </Link>
          </div>
          <div className="p-6">
            {projectsData.projects.length > 0 ? (
              <div className="space-y-4">
                {projectsData.projects.map((project) => (
                  <div key={project.id} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
                    <div>
                      <h3 className="font-medium text-gray-900">{project.name}</h3>
                      <p className="text-sm text-gray-500">{project.client_name}</p>
                    </div>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      project.status === 'delivered' ? 'bg-green-100 text-green-800' :
                      project.status === 'in_progress' ? 'bg-blue-100 text-blue-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {project.status.replace('_', ' ')}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500 mb-4">No projects yet</p>
                <Link
                  href={ROUTES.PROJECTS}
                  className="inline-flex items-center px-4 py-2 bg-emerald-500 text-white rounded-md hover:bg-emerald-600 font-medium"
                >
                  Create your first project
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Recent Feedbacks */}
        <div className="bg-white rounded-lg shadow border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">Recent Feedbacks</h2>
            <Link
              href={ROUTES.FEEDBACKS}
              className="text-sm text-primary hover:text-primary/80 font-medium"
            >
              View all →
            </Link>
          </div>
          <div className="p-6">
            {feedbacksData.feedbacks.length > 0 ? (
              <div className="space-y-4">
                {feedbacksData.feedbacks.map((feedback) => (
                  <div key={feedback.id} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
                    <div>
                      <h3 className="font-medium text-gray-900">{feedback.client_name}</h3>
                      <p className="text-sm text-gray-500 line-clamp-1">{feedback.comment || 'No comment'}</p>
                    </div>
                    <span className={`px-3 py-1 text-sm font-bold rounded-full ${
                      feedback.nps_score >= 9 ? 'bg-green-100 text-green-800' :
                      feedback.nps_score >= 7 ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {feedback.nps_score}/10
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500">No feedbacks yet</p>
                <p className="text-sm text-gray-400 mt-2">
                  Feedbacks will appear here once clients respond
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
