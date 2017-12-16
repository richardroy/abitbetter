const observeDOM = (function(){
    let MutationObserver = (window as any)["MutationObserver"] || (window as any)["WebKitMutationObserver"],
        eventListenerSupported = window.addEventListener;

    return function(obj: any, callback: any){
        if( MutationObserver ){
            // define a new observer
            var obs = new MutationObserver(function(mutations:any, observer:any){
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

let setTimoutVar: any;
// Observe a specific DOM element:
observeDOM( document.getElementById('page') , function(){ 
    clearTimeout(setTimoutVar);    
    setTimoutVar = setTimeout(myMain, 1000);       
});

const fileChangeSummaryLozenge = "diff-summary-lozenge aui-lozenge aui-lozenge-subtle";
const diffTypeLozengeClass = "diff-entry-lozenge aui-lozenge aui-lozenge-subtle";
const diffRefractorBodyClass = "diff-content-container refract-container";
const minimizeButtonClass = "diff-entry-lozenge aui-lozenge collapsable";
const diffContentBodyClass = "diff-content-container content-container";
const fileSummaryRowClass = "iterable-item file file-modified"    
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

const fileChangeSummaryLozengeCompleteClass = `aui-lozenge-complete`;
const fileChangeSummaryLozengeDeletedClass = `aui-lozenge-error`;
const fileChangeSummaryLozengeAddedClass = `aui-lozenge-success`;
const fileChangeSummaryLozengeRenamedClass = `aui-lozenge-moved`;


function myMain () {
    const completed = window.document.getElementById(completeSignatureId);
    const diffContainers = window.document.getElementsByClassName(diffContainerClass);
    if(diffContainers.length > 0 && !completed) {
        reshuffle();
        insertDiffTotal();
        addLeftFileList();
        collapsableDiffs();
        addSignature();
        addFileSummary();
    }
}

function reshuffle() {
    const summaryElement = window.document.getElementById(commitFilesSummaryId);
    const shuffleFileSummaries = [];
    for(let i = 0; i < summaryElement.childNodes.length; i++) {
        if(summaryElement.childNodes[i].nodeName == `LI`){
            const summaryLozenge: Element = (summaryElement.childNodes[i] as Element).getElementsByClassName(fileChangeSummaryLozenge)[0];
            if(summaryLozenge && (summaryLozenge.textContent.replace(/\W/g, '') == `D` || summaryLozenge.textContent.replace(/\W/g, '') == `R`))
                shuffleFileSummaries.push(summaryElement.childNodes[i]);
        }
    }
    for(let i = 0; i < shuffleFileSummaries.length; i++) {
        console.log(shuffleFileSummaries[i])
        summaryElement.appendChild(shuffleFileSummaries[i]);
    }

    // Diffs
    const diffContainers = window.document.getElementsByClassName(diffContainerClass);
    const diffParent = diffContainers[0].parentElement.parentElement;
    const shuffleDiffs = [];
    for(let i = 0; i < diffContainers.length; i++) {
        const typeLozenge = diffContainers[i].getElementsByClassName(diffTypeLozengeClass)[0];
        const typeLozengeContent = typeLozenge.textContent.replace(/\W/g, '');
        if(typeLozengeContent == "Deleted" || typeLozengeContent == "Renamed" ) {
            shuffleDiffs.push(diffContainers[i]);
        }
    }

    for(let i = 0; i < shuffleDiffs.length; i++) {
        diffParent.appendChild(shuffleDiffs[i].parentElement);
    }
}

function addFileSummary() {
    const fileSummaryLozenges = window.document.getElementsByClassName(fileChangeSummaryLozenge);
    const summary: any = {};
    for(let i = 0; i < fileSummaryLozenges.length; i++) {
        let changeText = fileSummaryLozenges[i].textContent;
        changeText = changeText.replace(/\W/g, '');
        const currentCount:any = summary[changeText];
        summary[changeText] = summary[changeText] ? currentCount + 1 : 1;
    }

    const summaryElement = window.document.getElementById(commitFilesSummaryId);

    if(summary[`M`]) {
        let modifiedSummary = document.createElement("span");
        modifiedSummary.className = `${fileChangeSummaryLozenge} ${fileChangeSummaryLozengeCompleteClass}`;
        modifiedSummary.textContent = `${summary[`M`]} Modified`;
        modifiedSummary.setAttribute(`style`, `width: auto; padding: 2px 5px 2px 5px; margin: 5px`);
        summaryElement.parentElement.appendChild(modifiedSummary);         
    } 
    if (summary[`A`]) {
        let modifiedSummary = document.createElement("span");
        modifiedSummary.className = `${fileChangeSummaryLozenge} ${fileChangeSummaryLozengeAddedClass}`;
        modifiedSummary.textContent = `${summary[`A`]} Added`;
        modifiedSummary.setAttribute(`style`, `width: auto; padding: 2px 5px 2px 5px; margin: 5px`);
        summaryElement.parentElement.appendChild(modifiedSummary);    
    } 
    if (summary[`D`]) {
        let modifiedSummary = document.createElement("span");
        modifiedSummary.className = `${fileChangeSummaryLozenge} ${fileChangeSummaryLozengeDeletedClass}`;
        modifiedSummary.textContent = `${summary[`D`]} Deleted`;
        modifiedSummary.setAttribute(`style`, `width: auto; padding: 2px 5px 2px 5px; margin: 5px`);
        summaryElement.parentElement.appendChild(modifiedSummary);    
    } 
    if (summary[`R`]) {
        let modifiedSummary = document.createElement("span");
        modifiedSummary.className = `${fileChangeSummaryLozenge} ${fileChangeSummaryLozengeRenamedClass}`;
        modifiedSummary.textContent = `${summary[`R`]} Renamed`;
        modifiedSummary.setAttribute(`style`, `width: auto; padding: 2px 5px 2px 5px; margin: 5px`);
        summaryElement.parentElement.appendChild(modifiedSummary);    
    }
}

function alternateCollapse(minimisedElement: Element, diffContainerBody: Element, diffContainerHeader: Element) {
    if(minimisedElement.textContent === "Minimize") {
        minimisedElement.textContent = "Expand";
        diffContainerBody.setAttribute(`style`, `display: none;`);
        diffContainerHeader.setAttribute(`style`, `border-bottom: 1px solid #abc; margin-bottom: -40px`);
    } else {
        minimisedElement.textContent = "Minimize";
        diffContainerBody.setAttribute(`style`, ``);
        diffContainerHeader.setAttribute(`style`, "border-bottom: none");        
    }
}

function allCollapsableDiffs(minimiseAllElement: Element) {
    const diffContainers = window.document.getElementsByClassName(diffContainerClass);    
    for(let i = 0; i < diffContainers.length; i++) {
        const diffContainerHeader = diffContainers[i].getElementsByClassName(diffHeaderClass)[0];
        let diffContainerBody = diffContainers[i].getElementsByClassName(diffRefractorBodyClass)[0];
        if(!diffContainerBody) {
            diffContainerBody = diffContainers[i].getElementsByClassName(diffContentBodyClass)[0];
        }
        const minimizeButton = diffContainerHeader.getElementsByClassName(minimizeButtonClass)[0];

        if(String(minimiseAllElement.textContent).indexOf(minimizeButton.textContent) !== -1 ) {
            alternateCollapse(minimizeButton, diffContainerBody, diffContainerHeader);
        }
    }
    minimiseAllElement.textContent = minimiseAllElement.textContent == `Minimize All` ? `Expand All` : `Minimize All`    
}

function collapsableDiffs() {
    const diffContainers = window.document.getElementsByClassName(diffContainerClass);

    for(let i = 0; i < diffContainers.length; i++) {
        const diffContainerHeader = diffContainers[i].getElementsByClassName(diffHeaderClass)[0];
        let diffContainerBody = diffContainers[i].getElementsByClassName(diffRefractorBodyClass)[0];
        if(!diffContainerBody) {
            diffContainerBody = diffContainers[i].getElementsByClassName(diffContentBodyClass)[0];
        }
        let minimisedElement = document.createElement("span");
        minimisedElement.className = minimizeButtonClass;
        minimisedElement.textContent = "Minimize";
        minimisedElement.onclick = function(){alternateCollapse(minimisedElement, diffContainerBody, diffContainerHeader)};
        const diffContainerHeaderTitle = diffContainerHeader.getElementsByClassName(headerFilenameClass)[0];
        diffContainerHeaderTitle.appendChild(minimisedElement);
    }

    let minimisedElement = document.createElement("span");
    minimisedElement.className = minimizeButtonClass;
    minimisedElement.textContent = `Minimize All`;
    minimisedElement.onclick = function(){allCollapsableDiffs(minimisedElement)};

    const summaryElement = window.document.getElementById(commitFilesSummaryId);
    summaryElement.appendChild(minimisedElement);
}

function addLeftFileList() {
    const summaryElement = window.document.getElementById(commitFilesSummaryId);
    if(summaryElement){
        const linkListName = summaryElement.getElementsByClassName(fileListLinkClass);
        const linkList = linkListName;        
        const navigationSubList = document.getElementById(leftNavigationId).firstChild.firstChild.firstChild.firstChild.childNodes[1].firstChild.childNodes[2].firstChild.firstChild;
        let div = document.createElement("div");
        div.setAttribute(`style`, `border-top: 1px solid black; margin: 10px;`);
        navigationSubList.appendChild(div);
        for(let i = 0; i < linkList.length; i++){
            let clonedLink = linkList[i].cloneNode(true);
            let textContent = clonedLink.textContent;
            const splitUrl = textContent.split("/");
            let linkText = `/${splitUrl[splitUrl.length-1]}`;
            clonedLink.textContent = linkText;
            (clonedLink as HTMLElement).title = textContent;
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
            totalRemoved += parseInt(removed[i].innerHTML);
        };
    
        let added  = summaryElement.getElementsByClassName(linesAddedClass);
        let totalAdded = 0;
        for (let i = 0; i < added.length; i++) {
            totalAdded += parseInt(added[i].innerHTML);
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
        spanRemoved.textContent = totalRemoved.toString();
    
        let totalDif = totalAdded + totalRemoved;
        let totalClass = totalDif >= 0 ? linesAddedClass : linesRemovedClass;
    
        let totalText: string = totalDif > 0 ? `+${totalDif}` : totalDif.toString();

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