import React from 'react';
import { Bot } from 'lucide-react';

export function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center p-8">
      <div className="relative">
        <Bot className="w-16 h-16 text-purple-600 dark:text-purple-400" />
        <div className="absolute inset-0 border-4 border-purple-200 dark:border-purple-900 
                      border-t-purple-600 dark:border-t-purple-400 rounded-full animate-spin" />
      </div>
      <p className="mt-4 text-gray-600 dark:text-gray-300">
        Analyzing your responses...
      </p>
    </div>
  );
}