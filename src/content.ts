import { DiffBlockService, DiffBlock } from './services/DiffBlockService';

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
const fileSummaryRowClass = "iterable-item file file-modified"    
const fileListLinkClass = "commit-files-summary--filename";
const commitFilesSummaryId = "commit-files-summary";
const diffStatsDivClass = "commit-file-diff-stats";
const navigationParentClass = "adg3-navigation";
const completeSignatureId = "abb-completed";
const leftNavigationId = "adg3-navigation";
const linesRemovedClass = "lines-removed";
const diffContainerClass = "diff-container";
const linesAddedClass = "lines-added";

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
        DiffBlockService.initialiseResizeButtons();
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
      summaryElement.appendChild(shuffleFileSummaries[i]);
    }

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
      const textContent = `${summary[`M`]} Modified`;
      const lozengeClass = fileChangeSummaryLozengeCompleteClass; 
      const lozenge = createLozenge(textContent, lozengeClass);
      summaryElement.parentElement.appendChild(lozenge);         
    }

    if (summary[`A`]) {
      const textContent = `${summary[`A`]} Added`;      
      const lozengeClass = fileChangeSummaryLozengeAddedClass;
      const lozenge = createLozenge(textContent, lozengeClass);      
      summaryElement.parentElement.appendChild(lozenge);    
    }

    if (summary[`D`]) {
      const lozengeClass = fileChangeSummaryLozengeDeletedClass;
      const textContent = `${summary[`D`]} Deleted`;      
      const lozenge = createLozenge(textContent, lozengeClass);      
      summaryElement.parentElement.appendChild(lozenge);
    }

    if (summary[`R`]) {
      const lozengeClass = fileChangeSummaryLozengeRenamedClass;
      const textContent = `${summary[`R`]} Renamed`;
      const lozenge = createLozenge(textContent, lozengeClass);      
      summaryElement.parentElement.appendChild(lozenge);  
    }
}

function createLozenge(textContent: string, lozengeClass: string) {
  let modifiedSummary = document.createElement("span");
  modifiedSummary.className = `${fileChangeSummaryLozenge} ${lozengeClass}`;
  modifiedSummary.textContent = textContent;
  modifiedSummary.setAttribute(`style`, `width: auto; padding: 2px 5px 2px 5px; margin: 5px`);
  return modifiedSummary;
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