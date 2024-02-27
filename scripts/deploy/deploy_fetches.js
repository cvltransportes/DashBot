function getRepos(){
    return fetchModel('GET',`reposAvailable`,buildReposSelectConfigElements)
}

function cloneRepo(repo_name){
    body = JSON.stringify({
        'repo_name':repo_name
    })
    return fetchModel('POST','cloneRepo',(data)=>{
        getBotOutput(data.PID)
    },body)
}

function installRepo(repo_name){
    body = JSON.stringify({
        'repo_name':repo_name
    })
    return fetchModel('POST','installRepo',(data)=>{
        setIntervalGetBotOutput(data.PID)
    },body)
}

function getBotOutput(pid=null){
    fetchModel('GET',`getBotOutput?pid=${pid}`,writeBotOutput)
}

function postStartBot(bot_name){
    showLoader()
    bot_name = bot_name.split('/')[1]
    body = JSON.stringify({"path_bot":bot_name})
    console.log(body)
    fetchModel('POST','startBot',startBot,body)
    .then((data)=>{
        console.log(data)
    })
    .finally(()=>hideLoader())
}