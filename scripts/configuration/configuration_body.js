function openConfOption(event){
    var divs = document.querySelectorAll('.configuration_options_option');
    var clicked_el = event.target

    divs.forEach((item)=>{
        item.style.backgroundColor = ''
        item.style.color = ''
    })

    clicked_el.style.backgroundColor = '#C9D1D9'
    clicked_el.style.color = '#2C313C'
}

function createTableUsers(data,table_id){
    clearTableUsers(table_id)
    addRowToTableUsers(data,table_id)

}

function clearTableUsers(table_id){
    ths = document.querySelectorAll(`#${table_id} thead tr`)
    ths.forEach(item=>item.remove())
    trs = document.querySelectorAll(`#${table_id} tbody tr`)
    trs.forEach(item=>item.remove())
}

function clearLastBotsSelectItems(){
    var options = document.getElementById('bot_select_name').querySelectorAll('option')
    options.forEach(item=>item.remove())
}

function addRowToTableUsers(data,table_id) {
    let table = document.querySelector(`#${table_id} thead`)
    let tr = document.createElement('tr');
    let firstTh = document.createElement('th'); // This is for the buttons, assuming you want a header for them
    
    tr.appendChild(firstTh);
    for (let key in data[0]) {
        let th = document.createElement('th');
        th.textContent = capitalizeString(key);
        tr.appendChild(th);
    }
    table.appendChild(tr)

    for (idx in data){
        // Find the table by its class name and select the tbody
        var tableBody = document.querySelector(`#${table_id} tbody`);
        var row = document.createElement('tr');
        var cellButtons = document.createElement('td');

        var buttonRemove = document.createElement('button')
        var buttonEdit = document.createElement('button')

        var imgRemove = document.createElement('img')
        var imgEdit = document.createElement('img')

        imgRemove.src = '../assets/remover1.png'
        imgEdit.src = '../assets/editar2.png'

        imgRemove.className = 'img-remove-config'
        imgEdit.className = 'img-edit-config'

        buttonRemove.id = `button_${table_id}-${data[idx]['id']}`
        buttonRemove.className = 'button-remove-config'

        buttonEdit.className = 'button-edit-config'

        buttonRemove.appendChild(imgRemove)
        buttonEdit.appendChild(imgEdit)

        cellButtons.appendChild(buttonRemove);
        cellButtons.appendChild(buttonEdit);

        
        row.appendChild(cellButtons);

        if (table_id ==='form_user_table'){
            buttonRemove.addEventListener('click',onClickDeleteUser)
            buttonEdit.addEventListener('click',onClickEditUser)
        }
        if (table_id ==='form_bots_table'){
            buttonRemove.style.display='none'
            buttonEdit.addEventListener('click',onClickEditBot)
        }


        for (col in data[idx]) {
            var cell = document.createElement('td');
            cell.textContent = data[idx][col]; // Set the cell text to the property value
            row.appendChild(cell); // Add the cell to the row
        }

        // Append the completed row to the table body
        tableBody.appendChild(row);
    }

}

function onResponseRegisterNewUser(data){
    var newUserModal = document.getElementById('new_user_modal')
    alert(data.message)
    newUserModal.style.display='none'
}

function onResponseRegisterNewBotSituation(data){
    var newBotModal = document.getElementById('new_bot_modal')
    alert(data.message)
    newBotModal.style.display='none'
}

function onClickDeleteUser(event){
    var clickedButtonRemove = event.target.closest('.button-remove-config')
    var buttonID = clickedButtonRemove.id.split('-')[1]
    showLoader()
    postDeleteUser(buttonID)
    .then(()=>getUsers())
    .finally(()=>hideLoader())
}

function onClickEditUser(event){
    var clickedButtonEdit = event.target.closest('.button-edit-config')
    var row = clickedButtonEdit.parentElement.parentElement.querySelectorAll('td')
    var userForm = document.getElementById('new_user_modal')
    userForm.querySelector('h2').innerText = 'Editar Usuario'

    document.getElementById('cpf').value = row[1].innerText
    document.getElementById('cpf').readOnly = true
    document.getElementById('domain').value = row[2].innerText
    document.getElementById('unit').value = row[5].innerText
    document.getElementById('username').value = row[6].innerText
    document.getElementById('username').readOnly = true
    document.getElementById('situation').value = row[4].innerText
    userForm.style.display='flex'

}

