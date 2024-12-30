import { useLocalStorage } from './useLocalStorage';
import { useLanguage } from './useLanguage';
import { useMemo, useCallback } from 'react';
import type { ReflectionData, Section } from '../types';

export function useProgress() {
  const [data, setData] = useLocalStorage<ReflectionData>('reflection-data', { answers: {}, lastSaved: '' });
  const [customSections] = useLocalStorage<Section[]>('custom-sections', []);
  const { t } = useLanguage();

  const calculateProgress = useCallback(() => {
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
      answer => answer.answer && answer.answer.trim() !== ''
    ).length;
    
    // Calculate percentage with proper rounding
    const percentage = totalQuestions > 0
      ? Math.floor((answeredQuestions / totalQuestions) * 100)
      : 0;
    
    return {
      totalQuestions,
      answeredQuestions,
      percentageComplete: percentage,
      data,
      setData
    };
  }, [data.answers, t.sections, customSections, data, setData]);

  return useMemo(() => calculateProgress(), [calculateProgress]);
}