var headerImg = document.getElementById("header_icon");

var menu = document.getElementById("modal_menu");

function openMenu() {
    menu.style.display="flex";
}

headerImg.addEventListener('click',openMenu)