import { parseEngineInfo } from '../engine-utils';
import { EngineEvaluation } from '../domain-types';

describe('parseEngineInfo', () => {
    it('should parse a basic cp evaluation for white', () => {
        const msg = 'info depth 10 seldepth 14 multipv 1 score cp 45 nodes 12345 pv e2e4 e7e5';
        const result = parseEngineInfo(msg, 'w');

        expect(result.score).toBe(0.45);
        expect(result.isMate).toBe(false);
        expect(result.multipv[0].move).toBe('e2e4');
        expect(result.multipv[0].score).toBe(0.45);
    });

    it('should parse a cp evaluation for black side', () => {
        // From black's perspective, +45 means black is better.
        // But our unified score is positive for WHITE advantage.
        // So info score cp 45 when it's black's turn means -0.45 in our unified system.
        const msg = 'info depth 10 score cp 45 pv d7d5';
        const result = parseEngineInfo(msg, 'b');

        expect(result.score).toBe(-0.45);
        expect(result.multipv[0].move).toBe('d7d5');
    });

    it('should parse mate scores correctly', () => {
        const msg = 'info depth 20 score mate 5 pv h7h8q';
        const result = parseEngineInfo(msg, 'w');

        expect(result.isMate).toBe(true);
        expect(result.mateMoves).toBe(5);
        expect(result.score).toBe(999);
    });

    it('should handle multiples MultiPV updates', () => {
        let evalu: EngineEvaluation = { score: null, isMate: false, mateMoves: null, bestMove: null, multipv: [] };

        const msg1 = 'info depth 10 multipv 1 score cp 10 pv e2e4';
        evalu = parseEngineInfo(msg1, 'w', evalu);

        const msg2 = 'info depth 10 multipv 2 score cp -50 pv d2d4';
        evalu = parseEngineInfo(msg2, 'w', evalu);

        expect(evalu.multipv.length).toBe(2);
        expect(evalu.multipv[0].move).toBe('e2e4');
        expect(evalu.multipv[1].move).toBe('d2d4');
        expect(evalu.score).toBe(0.1); // remains multipv 1
    });
});
