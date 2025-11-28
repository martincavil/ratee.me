import { LandingNavbar } from '@/components/landing/navbar';
import { Hero } from '@/components/landing/hero';
import { PainPoints } from '@/components/landing/pain-points';
import { Problem } from '@/components/landing/problem';
import { Timeline } from '@/components/landing/timeline';
import { Testimonials } from '@/components/landing/testimonials';
import { Pricing } from '@/components/landing/pricing';
import { FAQ } from '@/components/landing/faq';
import { CTAFinal } from '@/components/landing/cta-final';
import { Footer } from '@/components/landing/footer';
import { LanguageProvider } from '@/lib/i18n';
import { generateMetadata, jsonLd } from '@/lib/seo';
import { Metadata } from 'next';

// Métadonnées SEO optimisées pour la page d'accueil (français prioritaire)
export const metadata: Metadata = {
  ...generateMetadata('fr'),
  title: 'ratee.me - Automatise ton feedback client et NPS en pilote automatique',
  description: 'Collecte automatiquement les feedbacks NPS de tes clients, obtiens des témoignages authentiques et affiche ton badge de satisfaction client. Solution tout-en-un pour freelances et agences.',
  openGraph: {
    ...generateMetadata('fr').openGraph,
    title: 'ratee.me - Automatise ton feedback client et NPS en pilote automatique',
    description: 'Collecte automatiquement les feedbacks NPS de tes clients, obtiens des témoignages authentiques et affiche ton badge de satisfaction client.',
  },
  twitter: {
    ...generateMetadata('fr').twitter,
    title: 'ratee.me - Automatise ton feedback client',
    description: 'Collecte automatiquement les feedbacks NPS de tes clients. Feedbacks, témoignages, badge NPS. Tout en pilote automatique.',
  },
};

export default function HomePage() {
  return (
    <LanguageProvider>
      <div className="min-h-screen bg-white">
        {/* JSON-LD pour le SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd.fr) }}
        />
        <LandingNavbar />
        <Hero />
        <PainPoints />
        <Problem />
        <Timeline />
        <Testimonials />
        <Pricing />
        <FAQ />
        <CTAFinal />
        <Footer />
      </div>
    </LanguageProvider>
  );
}
