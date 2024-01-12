// Get the modal
var modal = document.getElementById("myModal");



// Get all divs with the class 'execution_content_container'
var divs = document.querySelectorAll('.execution_content_container');

// Get the element that closes the modal
var span = document.getElementById("closeModal");

// Function to open the modal
function openModal() {
    modal.style.display = "block";
}



// Add click event listener to each div
divs.forEach(function(div) {
    div.addEventListener('click', openModal);
});


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
