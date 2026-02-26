async function debugAuth() {
    const baseUrl = 'http://localhost:3000';
    const testEmail = `test_${Date.now()}@example.com`;
    const testPassword = 'Password123!';
    const testName = 'Debug User';

    console.log('--- 1. Testing Registration ---');
    let userId;
    try {
        const res = await fetch(`${baseUrl}/auth/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: testEmail, password: testPassword, name: testName })
        });
        const data = await res.json();
        console.log('Status:', res.status);
        console.log('Data:', JSON.stringify(data, null, 2));
        if (res.status === 201) userId = data.id;
    } catch (e) {
        console.error('Registration failed:', e.message);
    }

    if (!userId) {
        console.log('Skipping login test as registration failed.');
        return;
    }

    console.log('\n--- 2. Testing Login ---');
    let token;
    try {
        const res = await fetch(`${baseUrl}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: testEmail, password: testPassword })
        });
        const data = await res.json();
        console.log('Status:', res.status);
        console.log('Data:', JSON.stringify(data, null, 2));
        if (res.status === 201 || res.status === 200) token = data.access_token;
    } catch (e) {
        console.error('Login failed:', e.message);
    }

    if (!token) {
        console.log('Skipping Profile test as login failed.');
        return;
    }

    console.log('\n--- 3. Testing Get Profile (Me) ---');
    try {
        const res = await fetch(`${baseUrl}/auth/me`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        const data = await res.json();
        console.log('Status:', res.status);
        console.log('Data:', JSON.stringify(data, null, 2));
    } catch (e) {
        console.error('Profile request failed:', e.message);
    }
}

debugAuth();
