"use client";

import { useState, useEffect } from "react";
import { formatDate } from "@/lib/utils";
import { useLanguage } from "@/lib/i18n";
import { NewProjectModal } from "@/components/projects/new-project-modal";
import { EditProjectModal } from "@/components/projects/edit-project-modal";
import { DeleteProjectDialog } from "@/components/projects/delete-project-dialog";
import { SendFeedbackModal } from "@/components/projects/send-feedback-modal";
import { Spinner } from "@/components/ui/spinner";
import type { Project } from "@/types/database";

export default function ProjectsPage() {
  const { text } = useLanguage();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>("all");
  const [isNewModalOpen, setIsNewModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [deletingProject, setDeletingProject] = useState<Project | null>(null);
  const [feedbackProject, setFeedbackProject] = useState<Project | null>(null);

  useEffect(() => {
    fetchProjects();
  }, [filter]);

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const url =
        filter === "all" ? "/api/projects" : `/api/projects?status=${filter}`;

      const response = await fetch(url);
      const data = await response.json();

      if (data.success) {
        setProjects(data.data.projects);
      }
    } catch (error) {
      console.error("Failed to fetch projects:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleModalClose = () => {
    setIsNewModalOpen(false);
    setEditingProject(null);
    setDeletingProject(null);
    setFeedbackProject(null);
    fetchProjects();
  };

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl! font-bold text-content-primary font-sora">
          {text.projects.title}
        </h1>
        <button
          onClick={() => setIsNewModalOpen(true)}
          className="px-4 py-2 bg-emerald text-white rounded-md hover:bg-emerald-dark font-medium text-sm transition-colors"
        >
          + {text.projects.newProject}
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg border border-border mb-6 p-4">
        <div className="flex space-x-2">
          <button
            onClick={() => setFilter("all")}
            className={`px-3 py-2 rounded-md font-medium text-sm transition-colors ${
              filter === "all"
                ? "bg-emerald text-white"
                : "bg-bg-secondary text-content-secondary hover:bg-border"
            }`}
          >
            {text.projects.filters.all}
          </button>
          <button
            onClick={() => setFilter("in_progress")}
            className={`px-3 py-2 rounded-md font-medium text-sm transition-colors ${
              filter === "in_progress"
                ? "bg-emerald text-white"
                : "bg-bg-secondary text-content-secondary hover:bg-border"
            }`}
          >
            {text.projects.filters.inProgress}
          </button>
          <button
            onClick={() => setFilter("delivered")}
            className={`px-3 py-2 rounded-md font-medium text-sm transition-colors ${
              filter === "delivered"
                ? "bg-emerald text-white"
                : "bg-bg-secondary text-content-secondary hover:bg-border"
            }`}
          >
            {text.projects.filters.delivered}
          </button>
          <button
            onClick={() => setFilter("archived")}
            className={`px-3 py-2 rounded-md font-medium text-sm transition-colors ${
              filter === "archived"
                ? "bg-emerald text-white"
                : "bg-bg-secondary text-content-secondary hover:bg-border"
            }`}
          >
            {text.projects.filters.archived}
          </button>
        </div>
      </div>

      {/* Projects Table */}
      <div className="bg-white rounded-lg border border-border overflow-hidden">
        {loading ? (
          <div className="p-8 flex justify-center">
            <Spinner className="w-8 h-8 text-emerald" />
          </div>
        ) : projects.length === 0 ? (
          <div className="p-8 text-center">
            <p className="text-content-secondary text-sm mb-4">
              {text.projects.table.empty}
            </p>
            <button
              onClick={() => setIsNewModalOpen(true)}
              className="text-emerald hover:text-emerald-dark font-medium text-sm"
            >
              {text.projects.table.createFirst}
            </button>
          </div>
        ) : (
          <table className="w-full">
            <thead className="bg-bg-secondary border-b border-border">
              <tr>
                <th className="px-5 py-3 text-left text-xs font-medium text-content-secondary">
                  {text.projects.table.headers.project}
                </th>
                <th className="px-5 py-3 text-left text-xs font-medium text-content-secondary">
                  {text.projects.table.headers.client}
                </th>
                <th className="px-5 py-3 text-left text-xs font-medium text-content-secondary">
                  {text.projects.table.headers.deliveryDate}
                </th>
                <th className="px-5 py-3 text-left text-xs font-medium text-content-secondary">
                  {text.projects.table.headers.status}
                </th>
                <th className="px-5 py-3 text-left text-xs font-medium text-content-secondary">
                  {text.projects.table.headers.feedback}
                </th>
                <th className="px-5 py-3 text-right text-xs font-medium text-content-secondary">
                  {text.projects.table.headers.actions}
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-border">
              {projects.map((project) => (
                <tr
                  key={project.id}
                  className="hover:bg-bg-secondary transition-colors"
                >
                  <td className="px-5 py-4">
                    <div>
                      <div className="font-medium text-content-primary text-sm!">
                        {project.name}
                      </div>
                      {project.description && (
                        <div className="text-xs text-content-secondary line-clamp-1">
                          {project.description}
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <div className="text-sm text-content-primary">
                      {project.client_name}
                    </div>
                    {project.client_email && (
                      <div className="text-xs text-content-secondary">
                        {project.client_email}
                      </div>
                    )}
                  </td>
                  <td className="px-5 py-4 text-sm text-content-primary">
                    {formatDate(project.delivery_date)}
                  </td>
                  <td className="px-5 py-4">
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
                        ? text.projects.table.status.delivered
                        : project.status === "in_progress"
                        ? text.projects.table.status.inProgress
                        : text.projects.table.status.archived}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded-full ${
                        project.feedback_status === "received"
                          ? "bg-emerald-light text-emerald-dark"
                          : project.feedback_status === "sent"
                          ? "bg-warning-light text-warning"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {project.feedback_status === "received"
                        ? text.projects.table.feedbackStatus.received
                        : project.feedback_status === "sent"
                        ? text.projects.table.feedbackStatus.sent
                        : text.projects.table.feedbackStatus.notSent}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-right text-xs space-x-2">
                    {project.feedback_status !== "received" &&
                      project.client_email && (
                        <button
                          onClick={() => setFeedbackProject(project)}
                          className="text-emerald hover:text-emerald-dark font-medium cursor-pointer"
                        >
                          {project.feedback_status === "sent"
                            ? "Renvoyer"
                            : text.projects.table.actions.send}
                        </button>
                      )}
                    <button
                      onClick={() => setEditingProject(project)}
                      className="text-emerald hover:text-emerald-dark font-medium cursor-pointer"
                    >
                      {text.projects.table.actions.edit}
                    </button>
                    <button
                      onClick={() => setDeletingProject(project)}
                      className="text-error hover:text-error/80 font-medium cursor-pointer"
                    >
                      {text.projects.table.actions.delete}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Modals */}
      <NewProjectModal isOpen={isNewModalOpen} onClose={handleModalClose} />

      {editingProject && (
        <EditProjectModal
          isOpen={true}
          onClose={handleModalClose}
          project={editingProject}
        />
      )}

      {deletingProject && (
        <DeleteProjectDialog
          isOpen={true}
          onClose={handleModalClose}
          project={deletingProject}
        />
      )}

      {feedbackProject && (
        <SendFeedbackModal
          isOpen={true}
          onClose={handleModalClose}
          project={feedbackProject}
          onSuccess={fetchProjects}
        />
      )}
    </div>
  );
}
