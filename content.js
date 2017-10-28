
window.onload = function(event){
    console.log("window.onload");
    // runChanges();
}

window.document.body.onload = function(event) {
    console.log("window.document.body.onload");
}

window.addEventListener ("load", myMain, false);

function myMain (evt) {
    runChanges();
    console.log("myMain");
}

function runChanges() {
    //enter here the action you want to do once loaded
    console.log("runChanges");

    
    var removed  = window.document.getElementsByClassName("lines-removed");
    var totalRemoved = 0;
    for (var i = 0; i < removed.length; i++) {
        totalRemoved += parseInt(removed[i].innerText);
    };

    var added  = window.document.getElementsByClassName("lines-added");
    var totalAdded = 0;
    for (var i = 0; i < added.length; i++) {
        totalAdded += parseInt(added[i].innerText);
    };
    
    var li = document.createElement("li");
    li.className = "iterable-item file file-modified";

    var div = document.createElement("div");
    div.className = "commit-file-diff-stats";

    var spanAdded = document.createElement("span");
    spanAdded.className = "lines-added";
    spanAdded.textContent = totalAdded;

    var spanRemoved = document.createElement("span");
    spanRemoved.className = "lines-removed";
    spanRemoved.textContent = totalRemoved;

    var totalDif = totalAdded + totalRemoved;
    var totalClass = totalDif >= 0 ? "lines-added" : "lines-removed";

    var spanTotal = document.createElement("span");
    spanTotal.className = totalClass;
    spanTotal.textContent = totalDif;

    li.appendChild(div);
    div.appendChild(spanAdded);
    div.appendChild(spanRemoved);
    div.appendChild(spanTotal);

    var difSummary = document.getElementsByClassName("commit-files-summary")[0];
    if(!difSummary) runChanges();
    difSummary.appendChild(li);
}