import { DiffBlockHeaderService } from './DiffBlockHeaderService';
import { DiffBlockService } from './DiffBlockService';
// import * as cheerio from 'cheerio'

export class LeftNavService {
  static commitFilesSummaryId = "commit-files-summary";
  static fileListLinkClass = "commit-files-summary--filename";
  static leftNavigationId = "adg3-navigation";
  
  static menuCollapsed() {
    return document.getElementById("adg3-navigation").firstChild.firstChild.firstChild.childNodes[1].firstChild.childNodes[2] === undefined
  }

  static getLeftMenuElement() {
    return document.getElementById(this.leftNavigationId).firstChild.firstChild.firstChild.childNodes[1].firstChild.childNodes[2].firstChild.firstChild;
  } 

  static getCollapseButton() {
    const childNodes  = document.getElementById(this.leftNavigationId).firstChild.firstChild.firstChild.childNodes;
    if(childNodes.length === 3) {
      return childNodes[2].firstChild;
    } else {
      return childNodes[1].firstChild;
    }
  }

  static addFilelistSubMenu(summaryElement) {
    const linkList = summaryElement.getElementsByClassName(this.fileListLinkClass);  
    const navigationSubList = this.getLeftMenuElement();
    let div = document.createElement("div");
    div.setAttribute(`id`, `filelist-break`);
    div.setAttribute(`style`, `border-top: 1px solid black; margin: 10px;`);
    navigationSubList.appendChild(div);
    for(let i = 0; i < linkList.length; i++){
      let clonedLink = linkList[i].cloneNode(true);
      let textContent = clonedLink.textContent;
      const linkText = this.getLinkText(textContent);
      clonedLink.textContent = linkText;
      (clonedLink as HTMLElement).title = textContent;
      let linkWrapper = document.createElement("div");
      clonedLink.setAttribute(`class`, `cloned-link`);
      linkWrapper.appendChild(clonedLink);
      navigationSubList.appendChild(linkWrapper);                
    }    
  }

  private static getLinkText(textContent) {
    const splitUrl = textContent.split("/");
    let linkText = `${splitUrl[splitUrl.length-1]}`;
    return linkText.replace(/\s/g,'');;
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

// document.addEventListener("scroll", () => {
//   const diffBlocks = DiffBlockService.getDiffBlockOnScreen();

//   const clonedLinks = document.getElementsByClassName(`cloned-link`);
//   console.log(clonedLinks);
//   for(let i =0; i < clonedLinks.length; i++) {
//     for(let j = 0; j< diffBlocks.length; j++ ) {
//       const filename = DiffBlockHeaderService.getFileName(diffBlocks[j].header);
//       console.log(filename);
//       console.log(clonedLinks[i].textContent);
//       console.log(filename);
//       if(clonedLinks[i].textContent === filename) {
//         clonedLinks[i].setAttribute(`style`, `border-bottom: 1px solid #000;`);
//         break;
//       } else {
//         clonedLinks[i].setAttribute(`style`, ``);        
//       }
//     }
//   }
// });