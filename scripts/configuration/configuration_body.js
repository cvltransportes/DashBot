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

function createTableUsers(data){
    console.log(data)
    clearTableUsers()
    addRowToTableUsers(data)

}

function clearTableUsers(){
    ths = document.querySelectorAll('.modern-table thead th')
    ths.forEach(item=>item.remove())
    trs = document.querySelectorAll('.modern-table thead tr')
    trs.forEach(item=>item.remove())
}

function addRowToTableUsers(data) {
    let table = document.querySelector('.modern-table thead')
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
        console.log(data[idx])
        // Find the table by its class name and select the tbody
        var tableBody = document.querySelector('.modern-table tbody');
        var row = document.createElement('tr');
        var cellButtons = document.createElement('td');

        var buttonRemove = document.createElement('button')
        var buttonEdit = document.createElement('button')

        var imgRemove = document.createElement('img')
        var imgEdit = document.createElement('img')

        imgRemove.src = '../../assets/remover1.png'
        imgEdit.src = '../../assets/editar2.png'

        imgRemove.className = 'img-remove-user'
        imgEdit.className = 'img-edit-user'

        buttonRemove.id = `button_remove_user-${data[idx]['id']}`
        buttonRemove.className = 'button-remove-user'

        buttonEdit.className = 'button-edit-user'

        buttonRemove.appendChild(imgRemove)
        buttonEdit.appendChild(imgEdit)

        cellButtons.appendChild(buttonRemove);
        cellButtons.appendChild(buttonEdit);

        
        row.appendChild(cellButtons);

        buttonRemove.addEventListener('click',()=>postDeleteUser(this.id))
        
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

