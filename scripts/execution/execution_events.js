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

    // Add event listener for the 'change' event
    selectElement.addEventListener('change', function() {
        // Get the value of the selected option
        var selectedValue = this.value;
        showLoader()
        getBotsName(selectedValue)
        .finally(()=>hideLoader())
    });
});

document.addEventListener('DOMContentLoaded', function () {
    // Get the form element
    var form = document.getElementById('searchBotForm');
    var selectElement = document.getElementById('select_department');

    // Add event listener for the 'submit' event
    form.addEventListener('submit', function(event) {
        // Prevent the default form submission behavior
        event.preventDefault();

        // Get the value of the search input
        var search = document.getElementById('search_bot');

        // Now, you can use 'searchValue' for your purposes
        console.log('Search value:', search.value, selectElement.value);
        showLoader()
        searchBot(search.value, selectElement.value)
        .finally(()=>hideLoader())
        search.value = ''
        // If you need to perform further actions like fetching data, you can do so here
    });
    
});

document.addEventListener('DOMContentLoaded', function () {
    showLoader()
    getBotsName()
    .then(()=>{
        return getBotsDepartments()
    })
    .then(()=>{
        console.log('Bots loaded')
    })
    .catch(error=>{
        console.log('An error occurred: ',error)
    })
    .finally(()=>hideLoader())
    
});