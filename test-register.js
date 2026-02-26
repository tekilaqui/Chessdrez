async function testRegister() {
    try {
        const response = await fetch('http://localhost:3000/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: 'test' + Math.random() + '@gmail.com',
                password: 'password123',
                name: 'Test User'
            })
        });
        const data = await response.json();
        console.log('Registration status:', response.status);
        console.log('Registration data:', JSON.stringify(data, null, 2));
    } catch (error) {
        console.error('Request failed:', error.message);
    }
}

testRegister();
