document.addEventListener('DOMContentLoaded', function () {
    var divs = document.querySelectorAll('.configuration_options_option');
    var configUser = document.getElementById('config_user');
    // Add click event listener to each div
    divs.forEach(function(div) {
        div.addEventListener('click', openConfOption);
    });

    configUser.style.backgroundColor = '#C9D1D9'
    configUser.style.color = '#2C313C'

    getUsers()
});

document.addEventListener('DOMContentLoaded', function() {
    document.querySelector('.configuration_form_user_option').addEventListener('click', function(event) {
        event.preventDefault();
        var newUserModal = document.getElementById('new_user_modal')
        newUserModal.style.display='flex'
    });
});
document.addEventListener('DOMContentLoaded', function() {
    // Attach an event listener to the form's submit event
    document.getElementById('add_user_form').addEventListener('submit', function(event) {
        // Prevent the default form submission
        event.preventDefault();

        // Object to hold form data
        const formValues = {};

        // Use FormData to retrieve all values (compatible with more complex forms, including those with checkboxes, radio buttons, etc.)
        const formData = new FormData(this);

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
        if (formValues.username.length >= 8) {
            alert('Usuario deve conter no máximo 8 caracteres.');
            return;
        }

        console.log(formValues);
        postNewUser(formValues)
        // Here you can add what you want to do next, e.g., sending data to a server, updating UI, etc.
    });
});
