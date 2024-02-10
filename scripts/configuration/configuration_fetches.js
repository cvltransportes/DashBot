function getUsers(){
    return fetchModel('GET','users',createTableUsers)
}

function postNewUser(userForm){
    showLoader()
    body = JSON.stringify(userForm)
    console.log(body)
    fetchModel('POST','register',onResponseRegisterNewUser,body)
    .finally(()=>hideLoader())
}

function postDeleteUser(user_id){
    showLoader()
    body = JSON.stringify({'user_id':user_id})
    console.log(body)
    fetchModel('POST','deleteUser',data=>console.log(data),body)
    .finally(()=>hideLoader())
}