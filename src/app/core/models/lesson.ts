import { Question } from './question';

export interface Lesson {
  readonly id: string; // unique across the whole course; stored progress points at it
  readonly title: string;
  readonly theory?: string; // optional — some lessons are pure practice, no theory
  readonly questions: readonly Question[];
}

// A group of related lessons. Called Unit rather than Module to avoid confusion with
// Angular's NgModule and with the app's own areas (Vocabulary, Grammar...).
export interface Unit {
  readonly id: string;
  readonly title: string;
  readonly lessons: readonly Lesson[];
}
