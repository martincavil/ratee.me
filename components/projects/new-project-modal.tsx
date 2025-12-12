'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createProjectSchema, type CreateProjectInput } from '@/lib/validators';
import { useLanguage } from '@/lib/i18n';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface NewProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function NewProjectModal({ isOpen, onClose }: NewProjectModalProps) {
  const router = useRouter();
  const { text } = useLanguage();
  const [formData, setFormData] = useState<CreateProjectInput>({
    name: '',
    client_name: '',
    client_email: '',
    description: '',
    delivery_date: '',
  });
  const [errors, setErrors] = useState<Partial<Record<keyof CreateProjectInput, string>>>({});
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof CreateProjectInput]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setApiError(null);

    const result = createProjectSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: Partial<Record<keyof CreateProjectInput, string>> = {};
      result.error.issues.forEach((err) => {
        if (err.path[0]) {
          fieldErrors[err.path[0] as keyof CreateProjectInput] = err.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!data.success) {
        setApiError(data.error || text.projects.modal.errors.failed);
        return;
      }

      onClose();
      router.refresh();
      setFormData({
        name: '',
        client_name: '',
        client_email: '',
        description: '',
        delivery_date: '',
      });
    } catch {
      setApiError(text.projects.modal.errors.unexpected);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>{text.projects.modal.title}</DialogTitle>
          <DialogDescription>
            {text.projects.modal.description}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">{text.projects.modal.fields.nameRequired}</Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder={text.projects.modal.fields.namePlaceholder}
              className={errors.name ? 'border-red-500' : ''}
            />
            {errors.name && <p className="text-sm text-red-600">{errors.name}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="client_name">{text.projects.modal.fields.clientNameRequired}</Label>
            <Input
              id="client_name"
              name="client_name"
              value={formData.client_name}
              onChange={handleChange}
              placeholder={text.projects.modal.fields.clientNamePlaceholder}
              className={errors.client_name ? 'border-red-500' : ''}
            />
            {errors.client_name && <p className="text-sm text-red-600">{errors.client_name}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="client_email">{text.projects.modal.fields.clientEmail}</Label>
            <Input
              type="email"
              id="client_email"
              name="client_email"
              value={formData.client_email}
              onChange={handleChange}
              placeholder={text.projects.modal.fields.clientEmailPlaceholder}
              className={errors.client_email ? 'border-red-500' : ''}
            />
            {errors.client_email && <p className="text-sm text-red-600">{errors.client_email}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">{text.projects.modal.fields.description}</Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={3}
              placeholder={text.projects.modal.fields.descriptionPlaceholder}
              className={errors.description ? 'border-red-500' : ''}
            />
            {errors.description && <p className="text-sm text-red-600">{errors.description}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="delivery_date">{text.projects.modal.fields.deliveryDateRequired}</Label>
            <Input
              type="date"
              id="delivery_date"
              name="delivery_date"
              value={formData.delivery_date}
              onChange={handleChange}
              className={errors.delivery_date ? 'border-red-500' : ''}
            />
            {errors.delivery_date && <p className="text-sm text-red-600">{errors.delivery_date}</p>}
          </div>

          {apiError && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-md">
              <p className="text-sm text-red-600">{apiError}</p>
            </div>
          )}

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              {text.projects.modal.buttons.cancel}
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? text.projects.modal.buttons.creating : text.projects.modal.buttons.create}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
