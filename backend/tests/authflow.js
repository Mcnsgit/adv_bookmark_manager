async function testAuthFlow() {
    const baseUrl='http://localhost:3000';
    // Register a user
    const registerResponse = await fetch(`${baseUrl}/api/auth/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: '0cM9Q@example.com', password: 'password123' })
    });

    const registerData = await registerResponse.json();
    console.log('Registration response:', registerData);

    // Login the user
    const loginResponse = await fetch('http://localhost:3000/api/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: '0cM9Q@example.com', password: 'password123', name: 'John Doe' })
    });

    const loginData = await loginResponse.json();
    console.log('Login response:', loginData);

    if (loginData.token) {
console.log('Token received:', loginData.token);
        const bookmarksResponse = await fetch('http://localhost:3000/api/bookmarks', {
            headers: {
                'Authorization': `Bearer ${loginData.token}`
            }
        });

        const bookmarksData = await bookmarksResponse.json();
        console.log('Bookmarks response:', bookmarksData);
    }
}

testAuthFlow();