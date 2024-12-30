import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { LanguageProvider } from './hooks/useLanguage';
import { ProgressProvider } from './contexts/ProgressContext';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LanguageProvider>
      <ProgressProvider>
      <App />
      </ProgressProvider>
    </LanguageProvider>
  </StrictMode>
);
