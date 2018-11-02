window.onload = unvanish();

 function unvanish() {
     let tounvanish = document.getElementById("toshowsection");
     tounvanish.style.display = "block";
     tounvanish.style.animation = "fadeIn 2s";
//     tounvanish.setAttribute("style", "visibility: visible; opacity: 1;");
 }

function showAlert() {
    alert("Want some magic?");
}

document.getElementById("alertbutton").addEventListener("click", showAlert);