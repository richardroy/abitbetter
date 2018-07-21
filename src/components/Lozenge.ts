class Lozenge {

  static fileChangeSummaryLozenge = "diff-summary-lozenge aui-lozenge aui-lozenge-subtle";

  static createLozenge(textContent: string, lozengeClass: string) {
    let baseLozenge = document.createElement("span");
    baseLozenge.className = `${this.fileChangeSummaryLozenge} ${lozengeClass}`;
    baseLozenge.textContent = textContent;
    baseLozenge.setAttribute(`style`, `width: auto; padding: 2px 5px 2px 5px; margin: 5px`);
    return baseLozenge;
  }


}

export default Lozenge;