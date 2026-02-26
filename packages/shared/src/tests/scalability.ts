import axios from 'axios';

const API_URL = process.env.VITE_API_URL || 'http://localhost:3000';
const CONCURRENT_USERS = 50;
const REQUESTS_PER_USER = 5;

async function simulateUser(id: number) {
    let success = 0;
    let errors = 0;
    const start = Date.now();

    for (let i = 0; i < REQUESTS_PER_USER; i++) {
        try {
            // Simulate common requests (publicly accessible or mocked)
            // Note: Since we reset the DB, we might need to hit health checks or public puzzles
            await axios.get(`${API_URL}/puzzles/next?difficulty=normal`);
            success++;
        } catch (err: any) {
            errors++;
        }
    }

    const duration = Date.now() - start;
    return { id, success, errors, duration };
}

async function runScalabilityTest() {
    console.log(`🚀 Starting Scalability Test: ${CONCURRENT_USERS} concurrent users...`);
    const startTime = Date.now();

    const users = Array.from({ length: CONCURRENT_USERS }, (_, i) => simulateUser(i));
    const results = await Promise.all(users);

    const totalTime = Date.now() - startTime;
    const totalSuccess = results.reduce((acc, r) => acc + r.success, 0);
    const totalErrors = results.reduce((acc, r) => acc + r.errors, 0);
    const avgDuration = results.reduce((acc, r) => acc + r.duration, 0) / CONCURRENT_USERS;

    console.log('\n📊 SCALABILITY RESULTS:');
    console.log(`⏱  Total Time: ${totalTime}ms`);
    console.log(`✅ Successes: ${totalSuccess}`);
    console.log(`❌ Errors: ${totalErrors}`);
    console.log(`平均 User Duration: ${avgDuration.toFixed(2)}ms`);

    const errorRate = (totalErrors / (totalSuccess + totalErrors)) * 100;
    console.log(`📉 Error Rate: ${errorRate.toFixed(2)}%`);

    if (errorRate < 0.1) {
        console.log('✅ SCALABILITY OK: Error rate < 0.1%');
        process.exit(0);
    } else {
        console.log('⚠️  SCALABILITY WARNING: High error rate.');
        process.exit(1);
    }
}

runScalabilityTest().catch(err => {
    console.error('Test failed:', err.message);
    process.exit(1);
});
