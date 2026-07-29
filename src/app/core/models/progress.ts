// The outcome of answering a single question.
export interface QuestionResult {
  questionId: string;
  correct: boolean;
  // answeredAt: Date;
  answeredAt: string; // ISO date string — a Date object does not survive JSON/localStorage
}

// A user's progress on a single lesson: whether it's done and each question's result.
export interface LessonProgress {
  lessonId: string;
  completed: boolean;
  results: QuestionResult[];
}
