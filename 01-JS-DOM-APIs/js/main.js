window.onload = unvanish();

 function unvanish() {
     let tounvanish = document.getElementById("toshowsection");
     tounvanish.style.display = "block";
     tounvanish.style.animation = "fadeIn 2s";
//     tounvanish.setAttribute("style", "visibility: visible; opacity: 1;");
 }
<<<<<<< HEAD

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
var qbutton = document.getElementById("qbutton");
qbutton.addEventListener("click", requestviagit);
document.getElementById("qbutton_table").addEventListener("click", requestviagit_table);

function requestviagit()
{
    var tosearch = document.getElementById("tosearch")
    var textosearch = tosearch.value;
    var promise = requestApi("GET", "https://api.github.com/search/repositories?q=" + "'" + textosearch + "'", true);
    promise.then(function (obj)
    {
        var obj_json = JSON.parse(obj);
        return obj_json.items;
    }).then(function(items)
    {
        var cont = document.getElementById("repo-container");
        var fragment = document.createDocumentFragment();
        var list = document.createElement("ul");
        for( i = 0 ; i < items.length; i++) 
            {
                var templist = document.createElement("li");
                var textnode = document.createTextNode(items[i].name);
                templist.appendChild(textnode);
                list.appendChild(templist);
            }
        fragment.appendChild(list);
        cont.appendChild(fragment);
    });
}

function requestviagit_table()
{
    var tosearch = document.getElementById("tosearch")
    var textosearch = tosearch.value;
    var promise = requestApi("GET", "https://api.github.com/search/repositories?q=" + "'" + textosearch + "'", true);
    promise.then(function (obj)
    {
        var obj_json = JSON.parse(obj);
        return obj_json.items;
    }).then(function(items)
    {
        var fragment = document.createDocumentFragment();
        var table = document.createElement("table")
        table.style.width = "100%";
        var header1, header2, header3, headercontainer, htext1, htext2, htext3;
        headercontainer = document.createElement("tr");
        header1 = document.createElement("th");
        header2 = document.createElement("th");
        header3 = document.createElement("th");
        htext1 = document.createTextNode("Name");
        htext2 = document.createTextNode("Full Name");
        htext3 = document.createTextNode("URL");
        header1.appendChild(htext1);
        header2.appendChild(htext2);
        header3.appendChild(htext3);
        headercontainer.appendChild(header1);
        headercontainer.appendChild(header2);
        headercontainer.appendChild(header3);
        table.appendChild(headercontainer);

        for( i = 0 ; i < items.length; i++) 
            {
                var temp1, temp2, temp3, temptext1, temptext2, temptext3, temprow;
                temprow = document.createElement("tr");
                temp1 = document.createElement("td");
                temp2 = document.createElement("td");
                temp3 = document.createElement("td");
                temptext1 = document.createTextNode(items[i].name);
                temptext2 = document.createTextNode(items[i].full_name);
                temptext3 = document.createTextNode(items[i].url);
                temp1.appendChild(temptext1);
                temp2.appendChild(temptext2);
                temp3.appendChild(temptext3);
                temprow.appendChild(temp1);
                temprow.appendChild(temp2);
                temprow.appendChild(temp3);
                table.appendChild(temprow);
            }
        console.log(table);
        fragment.appendChild(table);
        document.body.appendChild(fragment);
        
    });
}
=======
>>>>>>> 430d6137c25d7b5c079d3b832e5fa2c91d50f76e
