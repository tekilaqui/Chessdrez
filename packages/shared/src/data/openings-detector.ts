import openingsDataRaw from './openings.json';

interface OpeningItem {
    name: string;
    tag: string;
    moves: string[];
    steps: { comment: string; marks?: string[] }[];
}

interface OpeningGroup {
    group: string;
    items: OpeningItem[];
}

// Asegurarse de mantener el tipo correcto para la lectura de JSON
const openingsGroups = openingsDataRaw as OpeningGroup[];

export interface DetectedOpening {
    name: string;
    groupName: string;
    commentary?: string;
}

export function detectOpening(history: string[]): DetectedOpening | null {
    if (!history || history.length === 0) return null;

    let bestMatch: DetectedOpening | null = null;
    let maxDepthMatched = 0;

    const checkOpening = (opening: any, groupName: string) => {
        let matchedMoves = 0;
        for (let i = 0; i < opening.moves.length && i < history.length; i++) {
            if (opening.moves[i] === history[i]) {
                matchedMoves++;
            } else {
                break;
            }
        }

        if (matchedMoves > 0 && matchedMoves > maxDepthMatched) {
            maxDepthMatched = matchedMoves;
            bestMatch = {
                groupName,
                name: opening.name,
                commentary: opening.steps && opening.steps[matchedMoves - 1] ? opening.steps[matchedMoves - 1].comment : undefined
            };
        }

        // Revisar variantes recursivamente si hay coincidencia parcial
        if (opening.variants && matchedMoves > 0) {
            for (const variant of opening.variants) {
                checkOpening(variant, groupName);
            }
        }
    };

    for (const group of openingsGroups) {
        for (const opening of group.items) {
            checkOpening(opening, group.group);
        }
    }

    return bestMatch;
}
