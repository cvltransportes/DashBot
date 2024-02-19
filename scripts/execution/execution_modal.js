var intervalsStarted=[]

function openBotDetails(event) {
    var clickedDiv = event.target.closest('.execution_content_container')
    bot_id = clickedDiv.id
    
    showLoader();
    deleteRefreshActivitiesElements()
    removeLastTable()
    clearBotOutput()
    getBotsInfo(bot_id)
        .then(()=>{
            return getBotsTableActivities(bot_id);
        })
        .then(()=>{
            console.log('Bot information loaded sucessfully')
        })
        .catch(error=>{
            console.log('An error occurred', error);
        })
        .finally(()=>hideLoader())

}

function deleteRefreshActivitiesElements(){
    var lastRefresh = document.querySelectorAll('.execution-refresh-details')
    console.log('Refresh elements', lastRefresh)
    lastRefresh.forEach(item=>item.remove())

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

function buildBotsDescriptionElements(data){
    console.log(data)
    var botInfo = sortDataByTimestamp(data)
    var botName = document.getElementById("bot_name");
    var botDescription = document.getElementById("bot_description");
    var botDepartment = document.getElementById("bot_department");
    
    var botStart = document.getElementById("start_bot");
    var botEnd = document.getElementById("end_bot");
    var botSchedule = document.getElementById("schedule_bot");
    var botMenu = document.getElementById("menu_bot");

    createRefreshActivitiesElement(botInfo[0].bot_name)
    createRefreshOutputElement(botInfo[0].bot_name)

    botName.innerText = botInfo[0].bot_name.split('_').join(" ") + ` - (${botInfo[0].classification})`
    botDescription.innerText = botInfo[0].bot_description
    botDepartment.innerText = botInfo[0].bot_name.split('_')[1]
    botStart.value = botInfo[0].bot_name

    if (botInfo[0].classification==='server'){
        botStart.disabled = false
        botEnd.disabled = false
        botSchedule.disabled = true
        botMenu.disabled = true
        botStart.addEventListener('click',postStartBot)
        botEnd.addEventListener('click',postEndBot)
    }
    else{
        botStart.disabled = true
        botEnd.disabled = true
        botSchedule.disabled = true
        botMenu.disabled = true
    }
    

    deleteBotTasksElements()

    createBotTasksElements(botInfo)
    
    botDetails.style.display = "block";
    
}

function deleteBotTasksElements(){
    var lastTasks = document.querySelectorAll('.execution-bot-tasks')
    lastTasks.forEach(item=>item.remove())
}

function createBotTasksElements(botInfo){
    var botTasks = document.getElementById("bot_tasks");

    for (obj in botInfo){
        console.log(botInfo[obj].task_name)
        var p = document.createElement('p')
        p.className='execution-bot-tasks'
        p.innerText = botInfo[obj].task_name
        botTasks.appendChild(p)
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

function refreshBotsActivities(event){
    var refreshButton = event.target;
    bot_name = refreshButton.id
    bot_name = bot_name.replace('status-','')
    removeLastTable()
    return getBotsTableActivities(bot_name);
}

function createRefreshOutputElement(bot_name){
    var outputHeader = document.getElementById('output_header')
    refreshButton = document.createElement('button')
    refreshButton.className = 'execution-refresh-details'
    refreshButton.id = `output-${bot_name}`
    outputHeader.appendChild(refreshButton)
    refreshButton.addEventListener('click',refreshBotsOutput)
}

function refreshBotsOutput(event){
    var refreshButton = event.target;
    bot_name = refreshButton.id
    setIntervalGetBotOutput(bot_name)
}

function setIntervalGetBotOutput(pid){
    intervalsStarted.forEach(item=>clearInterval(item))

    const intervalId = setInterval(() => {
        intervalsStarted.push(intervalId)
        getBotOutput(pid);
    }, 2000);
}

function startBot(data){
    var bot_start = document.getElementById("start_bot");
    var bot_end = document.getElementById("end_bot");
    bot_start.style.backgroundColor = 'green'
    bot_end.value = data['PID']
    setIntervalGetBotOutput(data['PID'])
}

function writeBotOutput(data){
    var bot_output = document.getElementById("bot_output");

    bot_output.style.display='flex';
    bot_output.textContent = data.message;

    clearIntervalOutput(data)

}

function clearBotOutput(){
    var bot_output = document.getElementById("bot_output");
    bot_output.textContent = '';
    bot_output.style.display='none';
    intervalsStarted.forEach(item=>clearInterval(item))
}

function clearIntervalOutput(data){
    if (processFinished(data.message)) {
        intervalsStarted.forEach(item=>clearInterval(item))
        console.log('Process finished.');
        if (!data.message.includes('Sem processos em execução nessa sessão!')){
            var refreshButton = document.getElementById('status_header').querySelector('button')
            bot_name = refreshButton.id.replace('status-','')
            alert(`Processo Finalizado para o ${bot_name}!`)
            refreshButton.click()
        }
        else{
            alert(`Sem processos em execução nessa sessão! para ${bot_name}!`)
        }
    }
}

function processFinished(output) {
    return output.includes("#Process Completed#");
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

    return sortedList
}

function createBotActivitiesTable(data) {
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

function showEmptyBotActivitiesTable(){
    var executionTable = document.getElementById('table_status')
    warning = document.createElement('h3')
    warning.textContent = 'Sem informação disponível'
    warning.className = 'execution-modal-content-without-table'
    executionTable.appendChild(warning)
}

