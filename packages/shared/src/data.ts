import puzzlesJson from './data/puzzles.json';
import openingsJson from './data/openings.json';
import { Puzzle, Opening, OpeningExercise } from './domain-types';
import { detectOpening } from './data/openings-detector';
import { OPENING_EXERCISES, getExercisesByTag, getExercisesByOpening } from './data/opening-exercises';

export const PUZZLES_DATA = puzzlesJson as Puzzle[];
export const OPENINGS_DATA = openingsJson as Opening[];
export { detectOpening, OPENING_EXERCISES, getExercisesByTag, getExercisesByOpening };
export type { OpeningExercise };
