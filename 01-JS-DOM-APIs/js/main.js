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

function requestJoke()
{
    var promise = requestApi("GET", "http://api.icndb.com/jokes/random", true);
    promise.then(function(obj)
    {
        var jokejson = JSON.parse(obj);
        document.getElementById("jokeplace").textContent = jokejson.value["joke"];    
    }, function(response)
    {
        console.log(response);
        document.getElementById("toshowsection").style.backgroundColor = "red";
    });
}

function requestApi(reqtype, url, sync)
{
    
    var promise = new Promise(function(resolve,reject) 
    {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function()
        {
            if(this.readyState == 4 && this.status == 200)
            {
                resolve(this.response);
            }

        }
        xhttp.open(reqtype, url, sync);
        xhttp.send();
        
    });

    return promise;
}

document.getElementById("alertbutton").addEventListener("click", requestJoke);