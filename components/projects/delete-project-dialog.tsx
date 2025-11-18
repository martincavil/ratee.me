'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import type { Project } from '@/types/database';

interface DeleteProjectDialogProps {
  isOpen: boolean;
  onClose: () => void;
  project: Project;
}

export function DeleteProjectDialog({ isOpen, onClose, project }: DeleteProjectDialogProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleDelete = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/projects/${project.id}`, {
        method: 'DELETE',
      });

      const data = await response.json();

      if (!data.success) {
        setError(data.error || 'Failed to delete project');
        return;
      }

      onClose();
      router.refresh();
    } catch (error) {
      setError('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-md w-full p-6">
        <h2 className="text-xl font-bold mb-4">Delete Project</h2>

        <p className="text-gray-600 mb-2">
          Are you sure you want to delete this project?
        </p>

        <div className="bg-gray-50 border border-gray-200 rounded-md p-3 mb-4">
          <p className="font-medium text-gray-900">{project.name}</p>
          <p className="text-sm text-gray-500">{project.client_name}</p>
        </div>

        <p className="text-sm text-red-600 mb-6">
          This action cannot be undone. All associated feedbacks will also be deleted.
        </p>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}

        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 font-medium disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleDelete}
            disabled={loading}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
          >
            {loading ? 'Deleting...' : 'Delete Project'}
          </button>
        </div>
      </div>
    </div>
  );
}
