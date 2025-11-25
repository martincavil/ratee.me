"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { ROUTES } from "@/lib/constants";
import { timeAgo } from "@/lib/utils";
import { useLanguage } from "@/lib/i18n";
import { Spinner } from "@/components/ui/spinner";
import type { Project, Feedback } from "@/types/database";

interface BadgeStats {
  avg_nps: number;
  total_feedbacks: number;
  last_feedback_date: string | null;
}

interface Subscription {
  plan: string;
  trial_until: string | null;
}

interface UserProfile {
  name: string;
}

export default function DashboardPage() {
  const { text } = useLanguage();
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [totalProjects, setTotalProjects] = useState(0);
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [badgeStats, setBadgeStats] = useState<BadgeStats>({
    avg_nps: 0,
    total_feedbacks: 0,
    last_feedback_date: null,
  });
  const [subscription, setSubscription] = useState<Subscription | null>(null);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const [userRes, projectsRes, feedbacksRes, badgeRes, subRes] =
        await Promise.all([
          fetch("/api/auth/me"),
          fetch("/api/projects?limit=5"),
          fetch("/api/feedbacks?limit=5"),
          fetch("/api/badge/stats"),
          fetch("/api/subscriptions"),
        ]);

      const userData = await userRes.json();
      if (userData.success && userData.data.user) {
        setProfile({ name: userData.data.user.name });
      }

      const projectsData = await projectsRes.json();
      if (projectsData.success) {
        setProjects(projectsData.data.projects || []);
        setTotalProjects(projectsData.data.total || 0);
      }

      const feedbacksData = await feedbacksRes.json();
      if (feedbacksData.success) {
        setFeedbacks(feedbacksData.data.feedbacks || []);
      }

      const badgeData = await badgeRes.json();
      if (badgeData.success && badgeData.data.stats) {
        setBadgeStats(badgeData.data.stats);
      }

      const subData = await subRes.json();
      if (subData.success && subData.data) {
        setSubscription(subData.data);
      }
    } catch (error) {
      console.error("Failed to fetch dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Spinner className="w-8 h-8 text-emerald" />
      </div>
    );
  }

  const isOnTrial =
    subscription?.trial_until &&
    new Date(subscription.trial_until) > new Date();
  const daysLeft = isOnTrial
    ? Math.ceil(
        (new Date(subscription.trial_until!).getTime() - new Date().getTime()) /
          (1000 * 60 * 60 * 24)
      )
    : 0;

  const showFreeBanner = !subscription || subscription.plan === "free";
  const showTrialBanner = isOnTrial;
  const showProBanner = subscription?.plan === "pro" && !isOnTrial;

  return (
    <div>
      {/* Free Plan Banner */}
      {showFreeBanner && (
        <div className="bg-emerald-50 border border-emerald-500 rounded-lg p-4 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-lg">📦</span>
              <div>
                <p className="font-inter text-black! font-medium text-sm">
                  {text.dashboard.banners.free.title}
                </p>
                <p className="font-inter text-gray-600! text-xs">
                  {text.dashboard.banners.free.description}
                </p>
              </div>
            </div>
            <a
              href="/pricing/"
              className="px-4 py-2 bg-emerald text-white text-sm font-inter font-medium rounded-lg hover:bg-emerald-dark transition-colors cursor-pointer"
            >
              {text.dashboard.banners.free.action}
            </a>
          </div>
        </div>
      )}

      {/* Trial Banner */}
      {showTrialBanner && (
        <div className="bg-emerald-light border border-emerald/20 rounded-lg p-4 mb-6">
          <div className="flex items-center gap-3">
            <span className="text-lg">✨</span>
            <div>
              <p className="font-inter text-emerald-dark font-medium text-sm">
                {text.dashboard.banners.trial.title} - {daysLeft}{" "}
                {text.dashboard.banners.trial.daysLeft}
              </p>
              <p className="font-inter text-emerald-dark text-xs">
                {text.dashboard.banners.trial.description}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Active PRO Banner */}
      {showProBanner && (
        <div className="bg-emerald-light border border-emerald/20 rounded-lg p-4 mb-6">
          <div className="flex items-center gap-3">
            <span className="text-lg">✅</span>
            <div>
              <p className="font-inter text-emerald-dark font-medium text-sm">
                {text.dashboard.banners.pro.title}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Welcome Header */}
      <div className="mb-8">
        <h1 className="font-sora text-xl! font-bold text-content-primary">
          {text.dashboard.welcome}, {profile?.name}! 👋
        </h1>
        <p className="font-inter text-content-secondary mt-2 text-sm">
          {text.dashboard.subtitle}
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {/* Total Projects */}
        <div className="bg-white rounded-lg border border-border p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-content-secondary">
                {text.dashboard.stats.totalProjects}
              </p>
              <p className="text-2xl font-bold text-emerald mt-2">
                {totalProjects}
              </p>
            </div>
            <div className="w-10 h-10 bg-emerald-light rounded-lg flex items-center justify-center">
              <svg
                className="w-5 h-5 text-emerald"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
              </svg>
            </div>
          </div>
        </div>

        {/* Total Feedbacks */}
        <div className="bg-white rounded-lg border border-border p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-content-secondary">
                {text.dashboard.stats.totalFeedbacks}
              </p>
              <p className="text-2xl font-bold text-emerald mt-2">
                {badgeStats.total_feedbacks}
              </p>
            </div>
            <div className="w-10 h-10 bg-emerald-light rounded-lg flex items-center justify-center">
              <svg
                className="w-5 h-5 text-emerald"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"></path>
              </svg>
            </div>
          </div>
        </div>

        {/* Average NPS */}
        <div className="bg-white rounded-lg border border-border p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-content-secondary">
                {text.dashboard.stats.avgNPS}
              </p>
              <p className="text-2xl font-bold text-emerald mt-2">
                {badgeStats.avg_nps.toFixed(1)}
              </p>
            </div>
            <div
              className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                badgeStats.avg_nps >= 9
                  ? "bg-emerald-light"
                  : badgeStats.avg_nps >= 7
                  ? "bg-warning-light"
                  : "bg-error-light"
              }`}
            >
              <svg
                className={`w-5 h-5 ${
                  badgeStats.avg_nps >= 9
                    ? "text-emerald"
                    : badgeStats.avg_nps >= 7
                    ? "text-warning"
                    : "text-error"
                }`}
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"></path>
              </svg>
            </div>
          </div>
        </div>

        {/* Last Feedback */}
        <div className="bg-white rounded-lg border border-border p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-content-secondary">
                {text.dashboard.stats.lastFeedback}
              </p>
              <p className="text-base font-semibold text-content-primary mt-2">
                {badgeStats.last_feedback_date
                  ? timeAgo(badgeStats.last_feedback_date)
                  : text.dashboard.stats.noFeedbackYet}
              </p>
            </div>
            <div className="w-10 h-10 bg-emerald-light rounded-lg flex items-center justify-center">
              <svg
                className="w-5 h-5 text-emerald"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Recent Projects */}
        <div className="bg-white rounded-lg border border-border">
          <div className="px-5 py-4 border-b border-border flex items-center justify-between">
            <h2 className="text-xl! font-semibold text-content-primary font-sora">
              {text.dashboard.recentProjects.title}
            </h2>
            <Link
              href={ROUTES.PROJECTS}
              className="text-sm text-emerald hover:text-emerald-dark font-medium cursor-pointer"
            >
              {text.dashboard.recentProjects.viewAll} →
            </Link>
          </div>
          <div className="p-5">
            {projects.length > 0 ? (
              <div className="space-y-3">
                {projects.map((project) => (
                  <div
                    key={project.id}
                    className="flex items-center justify-between py-2 border-b border-border last:border-0"
                  >
                    <div>
                      <h3 className="font-medium text-content-primary text-sm!">
                        {project.name}
                      </h3>
                      <p className="text-xs text-content-secondary">
                        {project.client_name}
                      </p>
                    </div>
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded-full ${
                        project.status === "delivered"
                          ? "bg-emerald-light text-emerald-dark"
                          : project.status === "in_progress"
                          ? "bg-info-light text-info"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {project.status === "delivered"
                        ? text.dashboard.recentProjects.status.delivered
                        : project.status === "in_progress"
                        ? text.dashboard.recentProjects.status.inProgress
                        : text.dashboard.recentProjects.status.archived}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-content-secondary text-sm mb-4">
                  {text.dashboard.recentProjects.empty}
                </p>
                <Link
                  href={ROUTES.PROJECTS}
                  className="inline-flex items-center px-4 py-2 bg-emerald text-white rounded-md hover:bg-emerald-dark font-medium text-sm transition-colors cursor-pointer"
                >
                  {text.dashboard.recentProjects.createFirst}
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Recent Feedbacks */}
        <div className="bg-white rounded-lg border border-border">
          <div className="px-5 py-4 border-b border-border flex items-center justify-between">
            <h2 className="text-xl! font-semibold text-content-primary font-sora">
              {text.dashboard.recentFeedbacks.title}
            </h2>
            <Link
              href={ROUTES.FEEDBACKS}
              className="text-sm text-emerald hover:text-emerald-dark font-medium cursor-pointer"
            >
              {text.dashboard.recentFeedbacks.viewAll} →
            </Link>
          </div>
          <div className="p-5">
            {feedbacks.length > 0 ? (
              <div className="space-y-3">
                {feedbacks.map((feedback) => (
                  <div
                    key={feedback.id}
                    className="flex items-center justify-between py-2 border-b border-border last:border-0"
                  >
                    <div className="flex-1 min-w-0 mr-3">
                      <h3 className="font-medium text-content-primary text-sm!">
                        {feedback.client_name}
                      </h3>
                      <p className="text-xs text-content-secondary line-clamp-1">
                        {feedback.comment ||
                          text.dashboard.recentFeedbacks.noComment}
                      </p>
                    </div>
                    <span
                      className={`px-2 py-1 text-xs font-bold rounded-full whitespace-nowrap ${
                        feedback.nps_score >= 9
                          ? "bg-emerald-light text-emerald-dark"
                          : feedback.nps_score >= 7
                          ? "bg-warning-light text-warning"
                          : "bg-error-light text-error"
                      }`}
                    >
                      {feedback.nps_score}/10
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-content-secondary text-sm">
                  {text.dashboard.recentFeedbacks.empty}
                </p>
                <p className="text-xs text-content-tertiary mt-2">
                  {text.dashboard.recentFeedbacks.emptyDescription}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
