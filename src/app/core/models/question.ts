// Fields shared by every question type.
interface BaseQuestion {
  id: string;
  prompt: string; // the question text shown to the user
}

export interface MultipleChoiceQuestion extends BaseQuestion {
  type: 'multiple-choice';
  options: string[]; // the choices, in canonical order
  correctOptionIndex: number; // zero-based index of the correct option
}

export interface FillBlankQuestion extends BaseQuestion {
  type: 'fill-blank';
  correctAnswers: string[]; // plural on purpose: accept valid variants/synonyms
}

export interface OrderingQuestion extends BaseQuestion {
  type: 'ordering';
  correctOrder: string[]; // items in their correct sequence (the UI shuffles a copy)
}

// A Question is exactly one of these variants; the type field tells which.
export type Question = MultipleChoiceQuestion | FillBlankQuestion | OrderingQuestion;
