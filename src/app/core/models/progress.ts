// What the user actually answered, mirroring the question type. Kept so a "review your
// mistakes" screen can be built later without changing the saved data.
export type Answer =
  | { readonly type: 'multiple-choice'; readonly optionId: string }
  | { readonly type: 'fill-blank'; readonly values: readonly string[] } // one value per blank
  | { readonly type: 'ordering'; readonly itemIds: readonly string[] }; // in the order given

// The outcome of answering a single question.
export interface QuestionResult {
  readonly questionId: string;
  readonly answer: Answer;
  // 0 = wrong, 1 = fully right. A number instead of a boolean so partial credit (a question
  // with several blanks) and self-assessed skills (writing, speaking) fit without a redesign.
  readonly score: number;
  // answeredAt: Date;
  readonly answeredAt: string; // ISO date string — a Date object does not survive JSON/localStorage
}

// One run through a lesson. Every attempt is kept, not just the last one, because progress
// stats (accuracy, time, evolution) are computed from this history.
export interface LessonAttempt {
  readonly startedAt: string; // ISO date string
  readonly results: readonly QuestionResult[];
}

// A user's progress on a single lesson. Whether it is completed is not stored: it is derived
// from the attempts and the current content, so it can't go stale when questions are added.
export interface LessonProgress {
  readonly attempts: readonly LessonAttempt[];
}

// Everything persisted in the browser, keyed by lesson id so the same lesson can't appear
// twice. The version lets the repository detect and migrate data saved with an older shape.
export interface ProgressSnapshot {
  readonly version: 1;
  readonly lessons: Readonly<Record<string, LessonProgress>>;
}
