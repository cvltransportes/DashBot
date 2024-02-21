document.addEventListener('DOMContentLoaded', function() {
    // Check if JWT token is stored in sessionStorage (or localStorage)
    var token = sessionStorage.getItem('jwt');

    // If no token is found, redirect to the login page
    if (!token) {
        window.location.href = '../index.html'; // Redirect to login page
    }

    fetchWithRedundancy(baseUrls, 'validate-token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
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
