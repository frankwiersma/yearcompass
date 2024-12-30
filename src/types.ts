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