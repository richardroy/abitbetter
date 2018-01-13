import { DiffBlockService, DiffBlock } from './DiffBlockService';

export class DiffBlockHeaderService {

  static minimizeButtonClass = "diff-entry-lozenge aui-lozenge collapsable";    
  static primaryHeaderClass = "filename";  
  static diffHeaderClass = "heading";

  static getHeader(diffContainer: Element) {
    const diffContainerHeader = diffContainer.getElementsByClassName(this.diffHeaderClass)[0];
    return diffContainerHeader;
  }

  static getResizeButton(diffContainerHeader: Element) {
    const resizeButton = diffContainerHeader.getElementsByClassName(this.minimizeButtonClass)[0];
    return resizeButton;
  }

  static addResizeBlockButton(diffBlock: DiffBlock) {
    const resizeBody: HTMLElement = document.createElement("span");
    resizeBody.className = this.minimizeButtonClass;
    resizeBody.textContent = "Minimize";
    resizeBody.onclick = () => {DiffBlockService.alternateCollapse(resizeBody.textContent, diffBlock)};
    const headerPrimary: Element = DiffBlockHeaderService.getHeaderPrimary(diffBlock.header);
    headerPrimary.appendChild(resizeBody);
  }

  private static getHeaderPrimary(diffContainerHeader: Element) {
    const headerPrimary = diffContainerHeader.getElementsByClassName(this.primaryHeaderClass)[0];
    return headerPrimary;
  }

}