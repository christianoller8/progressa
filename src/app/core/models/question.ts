// Fields shared by every question type.
interface BaseQuestion {
  readonly id: string; // unique within its lesson; never reuse an id once content is published
  readonly prompt: string; // the question text shown to the user
}

// A piece of content the user picks or moves. Its id (unique within the question) keeps answers
// independent of array positions, which change when the UI shuffles or the content is edited.
export interface Choice {
  readonly id: string;
  readonly text: string;
}

export interface MultipleChoiceQuestion extends BaseQuestion {
  readonly type: 'multiple-choice';
  readonly options: readonly Choice[];
  readonly correctOptionId: string; // an id, not an index: safe to shuffle or reorder options
}

// Marks each gap inside a fill-blank prompt, e.g. "She ___ to school every day."
// Exactly three underscores per gap.
export const BLANK_MARKER = '___';

export interface FillBlankQuestion extends BaseQuestion {
  readonly type: 'fill-blank';
  // One entry per BLANK_MARKER in the prompt, in order of appearance. Each entry lists every
  // accepted answer for that gap (plural on purpose: valid variants/synonyms). How answers are
  // compared (case, extra spaces) is the quiz engine's job, not the data's.
  readonly blanks: readonly (readonly string[])[];
}

export interface OrderingQuestion extends BaseQuestion {
  readonly type: 'ordering';
  // Items in their correct sequence (the UI shuffles a copy). Ids keep repeated words, like
  // two "the", distinguishable.
  readonly items: readonly Choice[];
}

// A Question is exactly one of these variants; the type field tells which.
export type Question = MultipleChoiceQuestion | FillBlankQuestion | OrderingQuestion;
