import React from 'react';
import { ChevronRight, Trophy, Plus, FolderPlus, ListPlus, Menu, X, Compass, BookmarkPlus } from 'lucide-react';
import { Section, Progress, Answer, ReflectionData } from '../types';
import { AddForm } from './AddForm';
import { DeleteButton } from './DeleteButton';
import { InfoButton } from './InfoButton';
import { ImportExport } from './ImportExport';
import { ThemeToggle } from './ThemeToggle';
import { LanguageToggle } from './LanguageToggle';
import { useLanguage } from '../hooks/useLanguage';

type Props = {
  sections: Section[];
  currentSection: string;
  currentCategory: string;
  progress: Progress;
  answers: Record<string, Answer>;
  data: ReflectionData;
  onNavigate: (sectionId: string, categoryId: string) => void;
  onAddSection: (title: string) => void;
  onAddCategory: (title: string) => void;
  onAddQuestion: (text: string) => void;
  onDeleteSection?: (sectionId: string) => void;
  onDeleteCategory?: (sectionId: string, categoryId: string) => void;
  onDeleteQuestion?: (sectionId: string, categoryId: string, questionId: string) => void;
  onImport: (data: ReflectionData) => void;
  onReset: () => void;
};

export function Navigation({
  sections,
  currentSection,
  currentCategory,
  progress,
  answers,
  data,
  onNavigate,
  onAddSection,
  onAddCategory,
  onAddQuestion,
  onDeleteSection,
  onDeleteCategory,
  onDeleteQuestion,
  onImport,
  onReset
}: Props) {
  const [showAddButtons, setShowAddButtons] = React.useState(false);
  const [showAddForm, setShowAddForm] = React.useState<'category' | 'question' | null>(null);
  const [isOpen, setIsOpen] = React.useState(window.innerWidth >= 1024);
  const { t } = useLanguage();

  React.useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsOpen(true);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleNavigate = (sectionId: string, categoryId: string) => {
    if (window.innerWidth < 1024) {
      setIsOpen(false);
    }
    onNavigate(sectionId, categoryId);
  };

  const handleAddSubmit = (value: string) => {
    if (showAddForm === 'category') {
      onAddCategory(value);
    } else if (showAddForm === 'question') {
      onAddQuestion(value);
    }
    setShowAddForm(null);
    setShowAddButtons(false);
  };

  const handleFormSubmit = (value: string, selectedSection?: string) => {
    switch (showAddForm) {
      case 'section':
        onAddSection(value);
        break;
      case 'category':
        if (selectedSection) {
          onAddCategory(value);
        }
        break;
      case 'question':
        if (selectedSection && selectedCategory) {
          onAddQuestion(value, selectedSection, selectedCategory);
        }
        break;
      default:
        onAddCategory(value);
    }
    setShowAddForm(null);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-white/80 dark:bg-gray-800/80 
                  backdrop-blur-sm border border-gray-200 dark:border-gray-700 
                  hover:bg-white dark:hover:bg-gray-700 transition-colors"
      >
        {isOpen ? (
          <X className="w-6 h-6 text-gray-600 dark:text-gray-300" />
        ) : (
          <Menu className="w-6 h-6 text-gray-600 dark:text-gray-300" />
        )}
      </button>

      <nav className={`fixed inset-y-0 left-0 z-40 w-72 bg-white/80 dark:bg-gray-800/80 
                    backdrop-blur-sm border-r border-gray-200 dark:border-gray-700 
                    flex flex-col h-screen transition-transform duration-300 ease-in-out
                    ${isOpen ? 'translate-x-0' : '-translate-x-full'} 
                    lg:translate-x-0`}>
        <div className="px-6 pt-20 lg:pt-4">
        <div className="flex items-center gap-3 mb-6">
          <Compass className="w-8 h-8 text-blue-600 dark:text-blue-400" />
          <div>
            <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100">YearCompass</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">Your reflection journey</p>
          </div>
        </div>
        <div className="bg-gray-100 dark:bg-gray-700/50 rounded-lg p-4 mb-4">
          <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{t.ui.navigation.progress}</h3>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div 
              className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
              style={{ width: `${progress.percentageComplete}%` }}
            />
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
            {progress.answeredQuestions} {t.ui.navigation.questionsAnswered} ({progress.totalQuestions})
          </p>
        </div>
        <button
          onClick={() => setShowAddButtons(!showAddButtons)}
          className="w-full flex items-center justify-center gap-2 px-4 py-2 text-sm
                     bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400
                     hover:bg-blue-100 dark:hover:bg-blue-800/30 rounded-md transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add New
        </button>
        
        {showAddButtons && (
          <div className="mt-2 space-y-2">
            <button
              onClick={() => setShowAddForm('section')}
              className="w-full flex items-center gap-2 px-4 py-2 text-sm
                       bg-gray-50 dark:bg-gray-700/30 text-gray-700 dark:text-gray-300
                       hover:bg-gray-100 dark:hover:bg-gray-600/30 rounded-md transition-colors"
            >
              <BookmarkPlus className="w-4 h-4" />
              New Section
            </button>
            <button
              onClick={() => setShowAddForm('category')}
              className="w-full flex items-center gap-2 px-4 py-2 text-sm
                       bg-gray-50 dark:bg-gray-700/30 text-gray-700 dark:text-gray-300
                       hover:bg-gray-100 dark:hover:bg-gray-600/30 rounded-md transition-colors"
            >
              <FolderPlus className="w-4 h-4" />
              New Category
            </button>
            <button
              onClick={() => setShowAddForm('question')}
              className="w-full flex items-center gap-2 px-4 py-2 text-sm
                       bg-gray-50 dark:bg-gray-700/30 text-gray-700 dark:text-gray-300
                       hover:bg-gray-100 dark:hover:bg-gray-600/30 rounded-md transition-colors"
            >
              <ListPlus className="w-4 h-4" />
              New Question
            </button>
          </div>
        )}
        </div>
      
      <div className="flex-1 px-6 overflow-y-auto">
      {sections.map((section) => (
        <div key={section.id} className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-sm font-semibold text-gray-900 dark:text-gray-100">{section.title}</h2>
            {onDeleteSection && section.id.startsWith('custom-') && (
              <DeleteButton
                type="section"
                itemName={section.title}
                onDelete={() => onDeleteSection(section.id)}
              />
            )}
          </div>
          <ul className="space-y-1">
            {section.categories.map((category) => (
              <li key={category.id}>
                <div className="flex items-center justify-between gap-2">
                  {category.questions.every(q => answers[q.id]?.answer) && (
                    <Trophy className="w-4 h-4 text-yellow-500 flex-shrink-0" />
                  )}
                  <button
                    onClick={() => handleNavigate(section.id, category.id)}
                    className={`flex-1 text-left px-3 py-2 rounded-md text-sm flex items-center justify-between ${
                      currentSection === section.id && currentCategory === category.id
                        ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      {category.title}
                      <span className="text-xs text-gray-500 dark:text-gray-400 ml-auto">
                        {category.questions.filter(q => answers[q.id]?.answer).length}/{category.questions.length}
                      </span>
                    </span>
                    <ChevronRight className="w-4 h-4 flex-shrink-0" />
                  </button>
                  {onDeleteCategory && category.id.startsWith('custom-') && (
                    <div className="flex items-center">
                      <DeleteButton
                        type="category"
                        itemName={category.title}
                        onDelete={() => onDeleteCategory(section.id, category.id)}
                      />
                    </div>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      ))}
      </div>
      
      {showAddForm && (
        <AddForm
          type={showAddForm}
          sections={sections}
          currentSection={currentSection}
          onSubmit={handleFormSubmit}
          onCancel={() => {
            setShowAddForm(null);
            setShowAddButtons(false);
          }}
        />
      )}
      <div className="mt-auto p-4 border-t border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-800/50">
        <div className="flex items-center justify-center gap-2">
          <InfoButton />
          <LanguageToggle />
          <ImportExport data={data} onImport={onImport} onReset={onReset} />
          <ThemeToggle />
        </div>
      </div>
    </nav>
    </>
  );
}