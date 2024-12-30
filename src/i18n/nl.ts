import { Translations } from './types';
import { sectionsNL } from '../data/questions-nl';

export const nl: Translations = {
  sections: sectionsNL,
  ui: {
    aiAnalysis: {
      button: 'AI Analyse',
      title: 'AI Jaaroverzicht Analyse',
      loading: 'Analyse wordt gegenereerd...',
      error: {
        title: 'Analyse Fout',
        tryAgain: 'Probeer Opnieuw',
        minimum: 'Vul eerst ten minste 10% van de vragen in voordat je een analyse genereert.',
        failed: 'Analyse genereren mislukt: ',
        pleaseRetry: 'Probeer het opnieuw.',
      },
      incomplete: {
        title: 'Vul Meer Vragen In',
        description: 'Vul ten minste 10% van de vragen in om een AI-analyse te genereren.',
        progress: 'Huidige voortgang: ',
      },
      actions: {
        copyText: 'Tekst Kopiëren',
        downloadPDF: 'Download PDF',
        generatingPDF: 'PDF wordt gegenereerd...',
      },
      toast: {
        pdfSuccess: 'PDF succesvol gegenereerd!',
        copySuccess: 'Tekst gekopieerd naar klembord!',
      },
    },
    navigation: {
      progress: 'Voortgang',
      questionsAnswered: 'vragen beantwoord',
      addNew: 'Nieuw Toevoegen',
      newCategory: 'Nieuwe Categorie',
      newQuestion: 'Nieuwe Vraag',
      deleteConfirm: 'Weet je zeker dat je dit wilt verwijderen:',
      cancel: 'Annuleren',
      delete: 'Verwijderen',
    },
    editor: {
      placeholder: {
        default: 'Denk diep na over deze vraag. Wees specifiek en persoonlijk in je antwoord...',
        bestThing: 'Bijvoorbeeld: Promotie op werk, eerste marathon gelopen, of iemand speciaal ontmoet...',
        books: 'Bijvoorbeeld: "Atomic Habits" van James Clear - hield van de praktische aanpak voor het opbouwen van betere gewoontes...',
        challenging: 'Beschrijf de uitdaging, hoe je je voelde, wat je hebt geleerd en hoe je het hebt overwonnen...',
        threeWords: 'Bijvoorbeeld: "Groei, Avontuur, Verbinding" - leg uit waarom deze woorden je jaar definiëren...',
        grateful: 'Denk aan relaties, kansen, persoonlijke groei, gezondheid of dagelijkse vreugdes...',
      }
    },
    about: {
      title: 'Over Deze App',
      dataPrivacy: {
        title: 'Gegevensprivacy',
        content: 'Al je gegevens worden lokaal in je browser opgeslagen. Niets wordt naar een server verzonden.',
      },
      shortcuts: {
        title: 'Sneltoetsen',
        moveQuestions: 'Navigeer tussen vragen',
      },
      autoSave: {
        title: 'Automatisch Opslaan',
        content: 'Je antwoorden worden automatisch opgeslagen terwijl je typt.',
      },
      yearCompass: {
        title: 'Over YearCompass',
        description: 'YearCompass helpt je te reflecteren op je jaar en te plannen voor de toekomst.',
      },
    },
    import: {
      title: 'Importeer/Exporteer',
      export: 'Exporteer gegevens',
      import: 'Importeer gegevens',
      reset: 'Reset alle gegevens',
      confirmReset: 'Weet je zeker dat je alle antwoorden wilt resetten?',
    }
  }
};