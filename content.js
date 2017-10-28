window.addEventListener ("load", myMain, false);

function myMain (evt) {
    insertDiffTotal();
}

function insertDiffTotal() {
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

        let removed  = summaryElement.getElementsByClassName(linesRemovedClass);
        let totalRemoved = 0;
        for (let i = 0; i < removed.length; i++) {
            totalRemoved += parseInt(removed[i].innerText);
        };
    
        let added  = summaryElement.getElementsByClassName(linesAddedClass);
        let totalAdded = 0;
        for (let i = 0; i < added.length; i++) {
            totalAdded += parseInt(added[i].innerText);
        };

        let li = document.createElement("li");
        li.className = fileSummaryRowClass;
    
        let div = document.createElement("div");
        div.className = diffStatsDivClass;
    
        let spanAdded = document.createElement("span");
        spanAdded.className = linesAddedClass;
        spanAdded.textContent = `+${totalAdded}`;
    
        let spanRemoved = document.createElement("span");
        spanRemoved.className = linesRemovedClass;
        spanRemoved.textContent = totalRemoved;
    
        let totalDif = totalAdded + totalRemoved;
        let totalClass = totalDif >= 0 ? linesAddedClass : linesRemovedClass;
    
        let totalText = totalDif > 0 ? `+${totalDif}` : totalDif;

        let spanTotal = document.createElement("span");
        spanTotal.className = totalClass;
        spanTotal.textContent = totalText;
    
        li.appendChild(div);
        div.appendChild(spanAdded);
        div.appendChild(spanRemoved);
        div.appendChild(spanTotal);
    
        summaryElement.appendChild(li);
    } else {
        console.warn("Delay: No summary element found");
    }
}