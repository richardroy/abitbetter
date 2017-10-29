window.addEventListener ("load", myMain, false);

const fileSummaryRowClass = "iterable-item file file-modified"    
const fileListLinkClass = "commit-files-summary--filename";
const commitFilesSummaryId = "commit-files-summary";
const diffStatsDivClass = "commit-file-diff-stats";
const linesRemovedClass = "lines-removed";
const linesAddedClass = "lines-added";    
const navigationParentClass = "adg3-navigation";
const diffContainerClass = "diff-container";
const diffBodyClass = "diff-content-container refract-container";
const diffHeaderClass = "heading";
const minimizeButtonClass = "diff-entry-lozenge aui-lozenge";
const headerFilenameClass = "filename";
const leftNavigationId = "adg3-navigation";

function myMain (evt) {
    insertDiffTotal();
    addLeftFileList();
    collapsableDiffs();
}

function alternateCollapse(minimisedElement, diffContainerBody, diffContainerHeader) {
    console.log(diffContainerBody);
    if(minimisedElement.textContent === "Minimize") {
        minimisedElement.textContent = "Expand";
        diffContainerBody.style = "display: none;";
        diffContainerHeader.style = "border-bottom: 1px solid #abc; margin-bottom: -40px";
    } else {
        minimisedElement.textContent = "Minimize";
        diffContainerBody.style = "";
        diffContainerHeader.style = "border-bottom: none";        
    }
}

function collapsableDiffs() {
    const diffContainers = window.document.getElementsByClassName(diffContainerClass);

    for(let i = 0; i < diffContainers.length; i++) {
        const diffContainerHeader = diffContainers[i].getElementsByClassName(diffHeaderClass)[0];
        const diffContainerBody = diffContainers[i].getElementsByClassName(diffBodyClass)[0];
        let minimisedElement = document.createElement("span");
        minimisedElement.className = minimizeButtonClass;
        minimisedElement.textContent = "Minimize";
        minimisedElement.onclick = function(){alternateCollapse(minimisedElement, diffContainerBody, diffContainerHeader)};
        const diffContainerHeaderTitle = diffContainerHeader.getElementsByClassName(headerFilenameClass)[0];
        diffContainerHeaderTitle.appendChild(minimisedElement);
    }

}

function addLeftFileList() {
    const summaryElement = window.document.getElementById(commitFilesSummaryId);
    if(summaryElement){
        const linkListName = summaryElement.getElementsByClassName(fileListLinkClass);
        const linkList = linkListName;        
        const navigationSubList = document.getElementById(leftNavigationId).firstChild.firstChild.firstChild.firstChild.childNodes[1].firstChild.childNodes[2].firstChild.firstChild;
        let div = document.createElement("div");
        div.style = "border-top: 1px solid black; margin: 10px;";
        navigationSubList.appendChild(div);
        for(let i = 0; i < linkList.length; i++){
            let clonedLink = linkList[i].cloneNode(true);
            let textContent = clonedLink.textContent;
            const splitUrl = textContent.split("/");
            let linkText = `/${splitUrl[splitUrl.length-1]}`;
            clonedLink.textContent = linkText;
            clonedLink.title = textContent;
            navigationSubList.appendChild(clonedLink);                
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