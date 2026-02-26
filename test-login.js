async function testLogin() {
    const ip = '192.168.1.37';
    try {
        const response = await fetch(`http://${ip}:3000/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: 'tekilaqui@gmail.com',
                password: 'password123'
            })
        });
        const data = await response.json();
        console.log('Login status:', response.status);
        console.log('Login data:', JSON.stringify(data, null, 2));
    } catch (error) {
        console.error('Request failed:', error.message);
    }
}

testLogin();
