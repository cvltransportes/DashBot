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


function getBotsDepartments(){
    return fetchModel('GET','botsDepartments',buildBotsDepartmentsElements)
}

function getBotsRunning(){
    return fetchModel('GET','botsRunning',changeColorStatusBotsRunning)
}

function searchBot(search,department){
    return fetchModel('GET',`botsSearch?search=${search}&department=${department}`,buildBotsElements)
}

function getBotsInfo(bot_name){
    return fetchModel('GET',`botsInfo/${bot_name}`,
    (data)=>buildBotsDescriptionElements(data))
}

function getBotsName(department){
    return fetchModel('GET',`botsName/${department}`,buildBotsElements)

}

function getBotsTableActivities(bot_name){
    fetchModel('GET',`botsStatus/${bot_name}`,createBotActivitiesTable)
    .catch(error=>{
        showEmptyBotActivitiesTable()
    })
    .finally(()=>hideLoader())
}

function getBotOutput(pid=null){
    fetchModel('GET',`getBotOutput?pid=${pid}`,writeBotOutput)
}

function postStartBot(){
    showLoader()
    var bot_start = document.getElementById("start_bot");
    body = JSON.stringify({"path_bot":bot_start.value})
    console.log(body)
    fetchModel('POST','startBot',startBot,body)
    .then(()=>{
        setTimeout(function() {
            bot_start.style.backgroundColor = '';
        }, 2000);
    })
    .finally(()=>hideLoader())
}

function postEndBot(){
    var bot_end = document.getElementById("end_bot");
    body = JSON.stringify({"pid":bot_end.value})
    console.log(body)
    fetchModel('POST','endBot',clearIntervalOutput,body)
}

