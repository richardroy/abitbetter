import { LeftNavService } from './LeftNavService';
// import * as cheerio from 'cheerio'

export class LeftNavService {
  static commitFilesSummaryId = "commit-files-summary";
  static fileListLinkClass = "commit-files-summary--filename";
  static leftNavigationId = "adg3-navigation";
  
  static menuCollapsed() {
    return document.getElementById("adg3-navigation").firstChild.firstChild.firstChild.firstChild.childNodes[1].firstChild.childNodes[2] === undefined
  }

  static getLeftMenuElement() {
    return document.getElementById(this.leftNavigationId).firstChild.firstChild.firstChild.firstChild.childNodes[1].firstChild.childNodes[2].firstChild.firstChild;
  } 

  static getCollapseButton() {
    const childNodes  = document.getElementById(this.leftNavigationId).firstChild.firstChild.firstChild.firstChild.childNodes;
    if(childNodes.length === 3) {
      return childNodes[2].firstChild;
    } else {
      return childNodes[1].firstChild;
    }
  }

  static addFilelistSubMenu(summaryElement) {
    const linkListName = summaryElement.getElementsByClassName(this.fileListLinkClass);
    const linkList = linkListName;   
    const navigationSubList = this.getLeftMenuElement();
    let div = document.createElement("div");
    div.setAttribute(`id`, `filelist-break`);
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
  }

  static fileListSubMenuAdded() {
    return document.getElementById(`filelist-break`) !== null;
  }

  static addLeftFileList() {
    const summaryElement = window.document.getElementById(this.commitFilesSummaryId);
    if(summaryElement){
      const collapseButton = this.getCollapseButton();
      collapseButton.addEventListener("click", () => {
        const menuDelay = setInterval( () => {
          const summaryElement = window.document.getElementById(this.commitFilesSummaryId);
          if(!LeftNavService.fileListSubMenuAdded()){    
            LeftNavService.addFilelistSubMenu(summaryElement);
          }
          clearInterval(menuDelay);
        }, 500);
      })

      if(!this.menuCollapsed()){     
        this.addFilelistSubMenu(summaryElement);
      }
    } else {
      console.warn("Delay: No summary element found");
    }
  }
} 