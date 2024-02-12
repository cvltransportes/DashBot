function getUsers(){
    return fetchModel('GET','users',createTableUsers)
}

function postNewUser(userForm){
    body = JSON.stringify(userForm)
    console.log(body)
    return fetchModel('POST','register',onResponseRegisterNewUser,body)
}

function postDeleteUser(user_id){
    body = JSON.stringify({'user_id':user_id})
    console.log(body)
    return fetchModel('POST','deleteUser',data=>console.log(data),body)
}