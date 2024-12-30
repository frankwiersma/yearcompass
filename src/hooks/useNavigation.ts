import { useState, useCallback, useEffect } from 'react';
import { Section } from '../types';
import { useLanguage } from './useLanguage';
import { useLocalStorage } from './useLocalStorage';

export function useNavigation() {
  const { t } = useLanguage();
  const [currentSection, setCurrentSection] = useLocalStorage('current-section', t.sections[0].id);
  const [currentCategory, setCurrentCategory] = useLocalStorage('current-category', t.sections[0].categories[0].id);

  // Reset navigation when language changes to ensure valid IDs
  useEffect(() => {
    // Try to find current section/category in new language
    const section = t.sections.find(s => s.id === currentSection);
    if (!section) {
      setCurrentSection(t.sections[0].id);
      setCurrentCategory(t.sections[0].categories[0].id);
      return;
    }

    const category = section.categories.find(c => c.id === currentCategory);
    if (!category) {
      setCurrentCategory(section.categories[0].id);
    }
  }, [t, currentSection, currentCategory]);

  const handleNavigate = useCallback((sectionId: string, categoryId: string) => {
    setCurrentSection(sectionId);
    setCurrentCategory(categoryId);

    // Scroll to category after state updates
    requestAnimationFrame(() => {
      const categoryDivider = document.getElementById('category-divider');
      const mainContent = document.querySelector('main');
      if (categoryDivider && mainContent) {
        const headerOffset = 100;
        const elementPosition = categoryDivider.offsetTop;
        const scrollPosition = elementPosition - headerOffset;

        mainContent.scrollTo({
          top: scrollPosition,
          behavior: 'smooth'
        });
      }
    });
  }, []);

  const handleNextCategory = useCallback((allSections: Section[]) => {
    const section = allSections.find(s => s.id === currentSection);
    if (!section) return;

    const categoryIndex = section.categories.findIndex(c => c.id === currentCategory);
    if (categoryIndex === section.categories.length - 1) {
      // Move to next section's first category
      const sectionIndex = allSections.findIndex(s => s.id === currentSection);
      if (sectionIndex < allSections.length - 1) {
        const nextSection = allSections[sectionIndex + 1];
        handleNavigate(nextSection.id, nextSection.categories[0].id);
      }
    } else {
      // Move to next category in current section
      handleNavigate(currentSection, section.categories[categoryIndex + 1].id);
    }
  }, [currentSection, currentCategory, handleNavigate]);

  const handlePrevCategory = useCallback((allSections: Section[]) => {
    const section = allSections.find(s => s.id === currentSection);
    if (!section) return;

    const categoryIndex = section.categories.findIndex(c => c.id === currentCategory);
    if (categoryIndex === 0) {
      // Move to previous section's last category
      const sectionIndex = allSections.findIndex(s => s.id === currentSection);
      if (sectionIndex > 0) {
        const prevSection = allSections[sectionIndex - 1];
        handleNavigate(
          prevSection.id,
          prevSection.categories[prevSection.categories.length - 1].id
        );
      }
    } else {
      // Move to previous category in current section
      handleNavigate(currentSection, section.categories[categoryIndex - 1].id);
    }
  }, [currentSection, currentCategory, handleNavigate]);

  return {
    currentSection,
    currentCategory,
    handleNavigate,
    handleNextCategory,
    handlePrevCategory
  };
}