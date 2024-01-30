function buildBotsElements(data){
    var botInfo = data
    let previousElement =  document.querySelectorAll('.execution_content_container')
    if (previousElement){
        previousElement.forEach(item=>item.remove())
    } 
    
    var executionContainer = document.querySelector('.execution_content')
    botsList = []
    for (let row in botInfo){
        var botTextName = botInfo[row].bot_name
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
        div.addEventListener('click', openBotDetails);
    });
}

function buildBotsDepartmentsElements(data){
    console.log(data)
    var botsDepartments = data
    var selectDepartments = document.getElementById("select_department");
    for (let row in botsDepartments){
        optionDepartment = document.createElement('option')
        optionDepartment.innerText = botsDepartments[row].department
        optionDepartment.value = botsDepartments[row].department
        selectDepartments.appendChild(optionDepartment)
    }
}