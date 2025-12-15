import { LandingNavbar } from "@/components/landing/navbar";
import { Hero } from "@/components/landing/hero";
import { PainPoints } from "@/components/landing/pain-points";
import { Problem } from "@/components/landing/problem";
import { Timeline } from "@/components/landing/timeline";
// import { Testimonials } from '@/components/landing/testimonials';
import { Pricing } from "@/components/landing/pricing";
import { FAQ } from "@/components/landing/faq";
import { CTAFinal } from "@/components/landing/cta-final";
import { Footer } from "@/components/landing/footer";
import { LanguageProvider } from "@/lib/i18n";
import { generateMetadata, jsonLd, faqSchema } from "@/lib/seo";
import { Metadata } from "next";
import Script from "next/script";

// Métadonnées SEO optimisées pour la page d'accueil (français prioritaire)
export const metadata: Metadata = {
  ...generateMetadata("fr"),
  title:
    "ratee.me - Automatise ton feedback client et NPS en pilote automatique",
  description:
    "Collecte automatiquement les feedbacks NPS de tes clients, obtiens des témoignages authentiques et affiche ton badge de satisfaction client. Solution tout-en-un pour freelances et agences. Démarrez gratuitement en 2 minutes.",
  keywords: [
    "feedback client automatique",
    "NPS automation",
    "témoignages clients",
    "satisfaction client",
    "freelance feedback",
    "agence satisfaction client",
    "avis clients automatiques",
    "Net Promoter Score",
    "badge NPS",
    "preuve sociale",
    "automation marketing",
    "feedback automation",
    "collecte avis automatique",
    "gestion feedback client",
    "score satisfaction client",
    "retour client automatisé",
    "outil feedback freelance",
    "logiciel NPS gratuit",
    "plateforme feedback client",
    "widget NPS",
  ],
  openGraph: {
    ...generateMetadata("fr").openGraph,
    title:
      "ratee.me - Automatise ton feedback client et NPS en pilote automatique",
    description:
      "Collecte automatiquement les feedbacks NPS de tes clients, obtiens des témoignages authentiques et affiche ton badge de satisfaction client. Démarrez gratuitement.",
    type: "website",
  },
  twitter: {
    ...generateMetadata("fr").twitter,
    title: "ratee.me - Automatise ton feedback client",
    description:
      "Collecte automatiquement les feedbacks NPS de tes clients. Feedbacks, témoignages, badge NPS. Tout en pilote automatique. Gratuit.",
    card: "summary_large_image",
  },
  alternates: {
    canonical: "https://ratee.me",
    languages: {
      "fr-FR": "https://ratee.me",
      "en-US": "https://ratee.me/en",
    },
  },
};

export default function HomePage() {
  return (
    <LanguageProvider>
      <div className="min-h-screen bg-white">
        {/* JSON-LD Structured Data for SEO */}
        <Script
          id="json-ld-software-homepage"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd.fr) }}
          strategy="beforeInteractive"
        />
        <Script
          id="json-ld-faq"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema.fr) }}
          strategy="beforeInteractive"
        />
        <LandingNavbar />
        <Hero />
        <PainPoints />
        <Problem />
        <Timeline />
        {/* <Testimonials /> */}
        <Pricing />
        <FAQ />
        <CTAFinal />
        <Footer />
      </div>
    </LanguageProvider>
  );
}
