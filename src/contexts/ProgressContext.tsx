import React, { createContext, useContext, useMemo, useCallback } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useLanguage } from '../hooks/useLanguage';
import type { ReflectionData, Progress, Section } from '../types';

type ProgressContextType = {
  data: ReflectionData;
  updateData: (data: ReflectionData) => void;
  resetData: () => void;
  progress: Progress;
};

const ProgressContext = createContext<ProgressContextType | null>(null);

export function ProgressProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useLocalStorage<ReflectionData>('reflection-data', {
    answers: {},
    lastSaved: new Date().toISOString(),
  });
  const [customSections] = useLocalStorage<Section[]>('custom-sections', []);
  const { t } = useLanguage();
  
  const updateData = useCallback((newData: ReflectionData) => {
    setData(newData);
  }, [setData]);
  
  const resetData = useCallback(() => {
    setData({
      answers: {},
      lastSaved: new Date().toISOString(),
    });
  }, [setData]);

  const progress = useMemo(() => {
    const allSections = [...t.sections, ...customSections];
    
    const totalQuestions = allSections.reduce(
      (total, section) =>
        total +
        section.categories.reduce(
          (catTotal, category) => catTotal + category.questions.length,
          0
        ),
      0
    );

    const answeredQuestions = Object.values(data.answers).filter(
      answer => answer?.answer && answer.answer.trim().length > 0
    ).length;

    const percentageComplete = totalQuestions > 0
      ? Math.floor((answeredQuestions / totalQuestions) * 100)
      : 0;

    return {
      totalQuestions,
      answeredQuestions,
      percentageComplete,
    };
  }, [data.answers, t.sections, customSections]);

  return (
    <ProgressContext.Provider value={{ data, updateData, resetData, progress }}>
      {children}
    </ProgressContext.Provider>
  );
}

export function useProgress() {
  const context = useContext(ProgressContext);
  if (!context) {
    throw new Error('useProgress must be used within a ProgressProvider');
  }
  return context;
}