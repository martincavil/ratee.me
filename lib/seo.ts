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
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'EUR',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      ratingCount: '127',
    },
  },
  en: {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: siteConfig.name,
    description: siteConfig.en.description,
    url: siteConfig.url,
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      ratingCount: '127',
    },
  },
};
