const headers= {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + sessionStorage.getItem('jwt'),
    'ngrok-skip-browser-warning': '69420'
}

const baseUrls = [
    'https://musical-safe-oriole.ngrok-free.app/api/',
    'https://renewed-crab-unbiased.ngrok-free.app/api/',
    'https://promoted-clear-gibbon.ngrok-free.app/api/'
  ];
  
function fetchWithRedundancy(urls, path, requestOptions) {
    return new Promise((resolve, reject) => {
        const attemptFetch = (urlIndex) => {
        if (urlIndex >= urls.length) {
            reject(new Error('All URLs failed'));
            return;
        }

        fetch(`${urls[urlIndex]}${path}`, requestOptions)
        .then(response => {
            if (response.ok){
                return response.json()
            }
            else if ([403, 401].includes(response.status)){
                    window.location.href = '../index.html';
                    alert('Unauthorized or Unauthenticated!')
            }
            else{
                throw new Error('Response not okay!');
            }
            })
            .then(data => resolve(data))
            .catch(() => {
            console.log(`Attempt with URL ${urls[urlIndex]} failed, trying next URL if available.`);
            attemptFetch(urlIndex + 1);
            });
        };

        attemptFetch(0); // Start with the first URL
    });
}

function fetchModel(method,endpoint,func,body=null){
    return fetchWithRedundancy(baseUrls, endpoint, {
        method: method,
        headers: headers,
        body: body,
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