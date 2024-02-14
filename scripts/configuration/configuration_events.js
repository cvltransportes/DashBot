document.addEventListener('DOMContentLoaded', function () {
    var divs = document.querySelectorAll('.configuration_options_option');
    var configUser = document.getElementById('config_user');
    // Add click event listener to each div
    divs.forEach(function(div) {
        div.addEventListener('click', openConfOption);
    });

    configUser.style.backgroundColor = '#C9D1D9'
    configUser.style.color = '#2C313C'

    showLoader()
    getUsers()
    .finally(()=>hideLoader())
});

document.addEventListener('DOMContentLoaded', function() {
    document.querySelector('.configuration_form_user_option').addEventListener('click', function(event) {
        event.preventDefault();
        var newUserModal = document.getElementById('new_user_modal')
        newUserModal.querySelector('h2').innerText = 'Cadastro de Usuário'
        document.getElementById('cpf').value = ''
        document.getElementById('cpf').readOnly = false
        document.getElementById('domain').value = ''
        document.getElementById('unit').value = ''
        document.getElementById('username').value = ''
        document.getElementById('username').readOnly = false
        newUserModal.style.display='flex'
    });

    document.querySelector('.configuration_form_bots_options').addEventListener('click', function(event) {
        event.preventDefault();
        var newBotModal = document.getElementById('new_bot_modal')

        clearLastBotsSelectItems()
        showLoader()
        getBotsName()
        .finally(()=>hideLoader())
        newBotModal.querySelector('h2').innerText = 'Configurar Situação Bot'
    
        document.getElementById('bot_select_name').value = ''
        document.getElementById('bot_select_name').readOnly = false
        document.getElementById('bot_select_status').value = 'active'

        newBotModal.style.display='flex'
    });
});

window.onclick = function(event) {
    var closeUserModal = document.getElementById('close_new_user_modal')
    var closeBotModal = document.getElementById('close_new_bot_modal')
    var newUserModal = document.getElementById('new_user_modal')
    var newBotModal = document.getElementById('new_bot_modal')
    if (event.target == closeUserModal|| event.target==closeBotModal) {
        newUserModal.style.display = "none";
        newBotModal.style.display = "none";
    }
}

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('form_user').style.display='block'
    document.getElementById('form_bots').style.display='none'
    document.getElementById('form_group').style.display='none'
    
    document.getElementById('config_user').addEventListener('click', function(event) {
        event.preventDefault();
        document.getElementById('form_user').style.display='block'
        document.getElementById('form_group').style.display='none'
        document.getElementById('form_bots').style.display='none'
        showLoader()
        getUsers()
        .finally(()=>hideLoader())
    });
    document.getElementById('config_group').addEventListener('click', function(event) {
        event.preventDefault();
        document.getElementById('form_user').style.display='none'
        document.getElementById('form_group').style.display='block'
        document.getElementById('form_bots').style.display='none'

    });
    document.getElementById('config_bots').addEventListener('click', function(event) {
        event.preventDefault();
        document.getElementById('form_user').style.display='none'
        document.getElementById('form_group').style.display='none'
        document.getElementById('form_bots').style.display='block'
        showLoader()
        getBotsSituation()
        .then(()=>getBotsName())
        .finally(()=>hideLoader())
    });
});

document.addEventListener('DOMContentLoaded', function() {
    // Attach an event listener to the form's submit event
    document.getElementById('add_user_form').addEventListener('submit', function(event) {
        // Prevent the default form submission
        event.preventDefault();

        validateAndPostNewUser()
        // Here you can add what you want to do next, e.g., sending data to a server, updating UI, etc.
    });
});

document.addEventListener('DOMContentLoaded', function() {
    // Attach an event listener to the form's submit event
    document.getElementById('add_bot_form').addEventListener('submit', function(event) {
        // Prevent the default form submission
        event.preventDefault();

        validateAndPostNewBotSituation()
    });
});