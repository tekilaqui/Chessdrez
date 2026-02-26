import { useMemo } from 'react';
import { OPENINGS_DATA, OPENING_EXERCISES, getExercisesByTag, getExercisesByOpening } from '@chess-platform/shared';

export function useOpenings() {
    const openings = useMemo(() => OPENINGS_DATA, []);
    const exercises = useMemo(() => OPENING_EXERCISES, []);

    const searchOpenings = (query: string) => {
        const q = query.toLowerCase();
        return openings.flatMap(group =>
            group.items.filter(item =>
                item.name.toLowerCase().includes(q) ||
                group.group.toLowerCase().includes(q)
            )
        );
    };

    const searchExercises = (query: string) => {
        const q = query.toLowerCase();
        return exercises.filter(ex =>
            ex.title.toLowerCase().includes(q) ||
            ex.openingName.toLowerCase().includes(q)
        );
    };

    const getOpeningByMoves = (moves: string) => {
        for (const group of openings) {
            const found = group.items.find(item => item.moves.join(' ') === moves);
            if (found) return found;
        }
        return null;
    };

    return {
        openings,
        exercises,
        searchOpenings,
        searchExercises,
        getOpeningByMoves,
        getExercisesByTag,
        getExercisesByOpening
    };
}
