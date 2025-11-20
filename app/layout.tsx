import type { Metadata } from 'next';
import { Sora, Inter } from 'next/font/google';
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

export const metadata: Metadata = {
  title: 'ratee.me - Automate Client Feedback Collection',
  description: 'Professional NPS tracking and client feedback automation for freelancers and agencies',
  keywords: ['NPS', 'feedback', 'client testimonials', 'freelance', 'agency'],
  authors: [{ name: 'ratee.me' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://ratee.me',
    title: 'ratee.me - Automate Client Feedback Collection',
    description: 'Professional NPS tracking and client feedback automation',
    siteName: 'ratee.me',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${sora.variable} ${inter.variable}`}>
      <body className="font-inter bg-bg-primary text-text-primary antialiased">
        {children}
      </body>
    </html>
  );
}
