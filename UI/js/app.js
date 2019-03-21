/** 
 * Script for sidebar
*/
//Function to open side navigation
function openNav() {
    document.getElementById("sidebar").style.width = "250px";
    document.getElementById("sidebar").style.marginLeft = "0";
    // document.body.style.backgroundColor = "rgba(0,0,0,0.4)";
}
//Function to close side navigation
function closeNav() {
    document.getElementById("sidebar").style.width = "0";
    document.getElementById("sidebar").style.marginLeft = "-3px";
    // document.body.style.backgroundColor = "#ffffff";
}
/** 
 * Script for modal
*/
// Get the modal
var modal = document.getElementById('modal');

// Get the button that opens the modal
var btn = document.getElementById("openModal");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
btn.onclick = function() {
  modal.style.display = "flex";
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