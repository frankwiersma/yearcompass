import React, { createContext, useContext, useEffect } from 'react';
import { en } from '../i18n/en';
import { nl } from '../i18n/nl';
import type { Translations } from '../i18n/types';
import { useLocalStorage } from './useLocalStorage';

export type Language = 'en' | 'nl';

type LanguageContextType = {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
};

const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  setLanguage: () => {},
  t: en
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const defaultLanguage = () => {
    if (typeof window === 'undefined') return 'en';
    const browserLang = window.navigator.language.toLowerCase();
    return browserLang.startsWith('nl') ? 'nl' : 'en';
  };

  const [language, setLanguage] = useLocalStorage<Language>('language', defaultLanguage());
  const translations = language === 'en' ? en : nl;

  useEffect(() => {
    document.documentElement.setAttribute('lang', language);
  }, [language]);

  const value = {
    language,
    setLanguage,
    t: translations
  };

  return React.createElement(LanguageContext.Provider, { value }, children);
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}