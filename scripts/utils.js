const headers= {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + sessionStorage.getItem('jwt'),
    'ngrok-skip-browser-warning': '69420'
}

function fetchModel(method,endpoint,func,body=null){
    return fetch(`${baseUrlApi}/${endpoint}`, {
        method: method,
        headers: headers,
        body: body,
    })
    .then(response => {
        if (response.ok){
            return response.json()
        }
       else if ([403, 401].includes(response.status)){
            alert('Unauthorized or Unauthenticated!')
            window.location.href = '../index.html';
       }
       else{
        throw new Error('Response not okay!');
       }
    })
    .then(data => {
        if (data){
            func(data)
        }
        else{
            throw new Error('No data found!');
        }
    })
    .catch((error) => {
        console.error('Error:', error);
        throw new Error(error);
    });
}

function sortDataByTimestamp(data) {
    data.sort((a, b) => {
        return a.task_start_time - b.task_start_time;
    });
    return data
}

function formatUTCDate(timestamp) {
    var date = new Date(timestamp);
    var year = date.getUTCFullYear();
    var month = String(date.getUTCMonth() + 1).padStart(2, '0'); // months are zero-indexed
    var day = String(date.getUTCDate()).padStart(2, '0');
    var hours = String(date.getUTCHours()).padStart(2, '0');
    var minutes = String(date.getUTCMinutes()).padStart(2, '0');
    var seconds = String(date.getUTCSeconds()).padStart(2, '0');

    return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
}

function capitalizeString(str) {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

function validateCPF(cpf) {
    // Implement CPF validation algorithm here
    // Return true if valid, false otherwise
    // Placeholder implementation (replace with actual validation logic)
    return cpf.length === 11;
}