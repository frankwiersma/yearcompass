import { Section } from '../types';

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
    aiAnalysis: {
      button: string;
      title: string;
      loading: string;
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
  };
};