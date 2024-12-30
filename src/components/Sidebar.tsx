import React from 'react';
import { ChevronDown, CheckCircle2, Trophy } from 'lucide-react';
import { Category, Question } from '../types';

type Props = {
  categories: Category[];
  onSelectQuestion: (questionId: string) => void;
  selectedQuestionId: string | null;
  completedQuestions: Set<string>;
  onToggleComplete: (questionId: string) => void;
};

export function Sidebar({
  categories,
  onSelectQuestion,
  selectedQuestionId,
  completedQuestions,
  onToggleComplete,
}: Props) {
  return (
    <aside className="w-80 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm h-screen overflow-y-auto
                      border-r border-gray-200 dark:border-gray-700 p-4">
      <div className="space-y-4">
        {categories.map((category) => (
          <div key={category.id} className="space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                {category.questions.every(q => completedQuestions.has(q.id)) && (
                  <Trophy className="w-4 h-4 text-yellow-500 inline-block mr-2" />
                )}
                {category.title}
              </h3>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                {category.questions.filter(q => completedQuestions.has(q.id)).length} / {category.questions.length}
              </span>
            </div>
            <div className="space-y-1">
              {category.questions.map((question) => (
                <button
                  key={question.id}
                  onClick={() => onSelectQuestion(question.id)}
                  className={`group w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm
                             transition-all duration-300 ${
                    selectedQuestionId === question.id
                      ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                      : 'hover:bg-gray-50 dark:hover:bg-gray-700/50 text-gray-700 dark:text-gray-300'
                  }`}
                >
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleComplete(question.id);
                    }}
                    className={`flex-shrink-0 w-5 h-5 rounded-full border-2 
                               transition-all duration-300 ${
                      completedQuestions.has(question.id)
                        ? 'border-green-500 bg-green-500 dark:border-green-400 dark:bg-green-400'
                        : 'border-gray-300 dark:border-gray-600 group-hover:border-blue-400'
                    }`}
                  >
                    {completedQuestions.has(question.id) && (
                      <CheckCircle2 className="w-4 h-4 text-white" />
                    )}
                  </button>
                  <span className="flex-1 text-left">{question.text}</span>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
}