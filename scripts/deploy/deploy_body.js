let intervalsStarted=[]

function buildReposSelectConfigElements(data){
    console.log(data)
    var botsInfo = data
    var selectBotConfig = document.getElementById("repos_select_name");
    for (let row in botsInfo){
        optionBotConfig = document.createElement('option')
        optionBotConfig.innerText = botsInfo[row].name
        optionBotConfig.value = botsInfo[row].url
        selectBotConfig.appendChild(optionBotConfig)
    }
}


function setIntervalGetBotOutput(pid){
    intervalsStarted.forEach(item=>clearInterval(item))

    const intervalId = setInterval(() => {
        intervalsStarted.push(intervalId)
        getBotOutput(pid);
    }, 2000);
}

function startBot(data){
    setIntervalGetBotOutput(data['PID'])
}

function writeBotOutput(data){
    var deploy_output = document.getElementById("deploy_output");
    deploy_output.textContent = data.message;
    clearIntervalOutput(data)

}

function clearBotOutput(){
    var bot_output = document.getElementById("deploy_output");
    bot_output.textContent = '';
    intervalsStarted.forEach(item=>clearInterval(item))
}

function clearIntervalOutput(data){
    if (processFinished(data.message)) {
        intervalsStarted.forEach(item=>clearInterval(item))
        console.log('Process finished.');
    }
}

function processFinished(output) {
    return output.includes("#Process Completed#");
}