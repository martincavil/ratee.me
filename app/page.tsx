import { redirect } from 'next/navigation';
import { ROUTES } from '@/lib/constants';

export default function HomePage() {
  // Redirect to dashboard (will be protected by auth later)
  redirect(ROUTES.DASHBOARD);
}
