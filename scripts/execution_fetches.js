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

function buildBotsElements(data){
    var botInfo = data
    let previousElement =  document.querySelectorAll('.execution_content_container')
    if (previousElement){
        previousElement.forEach(item=>item.remove())
    } 
    
    var executionContainer = document.querySelector('.execution_content')
    botsList = []
    for (let row in botInfo){
        var botTextName = botInfo[row].bot_name
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
    console.log(data)
    var botsDepartments = data
    var selectDepartments = document.getElementById("select_department");
    for (let row in botsDepartments){
        optionDepartment = document.createElement('option')
        optionDepartment.innerText = botsDepartments[row].department
        optionDepartment.value = botsDepartments[row].department
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
    console.log(data)
    //data = transformDataBotsInfo(data)
    var botInfo = sortDataByTimestamp(data)
    var botName = document.getElementById("bot_name");
    var botDescription = document.getElementById("bot_description");
    var botDepartment = document.getElementById("bot_department");
    var botTasks = document.getElementById("bot_tasks");
    var botStart = document.getElementById("start_bot");
    var botEnd = document.getElementById("end_bot");

    createRefreshActivitiesElement(botInfo[0].bot_name)

    botName.innerText = botInfo[0].bot_name.split('_').join(" ")
    botDescription.innerText = botInfo[0].bot_description
    botDepartment.innerText = botInfo[0].bot_name.split('_')[1]
    botStart.value = botInfo[0].pc_path

    botStart.addEventListener('click',startBot)
    botEnd.addEventListener('click',endBot)

    deleteBotTasksElements()

    for (obj in botInfo){
        console.log(botInfo[obj].task_name)
        var p = document.createElement('p')
        p.className='execution-bot-tasks'
        p.innerText = botInfo[obj].task_name
        botTasks.appendChild(p)
    }
    
    botDetails.style.display = "block";
    
}
function deleteBotTasksElements(){
    var lastTasks = document.querySelectorAll('.execution-bot-tasks')
    lastTasks.forEach(item=>item.remove())
}

function deleteRefreshElements(){
    var lastRefresh = document.querySelectorAll('.execution-refresh-details')
    console.log('Refresh elements', lastRefresh)
    lastRefresh.forEach(item=>item.remove())

}

function refreshBotsActivities(event){
    var refreshInput = event.target;
    removeLastTable()
    return getBotsTableActivities(refreshInput.id);
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
    let sortedList = [];
    
    for (row in jsonObject){
        let sortedObject = {};
        listKeys.forEach(key => {
            sortedObject[key] = jsonObject[row][key];
        });
        sortedList.push(sortedObject)
    }

    console.log(sortedList);
    return sortedList
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


function createTable(data) {
    console.log(data)
    data = sortDataByTimestamp(data)
    data = sortColumnsBotsTable(data)
    var executionTable = document.querySelector('.execution-modal-content-bots-status-table')
    // Create a table element
    let table = document.createElement('table');

    // Create the table header row
    let tr = document.createElement('tr');
    for (let key in data[0]) {
        let th = document.createElement('th');
        th.textContent = key;
        tr.appendChild(th);
    }
    table.appendChild(tr)

    // Create table rows from JSON data
    for (let row in data) {
        let tr = document.createElement('tr');
        tr.className='execution-table-row'
        for (col in data[0]) {
            let td = document.createElement('td');
            td.textContent = data[row][col];
            if (col ==='inicio da tarefa' || col ==='final da tarefa'){
                td.textContent = (data[row][col]>0)?formatUTCDate(data[row][col]):null;
            }
            td.className='execution-table-col'
            tr.appendChild(td)
        }
        table.appendChild(tr)
    }

    // Append the table to the body or another element in the page
    executionTable.appendChild(table);  // or another container element
}

function showEmptyTable(){
    var executionTable = document.getElementById('table_status')
    warning = document.createElement('h3')
    warning.textContent = 'Sem informação disponível'
    warning.className = 'execution-modal-content-without-table'
    executionTable.appendChild(warning)
}

function openBotDetails(event) {
    var clickedDiv = event.target;
    showLoader();
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

function processFinished(output) {
    // Implement logic to determine if the process is finished
    // For example, check if output contains a certain completion message
    return output.includes("#Process Completed#");
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
    fetchModel('GET',`botsStatus/${bot_name}`,createTable)
    .catch(error=>{
        showEmptyTable()
    })
    .finally(()=>hideLoader())
}

function startBot(){
    var botStart = document.getElementById("start_bot");
    var botEnd = document.getElementById("end_bot");
    body = JSON.stringify({"path_bot":botStart.value})
    console.log(body)
    fetchModel('POST','startBot',(data)=>{
        botEnd.value = data['PID']
        const intervalId = setInterval(() => {
            getBotOutput(data['PID'],intervalId);
        }, 2000);
    },body)
}

function endBot(){
    var botEnd = document.getElementById("end_bot");
    body = JSON.stringify({"pid":botEnd.value})
    console.log(body)
    fetchModel('POST','endBot',(data)=>console.log(data),body)
}

function getBotOutput(pid,intervalId){
    var botOutput = document.getElementById("bot_output");
    fetchModel('GET',`getBotOutput?pid=${pid}`,(data)=>{
        console.log(data)
        botOutput.style.display='flex';
        botOutput.textContent = data.message;
        if (processFinished(data.message)) {
            clearInterval(intervalId); // Stop fetching
            console.log('Process finished.');
            botOutput.textContent = '';
            botOutput.style.display='none';
        }
    })
}