import { Translations } from './types';
import { sections } from '../data/questions';

export const en: Translations = {
  sections,
  ui: {
    navigation: {
      progress: 'Progress',
      questionsAnswered: 'questions answered',
      addNew: 'Add New',
      newCategory: 'New Category',
      newQuestion: 'New Question',
      deleteConfirm: 'Are you sure you want to delete this:',
      cancel: 'Cancel',
      delete: 'Delete',
    },
    editor: {
      placeholder: {
        default: 'Reflect deeply on this question. Be specific and personal in your answer...',
        bestThing: 'Example: Getting promoted at work, running my first marathon, or meeting someone special...',
        books: 'Example: "Atomic Habits" by James Clear - loved the practical approach to building better habits...',
        challenging: 'Describe the challenge, how you felt, what you learned, and how you overcame it...',
        threeWords: 'Example: "Growth, Adventure, Connection" - explain why these words define your year...',
        grateful: 'Think about relationships, opportunities, personal growth, health, or simple daily joys...',
      }
    },
    about: {
      title: 'About This App',
      dataPrivacy: {
        title: 'Data Privacy',
        content: 'All your data is stored locally in your browser. Nothing is sent to any server.',
      },
      shortcuts: {
        title: 'Keyboard Shortcuts',
        moveQuestions: 'Move between questions',
      },
      autoSave: {
        title: 'Auto-Save',
        content: 'Your answers are automatically saved as you type.',
      },
      yearCompass: {
        title: 'About YearCompass',
        description: 'YearCompass helps you reflect on your year and plan for the future.',
      },
    },
    import: {
      title: 'Import/Export',
      export: 'Export data',
      import: 'Import data',
      reset: 'Reset all data',
      confirmReset: 'Are you sure you want to reset all answers?',
    }
  }
};