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
    refreshButton = document.createElement('button')
    refreshButton.className = 'execution-refresh-details'
    refreshButton.id = `status-${bot_name}`
    statusHeader.appendChild(refreshButton)
    refreshButton.addEventListener('click',refreshBotsActivities)
}

function createRefreshOutputElement(bot_name){
    var outputHeader = document.getElementById('output_header')
    refreshButton = document.createElement('button')
    refreshButton.className = 'execution-refresh-details'
    refreshButton.id = `output-${bot_name}`
    outputHeader.appendChild(refreshButton)
    refreshButton.addEventListener('click',refreshBotsOutput)
}


function buildBotsDescriptionElements(data){
    console.log(data)
    var botInfo = sortDataByTimestamp(data)
    var botName = document.getElementById("bot_name");
    var botDescription = document.getElementById("bot_description");
    var botDepartment = document.getElementById("bot_department");
    var botTasks = document.getElementById("bot_tasks");
    var botStart = document.getElementById("start_bot");
    var botEnd = document.getElementById("end_bot");

    createRefreshActivitiesElement(botInfo[0].bot_name)
    createRefreshOutputElement(botInfo[0].bot_name)

    botName.innerText = botInfo[0].bot_name.split('_').join(" ")
    botDescription.innerText = botInfo[0].bot_description
    botDepartment.innerText = botInfo[0].bot_name.split('_')[1]
    botStart.value = `${botInfo[0].bot_name}|${botInfo[0].pc_path}`

    botStart.addEventListener('click',postStartBot)
    botEnd.addEventListener('click',postEndBot)

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
    var refreshButton = event.target;
    bot_name = refreshButton.id
    bot_name = bot_name.replace('status-','')
    removeLastTable()
    return getBotsTableActivities(bot_name);
}

function refreshBotsOutput(event){
    var refreshButton = event.target;
    bot_name = refreshButton.id
    getBotOutput(bot_name);
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

function removeLastOutput(){
    var lastOutput = document.querySelectorAll('.execution-modal-content-bots-status-output')
    if (lastOutput){
        lastOutput.forEach(item=>item.remove())
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

function startBot(data){
    var bot_start = document.getElementById("start_bot");
    var bot_end = document.getElementById("end_bot");
    var bot_output = document.getElementById("bot_output");
    console.log(data['PID'])
    bot_end.value = data['PID']
    bot_output.setAttribute("data-pid", data['PID']);
    bot_start.disabled = true;
    const intervalId = setInterval(() => {
        bot_output.setAttribute("data-intervalId", intervalId);
        console.log(intervalId)
        getBotOutput();
    }, 2000);
}

function botOutput(data){
    var bot_output = document.getElementById("bot_output");

    console.log(data)
    bot_output.style.display='flex';
    bot_output.textContent = data.message;

    clearIntervalOutput(data)

}

function clearIntervalOutput(data){
    var bot_start = document.getElementById("start_bot");
    var bot_output = document.getElementById("bot_output");
    var intervalId = bot_output.getAttribute("data-intervalId");
    console.log(intervalId);

    if (processFinished(data.message) & intervalId) {
        clearInterval(intervalId); // Stop fetching
        console.log('Process finished.');
        //bot_output.textContent = '';
        //bot_output.style.display='none';
        console.log('Enable the button start again')
        bot_start.disabled = false;

    }
}

function getBotsDepartments(){
    return fetchModel('GET','botsDepartments',buildBotsDepartmentsElements)
}

function searchBot(search){
    return fetchModel('GET',`botsSearch/${search}`,buildBotsElements)
}

function getBotsInfo(bot_name){
    return fetchModel('GET',`botsInfo/${bot_name}`,
    (data)=>buildBotsDescriptionElements(data))
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

function getBotOutput(pid=null){
    if (pid === null){
        var bot_output = document.getElementById("bot_output");
        var pid = bot_output.getAttribute("data-pid");
    }
    
    console.log('pid getBotOutput:',pid);
    fetchModel('GET',`getBotOutput?pid=${pid}`,botOutput)
}

function postStartBot(){
    var bot_start = document.getElementById("start_bot");
    body = JSON.stringify({"path_bot":bot_start.value})
    console.log(body)
    fetchModel('POST','startBot',startBot,body)
}

function postEndBot(){
    var bot_end = document.getElementById("end_bot");
    body = JSON.stringify({"pid":bot_end.value})
    console.log(body)
    fetchModel('POST','endBot',clearIntervalOutput,body)
}

