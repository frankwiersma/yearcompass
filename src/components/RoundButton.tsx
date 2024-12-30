import React from 'react';
import { LucideIcon } from 'lucide-react';

type Props = {
  icon: LucideIcon;
  label: string;
  onClick?: () => void;
  className?: string;
  iconClassName?: string;
  as?: 'button' | 'label';
};

export function RoundButton({ 
  icon: Icon, 
  label, 
  onClick, 
  className = '',
  iconClassName = '',
  as = 'button'
}: Props) {
  const baseClassName = `
    group relative p-2 rounded-full bg-white/10 backdrop-blur-sm z-50
    border border-white/10 hover:border-white/20 hover:bg-white/20
    transition-all duration-300 shadow-lg
    dark:bg-gray-800/50 dark:hover:bg-gray-700/50
  `;

  const tooltipClassName = `
    invisible group-hover:visible opacity-0 group-hover:opacity-100
    absolute left-1/2 -translate-x-1/2 -top-10
    px-2 py-1 text-xs rounded bg-gray-900 text-white
    transition-all duration-200 whitespace-nowrap
    dark:bg-gray-700
  `;

  const Component = as;

  return (
    <Component
      onClick={onClick}
      className={`${baseClassName} ${className}`}
    >
      <Icon className={`w-5 h-5 ${iconClassName}`} />
      <span className={tooltipClassName}>{label}</span>
    </Component>
  );
}