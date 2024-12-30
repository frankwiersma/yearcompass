import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';
import { RoundButton } from './RoundButton';

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <RoundButton
      icon={theme === 'dark' ? Sun : Moon}
      label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      onClick={toggleTheme}
      iconClassName={theme === 'dark' ? 'text-yellow-400' : 'text-blue-600'}
    />
  );
}