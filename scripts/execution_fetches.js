function buildBotsElements(data){
    var botInfo = JSON.parse(data)
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
    var botsDepartments = JSON.parse(data)
    var selectDepartments = document.getElementById("select_department");
    for (let key in botsDepartments.department){
        optionDepartment = document.createElement('option')
        optionDepartment.innerText = botsDepartments.department[key]
        optionDepartment.value = botsDepartments.department[key]
        selectDepartments.appendChild(optionDepartment)
    }
}

function getBotsDepartments(){
    // Post the message to the API
    return fetch(`${baseUrlApi}/botsDepartments`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then(response => response.json())
    .then(data => {
        if (data){
            buildBotsDepartmentsElements(data)
            
        }

    })
    .catch((error) => {
        console.error('Error:', error);
        
    });
}

function searchBot(search){
    // Post the message to the API
    return fetch(`${baseUrlApi}/botsSearch/${search}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then(response => response.json())
    .then(data => {
        if (data){
            buildBotsElements(data)
        }

    })
    .catch((error) => {
        console.error('Error:', error);
        
    });
}

function buildBotsDescriptionElements(data){
    var botInfo = JSON.parse(data)
    var botName = document.getElementById("bot_name");
    var botDescription = document.getElementById("bot_description");
    var botDepartment = document.getElementById("bot_department");
    var botVersion = document.getElementById("bot_version");
    var botUser = document.getElementById("bot_user");
    botName.innerText = botInfo.bot_name[0].split('_').join(" ")
    botDescription.innerText = botInfo.bot_description[0]
    botDepartment.innerText = botInfo.bot_name[0].split('_')[1]
    botDetails.style.display = "block";
}

function getBotsInfo(bot_name){
    // Post the message to the API
    return fetch(`${baseUrlApi}/botsInfo/${bot_name}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then(response => response.json())
    .then(data => {
        buildBotsDescriptionElements(data)
    })
    .catch((error) => {
        console.error('Error:', error);
        
    });
}


function getBotsName(department){
    // Post the message to the API
    return fetch(`${baseUrlApi}/botsName/${department}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then(response => response.json())
    .then(data => {
        if (data){
            buildBotsElements(data)
        }
        
    })
    .catch((error) => {
        console.error('Error:', error);
        
    });
}

function getBotsTableActivities(bot_name){
    showLoader();
    return fetch(`${baseUrlApi}/botsStatus/${bot_name}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then(response => response.json())
    .then(data => {
        if(data){
            var botStatus = JSON.parse(data)
            createTable(botStatus)
            botDetails.style.display = "block";
        }
        else{
            showEmptyTable()
        }

    })
    .catch((error) => {
        console.error('Error:', error);
        
    })
    .finally(() => {
        // Hide the loader whether the fetch succeeded or failed
        hideLoader();
    });
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
// Function to create a table
function createTable(data) {
    console.log(data)
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
                td.textContent = new Date(data[col][row]).toISOString();
            }
            td.className='execution-table-col'
            tr.appendChild(td)
        }
        table.appendChild(tr)
    }

    // Append the table to the body or another element in the page
    executionTable.appendChild(table);  // or another container element
}
getBotsName()
    .then(()=>{
        return getBotsDepartments()
    })
    .then(()=>{
        console.log('Bots loaded')
    })
    .catch(error=>{
        console.log('An error occurred: ',error)
    })

