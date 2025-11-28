import { LanguageProvider } from '@/lib/i18n';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Tarifs - Automatise ton feedback client | ratee.me',
  description: 'Tarifs simples et transparents pour freelances et agences. Plan gratuit pour commencer, formules adaptées à tous les besoins. Collecte automatique de feedbacks NPS.',
  keywords: [
    'tarifs NPS',
    'prix feedback client',
    'abonnement feedback',
    'plan gratuit',
    'tarifs freelance',
    'tarifs agence',
    'pricing NPS',
  ],
  openGraph: {
    title: 'Tarifs - Automatise ton feedback client | ratee.me',
    description: 'Tarifs simples et transparents pour freelances et agences. Plan gratuit pour commencer.',
    type: 'website',
    url: 'https://ratee.me/pricing',
    images: [
      {
        url: 'https://ratee.me/og-image.png',
        width: 1200,
        height: 630,
        alt: 'ratee.me - Tarifs',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tarifs - ratee.me',
    description: 'Tarifs simples pour freelances et agences. Plan gratuit disponible.',
  },
  alternates: {
    canonical: 'https://ratee.me/pricing',
  },
};

export default function PricingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <LanguageProvider>{children}</LanguageProvider>;
}
