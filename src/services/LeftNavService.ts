import { DiffBlockHeaderService } from './DiffBlockHeaderService';
import { DiffBlockService } from './DiffBlockService';

export class LeftNavService {
  static commitFilesSummaryId = "commit-files-summary";
  static fileListLinkClass = "commit-files-summary--filename";
  static leftNavigationId = "adg3-navigation";

  static getLeftMenuElement() {
    return document.getElementById(this.leftNavigationId).firstChild.firstChild.firstChild.childNodes[1].firstChild.childNodes[2].firstChild.firstChild;
  }

  static getCollapseButton() {
    const childNodes  = document.getElementById(this.leftNavigationId).firstChild.firstChild.firstChild.childNodes;
    if(childNodes.length === 3) {
      return childNodes[2].firstChild;
    } else if(childNodes.length === 2) {
      return childNodes[1].firstChild;
    } else {
      return null;
    }
  }

  static addFilelistSubMenu(summaryElement) {
    const linkList = summaryElement.getElementsByClassName(this.fileListLinkClass);  
    const navigationSubList = this.getLeftMenuElement();
    let div = document.createElement("div");
    div.setAttribute(`id`, `filelist-break`);
    div.setAttribute(`style`, `border-top: 1px solid black; margin: 10px;`);
    div.setAttribute(`class`, `commit-sub-list`);
    navigationSubList.appendChild(div);
    for(let i = 0; i < linkList.length; i++){
      let clonedLink = linkList[i].cloneNode(true);
      let textContent = clonedLink.textContent;
      const linkText = this.getLinkText(textContent);
      clonedLink.textContent = linkText;
      (clonedLink as HTMLElement).title = textContent;
      let linkWrapper = document.createElement("div");
      linkWrapper.setAttribute('class', 'commit-sub-list');
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

  static isLeftMenuOpen() {
    let leftNavigation;
    try {
      leftNavigation =  document.getElementById(this.leftNavigationId).firstChild.firstChild.firstChild.childNodes[1].firstChild.childNodes[2];
      return leftNavigation !== undefined;
    } catch (error) {
      return false;
    }
  }

  static isSubCommitListThere() {
    const fileListBreak = document.getElementById('filelist-break');
    return fileListBreak != null;
  }

  static addLeftFileList() {

    if(!this.isSubCommitListThere()){
      const summaryElement = window.document.getElementById(this.commitFilesSummaryId);
      if(summaryElement){
        if(this.isLeftMenuOpen()){
          this.addFilelistSubMenu(summaryElement);
        }
      }
    }

    const collapseButton = this.getCollapseButton();
    if(collapseButton) {
      collapseButton.addEventListener("click", () => {
        if(this.isSubCommitListThere()){
          const elements = document.getElementsByClassName('commit-sub-list');
          while(elements.length > 0) {
            const parent = (elements[0] as HTMLElement).parentNode
            parent.removeChild(elements[0]);
          }
        }
        
        const menuDelay = setInterval( () => {
          if(!this.isSubCommitListThere()){
            const summaryElement = window.document.getElementById(this.commitFilesSummaryId);
            if(summaryElement) {
              if(this.isLeftMenuOpen()){
                LeftNavService.addFilelistSubMenu(summaryElement);
              }
            }
          }
          clearInterval(menuDelay);
        }, 500);
      })
    }
  }
}

window.addEventListener("resize", function() {
  LeftNavService.addLeftFileList();
});

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