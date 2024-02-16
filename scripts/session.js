const baseUrlApi = 'https://renewed-crab-unbiased.ngrok-free.app/api'

document.addEventListener('DOMContentLoaded', function() {
    // Check if JWT token is stored in sessionStorage (or localStorage)
    var token = sessionStorage.getItem('jwt');

    // If no token is found, redirect to the login page
    if (!token) {
        window.location.href = '../index.html'; // Redirect to login page
    }

    // Optional: Verify the token's validity with the backend
    // This step depends on whether your backend exposes an endpoint for token validation
    fetch(`${baseUrlApi}/validate-token`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Token validation failed');
        }
        return response.json();
    })
    .then(data => {
        if (!data.isValid) {
            sessionStorage.removeItem('jwt');
            window.location.href = '../index.html'; // Redirect to login page
        }
    })
    .catch(error => {
        console.error('Error:', error);
        sessionStorage.removeItem('jwt');
        window.location.href = '../index.html'; // Redirect to login page
    });
});
