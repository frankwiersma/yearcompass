import React, { useState, useEffect, forwardRef } from 'react';
import { Question, Answer } from '../types';
import { useDebounce } from '../hooks/useDebounce';
import { BookOpen } from 'lucide-react';
import type { Translations } from '../i18n/types';
import { useLanguage } from '../hooks/useLanguage';

type Props = {
  question: Question;
  answer?: Answer;
  onSave: (answer: string) => void;
  onNext?: () => void;
  onPrev?: () => void;
};

export const QuestionEditor = forwardRef<HTMLDivElement, Props>(({ 
  question, 
  answer, 
  onSave, 
  onNext, 
  onPrev 
}, ref) => {
  const [content, setContent] = useState(answer?.answer || '');
  const debouncedContent = useDebounce(content, 1000);
  const { t } = useLanguage();
  const prevAnswerRef = React.useRef(answer?.answer);
  
  // Reset content when question or answer changes
  useEffect(() => {
    if (answer?.answer !== prevAnswerRef.current) {
      setContent(answer?.answer || '');
      prevAnswerRef.current = answer?.answer;
    }
  }, [question.id, answer?.answer]);
  
  // Handle saving changes
  useEffect(() => {
    if (debouncedContent && debouncedContent !== answer?.answer) {
      onSave(debouncedContent);
    }
  }, [debouncedContent, answer?.answer, onSave]);

  return (
    <div className="p-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl shadow-lg
                    transition-all duration-300 hover:shadow-xl"
         ref={ref}
    >
      <div className="flex items-start gap-4">
        <BookOpen className="w-6 h-6 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-1" />
        <div className="flex-1">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4 leading-relaxed">
            {question.text}
          </h2>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-[calc(100%+2rem)] -mx-4 sm:w-full sm:mx-0 h-48 p-4 bg-white dark:bg-gray-900 border border-gray-200 
                   dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 
                   focus:border-transparent resize-none transition-all duration-300
                   text-gray-700 dark:text-gray-300 placeholder-gray-400 
                   dark:placeholder-gray-600 text-sm sm:text-base"
            placeholder={getPlaceholder(question, t)}
          />
        </div>
      </div>
    </div>
  );
});

function getPlaceholder(question: Question, t: Translations): string {
  // Extract key phrases from the question to create contextual examples
  if (question.text.includes('best thing')) {
    return t.ui.editor.placeholder.bestThing;
  }
  if (question.text.includes('favorite books')) {
    return t.ui.editor.placeholder.books;
  }
  if (question.text.includes('challenging')) {
    return t.ui.editor.placeholder.challenging;
  }
  if (question.text.includes('three words')) {
    return t.ui.editor.placeholder.threeWords;
  }
  if (question.text.includes('grateful')) {
    return t.ui.editor.placeholder.grateful;
  }
  return t.ui.editor.placeholder.default;
}