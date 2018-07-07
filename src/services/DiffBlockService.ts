import { DiffBlock } from './DiffBlockService';
import { DiffBlockHeaderService } from "./DiffBlockHeaderService";

export interface DiffBlock {
  body: Element;
  header: Element;
}

export class DiffBlockService {

  static diffRefractorBodyClass: string = "diff-content-container refract-container";
  static diffContentBodyClass: string = "diff-content-container content-container";
  static resizeButtonClass: string = "diff-entry-lozenge aui-lozenge collapsable";  
  static commitFilesSummaryId: string = "commit-files-summary";  
  static diffContainerClass: string = "diff-container";  

  static getDiffBlocks() {
    const diffContainers = window.document.getElementsByClassName(this.diffContainerClass);    
    const diffBlocks:Array<DiffBlock> = [];
    for(let i =0; i < diffContainers.length; i++) {
      const diffBlock = this.toDiffBlock(diffContainers[i]);
      diffBlocks.push(diffBlock);
    } 

    return diffBlocks;
  }

  static initialiseResizeButtons() {
    const diffBlocks = this.getDiffBlocks();
    this.addResizeBlockButtons(diffBlocks);
    this.addResizeAll(diffBlocks);
  }

  static alternateCollapse(buttonText: string, diffBlock: DiffBlock) {
    if(buttonText === "Minimize") {
        DiffBlockService.collapse(diffBlock);
    } else {
        DiffBlockService.expand(diffBlock);        
    }
  }

  static getDiffBlockOnScreen() {
    const diffBlocks = this.getDiffBlocks();
    const diffBlocksOnScreen = diffBlocks.filter( 
      diffBlock => diffBlock.body.getBoundingClientRect().top < 1080 && diffBlock.body.getBoundingClientRect().bottom > 0
    );
    return diffBlocksOnScreen;
  }

  private static addResizeBlockButtons(diffBlocks: Array<DiffBlock>) {
    diffBlocks.map( diffBlock => {      
      DiffBlockHeaderService.addResizeBlockButton(diffBlock);
    });
  }

  private static toDiffBlock(diffContainer: Element) {
    const diffContainerHeader: Element = DiffBlockHeaderService.getHeader(diffContainer);
    const diffContainerBody: Element = DiffBlockService.getBody(diffContainer)

    const diffBlock: DiffBlock = {
      header: diffContainerHeader,        
      body: diffContainerBody
    }
    
    return diffBlock
  }

  private static addResizeAll(diffBlocks: Array<DiffBlock>) {
    let resizeAll = this.createResizeAllElement(diffBlocks);
    const summaryElement = window.document.getElementById(this.commitFilesSummaryId);
    summaryElement.appendChild(resizeAll);
  }

  private static getBody(diffContainer: Element) {
    let diffContainerBody = diffContainer.getElementsByClassName(this.diffRefractorBodyClass)[0];
    if(!diffContainerBody) {
      diffContainerBody = diffContainer.getElementsByClassName(this.diffContentBodyClass)[0];
    }

    return diffContainerBody;
  }

  private static alternateResizeOnDiffBlocks(resizeAllElement: Element, diffBlocks: Array<DiffBlock>) {

    diffBlocks.map( diffBlock => {
      const resizeButton = DiffBlockHeaderService.getResizeButton(diffBlock.header);
      if(String(resizeAllElement.textContent).indexOf(resizeButton.textContent) !== -1 ) {
          DiffBlockService.alternateCollapse(resizeButton.textContent, diffBlock);
      }
    });
    resizeAllElement.textContent = resizeAllElement.textContent == `Minimize All` ? `Expand All` : `Minimize All`    
  }

  private static collapse(diffBlock: DiffBlock) {
    const resizeButton = diffBlock.header.getElementsByClassName(this.resizeButtonClass)[0];
    resizeButton.textContent = "Expand";
    diffBlock.body.setAttribute(`style`, `display: none;`);
    diffBlock.header.setAttribute(`style`, `border-bottom: 1px solid #abc; margin-bottom: -40px`);
  }

  private static expand(diffBlock: DiffBlock) {
    const resizeButton = diffBlock.header.getElementsByClassName(this.resizeButtonClass)[0];    
    resizeButton.textContent = "Minimize";
    diffBlock.body.setAttribute(`style`, ``);
    diffBlock.header.setAttribute(`style`, "border-bottom: none")
  }


  private static createResizeAllElement(diffBlocks) {
    let resizeAll = document.createElement("span");
    resizeAll.className = this.resizeButtonClass;
    resizeAll.textContent = `Minimize All`;
    resizeAll.onclick = function(){DiffBlockService.alternateResizeOnDiffBlocks(resizeAll, diffBlocks)};
    return resizeAll;
  }
}