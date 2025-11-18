'use client';

import { useState, useEffect } from 'react';
import { formatDate } from '@/lib/utils';
import { NewProjectModal } from '@/components/projects/new-project-modal';
import { EditProjectModal } from '@/components/projects/edit-project-modal';
import { DeleteProjectDialog } from '@/components/projects/delete-project-dialog';
import type { Project } from '@/types/database';

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>('all');
  const [isNewModalOpen, setIsNewModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [deletingProject, setDeletingProject] = useState<Project | null>(null);

  useEffect(() => {
    fetchProjects();
  }, [filter]);

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const url = filter === 'all'
        ? '/api/projects'
        : `/api/projects?status=${filter}`;

      const response = await fetch(url);
      const data = await response.json();

      if (data.success) {
        setProjects(data.data.projects);
      }
    } catch (error) {
      console.error('Failed to fetch projects:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleModalClose = () => {
    setIsNewModalOpen(false);
    setEditingProject(null);
    setDeletingProject(null);
    fetchProjects();
  };

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Projects</h1>
        <button
          onClick={() => setIsNewModalOpen(true)}
          className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 font-medium"
        >
          + New Project
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow mb-6 p-4">
        <div className="flex space-x-2">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-md font-medium ${
              filter === 'all'
                ? 'bg-primary text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilter('in_progress')}
            className={`px-4 py-2 rounded-md font-medium ${
              filter === 'in_progress'
                ? 'bg-primary text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            In Progress
          </button>
          <button
            onClick={() => setFilter('delivered')}
            className={`px-4 py-2 rounded-md font-medium ${
              filter === 'delivered'
                ? 'bg-primary text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Delivered
          </button>
          <button
            onClick={() => setFilter('archived')}
            className={`px-4 py-2 rounded-md font-medium ${
              filter === 'archived'
                ? 'bg-primary text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Archived
          </button>
        </div>
      </div>

      {/* Projects Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-gray-500">Loading...</div>
        ) : projects.length === 0 ? (
          <div className="p-8 text-center">
            <p className="text-gray-500 mb-4">No projects found</p>
            <button
              onClick={() => setIsNewModalOpen(true)}
              className="text-primary hover:underline font-medium"
            >
              Create your first project
            </button>
          </div>
        ) : (
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Project
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Client
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Delivery Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Feedback
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {projects.map((project) => (
                <tr key={project.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div>
                      <div className="font-medium text-gray-900">{project.name}</div>
                      {project.description && (
                        <div className="text-sm text-gray-500 line-clamp-1">
                          {project.description}
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">{project.client_name}</div>
                    {project.client_email && (
                      <div className="text-sm text-gray-500">{project.client_email}</div>
                    )}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {formatDate(project.delivery_date)}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded-full ${
                        project.status === 'delivered'
                          ? 'bg-green-100 text-green-800'
                          : project.status === 'in_progress'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {project.status.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded-full ${
                        project.feedback_status === 'received'
                          ? 'bg-green-100 text-green-800'
                          : project.feedback_status === 'sent'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {project.feedback_status.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right text-sm space-x-2">
                    <button
                      onClick={() => setEditingProject(project)}
                      className="text-primary hover:text-primary/80 font-medium"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => setDeletingProject(project)}
                      className="text-red-600 hover:text-red-800 font-medium"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Modals */}
      <NewProjectModal
        isOpen={isNewModalOpen}
        onClose={handleModalClose}
      />

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
    </div>
  );
}
