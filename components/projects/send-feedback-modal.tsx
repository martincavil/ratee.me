'use client';

import { useState } from 'react';
import type { Project } from '@/types/database';

interface SendFeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: Project;
  onSuccess: () => void;
}

export function SendFeedbackModal({ isOpen, onClose, project, onSuccess }: SendFeedbackModalProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSend = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/projects/${project.id}/send-feedback`, {
        method: 'POST',
      });

      const data = await response.json();

      if (!data.success) {
        setError(data.error || 'Failed to send feedback request');
        return;
      }

      setSuccess(true);
    } catch {
      setError('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    if (success) {
      onSuccess();
    }
    setSuccess(false);
    setError(null);
    onClose();
  };

  // Success state
  if (success) {
    return (
      <div
        className="fixed inset-0 bg-white/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
        onClick={handleClose}
      >
        <div
          className="bg-white rounded-xl max-w-md w-full p-6 text-center shadow-xl"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="w-16 h-16 bg-accent-light rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>

          <h2 className="font-sora text-xl font-bold text-content-primary mb-2">
            Email envoyé !
          </h2>

          <p className="font-inter text-content-secondary mb-6">
            La demande de feedback a été envoyée à <span className="font-medium text-content-primary">{project.client_email}</span>
          </p>

          <button
            onClick={handleClose}
            className="w-full px-4 py-3 bg-accent text-white rounded-lg font-inter font-semibold hover:bg-accent-dark transition-colors"
          >
            Fermer
          </button>
        </div>
      </div>
    );
  }

  // Confirmation state
  return (
    <div
      className="fixed inset-0 bg-white/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={handleClose}
    >
      <div
        className="bg-white rounded-xl max-w-md w-full p-6 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-12 h-12 bg-accent-light rounded-full flex items-center justify-center mb-4">
          <svg className="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </div>

        <h2 className="font-sora text-xl font-bold text-content-primary mb-2">
          Envoyer la demande de feedback ?
        </h2>

        <p className="font-inter text-content-secondary mb-4">
          Un email sera envoyé au client pour demander son avis sur le projet.
        </p>

        <div className="bg-bg-secondary rounded-lg p-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
              <span className="font-sora font-bold text-accent">
                {project.client_name.charAt(0).toUpperCase()}
              </span>
            </div>
            <div>
              <p className="font-inter font-medium text-content-primary">{project.client_name}</p>
              <p className="font-inter text-sm text-content-secondary">{project.client_email}</p>
            </div>
          </div>
          <div className="mt-3 pt-3 border-t border-border">
            <p className="font-inter text-sm text-content-tertiary">Projet</p>
            <p className="font-inter font-medium text-content-primary">{project.name}</p>
          </div>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="font-inter text-sm text-red-600">{error}</p>
          </div>
        )}

        <div className="flex gap-3">
          <button
            type="button"
            onClick={handleClose}
            disabled={loading}
            className="flex-1 px-4 py-3 border border-border rounded-lg font-inter font-medium text-content-primary hover:bg-bg-secondary transition-colors disabled:opacity-50"
          >
            Annuler
          </button>
          <button
            type="button"
            onClick={handleSend}
            disabled={loading}
            className="flex-1 px-4 py-3 bg-accent text-white rounded-lg font-inter font-semibold hover:bg-accent-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Envoi...' : 'Envoyer'}
          </button>
        </div>
      </div>
    </div>
  );
}
