import { CommentEngine } from '../index';
import { CommentTranslator } from '../templates/translator';
import { testCases } from './testData';

async function runTests() {
    console.log('🚀 Running Comment Engine Validation...\n');
    let passed = 0;
    const startTime = performance.now();

    for (const tc of testCases) {
        const start = performance.now();
        const comment = CommentEngine.generateComment(tc.fenBefore, tc.fenAfter, tc.evals);
        const translated = CommentTranslator.translate(comment, 'es');
        const end = performance.now();
        const duration = end - start;

        let success = true;
        if (tc.expectedCategory && comment.category !== tc.expectedCategory) success = false;
        if (tc.expectedHeuristic && !comment.heuristics.some(h => h.id === tc.expectedHeuristic)) success = false;

        if (success) {
            passed++;
            console.log(`✅ [${tc.name}] - ${duration.toFixed(2)}ms`);
        } else {
            console.log(`❌ [${tc.name}] - Expected ${tc.expectedCategory || tc.expectedHeuristic}, got ${comment.category}`);
            console.log(`   Internal: ${JSON.stringify(comment)}`);
        }
    }

    const totalTime = performance.now() - startTime;
    const avgTime = totalTime / testCases.length;

    console.log(`\n📊 RESULTS: ${passed}/${testCases.length} sequences passed.`);
    console.log(`⏱  AVERAGE TIME: ${avgTime.toFixed(2)}ms per move.`);

    if (avgTime > 5) {
        console.log('⚠️  PERFORMANCE WARNING: Average time exceeds 5ms limit.');
    } else {
        console.log('✅ PERFORMANCE OK.');
    }

    if (passed === testCases.length) {
        process.exit(0);
    } else {
        process.exit(1);
    }
}

runTests().catch(err => {
    console.error(err);
    process.exit(1);
});