function onClickEditBot(event){
    var clickedButtonEdit = event.target.closest('.button-edit-config')
    var row = clickedButtonEdit.parentElement.parentElement.querySelectorAll('td')
    var userForm = document.getElementById('new_bot_modal')
    var selectBotConfig = document.getElementById("bot_select_name");
    
    clearLastBotsSelectItems()
    userForm.querySelector('h2').innerText = 'Editar Situação Bot'
    optionBotConfig = document.createElement('option')
    optionBotConfig.innerText = row[1].innerText
    optionBotConfig.value = row[1].innerText
    selectBotConfig.appendChild(optionBotConfig)
    
    document.getElementById('bot_select_name').value = row[1].innerText
    document.getElementById('bot_select_name').readOnly = true
    document.getElementById('bot_select_status').value = row[2].innerText
    userForm.style.display='flex'

}

function buildBotsSelectConfigElements(data){
    var botsInfo = data
    var selectBotConfig = document.getElementById("bot_select_name");
    for (let row in botsInfo){
        optionBotConfig = document.createElement('option')
        optionBotConfig.innerText = capitalizeString(botsInfo[row].bot_name)
        optionBotConfig.value = botsInfo[row].bot_name
        selectBotConfig.appendChild(optionBotConfig)
    }
}

function validateAndPostNewUser(){
    var userModal = document.getElementById('new_user_modal')
    var typeOperation = userModal.querySelector('h2').innerText
    // Object to hold form data
    const formValues = {};

    // Use FormData to retrieve all values (compatible with more complex forms, including those with checkboxes, radio buttons, etc.)
    const formData = new FormData(document.getElementById('add_user_form'));

    if (typeOperation.includes('Cadastro')){
        let allFilled = true;
        for (let [key, value] of formData.entries()) {
            if (!value.trim()) {
                alert(`Por favor insira o campo ${key}!`);
                allFilled = false;
                break;
            }
            formValues[key] = value.trim();

            formValues.cpf = String(formValues.cpf).replace(/\D/g, '');

        }
        // Check if all fields are filled
        if (!allFilled) return;
    }else{
        let allFilled = true;
        var domain = document.getElementById('domain').value
        var unit = document.getElementById('unit').value
        if (!domain.trim()) {
            alert(`Por favor insira o campo domain!`);
            allFilled = false;
        }
        if (!unit.trim()) {
            alert(`Por favor insira o campo unit!`);
            allFilled = false;
        }
        // Check if all fields are filled
        if (!allFilled) return;

        for (let [key, value] of formData.entries()) {
            formValues[key] = value.trim();
        }
    }



    // CPF Validation (assuming you have a validateCPF function)
    if (!validateCPF(formValues.cpf)) {
        alert('CPF Inválido.');
        return;
    }

    // Unit must be only 3 letters
    if (!/^[a-zA-Z]{3}$/.test(formValues.unit)) {
        alert('Unit must be exactly 3 letters.');
        return;
    }

    // Username length equals 8
    if (formValues.username.length > 8) {
        alert('Usuario deve conter no máximo 8 caracteres.');
        return;
    }

    showLoader()
    postNewUser(formValues)
    .then(()=>getUsers())
    .finally(()=>hideLoader())
}

function validateAndPostNewBotSituation(){
    var userModal = document.getElementById('new_bot_modal')
    var typeOperation = userModal.querySelector('h2').innerText
    // Object to hold form data
    const formValues = {};

    // Use FormData to retrieve all values (compatible with more complex forms, including those with checkboxes, radio buttons, etc.)
    const formData = new FormData(document.getElementById('add_bot_form'));

    if (typeOperation.includes('Configurar')){
        let allFilled = true;
        for (let [key, value] of formData.entries()) {
            if (!value.trim()) {
                alert(`Por favor insira o campo ${key}!`);
                allFilled = false;
                break;
            }
            formValues[key] = value.trim();

        }
        // Check if all fields are filled
        if (!allFilled) return;
    }else{
        let allFilled = true;
        var bot_name = document.getElementById('bot_select_name').value
        var situation = document.getElementById('bot_select_status').value
        var classification = document.getElementById('bot_select_status').value
        if (!bot_name.trim()) {
            alert(`Por favor insira o campo Bot!`);
            allFilled = false;
        }
        if (!situation.trim()) {
            alert(`Por favor insira o campo Situação!`);
            allFilled = false;
        }
        if (!classification.trim()) {
            alert(`Por favor insira o campo Situação!`);
            allFilled = false;
        }
        // Check if all fields are filled
        if (!allFilled) return;

        for (let [key, value] of formData.entries()) {
            formValues[key] = value.trim();
        }
    }
    console.log(formValues)
    showLoader()
    postBotSituation(formValues)
    .then(()=>getBotsSituation())
    .finally(()=>hideLoader())
}