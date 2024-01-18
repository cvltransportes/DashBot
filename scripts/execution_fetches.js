const headers= {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + sessionStorage.getItem('jwt'),
    'ngrok-skip-browser-warning': '69420'
}

function fetchModel(method,endpoint,func){
    return fetch(`${baseUrlApi}/${endpoint}`, {
        method: method,
        headers: headers,
    })
    .then(response => {
        if (response.ok){
            return response.json()
        }
       else if (response.status===401){
            alert('!')
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
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}

function buildBotsElements(data){
    var botInfo = data//JSON.parse(data)
    let previousElement =  document.querySelectorAll('.execution_content_container')
    if (previousElement){
        previousElement.forEach(item=>item.remove())
    } 
    
    var executionContainer = document.querySelector('.execution_content')
    botsList = []
    for (let key in botInfo.bot_name){
        var botTextName = botInfo.bot_name[key]
        if (!botsList.includes(botTextName)){
            botsList.push(botTextName)
            newBotNode = document.createElement('div')
            newBotNode.innerText = botTextName.split("_").join(" ")
            newBotNode.classList.add('execution_content_container')
            newBotNode.id = botTextName
            executionContainer.appendChild(newBotNode)
        } 
        
    }
    var divs = document.querySelectorAll('.execution_content_container');
    // Add click event listener to each div
    divs.forEach(function(div) {
        div.addEventListener('click', openBotDetails);
    });
}

function buildBotsDepartmentsElements(data){
    var botsDepartments = data//JSON.parse(data)
    var selectDepartments = document.getElementById("select_department");
    for (let key in botsDepartments.department){
        optionDepartment = document.createElement('option')
        optionDepartment.innerText = botsDepartments.department[key]
        optionDepartment.value = botsDepartments.department[key]
        selectDepartments.appendChild(optionDepartment)
    }
}

function createRefreshActivitiesElement(bot_name){
    var statusHeader = document.getElementById('status_header')

    refreshInput = document.createElement('input')
    refreshInput.className = 'execution-refresh-details'
    refreshInput.id = bot_name
    statusHeader.appendChild(refreshInput)
    refreshInput.addEventListener('click',refreshBotsActivities)
}

function buildBotsDescriptionElements(data){
    var botInfo = data//JSON.parse(data)
    var botName = document.getElementById("bot_name");
    var botDescription = document.getElementById("bot_description");
    var botDepartment = document.getElementById("bot_department");

    createRefreshActivitiesElement(botInfo.bot_name[0])

    botName.innerText = botInfo.bot_name[0].split('_').join(" ")
    botDescription.innerText = botInfo.bot_description[0]
    botDepartment.innerText = botInfo.bot_name[0].split('_')[1]
    botDetails.style.display = "block";
}

function deleteRefreshElements(){
    var lastRefresh = document.querySelectorAll('.execution-refresh-details')
    console.log('Refresf elements', lastRefresh)
    lastRefresh.forEach(item=>item.remove())

}

function refreshBotsActivities(event){
    var refreshInput = event.target;
    //var refreshInput = document.querySelector('execution-refresh-details')
    removeLastTable()
    return getBotsTableActivities(refreshInput.id);
}

function buildTableActivities(data){
    if(data){
        createTable(data)
        botDetails.style.display = "block";
    }
    else{
        showEmptyTable()
    }
}

function showEmptyTable(){
    var executionTable = document.querySelector('.execution-modal-content-bots-status-table')
    warning = document.createElement('h3')
    warning.textContent = 'Sem informação disponível'
    warning.className = 'execution-modal-content-without-table'
    executionTable.appendChild(warning)
}

function removeLastTable(){
    var warningTable = document.querySelector('.execution-modal-content-without-table')
    var previousTable = document.querySelectorAll('table')
    if (previousTable){
        previousTable.forEach(item=>item.remove())
    }
    if (warningTable){
        warningTable.remove()
    }
    
}

function sortColumnsBotsTable(jsonObject){
    listKeys = [
        'nome do bot',
        'nome tarefa',
        'status da tarefa',
        'inicio da tarefa',
        'final da tarefa',
        'duração da tarefa',
        'erro',
        'localização no computador',
        'resultado da tarefa', 
        'usuario',
        'versão do bot'
    ]
    let sortedObject = {};

    listKeys.forEach(key => {
        sortedObject[key] = jsonObject[key];
    });

    console.log(sortedObject);
    return sortedObject
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

// Function to create a table
function createTable(data) {
    console.log(data)
    data = sortColumnsBotsTable(data)
    var executionTable = document.querySelector('.execution-modal-content-bots-status-table')
    // Create a table element
    let table = document.createElement('table');

    // Create the table header row
    let tr = document.createElement('tr');
    for (let key in data) {
        let th = document.createElement('th');
        th.textContent = key;
        tr.appendChild(th);
    }
    table.appendChild(tr)

    // Create table rows from JSON data
    for (let row in data['nome do bot']) {
        console.log(row)
        let tr = document.createElement('tr');
        tr.className='execution-table-row'
        for (col in data) {
            let td = document.createElement('td');
            td.textContent = data[col][row];
            if (col ==='inicio da tarefa' || col ==='final da tarefa'){
                td.textContent = (data[col][row]>0)?formatUTCDate(data[col][row]):null;
            }
            td.className='execution-table-col'
            tr.appendChild(td)
        }
        table.appendChild(tr)
    }

    // Append the table to the body or another element in the page
    executionTable.appendChild(table);  // or another container element
}

function openBotDetails(event) {
    var clickedDiv = event.target;
    deleteRefreshElements()
    removeLastTable()
    getBotsInfo(clickedDiv.id)
        .then(()=>{
            return getBotsTableActivities(clickedDiv.id);
        })
        .then(()=>{
            console.log('Bot information loaded sucessfully')
        })
        .catch(error=>{
            console.log('An error occurred', error);
        })

}

function getBotsDepartments(){
    return fetchModel('GET','botsDepartments',buildBotsDepartmentsElements)
}

function searchBot(search){
    return fetchModel('GET',`botsSearch/${search}`,buildBotsElements)
}

function getBotsInfo(bot_name){
    return fetchModel('GET',`botsInfo/${bot_name}`,buildBotsDescriptionElements)
}

function getBotsName(department){
    return fetchModel('GET',`botsName/${department}`,buildBotsElements)

}

function getBotsTableActivities(bot_name){
    showLoader();
    fetchModel('GET',`botsStatus/${bot_name}`,buildTableActivities)
    .then(()=>hideLoader())
}