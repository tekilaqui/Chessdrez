import axios from 'axios';

const API_URL = process.env.API_URL || 'http://localhost:3000';
const CONCURRENT_USERS = 50;
const REQUESTS_PER_USER = 10;

async function simulateUser(userId: number) {
    console.log(`User ${userId} starting...`);
    for (let i = 0; i < REQUESTS_PER_USER; i++) {
        try {
            // Simulating typical ARQ 3 critical path requests
            await axios.get(`${API_URL}/puzzles/next`, {
                headers: { Authorization: `Bearer MOCK_TOKEN_${userId}` }
            });
            await new Promise(resolve => setTimeout(resolve, 100));
        } catch (error: any) {
            console.error(`User ${userId} request ${i} failed: ${error.message}`);
        }
    }
    console.log(`User ${userId} finished.`);
}

async function runLoadTest() {
    console.log(`Starting load test with ${CONCURRENT_USERS} concurrent users...`);
    const start = Date.now();

    const users = Array.from({ length: CONCURRENT_USERS }, (_, i) => simulateUser(i));
    await Promise.all(users);

    const duration = (Date.now() - start) / 1000;
    console.log(`Load test completed in ${duration}s`);
}

runLoadTest().catch(console.error);
