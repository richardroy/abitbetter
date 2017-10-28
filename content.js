window.addEventListener ("load", myMain, false);

    //classes exist?
const fileSummaryRowClass = "iterable-item file file-modified"    
const fileListLinkClass = "commit-files-summary--filename";
const commitFilesSummaryId = "commit-files-summary";
const diffStatsDivClass = "commit-file-diff-stats";
const linesRemovedClass = "lines-removed";
const linesAddedClass = "lines-added";    
const navigationParentClass = "adg3-navigation";

function myMain (evt) {
    insertDiffTotal();
    addLeftFileList();
}

function addLeftFileList() {
    const summaryElement = window.document.getElementById(commitFilesSummaryId);
    if(summaryElement){
        const linkListName = summaryElement.getElementsByClassName(fileListLinkClass);
        const linkList = linkListName;        
        const navigationSubList = document.getElementById("adg3-navigation").firstChild.firstChild.firstChild.firstChild.childNodes[1].firstChild.childNodes[2].firstChild.firstChild;
        let div = document.createElement("div");
        div.style = "border-top: 1px solid black; margin: 10px;";
        navigationSubList.appendChild(div);
        for(let i = 0; i < linkList.length; i++){
            let textContent = linkList[i].textContent;
            const splitUrl = textContent.split("/");
            let linkText = `${splitUrl[splitUrl.length-2]}/${splitUrl[splitUrl.length-1]}`;
            linkList[i].textContent = linkText;
            linkList[i].title = textContent;
            navigationSubList.appendChild(linkList[i].cloneNode(true));                
        }
    } else {
        console.warn("Delay: No summary element found");
    }
}

function insertDiffTotal() {
    //enter here the action you want to do once loaded
    console.log("runChanges");

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
        spanAdded.textContent = totalAdded;
    
        let spanRemoved = document.createElement("span");
        spanRemoved.className = linesRemovedClass;
        spanRemoved.textContent = totalRemoved;
    
        let totalDif = totalAdded + totalRemoved;
        let totalClass = totalDif >= 0 ? linesAddedClass : linesRemovedClass;
    
        let spanTotal = document.createElement("span");
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