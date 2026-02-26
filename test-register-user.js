async function testRegister() {
    const ip = '192.168.1.37';
    try {
        const response = await fetch(`http://${ip}:3000/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: 'tekilaqui@gmail.com',
                password: 'password123',
                name: 'rt'
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
