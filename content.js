
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

    //classes exist?
    const fileSummaryRowClass = "iterable-item file file-modified"    
    const commitFilesSummaryId = "commit-files-summary";
    const diffStatsDivClass = "commit-file-diff-stats";
    const linesRemovedClass = "lines-removed";
    const linesAddedClass = "lines-added";    

    const summaryElement = window.document.getElementById(commitFilesSummaryId);
    if(summaryElement){

        var removed  = summaryElement.getElementsByClassName(linesRemovedClass);
        var totalRemoved = 0;
        for (var i = 0; i < removed.length; i++) {
            totalRemoved += parseInt(removed[i].innerText);
        };
    
        var added  = summaryElement.getElementsByClassName(linesAddedClass);
        var totalAdded = 0;
        for (var i = 0; i < added.length; i++) {
            totalAdded += parseInt(added[i].innerText);
        };

        var li = document.createElement("li");
        li.className = fileSummaryRowClass;
    
        var div = document.createElement("div");
        div.className = diffStatsDivClass;
    
        var spanAdded = document.createElement("span");
        spanAdded.className = linesAddedClass;
        spanAdded.textContent = totalAdded;
    
        var spanRemoved = document.createElement("span");
        spanRemoved.className = linesRemovedClass;
        spanRemoved.textContent = totalRemoved;
    
        var totalDif = totalAdded + totalRemoved;
        var totalClass = totalDif >= 0 ? linesAddedClass : linesRemovedClass;
    
        var spanTotal = document.createElement("span");
        spanTotal.className = totalClass;
        spanTotal.textContent = totalDif;
    
        li.appendChild(div);
        div.appendChild(spanAdded);
        div.appendChild(spanRemoved);
        div.appendChild(spanTotal);
    
        summaryElement.appendChild(li);
    } else {
        console.warn("Delay: No summary element found");
    }
}