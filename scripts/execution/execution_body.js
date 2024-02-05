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
            statusBot = document.createElement('div')
            contentBot = document.createElement('div')
            textBot = document.createElement('div')
            imgBot = document.createElement('img')

            imgBot.src = '../assets/robot.png'
            imgBot.className = 'execution_content_container_img'

            textBot.innerText = botTextName.split("_").join(" ")
            textBot.className='execution_content_container_text'

            contentBot.className = 'execution_content_container_content'
            contentBot.appendChild(imgBot)
            contentBot.appendChild(textBot)

            statusBot.className='execution_content_container_status'
            statusBot.id = `status_color_${botTextName}`

            newBotNode.classList.add('execution_content_container')
            newBotNode.id = botTextName
            newBotNode.appendChild(statusBot)
            newBotNode.appendChild(contentBot)

            executionContainer.appendChild(newBotNode)
        } 
        
    }
    var divs = document.querySelectorAll('.execution_content_container');
    // Add click event listener to each div
    divs.forEach(function(div) {
        div.addEventListener('click', openBotDetails);
    });
    getBotsRunning()
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

function changeColorStatusBotsRunning(data){
    var executionContainers = document.querySelectorAll('.execution_content_container')
    executionContainers.forEach(item=>{
        let found = false;
        for (let row in data){
            var statusBotEl = document.getElementById(`status_color_${item.id}`)
            console.log('Running ',data[row].bot_name,item.id)
            if (data[row].bot_name === item.id){
                console.log('Changing color status ',statusBotEl.id)
                statusBotEl.style.backgroundColor = 'green'
                found = true;
            }
            if (!found) {
                statusBotEl.style.backgroundColor = 'red'
            }
        }
    })
}