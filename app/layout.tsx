import type { Metadata } from 'next';
import { Sora, Inter } from 'next/font/google';
import { LanguageProvider } from '@/lib/i18n';
import { generateMetadata, jsonLd, organizationSchema } from '@/lib/seo';
import GoogleAnalytics from '@/components/analytics/google-analytics';
import Script from 'next/script';
import './globals.css';

const sora = Sora({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-sora',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-inter',
  display: 'swap',
});

// Métadonnées SEO optimisées pour le français (langue principale)
// La langue sera détectée dynamiquement côté client via LanguageProvider
export const metadata: Metadata = generateMetadata('fr');

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${sora.variable} ${inter.variable}`}>
      <head>
        {/* JSON-LD Structured Data for SEO */}
        <Script
          id="json-ld-software"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd.fr),
          }}
          strategy="beforeInteractive"
        />
        <Script
          id="json-ld-organization"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
          strategy="beforeInteractive"
        />
      </head>
      <body className="font-inter bg-bg-primary text-content-primary antialiased">
        <GoogleAnalytics />
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
