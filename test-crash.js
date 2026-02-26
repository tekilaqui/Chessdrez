async function testCrash() {
    const baseUrl = 'http://localhost:3000';

    console.log('--- Testing Registration with MISSING EMAIL ---');
    try {
        const res = await fetch(`${baseUrl}/auth/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ password: 'Password123!', name: 'No Email' })
        });
        const data = await res.json();
        console.log('Status:', res.status);
        console.log('Data:', JSON.stringify(data, null, 2));
    } catch (e) {
        console.error('Request failed:', e.message);
    }

    console.log('\n--- Testing Registration with MISSING PASSWORD ---');
    try {
        const res = await fetch(`${baseUrl}/auth/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: 'no_pass@example.com', name: 'No Pass' })
        });
        const data = await res.json();
        console.log('Status:', res.status);
        console.log('Data:', JSON.stringify(data, null, 2));
    } catch (e) {
        console.error('Request failed:', e.message);
    }
}

testCrash();
