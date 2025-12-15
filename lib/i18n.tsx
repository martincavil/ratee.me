'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { content } from './constants';

export type Language = 'fr' | 'en';

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  text: (typeof content)['fr'] | (typeof content)['en'];
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

/**
 * Detect browser language
 * Returns 'fr' if browser language is French, 'en' otherwise
 */
function detectBrowserLanguage(): Language {
  if (typeof window === 'undefined') return 'fr';

  // Check localStorage first (user preference)
  const savedLang = localStorage.getItem('language');
  if (savedLang === 'fr' || savedLang === 'en') {
    return savedLang as Language;
  }

  // Detect from browser
  const browserLang = navigator.language || (navigator as any).userLanguage;

  // If browser language starts with 'fr' (fr, fr-FR, fr-CA, etc.), use French
  // Otherwise, use English
  return browserLang.toLowerCase().startsWith('fr') ? 'fr' : 'en';
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Language>('fr');
  const [isInitialized, setIsInitialized] = useState(false);
  const text = content[lang];

  // Detect browser language on mount
  useEffect(() => {
    const detectedLang = detectBrowserLanguage();
    setLang(detectedLang);
    setIsInitialized(true);
  }, []);

  // Save language preference when it changes
  useEffect(() => {
    if (isInitialized && typeof window !== 'undefined') {
      localStorage.setItem('language', lang);
    }
  }, [lang, isInitialized]);

  return (
    <LanguageContext.Provider value={{ lang, setLang, text }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
}
