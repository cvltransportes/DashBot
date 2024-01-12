// Get the modal
var modal = document.getElementById("myModal");

// Get all divs with the class 'execution_content_container'


// Get the element that closes the modal
var span = document.getElementById("closeModal");

// Function to open the modal
function openModal(event) {
    var clickedDiv = event.target;
    getBotsInfo(clickedDiv.id)

}


// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
function getBotsInfo(bot_name){
    // Post the message to the API
    fetch(`http://127.0.0.1:5000/api/botsInfo/${bot_name}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then(response => response.json())
    .then(data => {
        var botInfo = JSON.parse(data)
        console.log(botInfo)
        var botName = document.getElementById("bot_name");
        var botDescription = document.getElementById("bot_description");
        var botDepartment = document.getElementById("bot_department");
        var botVersion = document.getElementById("bot_version");
        var botUser = document.getElementById("bot_user");
        botName.innerText = botInfo.bot_name[0].split('_').join(" ")
        botDescription.innerText = botInfo.bot_description[0]
        botDepartment.innerText = botInfo.bot_name[0].split('_')[1]
        modal.style.display = "block";
    })
    .catch((error) => {
        console.error('Error:', error);
        
    });
}

function getBotsName(department){
    // Post the message to the API
    fetch(`http://127.0.0.1:5000/api/botsName/${department}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then(response => response.json())
    .then(data => {
        var botInfo = JSON.parse(data)
        let previousElement =  document.querySelectorAll('.execution_content_container')

        previousElement.forEach(item=>item.remove())

        var executionContainer = document.querySelector('.execution_content')
        botsList = []
        for (let key in botInfo.bot_name){
            var botTextName = botInfo.bot_name[key]
            console.log(botTextName)
            if (!botsList.includes(botTextName)){
                botsList.push(botTextName)
                newBotNode = document.createElement('div')
                newBotNode.innerText = botTextName.split("_").join(" ")
                newBotNode.classList.add('execution_content_container')
                newBotNode.id = botTextName
                executionContainer.appendChild(newBotNode)
            } 
            
        }
        var divs = document.querySelectorAll('.execution_content_container');
        // Add click event listener to each div
        divs.forEach(function(div) {
            div.addEventListener('click', openModal);
        });
    })
    .catch((error) => {
        console.error('Error:', error);
        
    });
}

getBotsName()
document.addEventListener('DOMContentLoaded', function () {
    // Get the select element
    var selectElement = document.getElementById('select_department');

    // Add event listener for the 'change' event
    selectElement.addEventListener('change', function() {
        // Get the value of the selected option
        var selectedValue = this.value;
        getBotsName(selectedValue)
    });
});