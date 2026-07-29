import { Question } from './question';

export interface Lesson {
  id: string;
  title: string;
  theory?: string; // optional — some lessons are pure practice, no theory
  questions: Question[];
}

export interface Module {
  id: string;
  title: string;
  lessons: Lesson[];
}
