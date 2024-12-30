import React from 'react';
import { Progress } from '../types';

type Props = {
  progress: Progress;
};

export function MobileProgress({ progress }: Props) {
  return (
    <div className="fixed bottom-0 left-0 right-0 lg:hidden bg-white/80 dark:bg-gray-800/80 
                    backdrop-blur-sm border-t border-gray-200 dark:border-gray-700 z-20">
      <div className="px-4 py-2">
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
          <div 
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${progress.percentageComplete}%` }}
          />
        </div>
        <p className="text-xs text-gray-600 dark:text-gray-400 mt-1 text-center">
          {progress.answeredQuestions} of {progress.totalQuestions} questions answered
        </p>
      </div>
    </div>
  );
}