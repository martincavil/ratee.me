import type { Metadata } from 'next';
import { Sora, Inter } from 'next/font/google';
import { LanguageProvider } from '@/lib/i18n';
import { generateMetadata } from '@/lib/seo';
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
export const metadata: Metadata = generateMetadata('fr');

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${sora.variable} ${inter.variable}`}>
      <body className="font-inter bg-bg-primary text-content-primary antialiased">
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
