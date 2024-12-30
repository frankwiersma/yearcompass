import React from 'react';
import { RoundButton } from './RoundButton';
import { useLanguage } from '../hooks/useLanguage';
import type { Language } from '../hooks/useLanguage';

const GB_FLAG = (
  <svg viewBox="0 0 60 40" className="w-5 h-5">
    <clipPath id="s">
      <path d="M0,0 v40 h60 v-40 z" />
    </clipPath>
    <path d="M0,0 v40 h60 v-40 z" fill="#012169" />
    <path d="M0,0 L60,40 M60,0 L0,40" stroke="#fff" strokeWidth="8" />
    <path d="M0,0 L60,40 M60,0 L0,40" clipPath="url(#s)" stroke="#C8102E" strokeWidth="5" />
    <path d="M30,0 v40 M0,20 h60" stroke="#fff" strokeWidth="13" />
    <path d="M30,0 v40 M0,20 h60" stroke="#C8102E" strokeWidth="8" />
  </svg>
);

const NL_FLAG = (
  <svg viewBox="0 0 9 6" className="w-5 h-5">
    <rect width="9" height="6" fill="#21468B"/>
    <rect width="9" height="4" fill="#FFF"/>
    <rect width="9" height="2" fill="#AE1C28"/>
  </svg>
);

export function LanguageToggle() {
  const { language, setLanguage } = useLanguage();

  const handleToggle = () => {
    const newLanguage: Language = language === 'en' ? 'nl' : 'en';
    setLanguage(newLanguage);
  };

  const flags = {
    en: {
      flag: GB_FLAG,
      label: 'Switch to Dutch'
    },
    nl: {
      flag: NL_FLAG,
      label: 'Switch to English'
    }
  };
  
  return (
    <RoundButton
      icon={() => (
        <span className="w-5 h-5 flex items-center justify-center" 
              role="img" 
              aria-label={language === 'en' ? 'British flag' : 'Dutch flag'}>
          {flags[language].flag}
        </span>
      )}
      label={flags[language].label}
      onClick={handleToggle}
      className="hover:bg-gray-100 dark:hover:bg-gray-700"
    />
  );
}