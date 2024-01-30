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

function writeBotBarcode(data){
    var content = document.querySelector('.monitoring_content')
    content.style.color = 'white'
    content.textContent = data.message
}

function getBotBarcodes(){
    return fetchModel('GET','botBarcode',writeBotBarcode)
}

document.addEventListener('DOMContentLoaded', function () {
    getBotBarcodes()
});