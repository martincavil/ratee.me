import { LanguageProvider } from '@/lib/i18n';

export const metadata = {
  title: 'Pricing - ratee.me',
  description: 'Simple pricing for freelancers and agencies. Choose the plan that fits your needs.',
};

export default function PricingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <LanguageProvider>{children}</LanguageProvider>;
}
