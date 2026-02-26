import { parseEngineInfo } from './engine-utils';

function assert(condition, message) {
    if (!condition) {
        throw new Error('Assertion failed: ' + message);
    }
}

console.log('Running Engine Parsing Tests...');

// Test 1: White CP
const msg1 = 'info depth 10 multipv 1 score cp 45 pv e2e4';
const res1 = parseEngineInfo(msg1, 'w');
assert(res1.score === 0.45, 'White CP score should be 0.45');
assert(res1.multipv[0].move === 'e2e4', 'White move should be e2e4');

// Test 2: Black CP
const msg2 = 'info depth 10 multipv 1 score cp 45 pv d7d5';
const res2 = parseEngineInfo(msg2, 'b');
assert(res2.score === -0.45, 'Black CP score should be -0.45 (unified)');

// Test 3: Mate
const msg3 = 'info depth 20 score mate 5 pv h7h8q';
const res3 = parseEngineInfo(msg3, 'w');
assert(res3.isMate === true, 'Should detect mate');
assert(res3.mateMoves === 5, 'Mate in 5');

// Test 4: Accumulation
let evalu = { score: null, isMate: false, mateMoves: null, bestMove: null, multipv: [] };
evalu = parseEngineInfo('info multipv 1 score cp 10 pv e2e4', 'w', evalu);
evalu = parseEngineInfo('info multipv 2 score cp -50 pv d2d4', 'w', evalu);
assert(evalu.multipv.length === 2, 'Should have 2 moves in multipv');
assert(evalu.multipv[1].move === 'd2d4', 'Second move should be d2d4');

console.log('✅ All Engine Parsing Tests Passed!');
