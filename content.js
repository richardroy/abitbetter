var observeDOM = (function(){
    var MutationObserver = window.MutationObserver || window.WebKitMutationObserver,
        eventListenerSupported = window.addEventListener;

    return function(obj, callback){
        if( MutationObserver ){
            // define a new observer
            var obs = new MutationObserver(function(mutations, observer){
                if( mutations[0].addedNodes.length || mutations[0].removedNodes.length )
                    callback();
            });
            // have the observer observe foo for changes in children
            obs.observe( obj, { childList:true, subtree:true });
        }
        else if( eventListenerSupported ){
            obj.addEventListener('DOMNodeInserted', callback, false);
            obj.addEventListener('DOMNodeRemoved', callback, false);
        }
    };
})();

let setTimoutVar;
// Observe a specific DOM element:
observeDOM( document.getElementById('page') , function(){ 
    clearTimeout(setTimoutVar);    
    setTimoutVar = setTimeout(myMain, 1000);       
});

const diffBodyClass = "diff-content-container refract-container";
const fileSummaryRowClass = "iterable-item file file-modified"    
const minimizeButtonClass = "diff-entry-lozenge aui-lozenge";
const fileListLinkClass = "commit-files-summary--filename";
const commitFilesSummaryId = "commit-files-summary";
const diffStatsDivClass = "commit-file-diff-stats";
const navigationParentClass = "adg3-navigation";
const diffContainerClass = "diff-container";
const completeSignatureId = "abb-completed";
const leftNavigationId = "adg3-navigation";
const linesRemovedClass = "lines-removed";
const headerFilenameClass = "filename";
const linesAddedClass = "lines-added";    
const diffHeaderClass = "heading";

function myMain () {
    const completed = window.document.getElementById(completeSignatureId);
    const diffContainers = window.document.getElementsByClassName(diffContainerClass);
    if(diffContainers.length > 0 && !completed) {
        insertDiffTotal();
        addLeftFileList();
        collapsableDiffs();
        addSignature();
    }
}

function alternateCollapse(minimisedElement, diffContainerBody, diffContainerHeader) {
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
            let linkWrapper = document.createElement("div");
            linkWrapper.appendChild(clonedLink);
            navigationSubList.appendChild(linkWrapper);                
        }
    } else {
        console.warn("Delay: No summary element found");
    }
}

function insertDiffTotal() {
    //enter here the action you want to do once loaded
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

function addSignature() {
    const pageElement = window.document.getElementById('page');
    let spanAdded = document.createElement("span");
    spanAdded.id = completeSignatureId;
    pageElement.appendChild(spanAdded);
}