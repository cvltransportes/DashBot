var headerImg = document.getElementById("header_icon");
var headerLogout = document.getElementById("button_sign__out")
var menu = document.getElementById("modal_menu");

function openMenu() {
    menu.style.display="flex";
}

function logout(){
    sessionStorage.removeItem('jwt');
    window.location.href = '../index.html';
    return fetchModel('POST','logout',alert)
}

headerImg.addEventListener('click',openMenu)
headerLogout.addEventListener('click',logout)
