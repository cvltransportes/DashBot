const baseUrlApi = 'https://renewed-crab-unbiased.ngrok-free.app/api'

document.getElementById('signin-form').addEventListener('submit', function(event) {
    event.preventDefault();
    showLoaderLogin()
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;

    fetch(`${baseUrlApi}/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: username, password: password }),
    })
    .then(response => response.json())
    .then(data => {
        if (data.access_token) {
            // Store the JWT for future requests
            sessionStorage.setItem('jwt', data.access_token);
            // Redirect to dashboard or appropriate page
            window.location.href = './pages/execution.html';
            var header_username = document.getElementById('header_username')
            header_username.innerText = username
        } else {
            // Handle login failure
            alert('Invalid credentials');
        }
    })
    .catch(error => {
        console.error('Error:', error);
    })
    .finally(()=>hideLoaderLogin())
});
