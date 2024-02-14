function getUsers(){
    return fetchModel('GET','users',(data)=>createTableUsers(data,'form_user_table'))
}

function postNewUser(userForm){
    body = JSON.stringify(userForm)
    console.log(body)
    return fetchModel('POST','register',onResponseRegisterNewUser,body)
}

function postUpdateUser(userForm){
    body = JSON.stringify(userForm)
    console.log(body)
    return fetchModel('POST','register',onResponseRegisterNewUser,body)
}
function postDeleteUser(user_id){
    body = JSON.stringify({'user_id':user_id})
    console.log(body)
    return fetchModel('POST','deleteUser',data=>console.log(data),body)
}

function postEditUser(user_id){
    body = JSON.stringify({'user_id':user_id})
    console.log(body)
    return fetchModel('POST','deleteUser',data=>console.log(data),body)
}

function getBotsName(department){
    return fetchModel('GET',`botsName/${department}`,buildBotsSelectConfigElements)
}

function postBotSituation(botForm){
    body = JSON.stringify(botForm)
    console.log(body)
    return fetchModel('POST','registerBotSituation',onResponseRegisterNewBotSituation,body)
}

function getBotsSituation(){
    return fetchModel('GET','botsSituation',(data)=>createTableUsers(data,'form_bots_table'))
}