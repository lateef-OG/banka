console.log(window.innerWidth);
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