export type Answer = {
  id: string;
  question: string;
  answer: string;
  category: string;
  section: string;
  lastModified: string;
};

export type Section = {
  id: string;
  title: string;
  categories: Category[];
};

export type Category = {
  id: string;
  title: string;
  questions: Question[];
};

export type Question = {
  id: string;
  text: string;
};

export type Progress = {
  totalQuestions: number;
  answeredQuestions: number;
  percentageComplete: number;
};

export type ReflectionData = {
  answers: Record<string, Answer>;
  lastSaved: string;
};

// New types for AI Analysis translations
export type AIAnalysisTranslations = {
  button: string;
  title: string;
  error: {
    title: string;
    tryAgain: string;
    minimum: string;
    failed: string;
    pleaseRetry: string;
  };
  incomplete: {
    title: string;
    description: string;
    progress: string;
  };
  actions: {
    copyText: string;
    downloadPDF: string;
    generatingPDF: string;
  };
  toast: {
    pdfSuccess: string;
    copySuccess: string;
  };
};

// Update your existing Translations type if it exists, or create it if it doesn't
export type Translations = {
  sections: Section[];
  ui: {
    navigation: {
      progress: string;
      questionsAnswered: string;
      addNew: string;
      newCategory: string;
      newQuestion: string;
      deleteConfirm: string;
      cancel: string;
      delete: string;
    };
    editor: {
      placeholder: {
        default: string;
        bestThing: string;
        books: string;
        challenging: string;
        threeWords: string;
        grateful: string;
      };
    };
    about: {
      title: string;
      dataPrivacy: {
        title: string;
        content: string;
      };
      shortcuts: {
        title: string;
        moveQuestions: string;
      };
      autoSave: {
        title: string;
        content: string;
      };
      yearCompass: {
        title: string;
        description: string;
      };
    };
    import: {
      title: string;
      export: string;
      import: string;
      reset: string;
      confirmReset: string;
    };
    aiAnalysis: AIAnalysisTranslations; // Add the AI Analysis translations to the UI namespace
  };
};