import React, { useState, useMemo } from 'react';
import { Navigation } from './components/Navigation';
import { QuestionEditor } from './components/QuestionEditor';
import { ImportExport } from './components/ImportExport';
import { InfoButton } from './components/InfoButton';
import { ThemeToggle } from './components/ThemeToggle';
import { MobileProgress } from './components/MobileProgress';
import { useLocalStorage } from './hooks/useLocalStorage';
import { useKeyboardNavigation } from './hooks/useKeyboardNavigation';
import { useNavigation } from './hooks/useNavigation';
import { useLanguage } from './hooks/useLanguage';
import { useInView } from './hooks/useInView';
import type { ReflectionData, Progress, Section, Category, Question } from './types';

const initialData: ReflectionData = {
  answers: {},
  lastSaved: new Date().toISOString(),
};

function App() {
  const [data, setData, resetData] = useLocalStorage<ReflectionData>('reflection-data', initialData);
  const [customSections, setCustomSections, resetCustomSections] = useLocalStorage<Section[]>('custom-sections', []);
  const { t } = useLanguage();
  
  const {
    currentSection,
    currentCategory,
    handleNavigate,
    handleNextCategory,
    handlePrevCategory
  } = useNavigation();

  useKeyboardNavigation(t.sections, currentSection, currentCategory, handleNavigate);

  const allSections = useMemo(() => [...t.sections, ...customSections], [t.sections, customSections]);

  const progress: Progress = useMemo(() => {
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

    return {
      totalQuestions,
      answeredQuestions,
      percentageComplete: Math.round((answeredQuestions / totalQuestions) * 100),
    };
  }, [data.answers]);

  const section = allSections.find((s) => s.id === currentSection);
  const category = section?.categories.find((c) => c.id === currentCategory);
  const questions = category?.questions || [];
  
  const lastQuestionRef = useInView({
    threshold: 1,
    rootMargin: '0px 0px -100px 0px',
    delay: 800,
    onChange: (inView) => {
      if (inView && questions.length > 0) {
        handleNextCategory(allSections);
      }
    }
  });

  const handleScroll = (direction: 'prev' | 'next') => {
    const fn = direction === 'next' ? handleNextCategory : handlePrevCategory;
    fn(allSections);
    
    // Ensure the category divider is visible after navigation
    requestAnimationFrame(() => {
      const categoryDivider = document.getElementById('category-divider');
      if (categoryDivider) {
        categoryDivider.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  };

  const handleAddSection = (title: string) => {
    const newSection: Section = {
      id: `section-${Date.now()}`,
      title,
      categories: []
    };
    setCustomSections(prev => [...prev, newSection]);
  };

  const handleAddCategory = (title: string) => {
    const currentSectionObj = allSections.find((s) => s.id === currentSection);
    if (!currentSectionObj) return;
    
    const newCategory: Category = {
      id: `category-${Date.now()}`,
      title,
      questions: []
    };

    if (currentSectionObj.id.startsWith('section-')) {
      // Update custom section created by user
      setCustomSections(prev => prev.map(section => 
        section.id === currentSection
          ? { ...section, categories: [...section.categories, newCategory] }
          : section
      ));
    } else {
      // For built-in sections, create a new custom section
      const newSection: Section = {
        id: `section-${Date.now()}`,
        title: currentSectionObj.title,
        categories: [newCategory]
      };
      setCustomSections(prev => [...prev, newSection]);
    }
  };

  const handleAddQuestion = (text: string, sectionId: string, categoryId: string) => {
    const currentSectionObj = allSections.find((s) => s.id === currentSection);
    if (!currentSectionObj) return;

    const newQuestion: Question = {
      id: `question-${Date.now()}`,
      text
    };

    if (sectionId.startsWith('section-')) {
      setCustomSections(prev => prev.map(section => 
        section.id === sectionId
          ? {
              ...section,
              categories: section.categories.map(category =>
                category.id === categoryId
                  ? { ...category, questions: [...category.questions, newQuestion] }
                  : category
              )
            }
          : section
      ));
    }
  };

  const handleSaveAnswer = (questionId: string, answer: string) => {
    const section = t.sections.find((s) => s.id === currentSection);
    const category = section?.categories.find((c) => c.id === currentCategory);
    const question = category?.questions.find((q) => q.id === questionId);

    if (!question) return;

    // Don't save empty answers
    if (!answer.trim()) {
      const newAnswers = { ...data.answers };
      delete newAnswers[questionId];
      setData({
        ...data,
        lastSaved: new Date().toISOString(),
        answers: newAnswers,
      });
      return;
    }

    setData({
      ...data,
      lastSaved: new Date().toISOString(),
      answers: {
        ...data.answers,
        [questionId]: {
          id: questionId,
          question: question.text,
          answer,
          category: category.title,
          section: section.title,
          lastModified: new Date().toISOString(),
        },
      },
    });
  };

  const handleImport = (importedData: ReflectionData) => {
    setData(importedData);
  };

  const handleReset = () => {
    // First reset the data to initial state
    resetData();
    resetCustomSections();
    
    // Force clear all answers
    setData({
      answers: {},
      lastSaved: new Date().toISOString(),
    });
  };

  const handleDeleteSection = (sectionId: string) => {
    setCustomSections(prev => prev.filter(section => section.id !== sectionId));
  };

  const handleDeleteCategory = (sectionId: string, categoryId: string) => {
    setCustomSections(prev => prev.map(section => 
      section.id === sectionId
        ? { ...section, categories: section.categories.filter(cat => cat.id !== categoryId) }
        : section
    ));
  };

  const handleDeleteQuestion = (sectionId: string, categoryId: string, questionId: string) => {
    setCustomSections(prev => prev.map(section => 
      section.id === sectionId
        ? {
            ...section,
            categories: section.categories.map(category =>
              category.id === categoryId
                ? { ...category, questions: category.questions.filter(q => q.id !== questionId) }
                : category
            )
          }
        : section
    ));
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-[var(--gradient-start)] to-[var(--gradient-end)]">
      <Navigation
        sections={allSections}
        currentSection={currentSection}
        currentCategory={currentCategory}
        progress={progress}
        answers={data.answers}
        data={data}
        onNavigate={handleNavigate}
        onAddSection={handleAddSection}
        onAddCategory={handleAddCategory}
        onAddQuestion={handleAddQuestion}
        onDeleteSection={handleDeleteSection}
        onDeleteCategory={handleDeleteCategory}
        onDeleteQuestion={handleDeleteQuestion}
        onImport={handleImport}
        onReset={handleReset}
      />
      <main className="flex-1 overflow-y-auto p-6 lg:ml-72">
        <div className="fixed top-0 left-0 lg:left-72 right-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm z-30 
                      border-b border-gray-200 dark:border-gray-700 px-8 py-4">
          <div className="max-w-3xl mx-auto pl-16 lg:pl-0">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              <span>{allSections.find((s) => s.id === currentSection)?.title}</span>
              <span className="mx-2 text-gray-400 dark:text-gray-500">/</span>
              <span className="text-blue-600 dark:text-blue-400">
                {allSections.find((s) => s.id === currentSection)?.categories.find((c) => c.id === currentCategory)?.title}
              </span>
            </h1>
          </div>
        </div>
        <div className="max-w-full lg:max-w-3xl mx-auto mt-20 px-2 sm:px-4 lg:px-8 pb-6">
          <div className="space-y-6">
            <div className="flex items-center justify-between mb-8">
              <button
                onClick={() => handleScroll('prev')}
                className="px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-400 
                         hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
                disabled={currentSection === t.sections[0].id && currentCategory === t.sections[0].categories[0].id}
              >
                ← Previous Category
              </button>
              <button
                onClick={() => handleScroll('next')}
                className="px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-400 
                         hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
              >
                Next Category →
              </button>
            </div>
            <div className="relative py-4 mb-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200 dark:border-gray-700"></div>
              </div>
              <div id="category-divider" className="relative flex justify-center">
                <span className="px-3 bg-gradient-to-br from-[var(--gradient-start)] to-[var(--gradient-end)] 
                              text-sm text-gray-500 dark:text-gray-400">
                  {category?.title}
                </span>
              </div>
            </div>
            {questions.map((question, index) => (
              <QuestionEditor
                key={question.id}
                question={question}
                ref={index === questions.length - 1 ? lastQuestionRef : null}
                answer={data.answers[question.id]}
                onSave={answer => handleSaveAnswer(question.id, answer)}
                onNext={() => handleNextCategory(allSections)}
                onPrev={() => handlePrevCategory(allSections)}
              />
            ))}
          </div>
        </div>
        <MobileProgress progress={progress} />
      </main>
    </div>
  );
}

export default App;