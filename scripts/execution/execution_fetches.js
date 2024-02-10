

function getBotsDepartments(){
    return fetchModel('GET','botsDepartments',buildBotsDepartmentsElements)
}

function getBotsRunning(){
    return fetchModel('GET','botsLastStatus',changeColorStatusBotsRunning)
}

function getBotsOperation(operation){
    return fetchModel('GET','botsLastStatus',(data)=>{
        findBotsOperation(data,operation)
        changeColorStatusBotsRunning(data)
    })
}

function searchBot(search,department){
    return fetchModel('GET',`botsSearch?search=${search}&department=${department}`,buildBotsElements)
    
}

function getBotsInfo(bot_name){
    console.log(bot_name)
    return fetchModel('GET',`botsInfo?bot_name=${bot_name}`,buildBotsDescriptionElements)
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
        }, 10000);
    })
    .finally(()=>hideLoader())
}

function postEndBot(){
    var bot_end = document.getElementById("end_bot");
    body = JSON.stringify({"pid":bot_end.value})
    console.log(body)
    bot_end.style.backgroundColor = 'red'
    fetchModel('POST','endBot',clearIntervalOutput,body)
    .then(()=>{
        setTimeout(function() {
            bot_end.style.backgroundColor = '';
        }, 3000);
    })
}

