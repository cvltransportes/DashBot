const botDetails = document.getElementById("bot_details");
const closeBotDetails = document.getElementById("closeModal");

closeBotDetails.onclick = function() {
    botDetails.style.display = "none";
}


window.onclick = function(event) {
    if (event.target == botDetails) {
        botDetails.style.display = "none";
    }
}


document.addEventListener('DOMContentLoaded', function () {
    // Get the select element
    var selectElement = document.getElementById('select_department');
    var selectOperation = document.getElementById('select_operation');

    // Add event listener for the 'change' event
    selectElement.addEventListener('change', function() {
        // Get the value of the selected option
        var selectedValue = this.value;
        selectOperation.value = 'todos'
        showLoader()
        getBotsName(selectedValue)
        .then(()=>getBotsRunning())
        .finally(()=>hideLoader())
    });
});

document.addEventListener('DOMContentLoaded', function () {
    // Get the select element
    var selectOperation = document.getElementById('select_operation');

    function handleOperation(value) {
        showLoader();
        getBotsOperation(value)
            .finally(() => hideLoader());
    }
    // Add event listener for the 'change' event
    selectOperation.addEventListener('change', function() {
        // Get the value of the selected option
        var selectedValue = this.value;
        handleOperation(selectedValue)
    });
    
});

document.addEventListener('DOMContentLoaded', function () {
    // Get the form element
    var form = document.getElementById('searchBotForm');
    var selectElement = document.getElementById('select_department');
    var selectOperation = document.getElementById('select_operation');

    // Add event listener for the 'submit' event
    form.addEventListener('submit', function(event) {
        // Prevent the default form submission behavior
        event.preventDefault();

        // Get the value of the search input
        var search = document.getElementById('search_bot');

        selectOperation.value = 'todos'

        // Now, you can use 'searchValue' for your purposes
        console.log('Search value:', search.value, selectElement.value);
        showLoader()
        searchBot(search.value, selectElement.value)
        .then(()=>getBotsRunning())
        .finally(()=>hideLoader())
        search.value = ''
        // If you need to perform further actions like fetching data, you can do so here
    });
    
});

document.addEventListener('DOMContentLoaded', function () {
    showLoader()
    getBotsName()
    .then(()=>getBotsRunning())
    .then(()=>getBotsDepartments())
    .catch(error=>{
        console.log('An error occurred: ',error)
    })
    .finally(()=>hideLoader())
    
});