import { useEffect, useCallback } from 'react';
import { Section } from '../types';
import { useLanguage } from './useLanguage';

export function useKeyboardNavigation(
  sections: Section[],
  currentSection: string,
  currentCategory: string,
  onNavigate: (sectionId: string, categoryId: string) => void
) {
  const { t } = useLanguage();

  const findNextCategory = useCallback(() => {
    const currentSectionObj = sections.find(s => s.id === currentSection);
    if (!currentSectionObj) return null;

    const currentCategoryIndex = currentSectionObj.categories.findIndex(c => c.id === currentCategory);
    if (currentCategoryIndex === -1) return null;

    // Try next category in current section
    if (currentCategoryIndex < currentSectionObj.categories.length - 1) {
      return {
        sectionId: currentSection,
        categoryId: currentSectionObj.categories[currentCategoryIndex + 1].id
      };
    }

    // Try first category of next section
    const currentSectionIndex = sections.findIndex(s => s.id === currentSection);
    if (currentSectionIndex < sections.length - 1) {
      const nextSection = sections[currentSectionIndex + 1];
      return {
        sectionId: nextSection.id,
        categoryId: nextSection.categories[0].id
      };
    }

    return null;
  }, [sections, currentSection, currentCategory]);

  const findPreviousCategory = useCallback(() => {
    const currentSectionObj = sections.find(s => s.id === currentSection);
    if (!currentSectionObj) return null;

    const currentCategoryIndex = currentSectionObj.categories.findIndex(c => c.id === currentCategory);
    if (currentCategoryIndex === -1) return null;

    // Try previous category in current section
    if (currentCategoryIndex > 0) {
      return {
        sectionId: currentSection,
        categoryId: currentSectionObj.categories[currentCategoryIndex - 1].id
      };
    }

    // Try last category of previous section
    const currentSectionIndex = sections.findIndex(s => s.id === currentSection);
    if (currentSectionIndex > 0) {
      const prevSection = sections[currentSectionIndex - 1];
      return {
        sectionId: prevSection.id,
        categoryId: prevSection.categories[prevSection.categories.length - 1].id
      };
    }

    return null;
  }, [sections, currentSection, currentCategory]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Only handle if not in input/textarea
      if (e.target instanceof HTMLElement && 
          (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA')) {
        return;
      }

      switch (e.key) {
        case 'ArrowRight':
        case 'j':
          const next = findNextCategory();
          if (next) {
            e.preventDefault();
            onNavigate(next.sectionId, next.categoryId);
          }
          break;
        case 'ArrowLeft':
        case 'k':
          const prev = findPreviousCategory();
          if (prev) {
            e.preventDefault();
            onNavigate(prev.sectionId, prev.categoryId);
          }
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [findNextCategory, findPreviousCategory, onNavigate]);
}