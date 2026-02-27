import { Metadata } from 'next';

export const siteConfig = {
  name: 'ratee.me',
  url: 'https://ratee.me',
  ogImage: 'https://ratee.me/og-image.png',
  twitterHandle: '@rateeme',
  fr: {
    title: 'ratee.me - Automatise ton feedback client et NPS en pilote automatique',
    description: 'Collecte automatiquement les feedbacks NPS de tes clients, obtiens des témoignages authentiques et affiche ton badge de satisfaction client. Solution tout-en-un pour freelances et agences.',
    keywords: [
      'feedback client',
      'NPS automatique',
      'témoignages clients',
      'satisfaction client',
      'freelance',
      'agence',
      'avis clients',
      'Net Promoter Score',
      'automatisation feedback',
      'collecte témoignages',
      'badge NPS',
      'gestion feedback',
      'relation client',
      'réputation en ligne',
      'preuve sociale',
      'retour client automatique',
      'enquête satisfaction',
      'feedback automation',
      'score NPS',
      'avis automatisés',
      'témoignage automatique',
      'email automation feedback',
      'suivi client',
      'fidélisation client',
      'amélioration continue',
      'retour expérience client',
      'collecte avis',
      'gestion réputation',
      'badge satisfaction',
      'widget NPS',
    ],
  },
  en: {
    title: 'ratee.me - Automate Client Feedback & NPS Collection',
    description: 'Automatically collect NPS feedback from your clients, get authentic testimonials, and display your customer satisfaction badge. All-in-one solution for freelancers and agencies.',
    keywords: [
      'client feedback',
      'NPS automation',
      'customer testimonials',
      'client satisfaction',
      'freelance',
      'agency',
      'customer reviews',
      'Net Promoter Score',
      'feedback automation',
      'testimonial collection',
      'NPS badge',
      'feedback management',
      'client relationship',
      'online reputation',
      'social proof',
      'automated feedback',
      'satisfaction survey',
      'NPS score',
      'automated reviews',
      'automatic testimonials',
      'email feedback automation',
      'customer tracking',
      'customer retention',
      'continuous improvement',
      'customer experience feedback',
      'review collection',
      'reputation management',
      'satisfaction badge',
      'NPS widget',
    ],
  },
};

export function generateMetadata(locale: 'fr' | 'en' = 'fr'): Metadata {
  const config = siteConfig[locale];

  return {
    metadataBase: new URL(siteConfig.url),
    title: {
      default: config.title,
      template: `%s | ${siteConfig.name}`,
    },
    description: config.description,
    keywords: config.keywords,
    authors: [{ name: siteConfig.name, url: siteConfig.url }],
    creator: siteConfig.name,
    publisher: siteConfig.name,
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    openGraph: {
      type: 'website',
      locale: locale === 'fr' ? 'fr_FR' : 'en_US',
      url: siteConfig.url,
      title: config.title,
      description: config.description,
      siteName: siteConfig.name,
      images: [
        {
          url: siteConfig.ogImage,
          width: 1200,
          height: 630,
          alt: config.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: config.title,
      description: config.description,
      images: [siteConfig.ogImage],
      creator: siteConfig.twitterHandle,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    alternates: {
      canonical: siteConfig.url,
      languages: {
        'fr-FR': `${siteConfig.url}`,
        'en-US': `${siteConfig.url}/en`,
      },
    },
    verification: {
      // Ajoute ici tes codes de vérification quand tu les auras
      // google: 'ton-code-google',
      // yandex: 'ton-code-yandex',
      // bing: 'ton-code-bing',
    },
  };
}

export const jsonLd = {
  fr: {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: siteConfig.name,
    description: siteConfig.fr.description,
    url: siteConfig.url,
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web',
    inLanguage: 'fr-FR',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'EUR',
      availability: 'https://schema.org/InStock',
      priceValidUntil: '2025-12-31',
    },
    featureList: [
      'Collecte automatique de feedback NPS',
      'Témoignages clients authentiques',
      'Badge de satisfaction client',
      'Email automation',
      'Analyse NPS en temps réel',
      'Gestion des projets clients',
    ],
    screenshot: 'https://ratee.me/og-image.png',
  },
  en: {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: siteConfig.name,
    description: siteConfig.en.description,
    url: siteConfig.url,
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web',
    inLanguage: 'en-US',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
      priceValidUntil: '2025-12-31',
    },
    featureList: [
      'Automatic NPS feedback collection',
      'Authentic customer testimonials',
      'Customer satisfaction badge',
      'Email automation',
      'Real-time NPS analytics',
      'Client project management',
    ],
    screenshot: 'https://ratee.me/og-image.png',
  },
};

// Organization schema for better brand recognition
export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: siteConfig.name,
  url: siteConfig.url,
  logo: 'https://ratee.me/logo.png',
  sameAs: [
    `https://twitter.com/${siteConfig.twitterHandle.replace('@', '')}`,
  ],
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'Customer Support',
    availableLanguage: ['French', 'English'],
  },
};

// FAQ Schema for rich snippets in search results
export const faqSchema = {
  fr: {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Qu\'est-ce que ratee.me ?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'ratee.me est une plateforme qui automatise la collecte de feedbacks NPS de vos clients. Elle vous permet d\'obtenir des témoignages authentiques et d\'afficher votre badge de satisfaction client pour renforcer votre crédibilité.',
        },
      },
      {
        '@type': 'Question',
        name: 'Comment fonctionne l\'automatisation des feedbacks ?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Vous créez un projet dans ratee.me, ajoutez les informations de votre client, et notre système envoie automatiquement un email personnalisé pour collecter le feedback NPS et les témoignages. Tout est automatisé.',
        },
      },
      {
        '@type': 'Question',
        name: 'Combien coûte ratee.me ?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'ratee.me propose un plan gratuit pour commencer avec 1 projet par mois, et un plan PRO à 19€/mois pour des projets illimités et l\'automation par email.',
        },
      },
      {
        '@type': 'Question',
        name: 'Puis-je essayer gratuitement ?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Oui ! Le plan gratuit vous permet de tester toutes les fonctionnalités de base avec 1 projet par mois. Aucune carte bancaire requise.',
        },
      },
      {
        '@type': 'Question',
        name: 'Qu\'est-ce que le score NPS ?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Le NPS (Net Promoter Score) mesure la satisfaction client sur une échelle de 0 à 10. C\'est un indicateur clé pour évaluer la fidélité de vos clients et identifier vos promoteurs.',
        },
      },
    ],
  },
  en: {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is ratee.me?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'ratee.me is a platform that automates NPS feedback collection from your clients. It allows you to get authentic testimonials and display your customer satisfaction badge to strengthen your credibility.',
        },
      },
      {
        '@type': 'Question',
        name: 'How does feedback automation work?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'You create a project in ratee.me, add your client\'s information, and our system automatically sends a personalized email to collect NPS feedback and testimonials. Everything is automated.',
        },
      },
      {
        '@type': 'Question',
        name: 'How much does ratee.me cost?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'ratee.me offers a free plan to start with 1 project per month, and a PRO plan at $19/month for unlimited projects and email automation.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can I try it for free?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes! The free plan allows you to test all basic features with 1 project per month. No credit card required.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is the NPS score?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'NPS (Net Promoter Score) measures customer satisfaction on a scale from 0 to 10. It\'s a key indicator to evaluate customer loyalty and identify your promoters.',
        },
      },
    ],
  },
};
