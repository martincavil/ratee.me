import { LandingNavbar } from '@/components/landing/navbar';
import { Hero } from '@/components/landing/hero';
import { Problem } from '@/components/landing/problem';
import { Solution } from '@/components/landing/solution';
import { Features } from '@/components/landing/features';
import { Results } from '@/components/landing/results';
import { Testimonials } from '@/components/landing/testimonials';
import { HowItWorks } from '@/components/landing/how-it-works';
import { Pricing } from '@/components/landing/pricing';
import { FAQ } from '@/components/landing/faq';
import { CTAFinal } from '@/components/landing/cta-final';
import { Footer } from '@/components/landing/footer';
import { LanguageProvider } from '@/lib/i18n';

export const metadata = {
  title: 'ratee.me - Automatise ton feedback client | Automate client feedback',
  description: 'Automatise la collecte de feedbacks NPS de tes clients. Feedbacks, citations, badge NPS. Tout en pilote automatique.',
  openGraph: {
    title: 'ratee.me - Automatise ton feedback client',
    description: 'Automatise la collecte de feedbacks NPS de tes clients. Feedbacks, citations, badge NPS. Tout en pilote automatique.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ratee.me - Automatise ton feedback client',
    description: 'Automatise la collecte de feedbacks NPS de tes clients.',
  },
};

export default function HomePage() {
  return (
    <LanguageProvider>
      <div className="min-h-screen bg-white">
        <LandingNavbar />
        <Hero />
        <Problem />
        <Solution />
        <Features />
        <Results />
        <Testimonials />
        <HowItWorks />
        <Pricing />
        <FAQ />
        <CTAFinal />
        <Footer />
      </div>
    </LanguageProvider>
  );
}
