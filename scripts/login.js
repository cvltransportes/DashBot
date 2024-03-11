function disableLoginButton(minutes) {
    const loginBtn = document.getElementById('login-btn');
    loginBtn.disabled = true;

    let seconds = minutes * 60;
    const intervalId = setInterval(() => {
        if (seconds <= 0) {
            clearInterval(intervalId);
            loginBtn.disabled = false;
            loginBtn.value = 'Login';
            loginBtn.style.color = ''
            loginBtn.style.width = ''
        } else {
            loginBtn.value = `Please wait ${seconds} seconds`;
            loginBtn.style.color = 'white'
            loginBtn.style.width = '15em'
            seconds--;
        }
    }, 1000);
}

document.getElementById('signin-form').addEventListener('submit', function(event) {
    event.preventDefault();
    showLoaderLogin()
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;

    fetchWithRedundancy(baseUrls, 'login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: username, password: password }),
    })
    .then(data => {
        if (data.access_token) {
            // Store the JWT for future requests
            sessionStorage.setItem('jwt', data.access_token);
            // Redirect to dashboard or appropriate page
            window.location.href = './pages/execution.html';
            var header_username = document.getElementById('header_username')
            header_username.innerText = username
        } else {
            // Display message and start countdown if wait time is provided
            if (data.message.includes('Try again in')) {
                let waitTime = parseInt(data.message.split(' ')[3]);
                disableLoginButton(waitTime);
            } else {
                alert(data.message);
            }
        }
    })
    .catch(error => {
        console.error('Error:', error);
        //window.location.href = './index.html'; // Redirect to login page
    })
    .finally(()=>hideLoaderLogin())
});
