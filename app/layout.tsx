import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

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
    <html lang="en">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}
