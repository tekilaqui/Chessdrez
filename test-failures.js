async function testFailures() {
    const ip = '192.168.1.37';

    console.log('--- Testing Login with WRONG password ---');
    try {
        const response = await fetch(`http://${ip}:3000/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: 'tekilaqui@gmail.com', password: 'wrong' })
        });
        console.log('Status:', response.status);
        console.log('Data:', await response.json());
    } catch (e) { console.error(e); }

    console.log('\n--- Testing Register with EXISTING email ---');
    try {
        const response = await fetch(`http://${ip}:3000/auth/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: 'tekilaqui@gmail.com', password: 'password123', name: 'retry' })
        });
        console.log('Status:', response.status);
        console.log('Data:', await response.json());
    } catch (e) { console.error(e); }
}

testFailures();
