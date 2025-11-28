import { LanguageProvider } from '@/lib/i18n';
import { ReactNode } from 'react';

export default function EnglishLayout({ children }: { children: ReactNode }) {
  return <LanguageProvider>{children}</LanguageProvider>;
}
